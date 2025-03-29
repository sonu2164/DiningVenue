import FlyingButton from 'react-flying-item'

export default function AddToCartButton({
  onClick, basePrice, image, quantity
}) {
  // if (!hasSizesOrExtras) {
  //   return (
  //     <div className="flying-button-parent mt-4">
  //       <FlyingButton
  //         targetTop={'5%'}
  //         targetLeft={'95%'}
  //         src={image}>
  //         <div onClick={onClick}>
  //           Add to cart ${basePrice}
  //         </div>
  //       </FlyingButton>
  //     </div>
  //   );
  // }
  return (
    <button
      type="button"
      onClick={onClick}
      className="bg-secondry text-black rounded-md border-0 hover:bg-primary hover:text-white text-sm "
    >
      Add to cart Rs. {basePrice * quantity}
    </button>
  );
}