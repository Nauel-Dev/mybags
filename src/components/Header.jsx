// src/components/Header.jsx
import React from 'react'
import logo from '../assets/ranks/yourbag.png' // <-- import image directly

export default function Header() {
  return (
    <header className="header">
      <div className="logo">
        <img src={logo} alt="YourBag Logo" />
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
