import React, { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createUser, uploadToSupabase } from "../../redux/action/user.action";
import Swal from "sweetalert2";

const CreateUser = () => {
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

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!userData.nama || !userData.email || !userData.password) {
            alert("Nama, email, dan password wajib diisi!");
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
            if (userData.foto_profil) {
                const file = userData.foto_profil;
                await uploadToSupabase(file);
            }

            const newUser = {
                ...userData,
                // Belum bisa unggah nama foto ke database karna type file object, bukan string. Foto sudah bisa diunggah ke supabase
            }
            dispatch(createUser(newUser));
            Swal.fire({
                icon: "success",
                title: "Selamat",
                text: "Akun berhasil dibuat",
            });
            setUserData({
                nama: "",
                no_telp: "",
                alamat: "",
                tentang: "",
                foto_profil: "",
                email: "",
                password: ""
            });
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Something went wrong!",
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
                                    className="textarea"
                                        name="tentang"
                                        value={userData.tentang}
                                        onChange={(e) => setUserData({ ...userData, [e.target.name]: e.target.value })}
                                        type="text"
                                        placeholder="Deskripsikan Tentang Anda. Maks. 100 kata"
                                    />
                                </div>
                                <div className="container col-f-0">
                                    <label>Foto Profil</label>
                                    <input
                                        name="foto_profil"
                                        onChange={(e) => setUserData({ ...userData, foto_profil: e.target.files[0]})}
                                        type="file"
                                        accept="image/*"
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
            </section>
        </main>
    );
};

export default CreateUser;
