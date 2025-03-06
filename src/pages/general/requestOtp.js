import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { otpRequestCode, getUserId } from '../../redux/action/user.action';
import Swal from 'sweetalert2';

function RequestOtp() {
    const dispatch = useDispatch();
    const token = localStorage.getItem('token');
    const id = localStorage.getItem('id')
    const data = localStorage.getItem("dark-mode");
    const { userList } = useSelector((state) => state.userReducer);
    const [darkMode, setDarkMode] = useState();

    useEffect(() => {
        dispatch(getUserId(id));
    }, [dispatch, id]);


    useEffect(() => {
        if (data === "true") {
            setDarkMode(true);
        }
    }, []);

    const [userData, setUserData] = useState({
        email: '',
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!userData.email) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Email wajib diisi',
            });
            return;
        }
        try {
            Swal.fire({
                title: 'Sebentar...',
                html: '<div className="custom-loader"></div>',
                allowOutsideClick: false,
                allowEscapeKey: false,
                didOpen: () => {
                    Swal.showLoading();
                },
            });
            const otpReq = {
                email: userData.email,
            };
            dispatch(otpRequestCode(otpReq));
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: `Terjadi kesalahan ${error}. Coba lagi`,
            });
        }
    };

    return (
        <main className="container col-f f-center-c">
        <section
            id="login"
            className="card container row-f f-wrap-r full-width section-max">
            <div className="container col-f login-left f-1 f-between">
                <div className="container col-f">
                    <h1>Minta OTP</h1>
                    <div className="container col-f f-center-c">
                        <form
                            onSubmit={handleSubmit}
                            className="container col-f form-max-width"
                        >
                            <div className="container col-f-0">
                                <div className='card-mini m-b1'>
                                    <p><i className="bi-emoji-smile"></i> Pastikan email kamu terdaftar dan aktif ya...</p>
                                </div>
                                <label>Email</label>
                                <input
                                    name="email"
                                    value={userData.email}
                                    onChange={(e) =>
                                        setUserData({
                                            ...userData,
                                            [e.target.name]: e.target.value,
                                        })
                                    }
                                    type="email"
                                    placeholder="Masukkan Email"
                                />
                            </div>
                            <button
                                style={{
                                    fontSize: '1rem',
                                }}
                                type="submit"
                                className="btn btn-primary"
                            >
                                Kirim
                            </button>
                        </form>
                    </div>
                </div>
            </div>
            <div className="container col-f f-center-c login-right">
                <div className={`${darkMode ? 'login-img-dark' : 'login-img-light'}`}></div>
            </div>
        </section>
    </main>
    )
}

export default RequestOtp;