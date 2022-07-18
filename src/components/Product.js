import { useState } from "react";
import Image from "next/image";
import { StarIcon } from '@heroicons/react/solid';
import Currency from 'react-currency-formatter';
import Fade from 'react-reveal/Fade';
import { useDispatch } from 'react-redux';
import { addToBasket } from "../slices/basketSlice";
import Link from 'next/link';
import {
    EyeIcon,
} from '@heroicons/react/outline'
import QuickView from "./QuickView";

const MAX_RATING = 5;
const MIN_RATING = 1;
const Product = ({ id, title, price, description, category, image, products, colors }) => {
    const dispatch = useDispatch();
    const [showQuick, setShowQuick] = useState(false);
    const [rating] = useState(Math.floor(Math.random() * (MAX_RATING - MIN_RATING + 1) + MIN_RATING))
    const [hasPrime] = useState(Math.random() < 0.5);

    const addItemsToBasket = () => {
        const product = { id, title, price, rating, description, category, image, hasPrime, quantity: 1 };

        dispatch(addToBasket(product));
    }

    return (
        <>
            <Fade bottom>
                <div className="relative flex flex-col m-5 bg-white p-10 z-30 rounded-xl">
                    <p className="absolute top-2 right-2 text-xs italic text-gray-400">{category}</p>

                    <div onClick={() => setShowQuick(true)} className={`relative rounded-lg card-zoom`}>
                        <Image className={"cursor-pointer rounded-lg overflow-hidden w-full card-zoom-image"} loading="lazy" src={image} width={800} height={500} objectFit="cover" />
                        <div className={`flex rounded-lg cursor-pointer view-button absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2`}>
                            <div className={`button rounded-lg flex items-center justify-center`}>
                                <span>Quick View</span>
                                <EyeIcon className="h-6" />
                            </div>
                        </div>
                    </div>
                    <Link href={`/product/`}>
                        <h4 title={title} className="cursor-pointer my-3 font-bold">{title}</h4>
                    </Link>
                    <div className="flex">
                        {Array(rating).fill()
                            .map((_, i) => (
                                <StarIcon key={i} className="h-5 text-yellow-500" />
                            )
                            )}
                    </div>
                    <p className="text-xs my-2 line-clamp-2">{description}</p>
                    <div className="mb-5">
                        <Currency
                            quantity={price}
                        />
                    </div>
                    <div className="flex items-center my-4">
                        {colors && colors.map(color => (
                            <div key={Math.random()} className={`w-7 h-7 border-gray-200 border-4 rounded-full mx-1`} style={{ background: color }} />
                        ))}
                    </div>
                    {hasPrime && (
                        <div className="flex items-center space-x-2 -mt-5">
                            <img className="w-12" src="https://links.papareact.com/fdw" alt="prime" />
                            <p className="text-xs text-gray-500">FREE Next-day Delivery</p>
                        </div>
                    )}
                    <button onClick={addItemsToBasket} className="button">Add to Basket</button>
                </div>
            </Fade>
            {showQuick && <QuickView setShowQuick={setShowQuick} id={id} products={products} />}
        </>
    )
}

export default Product
