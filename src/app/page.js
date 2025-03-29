'use client';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ChefHat, Leaf, Star, Clock, Utensils, Quote } from 'lucide-react';
import { FaTruck, FaCreditCard, FaClock } from 'react-icons/fa';

import SectionHeaders from "@/components/layout/SectionHeaders";
import food from '../../public/food.png';
import mint from '../../public/mint.png'
import mint2 from '../../public/mint2.png'
import Image from "next/image";
import './home.css'

const carouselImages = [
  {
    url: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4",
    title: "Experience Fine Dining",
    subtitle: "Where every meal tells a story",
    description: "Immerse yourself in an atmosphere of elegance and culinary mastery"
  },
  {
    url: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0",
    title: "Culinary Excellence",
    subtitle: "Crafted with passion and precision",
    description: "Each dish is a masterpiece, carefully curated by our expert chefs"
  },
  {
    url: "https://images.unsplash.com/photo-1559339352-11d035aa65de",
    title: "Memorable Moments",
    subtitle: "Create lasting memories with loved ones",
    description: "The perfect setting for celebrations and intimate gatherings"
  }
];

const menuItems = [
  {
    category: "Starters",
    items: [
      {
        name: "Truffle Infused Wild Mushroom Soup",
        description: "Creamy blend of forest mushrooms with fresh truffle shavings",
        price: "$18",
        image: "https://images.unsplash.com/photo-1547592166-23ac45744acd"
      },
      {
        name: "Pan-Seared Scallops",
        description: "With cauliflower purée and crispy pancetta",
        price: "$24",
        image: "https://images.unsplash.com/photo-1599021456807-9d0e49de01fe"
      }
    ]
  },
  {
    category: "Main Course",
    items: [
      {
        name: "Wagyu Beef Tenderloin",
        description: "Grade A5 Japanese Wagyu with seasonal vegetables",
        price: "$85",
        image: "https://images.unsplash.com/photo-1546833998-877b37c2e5c4"
      },
      {
        name: "Mediterranean Sea Bass",
        description: "With herb-crusted potatoes and lemon butter sauce",
        price: "$45",
        image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2"
      }
    ]
  }
];

const strengths = [
  { icon: <ChefHat size={32} />, title: "Master Chefs", description: "Our world-class culinary experts bring decades of experience from Michelin-starred restaurants across the globe" },
  { icon: <Leaf size={32} />, title: "Fresh Ingredients", description: "We source the finest ingredients daily from local organic farms and premium suppliers" },
  { icon: <Star size={32} />, title: "Michelin Starred", description: "Proud recipient of 2 Michelin stars, recognized for exceptional cuisine and service" },
  { icon: <Clock size={32} />, title: "Impeccable Service", description: "Our dedicated team ensures every moment of your dining experience is perfect" }
];

const testimonials = [
  {
    name: "Sarah Mitchell",
    role: "Food Critic",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
    quote: "An extraordinary culinary journey that delights all senses. The attention to detail in every dish is remarkable.",
    rating: 5
  },
  {
    name: "James Wilson",
    role: "Wine Connoisseur",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e",
    quote: "The wine pairing suggestions were impeccable. Each selection perfectly complemented the innovative dishes.",
    rating: 5
  },
  {
    name: "Emily Chen",
    role: "Regular Guest",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80",
    quote: "Every visit to Epicurean is a celebration of flavors. The ambiance and service are consistently outstanding.",
    rating: 5
  }
];

