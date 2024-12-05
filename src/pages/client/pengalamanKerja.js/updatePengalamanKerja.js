import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updatePengalamanKerja } from "../../../redux/action/user.action";
import Swal from "sweetalert2";

function UpdatePengalamanKerja() {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    const dispatch = useDispatch();
    const id = localStorage.getItem('id');
    const [pengalamanKerja, setPengalamanKerja] = useState({
        id_user: "",
        pengalaman_kerja: "",
        jabatan: "",
        deskripsi: "",
        tahun_mulai: "",
        tahun_selesai: ""
    });
    const wordCount = pengalamanKerja.deskripsi.trim().split(/\s+/).filter(Boolean).length;
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

        if (wordCount > 30) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: `Tentang tidak boleh lebih dari 20 kata. Saat ini ada ${wordCount} kata.`,
            });
            return;
        }

        try {
            const pengalamanKerjaUser = {
                id_user: `${id}`,
                pengalaman_kerja: pengalamanKerja.pengalaman_kerja,
                jabatan: pengalamanKerja.jabatan,
                deskripsi: pengalamanKerja.deskripsi,
                tahun_mulai: pengalamanKerja.tahun_mulai,
                tahun_selesai: pengalamanKerja.tahun_selesai || 'Hingga saat ini',
            }
            console.log(pengalamanKerjaUser);

            dispatch(updatePengalamanKerja(pengalamanKerjaUser));

            setPengalamanKerja({
                id_user: "",
                pengalaman_kerja: "",
                jabatan: "",
                deskripsi: "",
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
                text: "Pengalaman kerja berhasil ditambahkan",
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
                    <h1>Pengalaman Kerja</h1>
                    <div className="container col-f f-center-c">
                        <form onSubmit={handleSubmit} className="container col-f full-width">
                            <div className="container col-f-0">
                                <label>Di mana</label>
                                <input name="pengalaman_kerja" value={pengalamanKerja.pengalaman_kerja} onChange={(e) => setPengalamanKerja({ ...pengalamanKerja, [e.target.name]: e.target.value })} type="text" placeholder="Masukkan pengalaman kerja" />
                                <p style={{fontSize :'0.75rem', paddingTop : '0.5rem'}}>Contohnya : PT. Aneka Hidangan Lezat</p>
                            </div>
                            <div className="container col-f-0">
                                <label>Jabatan</label>
                                    <input name="jabatan" value={pengalamanKerja.jabatan} onChange={(e) => setPengalamanKerja({ ...pengalamanKerja, [e.target.name]: e.target.value })} type="text" placeholder="Masukkan jabatan kerja" />
                                <p style={{fontSize :'0.75rem', paddingTop : '0.5rem'}}>Contohnya : Customer Service</p>
                            </div>
                            <div className="container col-f-0">
                                <label>Detail Kerja</label>
                                <textarea
                                    name="deskripsi"
                                    value={pengalamanKerja.deskripsi}
                                    onChange={(e) => setPengalamanKerja({ ...pengalamanKerja, [e.target.name]: e.target.value })}
                                    className="textarea"
                                    type="text"
                                    placeholder="Masukkan detail kerja" />
                                <p style={{fontSize :'0.75rem', paddingTop : '0.5rem'}}>Contohnya : Melayani pertanyaan pelanggan | <span>Jumlah kata : {`${wordCount}`}</span></p>
                            </div>
                            <div className="container col-f-0">
                                <label>Tahun Mulai</label>
                                <input name="tahun_mulai" value={pengalamanKerja.tahun_mulai} onChange={(e) => setPengalamanKerja({ ...pengalamanKerja, [e.target.name]: e.target.value })} type="month" />
                                <p style={{fontSize :'0.75rem', paddingTop : '0.5rem'}}>*Form ini hanya akan menampilkan tahun saja</p>
                            </div>
                            <div className="container col-f-0">
                                <label>*Tahun Selesai (Opsional)</label>
                                <input name="tahun_selesai" value={pengalamanKerja.tahun_selesai} onChange={(e) => setPengalamanKerja({ ...pengalamanKerja, [e.target.name]: e.target.value })} type="text" placeholder="Contohnya : 2023" />
                                <p style={{fontSize :'0.75rem', paddingTop : '0.5rem'}}>*Jika pengalaman kerja masih berlangsung, maka kosongkan saja</p>
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