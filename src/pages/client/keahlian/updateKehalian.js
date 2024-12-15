import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
    readKeahlian,
    updateKeahlian,
} from '../../../redux/action/user.action';
import Swal from 'sweetalert2';

function UpdateKeahlian() {
    const dispatch = useDispatch();
    const { id } = useParams();
    const idUser = localStorage.getItem('id');
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    const { keahlian, isWebsite } = useSelector((state) => state.userReducer);

    const [data, setData] = useState({
        keahlian: '',
        tingkat: '',
    });

    useEffect(() => {
        if (idUser) {
            dispatch(readKeahlian(idUser));
        }
    }, [dispatch, idUser]);

    useEffect(() => {
        const currentData = keahlian.find((item) => item.id === parseInt(id));
        if (currentData) {
            setData({
                keahlian: currentData.keahlian || '',
                tingkat: currentData.tingkat || '',
            });
        }
    }, [keahlian, idUser]);

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
            const keahlianUser = {
                keahlian: data.keahlian,
                tingkat: data.tingkat,
            };
            dispatch(updateKeahlian(id, keahlianUser));
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
                    <h1>Tambah Keahlian / Skill</h1>
                    <div className="container col-f f-center-c">
                        <form
                            onSubmit={handleSubmit}
                            className="container col-f full-width"
                        >
                            <div className="container col-f-0">
                                <label>Keahlian</label>
                                <input
                                    name="keahlian"
                                    value={data.keahlian}
                                    onChange={(e) =>
                                        setData({
                                            ...data,
                                            [e.target.name]: e.target.value,
                                        })
                                    }
                                    type="text"
                                    placeholder="Masukkan jenis keahlian"
                                />
                                <p
                                    style={{
                                        fontSize: '0.75rem',
                                        paddingTop: '0.5rem',
                                    }}
                                >
                                    Contohnya : Video Editing
                                </p>
                            </div>
                            <div className="container col-f-0">
                                <label>Pilih Tingkatan</label>
                                <select
                                    id="tingkat"
                                    name="tingkat"
                                    value={data.tingkat}
                                    onChange={(e) =>
                                        setData({
                                            ...data,
                                            [e.target.name]: e.target.value,
                                        })
                                    }
                                >
                                    <option value="" key="">
                                        Pilih tingkatan
                                    </option>
                                    <option value="Pemula" key="pemula">
                                        Pemula
                                    </option>
                                    <option
                                        value="Pemula Tingkat Lanjut"
                                        key="pemula tingkat lanjut"
                                    >
                                        Pemula Tingkat Lanjut
                                    </option>
                                    <option value="Kompeten" key="kompeten">
                                        Kompeten
                                    </option>
                                    <option value="Mahir" key="mahir">
                                        Mahir
                                    </option>
                                    <option value="Ahli" key="ahli">
                                        Ahli
                                    </option>
                                </select>
                                <p
                                    style={{
                                        fontSize: '0.75rem',
                                        paddingTop: '0.5rem',
                                    }}
                                >
                                    Contohnya : Kompeten
                                </p>
                            </div>
                            <div className="card-mini">
                                <h4>
                                    Harap Perhatikan{' '}
                                    <i className="bi-exclamation-triangle-fill"></i>
                                </h4>
                                <p
                                    style={{
                                        marginTop: '5px',
                                    }}
                                >
                                    Saat memilih tingkat keahlian, pastikan
                                    untuk menyesuaikan dengan kemampuan yang
                                    kamu miliki saat ini. Perlu diingat,
                                    keahlian adalah sesuatu yang bersifat
                                    dinamis dan tidak selalu dapat diukur secara
                                    absolut. Fokuslah pada pengembangan diri dan
                                    peningkatan kemampuan dari waktu ke waktu.{' '}
                                    <i className="bi-emoji-smile"></i>
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

export default UpdateKeahlian;
