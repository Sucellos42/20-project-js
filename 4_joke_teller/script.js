const button = document.getElementById('button')
const audioElement = document.getElementById('audio');

// Disable/Enable button
function toggleButton() {
    button.disabled = !button.disabled;

}

//Passing joke to voiceRSS api
function tellMe(joke) {
    console.log(joke)
    VoiceRSS.speech({
        key: '440686ecbd054307a17e08a7ebc3483f',
        src: joke,
        hl: 'en-us',
        v: 'Linda',
        r: 0,
        c: 'mp3',
        f: '44khz_16bit_stereo',
        ssml: false
    });
}

//Get jokes from api
async function getJokes() {
    let joke = '';

    const apiUrl = 'https://v2.jokeapi.dev/joke/Programming,Dark';
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        if (data.setup) {
            joke = `${data.setup} ........... ${data.delivery};`
        } else {
            joke = data.joke;
        };

        tellMe(joke);

        //Disable button
        toggleButton();
    }  catch (e) {
        console.log('get jokes error : ', e);
    }
}

//Event listeners
//Get jokes when click on button
button.addEventListener('click', getJokes);

//Ended event
audioElement.addEventListener('ended', toggleButton)
