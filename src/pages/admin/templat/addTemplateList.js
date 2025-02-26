import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { createTemplat, uploadToSupabase } from '../../../redux/action/user.action';
import Swal from 'sweetalert2';

const addTemplat = () => {
    const { isWebsite } = useSelector((state) => state.userReducer);
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    const roleUser = isWebsite;
    const dispatch = useDispatch();
    const [dataTemplat, setDataTemplat] = useState({
        link_gambar: '',
        caption: '',
        link_page:'',
    });

    const cancelSubmit = async (e) => {
        e.preventDefault();
        Swal.fire({
            title: 'Yakin mau batal?',
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

        if (!dataTemplat.link_gambar) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Wajib unggah gambar',
            });
            return;
        }

        if (!['image/jpg', 'image/jpeg', 'image/png'].includes(
                dataTemplat.link_gambar.type
            )
        ) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Format gambar tidak valid',
            });
            return;
        }

        if (!dataTemplat.caption) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Caption wajib diisi',
            });
            return;
        }

        if (!dataTemplat.link_page) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Link halaman wajib dibuat',
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

            if (dataTemplat.link_gambar) {
                const file = dataTemplat.link_gambar;
                const fileParts = file.name.split('.').filter(Boolean);
                const fileName = fileParts.slice(0, -1).join('.');
                const fileType = fileParts.slice(-1);
                const timestamp = new Date().toISOString();
                const newFileName = fileName + ' ' + timestamp + '.' + fileType;

                let gambarTemplat = null;
                gambarTemplat = await uploadToSupabase(newFileName, file);

                const newTemplat = {
                    link_gambar: gambarTemplat,
                    caption: dataTemplat.caption,
                    link_page: dataTemplat.link_page,
                };

                dispatch(createTemplat(newTemplat));
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',
            });
        }
    };

    if (token && role === roleUser) {
        return (
            <main className="container col-f f-center">
                <div className="card container col-f section-max full-width">
                    <h1>Tambah Galeri Templat</h1>
                    <div className="container col-f">
                        <form
                            onSubmit={handleSubmit}
                            className="container col-f full-width"
                        >
                            <div className="container col-f-0">
                                <label>Foto Templat</label>
                                <input
                                    className="full-width"
                                    name="link_gambar"
                                    onChange={(e) =>
                                        setDataTemplat({
                                            ...dataTemplat,
                                            link_gambar:
                                                e.target.files[0],
                                        })
                                    }
                                    type="file"
                                    accept="image/jpeg, image/png"
                                    placeholder="Unggah Contoh Templat"
                                />
                            </div>
                            <div className="container col-f-0">
                                <label>Caption</label>
                                <input
                                    name="caption"
                                    className="full-width"
                                    value={dataTemplat.caption}
                                    onChange={(e) =>
                                        setDataTemplat({
                                            ...dataTemplat,
                                            [e.target.name]:
                                                e.target.value,
                                        })
                                    }
                                    type="caption"
                                    placeholder="Masukkan Caption Template"
                                />
                            </div>
                            <div className="container col-f-0">
                                <label>Link Halaman</label>
                                <input
                                    name="link_page"
                                    className="full-width"
                                    value={dataTemplat.link_page}
                                    onChange={(e) =>
                                        setDataTemplat({
                                            ...dataTemplat,
                                            [e.target.name]:
                                                e.target.value,
                                        })
                                    }
                                    type="link_page"
                                    placeholder="Masukkan Link Page"
                                />
                                <p
                                    style={{
                                        fontSize: '0.75rem',
                                        paddingTop: '0.5rem',
                                    }}
                                >
                                    Sesuaikan link templat dengan yang ditentukan oleh developer
                                </p>
                            </div>
                            <div className="container row-f">
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
                                    Tambah
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </main>
        );
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Oow...',
            text: 'Akses Dilarang!',
            allowEscapeKey: false,
            allowOutsideClick: false,
            showCancelButton: false,
            confirmButtonText: 'Ok',
        }).then((result) => {
            if (result.isConfirmed) {
                window.location.href = `/user/login`;
            }
        });
    }
};

export default addTemplat;