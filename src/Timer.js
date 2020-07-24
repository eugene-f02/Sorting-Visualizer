import  React from 'react'
export default function Timer(props) {
    let minutes = Math.floor((props.time/(60*1000)) % 60)
    let seconds = Math.floor((props.time/1000) % 60)
    let miliseconds = Math.floor((props.time/10) % 100)
    return(
      <div id="timer">
        <h3 >Time: {(minutes < 10 ? '0' : "")+minutes+':'+(seconds < 10 ? '0' : "")+seconds+'.'+(miliseconds < 10 ? '0' : "")+miliseconds} </h3>
      </div>
    )
}
