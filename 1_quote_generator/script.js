const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json'
const proxyUrl = 'https://cors-anywhere.herokuapp.com/'
const loader = document.getElementById('loader');



// Show loader
function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

//hide loading show quotes
function charged() {
    if (!loader.hidden) {
        quoteContainer.hidden = false
        loader.hidden = true
    }
}

// On load
getQuote();

// Get the quote with api, proxy needed to access to the api
async function getQuote() {
    loading()
    try {
        const response = await fetch(proxyUrl + apiUrl)
        const data = await response.json()
        console.log('zeub')
        // If author is blank add unknown
        if (data.quoteAuthor === '') {
            authorText.innerText = 'unknown'
        } else {
            authorText.innerText = data.quoteAuthor
        }
        // Reduce font size for long quotes
        if (data.quoteText.length > 120) {
            quoteText.classList.add('long-quote')
        } else{
            quoteText.classList.remove('long-quote')
        }

        quoteText.innerText = data.quoteText
        // Stop loader, show quote
        charged()
    } catch (e) {
        getQuote();
        console.log('no quote find', e)
    } 
}

// Tweet Quote
function tweetQuote() {
    const quote = quoteText.innerText;
    const author = authorText.innerText;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
    window.open(twitterUrl, '_blank');
}

// Event Listeners
newQuoteBtn.addEventListener('click', getQuote);
twitterBtn.addEventListener('click', tweetQuote);