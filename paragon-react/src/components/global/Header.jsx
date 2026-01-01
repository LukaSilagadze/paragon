import React from 'react'
import { Link } from 'react-router-dom'
import { routes } from '../../constants/routes'

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
            <Link to={routes.Home}>PARAGON</Link>
            <span>Landscape for Life</span>
          </div>
        </div>
        <nav className="main-nav">
          <ul>
            <li><Link to={routes.Home}>Home</Link></li>
            <li><Link to={routes.About}>About</Link></li>
            <li><Link to={routes.Portfolio}>Portfolio</Link></li>
            <li><Link to={routes.Services}>Services</Link></li>
            <li><Link to={routes.Blog}>Blog</Link></li>
            <li><Link to={routes.Contact}>Contact</Link></li>
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
