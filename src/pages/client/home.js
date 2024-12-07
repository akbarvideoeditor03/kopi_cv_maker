import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserId, readPengalamanKerja, deletePengalamanKerja, readPendidikanTerakhir, deletePendidikanTerakhir, readKeahlian, deleteKeahlian } from "../../redux/action/user.action";
import Swal from "sweetalert2";

function HomeUser() {
    const id = localStorage.getItem('id');
    const dispatch = useDispatch();
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    const { userList, pengalamanKerja, pendidikanTerakhir, keahlian } = useSelector((state) => state.userReducer);

    useEffect(() => {
        dispatch(getUserId(id));
        dispatch(readPengalamanKerja(id));
        dispatch(readPendidikanTerakhir(id));
        dispatch(readKeahlian(id));
    }, [dispatch, id]);

    const deleteData = (id, type) => {
        Swal.fire({
            title: 'Apakah Anda yakin?',
            text: "Data yang dihapus tidak dapat dikembalikan!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Ya, hapus!',
            cancelButtonText: 'Batal',
        }).then((result) => {
            if (result.isConfirmed) {
                if(type === 'pendidikan') {
                    dispatch(deletePendidikanTerakhir(id));
                } else if (type === 'pengalamanKerja') {
                    dispatch(deletePengalamanKerja(id));
                } else if (type === 'keahlian') {
                    dispatch(deleteKeahlian(id));
                }
                Swal.fire({
                    icon: 'success',
                    title: 'Dihapus!',
                    text: 'Data berhasil dihapus.',
                    timer: 2000,
                    showConfirmButton: false,
                    allowEscapeKey: false,
                    allowOutsideClick: false,
                    timerProgressBar: true,
                })
            }
        });
    }

    if (token && role === 'user') {
        return (
            <main className="container col-f f-center">
                <section className="container col-f full-width section-max">
                    <h1>Menu</h1>
                    <div className="grid gc-1 gc-2 gc-3 gc-4 m-bt2">
                        <a href="/createpengalamankerja" className="btn btn-primary">Tambah Pengalaman Kerja</a>
                        <a href="/pendidikanterakhir" className="btn btn-primary">Tambah Pendidikan Terakhir</a>
                        <a href="/#" className="btn btn-primary">Tambah Prestasi Kerja</a>
                        <a href="/keahlian" className="btn btn-primary">Tambah Keahlian / Skill</a>
                        <a href="/#" className="btn btn-primary">Tambah Pelatihan</a>
                    </div>
                    <div className="container row-f f-between f-wrap f-center">
                        <h1>Yeay!, ini adalah preview dari CV kamu</h1>
                        <div className="container row-f">
                            <a className="btn btn-info" href="/#">Download CV</a>
                        </div>
                    </div>
                    <div className="card container col-f f-1">
                        <div className="container row-f f-wrap">
                            <div className="container col-f f-1">
                                <div className="container row-f f-wrap">
                                    <div className="container col-f f-1">
                                        <h1 style={{ fontSize: '1.85rem' }}>{userList.nama}</h1>
                                        <p>{pendidikanTerakhir.map((item) => item.jurusan)}</p>
                                    </div>
                                    <div className="container col-f f-center-c">
                                        <img className="cv-image" src={`${userList.foto_profil}`} alt="" />
                                    </div>
                                </div>
                                <div className="container row-f f-wrap">
                                    <div className="container col-f f-1">
                                        <p>{userList.email}</p>
                                    </div>
                                    <div className="container col-f f-1">
                                        <p>{userList.no_telp}</p>
                                    </div>
                                    <div className="container col-f f-1">
                                        <p>{userList.alamat}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="container col-f">
                                <a className="btn btn-primary" href={`/edit/${id}`}><i className="bi-pencil-square"></i></a>
                            </div>
                        </div>
                        <div className="container row-f f-wrap m-b1">
                            <div className="container col-f f-1">
                                <h1>Pendidikan Terakhir</h1>
                                {pendidikanTerakhir.map((item) => {
                                    return (
                                        <div key={item.id} className="container row-f f-wrap">
                                            <div className="container col-f f-1">
                                                <p style={{ fontSize: "1.15rem" }} className="fw7">{item.institusi}</p>
                                                <p className="fw6">{item.tahun_mulai.slice(0, 4)} - <span>{item.tahun_selesai}</span></p>
                                            </div>
                                            <div className="container col-f f-1">
                                                <p>Jurusan</p>
                                                <p>{item.jurusan}</p>
                                            </div>
                                            <div className="container col-f">
                                                <a className="btn btn-primary" href={`/pendidikanterakhir/${userList.id}/${item.id}`}><i className="bi-pencil-square"></i></a>
                                                <button className="btn btn-danger" onClick={() => deleteData(item.id, 'pendidikan')}><i className="bi-trash"></i></button>
                                            </div>
                                        </div>
                                    )
                                })
                                }
                            </div>
                        </div>
                        <div className="container row-f f-wrap">
                            <div className="container col-f f-1">
                                <h1>Pengalaman Kerja</h1>
                                {pengalamanKerja.map((item) => {
                                    return (
                                        <div style={{ paddingBlock: '1rem' }} key={item.id} className="container row-f f-wrap">
                                            <div className="container col-f f-1">
                                                <p style={{ fontSize: "1.15rem" }} className="fw7">{item.pengalaman_kerja}</p>
                                                <p className="fw6">{item.tahun_mulai.slice(0, 4)} - <span>{item.tahun_selesai}</span></p>
                                            </div>
                                            <div className="container col-f f-1">
                                                <p className="fw6">{item.jabatan}</p>
                                                <p>{item.deskripsi}</p>
                                            </div>
                                            <div className="container col-f">
                                                <a className="btn btn-primary" href={`/pengalamankerja/${userList.id}/${item.id}`}><i className="bi-pencil-square"></i></a>
                                                <button className="btn btn-danger" onClick={() => deleteData(item.id, 'pengalamanKerja')}><i className="bi-trash"></i></button>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                        <div className="container row-f f-wrap">
                            <div className="container col-f f-1">
                                <h1>Keahlian / Skill</h1>
                                <div className="grid gc-1 gc-2 gc-3 gc-4">
                                    {keahlian.map((item) => {
                                        return(
                                            <div key={item.id} className="card-mini container col-f">
                                                <div style={{minHeight : "3.5rem"}} className="container row-f">
                                                    <div className="container col-f-0 f-1">
                                                        <h3>{item.keahlian}</h3>
                                                        <p>{item.tingkat}</p>
                                                    </div>
                                                    <div className="container col-f">
                                                        <a className="btn btn-primary" href={`/keahlian/${userList.id}/${item.id}`}><i className="bi-pencil-square"></i></a>
                                                        <button className="btn btn-danger" onClick={() => deleteData(item.id, 'keahlian')}><i className="bi-trash"></i></button>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>
                        <div className="container row-f f-wrap m-b1">
                            <div className="container col-f f-1">
                                <h1>Pelatihan / Kursus (Opsional)</h1>
                            </div>
                        </div>
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

export default HomeUser;