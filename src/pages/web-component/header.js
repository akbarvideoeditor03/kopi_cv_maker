import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getUserId, otpRequestCode } from '../../redux/action/user.action';
import Dropdown from './dropdown';
import Swal from 'sweetalert2';
import Switch from './switch';

function WebHeader() {
    const dispatch = useDispatch();
    const { isWebsite, isViews } = useSelector((state) => state.userReducer);
    const J$P7 = localStorage.getItem('&l2');
    const $s0M = localStorage.getItem('$f*');
    const $Yd0 = localStorage.getItem('/v%');
    const { userList } = useSelector((state) => state.userReducer);

    useEffect(() => {
        if(J$P7 && $s0M && $Yd0) {
            dispatch(getUserId($Yd0, $s0M));
        }
    }, [dispatch, $Yd0, $s0M]);

    const sentEmail = (e) => {
        e.preventDefault();
        if(J$P7 && $s0M && $Yd0) {
            const emailReq = {
                email : userList?.email
            };
            dispatch(otpRequestCode(emailReq));
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
                    setTimeout(() => {
                        window.location.href = '/';
                    }, 2000);
                });
            }
        });
    };

    const renderMenu = () => {
        if (J$P7 && $s0M === isWebsite) {
            return (
                <>
                    <div className="container col-f"><a href="/dashboard">Dashboard</a></div>
                    <div className="container col-f"><a href="/bantuan">Bantuan</a></div>
                    <div className="container col-f"><a href="/tentang">Tentang</a></div>
                    <div className="container row-f">
                        <button className="btn btn-danger" onClick={handleLogout}>Keluar</button>
                        {
                            J$P7 && $s0M && $Yd0 ? 
                            <button className='btn btn-info-b' onClick={sentEmail}>
                                Ganti Password
                            </button>
                            : ``
                        }
                    </div>
                </>
            );
        }

        if (J$P7 && $s0M === isViews) {
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
