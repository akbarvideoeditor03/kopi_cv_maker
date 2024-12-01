import React from "react";
import Dropdown from "./dropdown";
import { Link as RouterLink } from "react-router-dom";

function WebHeader() {
    return (
        <nav>
            <section className="nav nav-s">
                <div className="container col-f">
                    <div className="container col-f">
                        <RouterLink to="/">
                            <img className="header-img" src="https://raw.githubusercontent.com/akbarvideoeditor03/FE/refs/heads/master/public/assets/icon/Logo-bw.png" alt="logo-bw.png" />
                        </RouterLink>
                    </div>
                </div>
                <Dropdown />
            </section>
            <section className="nav nav-l fw6 f-center-c">
                <div className="container col-f f-1 nav-max">
                    <RouterLink to="/">
                        <img className="header-img" src="https://raw.githubusercontent.com/akbarvideoeditor03/FE/refs/heads/master/public/assets/icon/Logo-bw.png" alt="logo-bw.png" />
                    </RouterLink>
                </div>
                <div className="container col-f">
                    <RouterLink to='/home'>Home</RouterLink>
                </div>
                <div className="container col-f">
                    <RouterLink to='/register'>Daftar</RouterLink>
                </div>
            </section>
        </nav>
    )
}

export default WebHeader;