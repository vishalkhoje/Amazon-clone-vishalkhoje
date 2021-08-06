import Head from "next/head";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Banner from "../components/Banner";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Productfeed from "../components/Productfeed";
import { getSession } from "next-auth/client";
import { addProducts } from "../slices/basketSlice"
// import LogRocket from 'logrocket';
// LogRocket.init('hz8dvu/amazon-2');

export default function Home({ products }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(addProducts(products))
  }, [products])

  return (
    <div className="bg-gray-100">
      <Head>
        <title>Amazon 2.0</title>
      </Head>
      <Header />
      <main className="max-w-screen-2xl mx-auto">
        {/* Banner */}
        <Banner />
        {/* ProductsFeed */}
        <Productfeed products={products} />
      </main>
      <Footer />
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  const products = await fetch("https://course-api.com/react-store-products")
    .then(res => res.json())

  return {
    props: {
      products,
      session
    }
  }
}
