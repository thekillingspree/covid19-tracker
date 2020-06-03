import React from 'react'
import '../styles/cases.scss'
import CategorySelector from './CategorySelector'
import List from './List'
import Graph from './Graph'

const Cases = () => {


    return (
        <div className="cases">
            <h2>Cases Info</h2>
            <CategorySelector
            />
            <List />
            <Graph />
        </div>
    )
}

export default Cases
