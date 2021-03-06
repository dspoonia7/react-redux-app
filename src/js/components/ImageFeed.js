import React, { useState, useEffect } from 'react';
import { fromJS, List } from 'immutable';
import Image from './Image';

function ImageFeed() {
  const [loading, setloading] = useState(false);
  const [error, setError] = useState(null);
  const [images, setImages] = useState(new List());

  const [page, setPage] = useState(1);
  const [pageLimit] = useState(100);
  const [showSpinner, setShowSpinner] = useState(false);
  const [loadMoreError, setLoadMoreError] = useState(null);

  useEffect(() => {
    setloading(true);
    loadImages();
  }, []);

  const lazyLoadImages = () => {
    const options = {
      root: null, // viewport
      threshold: 0,
      rootMargin: '0'
    };

    const imageObserver = new IntersectionObserver((entries, imgObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const lazyImage = entry.target;
          // console.log('lazy loading ', lazyImage);
          lazyImage.src = lazyImage.dataset.src;
          lazyImage.classList.remove('lazy-img');
          imgObserver.unobserve(lazyImage);
        }
      });
    });

    const list = document.querySelectorAll('img.lazy-img');
    list.forEach((image) => {
      imageObserver.observe(image);
    });
  };

  const loadImages = () => {
    fetch(`https://picsum.photos/v2/list?page=${page}&limit=${pageLimit}`)
      .then((response) => response.json())
      .then((data) => {
        if (page === 1) {
          setloading(false);
          setImages(fromJS(data));
        } else {
          setShowSpinner(false);
          setImages(images.concat(fromJS(data)));
        }

        setPage(page + 1);
        setTimeout(() => {
          lazyLoadImages();
        }, 100);
      })
      .catch((error) => {
        console.error('Error: ', error);

        if (page === 1) {
          setloading(false);
          setError('Error fetching data!');
        } else {
          setShowSpinner(false);
          setLoadMoreError('Error fetching more data!');
        }
      });
  };

  const loadMore = () => {
    setShowSpinner(true);
    loadImages();
  };

  return (
    <div className='main-container'>
      <div className='header-image'>
        <div className='flex-center'>Header Image</div>
      </div>

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
              <Image key={image.get('id')} image={image} />
            ))}
          </div>

          <div className='actions'>
            {showSpinner ? (
              <div className='load-more-spinner'>Loading...</div>
            ) : loadMoreError ? (
              <div className='load-more-error'>{loadMoreError}</div>
            ) : (
              <div className='load-more' onClick={loadMore}>
                Load More
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default ImageFeed;
