import logo from './logo.svg';
import './App.css';
import {Route, Routes, Switch} from 'react-router-dom';

import Menu from "./components/menu/Menu";
import HomePage from "./page/HomePage";
import Quizz from "./page/Quizz";
import EasterEgg from "./components/easteregg/EasterEgg";

function App() {
    return (
        <div className="App">
            <body>
            <div>
                <Routes>
                    <Route path={"/"} element={<HomePage/>}/>
                    <Route path={"/"} element={<Quizz/>}/>
                    <Route path={"/easteregg"} element={<EasterEgg/>}/>
                </Routes>
            </div>
            <footer>

            </footer>
            </body>
        </div>
    );
}

export default App;
