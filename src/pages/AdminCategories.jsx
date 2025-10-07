import React, { useEffect, useState } from "react";
import AdminSidebar from '../components/AdminSidebar/AdminSidebar'

export default function AdminCategories() {
  const [categories, setCategories] = useState([]);
  const [editing, setEditing] = useState(null);
  const [name, setName] = useState("");

  const [newName, setNewName] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("/api/get_categories.php")
      .then(r => r.json())
      .then(data => { if (data.success) setCategories(data.categories) });
  }, []);

  const startEdit = (cat) => {
    setEditing(cat.id);
    setName(cat.name);
  };

  const save = () => {
    fetch("/api/update_category.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: editing, name })
    }).then(() => {
      setCategories(prev => prev.map(c => c.id === editing ? { ...c, name } : c));
      setEditing(null);
      setName("");
    });
  };

  const addCategory = () => {
    if (!newName.trim()) return;
    fetch("/api/add_category.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: newName })
    })
      .then(r => r.json())
      .then(d => {
        if (d.success) {
          setCategories(prev => [...prev, { id: d.id, name: d.name }]);
          setNewName("");
          setShowAddForm(false);
        } else {
          setMessage(d.message || "Ошибка при добавлении категории");
        }
      });
  };

  const deleteCategory = (id) => {
    if (!window.confirm("Удалить категорию?")) return;

    fetch("/api/delete_category.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id })
    })
      .then(r => r.json())
      .then(d => {
        if (d.success) {
          setCategories(prev => prev.filter(c => c.id !== id));
        } else {
          setMessage(d.message); // если есть товары внутри
        }
      });
  };

  return (
    <div>
      <h1 className="text-4xl font-semibold mb-4">Категории</h1>
      <div className="flex items-start gap-8">
        <AdminSidebar />
        <main className="flex-1">
          <div className="bg-white shadow-lg rounded-xl p-4">

            {message && (
              <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">{message}</div>
            )}

            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="mb-4 px-4 py-2 bg-primary-500 text-white rounded cursor-pointer transition hover:bg-primary-300"
            >
              {showAddForm ? "Отмена" : "Добавить категорию"}
            </button>

            {/* Форма добавления */}
            <div
              className={`overflow-hidden transition-all duration-500 ${showAddForm ? "max-h-40 opacity-100" : "max-h-0 opacity-0"}`}
            >
              <div className="flex gap-2 mb-4">
                <input
                  value={newName}
                  onChange={e => setNewName(e.target.value)}
                  placeholder="Название категории"
                  className="border p-2 rounded flex-1"
                />
                <button
                  onClick={addCategory}
                  className="px-3 py-1 bg-green-500 text-white rounded"
                >
                  Сохранить
                </button>
              </div>
            </div>

            {/* Список категорий */}
            <ul>
              {categories.map(c => (
                <li key={c.id} className="flex justify-between items-center border-b py-2 border-gray-200">
                  <div>
                    {c.name}
                    <span className="ml-2 text-sm text-gray-500">
                      ({c.products_count})
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => startEdit(c)}
                      className="px-3 py-1 bg-primary-500 rounded text-white cursor-pointer"
                    >
                      Редактировать
                    </button>
                    <button
                      onClick={() => deleteCategory(c.id)}
                      className="px-3 py-1 bg-red-500 rounded text-white cursor-pointer"
                    >
                      Удалить
                    </button>
                  </div>
                </li>
              ))}
            </ul>

            {editing && (
              <div className="mt-4">
                <input
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="border p-2 rounded mr-2"
                />
                <button onClick={save} className="px-3 py-1 bg-green-500 text-white rounded">
                  Сохранить
                </button>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
