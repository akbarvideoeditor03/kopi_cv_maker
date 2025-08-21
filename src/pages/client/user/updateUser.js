import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { getUserId, updateUser } from '../../../redux/action/user.action';
import { uploadToSupabase } from '../../../redux/action/user.action';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import { useParams } from 'react-router-dom';

const UpdateUserSelf = () => {
    const dispatch = useDispatch();
    const data = localStorage.getItem("dark-mode");
    const token = localStorage.getItem('&l2');
    const role = localStorage.getItem('$f*');
    const id = localStorage.getItem('/v%');
    const { userList, isWebsite, isViews } = useSelector((state) => state.userReducer);
    const [darkMode, setDarkMode] = useState();
    const [userData, setUserData] = useState({
        nama: '',
        no_telp: '',
        alamat: '',
        tentang: '',
        foto_profil: null,
        email: '',
    });

    useEffect(() => {
        if (data === "true") {
            setDarkMode(true);
        }
    }, []);
    
    useEffect(() => {
        dispatch(getUserId(id, role));
    }, [dispatch, id, role]);

    useEffect(() => {
        if (userList) {
            setUserData({
                nama: userList.nama || '',
                no_telp: userList.no_telp || '',
                alamat: userList.alamat || '',
                tentang: userList.tentang || '',
                foto_profil: null,
                email: userList.email || '',
            });
        }
    }, [userList]);

    useEffect(() => {
        const warn = document.getElementById('warn');
        if (wordCount > 100) {
            warn.classList.add("c-red", "fwd");
        } else {
            warn.classList.remove("c-red", "fwd");
        }
    })

    const wordCount = userData.tentang
        .trim()
        .split(/\s+/)
        .filter(Boolean).length;
    const cancelSubmit = async (e) => {
        e.preventDefault();
        Swal.fire({
            title: 'Yakin mau batal?',
            text: 'Perubahan kamu bakal hilang loh...',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Iya',
            cancelButtonText: 'Lanjutin',
        }).then((result) => {
            if (result.isConfirmed) {
                window.location.href = '/home';
            }
        });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (userData.foto_profil === null || userData.foto_profil === '') {
                const result = await Swal.fire({
                    icon: 'question',
                    title: 'Update data?',
                    text: 'Yakin datanya sudah benar?',
                    showCancelButton: true,
                    allowOutsideClick: false,
                    confirmButtonText: 'Iya, udah',
                    cancelButtonText: 'Lanjutin',
                });

                if (result.isConfirmed) {
                    const userId = userList.id
                    const updatedUser = {
                        nama: userData.nama,
                        no_telp: userData.no_telp,
                        alamat: userData.alamat,
                        tentang: userData.tentang,
                        email: userData.email,
                    };
                    dispatch(updateUser(id, role, userId, updatedUser));
                }
            } else {
                const result = await Swal.fire({
                    icon: 'question',
                    title: 'Update data?',
                    text: 'Yakin datanya sudah benar?',
                    showCancelButton: true,
                    allowOutsideClick: false,
                    confirmButtonText: 'Iya, udah',
                    cancelButtonText: 'Lanjutin',
                });
                if (result.isConfirmed) {
                    Swal.fire({
                        title: 'Sebentar...',
                        html: '<div className="custom-loader"></div>',
                        allowOutsideClick: false,
                        allowEscapeKey: false,
                        didOpen: () => {
                            Swal.showLoading();
                        },
                    });
                    try {
                        const file = userData.foto_profil;
                        const fileParts = file.name
                            .split('.')
                            .filter(Boolean);
                        const fileName = fileParts.slice(0, -1).join('.');
                        const fileType = fileParts.slice(-1);
                        const timestamp = new Date().toISOString();
                        const newFileName = `${fileName} ${timestamp}.${fileType}`;

                        let foto = null;
                        foto = await uploadToSupabase(newFileName, file);

                        const userId = userList.id;
                        const updatedUser = {
                            nama: userData.nama,
                            no_telp: userData.no_telp,
                            alamat: userData.alamat,
                            tentang: userData.tentang,
                            foto_profil: foto,
                            email: userData.email,
                        };
                        dispatch(updateUser(id, role, userId, updatedUser));
                    } catch (error) {
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: 'Terjadi kesalahan saat memperbarui data.',
                            timer:2000
                        }).then(() => {
                            Swal.close();
                            window.location.reload();
                        });
                    }
                }
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: error.message || 'Gagal memperbarui data pengguna',
            });
        }
    };

    if (token && (role === isViews || role === isWebsite)) {
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
                                            placeholder="Deskripsikan Tentang Anda"
                                        />
                                        <p
                                            style={{
                                                fontSize: 'small',
                                            }}
                                        >
                                            Jumlah kata : <span id='warn'>{`${wordCount}`}</span>
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
                                    <div className="container row-f f-wrap">
                                        <button
                                            onClick={cancelSubmit}
                                            style={{
                                                fontSize: '1rem',
                                            }}
                                            className="btn btn-danger f-1"
                                        >
                                            Batal
                                        </button>
                                        <button
                                            style={{
                                                fontSize: '1rem',
                                            }}
                                            type="submit"
                                            className="btn btn-primary f-1"
                                        >
                                            Perbarui
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className="container col-f f-center-c t-center m-t2">
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
                        <div className={`${darkMode ? 'login-img-dark' : 'login-img-light'}`}></div>
                    </div>
                </section>
            </main>
        );
    } else {
        window.location.href = `/user/login`;
    }
};

export default UpdateUserSelf;
