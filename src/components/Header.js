import Image from 'next/image';
import { SearchIcon, ShoppingCartIcon, MenuIcon } from '@heroicons/react/outline'
import { signIn, signOut, useSession } from 'next-auth/client'
import { useRouter } from 'next/router';
import { useSelector } from "react-redux";
import { selectedItemsCount } from '../slices/basketSlice';

const Header = () => {
    const [session] = useSession();
    const router = useRouter();
    const cartCount = useSelector(selectedItemsCount);

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
                <div className="hidden sm:flex items-center h-10 rounded-md flex-grow cursor-pointer bg-yellow-400 hover:bg-yellow-500 ">
                    <input type="text" className="p-2 h-full w-6 items-center flex-grow flex-shrink rounded-l-md focus:outline-none px-4" />
                    <SearchIcon className="h-12 p-4" />
                </div>
                {/* search */}
                <div className="flex text-white mx-6 items-center text-xs space-x-6 whitespace-nowrap">
                    <div onClick={!session ? signIn : signOut} className="link">
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
