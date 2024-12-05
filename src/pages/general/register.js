import React, { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createUserSelf, uploadToSupabase } from "../../redux/action/user.action";
import Swal from "sweetalert2";

const Register = () => {
    const dispatch = useDispatch();
    const [userData, setUserData] = useState({
        nama: "",
        no_telp: "",
        alamat: "",
        tentang: "",
        foto_profil: "",
        email: "",
        password: ""
    });

    const wordCount = userData.tentang.trim().split(/\s+/).filter(Boolean).length;
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!userData.nama) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Nama wajib diisi",
            });
            return;
        }

        if (!userData.no_telp) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Nomor telepon wajib diisi",
            });
            return;
        }

        if (userData.no_telp && !/^\d{11,13}$/.test(userData.no_telp)) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Nomor telepon tidak valid!. Harus berupa angka 11 - 13 digit",
            });
            return;
        }

        if (!userData.alamat) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Alamat wajib diisi",
            });
            return;
        }

        if (!userData.tentang) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Tentang wajib diisi",
            });
            return;
        }

        if (wordCount > 100) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: `Tentang tidak boleh lebih dari 100 kata. Saat ini ada ${wordCount} kata.`,
            });
            return;
        }

        if (!["image/jpg", "image/jpeg", "image/png"].includes(userData.foto_profil.type)) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Format foto profil tidak valid",
            });
            return;
        }

        if (!userData.email) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Email wajib diisi",
            });
            return;
        }


        if (!/\S+@\S+\.\S+/.test(userData.email)) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Format email tidak valid",
            });
            return;
        }

        if (userData.password.length < 8) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Password kurang lengkap. Minimal 8 karakter",
            });
            return;
        }

        try {
            Swal.fire({
                title: "Sebentar...",
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
                const newFileName = fileName + " " + timestamp + "." + fileType;

                let foto = null;
                foto = await uploadToSupabase(newFileName, file);

                const newUser = {
                    nama: userData.nama,
                    no_telp: userData.no_telp,
                    alamat: userData.alamat,
                    tentang: userData.tentang,
                    foto_profil: foto,
                    email: userData.email,
                    password: userData.password
                }

                dispatch(createUserSelf(newUser));

                setUserData({
                    nama: "",
                    no_telp: "",
                    alamat: "",
                    tentang: "",
                    foto_profil: null,
                    email: "",
                    password: ""
                });
                
            }
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Something went wrong!",
            });
        } finally {
            Swal.fire({
                icon: "success",
                title: "Selamat",
                text: "Akun berhasil dibuat",
                showConfirmButton: false,
                timer: 3000,
                allowEscapeKey: false,
                allowOutsideClick: false,
                timerProgressBar: true,
            }).then(() => {
                Swal.close();
                window.location = '/home';
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
                                        onChange={(e) => setUserData({ ...userData, [e.target.name]: e.target.value })}
                                        type="text"
                                        placeholder="Masukkan Nama Anda"
                                    />
                                </div>
                                <div className="container col-f-0">
                                    <label>Nomor Telepon</label>
                                    <input
                                        name="no_telp"
                                        value={userData.no_telp}
                                        onChange={(e) => setUserData({ ...userData, [e.target.name]: e.target.value })}
                                        type="text"
                                        placeholder="Masukkan Nomor Telepon Anda"
                                    />
                                </div>
                                <div className="container col-f-0">
                                    <label>Alamat</label>
                                    <input
                                        name="alamat"
                                        value={userData.alamat}
                                        onChange={(e) => setUserData({ ...userData, [e.target.name]: e.target.value })}
                                        type="text"
                                        placeholder="Masukkan Alamat Anda"
                                    />
                                </div>
                                <div className="container col-f-0">
                                    <label>Tentang</label>
                                    <textarea
                                        style={{ marginBottom: '0.5rem' }}
                                        className="textarea"
                                        name="tentang"
                                        value={userData.tentang}
                                        onChange={(e) => setUserData({ ...userData, [e.target.name]: e.target.value })}
                                        type="text"
                                        placeholder="Deskripsikan Tentang Anda. Maks. 100 kata"
                                    />
                                    <p style={{ fontSize: 'small' }}>Jumlah kata : <b>{`${wordCount}`}</b></p>
                                </div>
                                <div className="container col-f-0">
                                    <label>Foto Profil</label>
                                    <input
                                        className="full-width"
                                        name="foto_profil"
                                        onChange={(e) => setUserData({ ...userData, foto_profil: e.target.files[0] })}
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
                                        onChange={(e) => setUserData({ ...userData, [e.target.name]: e.target.value })}
                                        type="email"
                                        placeholder="Masukkan Email Anda" />
                                </div>
                                <div className="container col-f-0">
                                    <label>Password</label>
                                    <input
                                        name="password"
                                        value={userData.password}
                                        onChange={(e) => setUserData({ ...userData, [e.target.name]: e.target.value })}
                                        type="password"
                                        placeholder="Masukkan Password (min 8 karakter)"
                                    />
                                </div>
                                <button
                                    style={{ fontSize: "1rem" }}
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
                                <RouterLink to="/user/login" className="t-center btn btn-primary">Masuk</RouterLink>
                            </div>
                        </div>
                    </div>
                    <div className="container col-f f-center-c t-center">
                        <p>Ada kendala? Yuk beri tahu kami</p>
                        <RouterLink
                            style={{ maxWidth: "15rem" }}
                            to="https://wa.link/s4zfm0"
                            target="_blank"
                            className="fwb btn btn-info full-width"
                        >
                            <i className="bi-whatsapp"></i> Admin
                        </RouterLink>
                    </div>
                </div>
                <div className="container col-f f-center-c login-right">
                    <img className="login-img" src="https://raw.githubusercontent.com/akbarvideoeditor03/FE/3b0ef52d2ac1ed162d41f4df30ea58fde0828880/public/assets/images/login-image.svg" alt="login-img" />
                </div>
            </section>
        </main>
    );
};

export default Register;
