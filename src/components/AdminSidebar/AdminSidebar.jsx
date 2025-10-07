import {NavLink} from 'react-router-dom';

export default function AdminSidebar() {
    return(
        <aside className="w-64 bg-white shadow-lg p-6 rounded-xl">
            <nav className="space-y-4">
                <NavLink to="/admin" end 
                    className={({ isActive }) =>
                    `block ${isActive ? "text-primary-500 font-semibold" : "hover:text-primary-500"}`}
                >Статистика</NavLink>
                <NavLink to="/admin/orders" 
                    className={({ isActive }) =>
                    `block ${isActive ? "text-primary-500 font-semibold" : "hover:text-primary-500"}`}
                >Заказы</NavLink>
                <NavLink to="/admin/users" 
                    className={({ isActive }) =>
                    `block ${isActive ? "text-primary-500 font-semibold" : "hover:text-primary-500"}`}
                >Пользователи</NavLink>
                <NavLink to="/admin/categories" 
                    className={({ isActive }) =>
                    `block ${isActive ? "text-primary-500 font-semibold" : "hover:text-primary-500"}`}
                >Категории</NavLink>
                <NavLink to="/admin/products" 
                    className={({ isActive }) =>
                    `block ${isActive ? "text-primary-500 font-semibold" : "hover:text-primary-500"}`}
                >Товары</NavLink>
            </nav>
        </aside>
    )
}