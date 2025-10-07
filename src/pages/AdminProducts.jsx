import React, { useEffect, useState } from "react";
import AdminSidebar from '../components/AdminSidebar/AdminSidebar';

export default function AdminProducts() {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [editing, setEditing] = useState(null);
    const [showAddForm, setShowAddForm] = useState(false);
    const [form, setForm] = useState({ name: "", price: 0, category_id: 0, image: "", description: "" });

    useEffect(() => {
        fetchProducts();
        fetch("/api/get_categories.php").then(r => r.json()).then(d => { if(d.success) setCategories(d.categories) });
    }, []);

    const fetchProducts = () => {
        fetch("/api/get_products.php").then(r => r.json()).then(d => { if(d.success) setProducts(d.products) });
    };

    const startEdit = p => {
        setEditing(p.id);
        setForm({ name: p.name, price: p.price, category_id: p.category_id, image: p.image || "", description: p.description || "" });
    };

    const save = () => {
        fetch("/api/update_product.php", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id: editing, ...form })
        }).then(() => {
            setProducts(prev => prev.map(it => it.id === editing ? { ...it, ...form, category_name: categories.find(c => c.id == form.category_id)?.name } : it));
            setEditing(null);
        });
    };

    const add = () => {
        fetch("/api/add_product.php", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form)
        }).then(r => r.json()).then(d => {
            if(d.success){
                setProducts(prev => [{ id: d.id, category_name: categories.find(c => c.id == form.category_id)?.name, ...form }, ...prev]);
                setForm({ name: "", price: 0, category_id: 0, image: "", description: "" });
                setShowAddForm(false);
            }
        });
    };

    const remove = (id) => {
        if(!window.confirm("Удалить этот товар?")) return;
        fetch("/api/delete_product.php", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id })
        }).then(r => r.json()).then(d => {
            if(d.success){
                setProducts(prev => prev.filter(p => p.id !== id));
            }
        });
    };

    return (
        <div>
            <h1 className="text-4xl font-semibold mb-4">Товары</h1>
            <div className="flex items-start gap-8">
                <AdminSidebar />
                <main className="flex-1">

                    {/* Кнопка для раскрытия формы */}
                    <button 
                        onClick={() => setShowAddForm(prev => !prev)} 
                        className="mb-4 px-4 py-2 bg-primary-500 text-white rounded transition cursor-pointer hover:bg-primary-300"
                    >
                        {showAddForm ? "Закрыть форму" : "Добавить товар"}
                    </button>

                    {/* Форма добавления нового товара */}
                    {showAddForm && (
                        <div className="mb-6 bg-white p-4 rounded shadow max-w-md">
                            <h3 className="font-semibold mb-2">Добавить товар</h3>
                            <input className="w-full border p-2 mb-2" placeholder="Название" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
                            <input className="w-full border p-2 mb-2" placeholder="Цена" value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} />
                            <select className="w-full border p-2 mb-2" value={form.category_id} onChange={e => setForm({ ...form, category_id: e.target.value })}>
                                <option value="0">-- категория --</option>
                                {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                            </select>
                            <input className="w-full border p-2 mb-2" placeholder="URL изображения" value={form.image} onChange={e => setForm({ ...form, image: e.target.value })} />
                            <textarea className="w-full border p-2 mb-2" placeholder="Описание" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />
                            <button onClick={add} className="px-4 py-2 bg-blue-600 text-white rounded">Добавить</button>
                        </div>
                    )}

                    {/* Таблица товаров */}
                    <div className="bg-white shadow rounded overflow-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="p-3">ID</th>
                                    <th className="p-3">Изображение</th>
                                    <th className="p-3">Название</th>
                                    <th className="p-3">Категория</th>
                                    <th className="p-3">Цена</th>
                                    <th className="p-3">Действия</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map(p => (
                                    <tr key={p.id} className="border-t">
                                        <td className="p-3">{p.id}</td>
                                        <td className="p-3">
                                            {p.image ? (
                                                <img src={`/public/uploads/${p.image}`} alt={p.name} className="w-16 h-16 object-cover rounded" />
                                            ) : (
                                                <span className="text-gray-400 italic">нет фото</span>
                                            )}
                                        </td>
                                        <td className="p-3">{p.name}</td>
                                        <td className="p-3">{p.category_name}</td>
                                        <td className="p-3">{p.price}</td>
                                        <td className="p-3 flex gap-2 justify-center">
                                            <button onClick={() => startEdit(p)} className="px-3 py-1 cursor-pointer bg-primary-500 rounded text-white hover:bg-primary-300">Редактировать</button>
                                            <button onClick={() => remove(p.id)} className="px-3 py-1 cursor-pointer bg-red-500 rounded text-white hover:bg-red-400">Удалить</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Форма редактирования */}
                    {editing && (
                        <div className="mt-6 bg-white p-4 rounded shadow max-w-md">
                            <h3 className="font-semibold mb-2">Редактировать товар #{editing}</h3>
                            <input className="w-full border p-2 mb-2" placeholder="Название" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
                            <input className="w-full border p-2 mb-2" placeholder="Цена" value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} />
                            <select className="w-full border p-2 mb-2" value={form.category_id} onChange={e => setForm({ ...form, category_id: e.target.value })}>
                                <option value="0">-- категория --</option>
                                {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                            </select>
                            <input className="w-full border p-2 mb-2" placeholder="URL изображения" value={form.image} onChange={e => setForm({ ...form, image: e.target.value })} />
                            <textarea className="w-full border p-2 mb-2" placeholder="Описание" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />
                            <div className="flex gap-2">
                                <button onClick={save} className="px-4 py-2 bg-green-600 text-white rounded">Сохранить</button>
                                <button onClick={() => setEditing(null)} className="px-4 py-2 bg-gray-300 rounded">Отмена</button>
                            </div>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
}
