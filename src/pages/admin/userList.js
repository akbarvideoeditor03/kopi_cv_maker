import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../redux/action/user.action";
import Swal from "sweetalert2";

function UserList() {
    const dispatch = useDispatch();
    const { userList, isLoading, error } = useSelector((state) => state.userReducer);

    useEffect(() => {
        dispatch(getUser());
    }, [dispatch]);

    useEffect(() => {
        if (error) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: `Hm... Ada yang salah nih!, ${error.message}`,
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
                    {isLoading ? (
                        <div className="container col-f f-center-c"><p>Silahkan tunggu...</p></div>
                    ) : (
                        <div className="container col-f">
                            {userList.map((item) => {
                                return (
                                    <div key={item.id} className="card-mini container col-f full-width">
                                        <div className="container row-f f-wrap">
                                            <div className="container col-f f-1 fj-center">
                                                <a href={`/user/${item.id}`}>
                                                    <div className="container row-f f-wrap f-between">
                                                        <h3>{item.nama}</h3>
                                                        <p>{item.email}</p>
                                                    </div>
                                                </a>
                                            </div>
                                            <div className="container col-f">
                                                <a href={`user/edit/${item.id}`} className="btn btn-info">Ubah</a>
                                                <a href={`user/delete/${item.id}`} className="btn btn-danger">Hapus</a>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </section>
        </main>
    );
}

export default UserList;