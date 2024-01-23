import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SearchBar from './SearchBar';
import ImageList from './ImageList';
import './App.css';

//My API key - demo version
const MY_UNSPLASH_ACCESS_KEY = "UTEgVEYM2R3ORssd3GxXbLypHsu6DQlT_2EPJXOfYqc"

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [images, setImages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (searchTerm) {
      // Fetch images from Unsplash API based on the search term and current page
      const fetchImages = async () => {
        try {
          const response = await axios.get(
            `https://api.unsplash.com/search/photos?query=${searchTerm}&page=${currentPage}&client_id=${MY_UNSPLASH_ACCESS_KEY}`
          );

          // Update the state with the fetched images
          setImages(response.data.results);
        } catch (error) {
          console.error('Error fetching images:', error);
        }
      };

      fetchImages();
    }
  }, [searchTerm, currentPage]);

  const handleSearch = (term) => {
    // Set the search term and reset to the first page when a new search is performed
    setSearchTerm(term);
    setCurrentPage(1);
  };
  

  const handlePrevPage = () => {
    // Update the current page to go to the previous page
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    // Update the current page to go to the next page
    setCurrentPage((prevPage) => prevPage + 1);
  };


  return (
    <div>
      <h1>React Image Search App</h1>
      <SearchBar onSearch={handleSearch} />
      <ImageList images={images} />

      {/* Conditional rendering of pagination controls */}
      {images.length > 0 && (
        <div>
          <button onClick={handlePrevPage} disabled={currentPage === 1}>
            Prev
          </button>
          <span> Page {currentPage} </span>
          <button onClick={handleNextPage}>Next</button>
        </div>
      )}
    </div>
  );
};

export default App;

