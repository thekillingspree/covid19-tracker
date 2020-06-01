import React from 'react'
import '../styles/cases.scss'
import CategorySelector from './CategorySelector'
import { currentCategory } from '../state'
import { useRecoilState } from 'recoil'
import List from './List'
import Graph from './Graph'

const Cases = () => {

    const [category, setCategory] = useRecoilState(currentCategory)

    return (
        <div className="cases">
            <h2>Cases Info</h2>
            <CategorySelector
            active={category}
            onClick={(c) => setCategory(c)}
            />
            <List />
            <Graph />
        </div>
    )
}

export default Cases
