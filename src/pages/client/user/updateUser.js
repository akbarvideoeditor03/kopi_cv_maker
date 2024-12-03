import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { getUserId, updateUser } from "../../../redux/action/user.action";
import { uploadToSupabase } from "../../../redux/action/user.action";
import { useDispatch, useSelector } from "react-redux";
import { Link as RouterLink } from "react-router-dom";
import { useParams } from "react-router-dom";

const UpdateUserSelf = ({ userId }) => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { userList } = useSelector((state) => state.userReducer);
    useEffect(() => {
        dispatch(getUserId(id));
    }, [dispatch, id]);
    const [userData, setUserData] = useState({
        nama: "",
        no_telp: "",
        alamat: "",
        tentang: "",
        foto_profil: null,
        email: "",
    });

    useEffect(() => {
        if (userId) {
            dispatch(getUserId(userId));
        }
    }, [dispatch, userId]);

    useEffect(() => {
        if (userList) {
            setUserData({
                nama: userList.nama || "",
                no_telp: userList.no_telp || "",
                alamat: userList.alamat || "",
                tentang: userList.tentang || "",
                foto_profil: null,
                email: userList.email || ""
            });
        }
    }, [userList]);

    const wordCount = userData.tentang.trim().split(/\s+/).filter(Boolean).length;
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (wordCount > 100) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: `Tentang tidak boleh lebih dari 100 kata. Saat ini ada ${wordCount} kata.`,
            });
            return;
        }

        try {
            if (userData.foto_profil === null || userData.foto_profil === "" ) {
                const updatedUser = {
                    nama: userData.nama,
                    no_telp: userData.no_telp,
                    alamat: userData.alamat,
                    tentang: userData.tentang,
                    email: userData.email
                }

                Swal.fire({
                    title: 'Update data?',
                    text: "Yakin datanya sudah benar?",
                    icon: 'question',
                    showCancelButton: true,
                    confirmButtonText: 'Ya, update!',
                    cancelButtonText: 'Batal',
                }).then((result) => {
                    Swal.fire({
                        title: "Sebentar...",
                        html: '<div className="custom-loader"></div>',
                        allowOutsideClick: false,
                        allowEscapeKey: false,
                        didOpen: () => {
                            Swal.showLoading();
                        },
                    });
                    if (result.isConfirmed) {
                        dispatch(updateUser(id, updatedUser));
                        Swal.fire({
                            icon: 'success',
                            title: 'Berhasil!',
                            text: 'Data berhasil diupdate.',
                            timer: 3000,
                            allowEscapeKey: false,
                            showConfirmButton:false,
                            allowOutsideClick: false,
                            timerProgressBar: true,
                        }).then(() => {
                            window.location = `/user/${id}`;
                        });
                    }
                });
            } else {
                Swal.fire({
                    title: 'Update data?',
                    text: "Yakin datanya sudah benar?",
                    icon: 'question',
                    showCancelButton: true,
                    confirmButtonText: 'Ya, update!',
                    cancelButtonText: 'Batal',
                }).then(async (result) => {
                    if (result.isConfirmed) {
                        Swal.fire({
                            title: "Sebentar...",
                            html: '<div className="custom-loader"></div>',
                            allowOutsideClick: false,
                            allowEscapeKey: false,
                            didOpen: () => {
                                Swal.showLoading();
                            },
                        });
                
                        try {
                            const file = userData.foto_profil;
                            const fileParts = file.name.split('.').filter(Boolean);
                            const fileName = fileParts.slice(0, -1).join('.');
                            const fileType = fileParts.slice(-1);
                            const timestamp = new Date().toISOString();
                            const newFileName = `${fileName} ${timestamp}.${fileType}`;
                
                            let foto = null;
                            foto = await uploadToSupabase(newFileName, file);
                
                            const updatedUser = {
                                nama: userData.nama,
                                no_telp: userData.no_telp,
                                alamat: userData.alamat,
                                tentang: userData.tentang,
                                foto_profil: foto,
                                email: userData.email,
                            };
                
                            dispatch(updateUser(id, updatedUser));
                
                            Swal.fire({
                                icon: 'success',
                                title: 'Berhasil!',
                                text: 'Data berhasil diupdate.',
                                timer: 3000,
                                showConfirmButton: false,
                                allowEscapeKey: false,
                                allowOutsideClick: false,
                                timerProgressBar: true,
                            }).then(() => {
                                window.location = `/user/${id}`;
                            });
                        } catch (error) {
                            Swal.fire({
                                icon: 'error',
                                title: 'Oops...',
                                text: 'Terjadi kesalahan saat memperbarui data.',
                            });
                        }
                    }
                });                                
            }
        } catch (error) {
            Swal.fire({ icon: "error", title: "Oops...", text: error.message || "Gagal memperbarui data pengguna" });
        }

    };


    return (
        <main className="container col-f f-center-c">
            <section className="card container row-f f-wrap-r full-width section-max">
                <div className="container col-f login-left f-1 f-between">
                    <div className="container col-f">
                        <h1>Edit Data</h1>
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
                                        style={{marginBottom : '0.5rem'}}
                                        className="textarea"
                                        name="tentang"
                                        value={userData.tentang}
                                        onChange={(e) => setUserData({ ...userData, [e.target.name]: e.target.value })}
                                        type="text"
                                        placeholder="Deskripsikan Tentang Anda. Maks. 100 kata"
                                    />
                                    <p style={{fontSize : 'small'}}>Jumlah kata : <b>{`${wordCount}`}</b></p>
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
                                <button
                                    style={{ fontSize: "1rem" }}
                                    type="submit"
                                    className="btn btn-primary"
                                >
                                    Perbarui
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
                <div className="container col-f f-center-c login-right">
                    <img className="login-img" src="https://raw.githubusercontent.com/akbarvideoeditor03/FE/3b0ef52d2ac1ed162d41f4df30ea58fde0828880/public/assets/images/login-image.svg" alt="login-img" />
                </div>
            </section>
        </main>
    );
};

export default UpdateUserSelf;
