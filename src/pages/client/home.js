import { useEffect } from 'react';
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
    otpRequestCode,
} from '../../redux/action/user.action';
import Swal from 'sweetalert2';
import dayjs from 'dayjs';
import { Link as RouterLink } from 'react-router-dom';
import 'dayjs/locale/id';
import { Router } from 'react-router-dom';
dayjs.locale('id');

function HomeUser() {
    const dispatch = useDispatch();
    const token = localStorage.getItem('&l2');
    const role = localStorage.getItem('$f*');
    const id = localStorage.getItem('/v%');
    const {
        userList,
        pengalamanKerja,
        pendidikanTerakhir,
        keahlian,
        pelatihan,
        prestasiKerja,
        isLoading,
        isWebsite,
        isViews
    } = useSelector((state) => state.userReducer);

    useEffect(() => {
        if (token && role && id) {
            dispatch(getUserId(id, role));
            dispatch(readPendidikanTerakhir(id, role));
            dispatch(readPengalamanKerja(id, role));
            dispatch(readKeahlian(id, role));
            dispatch(readPelatihan(id, role));
        }
    }, [dispatch, id, role]);

    const deleteData = (idData, type) => {
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
                    dispatch(deletePendidikanTerakhir(id, role, idData));
                } else if (type === 'pengalamanKerja') {
                    dispatch(deletePengalamanKerja(id, role, idData));
                } else if (type === 'keahlian') {
                    dispatch(deleteKeahlian(id, role, idData));
                } else if (type === 'pelatihan') {
                    dispatch(deletePelatihan(id, role, idData));
                } else if (type === 'prestasi') {
                    dispatch(deletePelatihan(id, role, idData));
                }
            }
        });
    };

    const subDeleteData = (idReqPengalaman, idData, type) => {
        Swal.fire({
            title: 'Apakah Anda yakin?',
            text: 'Data yang dihapus tidak dapat dikembalikan!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Ya, hapus!',
            cancelButtonText: 'Batal',
        }).then((result) => {
            if (result.isConfirmed) {
                if (type === 'prestasi') {
                    dispatch(deletePrestasi(id, role, idReqPengalaman, idData));
                }
            }
        }).then(() => {
            window.location.reload();
        });
        ;
    };

    const handleSubmitWithEmail = (e) => {
        e.preventDefault();
        if (!userList?.email) {
            Swal.fire({
                icon: 'error',
                text: 'Opps... Email Kosong',
                timer: 2000,
                showConfirmButton: false,
                allowEscapeKey: false,
                allowOutsideClick: false,
                timerProgressBar: true,
            }).then(() => {
                return;
            });
        }
        try {
            Swal.fire({
                title: 'Sebentar...',
                html: '<div className="custom-loader"></div>',
                allowOutsideClick: false,
                allowEscapeKey: false,
                didOpen: () => {
                    Swal.showLoading();
                },
            });
            const otpReq = {
                email: userList.email,
            };
            dispatch(otpRequestCode(otpReq));
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Terjadi kesalahan. Coba lagi',
            }).then(() => {
                Swal.close()
            });
        }
    };

    if (token && (role === isViews || isWebsite)) {
        const tentang = userList.tentang
        const tentangParagraf = tentang?.split('\n').map((tentangs, index) => (
            <p style={{ lineHeight: '1.5rem' }} key={index}>{tentangs} <br /></p>
        ))
        return (
            <main className="container col-f f-center">
                <section className="container col-f full-width section-max">
                    <div className="container row-f f-between f-wrap f-center">
                        <h1>Yuk lengkapi CV kamu</h1>
                        <div className="container row-f">
                            <a className="btn btn-info-b" href="/pdfpreview">
                                <i className="bi-file-earmark-pdf-fill"></i>{' '}
                                Preview PDF
                            </a>
                        </div>
                    </div>
                    {
                        userList.google === true ?
                            <div className='container row-f card-mini f-center-c'>
                                <p className='f-1'>Jika Anda baru saja login melalui akun Google, password Anda adalah <b>12345678</b>. Kami
                                    sarankan untuk segera lakukan</p>
                                <button className='btn btn-warning' onClick={handleSubmitWithEmail}>Reset Password</button>
                            </div> : ''
                    }
                    {isLoading ? (
                        <div className="card container col-f f-center-c list-container">
                            <div className="custom-loader"></div>
                        </div>
                    ) : (
                        <div className="card container col-f f-1">
                            <div className="card-mini container row-f f-wrap">
                                <div style={{ paddingBottom: '1rem', flexBasis: '360px', }} className="container col-f f-1">
                                    <h3><i style={{ fontSize: '85%' }} className="fa-solid fa-circle-user"></i> Data Diri</h3>
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
                                            <img className="cv-image" src={`${userList.foto_profil}`} alt="" />
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
                                    <a className="btn btn-primary" href={`/edit/${id}/${role}`}>
                                        <i className="bi-pencil-square"></i>
                                    </a>
                                </div>
                            </div>
                            <div className="card-mini container row-f f-wrap m-b1">
                                <div className="container col-f f-1">
                                    <div className='container row-f f-wrap f-center'>
                                        <h1><i style={{ fontSize: '85%' }} className="fa-solid fa-school"></i> Pendidikan</h1>
                                        <a href="/pendidikanterakhir" className="btn btn-primary">
                                            <i style={{ fontSize: '85%' }} className="fa-solid fa-plus"></i>
                                        </a>
                                    </div>
                                    {pendidikanTerakhir.map((item) => {
                                        return (
                                            <div key={item.id} className="container row-f f-wrap">
                                                <div style={{ flexBasis: '720px', }} className="container row-f f-1">
                                                    <div style={{ maxWidth: '17.5rem', flexBasis: '360px', }}
                                                        className="container col-f full-width">
                                                        <p style={{ fontSize: '1.15rem', }} >
                                                            {item.institusi}
                                                        </p>
                                                        <p >
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
                                                    <div style={{ flexBasis: '360px', }} className="container col-f f-1">
                                                        <p>Jurusan</p>
                                                        <p>{item.jurusan}</p>
                                                    </div>
                                                </div>
                                                <div className="container col-f">
                                                    <div className="container row-f">
                                                        <a className="btn btn-primary"
                                                            href={`/pendidikanterakhir/${id}/${role}/${item.id}`}>
                                                            <i className="bi-pencil-square"></i>
                                                        </a>
                                                        <button className="btn btn-danger" onClick={() =>
                                                            deleteData(item.id, 'pendidikan')
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
                            <div className="card-mini container row-f f-wrap">
                                <div className="container col-f f-1">
                                    <div className='container row-f f-wrap f-center'>
                                        <h1><i style={{ fontSize: '75%' }} className="fa-solid fa-user-tie"></i> Pengalaman Kerja</h1>
                                        <a href="/createpengalamankerja" className="btn btn-primary">
                                            <i style={{ fontSize: '85%' }} className="fa-solid fa-plus"></i>
                                        </a>
                                    </div>
                                    {pengalamanKerja.map((exp) => {
                                        const expId = exp.id;
                                        const detailText = exp.detail;
                                        const detailParagraphs = detailText.split('\n').map((line, idx) => (
                                            <p key={idx}>{line} <br /></p>
                                        ));

                                        return (
                                            <div key={exp.id} className="container col-f">
                                                <div className="container row-f f-wrap">
                                                    <div
                                                        style={{ maxWidth: '17.5rem', flexBasis: '360px' }}
                                                        className="container col-f full-width"
                                                    >
                                                        <div className="container col-f">
                                                            <p style={{ fontSize: '1.15rem' }}>
                                                                {exp.lokasi}
                                                            </p>
                                                            <p>
                                                                {dayjs(exp.tahun_mulai)
                                                                    .locale('id')
                                                                    .format('MMMM YYYY')}
                                                                {' - '}
                                                                <span>{exp.tahun_selesai}</span>
                                                            </p>
                                                        </div>
                                                    </div>

                                                    <div style={{ flexBasis: '360px' }} className="container col-f f-1">
                                                        <p>{exp.jabatan}</p>
                                                        <div style={{ lineHeight: '1.5rem' }}>
                                                            {detailParagraphs}
                                                        </div>
                                                    </div>
                                                </div>

                                                {prestasiKerja.some(
                                                    (ach) => ach.id_pengalaman_kerja === expId
                                                ) && (
                                                        <h1>
                                                            <i style={{ fontSize: '75%' }} className="fa-solid fa-trophy"></i>{' '}
                                                            Prestasi Kerja
                                                        </h1>
                                                    )}

                                                {exp.prestasiKerjas?.map((achievement) => (
                                                    <div key={achievement.id} className="card-mini container col-f">
                                                        <div className="container col-row">
                                                            <div className="container col-f f-1">
                                                                <h4>{achievement.prestasi}</h4>
                                                                <p>Tahun {achievement.tahun.slice(0, 4)}</p>
                                                            </div>
                                                            <div className="container row-f f-center-c">
                                                                <a
                                                                    className="btn btn-primary"
                                                                    href={`/prestasi/edit/${id}/${role}/${exp.id}/${achievement.id}`}
                                                                >
                                                                    <i className="bi-pencil-square"></i>
                                                                </a>
                                                                <button className="btn btn-danger" onClick={() =>
                                                                    subDeleteData(expId, achievement.id, 'prestasi')
                                                                }
                                                                >
                                                                    <i className="bi-trash"></i>
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}

                                                <hr />
                                                <div className="container row-f">
                                                    <a
                                                        className="btn btn-primary"
                                                        href={`/pengalamankerja/${id}/${role}/${exp.id}`}
                                                    >
                                                        <i className="bi-pencil-square"></i>
                                                    </a>
                                                    <button
                                                        className="btn btn-danger"
                                                        onClick={() => deleteData(exp.id, 'pengalamanKerja')}
                                                    >
                                                        <i className="bi-trash"></i>
                                                    </button>
                                                    <a className="btn btn-primary" href={`/prestasi/${id}/${role}/${exp.id}`}>
                                                        <i className="bi-plus"></i>
                                                        Tambah Prestasi Kerja
                                                    </a>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                            <div className="card-mini container row-f f-wrap m-b1">
                                <div className="container col-f f-1">
                                    <div className='container row-f f-wrap f-center'>
                                        <h1><i style={{ fontSize: '75%' }} className="fa-solid fa-gear"></i> Keahlian / Skill</h1>
                                        <a href="/keahlian" className="btn btn-primary">
                                            <i style={{ fontSize: '85%' }} className="fa-solid fa-plus"></i>
                                        </a>
                                    </div>
                                    <div className="grid gc-1 gc-2 gc-3 gc-4 grid-gap">
                                        {keahlian.map((item) => {
                                            return (
                                                <div key={item.id} className="card-mini container col-f">
                                                    <div style={{ minHeight: '3.5rem', }} className="container row-f f-wrap">
                                                        <div style={{ flexBasis: '360px', }} className="container col-f-0 f-1">
                                                            <h3>
                                                                {item.keahlian}
                                                            </h3>
                                                            <p>
                                                                {item.tingkat}
                                                            </p>
                                                        </div>
                                                        <div className="container col-f">
                                                            <div className="container row-f">
                                                                <a className="btn btn-primary"
                                                                    href={`/keahlian/${id}/${role}/${item.id}`}>
                                                                    <i className="bi-pencil-square"></i>
                                                                </a>
                                                                <button className="btn btn-danger" onClick={() =>
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
                            <div className="card-mini container row-f f-wrap">
                                <div className="container col-f f-1">
                                    <div className='container row-f f-wrap f-center'>
                                        <h1><i style={{ fontSize: '75%' }} className="fa-solid fa-book-open-reader"></i> Pelatihan / Kursus</h1>
                                        <a href="/pelatihan" className="btn btn-primary">
                                            <i style={{ fontSize: '85%' }} className="fa-solid fa-plus"></i>
                                        </a>
                                    </div>
                                    <div className="container col-f f-1">
                                        {pelatihan.map((item) => {
                                            return (
                                                <div key={item.id} className="container row-f f-wrap card-mini">
                                                    <div style={{ flexBasis: '360px', }} className="container col-f f-1 f-wrap">
                                                        <h3>
                                                            {item.pelatihan}
                                                        </h3>
                                                        <p >
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
                                                            <a className="btn btn-primary"
                                                                href={`/pelatihan/${id}/${role}/${item.id}`}>
                                                                <i className="bi-pencil-square"></i>
                                                            </a>
                                                            <button className="btn btn-danger" onClick={() =>
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
                            <div className="container col-f f-center-c t-center m-t2">
                                <p>Ada kendala? Yuk beri tahu kami</p>
                                <RouterLink
                                    style={{
                                        maxWidth: '15rem',
                                    }}
                                    to="https://wa.link/s4zfm0"
                                    target="_blank"
                                    className="fwb btn btn-info full-width"
                                >
                                    <i className="bi-whatsapp"></i> Admin
                                </RouterLink>
                            </div>
                        </div>
                    )}
                </section>
            </main>
        );
    } else {
        window.location.href = `/user/login`;
    }
}

export default HomeUser;