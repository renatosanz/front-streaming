import React, { useState } from 'react';
import './Gallery.css';
import VideoPlayer from './VideoPlayer';
import { PurpleCard, PurpleTitle, PurpleDivider, PurpleButton } from '../components/ui/purple';

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
  const [videoOpen, setVideoOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<{url: string, title: string} | null>(null);
  const totalPages = Math.ceil(mockData.length / ITEMS_PER_PAGE);

  const handleNext = () => {
    if (page < totalPages) setPage(page + 1);
  };
  const handlePrev = () => {
    if (page > 1) setPage(page - 1);
  };
  const handleVideoClick = (item: {url: string, title: string}) => {
    setSelectedVideo(item);
    setVideoOpen(true);
  };

  const startIdx = (page - 1) * ITEMS_PER_PAGE;
  const currentItems = mockData.slice(startIdx, startIdx + ITEMS_PER_PAGE);

  return (
    <div className="min-h-svh bg-gradient-to-br from-purple-950 via-purple-900 to-purple-800 py-10 px-2">
      <PurpleCard className="max-w-5xl mx-auto">
        <PurpleTitle>Galería de Fotos y Videos</PurpleTitle>
        <PurpleDivider />
        <div className="gallery-grid">
          {currentItems.map(item => (
            <div className="gallery-item" key={item.id}>
              {item.type === 'photo' ? (
                <img src={item.url} alt={item.title} className="rounded-lg shadow-md hover:scale-105 transition-transform duration-200 cursor-pointer border-2 border-purple-200/40" />
              ) : (
                <div className="relative group cursor-pointer" onClick={() => handleVideoClick(item)}>
                  <video width="100%" height="150" className="rounded-lg shadow-md border-2 border-purple-400/40 group-hover:ring-4 group-hover:ring-purple-400 transition-all duration-200">
                    <source src={item.url} type="video/mp4" />
                    Tu navegador no soporta el video.
                  </video>
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg">
                    <svg className="w-12 h-12 text-purple-300" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                  </div>
                </div>
              )}
              <div className="gallery-title text-purple-200 font-medium mt-2 text-center">{item.title}</div>
            </div>
          ))}
        </div>
        <div className="gallery-pagination mt-8 flex gap-4 items-center justify-center">
          <PurpleButton onClick={handlePrev} disabled={page === 1}>Anterior</PurpleButton>
          <span className="text-purple-300 font-semibold">Página {page} de {totalPages}</span>
          <PurpleButton onClick={handleNext} disabled={page === totalPages}>Siguiente</PurpleButton>
        </div>
      </PurpleCard>
      {selectedVideo && (
        <VideoPlayer
          open={videoOpen}
          onClose={() => setVideoOpen(false)}
          videoUrl={selectedVideo.url}
          title={selectedVideo.title}
        />
      )}
    </div>
  );
};

export default Gallery;
