'use client'
import React from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Image from 'next/image'
import { assets } from '@/assets/assets'
import { useAppContext } from '@/context/AppContext'

const AboutUs = () => {
    const { router } = useAppContext();

    const features = [
        {
            title: "Premium Quality Products",
            desc: "We curate top-tier electronics from leading global brands to ensure you receive authentic, long-lasting gadgets.",
            icon: "⚡"
        },
        {
            title: "Lightning Fast Delivery",
            desc: "Our optimized logistics network ensures your orders arrive swiftly and safely right at your doorstep.",
            icon: "🚚"
        },
        {
            title: "24/7 Customer Support",
            desc: "Our dedicated support team is available around the clock to assist you with inquiries, orders, and returns.",
            icon: "🎧"
        },
        {
            title: "100% Secure Checkout",
            desc: "Shop with total peace of mind using bank-level encrypted checkout and verified payment methods.",
            icon: "🛡️"
        }
    ];

    const stats = [
        { number: "50,000+", label: "Happy Customers" },
        { number: "1,200+", label: "Top Tech Products" },
        { number: "99.8%", label: "On-Time Delivery Rate" },
        { number: "4.9 / 5", label: "Average Customer Rating" }
    ];

    return (
        <>
            <Navbar />
            <div className="px-6 md:px-16 lg:px-32 py-12 max-w-7xl mx-auto space-y-16">

                {/* Hero Section */}
                <div className="text-center space-y-4 max-w-3xl mx-auto">
                    <span className="bg-orange-100 text-orange-700 text-xs font-semibold px-3.5 py-1.5 rounded-full uppercase tracking-wider">
                        About QuickCart
                    </span>
                    <h1 className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight">
                        Redefining Modern E-Commerce for Tech Enthusiasts
                    </h1>
                    <p className="text-gray-600 text-base md:text-lg leading-relaxed">
                        At QuickCart, we believe shopping for gadgets, smart tech, and daily accessories should be effortless, fast, and transparent. We bridge the gap between cutting-edge technology and seamless online shopping.
                    </p>
                </div>

                {/* Grid Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 bg-orange-600 text-white rounded-2xl p-8 shadow-xl text-center">
                    {stats.map((stat, i) => (
                        <div key={i} className="space-y-1">
                            <h3 className="text-2xl md:text-4xl font-extrabold">{stat.number}</h3>
                            <p className="text-xs md:text-sm text-orange-100 font-medium">{stat.label}</p>
                        </div>
                    ))}
                </div>

                {/* Story Section */}
                <div className="grid md:grid-cols-2 gap-10 items-center bg-gray-50 p-8 md:p-12 rounded-2xl border border-gray-200">
                    <div className="space-y-4">
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Our Journey & Mission</h2>
                        <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                            Founded with a vision to deliver premium tech at unbeatable prices, QuickCart has grown into a trusted destination for electronics shoppers nationwide.
                        </p>
                        <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                            We carefully vet every seller and product on our platform so you get genuine warranties, reliable customer service, and unbeatable value with every order.
                        </p>
                        <button
                            onClick={() => router.push('/all-products')}
                            className="px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white text-sm font-medium rounded-lg transition shadow-md"
                        >
                            Explore Our Products
                        </button>
                    </div>
                    <div className="relative h-64 md:h-80 w-full rounded-xl overflow-hidden shadow-md">
                        <Image
                            src={assets.header_playstation_image}
                            alt="QuickCart Office & Tech"
                            fill
                            className="object-cover"
                        />
                    </div>
                </div>

                {/* Features Grid */}
                <div className="space-y-8">
                    <div className="text-center space-y-2">
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Why Choose QuickCart?</h2>
                        <p className="text-gray-500 text-sm max-w-md mx-auto">We prioritize customer satisfaction through premium standards and dedicated care.</p>
                    </div>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {features.map((item, index) => (
                            <div key={index} className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md hover:border-orange-300 transition space-y-3">
                                <div className="text-3xl">{item.icon}</div>
                                <h3 className="font-semibold text-gray-800 text-base">{item.title}</h3>
                                <p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
            <Footer />
        </>
    )
}

export default AboutUs
