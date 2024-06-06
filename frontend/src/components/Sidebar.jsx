import styles from "./Sidebar.module.css";
import Collection from "../assets/svg/collection";
import Book from "../assets/svg/book";
import { Link } from "react-router-dom";
const Sidebar = () => {
   return (

      <div className={styles.sidebar}>

         <Link className={styles.nodeco} to="/nauka">
            <div className={styles.page}>
               <Book></Book>
               <div>Nauka</div>
            </div>
         </Link>
       
         <Link className={styles.nodeco} to="/slowa">
            <div className={styles.page}>
               <Collection></Collection>
               <div>Słowa</div>
            </div>
         </Link>
      </div>
   )
}

export default Sidebar;