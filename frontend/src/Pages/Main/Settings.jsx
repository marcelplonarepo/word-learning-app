import styles from "./Settings.module.css";
import Gear from "../../assets/svg/gear";
const Settings = ({onModeChange, onWordsModeChange, wordsMode, mode, words, alert1, alert2}) => {
    return (
        <div className={styles.optionWindow}>
            <div className={styles.gear}>
                <Gear/>
            </div>
            <div className={styles.settings}>Ustawienia</div>
            <div className={styles.set}>Tryb nauki</div>
            <div className={styles.optionButton}>
                <input className={styles.hiddenRadio} onChange={onModeChange} type="radio" name="modes" value="1 mode" id="1 mode" checked={mode === 1 ? true : false}></input>
                <label className={styles.labelButton} htmlFor="1 mode">Znam / Nie znam</label>
                <input className={styles.hiddenRadio} onChange={onModeChange} type="radio" name="modes" value="2 mode" id="2 mode" checked={mode === 2 && words.length >= 4 ? true : false}></input>
                <label className={styles.labelButton} htmlFor="2 mode">ABCD</label>
                {alert1 && <div>Tryb wymaga minimum 4 słówek.</div>}
            </div>

            <div className={styles.set}>Liczba słów do nauki</div>

            <div className={styles.optionButton}>
                <input className={styles.hiddenRadio} onChange={onWordsModeChange} type="radio" value="5 words" name="words" id="5 words" checked={wordsMode === 1 && words.length >= 5 ? true : false}></input>
                <label className={styles.labelButton} htmlFor="5 words">5</label>
                <input className={styles.hiddenRadio} onChange={onWordsModeChange} type="radio" value="10 words" name="words" id="10 words" checked={wordsMode === 2 && words.length >= 10 ? true : false}></input>
                <label className={styles.labelButton} htmlFor="10 words">10</label>
                <input className={styles.hiddenRadio} onChange={onWordsModeChange} type="radio" value="20 words" name="words" id="20 words" checked={wordsMode === 3 && words.length >= 20 ? true : false}></input>
                <label className={styles.labelButton} htmlFor="20 words">20</label>
                <input className={styles.hiddenRadio} onChange={onWordsModeChange} type="radio" name="words" value="All words" id="All words" checked={wordsMode === 4 ? true : false}></input>
                <label className={styles.labelButton} htmlFor="All words">Max</label>
                {alert2 && <div>Za mała ilość słówek w kategorii.</div>}
            </div>
        </div>
    )
}

export default Settings;