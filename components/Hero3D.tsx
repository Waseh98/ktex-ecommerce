"use client";

import React, { Suspense } from "react";
import { Canvas, useLoader, useThree } from "@react-three/fiber";
import { OrbitControls, Environment, Float, Sparkles } from "@react-three/drei";
import * as THREE from "three";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

// A 3D thick canvas print component
function Floating3DImage({ url, basePosition, baseScale, rotation, speed = 2 }: { url: string, basePosition: [number, number, number], baseScale: [number, number], rotation?: [number, number, number], speed?: number }) {
  const texture = useLoader(THREE.TextureLoader, url);
  texture.colorSpace = THREE.SRGBColorSpace; // Ensure colors pop correctly
  const { viewport } = useThree();
  
  // Responsive calculations
  const isMobile = viewport.width < 5;
  const scaleFactor = isMobile ? 0.6 : 1;
  const positionFactor = isMobile ? 0.4 : 1;

  const position: [number, number, number] = [
    basePosition[0] * positionFactor,
    basePosition[1],
    isMobile ? basePosition[2] - 2 : basePosition[2] // Push back slightly on mobile to fit better
  ];

  const scale: [number, number] = [
    baseScale[0] * scaleFactor,
    baseScale[1] * scaleFactor
  ];

  return (
    <Float speed={speed} rotationIntensity={isMobile ? 0.8 : 1.5} floatIntensity={isMobile ? 1.5 : 3} position={position} rotation={rotation}>
      <mesh castShadow receiveShadow>
        {/* [width, height, depth] -> gives it a physical 3D thickness */}
        <boxGeometry args={[scale[0], scale[1], 0.3]} />
        {/* 6 faces of the box: right, left, top, bottom, front (image), back */}
        <meshStandardMaterial attach="material-0" color="#222" roughness={0.8} />
        <meshStandardMaterial attach="material-1" color="#222" roughness={0.8} />
        <meshStandardMaterial attach="material-2" color="#222" roughness={0.8} />
        <meshStandardMaterial attach="material-3" color="#222" roughness={0.8} />
        <meshStandardMaterial attach="material-4" map={texture} roughness={0.2} metalness={0.1} />
        <meshStandardMaterial attach="material-5" color="#111" roughness={0.8} />
      </mesh>
    </Float>
  );
}

const Hero3D = () => {
  return (
    <section className="relative w-full h-screen overflow-hidden bg-[#050505]">
      {/* 3D Canvas */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
          <color attach="background" args={["#050505"]} />
          <ambientLight intensity={0.6} />
          <directionalLight position={[10, 10, 5]} intensity={1.5} color="#ffffff" castShadow />
          <directionalLight position={[-10, -10, -5]} intensity={0.5} color="#c5a880" />
          
          <Suspense fallback={null}>
             {/* Left floating 3D block */}
             <Floating3DImage url="/images/hero-img-1.jpg" basePosition={[-3.5, 0.5, -2]} baseScale={[3, 4]} rotation={[0, 0.4, -0.1]} speed={1.5} />
             {/* Right floating 3D block */}
             <Floating3DImage url="/images/hero-img-2.jpg" basePosition={[3.5, -0.5, -3]} baseScale={[3.5, 4.5]} rotation={[0, -0.4, 0.1]} speed={1.2} />
          </Suspense>

          <Sparkles count={150} scale={15} size={2.5} speed={0.4} opacity={0.6} color="#c5a880" />
          
          <Environment preset="city" />
          {/* Controls to let user drag and look around */}
          <OrbitControls 
            enableZoom={false} 
            enablePan={false}
            maxPolarAngle={Math.PI / 2 + 0.2}
            minPolarAngle={Math.PI / 2 - 0.2}
            maxAzimuthAngle={0.4}
            minAzimuthAngle={-0.4}
          />
        </Canvas>
      </div>

      {/* HTML Overlay Content - Responsive paddings and typography */}
      <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
        <div className="text-center px-4 md:px-8 max-w-4xl w-full">
          {/* Using heavy drop shadows instead of a blurry background box */}
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-white mb-4 md:mb-6 tracking-tight" style={{ textShadow: "0px 4px 20px rgba(0,0,0,0.8), 0px 0px 10px rgba(0,0,0,0.5)" }}>
            Premium Fabrics <br className="hidden md:block"/>
            <span className="text-[#c5a880]">Reimagined.</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-200 mb-8 md:mb-10 max-w-2xl mx-auto font-medium px-2" style={{ textShadow: "0px 2px 10px rgba(0,0,0,0.8)" }}>
            Experience the finest quality textiles crafted for elegance, comfort, and timeless style.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 pointer-events-auto">
            <Link 
              href="/shop" 
              className="group flex items-center justify-center gap-2 bg-[#c5a880] text-black w-full sm:w-auto px-8 py-3.5 sm:py-4 rounded-full font-semibold hover:bg-[#b09570] transition-all duration-300 transform hover:scale-105 shadow-[0_0_20px_rgba(197,168,128,0.3)]"
            >
              Explore Collection
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link 
              href="/about" 
              className="w-full sm:w-auto text-center px-8 py-3.5 sm:py-4 rounded-full font-semibold text-white border border-white/30 hover:bg-white/10 transition-all duration-300 backdrop-blur-sm shadow-lg"
            >
              Our Story
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero3D;
