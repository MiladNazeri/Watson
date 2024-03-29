var token = {authentication-token};
var wsURI = 'wss://stream.watsonplatform.net/speech-to-text/api/v1/recognize'
  + '?watson-token=' + token;
var websocket = new WebSocket(wsURI);

websocket.send(JSON.stringify({
  'action': 'start',
  'content-type': 'audio/flac'
}));
websocket.send(blob);
websocket.send(JSON.stringify({'action': 'stop'}));

//

var token = "{authentication-token}";
var wsURI = "wss://stream.watsonplatform.net/speech-to-text/api/v1/recognize"
  + "?watson-token=" + token + '&model=en-US_BroadbandModel';

var websocket = new WebSocket(wsURI);
websocket.onopen = function(evt) { onOpen(evt) };
websocket.onclose = function(evt) { onClose(evt) };
websocket.onmessage = function(evt) { onMessage(evt) };
websocket.onerror = function(evt) { onError(evt) };

function onOpen(evt) {
  var message = {
    action: 'start',
    'content-type': 'audio/flac',
    'interim_results': true,
    'max-alternatives': 3,
    keywords: ['colorado', 'tornado', 'tornadoes'],
    'keywords_threshold': 0.5
  };
  websocket.send(JSON.stringify(message));

  // Prepare and send the audio file.
  websocket.send(blob);

  websocket.send(JSON.stringify({action: 'stop'}));
}

function onMessage(evt) {
  console.log(evt.data);
}
