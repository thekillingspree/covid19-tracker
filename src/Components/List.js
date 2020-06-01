import React, {useRef, useEffect} from 'react'
import { useRecoilValue, useRecoilValueLoadable, useRecoilState } from 'recoil'
import { filteredCountryData, currentCountry } from '../state'


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

    const {state, contents} = useRecoilValueLoadable(filteredCountryData)
    const [_country, setCountry] = useRecoilState(currentCountry)
    return (
        <div className="list-container">
            {state === 'loading' && <p>Loading...</p>}
            {state === 'hasValue' && contents.map(country => {

                return (
                    <ListItem  
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

export default List
