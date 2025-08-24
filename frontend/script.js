const quoteDisplay = document.getElementById('quote-display');
const authorDisplay = document.getElementById('author-display');
const newQuoteButton = document.getElementById('new-quote-button');

async function fetchAndDisplayQuote() {
    try {
        const response = await fetch('https://afatmaa-quote-generator-backend.hosting.codeyourfuture.io/');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        quoteDisplay.textContent = `"${data.quote}"`;
        authorDisplay.textContent = `- ${data.author}`;
    } catch (error) {
        console.error('Failed to fetch quote:', error);
        quoteDisplay.textContent = "Failed to load quote.";
        authorDisplay.textContent = "";
    }
}

fetchAndDisplayQuote();

newQuoteButton.addEventListener('click', fetchAndDisplayQuote);