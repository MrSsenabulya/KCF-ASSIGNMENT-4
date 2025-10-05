import React from 'react'
import { useState, useEffect } from 'react';

const QuoteGenerator = () => {

    const [quotes, setQuotes] = useState([]);
    const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);

    useEffect(() => {
    fetch('https://dummyjson.com/quotes')
      .then(res => res.json())
      .then(data => {
        setQuotes(data.quotes);
      })
      .catch(error => console.error("Error fetching quotes:", error));
    }, []); // The empty dependency array `[]` ensures this runs only once.

    const handleNext = () => {
    setCurrentQuoteIndex((prevIndex) => (prevIndex + 1) % quotes.length);
    };

    const handlePrevious = () => {
    setCurrentQuoteIndex((prevIndex) =>
        (prevIndex - 1 + quotes.length) % quotes.length
    );
    };

  return (
        
      <div className="quote-container ">

            <h1>Eric's Quote Generator</h1>
                
            {quotes.length > 0 ? (
            <>
                <div className="quote-text">
                <p>{quotes[currentQuoteIndex].quote}</p>
                </div>
                <div className="quote-author">
                <p>- {quotes[currentQuoteIndex].author}</p>
                </div>
                <div className="buttons">
                <button onClick={handlePrevious}>Previous</button>
                <button onClick={handleNext}>Next</button>
                </div>
            </>
            ) : (
            <p>Loading quotes...</p>
            )}
        </div>
  )
}

export default QuoteGenerator
