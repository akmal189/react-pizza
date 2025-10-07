import React, { useEffect, useState } from "react";
import AdminSidebar from '../components/AdminSidebar/AdminSidebar';

export default function AdminOrders() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // 1. Первоначальная загрузка
        fetch("/api/get_orders_admin.php")
            .then((r) => r.json())
            .then((data) => {
                if (data.success) setOrders(data.orders);
                setLoading(false);
            });
    }, []);

    const changeStatus = (id, status) => {
        fetch("/api/update_order.php", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id, status }),
        }).then(() => {
            setOrders((prev) =>
                prev.map(o => o.id === id ? { ...o, status } : o)
            );
        });
    };

    if (loading) return <div>Загрузка...</div>;

    return (
        <div>
            <h2 className="text-2xl font-semibold mb-4">Заказы</h2>
            <div className="flex items-start gap-8">
                <AdminSidebar />
                <main className="flex-1">
                    <div className="bg-white shadow rounded overflow-auto">
                        <table className="w-full text-left border-collapse text-sm">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="p-2">ID</th>
                                    <th className="p-2">Пользователь</th>
                                    <th className="p-2">Телефон</th>
                                    <th className="p-2">Адрес</th>
                                    <th className="p-2">Сумма</th>
                                    <th className="p-2">Статус</th>
                                    <th className="p-2">Дата</th>
                                    <th className="p-2">Действия</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map(o => (
                                    <React.Fragment key={o.id}>
                                        {/* строка заказа */}
                                        <tr className="border-t bg-white">
                                            <td className="p-2">{o.id}</td>
                                            <td className="p-2">{o.user_name || 'Гость'}</td>
                                            <td className="p-2">{o.phone}</td>
                                            <td className="p-2">{o.address}</td>
                                            <td className="p-2">{o.total}</td>
                                            <td className="p-2">{o.status}</td>
                                            <td className="p-2">{o.created_at}</td>
                                            <td className="p-2 space-x-2">
                                                <div className="flex flex-col gap-2">
                                                    <button
                                                        onClick={() => changeStatus(o.id, 'Принят')}
                                                        className="px-3 py-1 bg-green-500 text-white rounded cursor-pointer"
                                                    >
                                                        Принять
                                                    </button>
                                                    <button
                                                        onClick={() => changeStatus(o.id, 'Выполнен')}
                                                        className="px-3 py-1 bg-blue-600 text-white rounded cursor-pointer"
                                                    >
                                                        Выполнено
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>

                                        {/* строка с товарами */}
                                        {o.items?.length > 0 && (
                                            <tr className="bg-gray-50">
                                                <td colSpan="8" className="p-3">
                                                    <div className="space-y-2">
                                                        {o.items.map(item => (
                                                            <div
                                                                key={item.product_id}
                                                                className="flex items-center gap-4 border-b pb-2 last:border-b-0"
                                                            >
                                                                <img
                                                                    src={`/public/uploads/${item.image}`}
                                                                    alt={item.name}
                                                                    className="w-12 h-12 object-cover rounded"
                                                                />
                                                                <div className="flex-1">
                                                                    <p className="font-medium">{item.name}</p>
                                                                    <p className="text-sm text-gray-500">
                                                                        Кол-во: {item.quantity} × {item.price} сум
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </td>
                                            </tr>
                                        )}
                                    </React.Fragment>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </main>
            </div>
        </div>
    );
}
