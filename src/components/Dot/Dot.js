import React from 'react';
import './Dot.scss'

const Dot = (props) => {
    const {color, last, mb} = props;
    return (
        <div className='dot' style={{backgroundColor: `${color}`, marginRight: `${last ? '3vw': ''}`, marginBottom: mb ? mb : '', marginTop:  mb ? mb : ''}}/>
    );
};

export default Dot;