'use client'
import React, { useState, useEffect } from "react";

import ProductCard from "./ProductCard";
import { useAppContext } from "@/context/AppContext";

const categories = ["All", "Earphone", "Headphone", "Watch", "Smartphone", "Laptop", "Camera", "Accessories"];

const HomeProducts = () => {

  const { products, router, setSelectedCategory } = useAppContext();
  const [activeCategory, setActiveCategory] = useState("All");
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  const filteredProducts = activeCategory === "All"
    ? products
    : products.filter(p => p.category?.toLowerCase() === activeCategory.toLowerCase());

  const handleCategoryClick = (cat) => {
    setActiveCategory(cat);
  };

  const handleSeeMore = () => {
    setSelectedCategory(activeCategory);
    router.push('/all-products');
  };

  return (
    <div className="flex flex-col items-center pt-14">
      <div className="flex flex-col md:flex-row md:items-center justify-between w-full gap-4">
        <p className="text-2xl font-medium text-left text-gray-800">Popular products</p>
        
        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto max-w-full pb-2 md:pb-0 scrollbar-none">
          {categories.map((cat) => (
            <button
              suppressHydrationWarning
              key={cat}
              onClick={() => handleCategoryClick(cat)}
              className={`px-3.5 py-1 rounded-full text-xs font-medium transition text-nowrap ${
                hasMounted && activeCategory === cat
                  ? "bg-orange-600 text-white shadow-sm"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>


      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 flex-col items-center gap-6 mt-8 pb-14 w-full">
        {filteredProducts.slice(0, 10).map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>

      <button suppressHydrationWarning onClick={handleSeeMore} className="px-12 py-2.5 border rounded text-gray-600 font-medium hover:bg-orange-50 hover:text-orange-600 border-gray-300 transition">
        See more
      </button>

    </div>
  );
};

export default HomeProducts;

