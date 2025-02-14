import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getUser, viewAllTemplate, deleteUser } from '../../redux/action/user.action';
import Swal from 'sweetalert2';

function Dashboard() {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    const dispatch = useDispatch();
    const { userList, isLoading, error, isWebsite, templatList } = useSelector(
        (state) => state.userReducer
    );
    const roleUser = isWebsite;
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const [searchItem, setSearchItem] = useState('');
    const [filteredUsers, setFilteredUsers] = useState([]);

    useEffect(() => {
        if (!userList.data) {
            dispatch(getUser());
        }
    }, [dispatch, userList.data]);

    useEffect(() => {
        dispatch(viewAllTemplate());
    }, [dispatch]);

    useEffect(() => {
        if (userList.data) {
            const filteredItem = userList.data.filter((user) =>
                user.nama.toLowerCase().includes(searchItem.toLowerCase()) || user.email.toLowerCase().includes(searchItem.toLowerCase())
            );
            setFilteredUsers(filteredItem);
        }
    }, [searchItem, userList.data]);

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

    const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
    const currentData = filteredUsers.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    if (token && role === roleUser) {
        return (
            <main className="container col-f f-center">
                <section className="container col-f full-width section-max">
                    <div className="container row-f f-wrap-r f-wrap">
                        <div
                            style={{
                                flexBasis: '300px',
                            }}
                            className="container col-f f-1"
                        >
                            <h1>Jumlah Total Pengguna</h1>
                            <div className="container col-f f-center-c">
                                {isLoading ? (
                                    <div className="container col-f f-center-c left-dashboard-container">
                                        <div className="custom-loader"></div>
                                    </div>
                                ) : (
                                    <div className="container col-f f-center-c left-dashboard-container">
                                        <p style={{ fontSize: '350%', fontWeight: 'bold' }}>
                                            {userList?.meta?.totalData ? (
                                                userList.meta.totalData
                                            ) : ('')}
                                        </p>
                                    </div>
                                )}
                            </div>
                            <div className="container col-f">
                                <a
                                    href="/addtemplate"
                                    className="btn btn-primary"
                                >
                                    Tambah Templat CV
                                </a>
                                <div className='grid gc-1 gc-2 grid-gap'>
                                    {
                                        templatList?.data?.map((item) => {
                                            return(
                                                <a className="templat-list templat-card" key={item.id} href={`/templatedetail/${item.id}`}>
                                                    <div className='container col-f f-center'>
                                                        <img className='cv-templat' src={`${item.link_gambar}`} alt="link_gambar templat" />
                                                        <p>{`${item.caption}`}</p>
                                                    </div>
                                                </a>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        </div>
                        <div
                            style={{
                                flexBasis: '340px',
                            }}
                            className="container col-f f-1"
                        >
                            <input
                                type="text"
                                value={searchItem}
                                onChange={(e) => setSearchItem(e.target.value)}
                                placeholder="Cari"
                                className="m-bt2 search-box"
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
                                            {
                                                filteredUsers.length === 0 ?
                                                    <div className="container col-f f-center-c list-container">
                                                        <p className='t-center'><i className='bi bi-emoji-frown'></i> Data tidak ditemukan</p>
                                                    </div>
                                                    : ''}
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
                                                                            {item.nama}
                                                                        </h3>
                                                                        <p className="cut-text">
                                                                            {item.email}
                                                                        </p>
                                                                        <p>
                                                                            {item.no_telp}
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
                                            <div className="container row-f f-wrap">
                                                {[...Array(totalPages)].map(
                                                    (_, index) => (
                                                        <button
                                                            key={index}
                                                            onClick={() =>
                                                                handlePageChange(
                                                                    index + 1
                                                                )
                                                            }
                                                            className={`btn ${currentPage === index + 1 ? 'btn btn-primary' : 'btn btn-primary-b'}`}
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
        )
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

export default Dashboard;
