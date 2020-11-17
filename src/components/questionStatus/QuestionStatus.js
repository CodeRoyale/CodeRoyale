import React from 'react'
import './QuestionStatus.css';

export default function QuestionStatus({code, status, onClick}) {

    let color = null;
    if(status === 1){
        color = '#008000';
    }else if(status === 0){
        color = '#FF0000';
    }else{
        color = '#A9A9A9';
    }

    return (
        <div className='question-status'>
            <div className='question-color-container'>
            <div style={{background: color}} className='question-color' onClick={onClick}/>
            </div>
            <div className='question-code' onClick={onClick}><b>{code}</b></div>
        </div>
    )
}
