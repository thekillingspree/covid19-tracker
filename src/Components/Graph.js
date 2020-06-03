import React from 'react'
import { useRecoilValueLoadable } from 'recoil'
import { graphData } from '../state'
import MoonLoader from 'react-spinners/MoonLoader'
import { gray, yellow, accetYellow, red } from '../constants';
import { AreaChart, XAxis, YAxis, Tooltip, Area, ResponsiveContainer } from 'recharts';
import { BsExclamationTriangleFill } from 'react-icons/bs'
const Graph = () => {
    const data = useRecoilValueLoadable(graphData)

    switch (data.state) {
        case 'loading':
            return (
            <div 
            style={{
                display: 'flex',
                height: 100,
                justifyContent: 'center',
                alignItems: 'center',
            }}
            >
                <MoonLoader 
                size={30}
                color={accetYellow}
                />
            </div>
        )
    
        case 'hasValue':
            return (
                <div className="graph-container">
                  <ResponsiveContainer width={"100%"} height={350}>
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
                    </ResponsiveContainer>
                </div>
            )
        case 'hasError':
            return <div className="graph-error">
                    <BsExclamationTriangleFill 
                    size={40}
                    color={red}
                    />
                    <p>Historical Data Unavailable</p>
            </div>
    }

    
}

export default Graph
