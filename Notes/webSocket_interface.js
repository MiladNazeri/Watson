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
