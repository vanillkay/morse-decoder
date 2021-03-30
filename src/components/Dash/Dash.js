import React from 'react';
import './Dash.scss';

const Dash = (props) => {
    const {color, last, mb} = props;
    return (
        <div className='dash' style={{backgroundColor: `${color}`, marginRight: `${last ? '3vw': ''}`, marginBottom: mb ? mb : '', marginTop:  mb ? mb : ''}}/>
    );
};

export default Dash;