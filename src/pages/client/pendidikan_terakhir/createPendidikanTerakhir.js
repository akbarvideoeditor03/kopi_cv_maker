import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createPendidikanTerakhir } from "../../../redux/action/user.action";
import Swal from "sweetalert2";

function CreatePendidikanTerakhir() {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    const dispatch = useDispatch();
    const id = localStorage.getItem('id');
    const [pendidikanTerakhir, setPendidikanTerakhir] = useState({
        id_user: "",
        institusi: "",
        jurusan: "",
        tahun_mulai: "",
        tahun_selesai: ""
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
        })
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(!pendidikanTerakhir.institusi) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Nama institusi tidak boleh kosong",
            });
            return;
        }

        if(!pendidikanTerakhir.jurusan) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Jurusan institusi tidak boleh kosong",
            });
            return;
        }

        if(!pendidikanTerakhir.tahun_mulai) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Tahun mulai tidak boleh kosong",
            });
            return;
        }

        try {
            const pendidikanTerakhirUser = {
                id_user: `${id}`,
                institusi: pendidikanTerakhir.institusi,
                jurusan: pendidikanTerakhir.jurusan,
                tahun_mulai: pendidikanTerakhir.tahun_mulai,
                tahun_selesai: pendidikanTerakhir.tahun_selesai || 'Hingga saat ini',
            }

            dispatch(createPendidikanTerakhir(pendidikanTerakhirUser));

            setPendidikanTerakhir({
                id_user: "",
                institusi: "",
                jurusan: "",
                tahun_mulai: "",
                tahun_selesai: ""
            });
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Something went wrong!",
            });
        } finally {
            Swal.fire({
                icon: "success",
                title: "Selamat",
                text: "Pendidikan Terakhir berhasil ditambahkan",
                showConfirmButton: false,
                timer: 3000,
                allowEscapeKey: false,
                allowOutsideClick: false,
                timerProgressBar: true,
            }).then(() => {
                Swal.close();
                window.location = '/home';
            });
        }
    };

    if (token && role === 'user') {
        return (
            <main className="container col-f f-center">
                <section className="container col-f full-width section-max">
                    <h1>Pendidikan Terakhir</h1>
                    <div className="container col-f f-center-c">
                        <form onSubmit={handleSubmit} className="container col-f full-width">
                            <div className="container col-f-0">
                                <label>Nama Institusi</label>
                                <input name="institusi" value={pendidikanTerakhir.institusi} onChange={(e) => setPendidikanTerakhir({ ...pendidikanTerakhir, [e.target.name]: e.target.value })} type="text" placeholder="Masukkan institusi" />
                                <p style={{fontSize :'0.75rem', paddingTop : '0.5rem'}}>Contohnya : nama universitas, atau nama sekolah</p>
                            </div>
                            <div className="container col-f-0">
                                <label>Jurusan</label>
                                <input name="jurusan" value={pendidikanTerakhir.jurusan} onChange={(e) => setPendidikanTerakhir({ ...pendidikanTerakhir, [e.target.name]: e.target.value })} type="text" placeholder="Masukkan jurusan" />
                                <p style={{fontSize :'0.75rem', paddingTop : '0.5rem'}}>Contohnya : Perkantoran</p>
                            </div>
                            <div className="container col-f-0">
                                <label>Tahun Mulai</label>
                                <input name="tahun_mulai" value={pendidikanTerakhir.tahun_mulai} onChange={(e) => setPendidikanTerakhir({ ...pendidikanTerakhir, [e.target.name]: e.target.value })} type="month" />
                                <p style={{fontSize :'0.75rem', paddingTop : '0.5rem'}}>*Form ini hanya akan menampilkan tahun saja</p>
                            </div>
                            <div className="container col-f-0">
                                <label>*Tahun Selesai (Opsional)</label>
                                <input name="tahun_selesai" value={pendidikanTerakhir.tahun_selesai} onChange={(e) => setPendidikanTerakhir({ ...pendidikanTerakhir, [e.target.name]: e.target.value })} type="text" placeholder="Contohnya : 2023" />
                                <p style={{fontSize :'0.75rem', paddingTop : '0.5rem'}}>*Jika pendidikan terakhir masih berlangsung, maka kosongkan saja</p>
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

export default CreatePendidikanTerakhir;