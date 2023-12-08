import React from "react";

function EasterEgg() {
    return <div>
        <Button text="Ceci est un bouton"/>
        <br/>
        <Button text="2" url="https://www.youtube.com/watch?v=dQw4w9WgXcQ"/>
    </div>;
}

function Button({text, url}){
    return <a href={url}>
        <button>{text}</button>
    </a>
}

export default EasterEgg;