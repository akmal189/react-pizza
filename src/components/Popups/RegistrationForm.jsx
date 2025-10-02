import { useState } from 'react';

export default function RegistrationForm({onHide, user, setUser}) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [message, setMessage] = useState('');
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');

        try {
            const res = await fetch("/api/register.php", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, password, phone, address }),
            });
            
            const data = await res.json();
            console.log(data)
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
        <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
            <button
                className="absolute top-4 right-4 text-white flex items-center justify-center bg-primary-500 w-10 h-10 rounded-full cursor-pointer hover:bg-primary-300"
                onClick={onHide}
            >X</button>
            <h2 className="text-2xl font-bold mb-4">Регистрация</h2>
            {message && <div className="mb-4 text-red-500">{message}</div>}
            {!user &&
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
                    <div className="mb-6">
                        <label className="block text-gray-700 mb-2" htmlFor="name">Ваше имя</label>
                        <input type="text"
                            id="name"
                            className="w-full px-3 py-2 border border-gray-300 rounded"
                            value={name}
                            name="name"
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 mb-2" htmlFor="address">Адрес</label>
                        <input type="text"
                            id="address"
                            className="w-full px-3 py-2 border border-gray-300 rounded"
                            value={address}
                            name="address"
                            onChange={(e) => setAddress(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 mb-2" htmlFor="phone">Телефон</label>
                        <input type="text"
                            id="phone"
                            className="w-full px-3 py-2 border border-gray-300 rounded"
                            value={phone}
                            name="phone"
                            onChange={(e) => setPhone(e.target.value)}
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full cursor-pointer bg-primary-500 text-white py-2 rounded hover:bg-primary-600 transition-colors"
                    >
                        Зарегистрироваться
                    </button>
                </form>
            }
        </div>
    )
}