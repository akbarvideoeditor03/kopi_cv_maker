import React, { useState } from "react";

function Help() {
    const [openCollapse, setOpenCollapse] = useState({});

    const handleToggle = (index) => {
        setOpenCollapse((prev) => ({
            ...prev,
            [index]: !prev[index],
        }));
    };

    return (
        <main className="container col-f f-center-c generalPg-bg">
            <section className="container col-f f-1 section-max full-width">
                <button style={{ color: 'white', fontSize: "1rem" }} type="button" className="collapsible full-width btn btn-info" onClick={() => handleToggle(1)}>
                    Cara membuat akun KOPI
                </button>
                <div className="content-collapsible" style={{ display: openCollapse[1] ? "flex" : "none" }}>
                    <ul type="1">
                        <li>Buka website KOPI di link <i>(link)</i></li>
                        <li>Klik menu Daftar</li>
                        <li>Masukkan data diri kamu, seperti</li>
                        <li>
                            Mohon isi form dengan penuh kehati-hatian <i className="bi-exclamation-triangle-fill"></i>
                            <ul type="disc" className="container col-f-0">
                                <li>Nama</li>
                                <li>Nomor Telepon</li>
                                <li>Alamat</li>
                                <li>Tentang</li>
                                <li>Foto Profil</li>
                                <li>Email</li>
                                <li>Password, minimal 8 karakter</li>
                            </ul>
                        </li>
                        <li>Setelah kamu menekan tombol Daftar, kamu akan diarahkan ke halaman Masuk untuk masuk ke akun yang sudah dibuat</li>
                        <li>Yeay, pembuatan akun selesai!</li>
                    </ul>
                </div>
                <button style={{ color: 'white', fontSize: "1rem" }} type="button" className="collapsible full-width btn btn-info" onClick={() => handleToggle(2)}>
                    Cara menambahkan data pendidikan terakhir
                </button>
                <div className="content-collapsible" style={{ display: openCollapse[2] ? "flex" : "none" }}>
                    <ul type="1">
                        <li>Buka website KOPI di link <i>(link)</i></li>
                        <li>Klik menu Masuk</li>
                        <li>Masukkan email dan password</li>
                        <li>Setelah masuk, klik menu CV Saya, lalu klik menu Tambah Pendidikan Terakhir</li>
                        <li>
                            Isi data pendidikan terakhir seperti
                            <ul type="disc" className="container col-f-0">
                                <li>Nama institusi</li>
                                <li>Jurusan</li>
                                <li>Tahun mulai</li>
                                <li>Tahun selesai</li>
                            </ul>
                        </li>
                        <li>Setelah data terisi lengkap, klik tombol Selesai</li>
                        <li>Yeay!, data pendidikan terakhir berhasil masuk ke lembar CV-mu!</li>
                    </ul>
                </div>
                <button style={{ color: 'white', fontSize: "1rem" }} type="button" className="collapsible full-width btn btn-info" onClick={() => handleToggle(3)}>
                    Cara menambahkan data pengalaman kerja
                </button>
                <div className="content-collapsible" style={{ display: openCollapse[3] ? "flex" : "none" }}>
                    <ul type="1">
                        <li>Buka website KOPI di link <i>(link)</i></li>
                        <li>Klik menu Masuk</li>
                        <li>Masukkan email dan password</li>
                        <li>Setelah masuk, klik menu CV Saya, lalu klik menu Tambah Pengalaman Kerja</li>
                        <li>
                            Isi data pengalaman kerja seperti
                            <ul type="disc" className="container col-f-0">
                                <li>Lokasi tempat kerja</li>
                                <li>Jabatan kerja</li>
                                <li>Detail kerja</li>
                                <li>Tahun mulai kerja</li>
                                <li>Tahun selesai kerja</li>
                            </ul>
                        </li>
                        <li>Setelah data terisi lengkap, klik tombol Selesai</li>
                        <li>Yeay!, data pengalaman kerja berhasil masuk ke lembar CV-mu!</li>
                    </ul>
                </div>
                <button style={{ color: 'white', fontSize: "1rem" }} type="button" className="collapsible full-width btn btn-info" onClick={() => handleToggle(4)}>
                    Cara menambahkan data prestasi kerja
                </button>
                <div className="content-collapsible" style={{ display: openCollapse[4] ? "flex" : "none" }}>
                    <ul type="1">
                        <p style={{marginBottom : "1rem"}}><i className="bi-question-circle"></i> Untuk menambah daftar prestasi kerja, kamu harus menambahkan daftar pengalaman kerja terlebih dahulu. Namun, jika sudah, kamu bisa mengikuti langkah-langkah di bawah.</p>
                        <li>Buka website KOPI di link <i>(link)</i></li>
                        <li>Klik menu Masuk</li>
                        <li>Masukkan email dan password</li>
                        <li>Setelah masuk, klik menu CV Saya, dan klik tombol tambah Prestasi Kerja di daftar pengalaman kerja</li>
                        <li>
                            Isi data prestasi kerja seperti
                            <ul type="disc" className="container col-f-0">
                                <li>Nama prestasi</li>
                                <li>Tahun mendapatkan prestasi</li>
                            </ul>
                        </li>
                        <li>Setelah data terisi lengkap, klik tombol Selesai</li>
                        <li>Yeay!, data prestasi kerja berhasil masuk ke lembar CV-mu!</li>
                    </ul>
                </div>
                <button style={{ color: 'white', fontSize: "1rem" }} type="button" className="collapsible full-width btn btn-info" onClick={() => handleToggle(5)}>
                    Cara menambahkan data keahlian / skills
                </button>
                <div className="content-collapsible" style={{ display: openCollapse[5] ? "flex" : "none" }}>
                    <ul type="1">
                        <li>Buka website KOPI di link <i>(link)</i></li>
                        <li>Klik menu Masuk</li>
                        <li>Masukkan email dan password</li>
                        <li>Setelah masuk, klik menu CV Saya, dan klik tombol tambah Keahlian / Skill</li>
                        <li>
                            Isi data seperti
                            <ul type="disc" className="container col-f-0">
                                <li>Jenis keahlian</li>
                                <li>Tingkatan</li>
                            </ul>
                            <p style={{marginBlock : "1rem"}}><i className="bi-question-circle"></i> Tingkatan yang disediakan hanya ada
                            <ul type="disc">
                                <li>Pemula</li>
                                <li>Pemula Tingkat Lanjut</li>
                                <li>Kompeten</li>
                                <li>Mahir</li>
                                <li>Ahli / Master</li>
                            </ul>Karena tidak ada ukuran pasti untuk menentukan tingkat kemampuan, jadi mohon sesuaikan dengan kemampuan yang kamu punya.</p>
                        </li>
                        <li>Setelah data terisi lengkap, klik tombol Selesai</li>
                        <li>Yeay!, data keahlian / skills kamu berhasil masuk ke lembar CV!</li>
                    </ul>
                </div>
                <button style={{ color: 'white', fontSize: "1rem" }} type="button" className="collapsible full-width btn btn-info" onClick={() => handleToggle(5)}>
                    Cara menambahkan data pelatihan / kursus
                </button>
                <div className="content-collapsible" style={{ display: openCollapse[5] ? "flex" : "none" }}>
                    <ul type="1">
                        <li>Buka website KOPI di link <i>(link)</i></li>
                        <li>Klik menu Masuk</li>
                        <li>Masukkan email dan password</li>
                        <li>Setelah masuk, klik menu CV Saya, dan klik tombol tambah Kahlian / Kursus</li>
                        <li>
                            Isi data seperti
                            <ul type="disc" className="container col-f-0">
                                <li>Nama pelatihan</li>
                                <li>Tahun mulai</li>
                                <li>Tahun selesai</li>
                            </ul>
                            <p style={{marginBlock : "1rem"}}><i className="bi-question-circle"></i> Tingkatan yang disediakan hanya dasar, menengah, dan profesional. Oleh karena itu, mohon lebih bijak dalam memilih tingkatan sesuai dengan kemampuan kamu punya.</p>
                        </li>
                        <li>Setelah data terisi lengkap, klik tombol Selesai</li>
                        <li>Yeay!, data pelatihan / kursus berhasil masuk ke lembar CV-mu!</li>
                    </ul>
                </div>
            </section>
        </main>
    );
}

export default Help;
