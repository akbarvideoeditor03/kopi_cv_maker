import React from "react";
import Dropdown from "./dropdown";
import { Link } from "react-router-dom";

function WebHeader() {
    return (
        <nav>
            <Dropdown />
            <section className="nav nav-l fw6">
                <div className="container col-f f-1">
                    <Link to="/">Halo</Link>
                </div>
                <div className="container col-f">
                    <Link to='/login'>Login</Link>
                </div>
            </section>
        </nav>
    )
}

export default WebHeader;