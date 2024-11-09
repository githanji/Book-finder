// src/App.js
import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [query, setQuery] = useState('');
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.get(`https://openlibrary.org/search.json?title=${query}`);
      setBooks(response.data.docs);
    } catch (error) {
      console.error("Error fetching data", error);
    }
    setLoading(false);
  };

  return (
    <div className="App">
      <h1>Book Finder</h1>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for a book"
        />
        <button type="submit">Search</button>
      </form>

      {loading && <p>Loading...</p>}

      <div className="book-list">
        {books.length > 0 ? (
          books.map((book, index) => (
            <div key={index} className="book-card">
              <img
                src={`https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`}
                alt={book.title}
                className="book-cover"
              />
              <h3>{book.title}</h3>
              <p>{book.author_name?.join(', ')}</p>
              <p>{book.first_publish_year}</p>
            </div>
          ))
        ) : (
          <p>No books found.</p>
        )}
      </div>
    </div>
  );
}

export default App;
