import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import Home from './pages/Home';
import NotFound from './pages/404';
import Cart from './pages/Cart';
import UserOrders from './pages/UserOrders';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import { CartProvider } from './CartContext/CartContext';

export default function App() {
    const [user, setUser] = useState('');
    const [isLoginPopupOpen, setIsLoginPopupOpen] = useState(false);
    const toggleLoginPopup = () => {
        setIsLoginPopupOpen(!isLoginPopupOpen);
    }
    const closeLoginPopup = () => setIsLoginPopupOpen(false);

    return (
        <CartProvider>
            <div className="site-wrapper max-w-[1400px]  mx-auto md:my-12 md:rounded-2xl bg-white">
                <Header user={user} setUser={setUser} isLoginPopupOpen={isLoginPopupOpen} setIsLoginPopupOpen={setIsLoginPopupOpen} toggleLoginPopup={toggleLoginPopup} />
                <main className="p-5 md:p-10">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/cart" element={<Cart user={user} />} />
                        <Route path="*" element={<NotFound />} />
                        <Route path="/orders" element={<UserOrders userId={user.id} closeLoginPopup={closeLoginPopup}/>} />
                    </Routes>
                </main>
                <Footer />
            </div>
        </CartProvider>
    )
}

