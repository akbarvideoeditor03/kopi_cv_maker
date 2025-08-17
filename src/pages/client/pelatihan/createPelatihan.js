import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createPelatihan, getUserId } from '../../../redux/action/user.action';
import Swal from 'sweetalert2';

function CreatePelatihan() {
    const dispatch = useDispatch();
    const token = localStorage.getItem('&l2');
    const role = localStorage.getItem('$f*');
    const id = localStorage.getItem('/v%');
    const { isWebsite, isViews, userList } = useSelector((state) => state.userReducer)
    const [pelatihan, setPelatihan] = useState({
        id_user: '',
        pelatihan: '',
        tahun_mulai: '',
        tahun_selesai: '',
    });

    useEffect(() => {
        dispatch(getUserId(id, role));
    }, [dispatch, id, role]);

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
        if (!pelatihan.pelatihan) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Nama pelatihan tidak boleh kosong',
            });
            return;
        }

        if (!pelatihan.tahun_mulai) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Tahun mulai kerja tidak boleh kosong',
            });
            return;
        }

        try {
            const pelatihanUser = {
                id_user: `${userList.id}`,
                pelatihan: pelatihan.pelatihan,
                tahun_mulai: pelatihan.tahun_mulai,
                tahun_selesai: pelatihan.tahun_selesai || 'Hingga saat ini',
            };
            dispatch(createPelatihan(id, role, pelatihanUser));
        } catch (error) {
            console.error('Error saat menambahkan pelatihan:', error);
            await Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',
            });
        }
    };

    if (token && (role === isViews || role === isWebsite)) {
        return (
            <main className="container col-f f-center">
                <section className="container col-f full-width section-max">
                    <h1>Pelatihan</h1>
                    <div className="container col-f f-center-c">
                        <form
                            onSubmit={handleSubmit}
                            className="container col-f full-width"
                        >
                            <div className="container col-f-0">
                                <label>Nama Pelatihan</label>
                                <input
                                    name="pelatihan"
                                    value={pelatihan.pelatihan}
                                    onChange={(e) =>
                                        setPelatihan({
                                            ...pelatihan,
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
                                    value={pelatihan.tahun_mulai}
                                    onChange={(e) =>
                                        setPelatihan({
                                            ...pelatihan,
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
                                    value={pelatihan.tahun_selesai}
                                    onChange={(e) =>
                                        setPelatihan({
                                            ...pelatihan,
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
}

export default CreatePelatihan;
