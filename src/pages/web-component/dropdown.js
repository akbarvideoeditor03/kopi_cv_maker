import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';

function Dropdown() {
    const { isWebsite } = useSelector((state) => state.userReducer);
    const roleUser = isWebsite;
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    const [isOpen, setIsOpen] = useState(false);
    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };
    const closeDropdown = (event) => {
        if (event.target.closest('.dropdown') === null) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('click', closeDropdown);
        return () => {
            document.removeEventListener('click', closeDropdown);
        };
    }, []);

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

    if (token && role === roleUser) {
        return (
            <div className="dropdown">
                <button className="hamburger-btn" onClick={toggleDropdown}>
                    ≡
                </button>
                <ul className={`dropdown-menu ${isOpen ? 'open' : ''}`}>
                    <a href="/#">Dashboard</a>
                    <a href="/user">Pengguna</a>
                    <button
                        className="btn-dropdown full-width"
                        onClick={handleLogout}
                    >
                        Keluar
                    </button>
                </ul>
            </div>
        );
    } else if (token && role === 'user') {
        return (
            <div className="dropdown">
                <button className="hamburger-btn" onClick={toggleDropdown}>
                    ≡
                </button>
                <ul className={`dropdown-menu ${isOpen ? 'open' : ''}`}>
                    <a href="/">Beranda</a>
                    <a href="/home">CV Saya</a>
                    <a href="/pelajari">Pelajari Lebih Lanjut</a>
                    <a href="/bantuan">Bantuan</a>
                    <a href="/tentang">Tentang</a>
                    <button
                        className="btn-dropdown full-width"
                        onClick={handleLogout}
                    >
                        Keluar
                    </button>
                </ul>
            </div>
        );
    } else {
        return (
            <div className="dropdown">
                <button className="hamburger-btn" onClick={toggleDropdown}>
                    ≡
                </button>
                <ul className={`dropdown-menu ${isOpen ? 'open' : ''}`}>
                    <a href="/user/login">Masuk</a>
                    <a href="/user/register">Daftar</a>
                    <a href="/pelajari">Pelajari Lebih Lanjut</a>
                    <a href="/bantuan">Bantuan</a>
                    <a href="/tentang">Tentang</a>
                </ul>
            </div>
        );
    }
}

export default Dropdown;
