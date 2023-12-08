import React, {useState} from "react";
import {Link} from "react-router-dom";
import 'materialize-css/dist/css/materialize.min.css';

import "./Menu.css";

function Menu() {
    return (
        <div className={"menu-main-div"}>
            <h1 className={"main-title"}>ECO GAMES</h1>
            <div className={"menu-div"}>
                <ul>
                    <Link to={"quizz"}><li>ECO'QUIZ</li></Link>
                    <Link to={"collect"}><li>RECYCLE GAME</li></Link>
                    <Link to={"about"}><li>ABOUT</li></Link>
                </ul>
            </div>
        </div>
    );
}

export default Menu;