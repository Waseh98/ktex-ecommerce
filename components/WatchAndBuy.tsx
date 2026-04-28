"use client";

import React from "react";

const WatchAndBuy = () => {
  return (
    <section className="py-12 md:py-20 bg-gray-50">
      <div className="container-wide">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-primary uppercase tracking-[0.1em]">
            Watch & Buy
          </h2>
          <div className="w-12 h-[2px] bg-secondary mx-auto mt-3" />
        </div>

        {/* Video Embed Placeholder */}
        <div className="max-w-4xl mx-auto">
          <div className="relative aspect-video bg-gray-200 overflow-hidden">
            {/* Replace this div with a YouTube iframe or video element */}
            <div className="absolute inset-0 flex items-center justify-center bg-primary/5">
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-secondary/10 flex items-center justify-center mx-auto mb-4">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-secondary ml-1">
                    <polygon points="5 3 19 12 5 21 5 3" fill="currentColor" />
                  </svg>
                </div>
                <p className="text-[13px] text-gray-500">Video coming soon</p>
                <p className="text-[11px] text-gray-400 mt-1">Add your YouTube or MP4 video URL</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WatchAndBuy;
