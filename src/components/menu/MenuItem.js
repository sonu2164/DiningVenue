
import { CartContext } from "@/components/AppContext";
import MenuItemTile from "@/components/menu/MenuItemTile";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import FlyingButton from "react-flying-item";
import toast from "react-hot-toast";
import { MdCancel } from 'react-icons/md';


export default function MenuItem({ item, freeItems, extra }) {
  const {
    image, name, description, basePrice,

  } = item;
  const [
    selectedSize, setSelectedSize
  ] = useState(1);
  const [selectedExtras, setSelectedExtras] = useState([]);
  const [selectedFree, setSelectedFree] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState(basePrice);
  const [showPopup, setShowPopup] = useState(false);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    let extrasPrice = 0;
    for (const extra of selectedExtras) {
      extrasPrice += extra.basePrice;
    }

    setPrice((prevPrice) => (basePrice + extrasPrice) * quantity);
  }, [quantity, selectedExtras, basePrice]);

  useEffect(() => {
    if (showPopup) {
      document.body.classList.add('overflow-clip');
    } else {
      document.body.classList.remove('overflow-clip');
    }

    // Cleanup function to remove 'overflow-hidden' class when the component unmounts
    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, [showPopup]);



  async function handleAddToCartButtonClick() {




    const cartItem = {
      menuItem: item,
      selectedSize,
      selectedExtras,
      selectedFree,
      quantity,
    };

    addToCart(cartItem);

    await new Promise(resolve => setTimeout(resolve, 1000));

    setShowPopup(false);
  }

  function handleFreeItemClick(ev, freeItem) {
    const checked = ev.target.checked;
    setSelectedFree(prev => {
      if (checked) {
        return { ...prev, [freeItem._id]: freeItem };
      } else {
        const { [freeItem._id]: omit, ...rest } = prev;
        return rest;
      }
    });
  }

  function handleExtraItemClick(ev, extraItem) {
    const checked = ev.target.checked;
    setSelectedExtras(prev => {
      if (checked) {
        return [...prev, extraItem];
      } else {
        return prev.filter(item => item._id !== extraItem._id);
      }
    });
  }
  // const increase = () => {
  //   setQuantity(prev => prev + 1);

  // }
  // const decrease = () => {
  //   setQuantity(prev => Math.max(prev - 1, 1))

  // }


  return (
    <div className="h-fit ">

      <MenuItemTile
        onAddToCart={handleAddToCartButtonClick} quantity={quantity} setQuantity={setQuantity}
        {...item} />
    </div >
  );
}
