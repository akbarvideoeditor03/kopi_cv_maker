import React from "react";
import Dropdown from "./dropdown";
import Swal from "sweetalert2";

function WebHeader() {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('user');
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
                {token ? (
                    <div className="container row-f">
                        <div className="container col-f">
                            <a href='/user'>Pengguna</a>
                        </div>
                        <div className="container col-f">
                            <button className="btn btn-danger" onClick={() => {
                                localStorage.clear();
                                Swal.fire({
                                    icon: "success",
                                    title: "Selamat",
                                    text: "Akun berhasil keluar",
                                    showConfirmButton: false,
                                    timer: 3000,
                                    allowEscapeKey: false,
                                    allowOutsideClick: false,
                                    timerProgressBar: true,
                                }).then(() => {
                                    Swal.close();
                                    window.location = '/user/login';
                                });
                                }}>
                                Keluar
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="container row-f">
                        <div className="container col-f">
                            <a href='/home'>Beranda</a>
                        </div>
                        <div className="container col-f">
                            <a href='/user/register'>Daftar</a>
                        </div>
                        <div className="container col-f">
                            <a href='/user/login'>Masuk</a>
                        </div>
                    </div>
                )}
            </section>
        </nav>
    )
}

export default WebHeader;