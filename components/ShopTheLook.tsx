"use client";

import React from "react";
import Link from "next/link";

const ShopTheLook = () => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/homepage", { cache: 'no-store' })
      .then(res => res.json())
      .then(json => {
        if (json.shopTheLook) setData(json.shopTheLook);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading || !data || !data.image) return null;

  return (
    <section className="py-12 md:py-20 bg-gray-50">
      <div className="container-wide">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-primary uppercase tracking-[0.1em]">
            {data.title || "Shop the Look"}
          </h2>
          <div className="w-12 h-[2px] bg-secondary mx-auto mt-3" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
          {/* Lifestyle Image */}
          <div className="relative aspect-[4/5] lg:aspect-auto overflow-hidden group">
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
              style={{
                backgroundImage: `url(${data.image})`,
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 text-left">
              <p className="text-white/80 text-[11px] uppercase tracking-wider mb-2">{data.label || "Curated Style"}</p>
              <h3 className="text-white text-xl md:text-2xl font-bold">{data.subtitle || "New Collection"}</h3>
            </div>
          </div>

          {/* Product Cards Side */}
          <div className="grid grid-cols-2 gap-4">
            {data.products?.map((product: any, idx: number) => (
              <Link key={idx} href={product.link || "#"} className="group">
                <div className="relative aspect-[3/4] overflow-hidden bg-gray-100 mb-3">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <h4 className="text-[13px] font-medium text-primary group-hover:text-secondary transition-colors">
                  {product.name}
                </h4>
                <p className="text-[13px] font-bold text-primary mt-1">{product.price}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShopTheLook;
