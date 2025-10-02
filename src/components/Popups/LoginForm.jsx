import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import RegistrationForm from './RegistrationForm';

export default function LoginForm({ onClose, onSubmit, user, setUser }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [isRegFormPopupOpen, setIsRegFormPopupOpen] = useState('');

    useEffect(() => {
        const savedUser = localStorage.getItem("user");
        if (savedUser) {
        setUser(JSON.parse(savedUser));
        }
    }, []);

    const handleLogout = (e) => {
        e.preventDefault();
        setUser('');
        localStorage.removeItem("user");
    };

    const toggleRegPopup = (e) => {
        e.preventDefault();
        setIsRegFormPopupOpen(!isRegFormPopupOpen);
    }
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');

        try {
            const res = await fetch("/api/login.php", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });
            const data = await res.json();
            if (data.success) {
                setMessage("Добро пожаловать, " + data.user.name);
                localStorage.setItem("user", JSON.stringify(data.user)); // сохраним сессию
                setUser(data.user);
            } else {
                setMessage(data.message);
            }
        } catch (err) {
            setMessage("Ошибка соединения");
        }
        setEmail('');
        setPassword('');
    }

    return (
        <div className="popup-overlay fixed w-full h-full bg-[rgba(0,0,0,0.5)] flex justify-center items-center z-[1000] left-0 top-0 overflow-auto">
            <div className="w-full inset-0 bg-opacity-50 flex items-center justify-center z-50 m-auto">
                {isRegFormPopupOpen ? 
                    <RegistrationForm onHide={toggleRegPopup} user={user} setUser={setUser} />
                :
                    <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
                        <button
                            className="absolute top-4 right-4 text-white flex items-center justify-center bg-primary-500 w-10 h-10 rounded-full cursor-pointer hover:bg-primary-300"
                            onClick={onClose}
                        >X</button>
                        <h2 className="text-2xl font-bold mb-4">
                            {user ? `Добро пожаловать, ${user.name}` : 'Вход в аккаунт'}
                            
                        </h2>
                        {message && <div className="mb-4 text-red-500">{message}</div>}
                        {!user ? 
                            <div>
                                <form onSubmit={handleSubmit}>
                                    <div className="mb-4">
                                        <label className="block text-gray-700 mb-2" htmlFor="email">Email</label>
                                        <input
                                            type="email"
                                            id="email"
                                            className="w-full px-3 py-2 border border-gray-300 rounded"
                                            value={email}
                                            name="email"
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className="mb-6">
                                        <label className="block text-gray-700 mb-2" htmlFor="password">Пароль</label>
                                        <input type="password"
                                            id="password"
                                            className="w-full px-3 py-2 border border-gray-300 rounded"
                                            value={password}
                                            name="password"
                                            onChange={(e) => setPassword(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        className="w-full cursor-pointer bg-primary-500 text-white py-2 rounded hover:bg-primary-600 transition-colors"
                                    >
                                        Войти
                                    </button>
                                </form>
                                
                                <p className="mt-5">
                                    <a href="#" className="text-primary-500 hover:underline" onClick={toggleRegPopup}>Регистрация</a>
                                </p>

                            </div>
                        :
                            <div className="btns flex gap-5 mt-5">
                                <div className="btn"><Link to="/orders" className="py-3 px-10 inline-block text-white bg-primary-500 rounded-xl hover:bg-primary-300">Мои заказы</Link></div>
                                <div className="btn"><a href="#" className="py-3 px-10 inline-block text-white bg-primary-500 rounded-xl hover:bg-primary-300" onClick={handleLogout}>Выйти</a></div>
                            </div>
                        }
                    </div>
                }
            </div>
        </div>
    );
}