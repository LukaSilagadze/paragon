import React from 'react'
import heroVideo from '../../assets/videos/hero_vid.mp4'
import heroPoster from '../../assets/images/heroBG.jpg'

export default function Hero() {
  return (
    <section className="hero">
          <video
            className="hero-bg"
            autoPlay
            muted
            loop
            playsInline
            poster={heroPoster}
          >
            <source src={heroVideo} type="video/mp4" />
          </video>
          <div className="hero-overlay"></div>
          <div className="hero-content">
            <div className="hero-text">
              <h1 className="hero-title">Landscape is not just about plants</h1>
              <h2 className="hero-subtitle">
                it's about creating a grand entrance that speaks before you even step inside...
              </h2>
            </div>
          </div>
    </section>
  )
}
