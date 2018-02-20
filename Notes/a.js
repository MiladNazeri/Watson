get the token

https://stream.watsonplatform.net/authorization/api/v1/token
url=https://stream.watsonplatform.net/text-to-speech/api

curl -X GET --user {username}:{password} \
"https://stream.watsonplatform.net/authorization/api/v1/token?url=https://stream.watsonplatform.net/text-to-speech/api"

curl -X GET --user {username}:{password}
--output token
"https://stream.watsonplatform.net/authorization/api/v1/token?url=https://stream.watsonplatform.net/text-to-speech/api"

// These two are the samme uses of token

{
  "url": "https://stream.watsonplatform.net/text-to-speech/api",
  "username": "cb868aa6-dbb2-4ddb-839f-bff3375c6bc3",
  "password": "H8Y55sXOV7NV"
}

curl -X GET --user "cb868aa6-dbb2-4ddb-839f-bff3375c6bc3":"H8Y55sXOV7NV" --output token "https://stream.watsonplatform.net/authorization/api/v1/token?url=https://stream.watsonplatform.net/text-to-speech/api"
curl -X GET --user {"cb868aa6-dbb2-4ddb-839f-bff3375c6bc3"}:{"H8Y55sXOV7NV"} --output token "https://stream.watsonplatform.net/authorization/api/v1/token?url=https://stream.watsonplatform.net/text-to-speech/api"

curl -X POST \
--header "X-Watson-Authorization-Token: $(< ./token)" \
--header "Content-Type: application/json" \
--header "Accept: audio/wav" \
--data "{\"text\":\"hello world\"}" \
--output hello_world.wav \
"https://stream.watsonplatform.net/text-to-speech/api/v1/synthesize"
-------------------

curl -X POST --header "Content-Type: application/json" --header "Accept: audio/wav" --data "{\"text\":\"DoReen and Whitney are awesome \"}" --output hello_world.wav "https://stream.watsonplatform.net/text-to-speech/api/v1/synthesize?watson-token=$(< ./token)"
curl -X POST --header "Content-Type: application/json" --header "Accept: audio/wav" --data "{\"text\":\"Hello Leaha you sure think you are something don\'t you HA HA HA HA HA HA HA HA\"}" --output hello_world.wav "https://stream.watsonplatform.net/text-to-speech/api/v1/synthesize?watson-token

curl -X POST -u "cb868aa6-dbb2-4ddb-839f-bff3375c6bc3":"H8Y55sXOV7NV" --header "Content-Type: application/json" --header "Accept: audio/wav" --data "{\"text\":\"Oh my watch out for the bubble bubble video game that you are playing with such fine vigor \"}" --output hello_world.wav "https://stream.watsonplatform.net/text-to-speech/api/v1/synthesize"
{
    "speech_to_text": [{
        "name": "hifi-test-speech-to--1518882465400",
        "plan": "lite",
        "credentials": {
            "url": "https://stream.watsonplatform.net/speech-to-text/api",
            "username": "22e04c8d-d66d-46b2-b61b-56882492565d",
            "password": "duzdLmD3xnsM"
        }
     }]
}

{
    "speech_to_text": [{
        "name": "hifi-test-speech-to--1518882465400",
        "plan": "lite",
        "credentials": {
            "url": "https://stream.watsonplatform.net/speech-to-text/api",
            "username": "22e04c8d-d66d-46b2-b61b-56882492565d",
            "password": "duzdLmD3xnsM"
        }
    }]
}

{
    "url": "https://stream.watsonplatform.net/speech-to-text/api",
    "username": "22e04c8d-d66d-46b2-b61b-56882492565d",
    "password": "duzdLmD3xnsM"
}



{
  "conversation": [
    {
      "name": "hifi-conversation-test-conversati-1519079219830",
      "plan": "free",
      "credentials": {
        "url": "https://gateway.watsonplatform.net/conversation/api",
        "username": "0c215bc0-dee2-40f3-861b-8b8d29bb259f",
        "password": "BwJ5v8pSNVKG"
      }
    }
  ]
}
