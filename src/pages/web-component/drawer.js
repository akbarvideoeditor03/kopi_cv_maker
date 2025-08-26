import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserId, otpRequestCode } from '../../redux/action/user.action';
import Swal from 'sweetalert2';

function Drawer() {
    const dispatch = useDispatch();
    const { isWebsite, isViews } = useSelector((state) => state.userReducer);
    const J$P7 = localStorage.getItem('&l2');
    const $s0M = localStorage.getItem('$f*');
    const $Yd0 = localStorage.getItem('/v%');
    const [isOpen, setIsOpen] = useState(false);
    const { userList } = useSelector((state) => state.userReducer);

    const toggleDrawer = () => {
        setIsOpen(!isOpen);
    };

    const closeDrawer = (event) => {
        if (!event.target.closest('.drawer')) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
            if(J$P7 && $s0M && $Yd0) {
                dispatch(getUserId($Yd0, $s0M));
            }
        }, [dispatch, $Yd0, $s0M]);

    const sentEmail = (e) => {
        e.preventDefault();
        Swal.fire({
            icon:'info',
            title:'Tunggu...',
            text:'Yakin, ingin melanjutkan proses ubah password?',
            allowEscapeKey: false,
            allowOutsideClick: false,
            showCancelButton:true,
            cancelButtonText:'Nggak jadi',
            showConfirmButton:true,
            confirmButtonText:'Iya'
        }).then((result) => {
            if((J$P7 && $s0M && $Yd0) && result.isConfirmed) {
                const emailReq = {
                    email: userList?.email
                };
                dispatch(otpRequestCode(emailReq));
            }
        })
    }

    useEffect(() => {
        document.addEventListener('click', closeDrawer);
        return () => {
            document.removeEventListener('click', closeDrawer);
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
                    setTimeout(() => {
                        window.location.href = '/';
                    }, 2000);
                });
            }
        });
    };

    const renderMenuItems = () => {
        if (J$P7 && $Yd0 && $s0M === isWebsite) {
            return (
                <>
                    <a href="/dashboard">Dashboard</a>
                    <a href="/bantuan">Bantuan</a>
                    <a href="/tentang">Tentang</a>
                    {
                        J$P7 && $s0M ?
                            <button className='btn btn-drawer full-width' onClick={sentEmail}>
                                Ganti Password
                            </button>
                            : ``
                    }
                    <button className="btn-drawer full-width" onClick={handleLogout}>
                        Keluar
                    </button>
                </>
            );
        } else if (J$P7 && $Yd0 && $s0M === isViews) {
            return (
                <>
                    <a href="/home">CV Saya</a>
                    <a href="/bantuan">Bantuan</a>
                    <a href="/tentang">Tentang</a>
                    {
                        J$P7 && $s0M ?
                            <button className='btn btn-drawer full-width' onClick={sentEmail}>
                                Ganti Password
                            </button>
                            : ``
                    }
                    <button className="btn-drawer full-width" onClick={handleLogout}>
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
        <div className="drawer">
            <button className="hamburger-btn" onClick={toggleDrawer}>
                ≡
            </button>
            <ul className={`drawer-menu ${isOpen ? 'open' : ''}`}>
                {renderMenuItems()}
            </ul>
        </div>
    );
}

export default Drawer;
