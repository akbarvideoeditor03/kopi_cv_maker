import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { useDispatch, useSelector } from 'react-redux';
import {
    readPrestasi,
    updatePrestasi,
} from '../../../redux/action/user.action';
import { useParams } from 'react-router-dom';

function UpdatePrestasi() {
    const { id, id_pengalaman_kerja } = useParams();
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    const dispatch = useDispatch();
    const { prestasiKerja, isWebsite } = useSelector((state) => state.userReducer);

    const [data, setData] = useState({
        prestasi: '',
        tahun: '',
    });

    useEffect(() => {
        if (id) {
            dispatch(readPrestasi(id));
        }
    }, [dispatch, id]);

    useEffect(() => {
        const currentData = prestasiKerja.find(
            (item) => item.id === parseInt(id)
        );
        if (currentData) {
            setData({
                prestasi: currentData.prestasi || '',
                tahun: currentData.tahun || '',
            });
        }
    }, [prestasiKerja, id, id_pengalaman_kerja]);

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
            const result = await Swal.fire({
                icon: 'question',
                title: 'Tunggu',
                text: 'Apa informasinya udah benar semua?',
                confirmButtonText: 'Iya, udah',
                cancelButtonText: 'Lanjutin',
                allowOutsideClick: false,
                showCancelButton: true,
            });

            if (result.isConfirmed) {
                const updatedPrestasi = {
                    prestasi: data.prestasi,
                    tahun: data.tahun,
                };
                dispatch(
                    updatePrestasi(id, id_pengalaman_kerja, updatedPrestasi)
                );
            }
        } catch (error) {
            console.error('Error saat menambahkan prestasi:', error);
            await Swal.fire({
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
                    <h1>Tambah Prestasi Kerja</h1>
                    <div className="container col-f f-center-c">
                        <form
                            onSubmit={handleSubmit}
                            className="container col-f full-width"
                        >
                            <div className="container col-f-0">
                                <label>Nama Prestasi</label>
                                <input
                                    name="prestasi"
                                    value={data.prestasi}
                                    onChange={(e) =>
                                        setData({
                                            ...data,
                                            [e.target.name]: e.target.value,
                                        })
                                    }
                                    type="text"
                                    placeholder="Masukkan nama prestasi"
                                />
                                <p
                                    style={{
                                        fontSize: '0.75rem',
                                        paddingTop: '0.5rem',
                                    }}
                                >
                                    Contohnya : Juara 1 Lomba Videografi
                                </p>
                            </div>
                            <div className="container col-f-0">
                                <label>Tahun</label>
                                <input
                                    name="tahun"
                                    value={data.tahun}
                                    onChange={(e) =>
                                        setData({
                                            ...data,
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
                                    *Form ini hanya akan menampilkan tahun saja
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

export default UpdatePrestasi;
