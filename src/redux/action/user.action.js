import Swal from 'sweetalert2';
import { userTypes } from '../actionTypes';
import { createClient } from '@supabase/supabase-js';
const baseUrl = process.env.REACT_APP_BASE_URL;
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseBucket = process.env.REACT_APP_SUPABASE_BUCKET;
const supabaseKey = process.env.REACT_APP_SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey, supabaseBucket);
export default supabase;

export const uploadToSupabase = async (newFileName, file) => {
    try {
        const { data, error } = await supabase.storage
            .from('final_project')
            .upload(newFileName, file, {
                contentType: file.type,
                upsert: false,
            });
        if (error) {
            console.error('Error uploading file:', error);
            throw error;
        }
        const publicUrlResponse = supabase.storage
            .from('final_project')
            .getPublicUrl(data.path);

        return publicUrlResponse.data.publicUrl;
    } catch (error) {
        console.error('Error uploading file to Supabase Storage:', error);
        throw error;
    }
};

// Create User Form Admin
export const createUser = (user) => async (dispatch) => {
    dispatch({ type: userTypes.CREATE_USER_REQUEST });
    try {
        const response = await fetch(`${baseUrl}/kopi/user/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        });
        if (response.status === 500) {
            Swal.fire({
                icon: 'error',
                title: 'Ups, Maaf...',
                text: 'Server lagi error nih',
                showConfirmButton: false,
                timer: 2000,
                allowEscapeKey: false,
                allowOutsideClick: false,
                timerProgressBar: true,
            });
        } else {
            Swal.fire({
                icon: 'success',
                title: 'Selamat',
                text: 'User berhasil ditambah',
                showConfirmButton: false,
                timer: 2000,
                allowEscapeKey: false,
                allowOutsideClick: false,
                timerProgressBar: true,
            }).then(() => {
                window.location.href = '/dashboard';
            });
            const data = await response.json();
            dispatch({
                type: userTypes.CREATE_USER_SUCCESS,
                payload: data.data,
            });
        }
    } catch (error) {
        dispatch({
            type: userTypes.CREATE_USER_FAILURE,
            payload: error,
        });
    }
};

//Register
export const createUserSelf = (user) => async (dispatch) => {
    dispatch({ type: userTypes.CREATE_USER_REQUEST });
    try {
        const response = await fetch(`${baseUrl}/kopi/user/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        });
        if (response.status === 500) {
            Swal.fire({
                icon: 'error',
                title: 'Ups, Maaf...',
                text: 'Server kami lagi error nih',
                showConfirmButton: false,
                timer: 2000,
                allowEscapeKey: false,
                allowOutsideClick: false,
                timerProgressBar: true,
            });
        } else {
            Swal.fire({
                icon: 'success',
                title: 'Registrasi berhasil!',
                text: 'Silakan masuk dengan akun Anda',
                showConfirmButton: false,
                timer: 2000,
                allowEscapeKey: false,
                allowOutsideClick: false,
                timerProgressBar: true,
            }).then(() => {
                Swal.close();
                window.location = '/user/login';
            });
            const data = await response.json();
            dispatch({
                type: userTypes.CREATE_USER_SUCCESS,
                payload: data.data,
            });
        }
    } catch (error) {
        dispatch({
            type: userTypes.CREATE_USER_FAILURE,
            payload: error,
        });
    }
};

