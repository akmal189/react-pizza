import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import Home from './pages/Home';
import NotFound from './pages/404';
import Cart from './pages/Cart';
import UserOrders from './pages/UserOrders';
import Dashboard from './pages/Dashboard';
import AdminCategories from './pages/AdminCategories';
import AdminProducts from './pages/AdminProducts';
import AdminOrders from './pages/AdminOrders';
import AdminUsers from './pages/AdminUsers';
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
                        <Route path="/admin" element={<Dashboard />} />
                        <Route path="/admin/categories" element={<AdminCategories />} />
                        <Route path="/admin/products" element={<AdminProducts />} />
                        <Route path="/admin/orders" element={<AdminOrders />} />
                        <Route path="/admin/users" element={<AdminUsers />} />
                    </Routes>
                </main>
                <Footer />
            </div>
        </CartProvider>
    )
}

