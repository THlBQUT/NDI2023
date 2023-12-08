import React, {useState} from 'react';
import Menu from "../components/menu/Menu";
import Switch from "react-switch";

import "./style.css";

function HomePage() {
    const [isChecked, setChecked] = useState(false);
    const handleCheck = (isChecked) => {
        setChecked(isChecked);
        isChecked ? console.log("checked") : console.log("unchecked")
    }

    return (
        <div>
            <Switch className={"switch-button"} checked={isChecked} onChange={handleCheck}/>
            <Menu/>
        </div>
    );
}

export default HomePage;