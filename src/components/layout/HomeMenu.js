'use client';
import React, { useEffect, useState } from "react";
import Image from "next/image";
import MenuItem from "@/components/menu/MenuItem";
import MenuSkeleton from "@/components/menu/MenuSkeleton";

export default function HomeMenu({ menuItems, freeItems, selectedCategory, loading }) {
  // const [categories, setCategories] = useState([]);
  // const [menuItems, setMenuItems] = useState([]);
  // const [freeItems, setFreeItems] = useState([]);
  // const [loading, setLoading] = useState(true);

  // const fetchData = async () => {
  //   try {
  //     const categoriesResponse = await fetch('/api/categories');
  //     const categoriesData = await categoriesResponse.json();
  //     setCategories(categoriesData);

  //     const menuItemsResponse = await fetch('/api/menu-items');
  //     const menuItemsData = await menuItemsResponse.json();

  //     const freeCategory = categoriesData.find(c => c.name === 'free');
  //     const normalItems = menuItemsData.filter(item => item.category !== freeCategory._id);
  //     const freeItemsData = menuItemsData.filter(item => item.category === freeCategory._id);

  //     setMenuItems(normalItems);
  //     setFreeItems(freeItemsData);
  //     setLoading(false); // Data is loaded, set loading to false
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //   }
  // };

  // useEffect(() => {
  //   fetchData();
  // }, [categories]);


  return (
    <section className="">




      <div className="flex justify-center">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4 m-4">
          {loading ? (
            // If loading, display skeleton
            <>
              <div className="col-span-1">
                <MenuSkeleton />

              </div>
              <div className="col-span-1">
                <MenuSkeleton />

              </div>
              <div className="col-span-1">
                <MenuSkeleton />

              </div>
            </>
          ) : (
            // If data is loaded, map through menu items
            menuItems?.length > 0 &&
            menuItems.map(item => (
              <div key={item._id} className="col-span-1 ">
                <MenuItem item={item} freeItems={freeItems} extra={freeItems} />
              </div>
            ))
          )}
        </div>

      </div>

    </section>

  );
}
