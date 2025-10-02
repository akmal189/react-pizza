import {useEffect, useState} from 'react';

export default function Categories({activeCategory, onClick}) {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        fetch('/api/categories.php')
        .then(res => res.json())
        .then(data => {
            setCategories(data);
        }).catch(err => console.log(err));
    }, [])
    
    return (
        <div className="flex flex-wrap items-center justify-center gap-2.5">
            {categories.map((item, index) => (
                <button
                    key={item.id}
                    onClick={() => onClick(index, item.title)}
                    className={`py-3 px-7 font-bold rounded-[250px] transition-colors duration-300 cursor-pointer ${activeCategory === index ? 'bg-black text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-300'}`}
                >
                    {item.name}
                </button>
            ))}
        </div>
    );
}