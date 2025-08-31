import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createPrestasi, readPengalamanKerjaId } from '../../../redux/action/user.action';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';

function CreatePrestasi() {
    const dispatch = useDispatch();
    const param = useParams();
    const token = localStorage.getItem('&l2');
    const role = localStorage.getItem('$f*');
    const id = localStorage.getItem('/v%');
    const { isWebsite, isViews, pengalamanKerja } = useSelector((state) => state.userReducer)
    const [prestasi, setPrestasi] = useState({
        prestasi: '',
        tahun: '',
    });

    useEffect(() => {
        dispatch(readPengalamanKerjaId(id, role, param.id_pengalaman_kerja));
    }, [dispatch, id, role, param.id_pengalaman_kerja]);

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
        if (!prestasi.prestasi) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Nama prestasi tidak boleh kosong',
            });
            return;
        }

        if (!prestasi.tahun) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Tahun mendapat prestasi tidak boleh kosong',
            });
            return;
        }

        try {
            const prestasiUser = {
                id_pengalaman_kerja: `${pengalamanKerja.id}`,
                prestasi: prestasi.prestasi,
                tahun: prestasi.tahun,
            };
            dispatch(createPrestasi(id, role, param.id_pengalaman_kerja, prestasiUser));
        } catch (error) {
            await Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Terjadi kesalahan. Coba lagi',
            }).then(() => {
                Swal.close()
            });
        }
    };

    if (token && (role === isViews || isWebsite)) {
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
                                    value={prestasi.prestasi}
                                    onChange={(e) =>
                                        setPrestasi({
                                            ...prestasi,
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
                                    value={prestasi.tahun}
                                    onChange={(e) =>
                                        setPrestasi({
                                            ...prestasi,
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
        window.location.href = `/user/login`;
    }
}

export default CreatePrestasi;
