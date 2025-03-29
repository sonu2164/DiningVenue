// ContactUs.js

import React from 'react';
import { FaPhone, FaEnvelope, FaMapMarker } from 'react-icons/fa';


const ContactUs = () => {
    return (
        <div className="  bg-y3 w-full min-h-screen">
            <div className=' pt-[100px]  max-w-screen-md mx-auto contact-us flex justify-between'>



                <div className="contact-details-column flex flex-col">
                    <h1 className="text-3xl font-bold mb-4">Contact Us</h1>

                    <div className="contact-details mb-6">
                        <div className="contact-item flex items-center mb-2">
                            <FaPhone className="mr-2" />
                            <p className="font-bold">Phone:</p>
                            <p className="ml-1">+91 9839019095</p>
                        </div>

                        <div className="contact-item flex items-center mb-2">
                            <FaEnvelope className="mr-2" />
                            <p className="font-bold">Email:</p>
                            <p className="ml-1">sonu037singh@example.com</p>
                        </div>

                        <div className="contact-item flex items-center">
                            <FaMapMarker className="mr-2" />
                            <p className="font-bold">Address:</p>
                            <p className="ml-1">Nit gate, Kurukshetra, India</p>
                        </div>
                    </div>

                    <div className="mt-2 shadow-xl">
                        <iframe className="rounded-lg shadow-lg" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3457.108603266875!2d76.82013447500661!3d29.947554623155895!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390e3f422f5244e7%3A0x9c630c311d6349b8!2sNIT%20KURUKSHETRA!5e0!3m2!1sen!2sin!4v1703088168406!5m2!1sen!2sin" width="400" height="300" style={{ "border": "0" }} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>

                    </div>
                </div>

                <div className="contact-form-column flex flex-col">
                    <h2 className="text-2xl font-bold mb-4">Get in Touch</h2>
                    <form className="flex flex-col">
                        <label htmlFor="name" className="mb-1">Name:</label>
                        <input type="text" id="name" name="name" placeholder="Your Name" className="mb-4 p-2 border border-gray-300 rounded" />

                        <label htmlFor="email" className="mb-1">Email:</label>
                        <input type="email" id="email" name="email" placeholder="sonu037singh@gmail.com" className="mb-4 p-2 border border-gray-300 rounded" />

                        <label htmlFor="message" className="mb-1">Message:</label>
                        <textarea id="message" name="message" placeholder="Your Message" className="mb-4 p-2 border border-gray-300 rounded"></textarea>

                        <button type="submit" className="bg-blue-500 text-white py-2 rounded">Send Message</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ContactUs;
