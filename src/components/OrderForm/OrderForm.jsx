import { useState, useEffect } from "react";

export default function OrderForm({ address, user, cartItems, message, setMessage }) {
    const [formData, setFormData] = useState({
        name: user.name ? user.name : "",
        phone: user.phone ? user.phone : "",
        address: address ? address : "",
        house: "",
        apartment: "",
    });

    useEffect(() => {
        setFormData((prev) => ({ ...prev, address: address || "" }));
    }, [address]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const payload = {
            user_id: user.id,
            cart: cartItems,
            form: {
                name: formData.name,
                phone: formData.phone,
                address: formData.address,
                house: formData.house,
                apartment: formData.apartment,
            },
        };

        fetch("/api/create_order.php", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        })
        .then((res) => res.json())
        .then((data) => {
            if (data.success) {
                setMessage("Заказ успешно оформлен! Ожидайте звонка оператора.");
            } else {
                setMessage("Ошибка при оформлении заказа." + data.error);
            }
        })
        .catch((err) => console.error("Ошибка запроса:", err));

    };

    return (
        <div className="w-full bg-white mt-10">
            <h2 className="text-4xl font-semibold text-gray-800 mb-6">
                Оформление заказа
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
                <div>
                    <label className="block text-gray-700 font-medium mb-1">Имя</label>
                    <input
                        type="text"
                        name="name"
                        placeholder="Введите ваше имя"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-primary-500 outline-none"
                        required
                    />
                </div>

                <div>
                    <label className="block text-gray-700 font-medium mb-1">Телефон</label>
                    <input
                        type="tel"
                        name="phone"
                        placeholder="+998 (__) ___-__-__"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-primary-500 outline-none"
                        required
                    />
                </div>

                <div>
                    <label className="block text-gray-700 font-medium mb-1">Улица</label>
                    <input
                        type="text"
                        name="address"
                        placeholder="Введите улицу"
                        value={formData.address}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-primary-500 outline-none"
                        required
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">
                            Дом
                        </label>
                        <input
                            type="text"
                            name="house"
                            placeholder="№ дома"
                            value={formData.house}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-primary-500 outline-none"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium mb-1">
                            Квартира
                        </label>
                        <input
                            type="text"
                            name="apartment"
                            placeholder="№ квартиры"
                            value={formData.apartment}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-primary-500 outline-none"
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    className="w-full bg-primary-500 hover:bg-primary-300 cursor-pointer text-white font-semibold py-3 rounded-xl transition"
                >
                    Отправить заказ
                </button>
            </form>
        </div>
    );
}