import Image from 'next/image';
import { SearchIcon, ShoppingCartIcon, MenuIcon } from '@heroicons/react/outline'
import { signIn, signOut, useSession } from 'next-auth/client'
import { useRouter } from 'next/router';
import { useSelector } from "react-redux";
import { useState } from "react";
import Link from "next/link";
import { selectedItemsCount } from '../slices/basketSlice';
import Currency from 'react-currency-formatter';

const Header = ({ products }) => {
    const [session] = useSession();
    const router = useRouter();
    const cartCount = useSelector(selectedItemsCount);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [showResults, setShowResults] = useState(false)

    const handleSearch = e => {
        let searchText = e.target.value
        searchText = searchText.toLowerCase()
        setSearchTerm(searchText)
        setSearchResults(products?.filter(product => product.name.includes(searchText)))
    }

    const handleSignIn = (e) => {
        e.preventDefault()
        signIn('google', { callbackUrl: `${window.location.host}` });
      };

    return (
        <header>
            <div className="flex items-center bg-amazon_blue flex-grow p-1 py-2">
                {/* top nav */}
                <div className="flex mt-2 items-center flex-grow sm:flex-grow-0">
                    <Image
                        onClick={() => router.push('/')}
                        src="https://links.papareact.com/f90"
                        width={150}
                        height={40}
                        objectFit="contain"
                        className="cursor-pointer"
                    />
                </div>
                {/* search */}
                <div className="hidden relative sm:flex items-center h-10 rounded-md flex-grow cursor-pointer bg-yellow-400 hover:bg-yellow-500 ">
                    <input type="text" className="p-2 h-full w-6 items-center flex-grow flex-shrink rounded-l-md focus:outline-none px-4"
                        placeholder="Search anything you need..."
                        onChange={handleSearch}
                        onMouseOver={() => setShowResults(true)}
                        onBlur={() => setShowResults(false)}
                        onFocus={() => setShowResults(true)} value={searchTerm} />
                    <SearchIcon className="h-12 p-4" />

                    {showResults && (
                        <div onClick={() => setShowResults(true)} onMouseOver={() => setShowResults(true)}
                            onMouseLeave={() => setShowResults(false)}
                            className="absolute w-full bg-white bottom-0 z-10 rounded-md h-auto max-h-400 translate-y-full overflow-auto"
                        >

                            {(!!searchResults?.length) ? searchResults.map(({ id, name, price, category }) => (
                                <div key={Math.random()} className="p-2 mt-2 border-b-2 rounded-md border-gray-100 bg-gray-50">
                                    <Link href={`/product/${id}`}>
                                        <h5 className="font-medium text-sm text-gray-600">{name}</h5>
                                    </Link>
                                    <Link href={`/product/${id}`}>
                                        <p className="text-xs text-gray-400">{category}
                                            <Currency
                                                quantity={price}
                                            />
                                        </p>
                                    </Link>
                                </div>
                            )) : (
                                <>
                                    {searchTerm && <p className="text-xs text-gray-400 text-center py-2">No product found</p>}
                                </>
                            )}
                        </div>
                    )}
                </div>
                {/* search */}
                <div className="flex text-white mx-6 items-center text-xs space-x-6 whitespace-nowrap">
                    <div onClick={!session ? handleSignIn : signOut} className="link">
                        <p>{session ? `Hello, ${session.user.name}` : 'Sign In'}</p>
                        <p className="font-extrabold md:text-sm">Account & Lists</p>
                    </div>
                    <div className="link">
                        <p>Returns</p>
                        <p className="font-extrabold md:text-sm">& Orders</p>
                    </div>
                    <div onClick={() => router.push('/checkout')} className="relative link flex items-center">
                        <span className="absolute top-0 right-0 md:right-10 h-4 w-4 bg-yellow-400 text-center rounded-full text-black font-bold">{cartCount}</span>
                        <ShoppingCartIcon className="h-10" />
                        <p className="hidden md:inline font-extrabold md:text-sm mt-2">Basket</p>
                    </div>
                </div>
            </div>
            <div className="flex items-center bg-amazon_blue-light text-white space-x-3 p-2 pl-6 text-sm">
                {/* bottom nav */}
                <p className="flex link items-center">
                    <MenuIcon className="h-6 mr-1" />
                    All
                </p>
                <p className="link">Prime Video</p>
                <p className="link">Amazon Business</p>
                <p className="link">Today's Deals</p>
                <p className="link hidden lg:inline-flex">Electronics</p>
                <p className="link  hidden lg:inline-flex">Food Grocery</p>
                <p className="link  hidden lg:inline-flex">Prime</p>
                <p className="link  hidden lg:inline-flex">Buy Again</p>
                <p className="link  hidden lg:inline-flex">Shoper Toolkit</p>
                <p className="link  hidden lg:inline-flex">Health & Personal Care</p>
            </div>
        </header>
    )
}

export default Header
