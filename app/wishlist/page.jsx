'use client'
import React, { useState, useEffect } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ProductCard from '@/components/ProductCard'
import { useAppContext } from '@/context/AppContext'

const Wishlist = () => {
    const { products, wishlist, router, addToCart } = useAppContext();
    const [hasMounted, setHasMounted] = useState(false);

    useEffect(() => {
        setHasMounted(true);
    }, []);

    const wishlistedProducts = products.filter(p => wishlist.includes(p._id));

    const handleAddAllToCart = () => {
        wishlistedProducts.forEach(item => {
            addToCart(item._id);
        });
        router.push('/cart');
    };

    return (
        <>
            <Navbar />
            <div className="px-6 md:px-16 lg:px-32 py-10 min-h-screen">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b pb-6">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                            <span>❤️ My Wishlist</span>
                            <span className="text-sm font-normal text-gray-500">
                                ({hasMounted ? wishlistedProducts.length : 0} items)
                            </span>
                        </h1>
                        <p className="text-xs text-gray-500 mt-1">Your saved products for future shopping</p>
                    </div>

                    {hasMounted && wishlistedProducts.length > 0 && (
                        <div className="flex items-center gap-3">
                            <button
                                onClick={handleAddAllToCart}
                                className="px-5 py-2 bg-orange-600 hover:bg-orange-700 text-white text-xs font-medium rounded-full transition shadow-sm"
                            >
                                🛒 Add All to Cart
                            </button>
                        </div>
                    )}
                </div>

                {/* Wishlist Items Grid */}
                {!hasMounted || wishlistedProducts.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-24 text-center space-y-4">
                        <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center text-3xl">
                            ❤️
                        </div>
                        <h2 className="text-xl font-bold text-gray-800">Your wishlist is empty</h2>
                        <p className="text-xs text-gray-500 max-w-sm">
                            Explore our product catalog and click the heart icon on any product to save it here!
                        </p>
                        <button
                            onClick={() => router.push('/all-products')}
                            className="px-6 py-2.5 bg-orange-600 text-white text-xs font-medium rounded-full hover:bg-orange-700 transition shadow-md"
                        >
                            Browse Products
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mt-8 pb-16">
                        {wishlistedProducts.map((product) => (
                            <ProductCard key={product._id} product={product} />
                        ))}
                    </div>
                )}
            </div>
            <Footer />
        </>
    )
}

export default Wishlist
