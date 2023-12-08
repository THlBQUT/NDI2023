import React, {useState} from 'react';
import Menu from "../components/menu/Menu";
import Switch from "react-switch";

import "./style.css";

function HomePage() {
    const [isChecked, setChecked] = useState(false);

    const handleCheck = (isChecked) => {
        setChecked(isChecked);
        if (isChecked) document.body.classList.add("x-mas-theme")
        else document.body.classList.remove("x-mas-theme");


    }

    return (
        <div>
            <Switch className={"switch-button"} checked={isChecked} onChange={handleCheck}/>
            <Menu isXmasTheme={isChecked}/>
        </div>
    );
}

export default HomePage;