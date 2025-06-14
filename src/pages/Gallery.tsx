import React, { useState, useEffect } from 'react';
import ThemeToggle from '../components/ui/ThemeToggle';
import VideoPlayer from './VideoPlayer';
import { PurpleDivider, PurpleButton } from '../components/ui/purple';
import { Card } from '../components/ui/card'; // shadcn card

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
  const [theme, setTheme] = useState<'light' | 'dark'>(
    document.documentElement.className === 'dark' ? 'dark' : 'light'
  );

  useEffect(() => {
    setTheme(document.documentElement.className === 'dark' ? 'dark' : 'light');
  }, []);

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
    <div className={`min-h-screen transition-colors duration-300 flex flex-col ${theme === 'light' ? 'bg-[#f5f0e6] text-[#3c3c3c]' : 'bg-[#232323] text-[#f5f0e6]'}`}>
      <header className="flex justify-between items-center px-6 py-4 mb-2">
        <h1 className={`text-3xl md:text-4xl font-extrabold tracking-tight drop-shadow-md ${theme === 'light' ? 'text-[#7c3aed]' : 'text-[#fb923c]'}`}>Stream Gallery</h1>
        <ThemeToggle onThemeChange={setTheme} />
      </header>
      <main className="flex-1 flex flex-col items-center w-full">
        <Card className={`w-full max-w-7xl mx-auto shadow-md p-4 md:p-6 flex flex-col gap-6 ${theme === 'light' ? 'bg-[#f5f0e6]' : 'bg-[#232323]'}`} style={{ borderRadius: 0, border: 'none' }}>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-2 mb-1">
            <span className={`font-semibold px-3 py-1 shadow-sm text-lg ${theme === 'light' ? 'text-[#7c3aed] bg-[#f5f0e6]' : 'text-[#fb923c] bg-[#232323]'}`} style={{ borderRadius: 0 }}>Página {page} de {totalPages}</span>
          </div>
          <PurpleDivider className={theme === 'light' ? 'border-[#e5e5e5]' : 'border-[#444]'} />
          <div className="gallery-grid grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6 gap-x-4 gap-y-8 md:gap-x-6 md:gap-y-10">
            {currentItems.map(item => (
              <Card className={`group relative flex flex-col shadow-md hover:scale-105 hover:z-10 transition-transform duration-300 overflow-hidden ${theme === 'light' ? 'bg-[#f5f0e6]' : 'bg-[#232323]'}`} key={item.id} style={{ borderRadius: 0, border: 'none' }}>
                <div className="relative w-full aspect-[2/3] overflow-hidden flex items-center justify-center">
                  {item.type === 'photo' ? (
                    <img
                      src={item.url}
                      alt={item.title}
                      className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-300 cursor-pointer"
                      style={{ borderRadius: 0 }}
                    />
                  ) : (
                    <div className="relative group cursor-pointer w-full h-full" onClick={() => handleVideoClick(item)}>
                      <video
                        className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-300 cursor-pointer"
                        poster={`https://picsum.photos/300/200?random=${item.id}`}
                        style={{ borderRadius: 0 }}
                      >
                        <source src={item.url} type="video/mp4" />
                        Tu navegador no soporta el video.
                      </video>
                      <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        <svg className="w-14 h-14" fill="#fb923c" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                      </div>
                    </div>
                  )}
                </div>
                <div className={`font-bold text-base text-center py-2 px-2 truncate drop-shadow-sm ${theme === 'light' ? 'text-[#7c3aed] bg-[#f5f0e6]' : 'text-[#fb923c] bg-[#232323]'}`}>{item.title}</div>
              </Card>
            ))}
          </div>
          <div className="gallery-pagination flex gap-3 justify-center mt-6">
            <PurpleButton
              onClick={handlePrev}
              disabled={page === 1}
              className={theme === 'light' ? 'hover:bg-[#fb923c] hover:text-[#fff] bg-[#7c3aed] text-[#fff]' : 'hover:bg-[#fb923c] hover:text-[#232323] bg-[#7c3aed] text-[#fff]'}
              style={{ borderRadius: 0 }}
            >
              Anterior
            </PurpleButton>
            <PurpleButton
              onClick={handleNext}
              disabled={page === totalPages}
              className={theme === 'light' ? 'hover:bg-[#fb923c] hover:text-[#fff] bg-[#7c3aed] text-[#fff]' : 'hover:bg-[#fb923c] hover:text-[#232323] bg-[#7c3aed] text-[#fff]'}
              style={{ borderRadius: 0 }}
            >
              Siguiente
            </PurpleButton>
          </div>
        </Card>
        {selectedVideo && (
          <VideoPlayer
            open={videoOpen}
            onClose={() => setVideoOpen(false)}
            videoUrl={selectedVideo.url}
            title={selectedVideo.title}
          />
        )}
      </main>
    </div>
  );
};

export default Gallery;
