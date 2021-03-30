import React, {useEffect, useState} from 'react';
import Fade from '@material-ui/core/Fade';
import  './Line.scss';


const Line = () => {
    const [appear, setAppear] = useState(false);

    useEffect(() => {
        const line = setInterval(()=> setAppear(prevState => !prevState), 500);
        return () => clearInterval(line);
    }, [])
    return (
        <Fade in={appear}>
            <div className="line"/>
        </Fade>

    );
};

export default Line;