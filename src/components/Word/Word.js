import React from 'react';
import './Word.scss'

const Word = (props) => {
    const {color, word} = props;
    return (
        <div style={{color: `${color}`}} className='word'>{word}</div>
    );
};

export default Word;