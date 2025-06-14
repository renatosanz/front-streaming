import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";

// Simulación de datos de galería estilo magazine
const mockData = Array.from({ length: 60 }, (_, i) => ({
  id: i + 1,
  type: i % 3 === 0 ? "video" : "photo",
  url:
    i % 3 === 0
      ? `https://samplelib.com/mp4/sample-5s.mp4`
      : `https://picsum.photos/400/300?random=${i}`,
  title: [
    "Lo Que las Películas de Disney Pueden Enseñarnos Sobre Ilustración",
    "La Industria de la Ilustración Está Cambiando Rápidamente",
    "El Mejor Enfoque para la Dirección Artística para Cada Tipo de Personalidad",
    "El Futuro del Arte, Según un Experto",
    "15 Consejos Brillantes para Principiantes en Ilustración",
    "6 Tendencias Globales Que Afectarán el Arte en 2023",
    "¡Shh! No Compartas Este Secreto Interno de Branding",
    "La Verdad Cruda de la Ilustración",
    "6 Errores Imperdonables que Todo el Mundo Comete en Arte",
  ][i % 9],
  category: [
    "ARTE",
    "ABSTRACTO",
    "ILUSTRACION",
    "MEMORIA",
    "BIOGRAFIA",
    "SOMBRA",
    "LINEAS",
    "ARTESANIA",
    "DISEÑO",
  ][i % 9],
  description:
    "Muy lejos, detrás de las montañas de palabras, alejados de los países de Vokalia y Consonantia, viven los textos ciegos.",
  date: "4 de Enero, 2023",
}));

const categories = [
  "TODOS",
  "ARTE",
  "ABSTRACTO",
  "ILUSTRACION",
  "MEMORIA",
  "BIOGRAFIA",
  "SOMBRA",
  "LINEAS",
  "ARTESANIA",
  "DISEÑO",
];

const ITEMS_PER_PAGE = 9;

const VideoPlayer = ({ open, onClose, videoUrl, title }) => {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white p-4 max-w-4xl w-full mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold">{title}</h3>
          <button onClick={onClose} className="text-xl">
            &times;
          </button>
        </div>
        <video controls className="w-full">
          <source src={videoUrl} type="video/mp4" />
        </video>
      </div>
    </div>
  );
};

const Gallery = () => {
  const [page, setPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("TODOS");
  const [videoOpen, setVideoOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);

  const filteredData =
    selectedCategory === "TODOS"
      ? mockData
      : mockData.filter((item) => item.category === selectedCategory);

  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
  const startIdx = (page - 1) * ITEMS_PER_PAGE;
  const currentItems = filteredData.slice(startIdx, startIdx + ITEMS_PER_PAGE);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setPage(1);
  };

  const handleVideoClick = (item) => {
    setSelectedVideo(item);
    setVideoOpen(true);
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b border-gray-200">
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-between items-center mb-8">
            <nav className="hidden md:flex space-x-8 text-sm w-full justify-center">
              <a href="#" className="hover:text-gray-600 text-black">
                Inicio
              </a>
              <a href="#" className="hover:text-gray-600 text-black">
                Páginas
              </a>
              <a href="#" className="hover:text-gray-600 text-black">
                Trabajos
              </a>
              <a href="#" className="hover:text-gray-600 text-black">
                Blog
              </a>
              <a href="#" className="hover:text-gray-600 text-black">
                Características
              </a>
            </nav>
          </div>

          <div className="text-center">
            <h1
              className="text-6xl md:text-8xl font-bold tracking-wider mb-8"
              style={{ fontSize: "10rem", color: "var(--primary-color" }}
            >
              ARPATECA
            </h1>
          </div>
        </div>
      </header>

      {/* Categories */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center">
          <div className="text-sm mb-6">
            <span className="font-medium mr-4">CATEGORÍAS</span>
          </div>
          <div className="flex flex-wrap gap-2 mb-8">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryChange(category)}
                className={`border text-sm font-medium transition-colors button_category ${
                  selectedCategory === category && "button_category_select"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mb-12 gap-4">
          {currentItems.map((item) => (
            <Card
              key={item.id}
              className="border border-gray-200 overflow-hidden group"
            >
              <div className="p-4 border-b border-gray-200">
                <div className="flex justify-between items-center text-sm text-gray-600 mb-2">
                  <span>{item.date}</span>
                  <span className="border border-gray-300 px-2 py-1 text-xs">
                    {item.category}
                  </span>
                </div>
              </div>

              <div className="relative overflow-hidden">
                {item.type === "photo" ? (
                  <img
                    src={item.url}
                    alt={item.title}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div
                    className="relative cursor-pointer"
                    onClick={() => handleVideoClick(item)}
                  >
                    <video
                      className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                      poster={`https://picsum.photos/400/300?random=${item.id}`}
                    >
                      <source src={item.url} type="video/mp4" />
                    </video>
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
                        <svg
                          className="w-6 h-6 ml-1"
                          fill="black"
                          viewBox="0 0 24 24"
                        >
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="p-4">
                <h3 className="font-bold text-lg mb-3 leading-tight">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                  {item.description}
                </p>
                <button className="text-sm font-medium border-b border-black pb-1 hover:opacity-70 transition-opacity">
                  LEER MÁS
                </button>
              </div>
            </Card>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center gap-2">
            <button
              onClick={() => setPage(Math.max(1, page - 1))}
              disabled={page === 1}
              className="px-4 py-2 border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:border-black transition-colors"
            >
              Anterior
            </button>
            <span className="px-4 py-2 border border-gray-300">
              {page} de {totalPages}
            </span>
            <button
              onClick={() => setPage(Math.min(totalPages, page + 1))}
              disabled={page === totalPages}
              className="px-4 py-2 border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:border-black transition-colors"
            >
              Siguiente
            </button>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-200 mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-sm text-gray-600 mb-8">
            www.DescargaNuevosTemas.com
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-sm">
            <div>
              <h4 className="font-medium mb-4">Gexa © Tema</h4>
            </div>
            <div>
              <h4 className="font-medium mb-4">Información</h4>
              <div className="space-y-2 text-gray-600">
                <p>hola@gexatema.com</p>
                <p>Los Ángeles, CA 90028</p>
                <p>Estados Unidos</p>
                <p>645-789-2653</p>
              </div>
            </div>
            <div>
              <h4 className="font-medium mb-4">Conectar</h4>
              <div className="space-y-2 text-gray-600">
                <p>Facebook</p>
                <p>Twitter</p>
                <p>Instagram</p>
                <p>YouTube</p>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 mt-8 pt-8 flex justify-between text-xs text-gray-500">
            <span>© 2023, GEXA</span>
            <span>TODOS LOS DERECHOS RESERVADOS</span>
            <span>POR NEWTONTHEMES</span>
          </div>
        </div>
      </footer>

      {/* Video Player Modal */}
      <VideoPlayer
        open={videoOpen}
        onClose={() => setVideoOpen(false)}
        videoUrl={selectedVideo?.url}
        title={selectedVideo?.title}
      />
    </div>
  );
};

export default Gallery;
