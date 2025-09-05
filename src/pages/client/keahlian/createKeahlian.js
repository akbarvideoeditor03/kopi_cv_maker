import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createKeahlian, getUserId } from "../../../redux/action/user.action";
import Swal from "sweetalert2";

function CreateKeahlian() {
    const dispatch = useDispatch();
    const token = localStorage.getItem("&l2");
    const role = localStorage.getItem("$f*");
    const id = localStorage.getItem("/v%");
    const { isWebsite, isViews } = useSelector((state) => state.userReducer);

    const makeRow = (overrides = {}) => ({
        _key: `${Date.now().toString(36)}${Math.random().toString(36).slice(2)}`,
        keahlian: "",
        tingkat: "",
        ...overrides,
    });
    const [rows, setRows] = useState([makeRow()]);

    useEffect(() => {
        dispatch(getUserId(id, role));
    }, [dispatch, id, role]);

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

    const isRowFilledAtAll = (r) => r.keahlian || r.tingkat;
    const isRowComplete = (r) => r.keahlian && r.tingkat;

    const handleSubmit = async (e) => {
        e.preventDefault();

        const partiallyFilled = rows.filter(isRowFilledAtAll);
        const completeRows = partiallyFilled.filter(isRowComplete);

        if (completeRows.length === 0) {
            Swal.fire({
                icon: "error",
                title: "Belum ada data lengkap",
                text: "Isi minimal 1 form (Keahlian + Tingkat).",
            });
            return;
        }

        try {
            await Promise.all(
                completeRows.map((item) =>
                    dispatch(
                        createKeahlian(id, role, {
                            keahlian: item.keahlian,
                            tingkat: item.tingkat,
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
                        ? `Terkirim ${completeRows.length} keahlian. ${skipped} form parsial di-skip.`
                        : `Terkirim ${completeRows.length} keahlian.`,
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

    if (token && (role === isViews || isWebsite)) {
        return (
            <main className="container col-f f-center">
                <section className="container col-f full-width section-max">
                    <h1>Tambah Keahlian / Skill</h1>
                    <form onSubmit={handleSubmit} className="container col-f full-width">
                        {rows.map((item, idx) => (
                            <div key={item._key} className="container col-f">
                                <div className="container row-f f-between f-center">
                                    <h3 style={{ margin: 0 }}>Form {idx + 1}</h3>
                                    <div className="container row-f gap-1">
                                        <button
                                            type="button"
                                            className="btn btn-warning"
                                            onClick={() => removeRow(item._key)}
                                        >
                                            Hapus
                                        </button>
                                    </div>
                                </div>

                                <div className="container col-f-0">
                                    <label>Keahlian</label>
                                    <input
                                        name="keahlian"
                                        value={item.keahlian}
                                        onChange={(e) => handleChange(item._key, e)}
                                        type="text"
                                        placeholder="Masukkan jenis keahlian"
                                    />
                                    <p style={{ fontSize: "0.75rem", paddingTop: "0.5rem" }}>
                                        Contohnya: Video Editing
                                    </p>
                                </div>

                                <div className="container col-f-0">
                                    <label>Pilih Tingkatan</label>
                                    <select
                                        className="select-option"
                                        name="tingkat"
                                        value={item.tingkat}
                                        onChange={(e) => handleChange(item._key, e)}
                                    >
                                        <option value="">Pilih tingkatan</option>
                                        <option value="Pemula">Pemula</option>
                                        <option value="Pemula Tingkat Lanjut">Pemula Tingkat Lanjut</option>
                                        <option value="Kompeten">Kompeten</option>
                                        <option value="Mahir">Mahir</option>
                                        <option value="Ahli">Ahli</option>
                                    </select>
                                    <p style={{ fontSize: "0.75rem", paddingTop: "0.5rem" }}>
                                        Contohnya: Kompeten
                                    </p>
                                </div>
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={addEmptyRow}
                            className="btn btn-primary m-t1"
                        >
                            + Tambah Form Kosong
                        </button>
                        <div className="card-mini">
                            <h4>
                                Harap Perhatikan <i className="bi-exclamation-triangle-fill"></i>
                            </h4>
                            <p style={{ marginTop: "5px" }}>
                                Saat memilih tingkat keahlian, pastikan sesuai dengan kemampuan kamu
                                saat ini. Keahlian itu dinamis dan bisa berkembang terus.{" "}
                                <i className="bi-emoji-smile"></i>
                            </p>
                        </div>
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

export default CreateKeahlian;
