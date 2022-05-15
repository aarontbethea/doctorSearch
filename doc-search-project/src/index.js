import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ReactDOM from 'react-dom/client';
import './index.css';
//import App from './App';
import reportWebVitals from './reportWebVitals';


//get pages to render
import Layout from "./pages/Layout.js";
import NppesSearchPg from './pages/SearchNPPES';
import AboutPg from './pages/About';
import PageNotFound from './pages/NoPage';
import Footer from './widgets/footer';

export default function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<NppesSearchPg />} />
          <Route path="nppesSearch" element={<NppesSearchPg/>} />
          <Route path="about" element={<AboutPg />} />
          <Route path="*" element={<PageNotFound />} />
        </Route>
        
      </Routes>
    </BrowserRouter>
    <Footer/>
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
