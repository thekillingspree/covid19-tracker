export * from './apis'

export const getGeoJSON = data => {
    const geoJSON = {
        type: 'FeatureCollection',
    }

    geoJSON.features = data.map(c => ({
        type: 'Feature',
        properties: c,
        geometry: {
            type: 'Point',
            coordinates: [c.countryInfo.long, c.countryInfo.lat],
        }
    }))

    return geoJSON
}