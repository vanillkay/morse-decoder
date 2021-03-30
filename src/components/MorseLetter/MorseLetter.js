import React from 'react';
import './MorseLetter.scss';
import Dash from "../Dash/Dash";
import Dot from "../Dot/Dot";

const MorseLetter = (props) => {
    const {code, color, mb} = props;

    // // if(letter.match(['-','*']))
    //     console.log(letter.match(['-','*']));
    const codesArr = code.split('');

    const morseLetter = codesArr.map((item, index) => {
        if (item === '-') {
            if (index === codesArr.length-1){
                return  <Dash mb={mb} last key={index} color={color}/>;
            }
            return <Dash mb={mb} key={index} color={color}/>;
        }
        if (index === codesArr.length-1){
            return <Dot mb={mb} last key={index} color={color}/>;
        }
        return <Dot mb={mb} key={index} color={color}/>;
    })
    return (
        <div className='morseLetter'>
            {morseLetter}
        </div>
    );
};

export default MorseLetter;