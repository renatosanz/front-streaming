import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import ThemeToggle from "../components/ui/ThemeToggle";

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

const getfilms = () => {
  return fetch("http://172.30.174.32:3000/getMetadatos")
    .then((data) => data.json())
    .then((films) => {
      console.log(films);
      const new_data = films.map((film: any) => {
        return {
          id: 1,
          type: "video",
          title: film.titulo_original,
          url: film.video_titulo,
          category: film.genero,
          date: film.ano_estreno,
          description: film.sinopsis,
          poster_url: film.poster_name,
        };
      });
      return new_data;
    });
};

const categories = ["drama", "cine ensayo documental", "documental", "TODOS"];

const ITEMS_PER_PAGE = 6;

// Tipado para VideoPlayer
interface VideoPlayerProps {
  open: boolean;
  onClose: () => void;
  videoUrl: string;
  title: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({
  open,
  onClose,
  videoUrl,
  title,
}) => {
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
          <source
            src={`http://172.30.174.32:3000/api/videos/stream/${videoUrl}`}
            type="video/mp4"
          />
        </video>
      </div>
    </div>
  );
};

const Gallery = () => {
  const [page, setPage] = useState<number>(1);
  const [selectedCategory, setSelectedCategory] = useState<string>("TODOS");
  const [videoOpen, setVideoOpen] = useState<boolean>(false);
  const [selectedVideo, setSelectedVideo] = useState<{
    url: string;
    title: string;
  } | null>(null);
  const [theme, setTheme] = useState<"light" | "dark">(
    typeof window !== "undefined" &&
      document.documentElement.classList.contains("dark")
      ? "dark"
      : "light"
  );
  const [allData, setAllData] = useState<any[]>([]);
  const [currentItems, setCurrentItems] = useState([]);

  useEffect(() => {
    getfilms().then((data) => {
      setAllData(data); // Guardamos todos los datos
      setCurrentItems(data.slice(startIdx, startIdx + ITEMS_PER_PAGE));
    });
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [theme]);

  const filteredData =
    selectedCategory === "TODOS"
      ? allData
      : allData.filter((item: any) =>
          item.category.toLowerCase().includes(selectedCategory.toLowerCase())
        );

  useEffect(() => {
    const startIdx = (page - 1) * ITEMS_PER_PAGE;
    setCurrentItems(filteredData.slice(startIdx, startIdx + ITEMS_PER_PAGE));
  }, [page, filteredData]);

  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
  const startIdx = (page - 1) * ITEMS_PER_PAGE;

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setPage(1);
  };

  const handleVideoClick = (item: { url: string; title: string }) => {
    setSelectedVideo(item);
    setVideoOpen(true);
  };

  return (
    <div className="min-h-screen bg-[var(--bg-color)] text-[var(--primary-color)] w-full">
      {/* Header */}
      <header className="w-full">
        <div className="w-full px-0 sm:px-4 py-8 mx-0">
          <div className="flex flex-col md:flex-row justify-end items-center mb-8 gap-4">
            <ThemeToggle onThemeChange={setTheme} />
          </div>
          <div className="text-center">
            <h1
              className="text-4xl sm:text-6xl md:text-8xl font-bold tracking-wider mb-8 text-[var(--primary-color)] justify-center"
              style={{ fontSize: "clamp(2.5rem, 10vw, 10rem)" }}
            >
              ARPATECA
            </h1>
          </div>
        </div>
      </header>
      {/* Categories */}
      <div className="w-full px-0 sm:px-4 py-8 mx-0">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 w-full">
          <div className="text-sm mb-2 sm:mb-6">
            <span className="font-medium mr-4">CATEGORÍAS</span>
          </div>
          <div className="flex flex-wrap gap-2 mb-4 sm:mb-8 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryChange(category)}
                className={` text-sm font-medium transition-colors button_category ${
                  selectedCategory === category ? "button_category_select" : ""
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xxl:grid-cols-4 max-w-full gap-4 md:gap-8 mb-12 w-full">
          {currentItems?.map((item: any) => (
            <Card
              key={item.id}
              className="overflow-hidden group bg-[var(--bg-color)]"
            >
              <div className="p-4">
                <div className="flex flex-col sm:flex-row justify-between items-center text-sm text-[var(--primary-color)] mb-2 gap-2">
                  <span>{item.date}</span>
                  <span className="border border-[var(--border-color)] px-2 py-1 text-xs  category">
                    {item.category}
                  </span>
                </div>
              </div>
              <div className="relative overflow-hidden">
                {item.type === "photo" ? (
                  <img
                    src={item.url}
                    alt={item.title}
                    className="w-full h-48 sm:h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div
                    className="relative cursor-pointer"
                    onClick={() => handleVideoClick(item)}
                  >
                    <video
                      className="w-full h-48 sm:h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                      poster={`http://172.30.174.32:3000/api/images/serve/${item.poster_url}`}
                    >
                      <source src={item.url} type="video/mp4" />
                    </video>
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white  flex items-center justify-center">
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
                <p className="text-[var(--primary-color)] text-sm leading-relaxed mb-4">
                  {item.description}
                </p>
              </div>
            </Card>
          ))}
        </div>
        {/* Pagination */}
        {totalPages > 1 && (
          <div className="pagination flex flex-wrap justify-center gap-2 mt-8">
            <button
              onClick={() => setPage(Math.max(1, page - 1))}
              disabled={page === 1}
              className="px-4 py-2 font-medium border border-[var(--border-color)] bg-white text-[var(--primary-color)] shadow-sm disabled:opacity-50 disabled:cursor-not-allowed hover:border-[var(--secondary-color)] hover:bg-[var(--secondary-color)] hover:text-white transition-colors"
            >
              Anterior
            </button>
            <span className="px-4 py-2 font-medium border border-[var(--secondary-color)] bg-white shadow-sm select-none pagination-current">
              {page} de {totalPages}
            </span>
            <button
              onClick={() => setPage(Math.min(totalPages, page + 1))}
              disabled={page === totalPages}
              className="px-4 py-2 font-medium border border-[var(--border-color)] bg-white text-[var(--primary-color)] shadow-sm disabled:opacity-50 disabled:cursor-not-allowed hover:border-[var(--secondary-color)] hover:bg-[var(--secondary-color)] hover:text-white transition-colors"
            >
              Siguiente
            </button>
          </div>
        )}
      </div>
      {/* Footer */}
      <footer className="mt-16 w-full">
        <div className="w-full px-0 sm:px-4 py-8 mx-0">
          <div className="text-center text-sm mb-8 text-footer">
              {/* Puedes agregar aquí un texto o dejarlo vacío */}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-sm w-full">
            <div>
              <h4 className="font-medium mb-4">BUAP ®</h4>
            </div>
            <div>
              <h4 className="font-medium mb-4">Información</h4>
              <ul className="space-y-2 text-footer list-none p-0 m-0">
                <li><a href="https://admin.arpa.buap.mx/directorio-arpa/">Directorio</a></li>
                <li>4 Sur 104 Centro Histórico C.P. 72000</li>
                <li>Estado de Puebla</li>
                <li><a href="tel:+52 (222) 229 55 00">+52 (222) 229 55 00</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-4">Conectar</h4>
              <ul className="space-y-2 text-footer list-none p-0 m-0">
                <li><a href="http://www.transparencia.buap.mx/" target="_blank" rel="noopener noreferrer">Transparencia y Acceso a la Información</a></li>
                <li><a href="https://https://consultapublicamx.inai.org.mx/vut-web/?idSujetoObigadoParametro=4479&idEntidadParametro=21&idSectorParametro=24.com" target="_blank" rel="noopener noreferrer">Obligaciones de Transparencia</a></li>
                <li><a href="http://www.pdi.buap.mx/" target="_blank" rel="noopener noreferrer">PDI 2017</a></li>
                <li><a href="http://www.buap.mx/privacidad" target="_blank" rel="noopener noreferrer">Aviso de privacidad</a></li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
      {/* Video Player Modal */}
      <VideoPlayer
        open={videoOpen}
        onClose={() => setVideoOpen(false)}
        videoUrl={selectedVideo?.url || ""}
        title={selectedVideo?.title || ""}
      />
    </div>
  );
};

export default Gallery;
