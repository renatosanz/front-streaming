import React, { useState } from 'react';
import './Gallery.css';

// Simulación de datos de galería
const mockData = Array.from({ length: 60 }, (_, i) => ({
  id: i + 1,
  type: i % 2 === 0 ? 'photo' : 'video',
  url: i % 2 === 0 ? `https://picsum.photos/300/200?random=${i}` : `https://samplelib.com/mp4/sample-5s.mp4`,
  title: `Elemento ${i + 1}`,
}));

const ITEMS_PER_PAGE = 12;

const Gallery: React.FC = () => {
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(mockData.length / ITEMS_PER_PAGE);

  const handleNext = () => {
    if (page < totalPages) setPage(page + 1);
  };
  const handlePrev = () => {
    if (page > 1) setPage(page - 1);
  };

  const startIdx = (page - 1) * ITEMS_PER_PAGE;
  const currentItems = mockData.slice(startIdx, startIdx + ITEMS_PER_PAGE);

  return (
    <div className="gallery-container">
      <h1>Galería de Fotos y Videos</h1>
      <div className="gallery-grid">
        {currentItems.map(item => (
          <div className="gallery-item" key={item.id}>
            {item.type === 'photo' ? (
              <img src={item.url} alt={item.title} />
            ) : (
              <video controls width="100%" height="150">
                <source src={item.url} type="video/mp4" />
                Tu navegador no soporta el video.
              </video>
            )}
            <div className="gallery-title">{item.title}</div>
          </div>
        ))}
      </div>
      <div className="gallery-pagination">
        <button onClick={handlePrev} disabled={page === 1}>Anterior</button>
        <span>Página {page} de {totalPages}</span>
        <button onClick={handleNext} disabled={page === totalPages}>Siguiente</button>
      </div>
    </div>
  );
};

export default Gallery;
