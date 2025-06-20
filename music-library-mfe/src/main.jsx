import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import MusicLibrary from './MusicLibrary.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <MusicLibrary />
  </StrictMode>,
)
