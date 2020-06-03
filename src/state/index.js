import { selector, atom } from 'recoil'
import { getCountryWiseData, getHistorical, getHistoricalCountry } from '../utils'
import { MAPPING } from '../constants'
import moment from 'moment'
// export const countryWiseStats = atom({
//     key: 'countryWiseStats',
//     default: null
// })


export const currentCategory = atom({
    key: 'currentCategory',
    default: 'Infected'
})

export const currentCountry = atom({
    key: 'currentCountry',
    default: null
})

export const filteredCountryData = selector({
    key: 'filteredCountryData',
    get: async ({get}) => {
        const category = get(currentCategory)
        const {countryWiseStats} = get(globalStats)
        const result = countryWiseStats.map(stat => ({
            country: stat.country,
            flag: stat.countryInfo.flag,
            value: stat[MAPPING[category]],
            countryInfo: stat.countryInfo,
            cases: stat.cases
        }))

        result.sort((a, b) => b.value - a.value)

        return result
    }
})

export const graphData = selector({
    key: 'graphData',
    get: async ({get}) => {
        const category = get(currentCategory)
        const country = get(currentCountry)
        let historical;
        
        if (!country)
            historical = await get(globalStats).historical
        else
            historical = await get(getHistoricalByCountry)
        
        const categoryHistorical = historical[MAPPING[category]]
        
        const data = Object.keys(categoryHistorical).map(e => ({
            name: moment(e, "M/D/YY").format("DD/MM"),
            y: categoryHistorical[e]
        }))

        return data

    }
})

export const globalStats = selector({
    key: 'globalStats',
    get: async ({get}) => {
        const countryWiseStats = await getCountryWiseData()
        const historical = await getHistorical()

        const globalStats = countryWiseStats.reduce((prev, curr) => ({
            cases: prev.cases + curr.cases,
            deaths: prev.deaths + curr.deaths,
            recovered: prev.recovered + curr.recovered,
            active: prev.active + curr.active,
            todayCases: prev.todayCases + curr.todayCases,
            todayDeaths: prev.todayDeaths + curr.todayDeaths
        }), {
            cases: 0,
            deaths: 0,
            recovered: 0,
            active: 0,
            todayCases: 0,
            todayDeaths: 0
        })

        return {globalStats, countryWiseStats, historical}
    }
})

export const getHistoricalByCountry = selector({
    key: 'getHistoricalByCountry',
    get: async({get}) => {
        const country = get(currentCountry)
        const historical = await getHistoricalCountry(country.country)

        return historical
    }
})