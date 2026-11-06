'use client'
import React from 'react'

import { assets } from '@/assets/assets'
import Image from 'next/image';
import { useAppContext } from '@/context/AppContext';

const ProductCard = ({ product }) => {

    const { currency, router, addToCart, wishlist, toggleWishlist } = useAppContext();
    const isWishlisted = wishlist.includes(product._id);

    return (
        <div
            onClick={() => { router.push('/product/' + product._id); scrollTo(0, 0) }}
            className="flex flex-col items-start gap-0.5 max-w-[200px] w-full cursor-pointer group"
        >
            <div className="cursor-pointer relative bg-gray-500/10 rounded-lg w-full h-52 flex items-center justify-center overflow-hidden">
                <Image
                    src={product.image[0]}
                    alt={product.name}
                    className="group-hover:scale-105 transition object-cover w-4/5 h-4/5 md:w-full md:h-full"
                    width={800}
                    height={800}
                />
                <button
                    suppressHydrationWarning
                    onClick={(e) => {
                        e.stopPropagation();
                        toggleWishlist(product._id);
                    }}
                    className={`absolute top-2 right-2 p-2 rounded-full shadow-md transition ${isWishlisted ? 'bg-red-50 text-red-500' : 'bg-white text-gray-400'}`}
                >
                    <Image
                        className={`h-3.5 w-3.5 ${isWishlisted ? 'fill-red-500' : ''}`}
                        src={assets.heart_icon}
                        alt="heart_icon"
                    />
                </button>
            </div>

            <p className="md:text-base font-medium pt-2 w-full truncate hover:text-orange-600 transition">{product.name}</p>
            <p className="w-full text-xs text-gray-500/70 max-sm:hidden truncate">{product.description}</p>
            <div className="flex items-center gap-2">
                <p className="text-xs">4.5</p>
                <div className="flex items-center gap-0.5">
                    {Array.from({ length: 5 }).map((_, index) => (
                        <Image
                            key={index}
                            className="h-3 w-3"
                            src={
                                index < 4
                                    ? assets.star_icon
                                    : assets.star_dull_icon
                            }
                            alt="star_icon"
                        />
                    ))}
                </div>
            </div>

            <div className="flex items-end justify-between w-full mt-1">
                <p className="text-base font-medium text-gray-900">{currency}{product.offerPrice}</p>
                <button
                    suppressHydrationWarning
                    onClick={(e) => {
                        e.stopPropagation();
                        addToCart(product._id);
                        router.push('/cart');
                    }}
                    className="max-sm:hidden px-4 py-1.5 text-xs text-orange-600 border border-orange-500/40 rounded-full font-medium hover:bg-orange-600 hover:text-white transition"
                >
                    Buy now
                </button>
            </div>

        </div>
    )
}

export default ProductCard