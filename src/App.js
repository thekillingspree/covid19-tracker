import React from 'react'
import { RecoilRoot } from 'recoil';
import Dashboard from './Components/Dashboard';
import Cases from './Components/Cases';
const App = props => {
    return (
        <RecoilRoot>
            <div className="main-container">
                <Dashboard />
                <Cases />
            </div>
        </RecoilRoot>
    )
}


export default App;