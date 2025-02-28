import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { otpRequestCode } from '../../redux/action/user.action';
import Swal from 'sweetalert2';

function RequestOtp() {
    const dispatch = useDispatch();
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
                                <div className="container col-f-0">
                                    <div className='card-mini m-b1'>
                                        <p><i className="bi-emoji-smile"></i> Pastikan email kamu aktif ya...</p>
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

export default RequestOtp;