'use client'
import React from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const PrivacyPolicy = () => {
    const sections = [
        {
            title: "1. Information We Collect",
            content: "We collect personal information that you provide directly to us when creating an account, placing an order, subscribing to our newsletter, or contacting customer support. This includes your name, shipping address, email address, phone number, and order history."
        },
        {
            title: "2. How We Use Your Information",
            content: "Your information is used strictly to fulfill your product orders, send delivery updates, calculate shipping estimates, process promotional discounts, improve storefront navigation, and prevent fraudulent transactions."
        },
        {
            title: "3. Data Security & Encryption",
            content: "We implement industry-standard encryption protocols (SSL/TLS) to safeguard your personal data during transmission and storage. Your private payment details are never stored in plaintext on our servers."
        },
        {
            title: "4. Cookies & Tracking Technologies",
            content: "QuickCart uses session cookies to preserve your cart items, remember your active category filters, and personalize your shopping experience. You can manage or disable cookies through your web browser settings."
        },
        {
            title: "5. Third-Party Sharing",
            content: "We do not sell, rent, or trade your personal data to third-party advertisers. We only share essential logistics information with verified shipping carriers and payment gateways to complete order delivery."
        },
        {
            title: "6. Your Rights & Data Control",
            content: "You have the right to inspect, update, or request the deletion of your account and personal shipping data at any time. For privacy inquiries, please contact our Data Protection team at privacy@quickcart.com."
        }
    ];

    return (
        <>
            <Navbar />
            <div className="px-6 md:px-16 lg:px-32 py-12 max-w-5xl mx-auto space-y-10">

                {/* Header */}
                <div className="text-center space-y-3 max-w-2xl mx-auto">
                    <span className="bg-orange-100 text-orange-700 text-xs font-semibold px-3.5 py-1.5 rounded-full uppercase tracking-wider">
                        Privacy Policy & Terms
                    </span>
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                        Your Privacy Matters to Us
                    </h1>
                    <p className="text-gray-500 text-xs md:text-sm">
                        Last Updated: August 7, 2026 | Effective for all QuickCart customers & visitors.
                    </p>
                </div>

                {/* Policy Banner */}
                <div className="bg-orange-50 border border-orange-200 rounded-xl p-6 text-sm text-gray-700 space-y-2">
                    <p className="font-semibold text-orange-900 text-base">🔒 Our Commitment to Customer Trust</p>
                    <p className="text-gray-600 text-xs leading-relaxed">
                        At QuickCart, protecting your privacy is at the core of our business operations. This policy outlines how we collect, handle, and secure your information when you browse our catalog or complete purchases.
                    </p>
                </div>

                {/* Sections List */}
                <div className="space-y-6">
                    {sections.map((section, idx) => (
                        <div key={idx} className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-2">
                            <h2 className="text-lg font-bold text-gray-800">{section.title}</h2>
                            <p className="text-gray-600 text-xs md:text-sm leading-relaxed">{section.content}</p>
                        </div>
                    ))}
                </div>

                {/* Contact Footer Note */}
                <div className="bg-slate-50 border border-gray-200 rounded-xl p-6 text-center space-y-2 text-xs text-gray-600">
                    <p className="font-medium text-gray-800">Questions about our privacy policy?</p>
                    <p>Contact our Data Protection Officer at <span className="text-orange-600 font-semibold">privacy@quickcart.com</span> or visit our <a href="/contact-us" className="text-orange-600 underline">Contact Us</a> page.</p>
                </div>

            </div>
            <Footer />
        </>
    )
}

export default PrivacyPolicy
