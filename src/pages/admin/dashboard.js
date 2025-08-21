import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserAdm, viewAllTemplate, deleteUser, deleteTemplat } from '../../redux/action/user.action';
import Swal from 'sweetalert2';

function Dashboard() {
    const dispatch = useDispatch();
    const token = localStorage.getItem('&l2');
    const role = localStorage.getItem('$f*');
    const idAdm = localStorage.getItem('/v%');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const [searchItem, setSearchItem] = useState('');
    const [filteredUsers, setFilteredUsers] = useState([]);
    const { userData, isLoading, error, isWebsite, templatList } = useSelector(
        (state) => state.userReducer
    );

    useEffect(() => {
        dispatch(getUserAdm(idAdm, role));
    }, [dispatch, idAdm, role]);

    useEffect(() => {
        dispatch(viewAllTemplate());
    }, [dispatch]);

    useEffect(() => {
        if (userData.data) {
            const filteredItem = userData.data.filter((user) =>
                user.nama.toLowerCase().includes(searchItem.toLowerCase()) || user.email.toLowerCase().includes(searchItem.toLowerCase())
            );
            setFilteredUsers(filteredItem);
        }
    }, [searchItem, userData.data]);

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
                dispatch(deleteUser(idAdm, role, id));
            }
        });
    };

    const deleteTemplats = (id) => {
        Swal.fire({
            title: 'Apakah Anda yakin?',
            text: 'Templat yang terhapus tidak dapat dikembalikan',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Ya, hapus!',
            cancelButtonText: 'Batal',
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(deleteTemplat(idAdm, role, id)).then(() => {
                    Swal.fire({
                        icon: 'success',
                        title: 'Dihapus!',
                        text: 'Templat berhasil dihapus.',
                        timer: 2000,
                        showConfirmButton: false,
                        allowEscapeKey: false,
                        allowOutsideClick: false,
                        timerProgressBar: true,
                    });
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

    const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
    const currentData = filteredUsers.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    if (token && isWebsite) {
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
                                            {userData?.meta?.totalData ? (
                                                userData.meta.totalData
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
                                            return (
                                                <div key={item.id} className='container col-f f-between'>
                                                    <a className="templat-list templat-card f-1" href={`/templatedetail/${item.id}`}>
                                                        <div className='container col-f f-center'>
                                                            <img style={{height:'100%'}} className='cv-templat' src={`${item.link_gambar}`} alt="link_gambar templat" />
                                                        </div>
                                                    </a>
                                                    <div className='container col-f f-center-c'>
                                                    <p>{`${item.caption}`}</p>
                                                    <div className='container row-f f-1 f-wrap f-center-c'>
                                                        <a className="t-center btn btn-primary" href={`/edittemplate/${idAdm}/${role}/${item.id}`}>Edit</a>
                                                        <button
                                                            onClick={() =>
                                                                deleteTemplats(
                                                                    item.id
                                                                )
                                                            }
                                                            className="t-center btn btn-danger"
                                                        >Hapus</button>
                                                    </div>
                                                    </div>
                                                </div>
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
                                                                    href={`/user/${idAdm}/${role}/${item.id}`}
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
                                                                    href={`user/edit/${idAdm}/${role}/${item.id}`}
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
        window.location.href = `/user/login`;
    }
}

export default Dashboard;
