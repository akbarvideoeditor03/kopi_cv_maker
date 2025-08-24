import React, { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { postUserLogin, otpRequestCode, getUserId } from '../../redux/action/user.action';
import Swal from 'sweetalert2';
import 'animate.css';

function Login() {
    const dispatch = useDispatch();
    const data = localStorage.getItem("dark-mode");
    const token = localStorage.getItem('&l2');
    const role = localStorage.getItem('$f*');
    const id = localStorage.getItem('/v%');
    const [darkMode, setDarkMode] = useState();
    const { userList } = useSelector((state) => state.userReducer);
    const [userData, setUserData] = useState({
        email: '',
        password: '',
    });

    useEffect(() => {
        if (data === "true") {
            setDarkMode(true);
        }
    }, []);

    useEffect(() => {
        if (token) {
            dispatch(getUserId(id, role))
        }
    }, [dispatch, id, role])

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

        if (!userData.password) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Password wajib diisi',
            });
            return;
        }

        if (userData.password.length < 8) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Password kurang lengkap. Minimal 8 karakter',
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
            const userLogin = {
                email: userData.email,
                password: userData.password,
            };
            dispatch(postUserLogin(userLogin));
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Terjadi kesalahan. Coba lagi',
            }).then(() => {
                Swal.close()
            });
        }
    };

    const infoAkun = () => {
        Swal.fire({
            title: "Cuma buat CV, kok harus login? 🙄",
            html: `
            <div class='container col-f'>
                <p>Sebagai bentuk penghargaan atas waktu dan upaya Anda dalam menyusun CV di situs ini, kami menyimpan data Anda secara aman agar dapat diakses kembali kapan pun dibutuhkan.</p>
                <sub class='t-italic'>Admin KOPI</sub>
            </div>
            `,
            showClass: {
                popup: `
                animate__animated
                animate__fadeInUp
                animate__faster
                `
            },
            hideClass: {
                popup: `
                animate__animated
                animate__fadeOutDown
                animate__faster
                `
            }
        });
    }

    const handleSubmitWithEmail = (e) => {
        e.preventDefault();
        if (userList.email) {
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
                const emailReq = {
                    email: userList.email,
                };
                dispatch(otpRequestCode(emailReq));
            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Terjadi kesalahan. Coba lagi',
                }).then(() => {
                    Swal.close()
                });
            }
        }
    };

    return (
        <main className="container col-f f-center-c">
            <section
                id="login"
                className="card container row-f f-wrap-r full-width section-max">
                <div className="container col-f login-left f-1 f-between">
                    <div className="container col-f">
                        <h1>Masuk <i className="bi-question-circle fwb" onClick={infoAkun}></i></h1>
                        <div className="container f-center-c" style={{ minHeight: '7.5rem' }}>
                            <img
                                className="login-icon"
                                src="/assets/icon/Logo-bw.png"
                                alt=""
                            />
                        </div>
                        <div className="container col-f f-center-c">
                            <form
                                onSubmit={handleSubmit}
                                className="container col-f form-max-width"
                            >
                                <div className="container col-f-0">
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
                                <div className="container col-f-0">
                                    <label>Password</label>
                                    <input
                                        name="password"
                                        value={userData.password}
                                        onChange={(e) =>
                                            setUserData({
                                                ...userData,
                                                [e.target.name]: e.target.value,
                                            })
                                        }
                                        type="password"
                                        placeholder="Masukkan Password"
                                    />
                                </div>
                                {
                                    token ? <button className='btn-reset-pw' onClick={handleSubmitWithEmail}>Reset Password?</button> :
                                        <div className="container col-f-0 f-center-r">
                                            <a href="/user/otprequest">Reset Password?</a>
                                        </div>
                                }
                                <button
                                    style={{
                                        fontSize: '1rem',
                                    }}
                                    type="submit"
                                    className="btn btn-primary"
                                >
                                    Masuk
                                </button>
                            </form>
                            <div className="container col-f form-max-width">
                                <div className="container row-f">
                                    <div className="container col-f f-center-c f-1">
                                        <div className="line"></div>
                                    </div>
                                    <div className="container col-f">
                                        <p>Belum punya Akun?</p>
                                    </div>
                                    <div className="container col-f f-center-c f-1">
                                        <div className="line"></div>
                                    </div>
                                </div>
                                <RouterLink
                                    to="/user/register"
                                    className="t-center btn btn-primary-b"
                                >
                                    Daftar
                                </RouterLink>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container col-f f-center-c login-right">
                    <div className={`${darkMode ? 'login-img-dark' : 'login-img-light'}`}></div>
                </div>
            </section>
        </main>
    );
}

export default Login;
