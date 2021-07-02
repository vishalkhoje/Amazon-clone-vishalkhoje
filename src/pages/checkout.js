import Image from "next/image"
import Header from "../components/Header"
import { useSelector } from "react-redux";
import { selectItems, selectedItemsTotal } from '../slices/basketSlice';
import Currency from 'react-currency-formatter';
import { useSession } from 'next-auth/client'
import CheckoutProduct from "../components/CheckoutProduct";
import { loadStripe } from '@stripe/stripe-js';
import axios from "axios";

const stripePromise = loadStripe(process.env.stripe_public_key);

const Checkout = () => {
    const [session] = useSession();
    const selectedItem = useSelector(selectItems);
    const total = useSelector(selectedItemsTotal);
    // call the backend to create checkout session
    const createCheckoutSession = async () => {
        const stripe = await stripePromise;
        try {
            const checkoutSession = await axios.post('/api/create-checkout-session',
                {
                    items: selectedItem,
                    email: session.user.email
                });
            // redirect to user/customer to strip checkout 
            const result = await stripe.redirectToCheckout({
                sessionId: checkoutSession.data.id
            });
            if (result.error) alert(result.error.message)
        } catch (error) {
            console.error(error);
        }

    }

    return (
        <div className="bg-gray-100">
            <Header />
            <main className="md:flex max-w-screen-2xl mx-auto">
                {/* Left side */}
                <div className="flex-grow m-5 shadow-sm">
                    <Image
                        className="mx-auto"
                        src="https://links.papareact.com/ikj"
                        width={1020}
                        height={250}
                        objectFit="contain"
                        alt=""
                    />
                    <div className="flex flex-col mt-3 p-5 bg-white space-y-10">
                        <h1 className="text-3xl border-b pb-4">{selectedItem.length ? 'Your Shopping Basket' : 'Your Amazon Basket is empty.'}</h1>
                        {selectedItem.map((items, i) => (
                            <CheckoutProduct key={i} {...items} />
                        ))}
                    </div>
                </div>
                {/* Right Side */}
                <div className="flex flex-col bg-white p-10">
                    {selectedItem.length > 0 && (
                        <>
                            <h2 className="whitespace-nowrap">Subtotal ({selectedItem.length} items): {" "}
                                <span><Currency quantity={total} /></span>
                            </h2>
                            <button
                                role="link"
                                onClick={createCheckoutSession}
                                disabled={!session}
                                className={`button mt-2 ${!session && "from-gray-300 to-gray-500 border-gray-200 text-gray-300 cursor-not-allowed"}`}>
                                {session ? "Proceed to checkout" : "Sign to checkout"}
                            </button>
                        </>
                    )

                    }
                </div>
            </main>
        </div>
    )
}

export default Checkout

export async function getServerSideProps(context) {
    const products = await fetch('https://course-api.com/react-store-products').then(response => response.json())

    return {
        props: {
            products
        }
    }
}