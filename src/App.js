import logo from './logo.svg';
import './App.css';
import {Route, Routes, Switch} from 'react-router-dom';

import Menu from "./components/menu/Menu";
import HomePage from "./page/HomePage";
import CollectGame from "./page/CollectGame";
import Quizz from "./page/Quizz";
import EasterEgg from "./components/easteregg/EasterEgg";
import About from "./page/About"

function App() {
    return (
        <div className={"App"}>
            <Routes>
                <Route path={"/"} element={<HomePage/>}/>
                <Route path={"/collect"} element={<CollectGame/>}/>
                <Route path={"/About"} element={<About/>}/>
                <Route path={"/quizz"} element={<Quizz/>}/>
                <Route path={"/easteregg"} element={<EasterEgg/>}/>
            </Routes>
            <footer>
            </footer>
        </div>
    );
}

export default App;
