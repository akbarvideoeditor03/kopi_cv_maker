import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { readPengalamanKerja, updatePengalamanKerja } from "../../../redux/action/user.action";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const UpdatePengalamanKerja = ({}) => {
    const { id } = useParams();
    const idUser= localStorage.getItem('id')
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    const dispatch = useDispatch();
    const { pengalamanKerja } = useSelector((state) => state.userReducer);

    const [data, setData] = useState({
        id_user: idUser || "",
        lokasi: "",
        jabatan: "",
        detail: "",
        tahun_mulai: "",
        tahun_selesai: ""
    });

    useEffect(() => {
        if (idUser) {
            dispatch(readPengalamanKerja(idUser));
        }
    }, [dispatch, idUser])

    useEffect(() => {
        const currentData = pengalamanKerja.find((item) => item.id === parseInt(id));
        if (currentData) {
            setData({
                id_user: "",
                lokasi: currentData.lokasi || "",
                jabatan: currentData.jabatan || "",
                detail: currentData.detail || "",
                tahun_mulai: currentData.tahun_mulai || "",
                tahun_selesai: currentData.tahun_selesai || ""
            })
        }
    }, [pengalamanKerja, idUser])


    const wordCount = data.detail.trim().split(/\s+/).filter(Boolean).length;
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
        })
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const result = await Swal.fire({
                icon: "question",
                title: "Tunggu",
                text: "Apa informasinya udah benar semua?",
                confirmButtonText: "Iya, udah",
                cancelButtonText: "Lanjutin",
                allowOutsideClick: false,
                showCancelButton: true
            });

            if (result.isConfirmed) {
                const updatedPengalamanKerja = {
                    lokasi: data.lokasi,
                    jabatan: data.jabatan,
                    detail: data.detail,
                    tahun_mulai: data.tahun_mulai,
                    tahun_selesai: data.tahun_selesai || "Hingga saat ini",
                };
                dispatch(updatePengalamanKerja(id, updatedPengalamanKerja));
            };
        } catch (error) {
            console.error("Error saat menambahkan pengalaman kerja:", error);
            await Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Something went wrong!",
            });
        }
    };
    if (token && role === 'user') {
        return (
            <main className="container col-f f-center">
                <section className="container col-f full-width section-max">
                    <h1>Edit Pengalaman Kerja</h1>
                    <div className="container col-f f-center-c">
                        <form onSubmit={handleSubmit} className="container col-f full-width">
                            <div className="container col-f-0">
                                <label>Lokasi Kerja</label>
                                <input name="lokasi" value={data.lokasi} onChange={(e) => setData({ ...data, [e.target.name]: e.target.value })} type="text" placeholder="Masukkan lokasi kerja" />
                                <p style={{ fontSize: '0.75rem', paddingTop: '0.5rem' }}>Contohnya : PT Aneka Hidangan Lezat</p>
                            </div>
                            <div className="container col-f-0">
                                <label>Jabatan Kerja</label>
                                <input name="jabatan" value={data.jabatan} onChange={(e) => setData({ ...data, [e.target.name]: e.target.value })} type="text" placeholder="Masukkan jabatan kerja" />
                                <p style={{ fontSize: '0.75rem', paddingTop: '0.5rem' }}>Contohnya : Customer Service</p>
                            </div>
                            <div className="container col-f-0">
                                <label>Detail Kerja</label>
                                <textarea
                                    name="detail"
                                    value={data.detail}
                                    onChange={(e) => setData({ ...data, [e.target.name]: e.target.value })}
                                    className="textarea"
                                    type="text"
                                    placeholder="Masukkan detail kerja" />
                                <div className="container row-f f-between">
                                    <p style={{ fontSize: '0.75rem', paddingTop: '0.5rem' }}>Contohnya : Melayani pertanyaan pelanggan | <span>Jumlah kata : {`${wordCount}`}</span></p>
                                    <p style={{ fontSize: '0.75rem', paddingTop: '0.5rem', fontStyle: 'italic' }}>*Detail kerja akan ditampilkan dalam bentuk paragraf</p>
                                </div>
                            </div>
                            <div className="container col-f-0">
                                <label>Tahun Mulai Kerja</label>
                                <input name="tahun_mulai" value={data.tahun_mulai} onChange={(e) => setData({ ...data, [e.target.name]: e.target.value })} type="date" />
                                <p style={{ fontSize: '0.75rem', paddingTop: '0.5rem' }}>*Form ini hanya akan menampilkan bulan dan tahun saja</p>
                            </div>
                            <div className="container col-f-0">
                                <label>*Tahun Selesai (Opsional)</label>
                                <input name="tahun_selesai" value={data.tahun_selesai} onChange={(e) => setData({ ...data, [e.target.name]: e.target.value })} type="text" placeholder="Contohnya : September 2023" />
                                <p style={{ fontSize: '0.75rem', paddingTop: '0.5rem' }}>*Jika pengalaman kerja masih berlangsung, maka kosongkan saja</p>
                            </div>
                            <div className="container row-f f-wrap f-1 m-t1">
                                <button onClick={cancelSubmit} style={{ fontSize: '1rem' }} className="btn btn-danger f-1">
                                    Batal
                                </button>
                                <button style={{ fontSize: '1rem' }} type="submit" className="btn btn-primary f-1">Selesai</button>
                            </div>
                        </form>
                    </div>
                </section>
            </main>
        )
    } else {
        return (
            <main className="container col-f f-center">
                <section className="container col-f full-width section-max f-center">
                    <img style={{ width: "100px" }} src="https://raw.githubusercontent.com/akbarvideoeditor03/FE/9f842f2ac51bb2ae58be404178393037e6fae347/public/assets/icon/register.svg" alt="" />
                    <p className="t-center">Silakan daftar dahulu</p>
                    <strong>ADMIN KOPI</strong>
                </section>
            </main>
        )
    }
}

export default UpdatePengalamanKerja;