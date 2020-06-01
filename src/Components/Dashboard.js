import React, { useState, useEffect } from 'react'
import ReactMapGL, { Popup, FlyToInterpolator, Source, Layer } from 'react-map-gl'
import '../styles/map.scss'
import FullLoader from './FullLoader'
import CircularMarkers from './CircularMarkers'
import { useRecoilValueLoadable, useRecoilValue } from 'recoil'
import { globalStats, currentCountry } from '../state'
import GlobalStats from './GlobalStats'

import {getGeoJSON} from '../utils'
import { red } from '../constants'

const Dashboard = () => {

    const [viewport, setViewport] = useState({
       zoom: 0
    })

    const country = useRecoilValue(currentCountry)
    const [popup, setPopup] = useState(null)
    const dataLoadable = useRecoilValueLoadable(globalStats)

    useEffect(() => {
        if (country) {
            setPopup(country)
            setViewport({
                zoom: 3, 
                latitude: country.countryInfo.lat,
                longitude: country.countryInfo.long,
                transitionInterpolator: new FlyToInterpolator({speed: 1}),
                transitionDuration: 'auto'
            })
        }
    }, [country])

    const CountryPopup = props => {

        console.log(props)
        return popup && (
            <Popup 
                tipsSize={5}
                anchor={"bottom-left"}
                longitude={popup.countryInfo.long}
                latitude={popup.countryInfo.lat}
                closeOnClick
                onClose={() => setPopup(null)}
            >
                <div className="pop-container">
                    <span className="flag">
                        <img src={popup.countryInfo.flag} alt={popup.country}/>
                        {popup.country}
                    </span>
                    <div className="count">
                        <h2>{new Intl.NumberFormat().format(popup.cases)}</h2>
                        <h3>Cases</h3>
                    </div>
                </div>
            </Popup>
        )
    }

    return (
        <div className="map">
            {dataLoadable.state === 'hasValue' && <GlobalStats stats={dataLoadable.contents.globalStats}/>}
            {dataLoadable.state === 'hasValue' && <ReactMapGL 
                {...viewport}
                width="100%"
                height="100%"
                interactiveLayerIds={['countries']}
                mapStyle={"mapbox://styles/thekillingspree/ckaksx2kt0in71io5lm6xg42q?optimize=true"}
                mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_KEY}
                onClick={(obj) => {
                    if (obj.features.length !== 0) {
                        console.log(obj.features[0].properties)
                        let c = obj.features[0].properties
                        setPopup({...c, countryInfo: JSON.parse(c.countryInfo)})
                    }
                }}
                onViewportChange={newViewPort => setViewport(newViewPort)}
            >
                <Source type="geojson" data={getGeoJSON(dataLoadable.contents.countryWiseStats)}>
                    <Layer
                        id="countries"
                        type="circle"
                        source="a"
                        paint={{
                        'circle-radius': [
                            "+",
                            ["/",
                            ["*",
                            ['sqrt', ['/', ['number', ['get', 'cases']], 10000000]],
                            200],
                            3],
                            3
                        ],
                        'circle-color': red,
                        "circle-opacity": 0.6
                        }} />
                </Source>
                {/* <CircularMarkers 
                onClick={country => setPopup(country)}
                data={dataLoadable.contents.countryWiseStats}/> */}
                 <CountryPopup />
            </ReactMapGL>}
            {dataLoadable.state === 'loading' && <FullLoader />}
        </div>
    )
}

export default Dashboard
