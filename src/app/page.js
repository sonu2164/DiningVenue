'use client';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ChefHat, Leaf, Star, Clock, Utensils, Quote } from 'lucide-react';
import { FaTruck, FaCreditCard, FaClock } from 'react-icons/fa';

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

  // useEffect(() => {
  //   const handleScroll = () => {
  //     setScrolled(window.scrollY > 50);
  //   };

  //   window.addEventListener('scroll', handleScroll);
  //   return () => window.removeEventListener('scroll', handleScroll);
  // }, []);

  // useEffect(() => {
  //   const timer = setInterval(() => {
  //     setCurrentImage((prev) => (prev + 1) % carouselImages.length);
  //   }, 6000);
  //   return () => clearInterval(timer);
  // }, []);

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const handleCarouselNav = (index) => {
    setCurrentImage(index);
  };

  const handleTouchPadGesture = (event) => {
    if (event.deltaX > 50) {
      setCurrentImage((prev) => (prev < carouselImages.length - 1 ? prev + 1 : 0));
    } else if (event.deltaX < -50) {
      setCurrentImage((prev) => (prev > 0 ? prev - 1 : carouselImages.length - 1));
    }
  };

  useEffect(() => {
    window.addEventListener('wheel', handleTouchPadGesture, { passive: true });
    return () => window.removeEventListener('wheel', handleTouchPadGesture);
  }, []);
  return (
    <div className="min-h-screen">

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
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
        <div className="absolute bottom-8 left-0 right-0 flex justify-center space-x-2">
          {carouselImages.map((_, index) => (
            <button
              key={index}
              onClick={() => handleCarouselNav(index)}
              className={`w-3 h-3 rounded-full transition-all ${currentImage === index ? 'bg-white w-8' : 'bg-white/50'}`}
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


    </div>
  );

}










