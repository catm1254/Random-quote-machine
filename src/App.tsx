import { useState, useEffect } from "react";
import quotes from "./assets/quotes.json";
import { FaTwitter, FaQuoteLeft, FaQuoteRight } from "react-icons/fa";
import "./App.css";

interface Quote {
  quote: string;
  author: string;
}

const getRandomQuote = (): Quote => {
  return quotes[Math.floor(Math.random() * quotes.length)];
};

const getRandomColor = (): string => {
  const red = Math.floor(Math.random() * 128);
  const green = Math.floor(Math.random() * 128);
  const blue = Math.floor(Math.random() * 128);
  return `rgb(${red}, ${green}, ${blue})`;
};

const transition = "all 1s";

function App() {
  const [quote, setQuote] = useState<Quote>(getRandomQuote());
  const [randomColor, setRandomColors] = useState<string>(getRandomColor());
  const [fade, setFade] = useState(true); // Estado para controlar la opacidad

  useEffect(() => {
    fetch(
      "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json"
    )
      .then((resp) => resp.json())
      .then((data) => {
        setQuote(data.quotes[Math.floor(Math.random() * data.quotes.length)]);
      });
  }, []);

  const changeQuote = () => {
    setFade(false); // Ocultar el texto

    setTimeout(() => {
      setQuote(getRandomQuote());
      setRandomColors(getRandomColor());
      setFade(true); // Mostrar el texto después del cambio
    }, 500); // Esperar antes de cambiar la cita
  };

  return (
    <div
      className="background"
      style={{ backgroundColor: randomColor, transition }}
    >
      <div id="quote-box">
        <div
          className="quote-content"
          style={{
            color: randomColor,
            transition: "opacity 0.5s ease", // Transición de opacidad
            opacity: fade ? 1 : 0, // Cambia la opacidad basado en el estado
          }}
        >
          <h2 id="text">
            <FaQuoteLeft size="30" style={{ marginLeft: "10px" }} />
            {quote.quote}
            <FaQuoteRight size="30" style={{ marginLeft: "10px" }} />
          </h2>

          <h4 id="author">{quote.author}</h4>
        </div>
        <div className="buttons">
          <a
            href={
              "https://twitter.com/intent/tweet?hashtags=quotes&amp;related=freecodecamp&amp;text=%22I%20have%20learned%20over%20the%20years%20that%20when%20one%E2%80%99s%20mind%20is%20made%20up%2C%20this%20diminishes%20fear.%22%20Rosa%20Parks"
            }
            id="tweet-quote"
            style={{ backgroundColor: "#1DA1F2", marginRight: "10px" }}
          >
            <FaTwitter color="white" />
          </a>
          <button
            id="new-quote"
            onClick={changeQuote}
            style={{ backgroundColor: randomColor, transition }}
          >
            Change Quote
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
