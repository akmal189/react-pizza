import React, {useState} from 'react';
import { useCart } from '../CartContext/CartContext';
import DeliveryBlock from '../components/DeliveryBlock/DeliveryBlock';
import OrderForm from '../components/OrderForm/OrderForm';
import { Link } from 'react-router-dom';

export default function Cart({ user }) {
    const {
        cartItems,
        loading,
        addToCart,
        removeFromCart,
        removeItemCompletely,
        getTotalPrice,
        getTotalQuantity
    } = useCart();

    const [address, setAddress] = useState("Определяем адрес...");
    const [message, setMessage] = useState(null);

    if (loading) {
        return (
            <div className="text-center py-12">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
                <p className="mt-4 text-gray-600">Загрузка корзины...</p>
            </div>
        );
    }

    if (cartItems.length === 0) {
        return (
            <div className="text-center py-12">
                <h2 className="text-3xl font-bold mb-4">Корзина пуста</h2>
                <p className="text-gray-600 mb-8">
                    Добавьте товары из каталога, чтобы начать покупки
                </p>
                <Link
                    to="/"
                    className="inline-block bg-primary-500 text-white px-8 py-3 rounded-full hover:bg-primary-600 transition-colors"
                >
                    Перейти в каталог
                </Link>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto">
            <h1 className="text-4xl font-bold mb-8">Корзина</h1>
            {message && (
                <div className="mb-4 p-4 rounded-lg text-center text-white font-medium bg-green-500">
                    {message}
                </div>
            )}
            {!message && (
                <>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Список товаров */}
                        <div className="lg:col-span-2 space-y-4">
                            {cartItems.map((item) => (
                                <div
                                    key={item.product_id}
                                    className="flex flex-col sm:flex-row sm:items-center gap-4 p-4 border border-gray-200 rounded-lg"
                                >
                                    {/* Изображение */}
                                    {item.image && (
                                        <img
                                            src={`/public/uploads/${item.image}`}
                                            alt={item.name}
                                            className="w-24 sm:w-24 sm:h-auto lg:h-40 object-contain rounded-lg"
                                        />
                                    )}

                                    {/* Информация о товаре */}
                                    <div className="flex-1">
                                        <h3 className="font-bold text-lg mb-2 sm:mb-2">{item.name}</h3>
                                        <p className="text-gray-600">{item.price} ₽</p>
                                    </div>

                                    {/* Управление количеством */}
                                    <div className="flex items-center gap-3 sm:ml-auto">
                                        <button
                                            onClick={() => removeFromCart(item.product_id)}
                                            className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded hover:bg-gray-100"
                                        >
                                            −
                                        </button>
                                        <span className="font-bold min-w-[2rem] text-center">
                                            {item.quantity}
                                        </span>
                                        <button
                                            onClick={() =>
                                                addToCart({
                                                    id: item.product_id,
                                                    name: item.name,
                                                    price: item.price,
                                                    image: item.image
                                                })
                                            }
                                            className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded hover:bg-gray-100"
                                        >
                                            +
                                        </button>
                                    </div>

                                    {/* Сумма за товар */}
                                    <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-4">
                                        <div className="font-bold text-lg min-w-[100px] lg:text-right">
                                            {(item.price * item.quantity).toLocaleString('ru-RU')} ₽
                                        </div>

                                        {/* Удалить товар */}
                                        <button
                                            onClick={() => removeItemCompletely(item.product_id)}
                                            className="text-red-500 hover:text-red-700 p-2"
                                            title="Удалить товар"
                                        >
                                            <svg
                                                width="20"
                                                height="20"
                                                viewBox="0 0 20 20"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    d="M2.5 5H4.16667H17.5"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                                <path
                                                    d="M6.66699 5V3.33333C6.66699 2.89131 6.84259 2.46738 7.15515 2.15482C7.46771 1.84226 7.89163 1.66667 8.33366 1.66667H11.667C12.109 1.66667 12.5329 1.84226 12.8455 2.15482C13.1581 2.46738 13.3337 2.89131 13.3337 3.33333V5M15.8337 5V16.6667C15.8337 17.1087 15.6581 17.5326 15.3455 17.8452C15.0329 18.1577 14.609 18.3333 14.167 18.3333H5.83366C5.39163 18.3333 4.96771 18.1577 4.65515 17.8452C4.34259 17.5326 4.16699 17.1087 4.16699 16.6667V5H15.8337Z"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Итоговая информация */}
                        <div className="lg:col-span-1">
                            <div className="border border-gray-200 rounded-lg p-6 sticky top-4">
                                <h2 className="text-2xl font-bold mb-6">Итого</h2>

                                <div className="space-y-3 mb-6">
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Товаров:</span>
                                        <span className="font-bold">{getTotalQuantity()} шт.</span>
                                    </div>
                                    <div className="flex justify-between text-xl">
                                        <span className="font-bold">Сумма:</span>
                                        <span className="font-bold">
                                            {getTotalPrice().toLocaleString('ru-RU')} ₽
                                        </span>
                                    </div>
                                </div>

                                <button className="w-full bg-primary-500 text-white py-3 rounded-full font-bold hover:bg-primary-600 transition-colors mb-3 hover:bg-primary-300 cursor-pointer" 
                                    onClick={() => {
                                        const el = document.getElementById("deliveryBlock");
                                        if (el) {
                                        el.scrollIntoView({ behavior: "smooth" });
                                        }
                                    }} 
                                >
                                    Оформить заказ
                                </button>

                                <Link
                                    to="/"
                                    className="block w-full text-center border border-primary-500 text-primary-500 py-3 rounded-full font-bold hover:bg-primary-50 transition hover:bg-primary-500 hover:text-white"
                                >
                                    Продолжить покупки
                                </Link>
                            </div>
                        </div>
                    </div>
                    <DeliveryBlock address={address} setAddress={setAddress} />
                    <OrderForm address={address} user={user} cartItems={cartItems} message={message} setMessage={setMessage} />
                </>
            )}
        </div>
    );
}