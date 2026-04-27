"use client";

import React, { useState } from "react";
import { ChevronDown, X } from "lucide-react";

const FilterSidebar = () => {
  const [activeSections, setActiveSections] = useState<string[]>(["category", "size", "color"]);

  const toggleSection = (section: string) => {
    setActiveSections(prev => 
      prev.includes(section) ? prev.filter(s => s !== section) : [...prev, section]
    );
  };

  const filters = [
    { id: "category", name: "Category", options: ["Unstitched", "Kurta", "Trousers", "Dupattas", "Accessories"] },
    { id: "size", name: "Size", options: ["XS", "S", "M", "L", "XL"] },
    { id: "color", name: "Color", options: ["Charcoal", "Gold", "Rose", "Forest", "Ivory"] },
    { id: "fabric", name: "Fabric", options: ["Cotton", "Silk", "Velvet", "Chiffon", "Lawn"] },
  ];

  return (
    <aside className="w-full lg:w-64 flex-shrink-0">
      <div className="sticky top-32 space-y-8">
        <div className="flex items-center justify-between lg:hidden mb-6">
          <h2 className="text-xl font-serif">Filters</h2>
          <button className="p-2"><X size={20} /></button>
        </div>

        {filters.map((filter) => (
          <div key={filter.id} className="border-b border-gray-100 pb-6">
            <button
              onClick={() => toggleSection(filter.id)}
              className="flex items-center justify-between w-full text-left mb-4 group"
            >
              <span className="text-xs font-bold uppercase tracking-widest group-hover:text-secondary transition-colors">
                {filter.name}
              </span>
              <ChevronDown
                size={16}
                className={`transition-transform duration-300 ${activeSections.includes(filter.id) ? "rotate-180" : ""}`}
              />
            </button>

            <div className={`space-y-2 overflow-hidden transition-all duration-300 ${activeSections.includes(filter.id) ? "max-h-60 opacity-100" : "max-h-0 opacity-0"}`}>
              {filter.options.map((option) => (
                <label key={option} className="flex items-center space-x-3 cursor-pointer group">
                  <div className="w-4 h-4 border border-gray-300 flex items-center justify-center group-hover:border-secondary transition-colors">
                    <div className="w-2 h-2 bg-secondary opacity-0 transition-opacity" />
                  </div>
                  <span className="text-sm text-gray-600 group-hover:text-primary transition-colors">{option}</span>
                </label>
              ))}
            </div>
          </div>
        ))}

        <div className="pt-4">
           <button className="w-full py-3 bg-secondary text-white text-[10px] font-bold uppercase tracking-widest hover:bg-primary transition-colors">
              Clear All
           </button>
        </div>
      </div>
    </aside>
  );
};

export default FilterSidebar;
