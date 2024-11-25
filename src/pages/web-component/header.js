import React from "react";
import Dropdown from "./dropdown";
import { Link } from "react-router-dom";

function WebHeader() {
    return (
        <nav>
            <section className="nav nav-s">
                <div className="container col-f">
                    <div className="container col-f">
                        <Link to="/">
                            <img className="header-img" src="./assets/icon/Logo-bw.png" alt="logo-bw.png" />
                        </Link>
                    </div>
                </div>
                <Dropdown />
            </section>
            <section className="nav nav-l fw6 f-center-c">
                <div className="container col-f f-1 nav-max">
                    <Link to="/">
                        <img className="header-img" src="./assets/icon/Logo-bw.png" alt="logo-bw.png" />
                    </Link>
                </div>
                <div className="container col-f">
                    <Link to='/login'>Login</Link>
                </div>
            </section>
        </nav>
    )
}

export default WebHeader;