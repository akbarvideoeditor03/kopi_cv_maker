import { useSelector } from 'react-redux';
import { jwtDecode } from 'jwt-decode';
import Dropdown from './dropdown';
import Swal from 'sweetalert2';
import Switch from './switch';

function WebHeader() {
    const { isWebsite, isViews } = useSelector((state) => state.userReducer);
    const token = localStorage.getItem('token');

    let decodedToken = null;
    if (token) {
        try {
            decodedToken = jwtDecode(token);
        } catch (error) {
            console.error('Gagal decode token:', error);
        }
    }

    const handleLogout = () => {
        Swal.fire({
            title: 'Yakin mau keluar?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Ya',
            cancelButtonText: 'Tidak',
        }).then((result) => {
            if (result.isConfirmed) {
                localStorage.removeItem('id');
                localStorage.removeItem('role');
                localStorage.removeItem('token');
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

    const renderMenu = () => {
        if (decodedToken?.role === isWebsite) {
            return (
                <>
                    <div className="container col-f"><a href="/dashboard">Dashboard</a></div>
                    <div className="container col-f"><a href="/bantuan">Bantuan</a></div>
                    <div className="container col-f"><a href="/tentang">Tentang</a></div>
                    <div className="container col-f">
                        <button className="btn btn-danger" onClick={handleLogout}>Keluar</button>
                    </div>
                </>
            );
        }

        if (decodedToken?.role === isViews) {
            return (
                <>
                    <div className="container col-f"><a href="/home">CV Saya</a></div>
                    <div className="container col-f"><a href="/bantuan">Bantuan</a></div>
                    <div className="container col-f"><a href="/tentang">Tentang</a></div>
                    <div className="container col-f">
                        <button className="btn btn-danger" onClick={handleLogout}>Keluar</button>
                    </div>
                </>
            );
        }
        return (
            <>
                <div className="container col-f"><a href="/user/register">Daftar</a></div>
                <div className="container col-f"><a href="/user/login">Masuk</a></div>
                <div className="container col-f"><a href="/bantuan">Bantuan</a></div>
                <div className="container col-f"><a href="/tentang">Tentang</a></div>
            </>
        );
    };

    return (
        <nav>
            <section className="nav nav-s">
                <div className="container row-f f-center-c full-width">
                    <div className="container col-f">
                        <a href="/">
                            <img
                                className="header-img"
                                src="/assets/icon/Logo-bw.png"
                                alt="logo-bw.png"
                            />
                        </a>
                    </div>
                    <div className="container col-f f-1" />
                    <Switch />
                    <Dropdown />
                </div>
            </section>

            <section className="nav nav-l fw6 f-center-c">
                <div className="container col-f nav-max">
                    <a href="/">
                        <img
                            className="header-img"
                            src="/assets/icon/Logo-bw.png"
                            alt="logo-bw.png"
                        />
                    </a>
                </div>
                <div className="f-1" />
                <div className="container row-f f-center">
                    <Switch />
                    {renderMenu()}
                </div>
            </section>
        </nav>
    );
}

export default WebHeader;
