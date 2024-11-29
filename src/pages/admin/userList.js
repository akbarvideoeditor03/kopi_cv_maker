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
        <main className="container col-f f-center-c">
            {isLoading ? (
                <p>Silahkan tunggu...</p>
            ) : (
                <div className="container">
                    {userList.map((item) => {
                        return (
                            <div className="container col-f">
                                <h3>{item.nama} </h3>
                            </div>
                        );
                    })}
                </div>
            )}
        </main>
    );
}

export default UserList;