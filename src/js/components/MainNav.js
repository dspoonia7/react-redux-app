import React from 'react';
import LOGO from '../../assets/logo.svg';

export default function MainNav() {
  return (
    <nav className='app-header'>
      <div className='logo'>
        <img src={LOGO} alt='Logo' />
      </div>
      <div className='title'>PingThis: Where neighbors buy together</div>
    </nav>
  );
}
