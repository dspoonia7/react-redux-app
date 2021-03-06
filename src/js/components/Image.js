import React from 'react';

export default function Image({ image }) {
  return (
    <div className='grid-item'>
      <img
        src={image.get('download_url')}
        data-src={image.get('download_url')}
        alt={image.get('author')}
        loading='lazy'
        className='lazy-img'
      />
    </div>
  );
}
