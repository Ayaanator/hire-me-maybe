import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Application from './Application'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Apply from './Apply';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter basename="/hire-me-maybe">
      <Routes>
        <Route path="/apply/:id" element={<Apply />} />
        <Route path="/" element={<Application />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
)
