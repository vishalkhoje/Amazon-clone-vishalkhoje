import { StarIcon } from "@heroicons/react/solid";
import { useState } from "react";
import { useDispatch } from 'react-redux';
import Image from "next/image";
import Currency from 'react-currency-formatter';
import QuantityCount from "./QuantityCount";
import { addToBasket, removeFromBasket } from "../slices/basketSlice";

const MAX_RATING = 5;
const MIN_RATING = 1;
const CheckoutProduct = ({ id, title, price, rating, description, category, image, hasPrime }) => {
    const dispatch = useDispatch();
    const [quantity, setQuantity] = useState(quantity);

    // const addItemsToBasket = () => {
    //     const product = { id, title, price, rating, description, category, image, hasPrime };
    //     // push the items into store 
    //     dispatch(addToBasket(product))
    // }
    const removeItemsFromBasket = () => {
        //remove the items from redux
        dispatch(removeFromBasket({ id }))
    }
    return (
        <div className="grid grid-cols-5">
            {/* Left side */}
            <div>
                <Image
                    className="cursor-pointer rounded-lg"
                    src={image}
                    width={200}
                    height={200}
                    objectFit="contain"
                />
            </div>

            {/* Middle side */}
            <div className="col-span-3 mx-5">
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
                    <Currency quantity={price} />
                </div>
                {hasPrime && (
                    <div className="flex items-center space-x-2 -mt-5">
                        <img className="w-12" src="https://links.papareact.com/fdw" alt="prime" />
                        <p className="text-xs text-gray-500">FREE Next-day Delivery</p>
                    </div>
                )}
            </div>

            {/* Right side add/remove button */}
            <div className="flex flex-col space-y-2 my-auto justify-self-end">
                {/* <div className="button" onClick={addItemsToBasket}>Add to Basket</div> */}
                <QuantityCount dispatch setQuantity={setQuantity} quantity={quantity} id={id} />
                <div className="button" onClick={removeItemsFromBasket}>Remove from Basket</div>
            </div>
        </div>
    )
}

export default CheckoutProduct
