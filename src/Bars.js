import React from 'react'

export default function Bars(props) {
    return(
        <div id='barContainer'>
        {props.state.bars.map( (val,index) => props.renderBar(val,index))}  
        </div>
    )
}