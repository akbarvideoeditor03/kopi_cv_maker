import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserId } from "../../redux/action/user.action";
import Swal from "sweetalert2";
import { useParams } from "react-router-dom";

function UserListDetail() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { userList, isLoading, error } = useSelector((state) => state.userReducer);
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

    return (
        <main className="container col-f f-center-c">
            {isLoading ? (
                <p>Silahkan tunggu...</p>
            ) : (
                <div className="container col-f">
                    <p>{userList.id}</p>
                    <p>{userList.nama}</p>
                    <p className="cut-text">{userList.email}</p>
                    <p>{userList.tentang === null ? <p>Data Kosong</p> : userList.tentang}</p>
                    <img style={{maxWidth : '200px', height : '100%'}} className="full-width" src={`${userList.foto_profil}`} alt="" />
                </div>
            )}
        </main>
    );
}

export default UserListDetail;