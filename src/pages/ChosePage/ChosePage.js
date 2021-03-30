import React, {useState} from 'react';
import './ChosePage.scss'
import MyButton from "../../components/Button/Button";
const ChosePage = React.forwardRef( (props, choseRef) => {

    const {setChosePage, setStartPage, setStartPageView, setFlipTime, setCodeTranslatePage, setCodeTranslatePageAnimation, setTextTranslatePage, setTextTranslatePageAnimation} = props;



    return (
        <div ref={choseRef} className={'chosePage'}>
            <div className={'chosePage__menu'}>
                <MyButton click={() => {
                    setChosePage(prev => !prev);
                    setTimeout(() => {setTextTranslatePage(true)}, 500);
                    setTimeout(() => setTextTranslatePageAnimation(prev => !prev), 500);
                }} width={'30vw'} text={'перевод в код Морзе'}/>
                <MyButton click={() => {
                    setChosePage(prev => !prev);
                    setTimeout(() => {setCodeTranslatePage(true)}, 500);
                    setTimeout(() => setCodeTranslatePageAnimation(prev => !prev), 500);
                }} width={'30vw'} mt={'5vw'} text={'перевод из кода Морзе'}/>
            </div>
            <MyButton click={() => {
                setChosePage(prev => !prev);
                setStartPageView(true);
                setFlipTime(1000);
                setTimeout(() => setStartPage(prev => !prev), 400);
            }} text={'назад'}/>
        </div>
    );
});

export default ChosePage;