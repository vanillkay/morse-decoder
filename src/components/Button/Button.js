import React from 'react';
import Button from '@material-ui/core/Button';
import {withStyles} from '@material-ui/core/styles';




const MyButton = React.forwardRef((props, ref) => {
    const {color, mt, ml, width, text, click} = props;
    const ColorButton = withStyles((theme) => ({
        root: {
            width: `${width}`,
            color: 'black',
            backgroundColor: `${color}`,
            marginTop: `${mt}`,
            marginLeft: `${ml}`,
            '&:hover': {
                backgroundColor: '#f4a261',
            },
        },
    }))(Button);

    return (
        <div ref={ref}>
            <ColorButton size={'medium'} onClick={() => click && click()} variant="contained" color="primary">{text}</ColorButton>
        </div>

    );
});

export default MyButton;