//Login
export const postUserLogin = (user) => async (dispatch) => {
    dispatch({ type: userTypes.CREATE_USER_REQUEST });
    try {
        const response = await fetch(`${baseUrl}/kopi/user/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        });

        if (response.status === 500) {
            Swal.fire({
                icon: 'error',
                title: 'Ups, Maaf...',
                text: 'Server kami lagi error nih',
                showConfirmButton: false,
                timer: 2000,
                allowEscapeKey: false,
                allowOutsideClick: false,
                timerProgressBar: true,
            });
        } else {
            const data = await response.json();
            const idUser = data.id;
            const token = data.token;
            const roleUser = data.role;
            if (!idUser && !token && !roleUser) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oopss...',
                    text: 'Akun tidak ditemukan. Atau password salah',
                    showConfirmButton: false,
                    timer: 3000,
                    allowEscapeKey: false,
                    allowOutsideClick: false,
                    timerProgressBar: true,
                }).then(() => {
                    Swal.close();
                    window.location.reload();
                });
            } else {
                Swal.fire({
                    icon: 'success',
                    title: 'Selamat',
                    text: 'Akun berhasil masuk',
                    showConfirmButton: false,
                    timer: 3000,
                    allowEscapeKey: false,
                    allowOutsideClick: false,
                    timerProgressBar: true,
                }).then(() => {
                    localStorage.setItem('id', idUser);
                    localStorage.setItem('role', roleUser);
                    localStorage.setItem('token', token);
                    Swal.close();
                    window.location = '/';
                });
                dispatch({
                    type: userTypes.CREATE_USER_SUCCESS,
                    payload: data.data,
                });
            }
        }
    } catch (error) {
        console.error('Error during login:', error);
        dispatch({
            type: userTypes.CREATE_USER_FAILURE,
            payload: error,
        });
    }
};

export const getUser = () => {
    return async (dispatch) => {
        dispatch({ type: userTypes.GET_USER_LIST_REQUEST });
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${baseUrl}/kopi/user`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const data = await response.json();
            const dataNumber = data.meta;

            dispatch({
                type: userTypes.GET_USER_LIST_SUCCESS,
                payload: {
                    data: data.data,
                    meta: dataNumber,
                },
            });
        } catch (error) {
            dispatch({
                type: userTypes.GET_USER_LIST_FAILURE,
                payload: error,
            });
        }
    };
};

export const getUserId = (id) => {
    return async (dispatch) => {
        dispatch({ type: userTypes.GET_USER_ID_LIST_REQUEST });
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${baseUrl}/kopi/user/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const data = await response.json();
            dispatch({
                type: userTypes.GET_USER_ID_LIST_SUCCESS,
                payload: data.data,
            });
            return data;
        } catch (error) {
            dispatch({
                type: userTypes.GET_USER_ID_LIST_FAILURE,
                payload: error,
            });
        }
    };
};

export const updateUser = (id, updatedUser) => async (dispatch) => {
    dispatch({ type: userTypes.UPDATE_USER_REQUEST });
    try {
        const token = localStorage.getItem('token');
        const role = localStorage.getItem('role');
        const response = await fetch(`${baseUrl}/kopi/user/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(updatedUser),
        });
        if (response.status === 500) {
            Swal.fire({
                icon: 'error',
                title: 'Ups, Maaf...',
                text: 'Server kami lagi error nih',
                showConfirmButton: false,
                timer: 2000,
                allowEscapeKey: false,
                allowOutsideClick: false,
                timerProgressBar: true,
            });
        } else {
            Swal.fire({
                icon: 'success',
                title: 'Selamat',
                text: 'Data berhasil diubah',
                showConfirmButton: false,
                timer: 2000,
                allowEscapeKey: false,
                allowOutsideClick: false,
                timerProgressBar: true,
            }).then(() => {
                Swal.close();
                if (role === 'user') {
                    window.location = '/home';
                } else {
                    window.location = '/user';
                }
            });
            const data = await response.json();
            dispatch({
                type: userTypes.UPDATE_USER_SUCCESS,
                payload: data.data,
            });
        }
    } catch (error) {
        dispatch({
            type: userTypes.UPDATE_USER_FAILURE,
            payload: error,
        });
    }
};

//Only Admin
export const deleteUser = (id) => async (dispatch) => {
    dispatch({ type: userTypes.DELETE_USER_REQUEST });
    try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${baseUrl}/kopi/user/${id}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        if (response.status === 500) {
            Swal.fire({
                icon: 'error',
                title: 'Ups, Maaf...',
                text: 'Server kami lagi error nih',
                showConfirmButton: false,
                timer: 2000,
                allowEscapeKey: false,
                allowOutsideClick: false,
                timerProgressBar: true,
            });
        } else {
            dispatch({
                type: userTypes.DELETE_USER_SUCCESS,
                payload: id,
            });
        }
    } catch (error) {
        dispatch({
            type: userTypes.DELETE_USER_FAILURE,
            payload: error,
        });
    }
};

//Pengalaman Kerja
export const createPengalamanKerja = (pengalaman_kerja) => async (dispatch) => {
    dispatch({ type: userTypes.CREATE_PENGALAMAN_REQUEST });
    try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${baseUrl}/kopi/pengalamankerja/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(pengalaman_kerja),
        });
        if (response.status === 500) {
            Swal.fire({
                icon: 'error',
                title: 'Ups, Maaf...',
                text: 'Server kami lagi error nih',
                showConfirmButton: false,
                timer: 2000,
                allowEscapeKey: false,
                allowOutsideClick: false,
                timerProgressBar: true,
            });
        } else {
            Swal.fire({
                icon: 'success',
                title: 'Selamat',
                text: 'Pengalaman kerja berhasil ditambah',
                showConfirmButton: false,
                timer: 2000,
                allowEscapeKey: false,
                allowOutsideClick: false,
                timerProgressBar: true,
            }).then(() => {
                Swal.close();
                window.location.href = '/home';
            });
            const data = await response.json();
            dispatch({
                type: userTypes.CREATE_PENGALAMAN_SUCCESS,
                payload: data.data,
            });
        }
    } catch (error) {
        dispatch({
            type: userTypes.CREATE_PENGALAMAN_FAILURE,
            payload: error,
        });
    }
};

export const readPengalamanKerja = (id) => {
    return async (dispatch) => {
        dispatch({ type: userTypes.GET_PENGALAMAN_ID_REQUEST });
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(
                `${baseUrl}/kopi/pengalamankerja/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            const data = await response.json();
            dispatch({
                type: userTypes.GET_PENGALAMAN_ID_SUCCESS,
                payload: data.data,
            });
            return data;
        } catch (error) {
            dispatch({
                type: userTypes.GET_PENGALAMAN_ID_FAILURE,
                payload: error,
            });
        }
    };
};

