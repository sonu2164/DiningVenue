import Right from "@/components/icons/Right";
import Image from "next/image";
import Link from "next/link";
// Import a separate CSS module

export default function Hero() {
  return (
    <section className="hero md:block md:mt-0 shadow-sm px-4 bg-y3 pt-20">
      <div className="py-8 md:py-12 ">
        <h1 className="text-4xl font-semibold">
          Everything<br />
          is better<br />
          with &nbsp;
          <span className="text-primary">
            Our Food
          </span>
        </h1>
        <p className="my-6 text-primary text-sm">
          Divine venue makes every day complete, a simple yet delicious joy in life
        </p>
        <div className="flex gap-4 text-sm">
          <Link href='#homemenu' className="flex justify-center bg-primary uppercase w-full md:w-1/2 items-center gap-2 text-white px-4 py-2 rounded-full relative group transition-transform duration-300 ease-in-out delay-300" >
            Order now
            <div className="animate-pulse group-hover:rotate-90">
              <Right />
            </div>
          </Link>
          <button className="flex items-center border-0 gap-2 py-2 text-gray-600 font-semibold">
            Learn more
            <Right />
          </button>
        </div>
      </div>
      <div className={`h-80 hidden md:block overflow-hidden`}>
        <Image src={'/salad1.png'} layout="responsive" objectFit={'contain'} alt={'pizza'} height={2000} width={2000} className='' />
      </div>
      {/* <div className={`h-80 hidden md:block overflow-hidden rotatingImageContainer`}>
        <Image src={'/egg.png'} layout="responsive" objectFit={'contain'} alt={'pizza'} height={2000} width={2000} className='custom-rotate' />
      </div> */}
      {/* <div className="absolute right-0 top-10 z-[1000]">
  <Image 
    src="/burger.png" 
    alt="Burger" 
    height={500} 
    width={500} 
    className="w-[100px] h-[100px] md:w-[250px] md:h-[250px] xl:w-[500px] xl:h-[500px]"
  />
</div>; */}
    </section>
  );
}




// import Right from "@/components/icons/Right";
// import Image from "next/image";

// export default function Hero() {
//   return (
//     <section className="hero md:mt-4 overflow-x-auto">
//       <div className="px-8 md:px-12 py-8 md:py-12 max-w-screen-xl mx-auto relative">
//         <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight">
//           Everything<br />
//           is better<br />
//           with&nbsp;
//           <span className="text-primary">
//             Biryani
//           </span>
//         </h1>
//         <p className="my-6 text-gray-500 text-base md:text-lg">
//           Pizza is the missing piece that makes every day complete, a simple yet delicious joy in life
//         </p>
//         <div className="flex gap-4 text-base md:text-lg">
//           <button className="flex justify-center bg-primary uppercase flex items-center gap-2 text-white px-4 py-2 rounded-full">
//             Order now
//             <Right />
//           </button>
//           <button className="flex items-center border-0 gap-2 py-2 text-gray-600 font-semibold">
//             Learn more
//             <Right />
//           </button>
//         </div>

//         {/* Second last child without padding */}
//         <div className="absolute inset-0">
//           <div className="flex justify-between items-center">
//             {/* Your useful links, contacts, address details content goes here */}
//           </div>
//         </div>
//       </div>

//       <div className="relative hidden md:block w-full overflow-x-auto">
//         <div className="min-w-max">
//           <Image src={'/salad1.png'} layout={'responsive'} width={800} height={400} objectFit={'contain'} alt={'pizza'} />
//         </div>
//       </div>
//     </section>
//   );
// }
