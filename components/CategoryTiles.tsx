"use client";

import React from "react";
import Link from "next/link";

const CategoryTiles = () => {
  const [categories, setCategories] = useState<{label: string, slug: string, image: string}[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/homepage", { cache: 'no-store' })
      .then(res => res.json())
      .then(data => {
        if (data.categoryTiles) setCategories(data.categoryTiles);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading || categories.length === 0) return null;

  return (
    <section className="py-12 md:py-16 bg-white">
      <div className="container-wide">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {categories.map((cat, idx) => (
            <Link
              key={idx}
              href={`/collection/${cat.slug}`}
              className="group relative aspect-[3/4] overflow-hidden"
            >
              {/* Image */}
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                style={{ backgroundImage: `url(${cat.image})` }}
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

              {/* Label */}
              <div className="absolute bottom-0 left-0 right-0 p-5 text-center">
                <h3 className="text-white text-sm md:text-base font-bold uppercase tracking-[0.15em]">
                  {cat.label}
                </h3>
                <div className="mt-2 h-[2px] w-8 bg-secondary mx-auto transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryTiles;