export const updatePengalamanKerja =
    (id, updatedPengalamanKerja) => async (dispatch) => {
        dispatch({ type: userTypes.UPDATE_PENGALAMAN_REQUEST });
        try {
            const token = localStorage.getItem('token');
            const id_user = localStorage.getItem('id');
            const response = await fetch(
                `${baseUrl}/kopi/pengalamankerja/${id_user}/${id}`,
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify(updatedPengalamanKerja),
                }
            );
            if (response.status === 500) {
                Swal.fire({
                    icon: 'error',
                    title: 'Ups, Maaf...',
                    text: 'Server kami lagi error nih',
                    showConfirmButton: false,
                    timer: 2000,
                    allowEscapeKey: false,
                    allowOutsideClick: false,
                    timerProgressBar: true,
                });
            } else {
                Swal.fire({
                    icon: 'success',
                    title: 'Selamat',
                    text: 'Pengalaman kerja berhasil diubah',
                    showConfirmButton: false,
                    timer: 2000,
                    allowEscapeKey: false,
                    allowOutsideClick: false,
                    timerProgressBar: true,
                }).then(() => {
                    window.location = '/home';
                });
                const data = await response.json();
                dispatch({
                    type: userTypes.UPDATE_PENGALAMAN_SUCCESS,
                    payload: data.data,
                });
            }
        } catch (error) {
            dispatch({
                type: userTypes.UPDATE_PENGALAMAN_FAILURE,
                payload: error,
            });
        }
    };

