import React, { useState } from 'react';
import { FaPizzaSlice, FaHamburger, FaIceCream, FaLeaf, FaFish, FaDrumstickBite, FaAppleAlt, FaBreadSlice, FaCarrot, FaCheese, FaEgg, FaLemon, FaPepperHot, FaSeedling, FaWineBottle, FaCocktail, FaMugHot, FaGlassWhiskey, FaUtensils } from 'react-icons/fa';
import CustomScrollbar from '../CustomScrollbar';
import SectionHeaders from '@/components/layout/SectionHeaders';
import './horizontalScrollbar.css';

const categories = [
    { name: "All Menus", icon: <FaUtensils /> },
    { name: "Burger", icon: <FaHamburger /> },
    { name: "Pizza", icon: <FaPizzaSlice /> },
    { name: "Ice-cream", icon: <FaIceCream /> },
    { name: "Vegetarian", icon: <FaLeaf /> },
    { name: "Seafood", icon: <FaFish /> },
    { name: "Chicken", icon: <FaDrumstickBite /> },
    { name: "Fruits", icon: <FaAppleAlt /> },
    { name: "Bakery", icon: <FaBreadSlice /> },
    { name: "Salads", icon: <FaCarrot /> },
    { name: "Cheese", icon: <FaCheese /> },
    { name: "Egg Dishes", icon: <FaEgg /> },
    { name: "Lemonades", icon: <FaLemon /> },
    { name: "Spicy Food", icon: <FaPepperHot /> },
    { name: "Organic", icon: <FaSeedling /> },
    { name: "Hot Beverages", icon: <FaMugHot /> },

];

export default function MenuFilter({ selectedCategory, setSelectedCategory, isVegOnly, setIsVegOnly }) {
    // const [selectedCategory, setSelectedCategory] = useState("All Menus");

    const handleCategoryClick = (category) => {
        setSelectedCategory(category);
        console.log(`Selected Category: ${category}`);
        // Add logic to filter and show the selected category menu items
    };

    return (
        <div className='md:px-5 w-full'>
            <div id='homemenu' className="text-center mb-6 mt-6">
                <SectionHeaders subHeader={'Check Out'} mainHeader={'Our Menu'} />
            </div>

            <div className='flex flex-col md:flex-row justify-between gap-4 p-5 w-full border-b-primary border-b-1 '>
                <div className='flex flex-col md:flex-row gap-4 w-full md:w-[70%] items-center'>
                    <div className=' text-lg font-semibold text-gray-700'>
                        <div className='flex md:flex-col gap-2 md:gap-0'>
                            <div>
                                Menu
                            </div>
                            <div>
                                Category
                            </div>
                        </div>

                    </div>
                    <div className='flex w-full'>

                        <div className='flex gap-3    overflow-x-auto category-scrollbar'>
                            {categories.map((category, index) => (
                                <div
                                    key={index}
                                    className={`flex flex-col items-center justify-center  rounded-lg p-2 md:p-0 w-28 h-28 md:w-32 md:h-32 min-w-[6rem] shadow-md cursor-pointer transition-all ${selectedCategory === category.name ? 'bg-primary text-y3' : 'bg-slate-200 text-primary'}`}
                                    onClick={() => handleCategoryClick(category.name)}
                                >
                                    <div className='flex items-center justify-center w-10 h-10 md:w-12 md:h-12 bg-white rounded-full shadow-sm mb-2 text-lg md:text-xl'>
                                        {category.icon}
                                    </div>
                                    <div className=' text-center text-xs md:text-sm font-medium'>{category.name}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className='md:w-[20%] flex gap-2  md:gap-0 md:flex-col items-center justify-between pd-2 md:p-0 md:justify-center'>
                    <div className='flex items-center gap-2'>
                        <span className='text-gray-700 font-semibold'>Veg Only</span>
                        <button
                            onClick={() => setIsVegOnly(!isVegOnly)}
                            className={`relative w-12 h-6 flex items-center bg-gray-300 rounded-full p-1 transition-all ${isVegOnly ? 'bg-green-500' : 'bg-gray-300'}`}>
                            <div className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform ${isVegOnly ? 'translate-x-6' : 'translate-x-0'}`}></div>
                        </button>
                    </div>
                    <div>
                        <input
                            type='text'
                            placeholder='Search...'
                            className='mt-2 p-2 w-full border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary'
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
