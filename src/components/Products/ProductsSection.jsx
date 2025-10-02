import React, { useEffect, useState } from "react";
import ProductsSkeleton from "./ProductsSkeleton";
import Pagination from "../Pagination/Pagination";
import { useCart } from "../../CartContext/CartContext";

export default function ProductList({ titleText, activeCategory, sortType }) {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [productAmount, setProductAmount] = useState({});
    const [totalProducts, setTotalProducts] = useState(0);
    const [activePage, setActivePage] = useState(1);
    const { addToCart, getItemQuantity } = useCart();

    // const handleAddToCart = (product) => {
    //     setProductAmount((prev) => ({
    //         ...prev,
    //         [product.id]: (prev[product.id] || 0) + 1
    //     }));
    // };
    
    const handleAddToCart = (product) => {
        addToCart(product);
    };

    useEffect(() => {
        setLoading(true);

        const controller = new AbortController(); // защита от утечек
        const signal = controller.signal;

        fetch(
            `/api/products.php?category_id=${activeCategory}&page=${activePage}&sortBy=${sortType.sortType}&order=${sortType.direction}`,
            { signal }
        )
            .then((res) => res.json())
            .then((data) => {
                setProducts(data.products || []);
                setTotalProducts(data.total || 0);
                setLoading(false);
            })
            .catch((err) => {
                if (err.name !== "AbortError") {
                    console.error("Ошибка загрузки товаров:", err);
                }
                setLoading(false);
            });

        return () => controller.abort();
    }, [activeCategory, activePage, sortType]);

    if (loading) {
        return (
            <section className="max-w-7xl mx-auto">
                <h1 className="font-bold my-12 text-4xl">{titleText}</h1>
                <div className="grid grid-cols-2 gap-8 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
                    {Array.from({ length: 4 }).map((_, index) => (
                        <ProductsSkeleton key={index} />
                    ))}
                </div>
            </section>
        );
    }

    return (
        <section className="max-w-7xl mx-auto">
            <h1 className="font-bold my-5 text-3xl md:my-12 md:text-4xl">{titleText}</h1>
            {Array.isArray(products) && products.length > 0 ? (
                <div>
                    <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 md:gap-8">
                        {products.map((product) => (
                            <div key={product.id}>
                                {product.image && (
                                    <div className="mb-4 flex items-center justify-center px-5">
                                        <img
                                            src={`/public/uploads/${product.image}`}
                                            alt={product.name}
                                            className="rounded-full"
                                        />
                                    </div>
                                )}
                                <div className="text-center font-bold mb-2 text-xm md:text-xl md:mb-5">
                                    {product.name}
                                </div>
                                <div className="flex flex-wrap items-center justify-evenly gap-2 font-bold md:gap-5">
                                    <div>от {product.price} ₽</div>
                                    <button
                                        className="border border-primary-500 text-primary-500 py-2 px-4 rounded-[250px] cursor-pointer hover:bg-primary-500 hover:text-white transition-colors"
                                        onClick={() => handleAddToCart(product)}
                                    >
                                        Добавить
                                        <span> {getItemQuantity(product.id) || 0}</span>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    <Pagination
                        totalItems={totalProducts}
                        setActivePage={setActivePage}
                        activePage={activePage}
                    />
                </div>
            ) : (
                <div className="text-center text-gray-500 mt-12">
                    <h2 className="text-2xl font-bold">Нет товаров в этой категории</h2>
                    <p>Попробуйте выбрать другую категорию.</p>
                </div>
            )}
        </section>
    );
}
