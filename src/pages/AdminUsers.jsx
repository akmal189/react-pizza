import React, { useEffect, useState } from "react";
import AdminSidebar from '../components/AdminSidebar/AdminSidebar';

export default function AdminUsers() {
    const [users, setUsers] = useState([]);
    useEffect(() => {
        fetch("/api/get_users.php")
            .then(r => r.json())
            .then(data => {
                if (data.success) setUsers(data.users);
            });
    }, []);

    return (
        <div>
            <h2 className="text-2xl font-semibold mb-4">Пользователи</h2>
            <div className="flex items-start gap-8">
                <AdminSidebar />
                <main className="flex-1">
                    <div className="bg-white shadow rounded">
                        <table className="w-full">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="p-3">ID</th>
                                    <th className="p-3">Имя</th>
                                    <th className="p-3">Телефон</th>
                                    <th className="p-3">Email</th>
                                    <th className="p-3">Создан</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map(u => (
                                    <tr key={u.id} className="border-t">
                                        <td className="p-3">{u.id}</td>
                                        <td className="p-3">{u.name}</td>
                                        <td className="p-3">{u.phone}</td>
                                        <td className="p-3">{u.email}</td>
                                        <td className="p-3">{u.created_at}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </main>
            </div>
        </div>
    );
}
