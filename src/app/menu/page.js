"use client";

import Hero from "@/components/layout/Hero";
import HomeMenu from "@/components/layout/HomeMenu";
import MenuFilter from "@/components/layout/MenuFilter";
import Loader from "@/components/Loader";
import LoginPage2 from "@/components/Loginpage2";
import { useState, useEffect, useContext } from "react";
import { CartContext } from "@/components/AppContext";

export default function MenuPage() {
  const [loading, setLoading] = useState(true);
  const { openLoginPopup } = useContext(CartContext);

  const [menuItems, setMenuItems] = useState([]);
  const [filteredMenuItems, setFilteredMenuItems] = useState([]);
  const [freeItems, setFreeItems] = useState([]);

  const [selectedCategory, setSelectedCategory] = useState("All Menus");
  const [isVegOnly, setIsVegOnly] = useState(false);

  const fetchData = async () => {
    try {
      const menuItemsResponse = await fetch("/api/menu-items");
      const menuItemsData = await menuItemsResponse.json();

      setMenuItems(menuItemsData);
      setFilteredMenuItems(menuItemsData);
      setFreeItems([]);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false); // Ensure loading is set to false even if fetch fails
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (selectedCategory === "All Menus") {
      setFilteredMenuItems(menuItems);
    } else {
      setFilteredMenuItems(menuItems.filter((item) => item.category === selectedCategory));
    }
  }, [selectedCategory, menuItems]); // Added menuItems as a dependency

  useEffect(() => {
    if (isVegOnly) {
      setFilteredMenuItems(menuItems.filter((item) => item.foodType === "Veg"));
    } else {
      setFilteredMenuItems(
        selectedCategory === "All Menus"
          ? menuItems
          : menuItems.filter((item) => item.category === selectedCategory)
      );
    }
  }, [isVegOnly, selectedCategory, menuItems]); // Included all dependencies

  return (
    <>
      {loading && <Loader />}
      {/* {openLoginPopup && <LoginPage2 />} */}
      <Hero />
      <div className=" sm:px-2 md:px-5 xl:px-20">
        <MenuFilter
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          isVegOnly={isVegOnly}
          setIsVegOnly={setIsVegOnly}
        />
        <HomeMenu
          menuItems={filteredMenuItems}
          freeItems={freeItems}
          selectedCategory={selectedCategory}
          loading={loading}
        />
      </div>
    </>
  );
}



































// "use client"
// // import Header from "@/components/layout/Header";
// import Hero from "@/components/layout/Hero";
// import HomeMenu from "@/components/layout/HomeMenu";
// import MenuFilter from "@/components/layout/MenuFilter";


// import Loader from '@/components/Loader'
// import { useState, useEffect } from "react";
// import LoginPage2 from "@/components/Loginpage2";
// import { useContext } from "react";
// import { CartContext } from "@/components/AppContext";

// export default function MenuPage() {
//   const [loading, setLoading] = useState(true);
//   const { openLoginPopup } = useContext(CartContext);


//   const [menuItems, setMenuItems] = useState([]);
//   const [filteredMenuItems, setfilteredMenuItems] = useState([]);
//   const [freeItems, setFreeItems] = useState([]);

//   const [selectedCategory, setSelectedCategory] = useState("All Menus");
//   const [isVegOnly, setIsVegOnly] = useState(false);


//   // const [freeItems, setFreeItems] = useState([]);


//   // useEffect(() => {
//   //   // Simulating a delay for the purpose of the example
//   //   const delay = setTimeout(() => {
//   //     setLoading(false);
//   //   }, 2000);

//   //   // Cleanup function to clear the timeout in case the component unmounts
//   //   return () => clearTimeout(delay);
//   // }, []);



//   const fetchData = async () => {
//     try {



//       const menuItemsResponse = await fetch('/api/menu-items');
//       const menuItemsData = await menuItemsResponse.json();


//       setMenuItems(menuItemsData);
//       setfilteredMenuItems(menuItemsData);

//       setFreeItems([]);
//       setLoading(false); // Data is loaded, set loading to false
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
//   };

//   useEffect(() => {
//     fetchData();


//   }, []);


//   useEffect(() => {
//     console.log("1");


//     if (selectedCategory === 'All Menus') {
//       setfilteredMenuItems(menuItems);
//       console.log("2");


//     }
//     else {
//       setfilteredMenuItems(menuItems.filter((item) => item.category === selectedCategory));
//       console.log("3");

//       console.log(filteredMenuItems);



//     }
//     console.log("4");





//   }, [selectedCategory]);

//   useEffect(() => {
//     if (isVegOnly) {
//       setfilteredMenuItems((item) => (item.foodType === 'Veg'));

//     }
//     else {
//       setfilteredMenuItems(menuItems.filter((item) => item.category === selectedCategory));



//     }

//   }, [isVegOnly])

//   return (
//     <>
//       {loading && <Loader />}
//       {openLoginPopup && <LoginPage2 />}
//       <Hero />
//       <div className="px-20">
//         <MenuFilter selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} isVegOnly={isVegOnly} setIsVegOnly={setIsVegOnly} />
//         <HomeMenu menuItems={filteredMenuItems} freeItems={freeItems} selectedCategory={selectedCategory} loading={loading} />
//       </div>





//     </>
//   );
// }
