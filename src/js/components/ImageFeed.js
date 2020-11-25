import React, { useState, useEffect } from 'react';
import { fromJS, List } from 'immutable';

function ImageFeed() {
  const [loading, setloading] = useState(false);

  const [error, setError] = useState(null);

  const [images, setImages] = useState(new List());

  useEffect(() => {
    setloading(true);

    fetch('https://picsum.photos/v2/list?page=2&limit=100')
      .then((response) => response.json())
      .then((data) => {
        setloading(false);

        // console.log('resp.data', data);
        setImages(fromJS(data));
      })
      .catch((error) => {
        setloading(false);
        console.error('Error: ', error);
        setError('Error fetching data!');
      });
  }, []);

  return (
    <div className='main-container'>
      {loading ? (
        <div className='flex-center main-loader'>Loading...</div>
      ) : error ? (
        <div className='flex-center main-error'>{error}</div>
      ) : (
        <div className='image-feed'>
          <div
            className='grid'
            data-masonry='{ "itemSelector": ".grid-item", "columnWidth": 160 }'
          >
            {images.map((image) => (
              <div key={image.get('id')} className='grid-item'>
                <img
                  src={image.get('download_url')}
                  alt={image.get('author')}
                  loading='lazy'
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default ImageFeed;
