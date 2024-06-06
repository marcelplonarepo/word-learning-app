import styles from "./Learning.module.css";
import LongArrowRight from "../../assets/svg/longArrowRight";
import Poland from "../../assets/images/poland.png";
import Uk from "../../assets/images/uk.png";
import Replace from "../../assets/svg/replace";
const Learning = ({reverse, reverseLang, checkAns, order, counter, words, answered, mode, answer, showAnswer, abcdAns, abcd, abcdMis}) => {
    return (<>

        <div className={styles.languages}>
            <img src={reverse === false ? Uk : Poland} alt=""></img>
            <div className={styles.longArrowLang}>
                <LongArrowRight></LongArrowRight>
            </div>
            <img src={reverse === false ? Poland : Uk} alt=""></img>
            <div onClick={reverseLang} className={styles.replaceLang}>
                <Replace></Replace>
            </div>
        </div>

        <div className={styles.counter}>{counter + 1} / {order.length}</div>

        <div onClick={checkAns} className={styles.container}>
            <div className={styles.words}>
                <div className={styles.word}>{order.length && counter < order.length && words[order[counter]][reverse === false ? "en" : "pl"]}</div>
                <div className={styles.longArrow}>
                    <LongArrowRight></LongArrowRight>
                </div>
                {answer ? (
                    <div className={styles.word}>{order.length && counter < order.length && words[order[counter]][reverse === false ? "pl" : "en"]}</div>
                ) : (
                    <div className={styles.hiddenword}>?</div>
                )}
            </div>
            {mode === 1 ? <div className={styles.buttons}>
                {answer ? (
                    <>
                        <input onClick={() => { return answered(1) }} type="button" className={`${styles.buttonAnswer} ${styles.know}`} value="Wiedziałem"></input>
                        <input onClick={() => { return answered(-1) }} type="button" className={`${styles.buttonAnswer} ${styles.dontknow}`} value="Nie wiedziałem"></input>
                    </>
                ) : (
                    <input onClick={showAnswer} type="button" className={`${styles.buttonAnswer} ${styles.show}`} value="Pokaż odpowiedź"></input>
                )}
            </div> :
                <div className={styles.buttons2}>
                    <button onClick={() => { return abcdAns(abcd[counter][0]) }} className={`${styles.buttonAnswer2} ${styles.a} ${answer && abcdMis === abcd[counter][0] && styles.bad} ${answer && order[counter] === abcd[counter][0] && styles.cor}`}>A:&nbsp;<div>{order.length && counter < order.length && words[abcd[counter][0]][reverse === false ? "pl" : "en"]}</div></button>
                    <button onClick={() => { return abcdAns(abcd[counter][1]) }} className={`${styles.buttonAnswer2} ${styles.b} ${answer && abcdMis === abcd[counter][1] && styles.bad} ${answer && order[counter] === abcd[counter][1] && styles.cor}`}>B:&nbsp;<div>{order.length && counter < order.length && words[abcd[counter][1]][reverse === false ? "pl" : "en"]}</div></button>
                    <button onClick={() => { return abcdAns(abcd[counter][2]) }} className={`${styles.buttonAnswer2} ${styles.c} ${answer && abcdMis === abcd[counter][2] && styles.bad} ${answer && order[counter] === abcd[counter][2] && styles.cor}`}>C:&nbsp;<div>{order.length && counter < order.length && words[abcd[counter][2]][reverse === false ? "pl" : "en"]}</div></button>
                    <button onClick={() => { return abcdAns(abcd[counter][3]) }} className={`${styles.buttonAnswer2} ${styles.d} ${answer && abcdMis === abcd[counter][3] && styles.bad} ${answer && order[counter] === abcd[counter][3] && styles.cor}`}>D:&nbsp;<div>{order.length && counter < order.length && words[abcd[counter][3]][reverse === false ? "pl" : "en"]}</div></button>
                </div>}

        </div>
    </>)
}

export default Learning;