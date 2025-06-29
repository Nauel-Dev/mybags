// src/components/Gallery.jsx
import React from 'react';

// Display 5 bag images from the gallery folder
const items = Array.from({ length: 8 }).map((_, i) => ({
  id: i,
  src: process.env.PUBLIC_URL + `/gallery/bag${i + 1}.jpeg`,
}));

export default function Gallery() {
  return (
    <section id="gallery" className="section gallery">
      <div className="container text-center">
        <h2>BAG WORKERS</h2>
        <div className="gallery-grid">
          {items.map(item => (
            <div key={item.id} className="gallery-item">
              <div className="image-wrapper">
                <img
                  src={item.src}
                  alt={`Bag ${item.id + 1}`}
                  className="gallery-image"
                  loading="lazy"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
