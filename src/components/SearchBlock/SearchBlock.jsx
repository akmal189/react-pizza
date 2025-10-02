import { useState, useEffect } from 'react';

export default function SearchBlock() {
    const [searchValue, setSearchValue] = useState('');
    const [searchProducts, setSearchProducts] = useState([]);

    useEffect(() => {
        if (searchValue.trim() === '') {
            setSearchProducts([]);
            return;
        }
        fetch(`/api/products.php?${searchValue != '' ? `search=${searchValue}` : ''}`)
        .then(response => response.json())
        .then(data => {
            if (Array.isArray(data.products)) {
                setSearchProducts(data.products);
            } else {
                setSearchProducts([]);
            }
        }).catch(() => {
            setSearchProducts([]);
        });
    }, [searchValue]);
    return (
        <div className="relative">
            <form className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 w-6 h-6">
                    <svg enableBackground="new 0 0 32 32" id="EditableLine" version="1.1" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><circle cx="14" cy="14" fill="none" id="XMLID_42_" r="9" stroke="#000000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="2"></circle><line fill="none" id="XMLID_44_" stroke="#000000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="2" x1="27" x2="20.366" y1="27" y2="20.366"></line></svg>
                </div>
                <input type="text" className="border border-gray-400 rounded-xl py-2.5 px-5 pl-10" placeholder="Поиск..." onChange={(event) => setSearchValue(event.target.value)} value={searchValue} />
            </form>
            {searchValue && searchProducts.length > 0 && (
                <div className="absolute top-full left-0 w-full bg-white border border-gray-200 rounded-lg mt-2 p-4 max-h-60 overflow-y-auto">
                    <ul>
                        {searchProducts.map(product => (
                            <li key={product.id} className="flex items-center gap-3 py-2 hover:bg-gray-100 cursor-pointer">
                                <div className="flex items-center gap-3">
                                    <img src={`/public/uploads/${product.image}`} alt={product.name} className="w-10 h-10 rounded-full" />
                                </div>
                                {product.name}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    )
}