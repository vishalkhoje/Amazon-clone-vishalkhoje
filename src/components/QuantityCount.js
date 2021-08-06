import { updateQuantity } from "../slices/basketSlice";
import { useDispatch } from 'react-redux';


function QuantityCount({ setQuantity, quantity = 1, dispatch = false, id = null }) {
    const newDispatch = useDispatch()

    const increaseCount = () => {
        setQuantity(quantity + 1)
        updateQuantityHere(quantity + 1)
    }

    const decreaseCount = () => {
        if (quantity > 0) {
            setQuantity(quantity - 1)
            updateQuantityHere(quantity - 1)
        }
    }

    const updateQuantityHere = count => {
        console.log("dispatch:", dispatch)
        if (dispatch) {
            const product = { id, quantity: count }
            newDispatch(updateQuantity(product))
        }
    }

    return (
        <div className="flex">
            <button onClick={decreaseCount} className="w-10 h-10 flex items-center justify-center bg-gray-100 rounded-md font-bold hover:bg-gray-300">-</button>
            <div className="flex items-center justify-center w-9">{quantity}</div>
            <button onClick={increaseCount} className="w-10 h-10 flex items-center justify-center bg-gray-100 rounded-md font-bold hover:bg-gray-300">+</button>
        </div>
    )
}

export default QuantityCount
