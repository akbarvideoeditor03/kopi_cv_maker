import React from 'react';
import Dropdown from './dropdown';
import Swal from 'sweetalert2';
import { useSelector } from 'react-redux';

function WebHeader() {
    const { isWebsite } = useSelector((state) => state.userReducer);
    const roleUser = isWebsite;
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');

    const handleLogout = () => {
        Swal.fire({
            title: 'Yakin mau keluar?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Ya',
            cancelButtonText: 'Tidak',
        }).then((result) => {
            if (result.isConfirmed) {
                localStorage.clear();
                Swal.fire({
                    icon: 'success',
                    title: 'Berhasil',
                    text: 'Akun berhasil keluar',
                    timer: 2000,
                    showConfirmButton: false,
                    allowEscapeKey: false,
                    allowOutsideClick: false,
                    timerProgressBar: true,
                }).then(() => {
                    window.location.href = '/';
                });
            }
        });
    };

    return (
        <nav>
            <section className="nav nav-s">
                <div className="container col-f">
                    <div className="container col-f">
                        <a href="/">
                            <img
                                className="header-img"
                                src="https://raw.githubusercontent.com/akbarvideoeditor03/FE/refs/heads/master/public/assets/icon/Logo-bw.png"
                                alt="logo-bw.png"
                            />
                        </a>
                    </div>
                </div>
                <Dropdown />
            </section>
            <section className="nav nav-l fw6 f-center-c">
                <div className="container col-f nav-max">
                    <a href="/">
                        <img
                            className="header-img"
                            src="https://raw.githubusercontent.com/akbarvideoeditor03/FE/refs/heads/master/public/assets/icon/Logo-bw.png"
                            alt="logo-bw.png"
                        />
                    </a>
                </div>
                <div className="f-1"></div>
                <div className="container row-f f-center">
                    {token && role === roleUser && (
                        <>
                            <div className="container col-f">
                                <a href="/dashboard">Dashboard</a>
                            </div>
                            <div className="container col-f">
                                <a href="/bantuan">Bantuan</a>
                            </div>
                            <div className="container col-f">
                                <a href="/tentang">Tentang</a>
                            </div>
                            <div className="container col-f">
                                <button
                                    className="btn btn-danger"
                                    onClick={handleLogout}
                                >
                                    Keluar
                                </button>
                            </div>
                        </>
                    )}
                    {token && role === 'user' && (
                        <>
                            <div className="container col-f">
                                <a href="/home">CV Saya</a>
                            </div>
                            <div className="container col-f">
                                <a href="/bantuan">Bantuan</a>
                            </div>
                            <div className="container col-f">
                                <a href="/tentang">Tentang</a>
                            </div>
                            <div className="container col-f">
                                <button
                                    className="btn btn-danger"
                                    onClick={handleLogout}
                                >
                                    Keluar
                                </button>
                            </div>
                        </>
                    )}
                    {!token && !role && (
                        <div className="container row-f">
                            <div className="container col-f">
                                <a href="/user/register">Daftar</a>
                            </div>
                            <div className="container col-f">
                                <a href="/user/login">Masuk</a>
                            </div>
                            <div className="container col-f">
                                <a href="/bantuan">Bantuan</a>
                            </div>
                            <div className="container col-f">
                                <a href="/tentang">Tentang</a>
                            </div>
                        </div>
                    )}
                </div>
            </section>
        </nav>
    );
}

export default WebHeader;
