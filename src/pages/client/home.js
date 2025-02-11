import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    getUserId,
    readPengalamanKerja,
    deletePengalamanKerja,
    readPendidikanTerakhir,
    deletePendidikanTerakhir,
    readKeahlian,
    deleteKeahlian,
    readPelatihan,
    deletePelatihan,
    readPrestasi,
    deletePrestasi,
} from '../../redux/action/user.action';
import Swal from 'sweetalert2';
import dayjs from 'dayjs';
import 'dayjs/locale/id';
dayjs.locale('id');

function HomeUser() {
    const id = localStorage.getItem('id');
    const dispatch = useDispatch();
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    const {
        userList,
        pengalamanKerja,
        pendidikanTerakhir,
        keahlian,
        pelatihan,
        prestasiKerja,
        isLoading,
        isWebsite,
    } = useSelector((state) => state.userReducer);

    useEffect(() => {
        dispatch(getUserId(id));
        dispatch(readPengalamanKerja(id));
        dispatch(readPendidikanTerakhir(id));
        dispatch(readKeahlian(id));
        dispatch(readPelatihan(id));
        dispatch(readPrestasi());
    }, [dispatch, id]);

    const deleteData = (id, type) => {
        Swal.fire({
            title: 'Apakah Anda yakin?',
            text: 'Data yang dihapus tidak dapat dikembalikan!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Ya, hapus!',
            cancelButtonText: 'Batal',
        }).then((result) => {
            if (result.isConfirmed) {
                if (type === 'pendidikan') {
                    dispatch(deletePendidikanTerakhir(id));
                } else if (type === 'pengalamanKerja') {
                    dispatch(deletePengalamanKerja(id));
                } else if (type === 'keahlian') {
                    dispatch(deleteKeahlian(id));
                } else if (type === 'pelatihan') {
                    dispatch(deletePelatihan(id));
                } else if (type === 'prestasi') {
                    dispatch(deletePrestasi(id));
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
                });
            }
        });
    };

    if (token && role === 'user' || isWebsite) {
        const tentang = userList.tentang
        const tentangParagraf = tentang?.split('\n').map((tentangs, index) => (
            <p style={{ lineHeight: '1.5rem' }} key={index}>{tentangs} <br /></p>
        ))
        return (
            <main className="container col-f f-center">
                <section className="container col-f full-width section-max">
                    <h1>Menu</h1>
                    <div className="grid gc-1 gc-2 gc-3 gc-4 grid-gap m-bt2">
                        <a
                            href="/pendidikanterakhir"
                            className="btn btn-primary"
                        >
                            Tambah Pendidikan Terakhir
                        </a>
                        <a
                            href="/createpengalamankerja"
                            className="btn btn-primary"
                        >
                            Tambah Pengalaman Kerja
                        </a>
                        <a href="/keahlian" className="btn btn-primary">
                            Tambah Keahlian / Skill
                        </a>
                        <a href="/pelatihan" className="btn btn-primary">
                            Tambah Pelatihan
                        </a>
                    </div>
                    <div className="container row-f f-between f-wrap f-center">
                        <h1>Yuk lengkapi CV kamu</h1>
                        <div className="container row-f">
                            <a className="btn btn-info-b" href="/pdfpreview">
                                <i className="bi-file-earmark-pdf-fill"></i>{' '}
                                Preview PDF
                            </a>
                        </div>
                    </div>
                    <div className='card-mini'>
                        <p>Jika Anda baru saja login dengan Google, password Anda adalah <b>12345678</b>. Kami sarankan untuk segera lakukan <a href="/user/otprequest"><b>Reset Password</b></a></p>
                    </div>
                    {isLoading ? (
                        <div className="card container col-f f-center-c list-container">
                            <div className="custom-loader"></div>
                        </div>
                    ) : (
                        <div className="card container col-f f-1">
                            <div className="container row-f f-wrap">
                                <div
                                    style={{
                                        paddingBottom: '1rem',
                                        flexBasis: '360px',
                                    }}
                                    className="container col-f f-1"
                                >
                                    <div className="grid gc-1 gc-2 gc-3 gc-4 grid-gap grid-text">
                                        <div className="box-1 container col-f-0 f-1">
                                            <h1 className="name-text">
                                                {userList.nama}
                                            </h1>
                                            <p className="prodi-text">
                                                {pendidikanTerakhir.find((item) => item.jurusan)?.jurusan}
                                            </p>
                                        </div>
                                        <div className="box-2 container col-f f-center-c">
                                            <img
                                                className="cv-image"
                                                src={`${userList.foto_profil}`}
                                                alt=""
                                            />
                                        </div>
                                        <div className="box-3 container col-f f-1">
                                            <p>
                                                <i className="fa-solid fa-envelope"></i>{' '}
                                                {userList.email}
                                            </p>
                                        </div>
                                        <div className="box-4 container col-f f-1">
                                            <p>
                                                <i className="bi-telephone-fill"></i>{' '}
                                                {userList.no_telp}
                                            </p>
                                        </div>
                                        <div className="box-5 container col-f f-1">
                                            <p>
                                                <i className="fa-solid fa-location-dot"></i>{' '}
                                                {userList.alamat}
                                            </p>
                                        </div>
                                    </div>
                                    <h3>Tentang Saya</h3>
                                    <div className='container col-f-0'>
                                        {tentangParagraf}
                                    </div>
                                </div>
                                <div className="container col-f">
                                    <a
                                        className="btn btn-primary"
                                        href={`/edit/${id}`}
                                    >
                                        <i className="bi-pencil-square"></i>
                                    </a>
                                </div>
                            </div>
                            <div className="container row-f f-wrap m-b1">
                                <div className="container col-f f-1">
                                    <h1>Pendidikan</h1>
                                    {pendidikanTerakhir.map((item) => {
                                        return (
                                            <div
                                                style={{
                                                    paddingBlock: '1rem',
                                                }}
                                                key={item.id}
                                                className="container row-f f-wrap"
                                            >
                                                <div
                                                    style={{
                                                        flexBasis: '720px',
                                                    }}
                                                    className="container row-f f-1"
                                                >
                                                    <div
                                                        style={{
                                                            maxWidth: '17.5rem',
                                                            flexBasis: '360px',
                                                        }}
                                                        className="container col-f full-width"
                                                    >
                                                        <p
                                                            style={{
                                                                fontSize:
                                                                    '1.15rem',
                                                            }}
                                                            className="fw7"
                                                        >
                                                            {item.institusi}
                                                        </p>
                                                        <p className="fw6">
                                                            {item.tahun_mulai.slice(
                                                                0,
                                                                4
                                                            )}{' '}
                                                            -{' '}
                                                            <span>
                                                                {
                                                                    item.tahun_selesai
                                                                }
                                                            </span>
                                                        </p>
                                                    </div>
                                                    <div
                                                        style={{
                                                            flexBasis: '360px',
                                                        }}
                                                        className="container col-f f-1"
                                                    >
                                                        <p>Jurusan</p>
                                                        <p>{item.jurusan}</p>
                                                    </div>
                                                </div>
                                                <div className="container col-f">
                                                    <div className="container row-f">
                                                        <a
                                                            className="btn btn-primary"
                                                            href={`/pendidikanterakhir/${userList.id}/${item.id}`}
                                                        >
                                                            <i className="bi-pencil-square"></i>
                                                        </a>
                                                        <button
                                                            className="btn btn-danger"
                                                            onClick={() =>
                                                                deleteData(
                                                                    item.id,
                                                                    'pendidikan'
                                                                )
                                                            }
                                                        >
                                                            <i className="bi-trash"></i>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                            <div className="container row-f f-wrap">
                                <div className="container col-f f-1">
                                    <h1>Pengalaman Kerja</h1>
                                    {pengalamanKerja.map((item) => {
                                        const prestasiId = item.id;
                                        const paragraf = item.detail
                                        const words = paragraf.split('\n').map((paragrafs, index) => (
                                            <p key={index}>{paragrafs} <br /></p>
                                        ))
                                        return (
                                            <div
                                                key={item.id}
                                                className="container col-f"
                                            >
                                                <div
                                                    style={{
                                                        paddingBlock: '1rem',
                                                    }}
                                                    className="container row-f f-wrap"
                                                >
                                                    <div
                                                        style={{
                                                            maxWidth: '17.5rem',
                                                            flexBasis: '360px',
                                                        }}
                                                        className="container col-f full-width"
                                                    >
                                                        <div className="container col-f">
                                                            <p
                                                                style={{
                                                                    fontSize:
                                                                        '1.15rem',
                                                                }}
                                                                className="fw7"
                                                            >
                                                                {item.lokasi}
                                                            </p>
                                                            <p className="fw6">
                                                                {dayjs(
                                                                    item.tahun_mulai
                                                                )
                                                                    .locale(
                                                                        'id'
                                                                    )
                                                                    .format(
                                                                        'MMMM YYYY'
                                                                    )}{' '}
                                                                -{' '}
                                                                <span>
                                                                    {
                                                                        item.tahun_selesai
                                                                    }
                                                                </span>
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div
                                                        style={{
                                                            flexBasis: '360px',
                                                        }}
                                                        className="container col-f f-1"
                                                    >
                                                        <p className="fw6">
                                                            {item.jabatan}
                                                        </p>
                                                        <div style={{ lineHeight: '1.5rem' }}>{words}</div>
                                                    </div>
                                                </div>
                                                {prestasiKerja.some(
                                                    (item) =>
                                                        item.id_pengalaman_kerja ===
                                                        prestasiId
                                                ) && <h1>Prestasi Kerja</h1>}
                                                {prestasiKerja.map((item) =>
                                                    item.id_pengalaman_kerja ===
                                                        prestasiId ? (
                                                        <div
                                                            key={item.id}
                                                            className="container col-f"
                                                        >
                                                            <div className="container row-f">
                                                                <div className="container col-f f-1">
                                                                    <h4>
                                                                        {
                                                                            item.prestasi
                                                                        }
                                                                    </h4>
                                                                    <p>
                                                                        Tahun{' '}
                                                                        {item.tahun.slice(
                                                                            0,
                                                                            4
                                                                        )}
                                                                    </p>
                                                                </div>
                                                                <div className="container row-f f-center-c">
                                                                    <a
                                                                        className="btn btn-primary"
                                                                        href={`/prestasi/${prestasiId}/${item.id}`}
                                                                    >
                                                                        <i className="bi-pencil-square"></i>
                                                                    </a>
                                                                    <button
                                                                        className="btn btn-danger"
                                                                        onClick={() =>
                                                                            deleteData(
                                                                                item.id,
                                                                                'prestasi'
                                                                            )
                                                                        }
                                                                    >
                                                                        <i className="bi-trash"></i>
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ) : (
                                                        ''
                                                    )
                                                )}
                                                <div className="container row-f">
                                                    <a
                                                        className="btn btn-primary"
                                                        href={`/pengalamankerja/${userList.id}/${item.id}`}
                                                    >
                                                        <i className="bi-pencil-square"></i>
                                                    </a>
                                                    <button
                                                        className="btn btn-danger"
                                                        onClick={() =>
                                                            deleteData(
                                                                item.id,
                                                                'pengalamanKerja'
                                                            )
                                                        }
                                                    >
                                                        <i className="bi-trash"></i>
                                                    </button>
                                                    <a
                                                        className="btn btn-primary"
                                                        href={`/prestasi/${item.id}`}
                                                    >
                                                        <i className="bi-plus"></i>
                                                        Tambah Prestasi Kerja
                                                    </a>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                            <div className="container row-f f-wrap">
                                <div className="container col-f f-1">
                                    <h1>Keahlian / Skill</h1>
                                    <div className="grid gc-1 gc-2 gc-3 gc-4 grid-gap">
                                        {keahlian.map((item) => {
                                            return (
                                                <div
                                                    key={item.id}
                                                    className="card-mini container col-f"
                                                >
                                                    <div
                                                        style={{
                                                            minHeight: '3.5rem',
                                                        }}
                                                        className="container row-f f-wrap"
                                                    >
                                                        <div
                                                            style={{
                                                                flexBasis:
                                                                    '360px',
                                                            }}
                                                            className="container col-f-0 f-1"
                                                        >
                                                            <h3>
                                                                {item.keahlian}
                                                            </h3>
                                                            <p>
                                                                {item.tingkat}
                                                            </p>
                                                        </div>
                                                        <div className="container col-f">
                                                            <div className="container row-f">
                                                                <a
                                                                    className="btn btn-primary"
                                                                    href={`/keahlian/${userList.id}/${item.id}`}
                                                                >
                                                                    <i className="bi-pencil-square"></i>
                                                                </a>
                                                                <button
                                                                    className="btn btn-danger"
                                                                    onClick={() =>
                                                                        deleteData(
                                                                            item.id,
                                                                            'keahlian'
                                                                        )
                                                                    }
                                                                >
                                                                    <i className="bi-trash"></i>
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                            <div className="container row-f f-wrap m-b1">
                                <div className="container col-f f-1">
                                    <h1>Pelatihan / Kursus</h1>
                                    <div className="container col-f f-1">
                                        {pelatihan.map((item) => {
                                            return (
                                                <div
                                                    key={item.id}
                                                    className="container row-f f-wrap card-mini"
                                                >
                                                    <div
                                                        style={{
                                                            flexBasis: '360px',
                                                        }}
                                                        className="container col-f f-1 f-wrap"
                                                    >
                                                        <h3>
                                                            {item.pelatihan}
                                                        </h3>
                                                        <p className="fw6">
                                                            {dayjs(
                                                                item.tahun_mulai
                                                            )
                                                                .locale('id')
                                                                .format(
                                                                    'MMMM YYYY'
                                                                )}{' '}
                                                            -{' '}
                                                            <span>
                                                                {
                                                                    item.tahun_selesai
                                                                }
                                                            </span>
                                                        </p>
                                                    </div>
                                                    <div className="container col-f">
                                                        <div className="container row-f">
                                                            <a
                                                                className="btn btn-primary"
                                                                href={`/pelatihan/${userList.id}/${item.id}`}
                                                            >
                                                                <i className="bi-pencil-square"></i>
                                                            </a>
                                                            <button
                                                                className="btn btn-danger"
                                                                onClick={() =>
                                                                    deleteData(
                                                                        item.id,
                                                                        'pelatihan'
                                                                    )
                                                                }
                                                            >
                                                                <i className="bi-trash"></i>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </section>
            </main>
        );
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Oow...',
            text: 'Akses Dilarang!',
            allowEscapeKey: false,
            allowOutsideClick: false,
            showCancelButton: false,
            confirmButtonText: 'Ok',
        }).then((result) => {
            if (result.isConfirmed) {
                window.location.href = `/user/login`;
            }
        });
    }
}

export default HomeUser;
