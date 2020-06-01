import React, {memo} from 'react'
import { Marker } from 'react-map-gl'

const CircularMarker = memo(props => {

        const {data, onClick} = props;
        console.log('re rendered')
        return data.map(country => {
            const size = (500 * Math.sqrt(country.cases/10000000)) / 3 + 4
            return (
            <Marker key={country.country} 
                latitude={country.countryInfo.lat}
                longitude={country.countryInfo.long}
            >
                <div 
                onClick={() => onClick(country)}
                className="circle-marker"
                style={{
                    width: size,
                    height: size,
                    transform: `translate(-${size/2}px, -${size/2}px)`
                }}
                ></div>
            </Marker>
        )});
});

export default CircularMarker
