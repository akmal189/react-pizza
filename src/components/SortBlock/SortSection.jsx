import { useState } from "react"

export default function SortBlock({value, onChangeSort}) {
    const [isPopupVisible, setIsPopupVisible] = useState(false);
    const togglePopup = () => {
        setIsPopupVisible(prev => !prev);
    };
    const handleSortChange = (type) => {
        onChangeSort(type);
        setIsPopupVisible(prev => !prev);
    };
    return (
        <div className="relative">
            <div className="flex items-center gap-2">
                <span>Сортировать по:</span>
                <span onClick={togglePopup} className="text-primary-500 border-b border-dashed border-primary-500 cursor-pointer inline-block">{value.name}</span>
            </div>
            {isPopupVisible && (
                <div className="absolute top-full right-0 rounded-lg bg-white w-2xs shadow-lg p-4 flex flex-col gap-2">
                    {[
                        {name: "популярности (вверх)", sortType: "popular", direction: "asc"},
                        {name: "популярности (вниз)", sortType: "popular", direction: "desc"},
                        {name: "цене (вверх)", sortType: "price", direction: "asc"},
                        {name: "цене (вниз)", sortType: "price", direction: "desc"},
                        {name: "алфавиту (вверх)", sortType: "name", direction: "asc"},
                        {name: "алфавиту (вниз)", sortType: "name", direction: "desc"},
                    ].map((item, index) => (
                        <div
                            key={index}
                            className={`cursor-pointer ${
                                item.name === value.name
                                    ? "active text-primary-500"
                                    : "hover:text-primary-500"
                            }`}
                            onClick={() => handleSortChange(item)}
                        >
                            {item.name}
                        </div>
                    ))}
                </div>
            )}
            
        </div>
    )
}