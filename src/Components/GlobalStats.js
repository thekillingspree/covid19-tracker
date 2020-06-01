import React from 'react'
import { FaExclamation } from 'react-icons/fa';
import { TiPlus } from 'react-icons/ti';
import { GiBiohazard, GiDeathSkull } from 'react-icons/gi';
const GlobalStats = props => {

    const Stat = props => {
        return ( 
            <div className="stats">
                <div 
                className={`box ${props.color}`}>
                    {props.icon}
                </div>
                <div
                 className="values">
                    <p>{props.name}</p>
                    <h2>{props.value}</h2>
                    {props.today && <p>+{props.today}</p>}
                </div>
            </div>
        )
    }

    const {stats} = props
    
    return (
        <div className="global-stats">
            <h1>COVID-19</h1>
            <div className="stats-container">
               <Stat 
                    color={"red"}
                    icon={<GiBiohazard size={"1.4rem"}/>}
                    name={"Infected"}
                    value={new Intl.NumberFormat().format(stats.cases)}
                    today={stats.todayCases}
               />
               <Stat 
                    color={"yellow"}
                    icon={<FaExclamation size={"1.4rem"}/>}
                    name={"Active"}
                    value={new Intl.NumberFormat().format(stats.active)}
               />
               <Stat 
                    color={"gray"}
                    icon={<GiDeathSkull size={"1.4rem"}/>}
                    name={"Deaths"}
                    value={new Intl.NumberFormat().format(stats.deaths)}
                    today={stats.todayDeaths}
               />
               <Stat 
                    color={"cyan"}
                    icon={<TiPlus size={"1.4rem"}/>}
                    name={"Recovered"}
                    value={new Intl.NumberFormat().format(stats.recovered)}
               />
            </div>
        </div>
    )
}

export default GlobalStats
