import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import './styles/scroll-motion.css'
import './styles/mobile.css'
import App from './App.jsx'
import SmoothScroll from './components/SmoothScroll/SmoothScroll.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <SmoothScroll>
        <App />
      </SmoothScroll>
    </BrowserRouter>
  </StrictMode>,
)
