import React, { useState } from 'react';

function Help() {
    const [openCollapse, setOpenCollapse] = useState({});
    const [isExpanded, setIsExpanded] = useState(false);

    const handleToggle = (index) => {
        setOpenCollapse((prev) => ({
            ...prev,
            [index]: !prev[index],
        }));
        setIsExpanded((prev) => ({
            ...prev,
            [index]: !isExpanded[index]
        }));
    };

    return (
        <main className="container col-f f-center-c generalPg-bg">
            <section className="container col-f f-1 f-between section-max full-width">
                <div className='container col-f'>
                    <h1>Bantuan</h1>
                    <button style={{ fontSize: '1rem', textAlign : "left", paddingInline : "1.5rem" }} type="button"
                        className="container row-f f-between collapsible btn btn-info c-white" onClick={() => handleToggle(1)}>
                        <p className='f-1'>Cara membuat akun KOPI</p>
                        {isExpanded[1] ? <i className="bi-chevron-down"></i> : <i className="bi-chevron-up"></i>}
                    </button>
                    <div className="content-collapsible" style={{ display: openCollapse[1] ? 'flex' : 'none', }}>
                        <ol type='1'>
                            <li>
                                Buka website KOPI <a style={{ maxWidth : '40px', display : 'inline' }} target="blank" href="https://kopicvmaker.vercel.app/" className='btn btn-primary'>☕</a>
                            </li>
                            <li>Klik menu Daftar</li>
                            <li>Masukkan data diri kamu, seperti</li>
                            <li>
                                Mohon isi form dengan penuh kehati-hatian{' '}
                                <i className="bi-exclamation-triangle-fill"></i>
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
                            <li>
                                Setelah kamu menekan tombol Daftar, kamu akan
                                diarahkan ke halaman Masuk untuk masuk ke akun yang
                                sudah dibuat
                            </li>
                            <li>Yeay, pembuatan akun selesai!</li>
                        </ol>
                    </div>

                    <button style={{ fontSize: '1rem', textAlign : "left", paddingInline : "1.5rem" }} type="button"
                        className="container row-f f-between collapsible btn btn-info c-white" onClick={() => handleToggle(2)}>
                        <p className='f-1'>Cara menambahkan pendidikan terakhir</p>
                        {isExpanded[2] ? <i className="bi-chevron-down"></i> : <i className="bi-chevron-up"></i>}
                    </button>
                    <div className="content-collapsible" style={{ display: openCollapse[2] ? 'flex' : 'none', }}>
                        <ol type='1'>
                            <li>
                                Buka website KOPI <a style={{ maxWidth : '40px', display : 'inline' }} target="blank" href="https://kopicvmaker.vercel.app/" className='btn btn-primary'>☕</a>
                            </li>
                            <li>Klik menu Masuk</li>
                            <li>Masukkan email dan password</li>
                            <li>
                                Setelah masuk, klik menu CV Saya, lalu klik menu
                                Tambah Pendidikan Terakhir
                            </li>
                            <li>
                                Isi data pendidikan terakhir seperti
                                <ul type="disc" className="container col-f-0">
                                    <li>Nama institusi</li>
                                    <li>Jurusan</li>
                                    <li>Tahun mulai</li>
                                    <li>Tahun selesai</li>
                                </ul>
                            </li>
                            <li>
                                Setelah data terisi lengkap, klik tombol Selesai
                            </li>
                            <li>
                                Yeay!, data pendidikan terakhir berhasil masuk ke
                                lembar CV-mu!
                            </li>
                        </ol>
                    </div>
                    <button style={{ fontSize: '1rem', textAlign : "left", paddingInline : "1.5rem" }} type="button"
                        className="container row-f f-between collapsible btn btn-info c-white" onClick={() => handleToggle(3)}>
                        <p className='f-1'>Cara menambahkan pengalaman kerja</p>
                        {isExpanded[3] ? <i className="bi-chevron-down"></i> : <i className="bi-chevron-up"></i>}
                    </button>
                    <div className="content-collapsible" style={{ display: openCollapse[3] ? 'flex' : 'none', }}>
                        <ol type='1'>
                            <li>
                                Buka website KOPI <a style={{ maxWidth : '40px', display : 'inline' }} target="blank" href="https://kopicvmaker.vercel.app/" className='btn btn-primary'>☕</a>
                            </li>
                            <li>Klik menu Masuk</li>
                            <li>Masukkan email dan password</li>
                            <li>
                                Setelah masuk, klik menu CV Saya, lalu klik menu
                                Tambah Pengalaman Kerja
                            </li>
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
                            <li>
                                Setelah data terisi lengkap, klik tombol Selesai
                            </li>
                            <li>
                                Yeay!, data pengalaman kerja berhasil masuk ke
                                lembar CV-mu!
                            </li>
                        </ol>
                    </div>
                    <button style={{ fontSize: '1rem', textAlign : "left", paddingInline : "1.5rem" }} type="button"
                        className="container row-f f-between collapsible btn btn-info c-white" onClick={() => handleToggle(4)}>
                        <p className='f-1'>Cara menambahkan data prestasi kerja</p>
                        {isExpanded[4] ? <i className="bi-chevron-down"></i> : <i className="bi-chevron-up"></i>}
                    </button>
                    <div className="content-collapsible" style={{ display: openCollapse[4] ? 'flex' : 'none', }}>
                        <ol type='1'>
                            <p style={{ marginBottom: '1rem', }}>
                                <i className="bi-question-circle"></i> Untuk
                                menambah daftar prestasi kerja, kamu harus
                                menambahkan daftar pengalaman kerja terlebih dahulu.
                                Namun, jika sudah, kamu bisa mengikuti
                                langkah-langkah di bawah.
                            </p>
                            <li>
                                Buka website KOPI <a style={{ maxWidth : '40px', display : 'inline' }} target="blank" href="https://kopicvmaker.vercel.app/" className='btn btn-primary'>☕</a>
                            </li>
                            <li>Klik menu Masuk</li>
                            <li>Masukkan email dan password</li>
                            <li>
                                Setelah masuk, klik menu CV Saya, dan klik tombol
                                tambah Prestasi Kerja di daftar pengalaman kerja
                            </li>
                            <li>
                                Isi data prestasi kerja seperti
                                <ul type="disc" className="container col-f-0">
                                    <li>Nama prestasi</li>
                                    <li>Tahun mendapatkan prestasi</li>
                                </ul>
                            </li>
                            <li>
                                Setelah data terisi lengkap, klik tombol Selesai
                            </li>
                            <li>
                                Yeay!, data prestasi kerja berhasil masuk ke lembar
                                CV-mu!
                            </li>
                        </ol>
                    </div>
                    <button style={{ fontSize: '1rem', textAlign : "left", paddingInline : "1.5rem" }} type="button"
                        className="container row-f f-between collapsible btn btn-info c-white" onClick={() => handleToggle(5)}>
                        <p className='f-1'>Cara menambahkan data keahlian / skills</p>
                        {isExpanded[5] ? <i className="bi-chevron-down"></i> : <i className="bi-chevron-up"></i>}
                    </button>
                    <div className="content-collapsible" style={{ display: openCollapse[5] ? 'flex' : 'none', }}>
                        <ol type='1'>
                            <li>
                                Buka website KOPI <a style={{ maxWidth : '40px', display : 'inline' }} target="blank" href="https://kopicvmaker.vercel.app/" className='btn btn-primary'>☕</a>
                            </li>
                            <li>Klik menu Masuk</li>
                            <li>Masukkan email dan password</li>
                            <li>
                                Setelah masuk, klik menu CV Saya, dan klik tombol
                                tambah Keahlian / Skill
                            </li>
                            <li>
                                Isi data seperti
                                <ul type="disc" className="container col-f-0">
                                    <li>Jenis keahlian</li>
                                    <li>Tingkatan</li>
                                </ul>
                                <p style={{ marginBlock: '1rem', }}>
                                    <i className="bi-question-circle"></i> Tingkatan
                                    yang disediakan hanya ada :{' '}
                                </p>
                                <ul type="disc">
                                    <li>Pemula</li>
                                    <li>Pemula Tingkat Lanjut</li>
                                    <li>Kompeten</li>
                                    <li>Mahir</li>
                                    <li>Ahli / Master</li>
                                </ul>
                                <p style={{ marginBottom: '1rem', }}>
                                    Karena tidak ada ukuran pasti untuk menentukan
                                    tingkat kemampuan, jadi mohon sesuaikan dengan
                                    kemampuan yang kamu punya.
                                </p>
                            </li>
                            <li>
                                Setelah data terisi lengkap, klik tombol Selesai
                            </li>
                            <li>
                                Yeay!, data keahlian / skills kamu berhasil masuk ke
                                lembar CV!
                            </li>
                        </ol>
                    </div>
                    <button style={{ fontSize: '1rem', textAlign : "left", paddingInline : "1.5rem" }} type="button"
                        className="container row-f f-between collapsible btn btn-info c-white" onClick={() => handleToggle(6)}>
                        <p className='f-1'>Cara menambahkan data pelatihan / kursus</p>
                        {isExpanded[6] ? <i className="bi-chevron-down"></i> : <i className="bi-chevron-up"></i>}
                    </button>
                    <div className="content-collapsible" style={{ display: openCollapse[6] ? 'flex' : 'none', }}>
                        <ol type='1'>
                            <li>
                                Buka website KOPI <a style={{ maxWidth : '40px', display : 'inline' }} target="blank" href="https://kopicvmaker.vercel.app/" className='btn btn-primary'>☕</a>
                            </li>
                            <li>Klik menu Masuk</li>
                            <li>Masukkan email dan password</li>
                            <li>
                                Setelah masuk, klik menu CV Saya, dan klik tombol
                                tambah Kahlian / Kursus
                            </li>
                            <li>
                                Isi data seperti
                                <ul type="disc" className="container col-f-0">
                                    <li>Nama pelatihan</li>
                                    <li>Tahun mulai</li>
                                    <li>Tahun selesai</li>
                                </ul>
                            </li>
                            <li>
                                Setelah data terisi lengkap, klik tombol Selesai
                            </li>
                            <li>
                                Yeay!, data pelatihan / kursus berhasil masuk ke
                                lembar CV-mu!
                            </li>
                        </ol>
                    </div>
                    <button style={{ fontSize: '1rem', textAlign : "left", paddingInline : "1.5rem" }} type="button"
                        className="container row-f f-between collapsible btn btn-info c-white" onClick={() => handleToggle(7)}>
                        <p className='f-1'>Cara melihat dan download CV</p>
                        {isExpanded[7] ? <i className="bi-chevron-down"></i> : <i className="bi-chevron-up"></i>}
                    </button>
                    <div className="content-collapsible" style={{ display: openCollapse[7] ? 'flex' : 'none', }}>
                        <ol type='1'>
                            <li>
                                Buka website KOPI <a style={{ maxWidth : '40px', display : 'inline' }} target="blank" href="https://kopicvmaker.vercel.app/" className='btn btn-primary'>☕</a>
                            </li>
                            <li>Klik menu Masuk</li>
                            <li>Masukkan email dan password</li>
                            <li>
                                Setelah masuk, klik menu CV Saya, dan klik tombol
                                Preview CV untuk melihat CV
                            </li>
                            <li>
                                Untuk download CV, kamu cukup menekan tombol panah ke bawah seperti di gambar.
                            </li>
                            <li style={{ listStyle: 'none', marginTop: '1rem' }}>
                                <img style={{ maxWidth: "240px", width: "100%" }} src="https://raw.githubusercontent.com/akbarvideoeditor03/FE/refs/heads/master/public/assets/images/download-location.jpg" alt="" />
                            </li>
                            <li>
                                Untuk pengguna mobile, fitur preview PDF sementara ini belum dapat digunakan. Namun, dokumen PDF tetap bisa di download seperti biasa. Dengan cara :
                                <ul style={{listStyle : 'inside'}}>
                                    <li>Klik, dan tahan tombol Open</li>
                                    <li style={{ listStyle: 'none'}}>
                                        <img style={{ maxWidth: "240px", width: "100%" }} src="https://raw.githubusercontent.com/akbarvideoeditor03/kopi_fe/refs/heads/master/public/assets/images/bitmap_g6.png" alt="" />
                                    </li>
                                    <li>lalu pilih Download link</li>
                                    <li style={{ listStyle: 'none'}}>
                                        <img style={{ maxWidth: "240px", width: "100%" }} src="https://raw.githubusercontent.com/akbarvideoeditor03/kopi_fe/refs/heads/master/public/assets/images/bitmap_g5.png" alt="" />
                                    </li>
                                </ul>
                                Dan selamat! CV kamu berhasil di download.
                            </li>
                        </ol>
                    </div>
                    <button style={{ fontSize: '1rem', textAlign : "left", paddingInline : "1.5rem" }} type="button"
                        className="container row-f f-between collapsible btn btn-info c-white" onClick={() => handleToggle(8)}>
                        <p className='f-1'>Video Tutorial <i className="bi-youtube"></i></p>
                        {isExpanded[8] ? <i className="bi-chevron-down"></i> : <i className="bi-chevron-up"></i>}
                    </button>
                    <div className="content-collapsible f-center-c" style={{ display: openCollapse[8] ? 'flex' : 'none', }}>
                        <iframe style={{borderRadius : '10px'}} width="960" height="540" src="https://www.youtube.com/embed/sv1SvoI1ORE?si=MOx-48u4dyiTsAs5&amp;start=570" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen='true'></iframe>
                    </div>
                </div>
                <div className='container row-f-0 f-center'>
                    <p style={{marginInlineEnd : '5px'}}>Ada yang nggak bisa dipahami? Yok</p><a style={{ maxWidth: '10rem', gap: '5px' }} className='container row-f-0 btn btn-success' href="https://wa.link/kx8g0f" target='blank'><i className="bi-whatsapp"></i>Tanya Admin</a>
                </div>
            </section>
        </main>
    );
}

export default Help;
