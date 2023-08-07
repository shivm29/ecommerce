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

        <div className={`flex justify-between box-border px-10 text-sm bg-yellow-100 py-2 ease-in`} >
            <div className={`slider-content ${showContent1 ? '' : 'hidden'}`} id="slider-content-1">
                Pick something nice for your partner, it's the least you can do!
            </div>
            <div className={`slider-content ${showContent1 ? 'hidden' : ''} `} id="slider-content-2">
                Self gifting is worth it too !  &nbsp; ; )
            </div>
            <div className="arrow-container">
                <span className={`arrow-left ${showContent1 ? 'hidden' : ''} cursor-pointer`} onClick={slideToLeft}>
                    mingle ?
                </span>
                <span className={`arrow-right ${showContent1 ? '' : 'hidden'} cursor-pointer`} onClick={slideToRight}>
                    single ?
                </span>
            </div>
        </div>

    )
}

export default PickSomething