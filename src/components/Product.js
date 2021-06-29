import { useState } from "react";
import Image from "next/image";
import { StarIcon } from '@heroicons/react/solid';
import Currency from 'react-currency-formatter';
import Fade from 'react-reveal/Fade';
import { useDispatch } from 'react-redux';
import { addToBasket } from "../slices/basketSlice";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const MAX_RATING = 5;
const MIN_RATING = 1;
const Product = ({ id, title, price, description, category, image }) => {
    const dispatch = useDispatch()
    const [rating] = useState(Math.floor(Math.random() * (MAX_RATING - MIN_RATING + 1) + MIN_RATING))
    const [hasPrime] = useState(Math.random() < 0.5);

    const addItemsToBasket = () => {
        const product = { id, title, price, rating, description, category, image, hasPrime };
        dispatch(addToBasket(product));
        toast(`${title} added into basket.`, { closeOnClick: true, autoClose: 3000 });
    }

    return (
        <Fade bottom>
            <div className="relative flex flex-col m-5 bg-white p-10 z-30 rounded-xl">
                <p className="absolute top-2 right-2 text-xs italic text-gray-400">{category}</p>
                <Image
                    className="cursor-pointer rounded-lg"
                    src={image}
                    width={200}
                    height={200}
                    objectFit="contain"
                />
                <h1 className="my-3">{title}</h1>
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
                    // currency="INR"
                    />
                </div>
                {hasPrime && (
                    <div className="flex items-center space-x-2 -mt-5">
                        <img className="w-12" src="https://links.papareact.com/fdw" alt="prime" />
                        <p className="text-xs text-gray-500">FREE Next-day Delivery</p>
                    </div>
                )}
                <button onClick={addItemsToBasket} className="button">Add to Basket</button>
                <ToastContainer
                    autoClose={3000}
                    closeOnClick
                />
            </div>
        </Fade>
    )
}

export default Product
