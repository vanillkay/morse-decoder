import './App.css';
import React, {useEffect, useState} from "react";
import StartPage from "./pages/StartPage/StartPage";
import SimpleSlide from "./components/SimpleSlide";
import ChosePage from "./pages/ChosePage/ChosePage";
import Zoom from "@material-ui/core/Zoom";
import Grow from '@material-ui/core/Grow';

import CodeTranslate from "./pages/CodeTranslate/CodeTranslate";
import TextToCodePage from "./pages/TextToCodePage/TextToCodePage";

function App() {
    const [startPage, setStartPage] = useState(true);
    const [chosePage, setChosePage] = useState(false);
    const [codeTranslatePage, setCodeTranslatePage] = useState(false);
    const [textTranslatePage, setTextTranslatePage] = useState(false);

    const [startPageView, setStartPageView] = useState(false);
    const [flipTime, setFlipTime] = useState(5500);

    const [codeTranslatePageAnimation, setCodeTranslatePageAnimation] = useState(false);
    const [textTranslatePageAnimation, setTextTranslatePageAnimation] = useState(false);


    return (
        <section className='main'>
            {startPage && <StartPage flipTime={flipTime} startPageView={startPageView} setChosePage={setChosePage}
                                     setStartPage={setStartPage}/>}
            {!startPage &&  !textTranslatePage && !codeTranslatePage &&
            <Zoom in={chosePage} timeout={{enter: 1000, exit: 500}}>
                <div>
                    <ChosePage setStartPage={setStartPage} setCodeTranslatePage={setCodeTranslatePage}
                               setFlipTime={setFlipTime} setStartPageView={setStartPageView}
                               setChosePage={setChosePage}
                               setCodeTranslatePageAnimation={setCodeTranslatePageAnimation}
                               setTextTranslatePage={setTextTranslatePage}
                               setTextTranslatePageAnimation={setTextTranslatePageAnimation}/>
                </div>
            </Zoom>}
            {codeTranslatePage && <Grow {...(codeTranslatePageAnimation ? {timeout: 2000} : {timeout: 1000})}
                                        in={codeTranslatePageAnimation}
                                        style={{transformOrigin: '0 0 0'}}
            >
                <div className={'code-translate__container'}><CodeTranslate
                    setCodeTranslatePageAnimation={setCodeTranslatePageAnimation}
                    setCodeTranslatePage={setCodeTranslatePage} setChosePage={setChosePage}/>
                </div>
            </Grow>}
            {textTranslatePage && <Grow {...(textTranslatePageAnimation ? {timeout: 2000} : {timeout: 1000})}
                                        in={textTranslatePageAnimation}
                                        style={{transformOrigin: 'top right'}}
            >
                <div><TextToCodePage setTextTranslatePageAnimation={setTextTranslatePageAnimation} setTextTranslatePage={setTextTranslatePage} setChosePage={setChosePage}/></div>
            </Grow>
            }

        </section>
    );
}

export default App;
