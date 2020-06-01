import axios from 'axios'


export const getCountryWiseData = async () => {
    try {
        const {data} = await axios.get('https://corona.lmao.ninja/v2/countries')
        
        return data
    } catch (error) {
        console.log(error)
    }
}

export const getHistorical = async () => {
    try {
        const {data} = await axios.get('https://corona.lmao.ninja/v2/historical/all')
        
        return data
    } catch (error) {
        console.log(error)
    }
}

export const getHistoricalCountry = async country => {
    try {
        const {data} = await axios.get(`https://corona.lmao.ninja/v2/historical/${country}?lastdays=30`)
        
        if (data.timeline) 
            return data.timeline
        throw new Error('Cannot Find Historical Data')
    } catch (error) {
        console.log(error)
    }
}