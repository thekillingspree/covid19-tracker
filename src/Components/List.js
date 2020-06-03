import React, {useRef, useEffect} from 'react'
import { useRecoilValueLoadable, useRecoilState } from 'recoil'
import { filteredCountryData, currentCountry } from '../state'
import MoonLoader from 'react-spinners/MoonLoader'
import { accetYellow } from '../constants'

const ListItem = ({country, active, onClick}) => {
    const ref = useRef(null)
    
    useEffect(() => {
        if (active) {
            ref.current.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            })
        }
    })

    return (
        <span ref={ref} onClick={onClick} className={active && 'active-country'}>
            <img src={country.flag} alt={country.country}/>
            <p className="list-name">{country.country}</p>
            <p className="list-value">{country.value}</p>
        </span>
    )
}


const List = () => {

    const data = useRecoilValueLoadable(filteredCountryData)
    const [_country, setCountry] = useRecoilState(currentCountry)

    switch(data.state) {
        case 'loading':
            return (
                <div className="list-container">
                 <div 
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <MoonLoader 
                        size={30}
                        color={accetYellow}
                        />
                    </div>
                </div>
            )

        case 'hasValue':
            return (
                <div className="list-container">
                    {data.contents.map((country, i) => {

                        return (
                            <ListItem  
                            key={i}
                            active={_country && _country.country === country.country}
                            onClick={() => {
                                if (_country && _country.country === country.country)
                                    setCountry(null)
                                else
                                    setCountry(country)
                            }}
                            country={country}/>
                    )})}
                </div>
            )
    }
}

export default List
