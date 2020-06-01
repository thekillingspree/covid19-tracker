import React from 'react'
import { useRecoilValue, useRecoilValueLoadable, useRecoilStateLoadable } from 'recoil'
import { currentCategory, graphData } from '../state'

import { gray, yellow } from '../constants';
import { AreaChart, XAxis, YAxis, CartesianGrid, Tooltip, Area, ResponsiveContainer } from 'recharts';

const Graph = () => {
    const data = useRecoilValueLoadable(graphData)
    return (
        <div className="graph-container">
           {data.state === 'hasValue' && <ResponsiveContainer width={"100%"} height={350}>
            <AreaChart data={data.contents}
                margin={{ top: 30, right: 30, left: 0, bottom: 0 }}>
                <defs>
                    <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={yellow} stopOpacity={0.8}/>
                    <stop offset="95%" stopColor={yellow} stopOpacity={0}/>
                    </linearGradient>
                </defs>
                <XAxis dataKey="name" />
                <YAxis />
                
                <Tooltip 
                separator=""
                formatter={value => [value, '']}
                contentStyle={{
                    background: gray,
                    borderRadius: 4,
                    border: ""
                }}
                />
                <Area type="monotone" dataKey="y" stroke={yellow} fillOpacity={1} fill="url(#gradient)" />
            </AreaChart>
            </ResponsiveContainer>}
        </div>
    )
}

export default Graph
