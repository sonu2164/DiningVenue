// // pages/about.js
// import Head from 'next/head';
// import Image from 'next/image';
// import dish from '../../../public/dish.jpg';
// import chef from '../../../public/chef.webp';
// import exte from '../../../public/exte.jpg';
// import interior from '../../../public/interior.jpg';
// import salad from '../../../public/salad1.png';

// export default function AboutUs() {
//     return (
//         <div className="container mx-auto p-8 pt-[100px]">

//             <Head>
//                 <title>About Us - Dining Venue</title>
//             </Head>

//             <div className="text-center mb-8">
//                 <h1 className="text-5xl  font-black text-primary mb-4">Welcome to The Dining Venue Restaurant & Cafe!</h1>
//                 <p className="text-gray-600">Your destination for an unparalleled food experience</p>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
//                 <div className="relative overflow-hidden rounded-lg shadow-md">
//                     <Image
//                         src={interior}
//                         alt="Biryani Adda Interior"
//                         className="w-full h-full object-cover rounded-lg transition-transform transform hover:scale-105"
//                     />
//                     {/* <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black"></div> */}
//                 </div>
//                 <div className="text-left">
//                     <p className="text-xl font-semibold">
//                         Welcome to {`"The Dining venue,"`} your destination for an unparalleled food experience.
//                     </p>
//                     <p className="text-gray-600 mt-4">
//                         At Dining Venue, we take pride in offering a delightful dining experience with a diverse multicuisine menu. Your satisfaction and convenience are our top priorities, and we are honored to serve you.

//                         Our team, including our Food & Beverage Manager and Restaurant Supervisor, is always available to assist you and ensure you have the best experience possible. If you have any concerns during your visit, please do not hesitate to reach out to our management.
//                     </p>
//                     <p className="text-gray-600 mt-4">
//                         <b>  Our Commitment to You </b>
//                         We sincerely appreciate your choice to dine with us and share special moments with your family and friends. Our goal is to provide excellent service, high-quality meals, and a welcoming ambiance for every guest.
//                     </p>
//                     <p className="text-gray-600 mt-4">
//                         Join us on a culinary journey that reflects the richness of Indian cuisine, delivering a symphony of tastes and aromas that linger long after your visit. At The Dining Venue, it will be an unforgettable dining experience, where every bite is crafted with love and care.
//                     </p>
//                 </div>
//             </div>

//             <div className="text-center my-8">
//                 <div className="relative h-[200px] md:h-[400px] rounded-lg flex flex-row z-10 justify-center items-center md:p-5 md:m-20">
//                     <div className="w-1/3 -left-[3%]  absolute rounded-lg transition-transform transform hover:scale-105" style={{ transform: 'rotate(-10deg)' }}>

//                         <Image
//                             src={dish}
//                             alt="Biryani Adda Dishe1"
//                             className="w-full h-full object-cover rounded-lg"
//                         />
//                         {/* <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black rounded-lg"></div> */}

//                     </div>
//                     <div className="w-1/3  absolute rounded-lg transition-transform transform hover:scale-105" style={{ transform: 'rotate(14deg)' }}>
//                         <Image
//                             src={dish}
//                             alt="Biryani Adda Dishe2"
//                             className="w-full h-full object-cover rounded-lg"
//                         />
//                         {/* <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black rounded-lg"></div> */}

//                     </div>
//                     <div className="w-1/3 left-[70%] absolute rounded-lg transition-transform transform hover:scale-105" style={{ transform: 'rotate(-10deg)' }}>
//                         <Image
//                             src={dish}
//                             alt="Biryani Adda Dishe3"
//                             className="w-full h-full object-cover rounded-lg"
//                         />
//                         {/* <div className="absolute inset-0 bg-gradient-to-b from-transparent to-primary-600 rounded-lg"></div> */}

//                     </div>
//                 </div>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
//                 <div className="relative overflow-hidden rounded-lg shadow-md">
//                     <Image
//                         src={exte}
//                         alt="Biryani Adda Exterior"
//                         className="w-full h-full object-cover rounded-lg transition-transform transform hover:scale-105"
//                     />
//                     {/* <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black"></div> */}

