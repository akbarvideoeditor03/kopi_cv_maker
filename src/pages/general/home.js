import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import { getUserId } from '../../redux/action/user.action';

function Home() {
    const dispatch = useDispatch();
    const token = localStorage.getItem('token');
    const id = localStorage.getItem('id')
    const { userList, isLoading } = useSelector((state) => state.userReducer);
    const [nama, setNama] = useState('...');

    useEffect(() => {
        if (userList?.nama === undefined || userList?.nama === null) {
            setNama('...');
        } else {
            setNama(userList.nama);
        }
    }, [userList]);

    useEffect(() => {
        if(token) {
            dispatch(getUserId(id));
        }
    }, [dispatch, id])


    return (
        <main>
            <section className="container bg-1 f-center-c lp-section c-white">
                <div className="section-max">
                    <div
                        style={{ paddingRight: '20vw' }}
                        className="container col-f"
                    >
                        {
                            token ? <h1>Halo, {isLoading ? '' : `${nama}`}</h1> : ''
                        }
                        <h1 className="text-h1">🚀 Bangun CV Anda Sekarang!</h1>
                        <p>
                            Mulai perjalanan karier Anda dengan CV menarik, dan
                            dibuat dengan mudah menggunakan{' '}
                            <b
                                style={{
                                    color: '#ffc400',
                                }}
                            >
                                KOPI
                            </b>
                            . Tingkatkan peluang Anda untuk diterima di
                            perusahaan impian!
                        </p>
                        <div className="container row-f fwb">
                            {token ? (
                                <RouterLink
                                    to="/home"
                                    className="btn-text-small btn btn-primary"
                                >
                                    Buat CV Sekarang
                                </RouterLink>
                            ) : (
                                <RouterLink
                                    to="/user/login"
                                    className="btn-text-small btn btn-primary"
                                >
                                    Buat CV Sekarang
                                </RouterLink>
                            )}
                            <RouterLink
                                to="/bantuan"
                                className="btn-text-small btn btn-info"
                            >
                                Bantuan
                            </RouterLink>
                        </div>
                        <p>Photo by <a style={{ color: 'white' }} target='blank' href="https://www.pexels.com/id-id/foto/pria-memegang-mug-di-depan-laptop-842548/"><b>Andrea Piacquadio {''} <i className="fa-solid fa-external-link"></i></b></a></p>
                    </div>
                </div>
            </section>
            <section className="container f-center-c lp-section bg-2 c-white">
                <div className="section-max">
                    <div className="container col-f f-center t-center">
                        <h1 className="text-h1">
                            <i className="fa-solid fa-circle-check"></i> Mudah,
                            dan Cepat
                        </h1>
                        <p>
                            <b
                                style={{
                                    color: '#ffc400',
                                }}
                            >
                                KOPI
                            </b>{' '}
                            (Kerajo Pintar) adalah platform yang dirancang untuk
                            membantu Anda membuat CV yang sempurna, sesuai
                            standar industri, dan tanpa ribet.
                        </p>
                        <p>
                            <i className="fa-solid fa-circle-check"></i>{' '}
                            Menambahkan Pengalaman Kerja, Keahlian, dan Prestasi
                        </p>
                        <p>
                            <i className="fa-solid fa-circle-check"></i>{' '}
                            Mengunduh CV dalam format PDF hanya dengan sekali
                            klik
                        </p>
                        <div className="container row-f fwb">
                            {token ? (
                                <RouterLink
                                    to="/home"
                                    className="btn-text-small btn btn-primary"
                                >
                                    Buat CV Sekarang
                                </RouterLink>
                            ) : (
                                <RouterLink
                                    to="/user/login"
                                    className="btn-text-small btn btn-primary"
                                >
                                    Buat CV Sekarang
                                </RouterLink>
                            )}
                        </div>
                    </div>
                </div>
            </section>
            <section className="container f-center-c lp-section bg-3">
                <div className="section-max">
                    <div className="container col-f f-center t-center">
                        <h1 className="text-h1">
                            Siap Untuk Melangkah Lebih Dekat
                        </h1>
                        <h1 className="text-h1">ke Karier Impian Anda?</h1>
                        <p>
                            Jangan biarkan CV biasa menghalangi Anda untuk
                            mendapatkan pekerjaan terbaik. Buat CV yang
                            berbicara lebih dari sekadar kata-kata—buat di{' '}
                            <b
                                style={{
                                    color: '#ffc400',
                                }}
                            >
                                KOPI
                            </b>{' '}
                            hari ini!
                        </p>
                        <div className="container row-f fwb">
                            {token ? (
                                <RouterLink
                                    to="/home"
                                    className="btn-text-small btn btn-primary"
                                >
                                    Buat CV Sekarang
                                </RouterLink>
                            ) : (
                                <RouterLink
                                    to="/user/login"
                                    className="btn-text-small btn btn-primary"
                                >
                                    Buat CV Sekarang
                                </RouterLink>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}

export default Home;
