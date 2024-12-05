import React from "react";

function HomeUser() {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    if (token && role === 'user') {
        return (
            <main className="container col-f f-center">
                <section className="container col-f full-width section-max">
                    <h1>Menu</h1>
                    <div className="grid gc-1 gc-2 gc-3 gc-4 m-bt2">
                        <a href="/createpengalamankerja" className="btn btn-primary">Tambah Pengalaman Kerja</a>
                        <a href="/creatependidikanterakhir" className="btn btn-primary">Tambah Pendidikan Terakhir</a>
                        <a href="#" className="btn btn-primary">Tambah Prestasi Kerja</a>
                        <a href="#" className="btn btn-primary">Tambah Keahlian / Skill</a>
                        <a href="#" className="btn btn-primary">Tambah Pelatihan</a>
                    </div>
                    <div className="container row-f f-between f-wrap f-center">
                    <h1>Yeay!, ini adalah preview dari CV kamu</h1>
                    <div className="container row-f">
                        <a className="btn btn-info" href="">Download CV</a>
                    </div>
                    </div>
                    <div className="card container col-f f-1">
                        <div className="container row-f f-wrap">
                            <div className="container col-f f-1">
                                <h1><i>data nama</i></h1>
                                <p><i>data pekerjaan yang akan diambil</i></p>
                            </div>
                            <div className="container col-f f-center-c">
                                <h1>Gambar PP</h1>
                            </div>
                        </div>
                        <div className="container row-f f-wrap">
                            <div className="container col-f f-1">
                                <p><i>data email</i></p>
                            </div>
                            <div className="container col-f f-1">
                                <p><i>nomor telepon</i></p>
                            </div>
                            <div className="container col-f f-1">
                                <p><i>data alamat</i></p>
                            </div>
                        </div>
                        <div className="container row-f f-wrap m-b1">
                            <div className="container col-f f-1">
                                <h1>Pendidikan</h1>
                                <div className="container row-f f-wrap">
                                    <div className="container col-f f-1">
                                        <p><i>data nama instansi</i></p>
                                        <p><i>data tanggal mulai</i></p>
                                        <p><i>data tanggal akhir</i></p>
                                    </div>
                                    <div className="container col-f f-1">
                                        <p>Jurusan</p>
                                        <p><i>data jurusan</i></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="container row-f f-wrap">
                            <div className="container col-f f-1">
                                <h1>Pengalaman Kerja</h1>
                                <div className="container row-f f-wrap">
                                    <div className="container col-f f-1">
                                        <p><i>data nama pekerjaan</i></p>
                                        <p><i>data tanggal mulai</i></p>
                                        <p><i>data tanggal akhir</i></p>
                                    </div>
                                    <div className="container col-f f-1">
                                        <p><i>data jabatan</i></p>
                                        <p><i>data deskripsi</i></p>
                                        <div className="container col-f f-1 m-b1">
                                            <h4>Prestasi Kerja (Opsional)</h4>
                                            <div className="container row-f f-wrap">
                                                <ul>
                                                    <li>Prestasi Kerja 1</li>
                                                    <li>Prestasi Kerja 2</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="container row-f f-wrap">
                            <div className="container col-f f-1">
                                <h1>Keahlian / Skill</h1>
                                <div className="grid gc-1 gc-2 gc-3 gc-4">
                                    <div className="card-mini container col-f">
                                        <h4><i>data kemampuan</i></h4>
                                        <p><i>data tingkat</i></p>
                                    </div>
                                    <div className="card-mini container col-f">
                                        <h4><i>data kemampuan</i></h4>
                                        <p><i>data tingkat</i></p>
                                    </div>
                                    <div className="card-mini container col-f">
                                        <h4><i>data kemampuan</i></h4>
                                        <p><i>data tingkat</i></p>
                                    </div>
                                    <div className="card-mini container col-f">
                                        <h4><i>data kemampuan</i></h4>
                                        <p><i>data tingkat</i></p>
                                    </div>
                                    <div className="card-mini container col-f">
                                        <h4><i>data kemampuan</i></h4>
                                        <p><i>data tingkat</i></p>
                                    </div>
                                    <div className="card-mini container col-f">
                                        <h4><i>data kemampuan</i></h4>
                                        <p><i>data tingkat</i></p>
                                    </div>
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