import styles from "./Words.module.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
const Words = () => {

    const [categories, setCategories] = useState([]);


    useEffect(() => {
        axios.get("http://localhost:5000/words/words")
            .then(result => {
                setCategories(result.data);
            })
            .catch(err => {
                console.log(err);
            })
    }, [])

    return (<div className={styles.grid}>{categories.map((cat) => {
        return (
            <div>
                <Link className={styles.decoration} key={cat.category} to={`/nauka/${cat.category}/preview`}>
                    <div className={styles.card} >
                        <img src={cat.image} className={styles.img} alt=""></img>
                        <div>{cat.category}</div>
                        <div className={styles.amount}>Słów: {cat.words}</div>
                    </div>
                </Link>
            </div>
        )
    })}</div>);
}

export default Words;