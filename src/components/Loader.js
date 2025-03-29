import React from 'react';
import classNames from 'classnames';
import logosrc from '../../public/logo.png';
import Image from 'next/image';
import { BarLoader } from 'react-spinners'

const Loader = () => {
    return (
        <div className="fixed inset-0 flex flex-col items-center justify-center bg-black bg-opacity-80  z-30">
            <div className="loader-container relative bg-white m-2 rounded-full">

                {/* Your circular logo image goes here */}
                <Image src={logosrc} alt="Logo" className=" w-40 h-40 object-cover animate-pulse" />

                {/* Loader */}
                <div className={classNames('absolute loader', 'border-t-4 border-white')}></div>

            </div>
            <BarLoader
                color="#ffc70e"
                speedMultiplier={0.8}
            />

        </div>

    );
};

export default Loader;
