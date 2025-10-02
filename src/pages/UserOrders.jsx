import { useEffect, useState } from "react";

export default function UserOrders({ userId, closeLoginPopup }) {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        closeLoginPopup();
    }, []);

    useEffect(() => {
        if (!userId) return;
        
        fetch(`/api/get_orders.php?user_id=${userId}`)
            .then((res) => res.json())
            .then((data) => {
                if (data.success) {
                    setOrders(data.orders);
                }
            })
            .finally(() => setLoading(false));
    }, [userId]);

    if (loading) {
        return <div className="text-center py-6">Загрузка заказов...</div>;
    }

    if (orders.length === 0) {
        return <div className="text-center py-6 text-gray-500">У вас пока нет заказов</div>;
    }

    return (
        <div className="max-w-3xl mx-auto space-y-6">
            {orders.map((order) => (
                <div
                    key={order.id}
                    className="bg-white rounded-xl shadow-md p-6 border border-gray-200"
                >
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg font-semibold">
                            Заказ #{order.id}
                        </h2>
                        <span
                            className={`px-3 py-1 rounded-full text-sm ${order.status === "completed"
                                    ? "bg-green-100 text-green-700"
                                    : order.status === "pending"
                                        ? "bg-yellow-100 text-yellow-700"
                                        : "bg-gray-200 text-gray-600"
                                }`}
                        >
                            {order.status}
                        </span>
                    </div>
                    <p className="text-sm text-gray-500 mb-2">
                        Дата: {new Date(order.created_at).toLocaleDateString()}
                    </p>

                    <div className="divide-y divide-gray-200">
                        {order.items.map((item, idx) => (
                            <div key={idx} className="flex items-center py-3">
                                <img
                                    src={`/public/uploads/${item.image}`}
                                    alt={item.name}
                                    className="w-14 h-14 rounded-md object-cover mr-4"
                                />
                                <div className="flex-1">
                                    <p className="font-medium">{item.name}</p>
                                    <p className="text-sm text-gray-500">
                                        Кол-во: {item.quantity} × {item.price}₽
                                    </p>
                                </div>
                                <p className="font-semibold">{item.quantity * item.price}₽</p>
                            </div>
                        ))}
                    </div>

                    <div className="text-right mt-4 font-bold text-lg">
                        Итого: {order.total}₽
                    </div>
                </div>
            ))}
        </div>
    );
}
