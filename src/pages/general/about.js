import React from 'react';

function About() {
    return (
        <main className="container col-f f-center-c generalPg-bg">
            <section className="container col-f f-1 fj-center section-max">
                <h1>Tentang Website</h1>
                <div className="container row-f f-wrap">
                    <div
                        style={{ flexBasis: '360px' }}
                        className="container col-f f-center-c f-1"
                    >
                        <img
                            className="about-img"
                            src="https://raw.githubusercontent.com/akbarvideoeditor03/FE/refs/heads/master/public/assets/icon/logo.png"
                            alt=""
                        />
                    </div>
                    <div
                        style={{ flexBasis: '480px' }}
                        className="container col-f f-1"
                    >
                        <h1>
                            Tentang{' '}
                            <b
                                style={{
                                    color: '#ffc400',
                                }}
                            >
                                KOPI
                            </b>
                        </h1>
                        <p>
                            Selamat datang di{' '}
                            <b
                                style={{
                                    color: '#ffc400',
                                }}
                            >
                                KOPI
                            </b>
                            , platform yang hadir untuk membantu kamu membuat CV
                            dengan cara yang simpel, cepat, dan efisien! 🚀
                        </p>
                        <p>
                            Kami paham bahwa membuat CV yang menarik kadang bisa
                            membingungkan. Oleh karena itu,{' '}
                            <b
                                style={{
                                    color: '#ffc400',
                                }}
                            >
                                KOPI
                            </b>{' '}
                            hadir untuk mempermudah kamu dalam membuat CV yang
                            siap kirim, tanpa ribet mikirin format dan desain.
                        </p>
                        <p>
                            <b>
                                Kenapa pilih{' '}
                                <b
                                    style={{
                                        color: '#ffc400',
                                    }}
                                >
                                    KOPI
                                </b>
                                ?
                            </b>
                        </p>
                        <ul className="container col-f">
                            <li>
                                <b>Mudah digunakan:</b> Cukup isi informasi dan
                                tambahkan pengalaman kerja. CV kamu siap dalam
                                hitungan menit.
                            </li>
                            <li>
                                <b>Langsung siap pakai:</b> Kami menyederhanakan
                                proses pembuatan CV, supaya kamu bisa lebih
                                cepat melamar pekerjaan.
                            </li>
                            <li>
                                <b>Gratis dan tanpa ribet:</b> Kami ingin
                                membantu kamu memulai karier tanpa biaya
                                tambahan.
                            </li>
                        </ul>
                        <p>
                            Kami percaya bahwa setiap orang punya potensi luar
                            biasa, dan CV yang tepat bisa membuka peluang baru.
                            Dengan{' '}
                            <b
                                style={{
                                    color: '#ffc400',
                                }}
                            >
                                KOPI
                            </b>
                            , kamu bisa lebih fokus ke hal-hal yang penting,
                            tanpa harus pusing soal format CV.
                        </p>
                    </div>
                </div>
            </section>
        </main>
    );
}

export default About;
