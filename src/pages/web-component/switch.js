import React, {useState, useEffect, useRef} from "react";

function Switch() {
    const [darkMode, setDarkMode] = useState(false);
    const switchRef = useRef(null);

    useEffect(() => {
        const data = localStorage.getItem("dark-mode");
        if (data === "true") {
            setDarkMode(true);
            if (switchRef.current) {
                switchRef.current.checked = true;
            }
        } else {
            setDarkMode(false);
            if (switchRef.current) {
                switchRef.current.checked = false;
            }
        }
    }, []);

    const handleClick = () => {
        const newDarkMode = !darkMode;
        setDarkMode(newDarkMode);
        localStorage.setItem("dark-mode", newDarkMode.toString());
        if (switchRef.current) {
            switchRef.current.checked = newDarkMode;
        }
        window.location.reload()
    };

    return (
        <label className="switch">
            <input ref={switchRef} id="input" type="checkbox" onClick={handleClick} checked={darkMode} onChange={handleClick}/>
            <div className="slider round">
                <div className="sun-moon">
                    <svg id="moon-dot-1" className="moon-dot" viewBox="0 0 100 100">
                        <circle cx={50} cy={50} r={50} />
                    </svg>
                    <svg id="moon-dot-2" className="moon-dot" viewBox="0 0 100 100">
                        <circle cx={50} cy={50} r={50} />
                    </svg>
                    <svg id="moon-dot-3" className="moon-dot" viewBox="0 0 100 100">
                        <circle cx={50} cy={50} r={50} />
                    </svg>
                    <svg id="light-ray-1" className="light-ray" viewBox="0 0 100 100">
                        <circle cx={50} cy={50} r={50} />
                    </svg>
                    <svg id="light-ray-2" className="light-ray" viewBox="0 0 100 100">
                        <circle cx={50} cy={50} r={50} />
                    </svg>
                    <svg id="light-ray-3" className="light-ray" viewBox="0 0 100 100">
                        <circle cx={50} cy={50} r={50} />
                    </svg>
                    <svg id="cloud-1" className="cloud-dark" viewBox="0 0 100 100">
                        <circle cx={50} cy={50} r={50} />
                    </svg>
                    <svg id="cloud-2" className="cloud-dark" viewBox="0 0 100 100">
                        <circle cx={50} cy={50} r={50} />
                    </svg>
                    <svg id="cloud-3" className="cloud-dark" viewBox="0 0 100 100">
                        <circle cx={50} cy={50} r={50} />
                    </svg>
                    <svg id="cloud-4" className="cloud-light" viewBox="0 0 100 100">
                        <circle cx={50} cy={50} r={50} />
                    </svg>
                    <svg id="cloud-5" className="cloud-light" viewBox="0 0 100 100">
                        <circle cx={50} cy={50} r={50} />
                    </svg>
                    <svg id="cloud-6" className="cloud-light" viewBox="0 0 100 100">
                        <circle cx={50} cy={50} r={50} />
                    </svg>
                </div>
                <div className="stars">
                    <svg id="star-1" className="star" viewBox="0 0 20 20">
                        <path d="M 0 10 C 10 10,10 10 ,0 10 C 10 10 , 10 10 , 10 20 C 10 10 , 10 10 , 20 10 C 10 10 , 10 10 , 10 0 C 10 10,10 10 ,0 10 Z" />
                    </svg>
                    <svg id="star-2" className="star" viewBox="0 0 20 20">
                        <path d="M 0 10 C 10 10,10 10 ,0 10 C 10 10 , 10 10 , 10 20 C 10 10 , 10 10 , 20 10 C 10 10 , 10 10 , 10 0 C 10 10,10 10 ,0 10 Z" />
                    </svg>
                    <svg id="star-3" className="star" viewBox="0 0 20 20">
                        <path d="M 0 10 C 10 10,10 10 ,0 10 C 10 10 , 10 10 , 10 20 C 10 10 , 10 10 , 20 10 C 10 10 , 10 10 , 10 0 C 10 10,10 10 ,0 10 Z" />
                    </svg>
                    <svg id="star-4" className="star" viewBox="0 0 20 20">
                        <path d="M 0 10 C 10 10,10 10 ,0 10 C 10 10 , 10 10 , 10 20 C 10 10 , 10 10 , 20 10 C 10 10 , 10 10 , 10 0 C 10 10,10 10 ,0 10 Z" />
                    </svg>
                </div>
            </div>
        </label>
    )
}

export default Switch;