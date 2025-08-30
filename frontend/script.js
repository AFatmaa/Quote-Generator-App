const quoteDisplay = document.getElementById('quote-display');
const authorDisplay = document.getElementById('author-display');
const newQuoteButton = document.getElementById('new-quote-button');

const addQuoteForm = document.getElementById('add-quote-form');
const quoteInput = document.getElementById('quote-input');
const authorInput = document.getElementById('author-input');
const feedbackMessage = document.getElementById('feedback-message');

const backendUrl = 'https://afatmaa-quote-generator-backend.hosting.codeyourfuture.io/';

async function fetchAndDisplayQuote() {
    try {
        const response = await fetch(backendUrl);
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


// Send a new quote to the backend
async function addQuote(quoteText, authorName) {
    feedbackMessage.textContent = 'Adding quote...';
    feedbackMessage.style.color = 'blue';

    try {
        const response = await fetch(backendUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', // Backend expects the quotes to be submitted as JSON
            },
            body: JSON.stringify({
                quote: quoteText,
                author: authorName,
            }),
        });

        if (response.ok) {
            const responseText = await response.text();
            if (responseText === "ok") {
                feedbackMessage.textContent = 'Quote added successfully!';
                feedbackMessage.style.color = 'green';
                quoteInput.value = '';
                authorInput.value = '';
                fetchAndDisplayQuote();
            } else {
                feedbackMessage.textContent = `Error from backend: ${responseText}`;
                feedbackMessage.style.color = 'red';
            }
        } else {
            const errorText = await response.text();
            throw new Error(`HTTP error! status: ${response.status}. Message: ${errorText}`);
        }
    } catch (error) {
        console.error('Failed to add quote:', error);
        feedbackMessage.textContent = `Failed to add quote: ${error.message}`;
        feedbackMessage.style.color = 'red';
    }
}

addQuoteForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const quoteText = quoteInput.value.trim();
    const authorName = authorInput.value.trim();

    if (!quoteText || !authorName) {
        feedbackMessage.textContent = 'Quote and Author fields cannot be empty!';
        feedbackMessage.style.color = 'red';
        return;
    }

    await addQuote(quoteText, authorName);
});


fetchAndDisplayQuote();

newQuoteButton.addEventListener('click', fetchAndDisplayQuote);