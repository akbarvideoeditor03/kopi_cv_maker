import React, { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
    createUserSelf,
    uploadToSupabase,
} from '../../redux/action/user.action';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { gLogin} from '../../redux/action/user.action';
import Swal from 'sweetalert2';

const Register = () => {
    const dispatch = useDispatch();
    const data = localStorage.getItem("dark-mode");
    const [darkMode, setDarkMode] = useState();
    useEffect(() => {
        if (data === "true") {
            setDarkMode(true);
        }
    }, []);

    const [userData, setUserData] = useState({
        nama: '',
        no_telp: '',
        alamat: '',
        tentang: '',
        foto_profil: '',
        email: '',
        password: '',
    });

    const wordCount = userData.tentang
        .trim()
        .split(/\s+/)
        .filter(Boolean).length;

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!userData.nama) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Nama wajib diisi',
            });
            return;
        }

        if (!userData.no_telp) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Nomor telepon wajib diisi',
            });
            return;
        }

        if (userData.no_telp && !/^\d{11,13}$/.test(userData.no_telp)) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Nomor telepon tidak valid!. Harus berupa angka 11 - 13 digit',
            });
            return;
        }

        if (!userData.alamat) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Alamat wajib diisi',
            });
            return;
        }

        if (!userData.tentang) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Tentang wajib diisi',
            });
            return;
        }

        if (!userData.foto_profil) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Wajib unggah foto profil',
            });
            return;
        }

        if (
            !['image/jpg', 'image/jpeg', 'image/png'].includes(
                userData.foto_profil.type
            )
        ) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Format foto profil tidak valid',
            });
            return;
        }

        if (!userData.email) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Email wajib diisi',
            });
            return;
        }

        if (!/\S+@\S+\.\S+/.test(userData.email)) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Format email tidak valid',
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

            if (userData.foto_profil) {
                const file = userData.foto_profil;
                const fileParts = file.name.split('.').filter(Boolean);
                const fileName = fileParts.slice(0, -1).join('.');
                const fileType = fileParts.slice(-1);
                const timestamp = new Date().toISOString();
                const newFileName = fileName + ' ' + timestamp + '.' + fileType;

                let foto = null;
                foto = await uploadToSupabase(newFileName, file);

                const newUser = {
                    nama: userData.nama,
                    no_telp: userData.no_telp,
                    alamat: userData.alamat,
                    tentang: userData.tentang,
                    foto_profil: foto,
                    email: userData.email,
                    password: userData.password,
                };

                dispatch(createUserSelf(newUser));
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',
            });
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
                Swal.fire({
                    icon: 'error',
                    title: 'Google Login Gagal',
                    text: `Terjadi kesalahan saat mencoba login dengan Google. ${error}`,
                    showConfirmButton: true,
                });
            }
        };

    return (
        <main className="container col-f f-center-c">
            <section className="card container row-f f-wrap-r full-width section-max">
                <div className="container col-f login-left f-1 f-between">
                    <div className="container col-f">
                        <h1>Daftar</h1>
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
                                    <label>Nama</label>
                                    <input
                                        name="nama"
                                        value={userData.nama}
                                        onChange={(e) =>
                                            setUserData({
                                                ...userData,
                                                [e.target.name]: e.target.value,
                                            })
                                        }
                                        type="text"
                                        placeholder="Masukkan Nama Anda"
                                    />
                                </div>
                                <div className="container col-f-0">
                                    <label>Nomor Telepon</label>
                                    <input
                                        name="no_telp"
                                        value={userData.no_telp}
                                        onChange={(e) =>
                                            setUserData({
                                                ...userData,
                                                [e.target.name]: e.target.value,
                                            })
                                        }
                                        type="text"
                                        placeholder="Masukkan Nomor Telepon Anda"
                                    />
                                </div>
                                <div className="container col-f-0">
                                    <label>Alamat</label>
                                    <input
                                        name="alamat"
                                        value={userData.alamat}
                                        onChange={(e) =>
                                            setUserData({
                                                ...userData,
                                                [e.target.name]: e.target.value,
                                            })
                                        }
                                        type="text"
                                        placeholder="Masukkan Alamat Anda"
                                    />
                                </div>
                                <div className="container col-f-0">
                                    <label>Tentang</label>
                                    <textarea
                                        style={{
                                            marginBottom: '0.5rem',
                                        }}
                                        className="textarea"
                                        name="tentang"
                                        value={userData.tentang}
                                        onChange={(e) =>
                                            setUserData({
                                                ...userData,
                                                [e.target.name]: e.target.value,
                                            })
                                        }
                                        type="text"
                                        placeholder="Deskripsikan Tentang Anda. Maks. 100 kata"
                                    />
                                    <p
                                        style={{
                                            fontSize: 'small',
                                        }}
                                    >
                                        Jumlah kata : <b>{`${wordCount}`}</b>
                                    </p>
                                </div>
                                <div className="container col-f-0">
                                    <label>Foto Profil</label>
                                    <input
                                        className="full-width"
                                        name="foto_profil"
                                        onChange={(e) =>
                                            setUserData({
                                                ...userData,
                                                foto_profil: e.target.files[0],
                                            })
                                        }
                                        type="file"
                                        accept="image/jpeg, image/png"
                                        placeholder="Unggah Foto Profil Anda"
                                    />
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
                                        placeholder="Masukkan Email Anda"
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
                                        placeholder="Masukkan Password (min 8 karakter)"
                                    />
                                </div>
                                <button
                                    style={{
                                        fontSize: '1rem',
                                    }}
                                    type="submit"
                                    className="btn btn-primary"
                                >
                                    Daftar
                                </button>
                            </form>
                            <div className="container col-f form-max-width">
                                <div className="container row-f">
                                    <div className="container col-f f-center-c f-1">
                                        <div className="line"></div>
                                    </div>
                                    <div className="container col-f">
                                        <p>Sudah punya Akun?</p>
                                    </div>
                                    <div className="container col-f f-center-c f-1">
                                        <div className="line"></div>
                                    </div>
                                </div>
                                <RouterLink
                                    to="/user/login"
                                    className="t-center btn btn-primary-b"
                                >
                                    Masuk
                                </RouterLink>
                                <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
                                    <div className='container col-f full-width'>
                                        <GoogleLogin
                                            context='signup'
                                            logo_alignment='center'
                                            shape='pill'
                                            size='large'
                                            text='signup_with'
                                            onSuccess={handleGLogin}
                                            onError={() => {
                                                dispatch(setUserData("Gagal Daftar dengan Google. Coba Lagi"));
                                                Swal.fire({
                                                    icon: 'error',
                                                    title: 'Oops...',
                                                    text: 'Gagal Daftar dengan Google!. Coba Lagi',
                                                });
                                            }}
                                            useOneTap
                                        />
                                    </div>
                                </GoogleOAuthProvider>
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
};

export default Register;
