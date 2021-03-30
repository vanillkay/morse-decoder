import React, {useEffect, useState} from 'react';
import './TextToCodePage.scss';
import MyButton from "../../components/Button/Button";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import {makeStyles} from "@material-ui/core/styles";
import MuiAlert from "@material-ui/lab/Alert";
import Line from "../../components/Line/Line";
import Snackbar from "@material-ui/core/Snackbar";
import Space from "../../components/Space/Space";
import MorseCode from "../../js/MorseCode";
import Fade from "@material-ui/core/Fade";
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';


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
        color: 'white'
    }
}));


const TextToCodePage = (props) => {
    const {setTextTranslatePageAnimation, setChosePage, setTextTranslatePage} = props;

    const [lang, setLang] = useState('');
    const [enteredText, setEnteredText] = useState([]);
    const [textBlockClick, setTextBlockClick] = useState(false);

    const [textError, setTextError] = useState(false);
    const [errorInText, setErrorInText] = useState('');

    const [translationReady, setTranslationReady] = useState(false);
    const [translationText, setTranslationText] = useState([]);


    const handleLangChange = (event) => {
        setLang(event.target.value);
    }

    const textBlockClickHandle = event => {
        if (event.target.className === 'code-translate__entered-code') {
            if (!!!lang) {
                setTextError(true);
                setErrorInText('Выберите язык текста')
                return;
            }
            setTextBlockClick(true);
        } else {
            setTextBlockClick(false);
        }
    }

    useEffect(() => {
        document.body.addEventListener('click', textBlockClickHandle);
        return () => document.body.removeEventListener('click', textBlockClickHandle);
    }, [lang, enteredText,translationReady])


    const textPress = event => {

        if (!lang) {
            setTextError(true);
            setErrorInText('Выберите язык текста')
            return;
        }

        if (event.key === 'Enter') {
            if (translationReady) {
                anotherTranslate()
            }else{
                translateText();
            }

            return ;
        }
        const regExps = [{text: 'rusCode', reg: /[А-ЯЁ]+/ig}, {
            text: 'ukrCode',
            reg: /[А-ЩЬЮЯҐЄІЇ]+/g
        }, {text: 'engCode', reg: /^[A-Za-z]+$/}]


        const langObj = regExps.find(item => item.text === lang);
        const morseCode = new MorseCode();

        if (morseCode.specialSymbols.includes(event.key)) {

            setEnteredText(prevState => [...prevState, event.key]);
            return;
        }

        if (event.key === 'Backspace') {
            setEnteredText(prevState => {
                const copy = [...prevState];
                copy.pop();
                return [...copy];
            })
        } else if (event.key.toUpperCase().match(langObj.reg) && event.key !== 'Control' && event.key !== 'Shift') {
            setEnteredText(prevState => [...prevState, event.key])
        } else if (event.code === 'Space') {
            setEnteredText(prevState => [...prevState, event.code]);
        } else if (event.key !== 'Control' && event.key !== 'Meta' && event.key !== 'Shift') {
            let language;
            switch (true) {
                case lang === 'ukrCode':
                    language = 'Украинском';
                    break;
                case lang === 'rusCode':
                    language = 'Русском';
                    break;
                case lang === 'engCode':
                    language = 'Английском';
                    break;
                default:
                    language = '';
            }
            setErrorInText(`Буквы ${event.key.toUpperCase()} нету в ${language} языке`);
            setTextError(true);
        }
    }


    const translateText = () => {
        if (!lang) {
            setTextError(true);
            setErrorInText('Выберите язык текста')
            return;
        }
        if (!enteredText.length) {
            setTextError(true);
            setErrorInText('Введите текст')
            return;
        }
        const morseCode = new MorseCode();

        const resultText = morseCode.translateText(enteredText, lang, '#2A9D8F');
        setTranslationReady(true);
        setTranslationText(resultText);
        setErrorInText('');
        morseCode.delete();
    }


    useEffect(() => {
        document.body.addEventListener('keydown', textPress);
        return () => document.body.removeEventListener('keydown', textPress);
    }, [lang, enteredText,translationReady]);


    const handleClose = (event, reason) => {
        if (reason === 'clickaway') return;
        setTextError(false);
        if (errorInText !== 'Выберите язык текста')
            setErrorInText('');
    };

    const anotherTranslate = () => {
        setTranslationReady(false);
        setEnteredText([]);
        setLang('');
        setTextError(false);
    }

    const classes = useStyles();
    return (
        <>{translationReady && <Fade timeout={{appear: 1000, enter: 1000, exit: 500}} in={translationReady}>
            <div className={'text-translate ready'}>
                <div className="code-translate__title">
                    Ваш перевод
                </div>
                {enteredText.includes('Space') && <div className={'slash-info'}>Знаком<div className={'slash-info__slash'}>/</div>обозначается конец слова</div>}
                <div className={'code-translate__translate'}>{translationText}</div>
                <div className="code-translate__buttons">
                    <div className="code-translate__buttons">
                        <MyButton click={() => {
                            setTextTranslatePageAnimation(prev => !prev);
                            setTimeout(() => setTextTranslatePage(false), 1000);
                            setChosePage(true);
                        }} text={'назад'}/>
                        <MyButton ml={'10px'} click={anotherTranslate} text={'повторить перевод'}/>
                    </div>
                </div>
            </div>
        </Fade>}

            {!translationReady && <> <Fade timeout={{enter: 500, exit: 500}} in={!translationReady}>
                <div>
                    <Snackbar open={textError} anchorOrigin={{vertical: 'top', horizontal: 'center'}}
                              autoHideDuration={3000} onClose={handleClose}>
                        <Alert onClose={handleClose} severity="error">
                            {errorInText}!
                        </Alert>
                    </Snackbar>
                    <div className={'text-translate'}>
                        <div className="code-translate__spaces">Вводите ваш текст</div>
                        <div className="code-translate__spaces">После каждого слова нажимайте</div>
                        <ArrowDownwardIcon/> <span className={'code-translate__input-words'}>ПРОБЕЛ</span>
                        <div className="code-translate__symbols">Выберите язык вашего текста
                        </div>
                        <FormControl variant="filled" className={classes.formControl}>
                            <InputLabel  className={classes.input} id="text-label">Язык
                                текста</InputLabel>
                            <Select
                                labelId="text-label"
                                id="text"
                                value={lang}
                                onChange={handleLangChange}
                            >
                                <MenuItem value={'ukrCode'}>Украинский</MenuItem>
                                <MenuItem value={'rusCode'}>Русский</MenuItem>
                                <MenuItem value={'engCode'}>Английский</MenuItem>
                            </Select>
                        </FormControl>
                        {errorInText === 'Выберите язык текста' && !lang &&
                        <Alert severity="warning">Выберите язык текста!</Alert>}

                        <div className="code-translate__entered-code">
                            {!textBlockClick && (!enteredText.length ? <span>Ваш текст</span> : '')}
                            {!enteredText.length && textBlockClick && <Line/>}
                            {!!enteredText.length && enteredText.map((item, index) => {
                                if (item === 'Space') return <Space key={index}/>
                                return <div key={index}>{item}</div>
                            })}
                            {!!enteredText.length && <Line/>}

                        </div>
                        <div className="code-translate__buttons">
                            <MyButton click={() => {
                                setTextTranslatePageAnimation(prev => !prev);
                                setTimeout(() => setTextTranslatePage(false), 1000);
                                setChosePage(true);
                            }} text={'назад'}/>
                            <MyButton ml={'10px'} click={translateText} text={'перевести'}/>
                        </div>
                    </div>
                </div>
            </Fade>
            </>}
        </>
    );
};

export default TextToCodePage;