import Navbar from '../Components/NavBar';
import {useNavigate} from "react-router-dom";
import {Swiper, SwiperSlide} from 'swiper/react';
import {Autoplay,EffectFade} from "swiper/modules";
import 'swiper/css'
import 'swiper/css/effect-fade';
import {useAuth} from "../Context/AuthContext.jsx";

import beach from '../assets/beach-hotel.jpg';
import ella from '../assets/ella.jpg';
import italy from '../assets/image02.jpg';
import ocean from '../assets/image3.jpg';
import sigiriya from '../assets/sigiriya.jpg';
import boating from '../assets/image-1.jpg';


export default function LandingPage() {
    const navigate = useNavigate();
    const user = useAuth();
    const images = [beach,ella,italy,sigiriya,ocean,boating];
    const reviews = [
        { name: "Sarah M.", location: "Australia", stars: "⭐⭐⭐⭐⭐", review: "Absolutely incredible experience. The package was tailored perfectly to what we wanted, couldn't have asked for more." },
        { name: "Sam K.", location: "United Kingdom", stars: "⭐⭐⭐⭐⭐", review: "Booking was seamless and the customization options were unlike anything else I've tried. Highly recommend." },
        { name: "John R.", location: "India", stars: "⭐⭐⭐⭐⭐", review: "From destination selection to the final itinerary, everything felt personal. Will definitely use again and come with my family" }
    ];


    return (
        <div >
            <Navbar/>

            {/* main Section */}
            <div className="relative h-screen">

                <Swiper
                    modules={[Autoplay, EffectFade]}
                    effect = "fade"
                    autoplay = {{delay : 3000}}
                    loop={true}
                    className="h-full w-full"
                >

                    {images.map((img, index) => (
                        <SwiperSlide key={index}>
                            <img src={img} className="w-full h-full object-cover" />
                        </SwiperSlide>
                    ))}

                </Swiper>
                <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center z-10">
                    <h1 className="text-5xl font-bold text-white mb-4">Discover Your Perfect Journey</h1>
                    <p className="text-xl text-white mb-8">Customise your dream travel package to any destination</p>
                    <button onClick={() => navigate(user?.role === 'ADMIN'? '/admin/packages' : '/packages')} className="bg-white text-black px-8 py-3 rounded-full font-semibold hover:bg-orange-500 hover:text-white transition duration-300">
                        Explore Packages
                    </button>
                </div>

        </div>
            {/* customization section */}
            <section className="py-20 bg-gray-50">
                <div className="max-w-6xl mx-auto px-6">

                    <div className="text-center mb-14">
                        <h2 className="text-4xl font-bold text-gray-800 mb-4">Travel Tailored To You</h2>
                        <p className="text-gray-500 text-lg">We don't do one size fits all. Every package is built around your preferences.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                        <div className="bg-white rounded-2xl p-8 text-center shadow-sm hover:shadow-md transition duration-300">
                            <div className="text-5xl mb-4">🌁</div>
                            <h3 className="text-xl font-bold text-gray-800 mb-3">Choose Your Destination</h3>
                            <p className="text-gray-500">Browse curated destinations across the world and pick the place that speaks to you.</p>
                        </div>

                        <div className="bg-white rounded-2xl p-8 text-center shadow-sm hover:shadow-md transition duration-300">
                            <div className="text-5xl mb-4">🤩️</div>
                            <h3 className="text-xl font-bold text-gray-800 mb-3">Customize Your Package</h3>
                            <p className="text-gray-500">Set your budget, travel dates, activities, and style we build the perfect itinerary around you.</p>
                        </div>

                        <div className="bg-white rounded-2xl p-8 text-center shadow-sm hover:shadow-md transition duration-300">
                            <div className="text-5xl mb-4">🛫</div>
                            <h3 className="text-xl font-bold text-gray-800 mb-3">Book With Confidence</h3>
                            <p className="text-gray-500">Get a fully tailored travel plan and book securely all in one place.</p>
                        </div>

                    </div>
                </div>
            </section>

            {/* Reviews Section */}
            <section className="py-20 bg-white">
                <div className="max-w-6xl mx-auto px-6">

                    <div className="text-center mb-14">
                        <h2 className="text-4xl font-bold text-gray-800 mb-4">What Our Travellers Say</h2>
                        <p className="text-gray-500 text-lg">Real experiences from real travellers.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {reviews.map((review, index) => (
                            <div key={index} className="bg-gray-50 rounded-2xl p-8 shadow-sm hover:shadow-md transition duration-300">
                                <p className="text-gray-600 mb-6 italic">"{review.review}"</p>
                                <div className="text-yellow-400 text-xl mb-3">{review.stars}</div>
                                <p className="font-bold text-gray-800">{review.name}</p>
                                <p className="text-gray-400 text-sm">{review.location}</p>
                            </div>
                        ))}
                    </div>

                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-900 text-white py-12">
                <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10">

                    {/* Brand */}
                    <div>
                        <h3 className="text-2xl font-bold text-orange-400 mb-3">TravelUs</h3>
                        <p className="text-gray-400 text-sm">Your journey, your way. We build personalised travel experiences tailored to your preferences.</p>
                    </div>

                    {/* Links */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
                        <ul className="space-y-2 text-gray-400 text-sm">
                            <li className="hover:text-orange-400 cursor-pointer"  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Home</li>
                            <li className="hover:text-orange-400 cursor-pointer" onClick={() => navigate('/about')}>About</li>
                            <li className="hover:text-orange-400 cursor-pointer" onClick={() => navigate('/login')}>Sign In</li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4">Contact</h4>
                        <ul className="space-y-2 text-gray-400 text-sm">
                            <li>📧 support@travelus.com</li>
                            <li>📞 +94 76 944 5205</li>
                            <li>📍 Colombo, Sri Lanka</li>
                        </ul>
                    </div>

                </div>

                {/* Bottom bar */}
                <div className="border-t border-gray-700 mt-10 pt-6 text-center text-gray-500 text-sm">
                    © 2025 TravelUs. All rights reserved.
                </div>
            </footer>
        </div>
    )
}