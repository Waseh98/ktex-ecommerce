"use client";

import React, { useState } from "react";
import { X } from "lucide-react";
import { PROMO_MESSAGE } from "@/lib/constants";

const AnnouncementBar = () => {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div className="relative bg-primary text-white py-2.5 px-4 text-center z-[51]">
      <p className="text-[11px] font-medium tracking-wider uppercase">
        {PROMO_MESSAGE}
      </p>
      <button
        onClick={() => setVisible(false)}
        className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-white/10 rounded-full transition-colors"
        aria-label="Close announcement"
      >
        <X size={14} />
      </button>
    </div>
  );
};

export default AnnouncementBar;
