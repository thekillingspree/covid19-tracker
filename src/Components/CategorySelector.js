import React from 'react'
import { currentCategory } from '../state';
import { useRecoilState } from 'recoil';

const Category = ({category, onClick, active}) => {
    return (
        <div 
        onClick={onClick}
        className={`category-item ${active && "active"}`}>
            {category}
        </div>
    )
}

const CategorySelector = props => {

    const [category, setCategory] = useRecoilState(currentCategory)
    return (
        <div className="categories">
            {['Infected', 'Recovered', 'Deaths'].map((c, i)=> (
                <Category 
                    key={i}
                    category={c}
                    onClick={() => setCategory(c)}
                    active={c === category}
                />
            ))}
        </div>
    )
}

export default CategorySelector
