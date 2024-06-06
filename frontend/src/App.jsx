import Main from "./Pages/Main/Main";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import styles from "./App.module.css";
import { Routes, Route } from "react-router-dom"
import Words from "./Pages/Words/Words";
import Preview from "./Pages/Preview/Preview";
function App() {

  return (
    <div>
      <Navbar></Navbar>
      <Sidebar></Sidebar>
      <div className={styles.program}>
        <Routes>
          <Route path="/" element={<Main></Main>}></Route>
          <Route path="/nauka" element={<Main></Main>}></Route>
          <Route path="/nauka/:kategoria" element={<Main></Main>}></Route>
          <Route path="/nauka/:kategoria/preview" element={<Preview></Preview>}></Route>
          <Route path="/nauka/preview" element={<Preview></Preview>}></Route>
          <Route path="/slowa" element={<Words></Words>}></Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
