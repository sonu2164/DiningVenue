

"use client"
import { SessionProvider, useSession } from "next-auth/react";
import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

export const CartContext = createContext({});

export function cartProductPrice(cartProduct) {
  let price = cartProduct?.menuItem?.basePrice;

  if (cartProduct?.selectedExtras?.length > 0) {
    for (const extra of cartProduct?.selectedExtras) {
      price += extra?.basePrice;
    }
  }

  return price;
}



export function AppProvider({ children }) {
  const [cartProducts, setCartProducts] = useState([]);
  const [openLoginPopup, setOpenLoginPopup] = useState(false);
  const [deliveryOption, setDeliveryOption] = useState('dine-in');
  const [paymentMethod, setPaymentMethod] = useState('qrcode');

  const [isAdmin, setIsAdmin] = useState(false);
  const { data: session, status } = useSession()

  console.log("111", session)


  const ls = typeof window !== "undefined" ? window.localStorage : null;
  useEffect(() => {
    if (status === "loading") {
      console.log("loading...");
      return;
    }

    if (status === "authenticated") {
      setIsAdmin(session?.user?.admin || false); // Ensure a boolean value
    }

    console.log("ddd", session, status);
    console.log("admin", isAdmin);
  }, [session, status]);



  useEffect(() => {
    const fetchCartItems = async (email) => {
      try {
        const response = await fetch(`/api/cart/${email}`);
        const res = await response.json();

        return res.data || [];
      } catch (error) {
        console.error("Error fetching cart items from server:", error);
        return [];
      }
    };


    const updateCartItems = async (email, itemsToUpdate) => {
      try {


        await fetch(`/api/cart/${email}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, cartItems: itemsToUpdate }),
        });
      } catch (error) {
        console.error("Error updating cart items on server:", error);
      }
    };



    const mergeCartItems = (localStorageItems, dbItems) => {
      const mergedItems = [...localStorageItems];

      // For each item in the database, check if it's not already in local storage
      if (dbItems && dbItems?.length > 0) {
        for (const dbItem of dbItems) {
          const existsInLocalStorage = localStorageItems.some(
            (lsItem) => lsItem.productId === dbItem.productId
          );

          if (!existsInLocalStorage) {
            mergedItems.push(dbItem);
          }
        }

      }
      return mergedItems;
    };

    const handleAuthenticationChange = async () => {
      // Check if the user is authenticated
      if (session) {
        // User is authenticated, fetch cart items from the server


        const dbCartItems = await fetchCartItems(session.user.email);

        // Merge items from local storage and the database
        const mergedItems = mergeCartItems(cartProducts, dbCartItems);

        // Update local storage and state
        setCartProducts(mergedItems);
        saveCartProductsToLocalStorage(mergedItems);

        // Update cart items on the server
        updateCartItems(session.user.email, mergedItems);
      } else {
        // User is not authenticated, check local storage
        if (ls && ls.getItem("cart")) {
          setCartProducts(JSON.parse(ls.getItem("cart")));
        }
      }
    };



    handleAuthenticationChange();

  }, [session]);


  // Function to fetch cart items from the server based on user ID
  const fetchCartItemsFromServer = async (email) => {
    try {
      const response = await fetch(`/api/cart/${email}`);
      const data = await response.json();
      return data.cartItems || [];
    } catch (error) {
      console.error("Error fetching cart items from server:", error);
      return [];
    }
  };

  // Function to save cart items to the server based on user ID
  const saveCartItemsToServer = async (email, cartItems) => {
    try {
      await fetch(`/api/cart/${email}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, cartItems }),
      });
    } catch (error) {
      console.error("Error saving cart items to server:", error);
    }
  };

  function clearCart() {
    setCartProducts([]);
    saveCartProductsToLocalStorage([]);

  }

  function removeCartProduct(indexToRemove) {
    setCartProducts((prevCartProducts) => {
      const newCartProducts = prevCartProducts.filter(
        (v, index) => index !== indexToRemove
      );
      saveCartProductsToLocalStorage(newCartProducts);
      if (session) {
        // Update cart items on the server for authenticated users
        saveCartItemsToServer(session.user.email, newCartProducts);
      }
      return newCartProducts;
    });
    toast.success("Product removed");
  }

  function saveCartProductsToLocalStorage(cartProducts) {
    if (ls) {
      ls.setItem("cart", JSON.stringify(cartProducts));
    }
  }

  function addToCart(product) {
    setCartProducts((prevProducts) => {
      // const cartProduct = { ...product, size, extras };
      const newProducts = [...prevProducts, product];
      saveCartProductsToLocalStorage(newProducts);
      if (session) {
        // Update cart items on the server for authenticated users
        saveCartItemsToServer(session.user.email, newProducts);
      }
      return newProducts;
    });
  }

  return (

    <CartContext.Provider
      value={{
        cartProducts,
        setCartProducts,
        addToCart,
        removeCartProduct,
        clearCart,
        openLoginPopup,
        setOpenLoginPopup,
        paymentMethod,
        setPaymentMethod,
        setDeliveryOption,
        deliveryOption,
        isAdmin
      }}
    >
      {children}
    </CartContext.Provider>

  );
}
