import React from 'react'

export default function Header() {
  return (
    <header id="main-header">
      <div className="container">
        <div className="logo-container">
          <img
            src="assets/images/paragon.svg"
            alt="paragon logo"
            className="logo-icon"
          />
          <div className="logo">
            <a href="index.html">PARAGON</a>
            <span>Landscape for Life</span>
          </div>
        </div>
        <nav className="main-nav">
          <ul>
            <li><a href="index.html">Home</a></li>
            <li><a href="about.html">About</a></li>
            <li><a href="portfolio.html">Portfolio</a></li>
            <li><a href="services.html">Services</a></li>
            <li><a href="blog.html">Blog</a></li>
            <li><a href="contact.html">Contact</a></li>
          </ul>
        </nav>
        <button className="hamburger" id="hamburger">
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </header>
  )
}
