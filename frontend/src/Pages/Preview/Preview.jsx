import styles from "./Preview.module.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from 'react-router-dom';
import Poland from "../../assets/images/poland.png";
import Uk from "../../assets/images/uk.png";
const Preview = () => {
    const [words, setWords] = useState([]);

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

    return (<>
        <table className={styles.preview}>
            {words.length && <tr>
                <th>Indeks</th>
                <th><div>English <img alt="" src={Uk}></img> </div></th>
                <th><div>Polski <img alt="" src={Poland}></img> </div></th>
                <th>Indeks</th>
                <th><div>English <img alt="" src={Uk}></img> </div></th>
                <th><div>Polski <img alt="" src={Poland}></img> </div></th>
            </tr>}
            {words.length &&
                words.reduce((mappedArray, item, index) => {
                    if (index % 2 === 0 && index < words.length - 1) {
                        mappedArray.push(<tr>
                            <td>{index / 2 + 1}.</td>
                            <td>{words[index].en}</td>
                            <td>{words[index].pl}</td>
                            <td>{(words.length - ((words.length % 2))) / 2 + (index / 2 + 1) + (words.length % 2)}.</td>
                            <td>{words[index + 1].en}</td>
                            <td>{words[index + 1].pl}</td>
                        </tr>);
                    }
                    else if (index === words.length - 1 && index % 2 === 0) {
                        mappedArray.push(
                            <tr>
                                <td>{index / 2 + 1}.</td>
                                <td>{words[index].en}</td>
                                <td>{words[index].pl}</td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                        )
                    }

                    return mappedArray;
                }, [])}


        </table>
        <Link className={styles.decoration} to={kategoria ? `/nauka/${kategoria}` : `/nauka`}>
        <div className={styles.tolearn}>
            <div>Rozpocznij naukę</div>
            <div>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M1 2.828c.885-.37 2.154-.769 3.388-.893 1.33-.134 2.458.063 3.112.752v9.746c-.935-.53-2.12-.603-3.213-.493-1.18.12-2.37.461-3.287.811V2.828zm7.5-.141c.654-.689 1.782-.886 3.112-.752 1.234.124 2.503.523 3.388.893v9.923c-.918-.35-2.107-.692-3.287-.81-1.094-.111-2.278-.039-3.213.492V2.687zM8 1.783C7.015.936 5.587.81 4.287.94c-1.514.153-3.042.672-3.994 1.105A.5.5 0 0 0 0 2.5v11a.5.5 0 0 0 .707.455c.882-.4 2.303-.881 3.68-1.02 1.409-.142 2.59.087 3.223.877a.5.5 0 0 0 .78 0c.633-.79 1.814-1.019 3.222-.877 1.378.139 2.8.62 3.681 1.02A.5.5 0 0 0 16 13.5v-11a.5.5 0 0 0-.293-.455c-.952-.433-2.48-.952-3.994-1.105C10.413.809 8.985.936 8 1.783z" />
                </svg>
            </div>
        </div>
        </Link>
    </>);
};

export default Preview;