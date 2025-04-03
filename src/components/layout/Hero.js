import Right from "@/components/icons/Right";
import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="hero md:flex justify-between bg-y3 w-full md:mt-0 shadow-sm px-4 pt-20 relative">
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage:
            'url("https://images.unsplash.com/photo-1552566626-52f8b828add9?ixlib=rb-1.2.1&auto=format&fit=crop&w=2070&q=80")',
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/70" />
      </div>

      <div className="w-full relative z-10 py-8 md:py-12 text-white px-4 xl:px-10 flex flex-col md:flex-row items-center">
        <div className="w-full">
          <h1 className="text-4xl xl:text-6xl font-semibold">
            Everything
            <br /> is better
            <br /> with &nbsp;
            <span className="text-y3">Our Food</span>
          </h1>
          <p className="my-6 text-y3 text-lg">
            Divine venue makes every day complete, a simple yet delicious joy in
            life
          </p>
          <div className="flex gap-4 text-sm">
            <Link
              href="#homemenu"
              className="flex justify-center bg-primary uppercase w-full md:w-1/2 items-center gap-2 text-white px-4 py-2 rounded-full relative group transition-transform duration-300 ease-in-out delay-300"
            >
              Order now
              <div className="animate-pulse group-hover:rotate-90">
                <Right />
              </div>
            </Link>
            <button className="flex items-center border-0 gap-2 py-2 text-y3 font-semibold">
              Learn more
              <Right />
            </button>
          </div>
        </div>

        {/* Right Side Content */}

      </div>

      <div className={`relative  justify-end items-end z-20 hidden md:flex overflow-hidden`}>
        <Image
          src={"/burger.png"}
          objectFit="contain"
          width={500}
          height={500}



          alt={"burger"}

          className="absolute z-20 top-0 right-0"
        />
        <div className="hidden xl:block absolute z-10 bottom-[140px] left-[140px]   bg-opacity-70 p-5 rounded-lg">

          <p className="mt-4 text-xl italic text-gray-300">
            "Cooking is an art,<br />
            and every dish is a masterpiece.<br />
            Let us serve you the best."
          </p>

        </div>
      </div >
    </section >
  );
}
