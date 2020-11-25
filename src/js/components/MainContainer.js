import React from 'react';

import MainNav from './MainNav';
import ImageFeed from './ImageFeed';

function MainContainer() {
  return (
    <div className='app'>
      <MainNav />

      <ImageFeed />
    </div>
  );
}

export default MainContainer;
