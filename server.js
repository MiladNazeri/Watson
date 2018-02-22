'use strict';

/* eslint-env node, es6 */

// express to help setup a serer/routes
const express = require('express');
const app = express();

// Ibm watson node SDK tp help connect to their services
const watson = require('watson-developer-cloud');

// parser for post requests
var bodyParser = require('body-parser');

// Conversation is the Bot service to parse conversations and make decisions
var Conversation = require('watson-developer-cloud/conversation/v1');

// allows environment properties to be set in a file named .env
require('dotenv').load({ silent: true });

// to servce static files from this directory
app.use(express.static(__dirname));
// to parse post requests body as objects
app.use(bodyParser.json());

// Setting up a wrapper for the Conversation service
var conversation = new Conversation({
  'username': process.env.CONVERSATION_USERNAME,
  'password': process.env.CONVERSATION_PASSWORD,
  'version_date': '2017-05-26'
});

// Endpoint to be call from the client side for conversation
app.post('/api/message', function(req, res) {
    // a workspace is needed for each individual conversation service
  var workspace = process.env.WORKSPACE_ID || '<workspace-id>';
  if (!workspace || workspace === '<workspace-id>') {
    return res.json({
      'output': {
        'text': 'The app has not been configured with a <b>WORKSPACE_ID</b> environment variable. Please refer to the ' + '<a href="https://github.com/watson-developer-cloud/conversation-simple">README</a> documentation on how to set this variable. <br>' + 'Once a workspace has been defined the intents may be imported from ' + '<a href="https://github.com/watson-developer-cloud/conversation-simple/blob/master/training/car_workspace.json">here</a> in order to get a working application.'
      }
    });
  }
  // Each dialog turn is stateless with Each request / response so anything requiring stored memory is passed through the context variable
  var payload = {
    workspace_id: workspace,
    context: req.body.context || {},
    input: req.body.input || {}
  };

  // Send the input to the conversation service
  conversation.message(payload, function(err, data) {
    if (err) {
      return res.status(err.code || 500).json(err);
    }
    // this is an example of how you can route the incoming response back from conversation service with deeper backend work as neeeded
    // In this case, we are making use of the confidence of what watson thought the users intent was to better handle situations where we weren't sure
    // what the intent might have been.
    return res.json(updateMessage(payload, data));
  });
});

/**
 * Updates the response text using the intent confidence
 * @param  {Object} input The request to the Conversation service
 * @param  {Object} response The response from the Conversation service
 * @return {Object}          The response with the updated message
 */

function updateMessage(input, response) {
  var responseText = null;
  if (!response.output) {
    response.output = {};
  } else {
    return response;
  }
  if (response.intents && response.intents[0]) {
    var intent = response.intents[0];
    // Depending on the confidence of the response the app can return different messages.
    // The confidence will vary depending on how well the system is trained. The service will always try to assign
    // a class/intent to the input. If the confidence is low, then it suggests the service is unsure of the
    // user's intent . In these cases it is usually best to return a disambiguation message
    // ('I did not understand your intent, please rephrase your question', etc..)
    if (intent.confidence >= 0.75) {
      responseText = 'I understood your intent was ' + intent.intent;
    } else if (intent.confidence >= 0.5) {
      responseText = 'I think your intent was ' + intent.intent;
    } else {
      responseText = 'I did not understand your intent';
    }
  }
  response.output.text = responseText;
  return response;
}


// token endpoints
// **Warning**: these endpoints should probably be guarded with additional authentication & authorization for production use

// speech to text token endpoint
// Using tokens allows us to setup WS streams in the Tablet so that we don't have to pass a username/pw with each request
var sttAuthService = new watson.AuthorizationV1(
    {
      username: process.env.SPEECH_TO_TEXT_USERNAME, // or hard-code credentials here
      password: process.env.SPEECH_TO_TEXT_PASSWORD
    }
);
app.use('/api/speech-to-text/token', function(req, res) {
  sttAuthService.getToken(
    {
      url: watson.SpeechToTextV1.URL
    },
    function(err, token) {
      if (err) {
        console.log('Error retrieving token: ', err);
        res.status(500).send('Error retrieving token');
        return;
      }
      res.send(token);
    }
  );
});

// text to speech token endpoint
var ttsAuthService = new watson.AuthorizationV1(
  Object.assign(
    {
      username: process.env.TEXT_TO_SPEECH_USERNAME, // or hard-code credentials here
      password: process.env.TEXT_TO_SPEECH_PASSWORD
    },
  )
);
app.use('/api/text-to-speech/token', function(req, res) {
  ttsAuthService.getToken(
    {
      url: watson.TextToSpeechV1.URL
    },
    function(err, token) {
      if (err) {
        console.log('Error retrieving token: ', err);
        res.status(500).send('Error retrieving token');
        return;
      }
      res.send(token);
    }
  );
});

// Port for our http process
const port = process.env.PORT || process.env.VCAP_APP_PORT || 3000;

// setup how to listen to http requests
app.listen(port, function() {
  console.log('Example IBM Watson Speech JS SDK client app & token server live at http://localhost:%s/', port);
});

// Chrome requires https to access the user's microphone unless it's a localhost url so
// this sets up a basic server on port 3001 using an included self-signed certificate
// note: this is not suitable for production use
// however bluemix automatically adds https support at https://<myapp>.mybluemix.net
if (!process.env.VCAP_SERVICES) {
  const fs = require('fs');
  const https = require('https');
  const HTTPS_PORT = 3001;

  const options = {
    key: fs.readFileSync(__dirname + '/keys/localhost.pem'),
    cert: fs.readFileSync(__dirname + '/keys/localhost.cert')
  };
  https.createServer(options, app).listen(HTTPS_PORT, function() {
    console.log('Secure server live at https://localhost:%s/', HTTPS_PORT);
  });
}
