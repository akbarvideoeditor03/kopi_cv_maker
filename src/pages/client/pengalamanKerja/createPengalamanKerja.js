import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createPengalamanKerja, getUserId } from '../../../redux/action/user.action';
import Swal from 'sweetalert2';

function CreatePengalamanKerja() {
    const dispatch = useDispatch();
    const token = localStorage.getItem('&l2');
    const role = localStorage.getItem('$f*');
    const id = localStorage.getItem('/v%');
    const { isWebsite, isViews } = useSelector((state) => state.userReducer);
    const makeRow = (overrides = {}) => ({
        _key: `${Date.now().toString(36)}${Math.random().toString(36).slice(2)}`,
        lokasi: '',
        jabatan: '',
        detail: '',
        tahun_mulai: '',
        tahun_selesai: '',
        ...overrides,
    });

    const [rows, setRows] = useState([makeRow()]);

    useEffect(() => {
        dispatch(getUserId(id, role));
    }, [dispatch, id, role]);

    const handleChange = (rowKey, e) => {
        const { name, value } = e.target;
        setRows(prev => prev.map(r => r._key === rowKey ? { ...r, [name]: value } : r));
    };

    const addEmptyRow = () => setRows(prev => [...prev, makeRow()]);
    const removeRow = (rowKey) => setRows(prev => {
        const next = prev.filter(r => r._key !== rowKey);
        return next.length ? next : [makeRow()];
    });

    const wordCount = (text) => text.trim().split(/\s+/).filter(Boolean).length;
    const isRowFilledAtAll = r => r.lokasi || r.jabatan || r.detail || r.tahun_mulai || r.tahun_selesai;
    const isRowComplete = r => r.lokasi && r.jabatan && r.detail && r.tahun_mulai;

    const handleSubmit = async (e) => {
        e.preventDefault();
        const partiallyFilled = rows.filter(isRowFilledAtAll);
        const completeRows = partiallyFilled.filter(isRowComplete);

        if (completeRows.length === 0) {
            Swal.fire({
                icon: 'error',
                title: 'Belum ada data lengkap',
                text: 'Isi minimal 1 form (Lokasi + Jabatan + Detail + Tahun Mulai).',
            });
            return;
        }

        try {
            await Promise.all(
                completeRows.map(item => dispatch(createPengalamanKerja(id, role, {
                    lokasi: item.lokasi,
                    jabatan: item.jabatan,
                    detail: item.detail,
                    tahun_mulai: item.tahun_mulai,
                    tahun_selesai: item.tahun_selesai || 'Hingga saat ini'
                })))
            );

            const skipped = partiallyFilled.length - completeRows.length;
            await Swal.fire({
                icon: 'success',
                title: 'Berhasil!',
                text: skipped > 0
                    ? `Terkirim ${completeRows.length} pengalaman kerja. ${skipped} form parsial di-skip.`
                    : `Terkirim ${completeRows.length} pengalaman kerja.`,
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
                    <h1>Pengalaman Kerja</h1>
                    <div className="container col-f f-center-c">
                        <form onSubmit={handleSubmit} className="container col-f full-width">
                            {rows.map((item, idx) => {
                                const wc = wordCount(item.detail);
                                return (
                                    <div key={item._key} className="container col-f border">
                                        <div className="container row-f f-between f-center">
                                            <h3 style={{ margin: 0 }}>Form {idx + 1}</h3>
                                            <button type="button" className="btn btn-warning" onClick={() => removeRow(item._key)}>Hapus</button>
                                        </div>

                                        <div className="container col-f-0">
                                            <label>Lokasi Kerja</label>
                                            <input
                                                name="lokasi"
                                                value={item.lokasi}
                                                onChange={(e) => handleChange(item._key, e)}
                                                type="text"
                                                placeholder="Masukkan lokasi kerja"
                                            />
                                            <p style={{ fontSize: '0.75rem', paddingTop: '0.5rem' }}>
                                                Contohnya : PT Aneka Hidangan Lezat
                                            </p>
                                        </div>

                                        <div className="container col-f-0">
                                            <label>Jabatan Kerja</label>
                                            <input
                                                name="jabatan"
                                                value={item.jabatan}
                                                onChange={(e) => handleChange(item._key, e)}
                                                type="text"
                                                placeholder="Masukkan jabatan kerja"
                                            />
                                            <p style={{ fontSize: '0.75rem', paddingTop: '0.5rem' }}>
                                                Contohnya : Customer Service
                                            </p>
                                        </div>

                                        <div className="container col-f-0">
                                            <label>Detail Kerja</label>
                                            <textarea
                                                name="detail"
                                                value={item.detail}
                                                onChange={(e) => handleChange(item._key, e)}
                                                className="textarea"
                                                placeholder="Masukkan detail kerja"
                                            />
                                            <div className="container row-f f-between">
                                                <p style={{ fontSize: '0.75rem', paddingTop: '0.5rem' }}>
                                                    Contohnya : Melayani pertanyaan pelanggan |
                                                </p>
                                                <p style={{ fontSize: '0.75rem', paddingTop: '0.5rem' }}>
                                                    Jumlah kata : <span className={wc > 100 ? 'c-red fwb' : ''}>{wc}</span>
                                                </p>
                                            </div>
                                        </div>

                                        <div className="container col-f-0">
                                            <label>Tahun Mulai Kerja</label>
                                            <input
                                                name="tahun_mulai"
                                                value={item.tahun_mulai}
                                                onChange={(e) => handleChange(item._key, e)}
                                                type="date"
                                            />
                                            <p style={{ fontSize: '0.75rem', paddingTop: '0.5rem' }}>
                                                *Form ini hanya akan menampilkan bulan dan tahun saja
                                            </p>
                                        </div>

                                        <div className="container col-f-0">
                                            <label>*Tahun Selesai (Opsional)</label>
                                            <input
                                                name="tahun_selesai"
                                                value={item.tahun_selesai}
                                                onChange={(e) => handleChange(item._key, e)}
                                                type="text"
                                                placeholder="Contohnya : September 2023"
                                            />
                                            <p style={{ fontSize: '0.75rem', paddingTop: '0.5rem' }}>
                                                *Jika pengalaman kerja masih berlangsung, maka kosongkan saja
                                            </p>
                                        </div>
                                    </div>
                                );
                            })}

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

export default CreatePengalamanKerja;
