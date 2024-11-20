import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Dropdown() {
    return(
        <section className="nav nav-s">
            <div className="container col-f f-1">
                <Link to="/">Halo</Link>
            </div>
            <button className="hamburger-btn">≡</button>
        </section>
    )
}

export default Dropdown;