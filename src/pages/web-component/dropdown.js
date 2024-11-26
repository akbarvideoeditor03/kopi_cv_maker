import React, { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";

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
                <RouterLink to='/login'>Login</RouterLink>
                <ScrollLink>Erere</ScrollLink>
                <ScrollLink>Erere</ScrollLink>
                <ScrollLink>Erere</ScrollLink>
            </ul>
        </div>
    )
}

export default Dropdown;