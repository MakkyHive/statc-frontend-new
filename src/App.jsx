import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

import Header from './components/Header';
import HomePage from './pages/HomePage';
import SwapPage from './pages/SwapPage';
import LiquidityPage from './pages/LiquidityPage';
import Portfolio from './pages/Portfolio';
import Pools from './pages/Pools';
import Layout from './components/Layout'
import Preloader from './components/Preloader'


function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <Preloader />;



  return (
       <div className="w-screen overflow-x-hidden bg-black text-white">
<div className="hidden animate-orb"></div>

    <BrowserRouter>
      
      <Routes>
 <Route path="/" element={<Layout><HomePage /></Layout>} />
         <Route path="/liquidity" element={<LiquidityPage />} />
        <Route path="/swap" element={<SwapPage />} />
                <Route path="/Portfolio" element={<Portfolio />} />
                                <Route path="/Pools" element={<Pools />} />


      </Routes>
    </BrowserRouter>
    </div>
  );
}


export default App;
