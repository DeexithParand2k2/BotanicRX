import React from 'react';
import ReactDOM from 'react-dom/client';

//package imports
import { BrowserRouter, Routes, Route } from 'react-router-dom';

//component imports
import NotFound from './Components/NotFound'

//other
import './index.css';

//page imports
import App from './pages/App'
import Stream from './pages/Stream';
import Match from './pages/Match'
import Upload from './pages/Upload'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App/>}/>
        <Route path="/register" element={<Stream/>}/>
        <Route path="/upload" element={<Upload/>} />
        <Route path="/match" element={<Match/>}/>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
