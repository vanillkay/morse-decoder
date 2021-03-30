import React, {useState, useEffect, useRef} from 'react';
import {useSpring, animated as a} from 'react-spring'
import Word from "../../components/Word/Word";
import MorseWord from "../../components/MorseWord/MorseWord";
import './StartPageWord.scss';


const StartPageWord = React.forwardRef((props, forwardRef) => {
    const {word, color, time} = props;
    const flippedElem = useRef(null);
    const [flipped, setFlipped] = useState(false)
    const {transform, opacity} = useSpring({
        opacity: flipped ? 1 : 0,
        transform: `perspective(600px) rotateX(${flipped ? 180 : 0}deg)`,
        config: {mass: 5, tension: 500, friction: 80, duration: 400}
    })


    useEffect(() => {
        setTimeout(() => {
            setFlipped(state => !state);
            flippedElem.current.addEventListener('click', () => setFlipped(state => !state));
        }, time);

    }, [])

    return (
        <div ref={forwardRef}>
            <div ref={flippedElem}>
                <a.div className="back" style={{opacity: opacity.interpolate(o => 1 - o), transform}}><MorseWord
                    word={word} color={color} lang={'rusCode'}/></a.div>
                <a.div className="front"
                       style={{opacity, transform: transform.interpolate(t => `${t} rotateX(180deg)`)}}>
                    <Word word={word[0].toUpperCase() + word.slice(1)} color={color}/></a.div>
            </div>
        </div>
    );
});


export default StartPageWord;