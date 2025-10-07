import {Link} from 'react-router-dom';
import AdminSidebar from '../components/AdminSidebar/AdminSidebar';
import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";

export default function Dashboard() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({
        yesterday: { count: 0, total: 0 },
        week: { count: 0, total: 0 },
        month: { count: 0, total: 0 },
    });
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        fetch("/api/get_orders_admin.php")
        .then((res) => res.json())
        .then((data) => {
            if (data.success) {
                setOrders(data.orders);
                calculateStats(data.orders);
                prepareChartData(data.orders);
            }
        })
        .finally(() => setLoading(false));
    }, []);

    const calculateStats = (orders) => {
        const now = new Date();
        const yesterday = new Date();
        yesterday.setDate(now.getDate() - 1);

        const weekAgo = new Date();
        weekAgo.setDate(now.getDate() - 7);

        const monthAgo = new Date();
        monthAgo.setMonth(now.getMonth() - 1);

        let statsObj = {
        yesterday: { count: 0, total: 0 },
        week: { count: 0, total: 0 },
        month: { count: 0, total: 0 },
        };

        orders.forEach((order) => {
        const createdAt = new Date(order.created_at);
        const total = parseFloat(order.total);

        // вчера
        if (
            createdAt.toDateString() === yesterday.toDateString()
        ) {
            statsObj.yesterday.count++;
            statsObj.yesterday.total += total;
        }

        // неделя
        if (createdAt >= weekAgo) {
            statsObj.week.count++;
            statsObj.week.total += total;
        }

        // месяц
        if (createdAt >= monthAgo) {
            statsObj.month.count++;
            statsObj.month.total += total;
        }
        });

        setStats(statsObj);
    };
    const prepareChartData = (orders) => {
        const monthAgo = new Date();
        monthAgo.setMonth(monthAgo.getMonth() - 1);

        // сгруппируем заказы по дате
        const grouped = {};

        orders.forEach((order) => {
        const date = new Date(order.created_at);
        if (date >= monthAgo) {
            const key = date.toISOString().split("T")[0]; // YYYY-MM-DD
            if (!grouped[key]) {
            grouped[key] = { date: key, count: 0, total: 0 };
            }
            grouped[key].count += 1;
            grouped[key].total += parseFloat(order.total);
        }
        });

        // превращаем объект в массив и сортируем
        const data = Object.values(grouped).sort(
        (a, b) => new Date(a.date) - new Date(b.date)
        );

        setChartData(data);
    };

    if (loading) {
        return <p className="text-center text-gray-500">Загрузка...</p>;
    }
    
    return(
        <>
            <h1 className="text-4xl font-bold text-black mb-6">Админка</h1>
            <div className="flex items-start flex-wrap gap-8">
                <AdminSidebar />
                <main className="flex-auto overflow-y-auto">
                    <h2 className="text-2xl font-bold mb-6">Аналитика заказов</h2>

                    {/* Карточки */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-7">
                        <div className="bg-white shadow rounded-xl p-4">
                        <h3 className="text-lg font-semibold mb-2">Вчера</h3>
                        <p className="text-gray-700">Заказов: {stats.yesterday.count}</p>
                        <p className="text-gray-700">
                            Сумма: {stats.yesterday.total.toFixed(2)} ₽
                        </p>
                        </div>

                        <div className="bg-white shadow rounded-xl p-4">
                        <h3 className="text-lg font-semibold mb-2">Последние 7 дней</h3>
                        <p className="text-gray-700">Заказов: {stats.week.count}</p>
                        <p className="text-gray-700">
                            Сумма: {stats.week.total.toFixed(2)} ₽
                        </p>
                        </div>

                        <div className="bg-white shadow rounded-xl p-4">
                        <h3 className="text-lg font-semibold mb-2">Последний месяц</h3>
                        <p className="text-gray-700">Заказов: {stats.month.count}</p>
                        <p className="text-gray-700">
                            Сумма: {stats.month.total.toFixed(2)} ₽
                        </p>
                        </div>
                    </div>

                    {/* Линейный график */}
                    <div className="bg-white shadow rounded-xl py-6 mb-7">
                        <h3 className="text-lg font-semibold mb-4">Заказы по дням (шт.)</h3>
                        <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={chartData}>
                            <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
                            <XAxis dataKey="date" />
                            <YAxis />
                            <Tooltip />
                            <Line
                            type="monotone"
                            dataKey="count"
                            stroke="#3b82f6"
                            strokeWidth={2}
                            dot={{ r: 4 }}
                            />
                        </LineChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Столбиковый график */}
                    <div className="bg-white shadow rounded-xl py-6">
                        <h3 className="text-lg font-semibold mb-4">Сумма заказов по дням (₽)</h3>
                        <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={chartData}>
                            <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
                            <XAxis dataKey="date" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="total" fill="#10b981" radius={[6, 6, 0, 0]} />
                        </BarChart>
                        </ResponsiveContainer>
                    </div>
                </main>
            </div>
        </>
    )
}