export default function Home() {
  const [currentImage, setCurrentImage] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % carouselImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const handleCarouselNav = (index) => {
    setCurrentImage(index);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      {/* <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-md' : 'bg-transparent'}`}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center">
              <Utensils className="h-8 w-8 text-primary-600" />
              <span className="ml-2 text-2xl font-serif">Epicurean</span>
            </div>
            <div className="hidden md:flex space-x-8">
              <a href="#about" className={`${scrolled ? 'text-gray-800' : 'text-white'} hover:text-primary-600 transition-colors`}>About</a>
              <a href="#menu" className={`${scrolled ? 'text-gray-800' : 'text-white'} hover:text-primary-600 transition-colors`}>Menu</a>
              <a href="#strengths" className={`${scrolled ? 'text-gray-800' : 'text-white'} hover:text-primary-600 transition-colors`}>Features</a>
              <a href="#testimonials" className={`${scrolled ? 'text-gray-800' : 'text-white'} hover:text-primary-600 transition-colors`}>Testimonials</a>
              <a href="#reservation" className={`${scrolled ? 'text-gray-800' : 'text-white'} hover:text-primary-600 transition-colors`}>Reservations</a>
            </div>
          </div>
        </div>
      </nav> */}

      {/* Hero Section with Carousel */}
      <section className="relative h-screen">
        <AnimatePresence mode='wait'>
          <motion.div
            key={currentImage}
            initial={{ opacity: .5, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: .5, scale: 1.1 }}
            transition={{ duration: 1.2 }}
            className="absolute inset-0"
          >
            <motion.div
              animate={{ scale: 1.05 }}
              transition={{ duration: 8, repeat: Infinity, repeatType: "reverse" }}
              className="w-full h-full"
            >
              <div
                className="w-full h-full bg-cover bg-center"
                style={{ backgroundImage: `url(${carouselImages[currentImage].url})` }}
              >
                <div className="absolute inset-0 bg-black bg-opacity-40">
                  <div className="container mx-auto h-full flex items-center justify-center text-center">
                    <div className="text-white max-w-3xl">
                      <motion.h1
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        className="text-6xl font-serif mb-4"
                      >
                        {carouselImages[currentImage].title}
                      </motion.h1>
                      <motion.p
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl mb-4"
                      >
                        {carouselImages[currentImage].subtitle}
                      </motion.p>
                      <motion.p
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="text-lg mb-8"
                      >
                        {carouselImages[currentImage].description}
                      </motion.p>
                      <div className='flex gap-4'>
                        <motion.button
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ delay: 0.6 }}
                          className="px-8 py-3 bg-tertiary-600 text-white  rounded-lg hover:bg-primary hover:text-y3 bg-opacity-70 hover:bg-opacity-90 transition-colors"
                        >
                          Order Now
                        </motion.button>
                        <motion.button
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ delay: 0.6 }}
                          className="px-8 py-3 bg-tertiary-600  text-white  rounded-lg hover:bg-primary hover:text-y3 bg-opacity-70 hover:bg-opacity-90 transition-colors"
                        >
                          Reserve Your Table
                        </motion.button>
                      </div>

                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </AnimatePresence>
        <div className="absolute bottom-8 left-0 right-0 flex justify-center space-x-2">
          {carouselImages.map((_, index) => (
            <button
              key={index}
              onClick={() => handleCarouselNav(index)}
              className={`w-3 h-3 rounded-full transition-all ${currentImage === index ? 'bg-white w-8' : 'bg-white/50'
                }`}
            />
          ))}
        </div>
      </section>

      {/* About Us Section */}
      <section id="about" ref={ref} className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={fadeInUp}
            className="max-w-4xl mx-auto"
          >
            <div className="text-center mb-12">
              <h2 className="text-4xl font-serif mb-6">Our Story</h2>
              <p className="text-gray-600 leading-relaxed mb-8">
                Founded in 1985, Epicurean has been a beacon of culinary excellence for over three decades.
                What began as a passionate dream has evolved into one of the most celebrated dining destinations in the city.
              </p>
              <p className="text-gray-600 leading-relaxed mb-8">
                Our philosophy is simple: exceptional ingredients, masterful preparation, and unforgettable experiences.
                Every dish that leaves our kitchen tells a story of tradition, innovation, and unwavering dedication to the craft of fine dining.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="rounded-lg overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1428515613728-6b4607e44363"
                  alt="Restaurant Interior"
                  className="w-full h-64 object-cover"
                />
              </div>
              <div className="rounded-lg overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1514326640560-7d063ef2aed5"
                  alt="Chef at Work"
                  className="w-full h-64 object-cover"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Menu Section */}
      {/* <section id="menu" className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-serif text-center mb-12">Our Menu</h2>
          {menuItems.map((category, index) => (
            <div key={index} className="mb-16">
              <h3 className="text-2xl font-serif mb-8 text-center">{category.category}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {category.items.map((item, itemIndex) => (
                  <motion.div
                    key={itemIndex}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: itemIndex * 0.2 }}
                    className="bg-white rounded-lg shadow-lg overflow-hidden"
                  >
                    <img src={item.image} alt={item.name} className="w-full h-48 object-cover" />
                    <div className="p-6">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="text-xl font-semibold">{item.name}</h4>
                        <span className="text-primary-600 font-semibold">{item.price}</span>
                      </div>
                      <p className="text-gray-600">{item.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section> */}

      {/* Our Strengths Section */}
      <section id="strengths" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-serif text-center mb-12">Why Choose Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {strengths.map((strength, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className="text-center p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="text-primary-600 mb-4 flex justify-center">{strength.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{strength.title}</h3>
                <p className="text-gray-600">{strength.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-serif text-center mb-12">Guest Experiences</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className="bg-white rounded-lg shadow-lg p-8 relative"
              >
                <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full border-4 border-white shadow-lg object-cover"
                  />
                </div>
                <Quote className="text-primary-600 mb-4 mx-auto w-8 h-8" />
                <p className="text-gray-600 mb-4 text-center italic">{testimonial.quote}</p>
                <div className="text-center">
                  <div className="flex justify-center mb-2">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <h4 className="font-semibold text-lg">{testimonial.name}</h4>
                  <p className="text-gray-500 text-sm">{testimonial.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      {/* <section className="bg-white p-5 rounded-md shadow-2xl text-center" id="about">

        <div className="flex flex-col  m-0">

          <SectionHeaders
            mainHeader={'About us'}
          />

          <div className=" text-gray-500 mx-auto mt-4 flex flex-col md:flex-row justify-between ">
            <div className="flex md:mr-6 justify-center md:w-1/2">
              <Image src={mint} alt='mint' height={300} width={60} className="absolute right-[220px] md:left-[220px] " />
              <Image src={mint} alt='mint' height={300} width={60} className="absolute left-[220px] top md:right-[220px] " />
              <Image src={mint2} alt='mint' height={30} width={30} className="absolute" />
              <Image src={mint} alt='mint' height={30} width={30} className="absolute -z-3" />
              <Image src={food} alt="food" className="w-1/2" />
            </div>
            <div className="flex flex-col md:justify-start md:text-left mt-4 md:mt-0 md:w-1/2">
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-semibold mb-2 text-black">Best Food In the Country</h1>
              <p className="text-sm md:text-base lg:text-lg mb-4 ">Lorem ipsum dolor Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis vehicula finibus ex, eu fringilla justo efficitur a. sit amet, consectetur adipiscing elit. Duis vehicula finibus ex, eu fringilla justo efficitur a.</p>
              <div className="flex flex-row justify-center md:justify-start gap-3">
                <div className="p-2 bg-slate-200 rounded-md border-2 border-gray-300">
                  <FaTruck className="inline-block mr-2 text-primary" /> Free Delivery
                </div>
                <div className="p-2 bg-slate-200 rounded-md border-2 border-gray-300">
                  <FaCreditCard className="inline-block mr-2 text-primary" /> Easy Payment
                </div>
                <div className="p-2 bg-slate-200 rounded-md border-2 border-gray-300">
                  <FaClock className="inline-block mr-2 text-primary" /> 24/7 Service
                </div>
              </div>
            </div>
          </div>
        </div>
      </section> */}

      {/* Reservation Form */}
      <section id="reservation" className="py-20 bg-gray-900 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-4xl font-serif text-center mb-8">Book Your Table</h2>
            <p className="text-center text-gray-300 mb-8">
              Join us for an unforgettable dining experience. Reservations are recommended to ensure your preferred dining time.
            </p>
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="group"
                >
                  <input
                    type="text"
                    placeholder="Name"
                    className="w-full px-4 py-3 bg-transparent border border-gray-600 rounded-lg focus:border-white transition-colors text-white placeholder-gray-400"
                  />
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="group"
                >
                  <input
                    type="email"
                    placeholder="Email"
                    className="w-full px-4 py-3 bg-transparent border border-gray-600 rounded-lg focus:border-white transition-colors text-white placeholder-gray-400"
                  />
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="group"
                >
                  <input
                    type="date"
                    className="w-full px-4 py-3 bg-transparent border border-gray-600 rounded-lg focus:border-white transition-colors text-white placeholder-gray-400"
                  />
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="group"
                >
                  <select className="w-full px-4 py-3 bg-transparent border border-gray-600 rounded-lg focus:border-white transition-colors text-white">
                    <option value="" className="bg-gray-900">Select time</option>
                    <option value="18:00" className="bg-gray-900">18:00</option>
                    <option value="19:00" className="bg-gray-900">19:00</option>
                    <option value="20:00" className="bg-gray-900">20:00</option>
                    <option value="21:00" className="bg-gray-900">21:00</option>
                  </select>
                </motion.div>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full py-3 bg-white text-gray-900 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Reserve Now
              </motion.button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      {/* <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-serif mb-4">Contact Us</h3>
              <p className="mb-2">123 Gourmet Street</p>
              <p className="mb-2">New York, NY 10001</p>
              <p className="mb-2">+1 (555) 123-4567</p>
              <p>info@epicurean.com</p>
            </div>
            <div>
              <h3 className="text-xl font-serif mb-4">Hours</h3>
              <p className="mb-2">Monday - Friday: 5pm - 11pm</p>
              <p className="mb-2">Saturday: 4pm - 12am</p>
              <p>Sunday: 4pm - 10pm</p>
            </div>
            <div>
              <h3 className="text-xl font-serif mb-4">Follow Us</h3>
              <div className="flex space-x-4">
                <motion.a
                  whileHover={{ scale: 1.2 }}
                  href="#"
                  className="hover:text-gray-300"
                >
                  <Instagram size={24} />
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.2 }}
                  href="#"
                  className="hover:text-gray-300"
                >
                  <Facebook size={24} />
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.2 }}
                  href="#"
                  className="hover:text-gray-300"
                >
                  <Twitter size={24} />
                </motion.a>
              </div>
            </div>
          </div>
        </div>
      </footer> */}
    </div>
  );

}
