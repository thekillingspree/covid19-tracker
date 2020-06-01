import React from 'react'

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

    const {active, onClick} = props;

    return (
        <div className="categories">
            {['Infected', 'Recovered', 'Deaths'].map((c, i)=> (
                <Category 
                    category={c}
                    onClick={() => onClick(c)}
                    active={c === active}
                />
            ))}
        </div>
    )
}

export default CategorySelector
