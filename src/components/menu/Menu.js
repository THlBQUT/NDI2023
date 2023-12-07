import React from "react";
import {Link} from "react-router-dom";

import "./Menu.css";

function Menu() {
    return (
        <div className={"menu-main-div"}>
            <h1>ECO GAMES</h1>
            <div className={"menu-div"}>
                <h2>Games</h2>
                <ul>
                    <li><Link to={"quiz"}>Eco'QUIZ</Link></li>
                    <li><Link to={""}>JEU 2</Link></li>
                    <li><Link to={"settings"}>SETTINGS</Link></li>
                    <li><Link to={"about"}>ABOUT</Link></li>
                </ul>
            </div>
        </div>
    );
}

export default Menu;