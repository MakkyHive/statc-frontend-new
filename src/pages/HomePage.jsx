import React from 'react';
import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import Features from '../components/Features';
import Footer from '../components/Footer';
import RoadmapSection from '../components/RoadmapSection';
import WhyChooseSection from '../components/WhyChooseSection';
import ToolsSection from '../components/ToolsSection';
import IntegratedProtocols from '../components/IntegratedProtocols';
import Background from '../components/Background';
import PlatformStats from '../components/PlatFormStats';
import '../index.css'
import SecurityTalks from '../components/SecurityTalks';


const HomePage = () => {

  return (
    <div className="relative z-0 min-h-screen font-sans text-white overflow-x-hidden">
      <Background/>


      <Header />
      <HeroSection />
      <PlatformStats/>
      <SecurityTalks/>
      <Features />
      <RoadmapSection />
      <WhyChooseSection />
      <ToolsSection />
      <IntegratedProtocols />
      <Footer />
      </div>
  
  );
};

export default HomePage;
