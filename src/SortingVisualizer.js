import React from 'react';
import Bar from './Bar.js';
import generateBars from './misc/generateBars.js'
import get_bubble_sort_animations from './sorting-algo/bubble_sort.js'
import get_merge_sort_animations from './sorting-algo/merge_sort.js'
import get_insertion_sort_animations from './sorting-algo/insert_sort.js'
import get_quick_sort_animations from './sorting-algo/quick_sort.js'
import get_heap_sort_animations from './sorting-algo/heap_sort.js'
import Header from './Header.js'
import Bars from './Bars.js'

import $ from 'jquery'

export const ORIGINAL_AMOUNT_OF_BARS=Math.floor(window.innerWidth/50)<2 ? 2 : Math.floor(window.innerWidth/50)
export const MAX_SPEED=150
export const MIN_SPEED=10

class SortingVisualizer extends React.Component{
    constructor(){
        super()
        this.state={bars: generateBars(ORIGINAL_AMOUNT_OF_BARS),color:[],lastTimeOutId:0,animation_speed:MAX_SPEED,num_of_bars:ORIGINAL_AMOUNT_OF_BARS.toString(),sorted:false,time: 0,
        start: 0,isTimerOn: false}
        this.state.resetBars=this.state.bars.slice()
        this.state.color=Array(this.state.bars.length).fill('cornflowerblue')

        this.sortBars=this.sortBars.bind(this)
        this.handleChange=this.handleChange.bind(this)
    }

    componentDidMount() {
        window.addEventListener('resize', this.adjustNumberOfBars);
        $("#stop").prop('disabled', true)
      }
      componentWillUnmount() {
        window.removeEventListener('resize', this.adjustNumberOfBars);
      }


    adjustNumberOfBars = () => { // adjsut number of bars relative to window size
        let win = window.innerWidth
        let max = Math.floor(win/25*0.9)<2 ? 2: Math.floor(win/25*0.9)
        let min= Math.floor(win/25*0.25)<2 ? 2: Math.floor(win/25*0.25)
        if (this.state.num_of_bars>max){
            this.StopOrReset()
            let copyBars= this.state.resetBars.slice()
            while (copyBars.length>max){
                copyBars.pop()
            }
            this.setState({bars: copyBars,resetBars: copyBars,color:Array(copyBars.length).fill('cornflowerblue'),num_of_bars:copyBars.length},() =>  $("#stop").prop('disabled',true))
        }
        else if (this.state.num_of_bars<min){
            this.StopOrReset()

            let copyBars=this.state.bars.slice()
            let copyColor=this.state.color.slice()

            while (copyBars.length<min){
                let rndNum=Math.floor(Math.random()*55+11)
                copyBars.push(rndNum);
                copyColor.push('cornflowerblue')
            }
            this.setState({bars: copyBars,resetBars: copyBars,color:copyColor,num_of_bars:copyBars.length}, () =>  $("#stop").prop('disabled',true))
        }
        $("#barSlider").attr({"max": max ,"min": min})
      };


    handleChange(event) { // handle sliders
        const {name, value} = event.target
        if (name ==='num_of_bars'){

            this.resetTimer()

            function changedBars(state){


                let copyBars=state.bars.slice()
                let copyColor=state.color.slice()
                let copyResetBars=state.resetBars.slice()
    
    
                if (value > state.bars.length){
                    for(let i = state.bars.length;i<value;i++){
                            let rndNum=Math.floor(Math.random()*55+11)
                            copyBars.push(rndNum);
                            copyColor.push('cornflowerblue')
                            copyResetBars.push(rndNum)
                    }
                }
                else{
                    for(let i = state.bars.length;i>value;i--){
                        copyBars.pop()
                        copyColor.pop()
                        copyResetBars.pop()
                    }
                }
                return {sorted:false,bars:copyBars,color:copyColor,resetBars:copyResetBars}
            }


            this.setState({bars: this.state.resetBars.slice()},() => this.setState(changedBars(this.state),() =>  $("#stop").prop('disabled',true)))
  

        }
            this.setState({
                [name]: value
            })
    }

    renderBar(val,index){
        return (
        <Bar key={index} val={val} color={this.state.color[index]}/>
        );
    }
    
    get_animations(sortType){
        switch(sortType){
            case "bubble": return get_bubble_sort_animations(this.state.bars.slice())
            case "merge": return get_merge_sort_animations(this.state.bars.slice())
            case "insert": return get_insertion_sort_animations(this.state.bars.slice())
            case "quick": return get_quick_sort_animations(this.state.bars.slice())
            case "heap": return get_heap_sort_animations(this.state.bars.slice())
            default: return
        }
    }

