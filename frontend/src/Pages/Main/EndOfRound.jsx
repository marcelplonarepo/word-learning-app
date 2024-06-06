import styles from "./EndOfRound.module.css"
import Great from "../../assets/images/great.jpg";
import Reset from "../../assets/svg/reset";
import Continue from "../../assets/svg/continue";

const EndOfRound = ({ positive, maxWords, reset, repeat }) => {
    return (
        <div className={styles.end}>

            <img src={Great} alt=""></img>
            <div className={styles.percent}>{Math.round((positive / maxWords) * 100)}%</div>
            <div className={styles.bar}>
                <div style={{ width: `calc(${positive / maxWords * 100}% + 10px)` }} className={styles.barscore}>
                </div>
            </div>

            <div className={styles.endText}>Znałeś znaczenie <b>{positive}</b> słów na <b>{maxWords}</b>.
                Możesz rozpocząć od nowa
                <span>
                    &nbsp;
                    <Reset />
                </span>
                {Math.round((positive / maxWords) * 10000) !== 10000 ? <>
                    &nbsp;lub kontynuować
                    <span>
                        &nbsp;
                        <Continue />
                    </span>
                    &nbsp;naukę nie znanych słówek.
                </> : "."}
            </div>

            <div className={styles.butt}>
                <button onClick={reset} className={styles.endButton} type="button">
                    <Reset />
                </button>
                {Math.round((positive / maxWords) * 10000) !== 10000 && 
                <button onClick={repeat} className={styles.endButton} type="button">
                    <Continue />
                </button>}

            </div>

        </div>
    )
}

export default EndOfRound;