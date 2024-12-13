import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserId } from "../../redux/action/user.action";
import Swal from "sweetalert2";
import { useParams } from "react-router-dom";

function UserListDetail() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const role = localStorage.getItem('role');
    const { isWebsite, userList, isLoading, error } = useSelector((state) => state.userReducer);
    const roleUser = isWebsite;
    useEffect(() => {
        dispatch(getUserId(id));
    }, [dispatch, id]);

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

    if(role === roleUser) {
        return (
            <main className="container col-f f-center-c">
                {isLoading ? (
                    <p>Silakan tunggu...</p>
                ) : (
                    <div className="container col-f">
                        <p>{userList.nama}</p>
                        <p className="cut-text">{userList.email}</p>
                        <p>{userList.tentang === null ? <p>Data Kosong</p> : userList.tentang}</p>
                        <img style={{maxWidth : '200px', height : '100%'}} className="full-width" src={`${userList.foto_profil}`} alt="" />
                    </div>
                )}
            </main>
        );
    } else {
        return (
            <main className="container col-f f-center">
                <section className="container col-f full-width section-max f-center">
                    <img style={{width : "70px"}} src="https://raw.githubusercontent.com/akbarvideoeditor03/FE/5da58e252c99da7a29144d6434f5af8013c5bb7a/public/assets/icon/angry-face.svg" alt="" />
                    <p className="t-center">Anda tidak dizinkan mengakses halaman ini</p>
                    <strong>ADMIN KOPI</strong>
                </section>
            </main>
        )
    }
}

export default UserListDetail;