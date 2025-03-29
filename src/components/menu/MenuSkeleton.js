
import React from "react";

const MenuItemSkeleton = () => {
    return (
        <div className="relative bg-white p-4 rounded-lg text-center group transition-all transform shadow-custom  h-[400px]">
            <div className="relative bg-gray-200 text-center rounded-md overflow-hidden h-[50%] animate-pulse">
                {/* Skeleton loader for the image */}
                <div className="absolute top-0 left-0 w-full h-full bg-gray-300"></div>
            </div>

            {/* Skeleton loaders for name, description, and price */}
            <h4 className="font-semibold text-xl my-3 bg-gray-300 h-6 animate-pulse"></h4>
            <p className="text-gray-500 text-sm line-clamp-4 h-[3em] bg-gray-300 animate-pulse"></p>
            <div className="flex justify-between items-center">
                <div className="text-left text-green-600 font-bold bg-gray-300 h-6 animate-pulse"></div>
                <div className="bg-gray-300 h-6  animate-pulse"></div>

            </div>
            <button
                type="button"

                className="mt-4 bg-gray-300 text-black rounded-md px-8 p-4 border-0 hover:bg-gray-300 hover:text-white animate-pulse"
            >

            </button>
        </div>
    );
};

export default MenuItemSkeleton;

