import { red, cyan, gray } from './colors'

export * from './colors'

export const MAPPING = {
    'Infected': 'cases',
    'Recovered': 'recovered',
    'Deaths': 'deaths'
}

export const COLORS_MAPPING = {
    'Infected': red,
    'Recovered': cyan,
    'Deaths': gray
}