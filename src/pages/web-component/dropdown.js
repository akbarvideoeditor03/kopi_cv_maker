import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';

function Dropdown() {
    const { isWebsite, isViews } = useSelector((state) => state.userReducer);
    const token = localStorage.getItem('&l2');
    const role = localStorage.getItem('$f*');
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const closeDropdown = (event) => {
        if (!event.target.closest('.dropdown')) {
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
                localStorage.removeItem('/v%');
                localStorage.removeItem('$f*');
                localStorage.removeItem('&l2');
                localStorage.removeItem('lastActivity');
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

    const renderMenuItems = () => {
        if (token && isWebsite) {
            return (
                <>
                    <a href="/dashboard">Dashboard</a>
                    <a href="/bantuan">Bantuan</a>
                    <a href="/tentang">Tentang</a>
                    <button className="btn-dropdown full-width" onClick={handleLogout}>
                        Keluar
                    </button>
                </>
            );
        } else if (token && isViews) {
            return (
                <>
                    <a href="/home">CV Saya</a>
                    <a href="/bantuan">Bantuan</a>
                    <a href="/tentang">Tentang</a>
                    <button className="btn-dropdown full-width" onClick={handleLogout}>
                        Keluar
                    </button>
                </>
            );
        } else {
            return (
                <>
                    <a href="/user/login">Masuk</a>
                    <a href="/user/register">Daftar</a>
                    <a href="/bantuan">Bantuan</a>
                    <a href="/tentang">Tentang</a>
                </>
            );
        }
    };

    return (
        <div className="dropdown">
            <button className="hamburger-btn" onClick={toggleDropdown}>
                ≡
            </button>
            <ul className={`dropdown-menu ${isOpen ? 'open' : ''}`}>
                {renderMenuItems()}
            </ul>
        </div>
    );
}

export default Dropdown;
