import React, { useEffect } from "react";
import ReactPaginate from "react-paginate";
import { useDispatch, useSelector } from "react-redux";
import { getUser, deleteUser } from "../../redux/action/user.action";
import Swal from "sweetalert2";

function UserList() {
    const dispatch = useDispatch();
    const { userList, isLoading, error } = useSelector((state) => state.userReducer);
    const data = userList.data; /* Menampung seluruh data. Namun hanya dari 1 - 10, karena dari API sudah di atur 1 halaman menampilkan 10 data.*/

    useEffect(() => {
        dispatch(getUser());
    }, [dispatch]);

    const deleteData = (id) => {
        Swal.fire({
            title: 'Apakah Anda yakin?',
            text: "Data yang dihapus tidak dapat dikembalikan!",
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
    }

    useEffect(() => {
        if (error) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: `Gagal mengambil data!`,
                confirmButtonText: 'OK'
            });
        }
    }, [error]);

    return (
        <main className="container col-f f-center">
            <section className="container col-f full-width section-max">
                <input type="search" placeholder="Cari" className="m-bt2" />
                <div className="container row-f f-wrap">
                    <a href="/user/create" className="btn btn-primary">Tambah Pengguna</a>
                </div>
                <div className="container col-f">
                    <h1>Daftar Pengguna</h1>
                    <div className="container col-f full-width list-container">
                        {isLoading ? (
                            <div className="container col-f f-center-c list-container"><div className="custom-loader"></div></div>
                        ) : (
                            <div className="container col-f">
                                {data?.map((item) => {
                                    return (
                                        <div key={item.id} className="menu-card container col-f full-width">
                                            <div className="container swap">
                                                <div className="container col-f left-card-menu fj-center f-1">
                                                    <a className="user-list" href={`/user/${item.id}`}>
                                                        <div className="container col-f f-wrap">
                                                            <h3>{item.nama}</h3>
                                                            <p className="cut-text">{item.email}</p>
                                                            <p>{item.no_telp}</p>
                                                        </div>
                                                    </a>
                                                </div>
                                                <div className="container col-f right-card-menu">
                                                        <a href={`user/edit/${item.id}`} className="t-center btn btn-info">Ubah</a>
                                                        <button onClick={() => deleteData(item.id)} className="t-center btn btn-danger">Hapus</button>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </main>
    );
}

export default UserList;