export const deletePengalamanKerja = (id) => async (dispatch) => {
    dispatch({ type: userTypes.DELETE_PENGALAMAN_REQUEST });
    try {
        const token = localStorage.getItem('token');
        const id_user = localStorage.getItem('id');
        await fetch(`${baseUrl}/kopi/pengalamankerja/${id_user}/${id}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        dispatch({
            type: userTypes.DELETE_PENGALAMAN_SUCCESS,
            payload: id,
        });
    } catch (error) {
        dispatch({
            type: userTypes.DELETE_PENGALAMAN_FAILURE,
            payload: error,
        });
    }
};

//Pendidikan Terakhir
export const createPendidikanTerakhir =
    (pendidikan_terakhir) => async (dispatch) => {
        dispatch({ type: userTypes.CREATE_PENDIDIKAN_ID_REQUEST });
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${baseUrl}/kopi/pendidikanterakhir`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(pendidikan_terakhir),
            });
            if (response.status === 500) {
                Swal.fire({
                    icon: 'error',
                    title: 'Ups, Maaf...',
                    text: 'Server kami lagi error nih',
                    showConfirmButton: false,
                    timer: 2000,
                    allowEscapeKey: false,
                    allowOutsideClick: false,
                    timerProgressBar: true,
                });
            } else {
                Swal.fire({
                    icon: 'success',
                    title: 'Selamat',
                    text: 'Pendidikan terakhir berhasil ditambah',
                    showConfirmButton: false,
                    timer: 2000,
                    allowEscapeKey: false,
                    allowOutsideClick: false,
                    timerProgressBar: true,
                }).then(() => {
                    window.location = '/home';
                });
                const data = await response.json();
                dispatch({
                    type: userTypes.CREATE_PENDIDIKAN_ID_SUCCESS,
                    payload: data.data,
                });
            }
        } catch (error) {
            dispatch({
                type: userTypes.CREATE_PENDIDIKAN_ID_FAILURE,
                payload: error,
            });
        }
    };

