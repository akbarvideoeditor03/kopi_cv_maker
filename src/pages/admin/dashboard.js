import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUser, deleteUser } from '../../redux/action/user.action';
import Swal from 'sweetalert2';

function Dashboard() {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    const dispatch = useDispatch();
    const { userList, isLoading, error, isWebsite } = useSelector(
        (state) => state.userReducer
    );
    const roleUser = isWebsite;
    const data = userList.data || [];

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    useEffect(() => {
        dispatch(getUser());
    }, [dispatch]);

    const deleteData = (id) => {
        Swal.fire({
            title: 'Apakah Anda yakin?',
            text: 'Data yang dihapus tidak dapat dikembalikan!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Ya, hapus!',
            cancelButtonText: 'Batal',
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(deleteUser(id));
                Swal.fire({
                    icon: 'success',
                    title: 'Dihapus!',
                    text: 'Data berhasil dihapus.',
                    timer: 2000,
                    showConfirmButton: false,
                    allowEscapeKey: false,
                    allowOutsideClick: false,
                    timerProgressBar: true,
                }).then(() => {
                    window.location.reload();
                });
            }
        });
    };

    useEffect(() => {
        if (error) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: `Gagal mengambil data!`,
                confirmButtonText: 'OK',
            });
        }
    }, [error]);

    const totalPages = Math.ceil(data.length / itemsPerPage);
    const currentData = data.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );
    const dataCount = userList?.meta?.totalData;

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    if (token && role === roleUser) {
        return (
            <main className="container col-f f-center">
                <section className="container col-f full-width section-max">
                    <div className="container row-f f-wrap">
                        <div
                            style={{
                                flexBasis: '300px',
                            }}
                            className="container col-f f-1"
                        >
                            <h1>Jumlah Total Pengguna</h1>
                            <div className="container col-f f-center-c">
                                {isLoading ? (
                                    <div className="container col-f f-center-c list-container">
                                        <div className="custom-loader"></div>
                                    </div>
                                ) : (
                                    <p
                                        style={{
                                            fontSize: '350%',
                                            fontWeight: 'bold',
                                        }}
                                    >{`${dataCount}`}</p>
                                )}
                            </div>
                        </div>
                        <div
                            style={{
                                flexBasis: '340px',
                            }}
                            className="container col-f f-1"
                        >
                            <input
                                type="search"
                                placeholder="Cari"
                                className="m-bt2"
                            />
                            <div className="container row-f f-wrap">
                                <a
                                    href="/user/create"
                                    className="btn btn-primary"
                                >
                                    Tambah Pengguna
                                </a>
                            </div>
                            <div className="container col-f">
                                <h1>Daftar Pengguna</h1>
                                <div className="container col-f full-width list-container">
                                    {isLoading ? (
                                        <div className="container col-f f-center-c list-container">
                                            <div className="custom-loader"></div>
                                        </div>
                                    ) : (
                                        <div className="container col-f">
                                            {currentData.map((item) => {
                                                return (
                                                    <div
                                                        key={item.id}
                                                        className="menu-card container col-f full-width"
                                                    >
                                                        <div className="container swap">
                                                            <div className="container col-f left-card-menu fj-center f-1">
                                                                <a
                                                                    className="user-list"
                                                                    href={`/user/${item.id}`}
                                                                >
                                                                    <div className="container col-f f-wrap">
                                                                        <h3>
                                                                            {
                                                                                item.nama
                                                                            }
                                                                        </h3>
                                                                        <p className="cut-text">
                                                                            {
                                                                                item.email
                                                                            }
                                                                        </p>
                                                                        <p>
                                                                            {
                                                                                item.no_telp
                                                                            }
                                                                        </p>
                                                                    </div>
                                                                </a>
                                                            </div>
                                                            <div className="container col-f right-card-menu">
                                                                <a
                                                                    href={`user/edit/${item.id}`}
                                                                    className="t-center btn btn-info"
                                                                >
                                                                    Ubah
                                                                </a>
                                                                <button
                                                                    onClick={() =>
                                                                        deleteData(
                                                                            item.id
                                                                        )
                                                                    }
                                                                    className="t-center btn btn-danger"
                                                                >
                                                                    Hapus
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                            <div className="pagination">
                                                {[...Array(totalPages)].map(
                                                    (_, index) => (
                                                        <button
                                                            key={index}
                                                            onClick={() =>
                                                                handlePageChange(
                                                                    index + 1
                                                                )
                                                            }
                                                            className={`btn ${currentPage === index + 1 ? 'btn btn-primary' : ''}`}
                                                        >
                                                            {index + 1}
                                                        </button>
                                                    )
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        );
    } else {
        return (
            <main className="container col-f f-center">
                <section className="container col-f full-width section-max f-center">
                    <img
                        style={{ width: '70px' }}
                        src="https://raw.githubusercontent.com/akbarvideoeditor03/FE/5da58e252c99da7a29144d6434f5af8013c5bb7a/public/assets/icon/angry-face.svg"
                        alt=""
                    />
                    <p className="t-center">
                        Anda tidak dizinkan mengakses halaman ini
                    </p>
                    <strong>ADMIN KOPI</strong>
                </section>
            </main>
        );
    }
}

export default Dashboard;
