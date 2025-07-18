import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import {
    readPelatihan,
    updatePelatihan,
} from '../../../redux/action/user.action';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const UpdatePelatihan = () => {
    const { id } = useParams();
    const idUser = localStorage.getItem('id');
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    const dispatch = useDispatch();
    const { pelatihan, isWebsite } = useSelector((state) => state.userReducer);

    const [data, setData] = useState({
        pelatihan: '',
        tahun_mulai: '',
        tahun_selesai: '',
    });

    useEffect(() => {
        if (idUser) {
            dispatch(readPelatihan(idUser));
        }
    }, [dispatch, idUser]);

    useEffect(() => {
        const currentData = pelatihan.find((item) => item.id === parseInt(id));
        if (currentData) {
            setData({
                pelatihan: currentData.pelatihan || '',
                tahun_mulai: currentData.tahun_mulai || '',
                tahun_selesai: currentData.tahun_selesai || '',
            });
        }
    }, [pelatihan, idUser]);

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
                const updatedPelatihan = {
                    pelatihan: data.pelatihan,
                    tahun_mulai: data.tahun_mulai,
                    tahun_selesai: data.tahun_selesai || 'Hingga saat ini',
                };

                dispatch(updatePelatihan(id, updatedPelatihan));
            }
        } catch (error) {
            console.error('Error saat menambahkan pengalaman kerja:', error);
            await Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',
            });
        }
    };
    if (token && (role === 'user' || role === isWebsite)) {
        return (
            <main className="container col-f f-center">
                <section className="container col-f full-width section-max">
                    <h1>Edit Pelatihan</h1>
                    <div className="container col-f f-center-c">
                        <form
                            onSubmit={handleSubmit}
                            className="container col-f full-width"
                        >
                            <div className="container col-f-0">
                                <label>Nama Pelatihan</label>
                                <input
                                    name="pelatihan"
                                    value={data.pelatihan}
                                    onChange={(e) =>
                                        setData({
                                            ...data,
                                            [e.target.name]: e.target.value,
                                        })
                                    }
                                    type="text"
                                    placeholder="Masukkan nama pelatihan"
                                />
                                <p
                                    style={{
                                        fontSize: '0.75rem',
                                        paddingTop: '0.5rem',
                                    }}
                                >
                                    Contohnya : Pelatihan Video Editing of
                                    Content Creation Academy
                                </p>
                            </div>
                            <div className="container col-f-0">
                                <label>Tahun Mulai</label>
                                <input
                                    name="tahun_mulai"
                                    value={data.tahun_mulai}
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
                                    *Form ini hanya akan menampilkan bulan dan
                                    tahun saja
                                </p>
                            </div>
                            <div className="container col-f-0">
                                <label>*Tahun Selesai (Opsional)</label>
                                <input
                                    name="tahun_selesai"
                                    value={data.tahun_selesai}
                                    onChange={(e) =>
                                        setData({
                                            ...data,
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
                                    *Jika pengalaman kerja masih berlangsung,
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
        window.location.href = `/user/login`;
    }
};

export default UpdatePelatihan;
