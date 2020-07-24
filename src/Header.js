import React from 'react'
import Timer from './Timer.js'
import {MAX_SPEED,MIN_SPEED} from './SortingVisualizer.js'

export default function Header(props) {
        let speed=""

        if (props.state.animation_speed>120)speed="very fast"
        else if (props.state.animation_speed>90)speed="fast"
        else if (props.state.animation_speed>50)speed="medium"
        else speed="slow"


        let max =Math.floor(window.innerWidth/25*0.9)
        let min=Math.floor(window.innerWidth/25*0.25)

        return ( 
            <header>
            <div className='horizontalCenter'>
            <button className="style" id="generate_new_array" onClick={() => {props.generate_new_array()}}>Generate New Array</button>
            <button onClick={() => props.sortBars("quick")}>Quick Sort</button>
            <button onClick={() => props.sortBars("heap")}>Heap Sort</button>
            <button onClick={() => props.sortBars("merge")}>Merge Sort</button>
            <button onClick={() => props.sortBars("bubble")}>Bubble Sort</button>
            <button onClick={() => props.sortBars("insert")}>Insertion Sort</button>
            {/* <button onClick={() => console.log(this.state)}>State</button> */}
            </div>

            <div id='sliderContainer' className='horizontalCenter'>
            <span className="sliders">
                    <label>Speed ({speed}): </label>
                    <input className="slider"
                            type="range" 
                            min={MIN_SPEED} max={MAX_SPEED} value={props.state.animation_speed}
                            name="animation_speed" 
                            onChange={props.handleChange} 
                    />
            </span>

            <button id="stop" onClick={() => props.StopOrReset()}>{props.state.sorted ? "Reset" : "Stop"}</button>

            <span className="sliders">
                    <label>Bars ({props.state.num_of_bars}):</label>
                    <input  className="slider" id='barSlider'
                            type="range" 
                            min={min<2 ? 2: min} max={max<2 ? 2:max} value={props.state.num_of_bars}
                            name="num_of_bars" 
                            onChange={props.handleChange} 
                    />
            </span>
            </div>
            <Timer time={props.state.time}/>
            </header>
        )
    }