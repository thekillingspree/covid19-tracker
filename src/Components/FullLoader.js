import React from 'react'
import MoonLoader from 'react-spinners/MoonLoader'
import { accetYellow } from '../constants'


const FullLoader = () => {
    return (
        <div className="full-loader">
            <MoonLoader 
                size={100}
                color={accetYellow}
            />
        </div>
    )
}

export default FullLoader
