import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { resetPassword } from '../../redux/action/user.action';
import Swal from 'sweetalert2';

function PasswordReset() {
    const dispatch = useDispatch();
    const [userData, setUserData] = useState({
        email: '',
        otp: '',
        newPassword: '',
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(!userData.email) {
            Swal.fire({
                icon: 'error',
                title: 'Ups...',
                text: 'Email tidak boleh kosong',
                showConfirmButton: false,
                timer: 2000,
                allowEscapeKey: false,
                allowOutsideClick: false,
                timerProgressBar: true,
            });
            return
        }

        if(!userData.otp) {
            Swal.fire({
                icon: 'error',
                title: 'Ups...',
                text: 'OTP tidak boleh kosong',
                showConfirmButton: false,
                timer: 2000,
                allowEscapeKey: false,
                allowOutsideClick: false,
                timerProgressBar: true,
            });
            return
        }

        if(userData.otp.length > 5 || userData.otp.length < 5) {
            Swal.fire({
                icon: 'error',
                title: 'Ups...',
                text: 'OTP harus 5 angka',
                showConfirmButton: false,
                timer: 2000,
                allowEscapeKey: false,
                allowOutsideClick: false,
                timerProgressBar: true,
            });
            return
        }

        if(!userData.newPassword) {
            Swal.fire({
                icon: 'error',
                title: 'Ups...',
                text: 'Password tidak boleh kosong',
                showConfirmButton: false,
                timer: 2000,
                allowEscapeKey: false,
                allowOutsideClick: false,
                timerProgressBar: true,
            });
            return
        }

        if(userData.newPassword.length < 8) {
            Swal.fire({
                icon: 'error',
                title: 'Ups...',
                text: 'Password kurang lengkap. Minimal 8 karakter',
                showConfirmButton: false,
                timer: 2000,
                allowEscapeKey: false,
                allowOutsideClick: false,
                timerProgressBar: true,
            });
            return
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
            const makeNewPassword = {
                email: userData.email,
                otp: userData.otp,
                newPassword: userData.newPassword
            };
            dispatch(resetPassword(makeNewPassword));
        } catch (error) {
            console.log(error);
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
                                <div className='card-mini m-b1'>
                                    <p><i className="bi-emoji-smile"></i> Buat password-nya hati-hati ya...</p>
                                </div>
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
                                    <label>Kode OTP</label>
                                    <input
                                        name="otp"
                                        value={userData.otp}
                                        onChange={(e) =>
                                            setUserData({
                                                ...userData,
                                                [e.target.name]: e.target.value,
                                            })
                                        }
                                        type="text"
                                        placeholder="Masukkan kode OTP"
                                    />
                                </div>
                                <div className="container col-f-0">
                                    <label>Password Baru</label>
                                    <input
                                        name="newPassword"
                                        value={userData.newPassword}
                                        onChange={(e) =>
                                            setUserData({
                                                ...userData,
                                                [e.target.name]: e.target.value,
                                            })
                                        }
                                        type="password"
                                        placeholder="Masukkan Password Baru"
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

export default PasswordReset;