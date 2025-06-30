import React from 'react';

// Dynamically import bag images from src/assets/gallery to ensure they're bundled
const items = Array.from({ length: 8 }).map((_, i) => {
  let src;
  try {
    // Move your gallery images into src/assets/gallery/
    src = require(`../assets/gallery/bag${i + 1}.jpeg`);
  } catch (err) {
    console.warn(`Image gallery/bag${i + 1}.jpeg not found, using placeholder.`);
    src = require(`../assets/gallery/placeholder.jpeg`);
  }
  return {
    id: i,
    src,
  };
});

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
                  onError={e => {
                    // In case placeholder also missing, hide broken images
                    e.target.style.display = 'none';
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
