import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { getDataId, updateData } from '../../redux/action/user.action';
import { uploadToSupabase } from '../../redux/action/user.action';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const UpdateUserAdmin = ({ userId }) => {
    const dispatch = useDispatch();
    const param = useParams();
    const token = localStorage.getItem('&l2');
    const role = localStorage.getItem('$f*');
    const idAdm = localStorage.getItem('/v%');
    const data = localStorage.getItem("dark-mode");
    const { userData, isWebsite } = useSelector((state) => state.userReducer);
    const [darkMode, setDarkMode] = useState();
    useEffect(() => {
        if (data === "true") {
            setDarkMode(true);
        }
    }, []);
    const [userDataId, setUserDataId] = useState({
        nama: '',
        no_telp: '',
        alamat: '',
        tentang: '',
        foto_profil: null,
        email: '',
    });

    useEffect(() => {
        dispatch(getDataId(idAdm, role, param.id));
    }, [dispatch, idAdm, role, param.id]);


    useEffect(() => {
        if (userData) {
            setUserDataId({
                nama: userData.nama || '',
                no_telp: userData.no_telp || '',
                alamat: userData.alamat || '',
                tentang: userData.tentang || '',
                foto_profil: null,
                email: userData.email || '',
            });
        }
        }, [userData]);

    const wordCount = (userDataId?.tentang || "")
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
                window.location.href = '/dashboard';
            }
        });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        // if (wordCount > 100) {
        //     Swal.fire({
        //         icon: 'error',
        //         title: 'Oops...',
        //         text: `Tentang tidak boleh lebih dari 100 kata. Saat ini ada ${wordCount} kata.`,
        //     });
        //     return;
        // }

        try {
            if (userDataId.foto_profil === null || userDataId.foto_profil === '') {
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
                    const updatedUser = {
                        nama: userDataId.nama,
                        no_telp: userDataId.no_telp,
                        alamat: userDataId.alamat,
                        tentang: userDataId.tentang,
                        email: userDataId.email,
                    };
                    dispatch(updateData(idAdm, role, param.id, updatedUser));
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
                        const file = userDataId.foto_profil;
                        const fileParts = file.name
                            .split('.')
                            .filter(Boolean);
                        const fileName = fileParts.slice(0, -1).join('.');
                        const fileType = fileParts.slice(-1);
                        const timestamp = new Date().toISOString();
                        const newFileName = `${fileName} ${timestamp}.${fileType}`;

                        let foto = null;
                        foto = await uploadToSupabase(newFileName, file);

                        const updatedUser = {
                            nama: userDataId.nama,
                            no_telp: userDataId.no_telp,
                            alamat: userDataId.alamat,
                            tentang: userDataId.tentang,
                            foto_profil: foto,
                            email: userDataId.email,
                        };
                        dispatch(updateData(idAdm, role, param.id, updatedUser));
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

    if (token && isWebsite && idAdm) {
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
                                            value={userDataId.nama}
                                            onChange={(e) =>
                                                setUserDataId({
                                                    ...userDataId,
                                                    [e.target.name]:
                                                        e.target.value,
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
                                            value={userDataId.no_telp}
                                            onChange={(e) =>
                                                setUserDataId({
                                                    ...userDataId,
                                                    [e.target.name]:
                                                        e.target.value,
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
                                            value={userDataId.alamat}
                                            onChange={(e) =>
                                                setUserDataId({
                                                    ...userDataId,
                                                    [e.target.name]:
                                                        e.target.value,
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
                                            value={userDataId.tentang}
                                            onChange={(e) =>
                                                setUserDataId({
                                                    ...userDataId,
                                                    [e.target.name]:
                                                        e.target.value,
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
                                            Jumlah kata :{' '}
                                            <b>{`${wordCount}`}</b>
                                        </p>
                                    </div>
                                    <div className="container col-f-0">
                                        <label>Foto Profil</label>
                                        <input
                                            className="full-width"
                                            name="foto_profil"
                                            onChange={(e) =>
                                                setUserDataId({
                                                    ...userDataId,
                                                    foto_profil:
                                                        e.target.files[0],
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
                                            value={userDataId.email}
                                            onChange={(e) =>
                                                setUserDataId({
                                                    ...userDataId,
                                                    [e.target.name]:
                                                        e.target.value,
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

export default UpdateUserAdmin;
