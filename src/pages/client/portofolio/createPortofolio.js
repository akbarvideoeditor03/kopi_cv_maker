import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createPortofolio } from "../../../redux/action/user.action";
import Swal from "sweetalert2";

function CreatePortofolio() {
    const dispatch = useDispatch();
    const token = localStorage.getItem("&l2");
    const role = localStorage.getItem("$f*");
    const id = localStorage.getItem("/v%");
    const { isWebsite, isViews } = useSelector((state) => state.userReducer);

    const makeRow = (overrides = {}) => ({
        _key: `${Date.now().toString(36)}${Math.random().toString(36).slice(2)}`,
        judul: "",
        deskripsi: "",
        link_hasil: "",
        tanggal_selesai: "",
        kategori: "",
        ...overrides,
    });
    const [rows, setRows] = useState([makeRow()]);

    const handleChange = (rowKey, e) => {
        const { name, value } = e.target;
        setRows((prev) =>
            prev.map((r) => (r._key === rowKey ? { ...r, [name]: value } : r))
        );
    };

    const addEmptyRow = () => setRows((prev) => [...prev, makeRow()]);

    const removeRow = (rowKey) => {
        setRows((prev) => {
            const next = prev.filter((r) => r._key !== rowKey);
            return next.length ? next : [makeRow()];
        });
    };

    const wordCount = (text) => text.trim().split(/\s+/).filter(Boolean).length;
    const isRowFilledAtAll = (r) => r.judul || r.deskripsi || r.link_hasil || r.tanggal_selesai;
    const isRowComplete = (r) => r.judul && r.deskripsi && r.link_hasil && r.tanggal_selesai;

    const handleSubmit = async (e) => {
        e.preventDefault();

        const partiallyFilled = rows.filter(isRowFilledAtAll);
        const completeRows = partiallyFilled.filter(isRowComplete);

        if (completeRows.length === 0) {
            Swal.fire({
                icon: "error",
                title: "Data belum lengkap",
                html: `
                    <div class='container col-f t-left'>
                    <p>Minimal terdapat</p>
                    <ol type=1>
                        <li>Judul</li>
                        <li>Deskripsi</li>
                        <li>URL Hasil, dan</li>
                        <li>Tanggal Selesai</li>
                    </ol>
                </div>
                `
            });
            return;
        }

        try {
            await Promise.all(
                completeRows.map((item) =>
                    dispatch(
                        createPortofolio(id, role, {
                            judul: item.judul,
                            deskripsi: item.deskripsi,
                            link_hasil: item.link_hasil,
                            tanggal_selesai: item.tanggal_selesai,
                            kategori: item.kategori,
                        })
                    )
                )
            );

            const skipped = partiallyFilled.length - completeRows.length;
            await Swal.fire({
                icon: "success",
                title: "Berhasil!",
                text:
                    skipped > 0
                        ? `Terkirim ${completeRows.length} portofolio. ${skipped} form parsial di-skip.`
                        : `Terkirim ${completeRows.length} portofolio.`,
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
                icon: "error",
                title: "Oops...",
                text: "Terjadi kesalahan. Coba lagi",
            });
        }
    };

    const cancelSubmit = async (e) => {
        e.preventDefault();
        Swal.fire({
            title: "Yakin mau batal?",
            text: "Tulisan kamu bakal hilang loh...",
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Iya",
            cancelButtonText: "Lanjutin",
        }).then((result) => {
            if (result.isConfirmed) {
                window.location.href = "/home";
            }
        });
    };

    const infoDeskripsi = () => {
        Swal.fire({
            icon: 'info',
            title: 'Jadi...',
            html: `
                <div class='container col-f t-left'>
                    <p>Di deskripsi proyek portofolio, kamu bisa jelaskan secara singkat tentang :</p>
                    <ol type=1>
                        <li>Tujuan proyek</li>
                        <li>Apa saja yang dikerjakan</li>
                        <li>Tools/teknologi yang digunakan</li>
                        <li>Timeline pengerjaan</li>
                        <li>Hasil akhir</li>
                        <li>Dll</li>
                    </ol>
                </div>
                `,
            showCloseButton: true,
            showConfirmButton: true,
            confirmButtonText: 'Oke'
        })
    }

    if (token && (role === isViews || isWebsite)) {
        return (
            <main className="container col-f f-center">
                <section className="container col-f full-width section-max">
                    <h1>Tambah Portofolio</h1>
                    <form onSubmit={handleSubmit} className="container col-f full-width">
                        {rows.map((item, idx) => {
                            const wc = wordCount(item.deskripsi);
                            return (
                                <div key={item._key} className="container col-f">
                                    <div className="container row-f f-between f-center">
                                        <h3 style={{ margin: 0 }}>Form {idx + 1}</h3>
                                        <div className="container row-f gap-1">
                                            <button type="button" className="btn btn-warning" onClick={() => removeRow(item._key)}
                                            >
                                                Hapus
                                            </button>
                                        </div>
                                    </div>

                                    <div className="container col-f-0">
                                        <label>Judul Proyek</label>
                                        <input name="judul" value={item.judul} onChange={(e) => handleChange(item._key, e)}
                                            type="text"
                                            placeholder="Masukkan judul proyek portofolio"
                                        />
                                        <p style={{ fontSize: '0.75rem', paddingTop: '0.5rem' }}>Proyek kreatif berupa video pendek berdurasi 1 menit dengan CGI ringan dan efek sinematik.</p>
                                    </div>

                                    <div className="container col-f-0">
                                        <label>Deskripsi Singkat Pengerjaan Proyek <i className="bi-question-circle fwb" onClick={infoDeskripsi}></i></label>
                                        <textarea name="deskripsi" value={item.deskripsi} onChange={(e) => handleChange(item._key, e)}
                                            className="textarea"
                                            placeholder="Contoh : Proyek ini bertujuan membuat video pendek berdurasi 1 menit dengan CGI ringan dan nuansa sinematik. Prosesnya meliputi penulisan konsep, pengambilan gambar, editing, dan penambahan efek. Dikerjakan dengan kamera DSLR, DaVinci Resolve, dan Blender 3D dalam waktu sekitar 10 hari. Hasil akhirnya berupa video kreatif yang siap dipublikasikan di media sosial."
                                        />
                                        <p style={{ fontSize: '0.75rem', paddingTop: '0.5rem' }}>
                                            Jumlah kata : <span className={wc > 100 ? 'c-red fwb' : ''}>{wc}</span>
                                        </p>
                                    </div>

                                    <div className="container col-f-0">
                                        <label>URL Hasil Proyek</label>
                                        <input name="link_hasil" value={item.link_hasil} onChange={(e) => handleChange(item._key, e)}
                                            type="text"
                                            placeholder="Masukkan url hasil proyek portofolio"
                                        />
                                        <p style={{ fontSize: '0.75rem', paddingTop: '0.5rem' }}>URL dapat berupa URL Cloud Drive yang bersifat publik.</p>
                                    </div>

                                    <div className="container col-f-0">
                                        <label>Kapan Selesainya?</label>
                                        <input
                                            name="tanggal_selesai"
                                            value={item.tanggal_selesai}
                                            onChange={(e) => handleChange(item._key, e)}
                                            type="date"
                                        />
                                    </div>

                                    <div className="container col-f-0">
                                        <label>Pilih Kategori *(Opsional)</label>
                                        <select id="kategori" name="kategori" value={item.kategori} onChange={(e) => handleChange(item._key, e)}>
                                            <option value="" key="">
                                                Pilih Kategori
                                            </option>
                                            <option value="animation" key="animation">
                                                Animation / CGI
                                            </option>
                                            <option value="arvr" key="arvr">
                                                AR / VR Project
                                            </option>
                                            <option value="branding" key="branding">
                                                Branding & Identity
                                            </option>
                                            <option value="content" key="content">
                                                Content Writing / Copywriting
                                            </option>
                                            <option value="data" key="data">
                                                Data Science / Machine Learning
                                            </option>
                                            <option value="education" key="education">
                                                Educational Project / E-Learning
                                            </option>
                                            <option value="game" key="game">
                                                Game Development
                                            </option>
                                            <option value="graphic" key="graphic">
                                                Graphic Design
                                            </option>
                                            <option value="illustration" key="illustration">
                                                Illustration / Digital Art
                                            </option>
                                            <option value="iot" key="iot">
                                                IoT Project
                                            </option>
                                            <option value="marketing" key="marketing">
                                                Digital Marketing
                                            </option>
                                            <option value="motion" key="motion">
                                                Motion Graphics
                                            </option>
                                            <option value="mobile" key="mobile">
                                                Mobile App Development
                                            </option>
                                            <option value="other" key="other">
                                                Lainnya
                                            </option>
                                            <option value="photo" key="photo">
                                                Photography
                                            </option>
                                            <option value="presentation" key="presentation">
                                                Presentation Design
                                            </option>
                                            <option value="research" key="research">
                                                Research / Case Study
                                            </option>
                                            <option value="uiux" key="uiux">
                                                UI/UX Design
                                            </option>
                                            <option value="video" key="video">
                                                Video Production
                                            </option>
                                            <option value="web" key="web">
                                                Web Development
                                            </option>

                                        </select>
                                    </div>

                                </div>
                            )
                        })}
                        <button
                            type="button"
                            onClick={addEmptyRow}
                            className="btn btn-primary m-t1"
                        >
                            + Tambah Form Kosong
                        </button>
                        <div className="container row-f f-wrap f-1">
                            <button onClick={cancelSubmit} className="btn btn-danger f-1">
                                Batal
                            </button>
                            <button type="submit" className="btn btn-primary f-1">
                                Selesai
                            </button>
                        </div>
                    </form>
                </section>
            </main>
        );
    } else {
        window.location.href = `/user/login`;
    }
}

export default CreatePortofolio;