import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserId } from '../../redux/action/user.action';
import Swal from 'sweetalert2';
import { useParams } from 'react-router-dom';

function UserListDetail() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const role = localStorage.getItem('role');
    const { isWebsite, userList, isLoading, error } = useSelector(
        (state) => state.userReducer
    );
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
                confirmButtonText: 'OK',
            });
        }
    }, [error]);

    if (role === roleUser) {
        return (
            <main className="container col-f f-center-c">
                {isLoading ? (
                    <p>Silakan tunggu...</p>
                ) : (
                    <div className="container col-f">
                        <p>{userList.nama}</p>
                        <p className="cut-text">{userList.email}</p>
                        <p>
                            {userList.tentang === null ? (
                                <p>Data Kosong</p>
                            ) : (
                                userList.tentang
                            )}
                        </p>
                        <img
                            style={{
                                maxWidth: '200px',
                                height: '100%',
                            }}
                            className="full-width"
                            src={`${userList.foto_profil}`}
                            alt=""
                        />
                    </div>
                )}
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

export default UserListDetail;
