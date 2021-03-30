import React, {useState, useEffect} from 'react';
import './StartPage.scss'
import StartPageWord from "../../components/StartPageWord/StartPageWord";
import Slide from "@material-ui/core/Slide";
import MyButton from "../../components/Button/Button";




const StartPage = (props) => {

const {setChosePage, setStartPage, flipTime, startPageView} = props;

    const [firstWord, setFirstWord] = useState(startPageView);
    const [secondWord, setSecondWord] = useState(startPageView);
    const [thirdWord, setThirdWord] = useState(startPageView);
    const [fourthWord, setFourthWord] = useState(startPageView);
    const [fifthWord, setFifthWord] = useState(startPageView);
    const [sixthWord, setSixthWord] = useState(startPageView);
    const [button, setButton] = useState(startPageView);
    const [directions, setDirections] = useState(['left', 'right'])

    useEffect(() => {
        if(!startPageView) {
            setTimeout(() => setFirstWord(true), 1000);
            setTimeout(() => setSecondWord(true), 2000);
            setTimeout(() => setThirdWord(true), 3000);
            setTimeout(() => setFourthWord(true), 4000);
            setTimeout(() => setFifthWord(true), 5000);
            setTimeout(() => setSixthWord(true), 6000);
            setTimeout(() => setButton(true), 13000);
        }

    }, [startPageView])

    const close = () => {
        setDirections(['right', 'left']);
        setButton(false);
        if(!startPageView) {
            setTimeout(() => setSixthWord(false), 500);
            setTimeout(() => setFifthWord(false), 1000);
            setTimeout(() => setFourthWord(false), 1500);
            setTimeout(() => setThirdWord(false), 2000);
            setTimeout(() => setSecondWord(false), 2500);
            setTimeout(() => setFirstWord(false), 3000);
            setTimeout(() => setStartPage(prev => !prev), 4000);
            setTimeout(() => setChosePage(prev => !prev), 4000);
        }else{
            setTimeout(() => setSixthWord(false),50);
            setTimeout(() => setFifthWord(false),100);
            setTimeout(() => setFourthWord(false),150);
            setTimeout(() => setThirdWord(false),200);
            setTimeout(() => setSecondWord(false),250);
            setTimeout(() => setFirstWord(false),300);
            setTimeout(() => setStartPage(prev => !prev),1000);
            setTimeout(() => setChosePage(prev => !prev), 1000);
        }
    }



    return (
        <div className='startPage'>
            <div className='startPage__words'>
                <Slide direction={directions[0]} timeout={{enter: 800, exit: 500,}} in={firstWord}
                       mountOnEnter
                       unmountOnExit>
                    <StartPageWord word={'привет'} color={'#2a9d8f'} time={flipTime}/>
                </Slide>
                <Slide direction={directions[1]} timeout={{enter: 1000, exit: 1000,}} in={secondWord}
                       mountOnEnter
                       unmountOnExit>
                    <StartPageWord word={'нужен'} color={'#8AB17D'} time={flipTime}/>
                </Slide>
                <Slide direction={directions[0]} timeout={{enter: 1000, exit: 1000,}} in={thirdWord}
                       mountOnEnter
                       unmountOnExit>
                    <StartPageWord word={'перевод'} color={'#E9C46A'} time={flipTime}/>
                </Slide>
                <Slide direction={directions[1]} timeout={{enter: 1000, exit: 1000,}} in={fourthWord}
                       mountOnEnter
                       unmountOnExit>
                    <StartPageWord word={'кода'} color={'#5AA786'} time={flipTime}/>
                </Slide>
                <Slide direction={directions[0]} timeout={{enter: 1000, exit: 1000,}} in={fifthWord}
                       mountOnEnter
                       unmountOnExit>
                    <StartPageWord word={'морзе'} color={'#F4A261'} time={flipTime}/>
                </Slide>
                <Slide direction={directions[1]} timeout={{enter: 1000, exit: 1000,}} in={sixthWord}
                       mountOnEnter
                       unmountOnExit>
                    <StartPageWord word={'?'} color={'#E76F51'} time={flipTime}/>
                </Slide>
            </div>
            <Slide direction='up' timeout={{enter: 1000, exit: 1000,}} in={button}
                   mountOnEnter
                   unmountOnExit>
                <MyButton mt={'10vh'} color={'#f4a261'} text={'НАЧАТЬ'} click={close}/>
            </Slide>
        </div>
    )
}

export default StartPage;