    StopOrReset(){
        this.resetTimer()
        if (this.state.sorted) {
            this.setState({sorted:false,bars: this.state.resetBars}, () => $("#stop").prop('disabled', true))

        }
        else{
            if (this.state.isTimerOn) this.stopTimer()
            let newTimeoutId = window.setTimeout(function() {}, 0);
            let copyNewTimeoutId = newTimeoutId
            while (this.state.lastTimeOutId<newTimeoutId) { // clear all timeOuts
                newTimeoutId--
                window.clearTimeout(newTimeoutId); // will do nothing if no timeout with id is present
            }
            this.setState({sorted:false,lastTimeOutId: copyNewTimeoutId, bars: this.state.resetBars ,color: Array(this.state.bars.length).fill('cornflowerblue')}, () => {$(".slider, button").prop('disabled', false); $("#stop").prop('disabled', true)})
        }
    }

    generate_new_array(){
        this.resetTimer()
        let newBars=generateBars(this.state.num_of_bars)
        this.setState({bars:newBars,resetBars: newBars,sorted:false},() => $("#stop").prop('disabled', true))
    }

    startTimer() {
        this.setState({
          time: this.state.time,
          start: Date.now() - this.state.time,
          isTimerOn: true
        })
        this.timer = setInterval(() => this.setState({
          time: Date.now() - this.state.start
        }), 1);
      }

        
    stopTimer() {
        this.setState({isTimerOn: false})
        clearInterval(this.timer)
    }

    resetTimer() {
        this.setState({time: 0})
    }

    sortBars(sortType){

        $(".slider, button:not(#stop)").prop('disabled', true); // disabling buttons and sliders
        $("#stop").prop('disabled',false);


        if (this.state.sorted===true){ //green animation at the end
            let i=0
            $("#stop").prop('disabled', true)
            for (i;i<this.state.color.length;i++){
                let loopCounter=i
                setTimeout( () => {
                    this.setState( prevState => {
                    let color= prevState.color.map( (value,index) =>{
                        if (index===loopCounter) return '#32cd32'
                        else return value
                    })
                    return {color}
                })},i*15)
            }
            setTimeout( () => this.setState({color:Array(this.state.color.length).fill('cornflowerblue')}, () =>   $(".slider, button").prop('disabled', false)),(i+1)*15+500)
            return;
        }



        let copyBars=this.state.bars.slice()
        let copyColor=this.state.color.slice()
        let actualAnimationSpeed=MAX_SPEED+MIN_SPEED-this.state.animation_speed
        let animations=[]

        animations=this.get_animations(sortType)

        if (animations.length === 0){ // edge case with generated sorted array for bubble/insertion sort
            this.setState({sorted:true},()=>{this.sortBars()})
            return;
        }

        this.startTimer()

        animations.forEach( (value,index) =>{
            if (index % 3 === 0){
                setTimeout( () => {
                    copyColor[value[0]]=`red`
                    copyColor[value[1]]=`blue`
                    this.setState({color:copyColor,lastTimeOutId:this.state.lastTimeOutId+1}) // increasing lastTimeOutId so that clearTimouts() does less iterations
                },actualAnimationSpeed*index)
            }
            else if (index % 3 === 1 ){
               setTimeout( () => {
                    if (sortType === "merge"){
                        copyBars[value[0]]=value[1]   
                    }
                    else{
                        swap(copyBars,value[0],value[1])
                        copyColor[value[0]]=`turquoise`
                        copyColor[value[1]]=`turquoise`
                    }
                        
                    this.setState({bars:copyBars,color:copyColor,lastTimeOutId:this.state.lastTimeOutId+1})// increasing lastTimeOutId so that clearTimouts() does less iterations
                },actualAnimationSpeed*index)
            }
            else{
                setTimeout( () => {
                    copyColor[value[0]]=`cornflowerblue`
                    copyColor[value[1]]=`cornflowerblue`
                    this.setState({color:copyColor,lastTimeOutId:this.state.lastTimeOutId+1})// increasing lastTimeOutId so that clearTimouts() does less iterations
                }, actualAnimationSpeed*index)
            }
            if (index===animations.length-1){
                setTimeout( () => {
                    this.setState({sorted:true})
                    this.stopTimer()
                    this.sortBars()
                },actualAnimationSpeed*(index+1))

            }
            });
    }

    render(){
        return(
            <>
            <Header StopOrReset={this.StopOrReset.bind(this)} handleChange={this.handleChange.bind(this)} sortBars={this.sortBars.bind(this)} generate_new_array={this.generate_new_array.bind(this)} state={this.state}/>
            <Bars state={this.state} renderBar={this.renderBar.bind(this)}/>
            </>

        );
    }
}
export function swap(arr,i,k){
    let temp=arr[i]
    arr[i]=arr[k]
    arr[k]=temp
}

export default SortingVisualizer