export const readPendidikanTerakhir = (id) => {
    return async (dispatch) => {
        dispatch({ type: userTypes.GET_PENDIDIKAN_ID_REQUEST });
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(
                `${baseUrl}/kopi/pendidikanterakhir/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            const data = await response.json();

            dispatch({
                type: userTypes.GET_PENDIDIKAN_ID_SUCCESS,
                payload: data.data,
            });
            return data;
        } catch (error) {
            dispatch({
                type: userTypes.GET_PENDIDIKAN_ID_FAILURE,
                payload: error,
            });
        }
    };
};

export const updatePendidikanTerakhir =
    (id, updatedPendidikanTerakhir) => async (dispatch) => {
        dispatch({ type: userTypes.UPDATE_PENDIDIKAN_ID_REQUEST });
        try {
            const token = localStorage.getItem('token');
            const id_user = localStorage.getItem('id');
            const response = await fetch(
                `${baseUrl}/kopi/pendidikanterakhir/${id_user}/${id}`,
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify(updatedPendidikanTerakhir),
                }
            );
            if (response.status === 500) {
                Swal.fire({
                    icon: 'error',
                    title: 'Ups, Maaf...',
                    text: 'Server kami lagi error nih',
                    showConfirmButton: false,
                    timer: 2000,
                    allowEscapeKey: false,
                    allowOutsideClick: false,
                    timerProgressBar: true,
                });
            } else {
                Swal.fire({
                    icon: 'success',
                    title: 'Selamat',
                    text: 'Pendidikan terakhir berhasil diubah',
                    showConfirmButton: false,
                    timer: 2000,
                    allowEscapeKey: false,
                    allowOutsideClick: false,
                    timerProgressBar: true,
                }).then(() => {
                    window.location = '/home';
                });
                const data = await response.json();
                dispatch({
                    type: userTypes.UPDATE_PENDIDIKAN_ID_SUCCESS,
                    payload: data.data,
                });
            }
        } catch (error) {
            dispatch({
                type: userTypes.UPDATE_PENDIDIKAN_ID_FAILURE,
                payload: error,
            });
        }
    };

export const deletePendidikanTerakhir = (id) => async (dispatch) => {
    dispatch({ type: userTypes.DELETE_PENDIDIKAN_ID_REQUEST });
    try {
        const token = localStorage.getItem('token');
        const id_user = localStorage.getItem('id');
        await fetch(`${baseUrl}/kopi/pendidikanterakhir/${id_user}/${id}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        dispatch({
            type: userTypes.DELETE_PENDIDIKAN_ID_SUCCESS,
            payload: id,
        });
    } catch (error) {
        dispatch({
            type: userTypes.DELETE_PENDIDIKAN_ID_FAILURE,
            payload: error,
        });
    }
};

//Keahlian
export const createKeahlian = (keahlian) => async (dispatch) => {
    dispatch({ type: userTypes.CREATE_KEAHLIAN_ID_REQUEST });
    try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${baseUrl}/kopi/keahlian`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(keahlian),
        });
        if (response.status === 500) {
            Swal.fire({
                icon: 'error',
                title: 'Ups, Maaf...',
                text: 'Server kami lagi error nih',
                showConfirmButton: false,
                timer: 2000,
                allowEscapeKey: false,
                allowOutsideClick: false,
                timerProgressBar: true,
            });
        } else {
            Swal.fire({
                icon: 'success',
                title: 'Selamat',
                text: 'Keahlian berhasil ditambah',
                showConfirmButton: false,
                timer: 2000,
                allowEscapeKey: false,
                allowOutsideClick: false,
                timerProgressBar: true,
            }).then(() => {
                window.location = '/home';
            });
            const data = await response.json();
            dispatch({
                type: userTypes.CREATE_KEAHLIAN_ID_SUCCESS,
                payload: data.data,
            });
        }
    } catch (error) {
        dispatch({
            type: userTypes.CREATE_KEAHLIAN_ID_FAILURE,
            payload: error,
        });
    }
};

export const readKeahlian = (id) => {
    return async (dispatch) => {
        dispatch({ type: userTypes.GET_KEAHLIAN_ID_REQUEST });
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${baseUrl}/kopi/keahlian/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const data = await response.json();

            dispatch({
                type: userTypes.GET_KEAHLIAN_ID_SUCCESS,
                payload: data.data,
            });
            return data;
        } catch (error) {
            dispatch({
                type: userTypes.GET_KEAHLIAN_ID_FAILURE,
                payload: error,
            });
        }
    };
};

export const updateKeahlian = (id, updatedKeahlian) => async (dispatch) => {
    dispatch({ type: userTypes.UPDATE_KEAHLIAN_ID_REQUEST });
    try {
        const token = localStorage.getItem('token');
        const id_user = localStorage.getItem('id');
        const response = await fetch(
            `${baseUrl}/kopi/keahlian/${id_user}/${id}`,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(updatedKeahlian),
            }
        );
        if (response.status === 500) {
            Swal.fire({
                icon: 'error',
                title: 'Ups, Maaf...',
                text: 'Server kami lagi error nih',
                showConfirmButton: false,
                timer: 2000,
                allowEscapeKey: false,
                allowOutsideClick: false,
                timerProgressBar: true,
            });
        } else {
            Swal.fire({
                icon: 'success',
                title: 'Selamat',
                text: 'Keahlian berhasil diperbarui',
                showConfirmButton: false,
                timer: 2000,
                allowEscapeKey: false,
                allowOutsideClick: false,
                timerProgressBar: true,
            }).then(() => {
                window.location = '/home';
            });
            const data = await response.json();
            dispatch({
                type: userTypes.UPDATE_KEAHLIAN_ID_SUCCESS,
                payload: data.data,
            });
        }
    } catch (error) {
        dispatch({
            type: userTypes.UPDATE_KEAHLIAN_ID_FAILURE,
            payload: error,
        });
    }
};

export const deleteKeahlian = (id) => async (dispatch) => {
    dispatch({ type: userTypes.DELETE_KEAHLIAN_ID_REQUEST });
    try {
        const token = localStorage.getItem('token');
        const id_user = localStorage.getItem('id');
        const response = await fetch(
            `${baseUrl}/kopi/keahlian/${id_user}/${id}`,
            {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        if (response.status === 500) {
            Swal.fire({
                icon: 'error',
                title: 'Ups, Maaf...',
                text: 'Server kami lagi error nih',
                showConfirmButton: false,
                timer: 2000,
                allowEscapeKey: false,
                allowOutsideClick: false,
                timerProgressBar: true,
            });
        } else {
            dispatch({
                type: userTypes.DELETE_KEAHLIAN_ID_SUCCESS,
                payload: id,
            });
        }
    } catch (error) {
        dispatch({
            type: userTypes.DELETE_KEAHLIAN_ID_FAILURE,
            payload: error,
        });
    }
};

//Prestasi Kerja
export const createPrestasi = (prestasi) => async (dispatch) => {
    dispatch({ type: userTypes.CREATE_PRESTASI_ID_REQUEST });
    try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${baseUrl}/kopi/prestasikerja`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(prestasi),
        });
        if (response.status === 500) {
            Swal.fire({
                icon: 'error',
                title: 'Ups, Maaf...',
                text: 'Server kami lagi error nih',
                showConfirmButton: false,
                timer: 2000,
                allowEscapeKey: false,
                allowOutsideClick: false,
                timerProgressBar: true,
            });
        } else {
            Swal.fire({
                icon: 'success',
                title: 'Selamat',
                text: 'Prestasi kerja berhasil ditambah',
                showConfirmButton: false,
                timer: 2000,
                allowEscapeKey: false,
                allowOutsideClick: false,
                timerProgressBar: true,
            }).then(() => {
                window.location = '/home';
            });
            const data = await response.json();
            dispatch({
                type: userTypes.CREATE_PRESTASI_ID_SUCCESS,
                payload: data.data,
            });
        }
    } catch (error) {
        dispatch({
            type: userTypes.CREATE_PRESTASI_ID_FAILURE,
            payload: error,
        });
    }
};

