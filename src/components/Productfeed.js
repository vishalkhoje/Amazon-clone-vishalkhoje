import Product from "./Product";

const Productfeed = ({ products }) => {
    return (
        <div className="grid grid-flow-row-dense md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:-mt-52 mx-auto">
            {products.slice(0, 4).map(({ id, name: title, price, description, category, image }) => (
                <Product
                    key={id}
                    id={id}
                    title={title}
                    price={price}
                    description={description}
                    category={category}
                    image={image}
                    products={products}
                />
            ))}

            <img
                className="px-5 md:col-span-full rounded-lg mx-auto"
                loading="lazy"
                src="https://links.papareact.com/dyz" alt=""
            />

            <div className="md:col-span-2">
                {products.slice(4, 5).map(({ id, name: title, price, description, category, image }) => (
                    <Product
                        key={id}
                        id={id}
                        title={title}
                        price={price}
                        description={description}
                        category={category}
                        image={image}
                        products={products}
                    />
                ))}
            </div>
            {products.slice(5, products.length).map(({ id, name: title, price, description, category, image }) => (
                <Product
                    key={id}
                    id={id}
                    title={title}
                    price={price}
                    description={description}
                    category={category}
                    image={image}
                    products={products}
                />
            ))}
        </div>
    )
}

export default Productfeed
