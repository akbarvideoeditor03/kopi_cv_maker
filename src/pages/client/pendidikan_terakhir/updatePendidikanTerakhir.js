import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { readPendidikanTerakhir, updatePendidikanTerakhir } from "../../../redux/action/user.action";
import Swal from "sweetalert2";

function UpdatePendidikanTerakhir() {
    const { id } = useParams();
    const idUser = localStorage.getItem('id');
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    const dispatch = useDispatch();
    const { pendidikanTerakhir } = useSelector((state) => state.userReducer);

    const [data, setData] = useState({
        institusi: "",
        jurusan: "",
        tahun_mulai: "",
        tahun_selesai: ""
    });

    useEffect(() => {
        if (idUser) {
            dispatch(readPendidikanTerakhir(idUser));
        }
    }, [dispatch, idUser])

    useEffect(() => {
        const currentData = pendidikanTerakhir.find((item) => item.id === parseInt(id));
        if (currentData) {
            setData({
                institusi: currentData.institusi || "",
                jurusan: currentData.jurusan || "",
                tahun_mulai: currentData.tahun_mulai || "",
                tahun_selesai: currentData.tahun_selesai || ""
            })
        }
    }, [pendidikanTerakhir, idUser])

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
                const updatedPendidikanTerakhir = {
                    institusi: data.institusi,
                    jurusan: data.jurusan,
                    tahun_mulai: data.tahun_mulai,
                    tahun_selesai: data.tahun_selesai || 'Hingga saat ini',
                }
                dispatch(updatePendidikanTerakhir(id, updatedPendidikanTerakhir));
            }
        } catch (error) {
            Swal.fire({
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
                    <h1>Edit Pendidikan Terakhir</h1>
                    <div className="container col-f f-center-c">
                        <form onSubmit={handleSubmit} className="container col-f full-width">
                            <div className="container col-f-0">
                                <label>Nama Institusi</label>
                                <input name="institusi" value={data.institusi} onChange={(e) => setData({ ...data, [e.target.name]: e.target.value })} type="text" placeholder="Masukkan institusi" />
                                <p style={{ fontSize: '0.75rem', paddingTop: '0.5rem' }}>Contohnya : nama universitas, atau nama sekolah</p>
                            </div>
                            <div className="container col-f-0">
                                <label>Jurusan</label>
                                <input name="jurusan" value={data.jurusan} onChange={(e) => setData({ ...data, [e.target.name]: e.target.value })} type="text" placeholder="Masukkan jurusan" />
                                <p style={{ fontSize: '0.75rem', paddingTop: '0.5rem' }}>Contohnya : Perkantoran</p>
                            </div>
                            <div className="container col-f-0">
                                <label>Tahun Mulai</label>
                                <input name="tahun_mulai" value={data.tahun_mulai} onChange={(e) => setData({ ...data, [e.target.name]: e.target.value })} type="date" />
                                <p style={{ fontSize: '0.75rem', paddingTop: '0.5rem' }}>*Form ini hanya akan menampilkan bulan dan tahun saja</p>
                            </div>
                            <div className="container col-f-0">
                                <label>*Tahun Selesai (Opsional)</label>
                                <input name="tahun_selesai" value={data.tahun_selesai} onChange={(e) => setData({ ...data, [e.target.name]: e.target.value })} type="text" placeholder="Contohnya : 2023" />
                                <p style={{ fontSize: '0.75rem', paddingTop: '0.5rem' }}>*Jika pendidikan terakhir masih berlangsung, maka kosongkan saja</p>
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

export default UpdatePendidikanTerakhir;