import React from 'react';
import { FaPhone, FaEnvelope, FaMapMarker, FaWhatsapp } from 'react-icons/fa';

const ContactUs = () => {
    return (
        <div className="bg-gradient-to-br from-blue-100 to-blue-300 min-h-screen flex items-center justify-center p-4 pt-[120px]  xl:pt-20">
            <div className="bg-white shadow-lg rounded-2xl p-8 max-w-4xl w-full grid md:grid-cols-2 gap-8">
                {/* Contact Details */}
                <div>
                    <h1 className="text-3xl font-extrabold text-gray-800 mb-6">Contact Us</h1>
                    <div className="space-y-4">
                        <div className="flex items-center space-x-3 text-gray-700">
                            <FaPhone className="text-blue-500" />
                            <p><span className="font-semibold">Phone:</span> <a href="tel:+918009769707" className="text-blue-600">+91 8009769707</a></p>
                        </div>
                        <div className="flex items-center space-x-3 text-gray-700">
                            <FaWhatsapp className="text-green-500" />
                            <p><span className="font-semibold">WhatsApp:</span> <a href="https://wa.me/918009769707" className="text-blue-600">Chat with us</a></p>
                        </div>
                        <div className="flex items-center space-x-3 text-gray-700">
                            <FaEnvelope className="text-blue-500" />
                            <p><span className="font-semibold">Email:</span> <a href="mailto:divingvenue07@gmail.com" className="text-blue-600">divingvenue07@gmail.com</a></p>
                        </div>
                        <div className="flex items-center space-x-3 text-gray-700">
                            <FaMapMarker className="text-blue-500" />
                            <p><span className="font-semibold">Address:</span> Near Basahia Buzurg, Partawal, Uttar Pradesh 273301</p>
                        </div>
                    </div>
                    <div className="mt-6 overflow-hidden rounded-lg shadow-lg">
                        <iframe
                            className="w-full h-56 rounded-lg"
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3556.130498282406!2d83.58233867489676!3d26.962766457938766!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399155d45a79ad6f%3A0xed67bbdbee59101!2sDINING%20Venue%20%2C%20Multicuisine%20Restaurant%20%26%20cafe!5e0!3m2!1sen!2sin!4v1742642635196!5m2!1sen!2sin"
                            allowFullScreen={true}
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>
                    </div>
                </div>

                {/* Contact Form */}
                <div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Get in Touch</h2>
                    <form className="space-y-4">
                        <div>
                            <label htmlFor="name" className="block text-gray-700 font-medium">Name</label>
                            <input type="text" id="name" placeholder="Your Name" className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" />
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-gray-700 font-medium">Email</label>
                            <input type="email" id="email" placeholder="Your Email" className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" />
                        </div>
                        <div>
                            <label htmlFor="message" className="block text-gray-700 font-medium">Message</label>
                            <textarea id="message" placeholder="Your Message" rows="4" className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"></textarea>
                        </div>
                        <button type="submit" className="w-full bg-blue-500 text-white font-semibold py-3 rounded-lg hover:bg-blue-600 transition duration-300">Send Message</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ContactUs;
