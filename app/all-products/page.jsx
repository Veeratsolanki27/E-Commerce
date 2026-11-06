'use client'
import React, { useState, useEffect } from "react";
import ProductCard from "@/components/ProductCard";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAppContext } from "@/context/AppContext";

const categories = ["All", "Earphone", "Headphone", "Watch", "Smartphone", "Laptop", "Camera", "Accessories"];

const AllProducts = () => {

    const { products, searchQuery, setSearchQuery, selectedCategory, setSelectedCategory } = useAppContext();
    const [hasMounted, setHasMounted] = useState(false);

    useEffect(() => {
        setHasMounted(true);
    }, []);

    const filteredProducts = products.filter((product) => {
        const matchesCategory = selectedCategory === "All" || product.category?.toLowerCase() === selectedCategory.toLowerCase();
        const matchesSearch = !searchQuery.trim() || 
            product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
            product.description?.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <>
            <Navbar />
            <div className="flex flex-col items-start px-6 md:px-16 lg:px-32 py-10 min-h-screen">
                <div className="w-full flex flex-col md:flex-row md:items-center justify-between gap-4 border-b pb-6">
                    <div>
                        <h1 className="text-2xl font-semibold text-gray-800">Explore All Products</h1>
                        <p className="text-sm text-gray-500 mt-1">Browse our collection of premium gadgets and electronics</p>
                    </div>

                    {/* Search Bar */}
                    <div className="relative max-w-xs w-full">
                        <input
                            suppressHydrationWarning
                            type="text"
                            placeholder="Search catalog..."
                            className="w-full pl-4 pr-10 py-2 border rounded-full text-sm outline-none focus:border-orange-500 transition bg-gray-50"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        {searchQuery && (
                            <button
                                suppressHydrationWarning
                                onClick={() => setSearchQuery('')}
                                className="absolute right-3 top-2 text-xs text-gray-400 hover:text-gray-600"
                            >
                                ✕
                            </button>
                        )}
                    </div>
                </div>

                {/* Category Filter Pills */}
                <div className="flex items-center gap-2 overflow-x-auto w-full py-4 scrollbar-none">
                    {categories.map((cat) => (
                        <button
                            suppressHydrationWarning
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            className={`px-4 py-1.5 rounded-full text-xs font-medium text-nowrap transition ${
                                hasMounted && selectedCategory === cat
                                    ? "bg-orange-600 text-white shadow-sm"
                                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                            }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>


                {/* Product Grid */}
                {filteredProducts.length === 0 ? (
                    <div className="w-full text-center py-20 text-gray-500 space-y-3">
                        <p className="text-lg">No products found matching your search or category.</p>
                        <button
                            onClick={() => { setSelectedCategory("All"); setSearchQuery(""); }}
                            className="px-5 py-2 text-xs bg-orange-600 text-white rounded-full hover:bg-orange-700 transition"
                        >
                            Reset Filters
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 flex-col items-center gap-6 mt-6 pb-14 w-full">
                        {filteredProducts.map((product) => (
                            <ProductCard key={product._id} product={product} />
                        ))}
                    </div>
                )}
            </div>
            <Footer />
        </>
    );
};

export default AllProducts;

