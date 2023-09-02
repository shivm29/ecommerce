import React from 'react'
import { useState } from 'react';

const PickSomething = () => {


    const [showContent1, setShowContent1] = useState(true);

    const slideToRight = () => {
        setShowContent1(false);
    };

    const slideToLeft = () => {
        setShowContent1(true);
    };

    return (

        <div className={`max-[800px]:hidden flex justify-between box-border py-2 pr-3 mt-2 text-sm  max-[800px]:text-xs`} >
            <div className={`slider-content font-medium ${showContent1 ? '' : 'hidden'}`} id="slider-content-1">
                Pick something nice for your partner, it's the least you can do!
            </div>
            <div className={`slider-content font-medium ${showContent1 ? 'hidden' : ''} `} id="slider-content-2">
                Self gifting is worth it too !  &nbsp; ; )
            </div>
            <div className="arrow-container">
                <span className={`arrow-left font-semibold ${showContent1 ? 'hidden' : ''} cursor-pointer`} onClick={slideToLeft}>
                    Mingle ?
                </span>
                <span className={` arrow-right font-semibold ${showContent1 ? '' : 'hidden'} cursor-pointer`} onClick={slideToRight}>
                    Single ?
                </span>
            </div>
        </div>

    )
}

export default PickSomething