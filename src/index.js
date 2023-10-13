import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Scan from './scanner';
import reportWebVitals from './reportWebVitals';
import swDev from './DevSer';
import Options from './principPage';
import Galerie from './galerie';
import Apropos from './Apropos';
import Conferenciers from './Conferenciers';
import Endirect from './Endirect';
import Eposter from './Eposter';
import Exposants from './Exposants';
import Favoris from './Favoris';
import Atelier from './ateliers';
import { BrowserRouter, Routes, Route } from "react-router-dom";
const root = ReactDOM.createRoot(document.getElementById('root'));
// rooting 
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route index element={<App />} />
        <Route path="/app" element={<Options />} />
        <Route path="/scanner" element={<Scan />} />
        <Route path="/Atelier" element={<Atelier />} />
        <Route path="/galerie" element={<Galerie />} />
        <Route path="/direct" element={<Endirect />} />
        <Route path="/Conférenciers" element={<Conferenciers />} />
        <Route path="/e-poster" element={<Eposter />} />
        <Route path="/Exposants" element={<Exposants />} />
        <Route path="/Favoris" element={<Favoris />} />
        <Route path="/À propos" element={<Apropos />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
swDev();
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
