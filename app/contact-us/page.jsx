'use client'
import React, { useState } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import toast from 'react-hot-toast'

const ContactUs = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.name || !formData.email || !formData.message) {
            toast.error("Please fill in all required fields.");
            return;
        }
        setSubmitted(true);
        toast.success("Message sent! Our support team will get back to you within 24 hours.");
        setFormData({ name: '', email: '', subject: '', message: '' });
    };

    const contactInfo = [
        {
            title: "Customer Support",
            detail: "support@quickcart.com",
            desc: "Available 24/7 for order assistance",
            icon: "📧"
        },
        {
            title: "Phone Inquiry",
            detail: "+1 (800) 555-QUICK",
            desc: "Mon - Fri, 9am - 6pm EST",
            icon: "📞"
        },
        {
            title: "Headquarters",
            detail: "123 Tech Boulevard, Suite 400, NY 10001",
            desc: "Corporate Office & Hub",
            icon: "📍"
        }
    ];

    return (
        <>
            <Navbar />
            <div className="px-6 md:px-16 lg:px-32 py-12 max-w-7xl mx-auto space-y-12">
                {/* Header */}
                <div className="text-center space-y-3 max-w-2xl mx-auto">
                    <span className="bg-orange-100 text-orange-700 text-xs font-semibold px-3.5 py-1.5 rounded-full uppercase tracking-wider">
                        Contact Us
                    </span>
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                        We're Here to Help You
                    </h1>
                    <p className="text-gray-500 text-sm md:text-base">
                        Have a question about an order, product warranty, or partnership? Reach out to our team and we'll respond promptly.
                    </p>
                </div>

                {/* Contact Info Cards */}
                <div className="grid md:grid-cols-3 gap-6">
                    {contactInfo.map((info, i) => (
                        <div key={i} className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm text-center space-y-2 hover:border-orange-300 transition">
                            <div className="text-3xl">{info.icon}</div>
                            <h3 className="font-semibold text-gray-800 text-base">{info.title}</h3>
                            <p className="text-orange-600 font-medium text-sm">{info.detail}</p>
                            <p className="text-xs text-gray-400">{info.desc}</p>
                        </div>
                    ))}
                </div>

                {/* Contact Form & FAQ */}
                <div className="grid md:grid-cols-2 gap-10 bg-white p-8 md:p-10 rounded-2xl border border-gray-200 shadow-sm">
                    {/* Form */}
                    <div className="space-y-6">
                        <div>
                            <h2 className="text-xl font-bold text-gray-800">Send Us a Message</h2>
                            <p className="text-xs text-gray-500 mt-1">Fill out the form below and our support engineers will get back to you.</p>
                        </div>

                        {submitted && (
                            <div className="bg-green-50 border border-green-200 text-green-800 p-4 rounded-lg text-xs font-medium">
                                ✅ Thank you! Your message has been submitted. We will contact you at your email address shortly.
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">Full Name *</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Enter your name"
                                    className="w-full px-3.5 py-2.5 border border-gray-300 rounded-lg outline-none focus:border-orange-500 text-sm text-gray-800 transition"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">Email Address *</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="yourname@example.com"
                                    className="w-full px-3.5 py-2.5 border border-gray-300 rounded-lg outline-none focus:border-orange-500 text-sm text-gray-800 transition"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">Subject</label>
                                <input
                                    type="text"
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    placeholder="Order Inquiry, Warranty, General Question..."
                                    className="w-full px-3.5 py-2.5 border border-gray-300 rounded-lg outline-none focus:border-orange-500 text-sm text-gray-800 transition"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">Message *</label>
                                <textarea
                                    name="message"
                                    rows="4"
                                    value={formData.message}
                                    onChange={handleChange}
                                    placeholder="Write your message here..."
                                    className="w-full px-3.5 py-2.5 border border-gray-300 rounded-lg outline-none focus:border-orange-500 text-sm text-gray-800 transition resize-none"
                                    required
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-orange-600 hover:bg-orange-700 text-white font-medium py-3 rounded-lg text-sm transition shadow-md"
                            >
                                Send Message
                            </button>
                        </form>
                    </div>

                    {/* FAQ Side */}
                    <div className="space-y-6 bg-slate-50 p-6 md:p-8 rounded-xl border border-gray-200">
                        <h2 className="text-xl font-bold text-gray-800">Frequently Asked Questions</h2>
                        <div className="space-y-4 text-xs">
                            <div className="space-y-1">
                                <h4 className="font-semibold text-gray-900 text-sm">How do I track my order status?</h4>
                                <p className="text-gray-600 leading-relaxed">
                                    Go to the "My Orders" tab in the top navigation bar to view your live order updates and shipping progress.
                                </p>
                            </div>
                            <div className="space-y-1 border-t pt-3">
                                <h4 className="font-semibold text-gray-900 text-sm">What payment options do you support?</h4>
                                <p className="text-gray-600 leading-relaxed">
                                    We accept Cash on Delivery (COD), Credit/Debit cards, and special promotional discount codes at checkout.
                                </p>
                            </div>
                            <div className="space-y-1 border-t pt-3">
                                <h4 className="font-semibold text-gray-900 text-sm">What is your return & warranty policy?</h4>
                                <p className="text-gray-600 leading-relaxed">
                                    All products come with standard manufacturer warranties and a 30-day hassle-free return guarantee.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default ContactUs
