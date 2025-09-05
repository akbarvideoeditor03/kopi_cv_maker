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
    const makeRow = (overrides = {}) => ({
        _key: `${Date.now().toString(36)}${Math.random().toString(36).slice(2)}`,
        prestasi: '',
        tahun: '',
        ...overrides,
    });

    const [rows, setRows] = useState([makeRow()]);

    useEffect(() => {
        dispatch(readPengalamanKerjaId(id, role, param.id_pengalaman_kerja));
    }, [dispatch, id, role, param.id_pengalaman_kerja]);

    const handleChange = (rowKey, e) => {
        const { name, value } = e.target;
        setRows(prev => prev.map(r => r._key === rowKey ? { ...r, [name]: value } : r));
    };

    const addEmptyRow = () => setRows(prev => [...prev, makeRow()]);
    const removeRow = (rowKey) => setRows(prev => {
        const next = prev.filter(r => r._key !== rowKey);
        return next.length ? next : [makeRow()];
    });

    const isRowFilledAtAll = r => r.prestasi || r.tahun;
    const isRowComplete = r => r.prestasi && r.tahun;

    const handleSubmit = async (e) => {
        e.preventDefault();
        const partiallyFilled = rows.filter(isRowFilledAtAll);
        const completeRows = partiallyFilled.filter(isRowComplete);

        if (completeRows.length === 0) {
            Swal.fire({
                icon: 'error',
                title: 'Belum ada data lengkap',
                text: 'Isi minimal 1 form (Prestasi + Tahun).',
            });
            return;
        }

        try {
            await Promise.all(
                completeRows.map(item => dispatch(createPrestasi(id, role, param.id_pengalaman_kerja, {
                    id_pengalaman_kerja: `${pengalamanKerja.id}`,
                    prestasi: item.prestasi,
                    tahun: item.tahun
                })))
            );

            const skipped = partiallyFilled.length - completeRows.length;
            await Swal.fire({
                icon: 'success',
                title: 'Berhasil!',
                text: skipped > 0
                    ? `Terkirim ${completeRows.length} prestasi. ${skipped} form parsial di-skip.`
                    : `Terkirim ${completeRows.length} prestasi.`,
                timer: 3000,
                showConfirmButton: false,
                allowEscapeKey: false,
                allowOutsideClick: false,
                timerProgressBar: true
            }).then(() => {
                window.location.href = '/home'
            });
            setRows([makeRow()]);
        } catch (error) {
            await Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Terjadi kesalahan. Coba lagi',
            });
        }
    };

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

    if (token && (role === isViews || isWebsite)) {
        return (
            <main className="container col-f f-center">
                <section className="container col-f full-width section-max">
                    <h1>Tambah Prestasi Kerja</h1>
                    <div className="container col-f f-center-c">
                        <form onSubmit={handleSubmit} className="container col-f full-width">
                            {rows.map((item, idx) => (
                                <div key={item._key} className="container col-f">
                                    <div className="container row-f f-between f-center">
                                        <h3 style={{ margin: 0 }}>Form {idx + 1}</h3>
                                        <button type="button" className="btn btn-warning" onClick={() => removeRow(item._key)}>Hapus</button>
                                    </div>

                                    <div className="container col-f-0">
                                        <label>Nama Prestasi</label>
                                        <input
                                            name="prestasi"
                                            value={item.prestasi}
                                            onChange={(e) => handleChange(item._key, e)}
                                            type="text"
                                            placeholder="Masukkan nama prestasi"
                                        />
                                        <p style={{ fontSize: '0.75rem', paddingTop: '0.5rem' }}>
                                            Contohnya : Juara 1 Lomba Videografi
                                        </p>
                                    </div>

                                    <div className="container col-f-0">
                                        <label>Tahun</label>
                                        <input
                                            name="tahun"
                                            value={item.tahun}
                                            onChange={(e) => handleChange(item._key, e)}
                                            type="date"
                                        />
                                        <p style={{ fontSize: '0.75rem', paddingTop: '0.5rem' }}>
                                            *Form ini hanya akan menampilkan tahun saja
                                        </p>
                                    </div>
                                </div>
                            ))}

                            <button type="button" onClick={addEmptyRow} className="btn btn-primary m-t1">+ Tambah Form Kosong</button>

                            <div className="container row-f f-wrap f-1">
                                <button onClick={cancelSubmit} className="btn btn-danger f-1">Batal</button>
                                <button type="submit" className="btn btn-primary f-1">Selesai</button>
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