//                 </div>
//                 <div className="text-left">
//                     <p className="text-xl font-semibold">
//                         The Dining Venue is not just a restaurant; {`it's`} an experience.
//                     </p>
//                     <p className="text-gray-600 mt-4">
//                         Our exterior reflects the warmth and inviting atmosphere that awaits you inside. It will be an unforgettable dining experience, where every bite is crafted with love and care.
//                     </p>
//                 </div>
//             </div>
//         </div>
//     );
// }



import Head from 'next/head';
import Image from 'next/image';
import dish from '../../../public/dish.jpg';
import chef from '../../../public/chef.webp';
import exte from '../../../public/exte.jpg';
import interior from '../../../public/interior.jpg';
import salad from '../../../public/salad1.png';

export default function AboutUs() {
    return (
        <div className="container mx-auto p-8 pt-[100px]">

            <Head>
                <title>About Us - Dining Venue</title>
            </Head>

            <div className="text-center mb-8">
                <h1 className="text-5xl font-black text-primary mb-4">
                    Welcome to The Dining Venue Restaurant & Cafe!
                </h1>
                <p className="text-gray-600">
                    Your destination for an unparalleled food experience
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="relative overflow-hidden rounded-lg shadow-md">
                    <Image
                        src={interior}
                        alt="Dining Venue Interior"
                        className="w-full h-full object-cover rounded-lg transition-transform transform hover:scale-105"
                    />
                </div>
                <div className="text-left">
                    <p className="text-xl font-semibold">
                        Welcome to {`"The Dining Venue,"`} your destination for an unparalleled food experience.
                    </p>
                    <p className="text-gray-600 mt-4">
                        At Dining Venue, we take pride in offering a delightful dining experience with a diverse multicuisine menu. Your satisfaction and convenience are our top priorities, and we are honored to serve you.
                    </p>
                    <p className="text-gray-600 mt-4">
                        Our team, including our <strong>Food & Beverage Manager</strong> and <strong>Restaurant Supervisor</strong>, is always available to assist you and ensure you have the best experience possible. If you have any concerns during your visit, please do not hesitate to reach out to our management.
                    </p>
                    <p className="text-gray-600 mt-4">
                        <strong>Our Commitment to You:</strong> We sincerely appreciate your choice to dine with us and share special moments with your family and friends. Our goal is to provide excellent service, high-quality meals, and a welcoming ambiance for every guest.
                    </p>
                    <p className="text-gray-600 mt-4">
                        Join us on a culinary journey that reflects the richness of Indian cuisine, delivering a symphony of tastes and aromas that linger long after your visit. At The Dining Venue, it will be an unforgettable dining experience, where every bite is crafted with love and care.
                    </p>
                </div>
            </div>

            <div className="my-8 p-6 bg-gray-100 rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold text-center mb-4 text-primary">
                    Important Information
                </h2>
                <ul className="text-gray-700 list-disc list-inside">
                    <li>Please allow <strong>25 minutes</strong> for major meal preparation to ensure the best quality.</li>
                    <li>Orders <strong>cannot be canceled</strong> once preparation has started.</li>
                    <li><strong>Operating Hours:</strong> 11:00 AM – 11:00 PM</li>
                    <li><strong>Last Order Timing:</strong> 10:45 PM</li>
                    <li><strong>Kitchen Closing Time:</strong> 11:00 PM</li>
                </ul>
                <p className="text-center mt-4 font-semibold text-primary">
                    We look forward to serving you!
                </p>
                <p className="text-center font-bold text-red-600 mt-2">
                    Thank You & Visit Again!
                </p>
                <p className="text-center text-gray-600 mt-2">
                    For any assistance, feel free to contact our management at <strong>+91 8009769707</strong>.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="relative overflow-hidden rounded-lg shadow-md">
                    <Image
                        src={exte}
                        alt="Dining Venue Exterior"
                        className="w-full h-full object-cover rounded-lg transition-transform transform hover:scale-105"
                    />
                </div>
                <div className="text-left">
                    <p className="text-xl font-semibold">
                        The Dining Venue is not just a restaurant; {`it's`} an experience.
                    </p>
                    <p className="text-gray-600 mt-4">
                        Our exterior reflects the warmth and inviting atmosphere that awaits you inside. It will be an unforgettable dining experience, where every bite is crafted with love and care.
                    </p>
                </div>
            </div>
        </div>
    );
}

