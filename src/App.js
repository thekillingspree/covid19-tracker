import React from 'react'
import { RecoilRoot } from 'recoil';
import Dashboard from './Components/Dashboard';
import Sidebar from './Components/Sidebar';
import Cases from './Components/Cases';
const App = props => {
    return (
        <RecoilRoot>
            <div className="main-container">
                <Sidebar />
                <Dashboard />
                <Cases />
            </div>
        </RecoilRoot>
    )
}


export default App;