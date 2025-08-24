import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
const port = 3000;

const quotes = [
  {
    "quote": "The only true wisdom is in knowing you know nothing.",
    "author": "Socrates"
  },
  {
    "quote": "An unexamined life is not worth living.",
    "author": "Socrates"
  },
  {
    "quote": "To conquer oneself is the greatest victory.",
    "author": "Plato"
  },
  {
    "quote": "True knowledge is the maturation of the soul.",
    "author": "Plato"
  },
  {
    "quote": "Happiness resides in being content with what we have.",
    "author": "Aristotle"
  },
  {
    "quote": "Character is destiny.",
    "author": "Heraclitus"
  },
  {
    "quote": "No one saves us but ourselves. No one can and no one may. We ourselves must walk the path.",
    "author": "Buddha"
  },
  {
    "quote": "Change is the only constant in life.",
    "author": "Heraclitus"
  },
  {
    "quote": "No one is free who has not obtained the empire of himself.",
    "author": "Epictetus"
  },
  {
    "quote": "You have power over your mind - not outside events. Realize this, and you will find strength.",
    "author": "Marcus Aurelius"
  },
  {
    "quote": "To live is to suffer, to survive is to find some meaning in the suffering.",
    "author": "Friedrich Nietzsche"
  },
  {
    "quote": "Man is condemned to be free; because once thrown into the world, he is responsible for everything he does.",
    "author": "Jean-Paul Sartre"
  },
  {
    "quote": "The greatest glory in living lies not in never falling, but in rising every time we fall.",
    "author": "Nelson Mandela"
  },
  {
    "quote": "It is not what happens to you, but how you react to it that matters.",
    "author": "Epictetus"
  },
  {
    "quote": "Do not spoil what you have by desiring what you have not; remember that what you now have was once among the things you only hoped for.",
    "author": "Epicurus"
  }
];


function pickRandomQuote() {
  const index = Math.floor(Math.random() * quotes.length);
  return quotes[index];
}

app.get("/", (req, res) => {
  console.error("Received a request for a quote");
  const quote = pickRandomQuote();
  res.json(quote);
});

app.post("/", (req, res) => {
  const bodyBytes = [];
  req.on("data", chunk => bodyBytes.push(...chunk));
  req.on("end", () => {
    const bodyString = String.fromCharCode(...bodyBytes);
    let body;
    try {
      body = JSON.parse(bodyString);
    } catch (error) {
      console.error(`Failed to parse body ${bodyString} as JSON: ${error}`);
      res.status(400).send("Expected body to be JSON.");
      return;
    }
    if (typeof body != "object" || !("quote" in body) || !("author" in body)) {
      console.error(`Failed to extract quote and author from post body: ${bodyString}`);
      res.status(400).send("Expected body to be a JSON object containing keys quote and author.");
      return;
    }
    quotes.push({
      quote: body.quote,
      author: body.author,
    });
    res.send("ok");
  });
});


app.listen(port, () => {
  console.error(`Quote server listening on port ${port}`);
});