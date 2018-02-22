// setup for the transcript service

// grab the button selector
var watsonSpeechButton = document.querySelector('#watsonSpeech');
// grab the output Element Stream
var outputElement = document.querySelector("#outputText");
// create a variable for the recording stream
var stream;

// Setup the function to run when the button is stopped
function startRecording(){
    watsonSpeechButton.innerText = "Stop Microphone Transcription";
    // grab the token from the api for the spech to text ( text and speech and speech to text are two different services)
    fetch('/api/speech-to-text/token')
        .then(function(response) {
            return response.text();
        })
        .then(function (token) {
            // Using the speech SDK to handle recording of the audio and displaying the transcription
            stream = WatsonSpeech.SpeechToText.recognizeMicrophone({
                token: token,
                outputElement: '#outputText' // CSS selector or DOM Element
            });
            stream.on('error', function(err) {
                console.log(err);
            });
            // changing the button to stop recording
            watsonSpeechButton.onclick = stopRecording;
        })
        .catch(function(error) {
            console.log(error);
        });
}

function stopRecording(){
    // make sure the stream stops listening
    stream.stop();
    // set the button to start recording again
    watsonSpeechButton.onclick = startRecording;
    var context;
    // grab the response payload to add the context for persistance
    var latestResponse = Api.getResponsePayload();
    if (latestResponse) {
        context = latestResponse.context;
    }
    // Send the transcription text and the context 
    Api.sendRequest(outputElement.innerText, context);
    outputElement.innerText = "";
    watsonSpeechButton.innerText = "Start Microphone Transcription";

}

watsonSpeechButton.onclick = startRecording;
