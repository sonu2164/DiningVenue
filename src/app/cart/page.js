
'use client';
import { usePathname, useRouter } from 'next/navigation'
// import { useRouter } from 'next/router'

// import { useRoute as useRouter2 } from 'next/router'
import { CartContext, cartProductPrice } from "@/components/AppContext";
import Trash from "@/components/icons/Trash";
import AddressInputs from "@/components/layout/AddressInputs";
import SectionHeaders from "@/components/layout/SectionHeaders";
import CartProduct from "@/components/menu/CartProduct";
import { useProfile } from "@/components/UseProfile";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { TbCashBanknote, TbCreditCard, TbQrcode } from "react-icons/tb";
import { signOut, useSession } from "next-auth/react";
import { CgSpinner } from 'react-icons/cg';




export default function CartPage() {
  const { cartProducts, removeCartProduct, paymentMethod, setPaymentMethod, deliveryOption, setDeliveryOption, setOpenLoginPopup } = useContext(CartContext);
  const [address, setAddress] = useState({});
  const { data: profileData } = useProfile();
  const [loading, setLoading] = useState(false);
  const pathname = usePathname();
  // const searchParams = useSearchParam();

  const router = useRouter();
  // const router2 = useRouter2();
  const session = useSession();
  const status = session?.status;

  let subtotal = 0;
  for (const p of cartProducts) {
    subtotal += cartProductPrice(p) * p.selectedSize * p.quantity;
  }

  useEffect(() => {
    const url = `${pathname}`
    setLoading(false);
  }, [pathname])


  async function proceedToCheckout(ev) {
    // ev.preventDefault();
    setLoading(true);

    try {
      if (status === 'unauthenticated') {
        setOpenLoginPopup(true);
      } else {
        router.push('/checkout');
      }
    } catch (error) {
      console.error('Error navigating to checkout:', error);
    }
  }

  if (cartProducts?.length === 0) {
    return (
      <section className="mt-8 text-center">
        <SectionHeaders mainHeader="Cart" />
        <p className="mt-4">Your shopping cart is empty 😔</p>
      </section>
    );
  }

  return (

    <div className="flex flex-col justify-center">
      <SectionHeaders mainHeader="Cart" />


      <div className="flex flex-row text-black bg-slate-200 rounded-full ">

        <button
          onClick={() => setDeliveryOption("dine-in")}
          className={`${deliveryOption == 'dine-in' ? "bg-secondry text-white" : "bg-slate-200"} p-2 flex rounded-l-lg rounded-r-2xl border-0 `}
        >
          Dine-in
        </button>
        <button
          onClick={() => setDeliveryOption("take-away")}
          className={`${deliveryOption == 'take-away' ? "bg-secondry text-white" : "bg-slate-200"} p-2 flex rounded-2xl border-0`}

        >
          Take-Away
        </button>
        <button
          onClick={() => setDeliveryOption("delivery")}
          className={`${deliveryOption == 'delivery' ? "bg-secondry text-white" : "bg-slate-200"} p-2 flex rounded-r-lg rounded-l-2xl  border-0`}

        >
          Delivery
        </button>
      </div>

      {/* <CustomScrollbar> */}

      <div className="mt-2 mr-2 p-1 max-h-[300px] overflow-y-auto custom-scrollbar ">
        <div className="flex flex-col gap-2 ">
          {cartProducts?.length === 0 && (
            <div>No products in your shopping cart</div>
          )}
          {cartProducts?.length > 0 && cartProducts.map((product, index) => (
            <CartProduct
              key={index}
              product={product}
              index={index}
              onRemove={removeCartProduct}
            />
          ))}
        </div>
      </div>
      {/* </CustomScrollbar> */}

      <div className="flex justify-center mt-2 w-full ">
        <div className=" flex flex-col p-2 justify-center items-center bg-slate-200 w-full rounded-lg">
          <div className="text-gray-500 p-1 flex flex-col w-full border-dashed border-b-2 border-gray-400">
            <div className="text-black flex flex-row justify-between">
              <p className="flex">Subtotal:</p>
              <p className="flex">{subtotal}</p>

            </div>
            <div className="flex flex-row justify-between">
              <p>Delivery:</p>
              <p>5</p>

            </div>



          </div>
          <div className="font-semibold pl-2 text-right w-full">
            <div className="flex flex-row justify-between">
              <p>Total:</p>
              <p>{subtotal + 5}</p>

            </div>

          </div>
        </div>
      </div>


      <div className="flex flex-row text-black rounded-full gap-8 m-2 pr-4 w-full justify-between items-center">
        <div className="flex flex-col items-center justify-center w-1/3">
          <button
            onClick={() => setPaymentMethod("cash")}
            className={`${paymentMethod === "cash" ? "border-2 border-primary" : "bg-white"
              } p-4 items-center rounded-md h-15 w-15 aspect-w-1 aspect-h-1`}
          >
            <TbCashBanknote size={30} />
          </button>
          <span className="mt-2 text-sm font-medium">Cash</span>
        </div>
        <div className="flex flex-col items-center w-1/3">
          <button
            onClick={() => setPaymentMethod("credit/debit")}
            className={`${paymentMethod === "credit/debit" ? "border-2 border-primary" : "bg-white"
              } p-4 flex items-center rounded-md h-15 w-15 aspect-w-1 aspect-h-1`}
          >
            <TbCreditCard size={30} />
          </button>
          <span className="mt-2 text-sm font-medium">Credit/Debit</span>
        </div>
        <div className="flex flex-col items-center w-1/3">
          <button
            onClick={() => setPaymentMethod("upi")}
            className={`${paymentMethod === "upi" ? "border-2 border-primary " : "bg-white"
              } p-4 flex items-center rounded-md h-15 w-15 aspect-w-1 aspect-h-1`}
          >
            <TbQrcode size={30} />
          </button>
          <span className="mt-2 flex text-sm font-medium">UPI/ QR</span>
        </div>
      </div>

      <div>
        <button
          onClick={proceedToCheckout}
          className="bg-primary text-white px-4 py-2 rounded-md"
          disabled={loading}
        >
          Place Order

          {loading && (
            <CgSpinner
              size={20}
              className="mt-1 animate-spin"
            />
          )}

        </button>
      </div>


    </div>
  );
}
