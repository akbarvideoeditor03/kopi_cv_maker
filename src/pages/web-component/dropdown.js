import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Dropdown() {

    const [isOpen, setIsOpen] = useState(false);
    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    }
    const closeDropdown = (event) => {
        if (event.target.closest('.dropdown') === null) {
            setIsOpen(false);
        }
    }

    useEffect(() => {
        document.addEventListener('click', closeDropdown);
        return () => {
            document.addEventListener('click', closeDropdown);
        };
    }, []);

    return (
        <div className="dropdown">
            <button className="hamburger-btn" onClick={toggleDropdown}>≡</button>
            <ul className={`dropdown-menu ${isOpen ? 'open' : ''}`}>
                <Link to='/login'>Login</Link>
                <Link>Erere</Link>
                <Link>Erere</Link>
                <Link>Erere</Link>
            </ul>
        </div>
    )
}

export default Dropdown;