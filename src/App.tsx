import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import './pages/Gallery.css';
import Gallery from './pages/Gallery';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Gallery />
    </>
  )
}

export default App
