import { useState, useEffect  } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/img/pizza-logo.svg';
import SearchBlock from '../SearchBlock/SearchBlock';
import LoginForm from '../Popups/LoginForm';
import { useCart } from "../../CartContext/CartContext";

export default function Header({ isLoginPopupOpen, setIsLoginPopupOpen, toggleLoginPopup, user, setUser }) {
    const { getTotalPrice, getTotalQuantity } = useCart();
    const totalPrice = getTotalPrice();
    const totalQuantity = getTotalQuantity();

    useEffect(() => {
        const savedUser = localStorage.getItem("user");
        if (savedUser) {
            setUser(JSON.parse(savedUser));
        }
    }, []);

    return (
        <header className="site-header px-5 border-b border-gray-200">
            <div className="max-w-7xl mx-auto py-10 flex flex-wrap items-center justify-between gap-5">
                <div className="flex items-center gap-3.5">
                    <div>
                        <Link to="/">
                            <img src={logo} alt="logo" className="w-9" />
                        </Link>
                    </div>
                    <div>
                        <Link to="/" className="text-2xl font-bold">FastFood Shop</Link>
                        <p className="text-gray-500">самая вкусная пицца во вселенной!</p>
                    </div>
                </div>
                <SearchBlock />
                <div className="login-block">
                    <div className="login-block__btn w-11 h-11 cursor-pointer rounded-full bg-primary-500" onClick={toggleLoginPopup}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" ><path fill="#fff" d="M135.832 140.848h-70.9c-2.9 0-5.6-1.6-7.4-4.5-1.4-2.3-1.4-5.7 0-8.6l4-8.2c2.8-5.6 9.7-9.1 14.9-9.5 1.7-.1 5.1-.8 8.5-1.6 2.5-.6 3.9-1 4.7-1.3-.2-.7-.6-1.5-1.1-2.2-6-4.7-9.6-12.6-9.6-21.1 0-14 9.6-25.3 21.5-25.3s21.5 11.4 21.5 25.3c0 8.5-3.6 16.4-9.6 21.1-.5.7-.9 1.4-1.1 2.1.8.3 2.2.7 4.6 1.3 3 .7 6.6 1.3 8.4 1.5 5.3.5 12.1 3.8 14.9 9.4l3.9 7.9c1.5 3 1.5 6.8 0 9.1-1.6 2.9-4.4 4.6-7.2 4.6zm-35.4-78.2c-9.7 0-17.5 9.6-17.5 21.3 0 7.4 3.1 14.1 8.2 18.1.1.1.3.2.4.4 1.4 1.8 2.2 3.8 2.2 5.9 0 .6-.2 1.2-.7 1.6-.4.3-1.4 1.2-7.2 2.6-2.7.6-6.8 1.4-9.1 1.6-4.1.4-9.6 3.2-11.6 7.3l-3.9 8.2c-.8 1.7-.9 3.7-.2 4.8.8 1.3 2.3 2.6 4 2.6h70.9c1.7 0 3.2-1.3 4-2.6.6-1 .7-3.4-.2-5.2l-3.9-7.9c-2-4-7.5-6.8-11.6-7.2-2-.2-5.8-.8-9-1.6-5.8-1.4-6.8-2.3-7.2-2.5-.4-.4-.7-1-.7-1.6 0-2.1.8-4.1 2.2-5.9.1-.1.2-.3.4-.4 5.1-3.9 8.2-10.7 8.2-18-.2-11.9-8-21.5-17.7-21.5z"/></svg>
                    </div>
                </div>
                {isLoginPopupOpen && <LoginForm onClose={toggleLoginPopup} user={user} setUser={setUser} />}
                <Link to="/cart" className="flex items-center gap-5 bg-primary-500 rounded-4xl px-5 py-2.5 text-white text-base">
                    <div>{totalPrice.toLocaleString('ru-RU')} ₽</div>
                    <div>|</div>
                    <div className="flex items-center">
                        <div className="mr-2">
                            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.33333 16.3333C7.06971 16.3333 7.66667 15.7364 7.66667 15C7.66667 14.2636 7.06971 13.6667 6.33333 13.6667C5.59695 13.6667 5 14.2636 5 15C5 15.7364 5.59695 16.3333 6.33333 16.3333Z" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"></path><path d="M14.3333 16.3333C15.0697 16.3333 15.6667 15.7364 15.6667 15C15.6667 14.2636 15.0697 13.6667 14.3333 13.6667C13.597 13.6667 13 14.2636 13 15C13 15.7364 13.597 16.3333 14.3333 16.3333Z" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"></path><path d="M4.78002 4.99999H16.3334L15.2134 10.5933C15.1524 10.9003 14.9854 11.176 14.7417 11.3722C14.4979 11.5684 14.1929 11.6727 13.88 11.6667H6.83335C6.50781 11.6694 6.1925 11.553 5.94689 11.3393C5.70128 11.1256 5.54233 10.8295 5.50002 10.5067L4.48669 2.82666C4.44466 2.50615 4.28764 2.21182 4.04482 1.99844C3.80201 1.78505 3.48994 1.66715 3.16669 1.66666H1.66669" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                        </div>
                        <span>{totalQuantity}</span>
                    </div>
                </Link>
            </div>
        </header>
    )
}