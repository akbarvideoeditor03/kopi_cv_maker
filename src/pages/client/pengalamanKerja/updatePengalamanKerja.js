import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import {
    readPengalamanKerjaId,
    updatePengalamanKerja,
    getUserId
} from '../../../redux/action/user.action';
import { useParams } from 'react-router-dom';

const UpdatePengalamanKerja = () => {
    const dispatch = useDispatch();
    const param = useParams();
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    const id = localStorage.getItem('id');
    const { pengalamanKerja, isWebsite, isViews } = useSelector((state) => state.userReducer);

    const [data, setData] = useState({
        id: '',
        lokasi: '',
        jabatan: '',
        detail: '',
        tahun_mulai: '',
        tahun_selesai: '',
    });

    useEffect(() => {
        dispatch(getUserId(id, role));
    }, [dispatch, id, role]);

    useEffect(() => {
        if (id) {
            dispatch(readPengalamanKerjaId(id, role, param.id, param.id_pengalaman_kerja));
        }
    }, [dispatch, id, role, param.id, param.id_pengalaman_kerja]);

    useEffect(() => {
        if (pengalamanKerja) {
            setData({
                id_user: '',
                lokasi: pengalamanKerja.lokasi || '',
                jabatan: pengalamanKerja.jabatan || '',
                detail: pengalamanKerja.detail || '',
                tahun_mulai: pengalamanKerja.tahun_mulai || '',
                tahun_selesai: pengalamanKerja.tahun_selesai || '',
            });
        }
    }, [pengalamanKerja]);

    const wordCount = data.detail.trim().split(/\s+/).filter(Boolean).length;
    useEffect(() => {
        const warnText = document.getElementById('warn')
        if (wordCount > 100) {
            warnText.classList.add("c-red", "fwb");
        } else {
            warnText.classList.remove("c-red", "fwb")
        }
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
                const updatedPengalamanKerja = {
                    lokasi: data.lokasi,
                    jabatan: data.jabatan,
                    detail: data.detail,
                    tahun_mulai: data.tahun_mulai,
                    tahun_selesai: data.tahun_selesai || 'Hingga saat ini',
                };
                dispatch(updatePengalamanKerja(id, role, param.id, param.id_pengalaman_kerja, updatedPengalamanKerja));
            }
        } catch (error) {
            await Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: `Ada yang salah nih, ${error}`,
            });
        }
    };
    if (token && (role === isViews || role === isWebsite)) {
        return (
            <main className="container col-f f-center">
                <section className="container col-f full-width section-max">
                    <h1>Edit Pengalaman Kerja</h1>
                    <div className="container col-f f-center-c">
                        <form
                            onSubmit={handleSubmit}
                            className="container col-f full-width"
                        >
                            <div className="container col-f-0">
                                <label>Lokasi Kerja</label>
                                <input
                                    name="lokasi"
                                    value={data.lokasi}
                                    onChange={(e) =>
                                        setData({
                                            ...data,
                                            [e.target.name]: e.target.value,
                                        })
                                    }
                                    type="text"
                                    placeholder="Masukkan lokasi kerja"
                                />
                                <p
                                    style={{
                                        fontSize: '0.75rem',
                                        paddingTop: '0.5rem',
                                    }}
                                >
                                    Contohnya : PT Aneka Hidangan Lezat
                                </p>
                            </div>
                            <div className="container col-f-0">
                                <label>Jabatan Kerja</label>
                                <input
                                    name="jabatan"
                                    value={data.jabatan}
                                    onChange={(e) =>
                                        setData({
                                            ...data,
                                            [e.target.name]: e.target.value,
                                        })
                                    }
                                    type="text"
                                    placeholder="Masukkan jabatan kerja"
                                />
                                <p
                                    style={{
                                        fontSize: '0.75rem',
                                        paddingTop: '0.5rem',
                                    }}
                                >
                                    Contohnya : Customer Service
                                </p>
                            </div>
                            <div className="container col-f-0">
                                <label>Detail Kerja</label>
                                <textarea
                                    name="detail"
                                    value={data.detail}
                                    onChange={(e) =>
                                        setData({
                                            ...data,
                                            [e.target.name]: e.target.value,
                                        })
                                    }
                                    className="textarea"
                                    type="text"
                                    placeholder="Masukkan detail kerja"
                                />
                                <div className="container row-f f-between">
                                    <p
                                        style={{
                                            fontSize: '0.75rem',
                                            paddingTop: '0.5rem',
                                        }}
                                    >
                                        Contohnya : Melayani pertanyaan
                                        pelanggan |{' '}
                                    </p>
                                    <p style={{
                                        fontSize: '0.75rem',
                                        paddingTop: '0.5rem',
                                    }}>
                                        Jumlah kata : <span id='warn'>{`${wordCount}`}</span>
                                    </p>
                                </div>
                            </div>
                            <div className="container col-f-0">
                                <label>Tahun Mulai Kerja</label>
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

export default UpdatePengalamanKerja;
