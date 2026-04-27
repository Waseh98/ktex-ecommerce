"use client";

import React, { useEffect, useRef, useState } from "react";
import Quagga from "quagga";
import { X, Camera, RefreshCw } from "lucide-react";

interface BarcodeScannerProps {
  onDetected: (code: string) => void;
  onClose: () => void;
}

const BarcodeScanner: React.FC<BarcodeScannerProps> = ({ onDetected, onClose }) => {
  const scannerRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (scannerRef.current) {
      Quagga.init(
        {
          inputStream: {
            name: "Live",
            type: "LiveStream",
            target: scannerRef.current,
            constraints: {
              facingMode: "environment",
            },
          },
          decoder: {
            readers: ["ean_reader", "ean_8_reader", "code_128_reader", "code_39_reader"],
          },
        },
        (err) => {
          if (err) {
            console.error(err);
            setError("Could not access camera. Please ensure you have given permission.");
            return;
          }
          Quagga.start();
        }
      );

      Quagga.onDetected((data) => {
        if (data.codeResult && data.codeResult.code) {
          onDetected(data.codeResult.code);
          Quagga.stop();
        }
      });
    }

    return () => {
      Quagga.stop();
    };
  }, [onDetected]);

  return (
    <div className="fixed inset-0 z-[120] bg-black flex flex-col items-center justify-center p-4">
      <button
        onClick={onClose}
        className="absolute top-6 right-6 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-all z-20"
      >
        <X size={24} />
      </button>

      <div className="relative w-full max-w-lg aspect-square border-2 border-secondary overflow-hidden rounded-lg">
        <div ref={scannerRef} className="w-full h-full [&>video]:w-full [&>video]:h-full [&>video]:object-cover" />
        
        {/* Overlay Scanner UI */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
           <div className="w-[70%] h-[40%] border-2 border-secondary rounded-sm relative">
              <div className="absolute inset-x-0 top-1/2 h-0.5 bg-red-500 animate-pulse" />
           </div>
        </div>

        {error && (
          <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center text-center p-8">
            <Camera size={48} className="text-gray-500 mb-6" />
            <p className="text-white text-sm font-serif mb-8">{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="px-8 py-3 bg-secondary text-white text-xs font-bold uppercase tracking-widest flex items-center space-x-2"
            >
              <RefreshCw size={14} />
              <span>Retry</span>
            </button>
          </div>
        )}
      </div>

      <div className="mt-12 text-center text-white/60 space-y-2">
         <p className="text-[10px] font-bold uppercase tracking-[0.3em]">Scan Product Barcode</p>
         <p className="text-xs">Position the barcode within the frame to search</p>
      </div>
    </div>
  );
};

export default BarcodeScanner;
