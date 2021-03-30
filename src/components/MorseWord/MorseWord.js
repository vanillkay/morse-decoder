import React from 'react';
import './MorseWord.scss';
import MorseCode from "../../js/MorseCode";



const MorseWord = (props) => {
    const {word, lang, color} = props;

    const morseCode = new MorseCode();
    const morseWord = morseCode.translate(word, lang, color);

    morseCode.delete();

    return (
        <div className='morseWord'>
            {morseWord}
        </div>
    );
};

export default MorseWord;