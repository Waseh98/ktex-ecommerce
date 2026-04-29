"use client";

import React, { useState, useEffect } from "react";

const WatchAndBuy = () => {
  const [videoUrl, setVideoUrl] = useState("");

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await fetch("/api/admin/homepage");
        const data = await res.json();
        if (data.videoUrl) setVideoUrl(data.videoUrl);
      } catch (err) {
        console.error("Failed to fetch video setting", err);
      }
    };
    fetchSettings();
  }, []);

  const getEmbedUrl = (url: string) => {
    if (url.includes("youtube.com") || url.includes("youtu.be")) {
      const id = url.includes("v=") ? url.split("v=")[1].split("&")[0] : url.split("/").pop();
      return `https://www.youtube.com/embed/${id}`;
    }
    return null;
  };

  const embedUrl = getEmbedUrl(videoUrl);

  return (
    <section className="py-12 md:py-20 bg-gray-50">
      <div className="container-wide">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-primary uppercase tracking-[0.1em]">
            Watch & Buy
          </h2>
          <div className="w-12 h-[2px] bg-secondary mx-auto mt-3" />
        </div>

        {/* Video Embed */}
        <div className="max-w-4xl mx-auto">
          <div className="relative aspect-video bg-gray-200 overflow-hidden shadow-2xl rounded-2xl border border-gray-100">
            {videoUrl ? (
              embedUrl ? (
                <iframe 
                  src={embedUrl}
                  className="w-full h-full"
                  allowFullScreen
                />
              ) : (
                <video src={videoUrl} controls className="w-full h-full object-cover" />
              )
            ) : (
              <div className="absolute inset-0 flex items-center justify-center bg-primary/5">
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-secondary/10 flex items-center justify-center mx-auto mb-4">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-secondary ml-1">
                      <polygon points="5 3 19 12 5 21 5 3" fill="currentColor" />
                    </svg>
                  </div>
                  <p className="text-[13px] text-gray-500">Video coming soon</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WatchAndBuy;
