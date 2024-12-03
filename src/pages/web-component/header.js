import React from "react";
import Dropdown from "./dropdown";

function WebHeader() {
    return (
        <nav>
            <section className="nav nav-s">
                <div className="container col-f">
                    <div className="container col-f">
                        <a href="/">
                            <img className="header-img" src="https://raw.githubusercontent.com/akbarvideoeditor03/FE/refs/heads/master/public/assets/icon/Logo-bw.png" alt="logo-bw.png" />
                        </a>
                    </div>
                </div>
                <Dropdown />
            </section>
            <section className="nav nav-l fw6 f-center-c">
                <div className="container col-f f-1 nav-max">
                    <a href="/">
                        <img className="header-img" src="https://raw.githubusercontent.com/akbarvideoeditor03/FE/refs/heads/master/public/assets/icon/Logo-bw.png" alt="logo-bw.png" />
                    </a>
                </div>
                <div className="container col-f">
                    <a href='/user'>Pengguna</a>
                </div>
                <div className="container col-f">
                    <a href='/home'>Beranda</a>
                </div>
                <div className="container col-f">
                    <a href='/user/register'>Daftar</a>
                </div>
                <div className="container col-f">
                    <a href='/user/login'>Masuk</a>
                </div>
            </section>
        </nav>
    )
}

export default WebHeader;