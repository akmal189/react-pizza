import { useState } from 'react';
import Categories from '../components/Categories/CategoriesSection';
import SortSection from '../components/SortBlock/SortSection';
import ProductList from '../components/Products/ProductsSection';
import AboutBlock from '../components/AboutBlock/AboutBlock';
import MainSlider from '../components/MainSlider/MainSlider';

export default function Home() {
    const [activeCategory, setActiveCategory] = useState(0);
    const [titleText, setTitleText] = useState('Все пиццы');
    const [sortType, setSortType] = useState({name: "популярности (вверх)", sortType: "popular", direction: "asc"});
    const onChangeSort = (type) => {
        setSortType(type);
    };
    const handleCategoryClick = (index, title) => {
        setActiveCategory(index);
        setTitleText(title)
    };

    return (
        <>
            <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-5">
                <MainSlider />
                <Categories activeCategory={activeCategory} onClick={handleCategoryClick} />
                <SortSection value={sortType} onChangeSort={(i) => onChangeSort(i)} />
            </div>
            <ProductList titleText={titleText} activeCategory={activeCategory} sortType={sortType} />
            <div className="max-w-7xl mx-auto">
                <AboutBlock />
            </div>
        </>
    );
}