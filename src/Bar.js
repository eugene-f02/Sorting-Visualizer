import React from 'react';

export default function Bar(props){
    return(
        <div className='bar' style={{background: props.color,height: props.val+"vh"}}>   
        </div>
    );
}
