var watsonSpeechButton = document.querySelector('#watsonSpeech');
var stream;
var outputElement = document.querySelector("#outputText");

function startRecording(){
    watsonSpeechButton.innerText = "Stop Microphone Transcription";
    fetch('/api/speech-to-text/token')
        .then(function(response) {
            return response.text();
        })
        .then(function (token) {
            stream = WatsonSpeech.SpeechToText.recognizeMicrophone({
                token: token,
                outputElement: '#outputText' // CSS selector or DOM Element
            });
            stream.on('error', function(err) {
                console.log(err);
            });
            watsonSpeechButton.onclick = stopRecording;
        })
        .catch(function(error) {
            console.log(error);
        });
}

function stopRecording(){
    stream.stop();
    watsonSpeechButton.onclick = startRecording;
    var context;
    var latestResponse = Api.getResponsePayload();
    if (latestResponse) {
        context = latestResponse.context;
    }
    Api.sendRequest(outputElement.innerText, context);
    outputElement.innerText = "";
    watsonSpeechButton.innerText = "Start Microphone Transcription";

}

watsonSpeechButton.onclick = startRecording;
