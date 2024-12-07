import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { readKeahlian, updateKeahlian } from "../../../redux/action/user.action";
import Swal from "sweetalert2";

function UpdateKeahlian() {
    const { id } = useParams();
    const idUser = localStorage.getItem('id');
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    const dispatch = useDispatch();
    const { keahlian } = useSelector((state) => state.userReducer);

    const [data, setData] = useState({
        keahlian: "",
        tingkat: ""
    });

    useEffect(() => {
        if (idUser) {
            dispatch(readKeahlian(idUser));
        }
    }, [dispatch, idUser]);

    useEffect(() => {
        const currentData = keahlian.find((item) => item.id === parseInt(id));
        if (currentData) {
            setData({
                keahlian: currentData.keahlian || "",
                tingkat: currentData.tingkat || "",
            })
        }
    }, [keahlian, idUser])

    const cancelSubmit = async (e) => {
        e.preventDefault();
        Swal.fire({
            title: 'Yakin mau batal?',
            text: 'Perubahan kamu bakal hilang loh...',
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
            const keahlianUser = {
                keahlian: data.keahlian,
                tingkat: data.tingkat,
            }
            dispatch(updateKeahlian(id, keahlianUser));
            setData({
                keahlian: "",
                tingkat: "",
            });
            await Swal.fire({
                icon: "success",
                title: "Selamat",
                text: "Keahlian berhasil diubah",
                showConfirmButton: false,
                timer: 3000,
                allowEscapeKey: false,
                allowOutsideClick: false,
                timerProgressBar: true,
            }).then(() => {
                window.location = "/home";
            });
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
                    <h1>Tambah Keahlian / Skill</h1>
                    <div className="container col-f f-center-c">
                        <form onSubmit={handleSubmit} className="container col-f full-width">
                            <div className="container col-f-0">
                                <label>Keahlian</label>
                                <input name="keahlian" value={data.keahlian} onChange={(e) => setData({ ...data, [e.target.name]: e.target.value })} type="text" placeholder="Masukkan jenis keahlian" />
                                <p style={{ fontSize: '0.75rem', paddingTop: '0.5rem' }}>Contohnya : Video Editing</p>
                            </div>
                            <div className="container col-f-0">
                                <label>Pilih Tingkatan</label>
                                <select id="tingkat" name="tingkat" value={data.tingkat} onChange={(e) => setData({ ...data, [e.target.name]: e.target.value })}>
                                    <option value="Dasar" key="dasar">Dasar</option>
                                    <option value="Menengah" key="menengah">Menengah</option>
                                    <option value="Profesional" key="profesional">Profesional</option>
                                </select>
                                <p style={{ fontSize: '0.75rem', paddingTop: '0.5rem' }}>Contohnya : Menengah</p>
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

export default UpdateKeahlian;