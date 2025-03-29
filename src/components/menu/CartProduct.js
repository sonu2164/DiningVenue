import { cartProductPrice } from "@/components/AppContext";
import Trash from "@/components/icons/Trash";
import Image from "next/image";

export default function CartProduct({ product, onRemove, index }) {
  const { menuItem, selectedExtras, quantity, selectedFreeItems, selectedSize } = product;
  let extraCost = 0;
  for (const se of selectedExtras) {
    extraCost += se.basePrice;
  }
  const Total = (extraCost + menuItem.basePrice) * quantity * selectedSize;
  return (
    <div className="flex items-center relative gap-2 p-2  bg-white rounded-lg border-2 border-gray-300">
      <div className="w-24 bg-slate-200 rounded-md ">
        <Image width={240} height={240} src={menuItem.image} alt={''} className="rounded-md" />
      </div>
      <div className={`flex flex-col justify-between w-full ${selectedExtras.length === 0 && 'gap-3'}`}
      >
        <div>

          <h3 className="font-semibold">
            {menuItem.name}
          </h3>
          {selectedExtras.length > 0 && <p className="text-sm">Extra [{selectedExtras.length}]: {extraCost}</p>}
        </div>
        <div className="text-primary font-bold flex justify-between w-full">
          <div className="flex w-1/2 justify-start gap-2 ">
            <div>


              Rs.{menuItem.basePrice}
            </div>
            <div className="text-black">
              {quantity}X
            </div>
          </div>
          <div className="flex justify-end w-1/2">
            Rs.{Total}

          </div>

        </div>

      </div>
      {!!onRemove && (
        <div className=" absolute top-2 right-2">
          <button
            type="button"
            onClick={() => onRemove(index)}
            className="p-1">
            <Trash />
          </button>
        </div>
      )}
    </div>



  );
}


