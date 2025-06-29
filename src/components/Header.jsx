import React from 'react';

export default function Header() {
  // Using logo image 'yourbag.png' placed in public/ranks folder
  <img src="/ranks/yourbag.png" alt="YourBag Logo" />


  return (
    <header className="header">
      <div className="logo">
        <img src={logoSrc} alt="YourBag Logo" />
        <span>YourBag</span>
      </div>
      <nav className="nav-links">
        <a href="#about">About</a>
        <a href="#gallery">Gallery</a>
        <a href="#footer">Contact</a>
      </nav>
    </header>
    )
}
