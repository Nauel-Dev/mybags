// src/components/Gallery.jsx
import React from 'react'

// Import each image directly from src/assets/gallery
import bag1 from '../assets/gallery/bag1.jpeg'
import bag2 from '../assets/gallery/bag2.jpeg'
import bag3 from '../assets/gallery/bag3.jpeg'
import bag4 from '../assets/gallery/bag4.jpeg'
import bag5 from '../assets/gallery/bag5.jpeg'
import bag6 from '../assets/gallery/bag6.jpeg'
import bag7 from '../assets/gallery/bag7.jpeg'
import bag8 from '../assets/gallery/bag8.jpeg'

const images = [bag1, bag2, bag3, bag4, bag5, bag6, bag7, bag8]

export default function Gallery() {
  return (
    <section id="gallery" className="section gallery">
      <div className="container text-center">
        <h2>BAG WORKERS</h2>
        <div className="gallery-grid">
          {images.map((src, idx) => (
            <div key={idx} className="gallery-item">
              <div className="image-wrapper">
                <img
                  src={src}
                  alt={`Bag ${idx + 1}`}
                  className="gallery-image"
                  loading="lazy"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
