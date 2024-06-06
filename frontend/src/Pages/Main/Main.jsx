import styles from "./Main.module.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from 'react-router-dom';
import Settings from "./Settings";
import EndOfRound from "./EndOfRound";
import Learning from "./Learning";
import Gear from "../../assets/svg/gear";
const randomNumber = (from, to) => {
    return Math.floor((Math.random() * (to - from + 1)) + from);
}

const shuffle = (arrayLength) => {

    let toShuffle = [];

    for (let i = 0; i < arrayLength; i++) {
        toShuffle.push(i);
    };

    for (let i = arrayLength - 1; i > 0; i--) {
        const rnd = randomNumber(0, i);
        [toShuffle[i], toShuffle[rnd]] = [toShuffle[rnd], toShuffle[i]];
    }

    return toShuffle;
};

const shuffleArray = (arrayToShuffle) => {

    const ShuffledArray = [];

    const randomShuffle = shuffle(arrayToShuffle.length);

    randomShuffle.forEach(element => {
        ShuffledArray.push(arrayToShuffle[element])
    });

    return ShuffledArray;
}


const Main = () => {
    const [reverse, setReverse] = useState(false);
    const [words, setWords] = useState([]);
    const [order, setOrder] = useState([]);
    const [answers, setAnswers] = useState([]);
    const [abcd, setabcd] = useState([]);
    const [answer, setAnswer] = useState(false);
    const [end, setEnd] = useState(false);
    const [counter, setCounter] = useState(0);
    const [positive, setPositive] = useState(0);
    const [mode, setMode] = useState(1);
    const [wordsMode, setWordsMode] = useState(4);
    const [maxWords, setMaxWords] = useState(0);
    const [abcdChoice, setABCDchoice] = useState(-1);
    const [showOptions, setShowOptions] = useState(false);
    const [alert1, setalert1] = useState(false);
    const [alert2, setalert2] = useState(false);

    const { kategoria } = useParams();

    useEffect(() => {

        if (kategoria) {
            axios.get(`http://localhost:5000/words/read/${kategoria}`)
                .then(result => {
                    setWords(result.data);
                })
                .catch(err => {
                    console.log(err);
                })
        }
        else {
            axios.get("http://localhost:5000/words/read")
                .then(result => {
                    setWords(result.data);
                })
                .catch(err => {
                    console.log(err);
                })
        }
    }, [kategoria])

    const reset = () => {
        setPositive(0);
        setCounter(0);
        restartLesson();
    }

    const repeat = () => {
        setPositive(0);
        setCounter(0);


        const toRepeat = [];

        answers.forEach((element, i) => {
            if (element === -1) {
                toRepeat.push(i);
            }
        })
        const rightArr = shuffleArray(toRepeat);
        setabcd(abcdFun(rightArr));
        setOrder(rightArr);
    }

    useEffect(() => {
        setEnd(false);
    }, [order])

    const abcdFun = (rightArr) => {
        const newabcd = [];
        for (let i = 0; i < rightArr.length; i++) {
            let abcdOpt = [];
            abcdOpt.push(rightArr[i])
            const rndValues = shuffle(words.length);
            for (let j = 0; j < rndValues.length; j++) {

                if (rndValues[j] !== rightArr[i]) {
                    abcdOpt.push(rndValues[j]);
                }
                if (abcdOpt.length === 4) {
                    break;
                }
            }
            let shuffabcd = shuffleArray(abcdOpt);
            newabcd.push(shuffabcd);
        }

        return newabcd;
    }

    const restartLesson = () => {
        if (words.length > 0 && wordsMode && mode) {
            setPositive(0);
            setCounter(0);
            if (wordsMode === 1) {
                const rightOrder = (shuffle(words.length)).slice(0, 5);
                setabcd(abcdFun(rightOrder))
                setOrder(rightOrder);
                setAnswers(new Array(words.length).fill(0));
                setMaxWords(5);
            }
            else if (wordsMode === 2) {

                const rightOrder = (shuffle(words.length)).slice(0, 10);
                setabcd(abcdFun(rightOrder))
                setOrder(rightOrder);
                setAnswers(new Array(words.length).fill(0));
                setMaxWords(10);
            }
            else if (wordsMode === 3) {

                const rightOrder = (shuffle(words.length)).slice(0, 20);
                setabcd(abcdFun(rightOrder))
                setOrder(rightOrder);
                setAnswers(new Array(words.length).fill(0));
                setMaxWords(20);
            }
            else if (wordsMode === 4) {

                const rightOrder = (shuffle(words.length));
                setabcd(abcdFun(rightOrder))
                setOrder(rightOrder);
                setAnswers(new Array(words.length).fill(0));
                setMaxWords(words.length);
            }
        }
    }

    useEffect(() => {
        restartLesson();
    }, [words, wordsMode, mode])

    const reverseLang = () => {
        setReverse((reverse => { return !reverse }))
    }

    const showAnswer = () => {
        setAnswer(true);
    }

    useEffect(() => {
        if (counter > order.length - 1 && order.length > 0 && answers[order[order.length - 1]] !== 0 && !end) {
            endRound();
        }
    }, [answers, counter, order, end, wordsMode])

    const answered = (whichButton) => {
        const newAnswers = [...answers];
        newAnswers[order[counter]] = whichButton;
        setAnswers(newAnswers);
        setAnswer(false);

        if (counter <= order.length - 1) {
            setCounter((value) => { return value + 1 });
        }
    }

    const endRound = () => {
        let positiveCount = 0;
        answers.forEach(element => {
            if (element === 1) {
                positiveCount += 1;
            }
        })

        setPositive(positiveCount);

        setEnd(true);
    };

    const options = () => {
        setShowOptions((value) => { return !value });
        setalert1(false);
        setalert2(false);
    }

    const onModeChange = (e) => {
        if (e.target.value === "1 mode") {
            setMode(1);
            setalert1(false);
        }
        else if (e.target.value === "2 mode" && words.length >= 4) {
            setMode(2);
            setalert1(false);
        }
        else if (e.target.value === "2 mode") {
            setalert1(true);
        }
    }

    const onWordsModeChange = (e) => {
        if (e.target.value === "5 words" && words.length >= 5) {
            setWordsMode(1);
            setalert2(false);
        }
        else if (e.target.value === "5 words") {
            setalert2(true);
        }
        else if (e.target.value === "10 words" && words.length >= 10) {
            setWordsMode(2);
            setalert2(false);
        }
        else if (e.target.value === "10 words") {
            setalert2(true);
        }
        else if (e.target.value === "20 words" && words.length >= 20) {
            setWordsMode(3);
            setalert2(false);
        }
        else if (e.target.value === "20 words") {
            setalert2(true);
        }
        else if (e.target.value === "All words") {
            setalert2(false);
            setWordsMode(4);
        }
    }

    const abcdAnswer = (myans) => {

        if (!answer) {
            const newAnswers = [...answers];
            if (myans === order[counter]) {
                newAnswers[order[counter]] = 1;
            }
            else {
                newAnswers[order[counter]] = -1;
            }
            setAnswers(newAnswers);
            setAnswer(true);
            setABCDchoice(myans);
            return;
        }

    }

    const checkAns = () => {
        console.log(mode, answer)
        if (mode === 2 && answer) {
            setAnswer(false)
            setABCDchoice(-1)
            if (counter <= order.length - 1) {
                setCounter((value) => { return value + 1 });
            }
        }
    }

    return (
        <>

            {end === false && (
            <div onClick={options} className={styles.options}>
                <Gear/>
            </div>)}

            {showOptions === true ? 
            <Settings
            onModeChange={onModeChange} onWordsModeChange={onWordsModeChange}
            wordsMode={wordsMode} mode={mode} words={words} alert1={alert1} alert2={alert2}/>
                : (end === true ? 
                <EndOfRound positive={positive} maxWords={maxWords} reset={reset} repeat={repeat} /> : 
                <Learning reverse={reverse} reverseLang={reverseLang} checkAns={checkAns} order={order} counter={counter} words={words}
                answered={answered} mode={mode} answer={answer} showAnswer={showAnswer} abcdAnswer={abcdAnswer} abcd={abcd} abcdChoice={abcdChoice}/>)}

        </>)
}


export default Main;