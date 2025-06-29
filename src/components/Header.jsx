import React from 'react';

export default function Header() {
  // Using logo image 'yourbag.png' placed in public/ranks folder
  const logoSrc = process.env.PUBLIC_URL + '/ranks/yourbag.png';

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