export const readPrestasi = () => {
    return async (dispatch) => {
        dispatch({ type: userTypes.GET_PRESTASI_REQUEST });
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${baseUrl}/kopi/prestasikerja`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const data = await response.json();
            dispatch({
                type: userTypes.GET_PRESTASI_SUCCESS,
                payload: data.data,
            });
            return data;
        } catch (error) {
            dispatch({
                type: userTypes.GET_PRESTASI_FAILURE,
                payload: error,
            });
        }
    };
};

export const updatePrestasi =
    (id, id_pengalaman_kerja, updatedPrestasi) => async (dispatch) => {
        dispatch({ type: userTypes.UPDATE_PRESTASI_ID_REQUEST });
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(
                `${baseUrl}/kopi/prestasikerja/${id_pengalaman_kerja}/${id}`,
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify(updatedPrestasi),
                }
            );
            if (response.status === 500) {
                Swal.fire({
                    icon: 'error',
                    title: 'Ups, Maaf...',
                    text: 'Server kami lagi error nih',
                    showConfirmButton: false,
                    timer: 2000,
                    allowEscapeKey: false,
                    allowOutsideClick: false,
                    timerProgressBar: true,
                });
            } else {
                Swal.fire({
                    icon: 'success',
                    title: 'Selamat',
                    text: 'Prestasi kerja berhasil diubah',
                    showConfirmButton: false,
                    timer: 2000,
                    allowEscapeKey: false,
                    allowOutsideClick: false,
                    timerProgressBar: true,
                }).then(() => {
                    window.location = '/home';
                });
                const data = await response.json();
                dispatch({
                    type: userTypes.UPDATE_PRESTASI_ID_SUCCESS,
                    payload: data.data,
                });
            }
        } catch (error) {
            dispatch({
                type: userTypes.UPDATE_PRESTASI_ID_FAILURE,
                payload: error,
            });
        }
    };

export const deletePrestasi = (id, id_pengalaman_kerja) => async (dispatch) => {
    dispatch({ type: userTypes.DELETE_PRESTASI_ID_REQUEST });
    try {
        const token = localStorage.getItem('token');
        const response = await fetch(
            `${baseUrl}/kopi/prestasikerja/${id_pengalaman_kerja}/${id}`,
            {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        if (response.status === 500) {
            Swal.fire({
                icon: 'error',
                title: 'Ups, Maaf...',
                text: 'Server kami lagi error nih',
                showConfirmButton: false,
                timer: 2000,
                allowEscapeKey: false,
                allowOutsideClick: false,
                timerProgressBar: true,
            });
        } else {
            dispatch({
                type: userTypes.DELETE_PRESTASI_ID_SUCCESS,
                payload: id,
            });
        }
    } catch (error) {
        dispatch({
            type: userTypes.DELETE_PRESTASI_ID_FAILURE,
            payload: error,
        });
    }
};

//Pelatihan
export const createPelatihan = (pelatihan) => async (dispatch) => {
    dispatch({ type: userTypes.CREATE_PELATIHAN_ID_REQUEST });
    try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${baseUrl}/kopi/pelatihan`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(pelatihan),
        });
        if (response.status === 500) {
            Swal.fire({
                icon: 'error',
                title: 'Ups, Maaf...',
                text: 'Server kami lagi error nih',
                showConfirmButton: false,
                timer: 2000,
                allowEscapeKey: false,
                allowOutsideClick: false,
                timerProgressBar: true,
            });
        } else {
            Swal.fire({
                icon: 'success',
                title: 'Selamat',
                text: 'Pelatihan / kursus berhasil ditambah',
                showConfirmButton: false,
                timer: 2000,
                allowEscapeKey: false,
                allowOutsideClick: false,
                timerProgressBar: true,
            }).then(() => {
                window.location = '/home';
            });
            const data = await response.json();
            dispatch({
                type: userTypes.CREATE_PELATIHAN_ID_SUCCESS,
                payload: data.data,
            });
        }
    } catch (error) {
        dispatch({
            type: userTypes.CREATE_PELATIHAN_ID_FAILURE,
            payload: error,
        });
    }
};

