import React from 'react';
import Image from 'next/image';

const Notfound = () => {
    return (
        // <div className="flex items-center justify-center h-screen">
            <div className="w-full h-full z-10">
                <Image
                    src="https://cdn.svgator.com/images/2024/04/walking-investigator-animation-in-404-error-page.gif"
                    alt="404 Not Found"
                    layout="fill"
                    objectFit="cover"
                />
            </div>
        // </div>
    );
};

export default Notfound;
