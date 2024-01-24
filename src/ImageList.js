import React from 'react';

const ImageList = ({ images }) => {
  return (
    <div className='image-item'>
      {images.map((image) => (
        <div key={image.id}>
          <img src={image.urls.small} alt={image.alt_description} />
          <p>{image.alt_description}</p>
          <a href={image.links.html} target="_blank" rel="noopener noreferrer">
            View on Unsplash
          </a>
        </div>
      ))}
    </div>
  );
};

export default ImageList;
