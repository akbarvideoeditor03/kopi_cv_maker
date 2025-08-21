import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
    readPelatihanId,
    updatePelatihan,
    getUserId
} from '../../../redux/action/user.action';
import Swal from 'sweetalert2';

const UpdatePelatihan = () => {
    const dispatch = useDispatch();
    const param = useParams();
    const token = localStorage.getItem('&l2');
    const role = localStorage.getItem('$f*');
    const id = localStorage.getItem('/v%');
    const { pelatihan, isWebsite, isViews } = useSelector((state) => state.userReducer);

    const [data, setData] = useState({
        pelatihan: '',
        tahun_mulai: '',
        tahun_selesai: '',
    });

        useEffect(() => {
        dispatch(getUserId(id, role));
    }, [dispatch, id, role]);

    useEffect(() => {
        if (id) {
            dispatch(readPelatihanId(id, role, param.id, param.id_pelatihan));
        }
    }, [dispatch, id, role, param.id, param.id_pelatihan]);

    useEffect(() => {
        if (pelatihan) {
            setData({
                pelatihan: pelatihan.pelatihan || '',
                tahun_mulai: pelatihan.tahun_mulai || '',
                tahun_selesai: pelatihan.tahun_selesai || '',
            });
        }
    }, [pelatihan]);

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
                dispatch(updatePelatihan(id, role, param.id, param.id_pelatihan, updatedPelatihan));
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

    if (token && (role === isViews || isWebsite)) {
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