export const readPelatihan = (id) => {
    return async (dispatch) => {
        dispatch({ type: userTypes.GET_PELATIHAN_ID_REQUEST });
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${baseUrl}/kopi/pelatihan/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const data = await response.json();
            dispatch({
                type: userTypes.GET_PELATIHAN_ID_SUCCESS,
                payload: data.data,
            });
            return data;
        } catch (error) {
            dispatch({
                type: userTypes.GET_PELATIHAN_ID_FAILURE,
                payload: error,
            });
        }
    };
};

export const updatePelatihan = (id, updatedPelatihan) => async (dispatch) => {
    dispatch({ type: userTypes.UPDATE_PELATIHAN_ID_REQUEST });
    try {
        const token = localStorage.getItem('token');
        const id_user = localStorage.getItem('id');
        const response = await fetch(
            `${baseUrl}/kopi/pelatihan/${id_user}/${id}`,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(updatedPelatihan),
            }
        );
        if (response.status === 500) {
            Swal.fire({
                icon: 'error',
                title: 'Ups, Maaf...',
                text: 'Server kami lagi error nih',
                showConfirmButton: false,
                timer: 2000,
                allowEscapeKey: false,
                allowOutsideClick: false,
                timerProgressBar: true,
            });
        } else {
            Swal.fire({
                icon: 'success',
                title: 'Selamat',
                text: 'Pelatihan / kursus berhasil diubah',
                showConfirmButton: false,
                timer: 2000,
                allowEscapeKey: false,
                allowOutsideClick: false,
                timerProgressBar: true,
            }).then(() => {
                window.location = '/home';
            });
            const data = await response.json();
            dispatch({
                type: userTypes.UPDATE_PELATIHAN_ID_SUCCESS,
                payload: data.data,
            });
        }
    } catch (error) {
        dispatch({
            type: userTypes.UPDATE_PELATIHAN_ID_FAILURE,
            payload: error,
        });
    }
};

export const deletePelatihan = (id) => async (dispatch) => {
    dispatch({ type: userTypes.DELETE_PELATIHAN_ID_REQUEST });
    try {
        const token = localStorage.getItem('token');
        const id_user = localStorage.getItem('id');
        const response = await fetch(
            `${baseUrl}/kopi/pelatihan/${id_user}/${id}`,
            {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        if (response.status === 500) {
            Swal.fire({
                icon: 'error',
                title: 'Ups, Maaf...',
                text: 'Server kami lagi error nih',
                showConfirmButton: false,
                timer: 2000,
                allowEscapeKey: false,
                allowOutsideClick: false,
                timerProgressBar: true,
            });
        } else {
            dispatch({
                type: userTypes.DELETE_PELATIHAN_ID_SUCCESS,
                payload: id,
            });
        }
    } catch (error) {
        dispatch({
            type: userTypes.DELETE_PELATIHAN_ID_FAILURE,
            payload: error,
        });
    }
};
