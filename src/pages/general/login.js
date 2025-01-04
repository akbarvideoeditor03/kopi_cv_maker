import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { postUserLogin, gLogin } from '../../redux/action/user.action';
import Swal from 'sweetalert2';

function Login() {
    const dispatch = useDispatch();
    const [userData, setUserData] = useState({
        email: '',
        password: '',
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
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
            console.log(error);
        }
    };

    const handleGLogin = async (response) => {
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
            const googleResponse = {
                token: response.credential,
            };
            dispatch(gLogin(googleResponse));
        } catch (error) {
            console.log('Google Login Error:', error);
            Swal.fire({
                icon: 'error',
                title: 'Google Login Gagal',
                text: 'Terjadi kesalahan saat mencoba login dengan Google.',
                showConfirmButton: true,
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
                        <h1>Masuk</h1>
                        <div className="container f-center-c">
                            <img
                                className="login-icon"
                                src="./assets/icon/logo-bw.png"
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
                                <div className="container col-f-0 f-center-r">
                                    <a href="/user/otprequest">Reset Password?</a>
                                </div>
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
                                <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
                                    <div className='container col-f full-width'>
                                        <GoogleLogin
                                            onSuccess={handleGLogin}
                                            onError={() => {
                                                dispatch(setUserData("Gagal Login dengan Google"));
                                            }}
                                            useOneTap
                                        />
                                    </div>
                                </GoogleOAuthProvider>
                            </div>
                        </div>
                    </div>
                    <div className="container col-f f-center-c t-center">
                        <p>Ada kendala? Yuk beri tahu kami</p>
                        <RouterLink
                            style={{
                                maxWidth: '15rem',
                            }}
                            to="https://wa.link/s4zfm0"
                            target="_blank"
                            className="fwb btn btn-info full-width"
                        >
                            <i className="bi-whatsapp"></i> Admin
                        </RouterLink>
                    </div>
                </div>
                <div className="container col-f f-center-c login-right">
                    <img
                        className="login-img"
                        src="https://raw.githubusercontent.com/akbarvideoeditor03/FE/68410c9b34629247e847d525bc85e3aa2c20dc4f/public/assets/images/login-image.svg"
                        alt="login-img"
                    />
                </div>
            </section>
        </main>
    );
}

export default Login;
