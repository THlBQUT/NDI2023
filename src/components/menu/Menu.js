import React, {useState} from "react";
import {Link} from "react-router-dom";
import 'materialize-css/dist/css/materialize.min.css';

import "./Menu-xmas.css";
import "./Menu-def.css";

function Menu({isXmasTheme}) {

    if (isXmasTheme) {
        document.getElementById("menu-main-div").className = "menu-main-div x-mas-theme-div"
        document.getElementById("menu-div").className = "menu-div x-mas-menu-div"
    }
    else {
        var menu_main = document.getElementById("menu-main-div")
        var menu = document.getElementById("menu-div")
        if (menu_main != null || menu != null) {
            document.getElementById("menu-main-div").className = "menu-main-div"
            document.getElementById("menu-div").className = "menu-div";
        }
    }

    return (
        <div id={"menu-main-div"} className={"menu-main-div"}>
            <h1 className={"main-title"}>ECO GAMES</h1>
            <div id={"menu-div"} className={"menu-div"}>
                <ul>
                    <Link to={"quizz"}>
                        <li>ECO'QUIZ</li>
                    </Link>
                    <Link to={"collect"}>
                        <li>RECYCLE GAME</li>
                    </Link>
                    <Link to={"about"}>
                        <li>ABOUT</li>
                    </Link>
                </ul>
            </div>
        </div>
    );
}

export default Menu;