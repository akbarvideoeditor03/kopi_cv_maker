import React, { useState, useEffect, useRef } from "react";

function Switch() {
    const data = localStorage.getItem("dark-mode");
    const [darkMode, setDarkMode] = useState();
    const switchRef = useRef();

    useEffect(() => {
        if (data === "true") {
            setDarkMode(true);
        } else {
            setDarkMode(false);
        }
    }, []);

    const handleClick = () => {
        const newDarkMode = !darkMode;
        setDarkMode(newDarkMode);
        localStorage.setItem("dark-mode", newDarkMode.toString());
        if (switchRef.current) {
            switchRef.current.checked = newDarkMode;
        }
        window.location.reload();
    };

    return (
        <button
            ref={switchRef}
            onClick={handleClick}
            className={`container f-center-c btn ${darkMode ? "btn-moon" : "btn-sun"}`}
        >
        </button>
    );
}

export default Switch;
