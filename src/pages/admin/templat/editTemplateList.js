import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { viewAllTemplateId, updateTemplat, uploadToSupabase } from '../../../redux/action/user.action';
import { useParams } from "react-router-dom";
import Swal from 'sweetalert2';

function EditTemplat() {
    const { isWebsite } = useSelector((state) => state.userReducer);
    const dispatch = useDispatch();
    const { id } = useParams();
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    const roleUser = isWebsite;
    const { templatList } = useSelector((state) => state.userReducer);

    const [dataTemplat, setDataTemplat] = useState({
        caption: '',
        link_page: '',
        link_gambar: '',
    });

    useEffect(() => {
        dispatch(viewAllTemplateId(id));
    }, [dispatch, id]);

    const caption = templatList?.map((item) => item.caption);
    const link_page = templatList?.map((item) => item.link_page);

    useEffect(() => {
        if (templatList) {
            setDataTemplat({
                caption: `${caption}` || '',
                link_page: `${link_page}` || '',
                link_gambar: null,
            });
        }
    }, [templatList]);

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

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            if (dataTemplat.link_gambar === null || dataTemplat.link_gambar === '') {
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
                    const updatedTemplat = {
                        caption: dataTemplat.caption,
                        link_page: dataTemplat.link_page,
                    };
                    dispatch(updateTemplat(id, updatedTemplat));
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
                        const file = dataTemplat.link_gambar;
                        const fileParts = file.name
                            .split('.')
                            .filter(Boolean);
                        const fileName = fileParts.slice(0, -1).join('.');
                        const fileType = fileParts.slice(-1);
                        const timestamp = new Date().toISOString();
                        const newFileName = `${fileName} ${timestamp}.${fileType}`;

                        let foto = null;
                        foto = await uploadToSupabase(newFileName, file);

                        const updatedTemplat = {
                            link_gambar: foto,
                            link_page: dataTemplat.link_page,
                            caption: dataTemplat.caption,
                        };
                        dispatch(updateTemplat(id, updatedTemplat));
                    } catch (error) {
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: 'Terjadi kesalahan saat memperbarui data.',
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

    if (token && role === roleUser) {
        return (
            <main className="container col-f f-center">
                <div className="card container col-f section-max full-width">
                    <h1>Edit Galeri Templat</h1>
                    <div className="container col-f">
                        <form onSubmit={handleUpdate} className="container col-f full-width">
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
                                    Perbarui
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </main>
        );
    } else {
        window.location.href = `/user/login`;
    }
}

export default EditTemplat;
