import AddToCartButton from "@/components/menu/AddToCartButton";
import Image from "next/image";
import { useState } from "react";

export default function MenuItemTile({ onAddToCart, quantity, setQuantity, ...item }) {
  const [hover, setHover] = useState(false);
  const { image, description, name, basePrice } = item;
  // const [quantity, setQuantity] = useState(1);


  const increase = () => {
    setQuantity(prev => prev + 1);

  }
  const decrease = () => {
    setQuantity(prev => Math.max(prev - 1, 1))

  }


  return (
    <div
      // onMouseEnter={() => setHover(true)}
      // onMouseLeave={() => setHover(false)}
      className="relative bg-white p-4 rounded-lg text-center group transition-all transform shadow-custom  border-primary h-fit"
    >
      <div className="relative bg-gray-200 text-center rounded-md overflow-hidden h-[60px]">
        <Image
          src={image}
          layout="fill"
          objectFit="cover"
          className="absolute top-0 left-0 w-full h-full"
          alt="pizza"
        />
      </div>

      <h4 className="font-semibold text-sm my-3 text-left line-clamp-1">🟥 {name}</h4>
      <p className="text-gray-500 text-sm line-clamp-4 h-[3em] text-left ">{description}</p>
      <div className="flex justify-between items-center mb-2">
        <div className="text-left text-xl text-green-600 font-bold">&#8377;{basePrice}</div>
        <div className="flex items-center gap-1 rounded-md border p-0">

          <div onClick={decrease} className="border-r p-2  pt-0 pb-0  cursor-pointer hover:bg-gray-200 select-none" >
            -
          </div>

          <span className="flex p-1  pt-0 pb-0 select-none">{quantity}</span>

          <div onClick={increase} className="border-l p-2 pt-0 pb-0 cursor-pointer hover:bg-gray-200  select-none">
            +
          </div>
        </div>




      </div>
      <AddToCartButton image={image} onClick={onAddToCart} basePrice={basePrice} quantity={quantity} />

    </div>
  );
}
