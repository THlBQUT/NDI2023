import React from "react";
import {Link} from "react-router-dom";
import 'materialize-css/dist/css/materialize.min.css';
import Ztext from 'react-ztext';

import "./Menu.css";

function Menu() {
    return (
        <div className={"menu-main-div"}>
            <h1 className={"backward-tilt"}>ECO</h1>
            <h1 className={"forward-tilt"}>GAMES</h1>
            <div className={"menu-div"}>
                <ul>
                    <li><Link to={"quizz"}>ECO'QUIZ</Link></li>
                    <li><Link to={""}>JEU 2</Link></li>
                    <li><Link to={"settings"}>SETTINGS</Link></li>
                    <li><Link to={"about"}>ABOUT</Link></li>
                </ul>
            </div>
        </div>
    );
}

export default Menu;