import React, {useEffect, useState} from 'react';
import MyButton from "../../components/Button/Button";
import './CodeTranslate.scss';
import {makeStyles} from '@material-ui/core/styles';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import Line from "../../components/Line/Line";
import Dash from "../../components/Dash/Dash";
import Dot from "../../components/Dot/Dot";
import Space from "../../components/Space/Space";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import MorseCode from "../../js/MorseCode";
import Fade from '@material-ui/core/Fade';


function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}


const useStyles = makeStyles((theme) => ({
    formControl: {
        minWidth: 200,
        backgroundColor: '#2A9D8F',
        fontSize: '5px'
    },
    input: {
        color: '#E9C46A',
        "&.Mui-focused": {
            color: 'white',
        }
    }

}));

const CodeTranslate = (props) => {
    const {setChosePage, setCodeTranslatePageAnimation, setCodeTranslatePage} = props;
    const [enteredCode, setEnteredCode] = useState([]);
    const [langTranslation, setLangTranslation] = useState('');
    const [wrongSymbol, setWrongSymbol] = useState(false);

    const [codeBlockClick, setCodeBlockClick] = useState(false);
    const [translateError, setTranslateError] = useState(false);
    const [errorText, setErrorText] = useState('');
    const [translationTextReady, setTranslationTextReady] = useState(false);
    const [translationText, setTranslationText] = useState('');

    const classes = useStyles();

    const handleChange = (event) => {
        setLangTranslation(event.target.value);
        setTranslateError(false);
        setErrorText('');
    };


    const codeBlockClickHandle = event => {
        if (event.target.className === 'code-translate__entered-code') {
            setCodeBlockClick(true);
        } else {
            setCodeBlockClick(false);
        }
    }

    useEffect(() => {
        document.body.addEventListener('click', codeBlockClickHandle);
        return () => document.body.removeEventListener('click', codeBlockClickHandle)
    }, [])


    const codePress = event => {
        const neededSymbols = ['-', '*'];

        if (event.key === 'Enter') {
            if (translationTextReady){
                againTranslation()
            }else {
                translation()
            }
            return ;
        }

        if (neededSymbols.includes(event.key)) {
            setEnteredCode(prevState => [...prevState, event.key])
        } else if (event.key === '/') {
            setEnteredCode(prevState => [...prevState, 'Space/Space'])
        } else if (event.key === 'Backspace') {
            setEnteredCode(prevState => {
                const copy = [...prevState];
                copy.pop();
                return [...copy];
            })
        } else if (event.code === 'Space') {
            setEnteredCode(prevState => [...prevState, event.code]);
        } else if (event.key !== 'Shift' && event.key !== 'Enter' && event.key !== 'Alt' && event.key !== 'Meta' && event.key !== 'Control') {
            setWrongSymbol(true);
        }
    }

    useEffect(() => {
        document.body.addEventListener('keydown', codePress);
        return () => document.body.removeEventListener('keydown', codePress);
    }, [langTranslation, enteredCode, translationTextReady])


    const morseCode = enteredCode.map((item, index) => {
        if (item === '-') {
            return <Dash mb={'10px'} key={index} color={'#E9C46A'}/>;
        }
        if (item === '*') {
            return <Dot mb={'10px'} key={index} color={'#E9C46A'}/>;
        }
        if (item === 'Space/Space') {
            return <div key={index} className={'code-translate__slash'}>/</div>
        }
        return <Space key={index}/>
    })

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') return;
        setWrongSymbol(false);
        setTranslateError(false);
        setErrorText('');
    };

    const translation = () => {
        if (!!!langTranslation) {
            setTranslateError(true);
            setErrorText('Вы должны выбрать язык перевода')
            return;
        }

        if (!enteredCode.length) {
            setTranslateError(true);
            setErrorText('Введите сначала код Морзе')
            return;
        }

        const morseCode = new MorseCode();
        const codeStr = enteredCode.join('');

        const codeArr = codeStr.split('Space').filter(item => item);
        const result = morseCode.decode(codeArr, langTranslation);
        if (result.includes('error')) {
            setTranslateError(true);
            setErrorText('Вы ввели неправильный код Морзе! Попробуйте ещё раз')
            setEnteredCode([]);
        } else {
            setTranslationTextReady(true);
            setTranslationText(result);
        }

    }


    const againTranslation = () => {
        setTranslationTextReady(false);
        setEnteredCode([]);
        setLangTranslation('');
        setTranslateError(false);
    }

    return (
        <>  {translationTextReady && <Fade timeout={{appear: 1000, enter: 1000, exit: 500}} in={translationTextReady}>
            <div className={'code-translate code-translate__ready'}>
                <div className="code-translate__title">
                    Ваш перевод
                </div>
                <div className={'code-translate__translate'}>{translationText}</div>
                <div className="code-translate__buttons">
                    <MyButton click={() => {
                        setCodeTranslatePageAnimation(prev => !prev);
                        setTimeout(() => setCodeTranslatePage(false), 1000);
                        setChosePage(true);
                    }} text={'назад'}/>
                    <MyButton ml={'10px'} click={againTranslation} text={'повторить перевод'}/>
                </div>
            </div>
        </Fade>}
            {!translationTextReady && <Fade timeout={{enter: 500, exit: 500}} in={!translationTextReady}>
                <div className={'code-translate'}>
                    <Snackbar open={wrongSymbol} anchorOrigin={{vertical: 'top', horizontal: 'center'}}
                              autoHideDuration={3000} onClose={handleClose}>
                        <Alert onClose={handleClose} severity="warning">
                            Вы можете вводить только <span className={'code-translate__wrong-symbol'}> – , * </span> и <span
                            className={'code-translate__wrong-symbol'}> /</span>
                        </Alert>
                    </Snackbar>
                    <Snackbar open={translateError} anchorOrigin={{vertical: 'top', horizontal: 'center'}}
                              autoHideDuration={5000} onClose={handleClose}>
                        <Alert onClose={handleClose} severity="error">
                            {errorText}
                        </Alert>
                    </Snackbar>
                    <div className="code-translate__title">
                        Введите код морзе
                    </div>
                    <div className="code-translate__symbols">
                        Вводите только такие символы
                    </div>
                    <ArrowDownwardIcon/> <span
                    className={'code-translate__input-symbols'}>-,*</span>
                    <div className="code-translate__spaces">После каждой буквы нажимайте</div>
                    <ArrowDownwardIcon/> <span className={'code-translate__input-words'}>ПРОБЕЛ</span>
                    <div className="code-translate__spaces">После каждого слова нажимайте</div>
                    <ArrowDownwardIcon/> <span
                    className={'code-translate__input-words'}>CЛЕШ <ArrowForwardIcon/> /</span>
                    <div className="code-translate__spaces">Так же выберите язык на котором хотите получить перевод ниже
                    </div>
                    <FormControl variant="filled" className={classes.formControl}>
                        <InputLabel className={classes.input} id="demo-simple-select-filled-label">Язык
                            перевода</InputLabel>
                        <Select
                            labelId="demo-simple-select-filled-label"
                            id="demo-simple-select-filled"
                            value={langTranslation}
                            onChange={handleChange}
                            classes={{selectMenu: 'code-translate__menu'}}
                        >
                            <MenuItem classes={{root: 'code-translate__menu'}} value={'ukrCode'}>Украинский</MenuItem>
                            <MenuItem classes={{root: 'code-translate__menu'}} value={'rusCode'}>Русский</MenuItem>
                            <MenuItem classes={{root: 'code-translate__menu'}} value={'engCode'}>Английский</MenuItem>
                        </Select>
                    </FormControl>
                    {errorText === 'Вы должны выбрать язык перевода' &&
                    <Alert severity="warning">Выберите язык перевода!</Alert>}
                    <div className="code-translate__entered-code">
                        {!codeBlockClick && (!enteredCode.length ? <span>Ваш код</span> : '')}
                        {!enteredCode.length && codeBlockClick && <Line/>}
                        {!!enteredCode.length && morseCode}
                        {!!enteredCode.length && <Line/>}
                    </div>
                    <div className="code-translate__buttons">
                        <MyButton click={() => {
                            setCodeTranslatePageAnimation(prev => !prev);
                            setTimeout(() => setCodeTranslatePage(false), 1000);
                            setChosePage(true);
                        }} text={'назад'}/>
                        <MyButton ml={'10px'} click={translation} text={'перевести'}/>
                    </div>
                </div>
            </Fade>}
        </>
    );
};

export default CodeTranslate;