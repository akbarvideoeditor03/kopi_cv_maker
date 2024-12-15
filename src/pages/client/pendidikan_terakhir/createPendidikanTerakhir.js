import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createPendidikanTerakhir } from '../../../redux/action/user.action';
import Swal from 'sweetalert2';

function CreatePendidikanTerakhir() {
    const dispatch = useDispatch();
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    const id = localStorage.getItem('id');
    const { isWebsite } = useSelector((state) => state.userReducer)
    const [pendidikanTerakhir, setPendidikanTerakhir] = useState({
        id_user: '',
        institusi: '',
        jurusan: '',
        tahun_mulai: '',
        tahun_selesai: '',
    });
    const cancelSubmit = async (e) => {
        e.preventDefault();
        Swal.fire({
            title: 'Yakin mau batal?',
            text: 'Tulisan kamu bakal hilang loh...',
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

        if (!pendidikanTerakhir.institusi) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Nama institusi tidak boleh kosong',
            });
            return;
        }

        if (!pendidikanTerakhir.jurusan) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Jurusan institusi tidak boleh kosong',
            });
            return;
        }

        if (!pendidikanTerakhir.tahun_mulai) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Tahun mulai tidak boleh kosong',
            });
            return;
        }

        try {
            const pendidikanTerakhirUser = {
                id_user: `${id}`,
                institusi: pendidikanTerakhir.institusi,
                jurusan: pendidikanTerakhir.jurusan,
                tahun_mulai: pendidikanTerakhir.tahun_mulai,
                tahun_selesai:
                    pendidikanTerakhir.tahun_selesai || 'Hingga saat ini',
            };

            dispatch(createPendidikanTerakhir(pendidikanTerakhirUser));
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',
            });
        }
    };

    if (token && role === 'user' || isWebsite) {
        return (
            <main className="container col-f f-center">
                <section className="container col-f full-width section-max">
                    <h1>Pendidikan Terakhir</h1>
                    <div className="container col-f f-center-c">
                        <form
                            onSubmit={handleSubmit}
                            className="container col-f full-width"
                        >
                            <div className="container col-f-0">
                                <label>Nama Institusi</label>
                                <input
                                    name="institusi"
                                    value={pendidikanTerakhir.institusi}
                                    onChange={(e) =>
                                        setPendidikanTerakhir({
                                            ...pendidikanTerakhir,
                                            [e.target.name]: e.target.value,
                                        })
                                    }
                                    type="text"
                                    placeholder="Masukkan institusi"
                                />
                                <p
                                    style={{
                                        fontSize: '0.75rem',
                                        paddingTop: '0.5rem',
                                    }}
                                >
                                    Contohnya : nama universitas, atau nama
                                    sekolah
                                </p>
                            </div>
                            <div className="container col-f-0">
                                <label>Jurusan</label>
                                <input
                                    name="jurusan"
                                    value={pendidikanTerakhir.jurusan}
                                    onChange={(e) =>
                                        setPendidikanTerakhir({
                                            ...pendidikanTerakhir,
                                            [e.target.name]: e.target.value,
                                        })
                                    }
                                    type="text"
                                    placeholder="Masukkan jurusan"
                                />
                                <p
                                    style={{
                                        fontSize: '0.75rem',
                                        paddingTop: '0.5rem',
                                    }}
                                >
                                    Contohnya : Perkantoran
                                </p>
                            </div>
                            <div className="container col-f-0">
                                <label>Tahun Mulai</label>
                                <input
                                    name="tahun_mulai"
                                    value={pendidikanTerakhir.tahun_mulai}
                                    onChange={(e) =>
                                        setPendidikanTerakhir({
                                            ...pendidikanTerakhir,
                                            [e.target.name]: e.target.value,
                                        })
                                    }
                                    type="date"
                                />
                                <p
                                    style={{
                                        fontSize: '0.75rem',
                                        paddingTop: '0.5rem',
                                    }}
                                >
                                    *Form ini hanya akan menampilkan bulan dan
                                    tahun saja
                                </p>
                            </div>
                            <div className="container col-f-0">
                                <label>*Tahun Selesai (Opsional)</label>
                                <input
                                    name="tahun_selesai"
                                    value={pendidikanTerakhir.tahun_selesai}
                                    onChange={(e) =>
                                        setPendidikanTerakhir({
                                            ...pendidikanTerakhir,
                                            [e.target.name]: e.target.value,
                                        })
                                    }
                                    type="text"
                                    placeholder="Contohnya : September 2023"
                                />
                                <p
                                    style={{
                                        fontSize: '0.75rem',
                                        paddingTop: '0.5rem',
                                    }}
                                >
                                    *Jika pendidikan terakhir masih berlangsung,
                                    maka kosongkan saja
                                </p>
                            </div>
                            <div className="container row-f f-wrap f-1 m-t1">
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
                                    Selesai
                                </button>
                            </div>
                        </form>
                    </div>
                </section>
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
}

export default CreatePendidikanTerakhir;
