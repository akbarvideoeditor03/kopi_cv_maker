import Swal from 'sweetalert2';
import { userTypes } from '../actionTypes';
import { createClient } from '@supabase/supabase-js';
import apiFetch from '../../util/api';
const baseUrl = process.env.REACT_APP_BASE_URL;
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseBucket = process.env.REACT_APP_SUPABASE_BUCKET;
const supabaseKey = process.env.REACT_APP_SUPABASE_KEY;
const supabaseFolder = process.env.REACT_APP_SUPABASE_FOLDER;
const supabase = createClient(supabaseUrl, supabaseKey, supabaseBucket);
export default supabase;

export const uploadToSupabase = async (newFileName, file) => {
    try {
        const { data, error } = await supabase.storage
            .from(`${supabaseFolder}`)
            .upload(newFileName, file, {
                contentType: file.type,
                upsert: false,
            });
        if (error) {
            console.error('Error uploading file:', error);
            throw error;
        }
        const publicUrlResponse = supabase.storage
            .from(`${supabaseFolder}`)
            .getPublicUrl(data.path);

        return publicUrlResponse.data.publicUrl;
    } catch (error) {
        console.error('Error uploading file to Supabase Storage:', error);
        throw error;
    }
};

//Register
export const register = (user) => async (dispatch) => {
    dispatch({ type: userTypes.REGISTER_REQUEST });
    try {
        const response = await apiFetch(`${baseUrl}/kopi/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        });
        if (response.status >= 500) {
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
        } else if (response.status === 400) {
            Swal.fire({
                icon: 'error',
                title: 'Ups...',
                text: 'Email sudah dipakai, silakan masuk atau gunakan email lain.',
                showConfirmButton: false,
                timer: 3000,
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
                type: userTypes.REGISTER_SUCCESS,
                payload: data.data,
            });
        }
    } catch (error) {
        dispatch({
            type: userTypes.REGISTER_FAILURE,
            payload: error,
        });
    }
};

//Ranah Login
export const postUserLogin = (user) => async (dispatch) => {
    localStorage.removeItem('lastActivity');
    dispatch({ type: userTypes.LOGIN_REQUEST });

    try {
        const response = await apiFetch(`${baseUrl}/kopi/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        if (data) {
            Swal.fire({
                icon: 'success',
                title: 'Selamat',
                text: 'Akun berhasil masuk',
                timer: 3000,
                showConfirmButton: false,
                allowEscapeKey: false,
                allowOutsideClick: false,
                timerProgressBar: true,
            }).then(() => {
                localStorage.setItem('/v%', data.id);
                localStorage.setItem('$f*', data.role);
                localStorage.setItem('&l2', data.token);
                window.location = '/';
            });
            dispatch({
                type: userTypes.LOGIN_SUCCESS,
                payload: data.data,
            });
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Oow...',
                text: 'Akun tidak ditemukan. Atau password salah',
                timer: 3000,
                showConfirmButton: false,
                allowEscapeKey: false,
                allowOutsideClick: false,
                timerProgressBar: true,
            });
            dispatch({
                type: userTypes.LOGIN_FAILURE,
                payload: 'Token missing',
            });
            return;
        }
    } catch (error) {
        console.error('Error during login:', error);
        dispatch({
            type: userTypes.LOGIN_FAILURE,
            payload: error,
        });
    }
};

export const gLogin = (response) => {
    localStorage.removeItem('lastActivity');
    return async (dispatch) => {
        dispatch({ type: userTypes.CREATE_USER_REQUEST });
        try {
            const result = await apiFetch(`${baseUrl}/kopi/auth/glogin`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ token: response.token }),
            })
            if (result.status >= 500) {
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
            } else if (result.status === 400) {
                Swal.fire({
                    icon: 'error',
                    text: 'Email sudah dipakai, silakan masuk atau gunakan email lain.',
                    showConfirmButton: true,
                    allowEscapeKey: false,
                    allowOutsideClick: false,
                });
            } else if (result.status === 401 || result.status === 403) {
                Swal.fire({
                    icon: 'error',
                    title: 'Autentikasi Gagal',
                    text: 'Token tidak valid atau sesi telah berakhir.',
                    showConfirmButton: true,
                    allowEscapeKey: false,
                    allowOutsideClick: false,
                })
            } else {
                const data = await result.json();
                if (data) {
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
                        localStorage.setItem('/v%', data.id);
                        localStorage.setItem('$f*', data.role);
                        localStorage.setItem('&l2', data.token);
                        window.location = '/';
                    });
                    dispatch({
                        type: userTypes.CREATE_USER_SUCCESS,
                        payload: data.data,
                    });
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oow...',
                        text: 'Silakan coba lagi',
                        showConfirmButton: false,
                        timer: 3000,
                        allowEscapeKey: false,
                        allowOutsideClick: false,
                        timerProgressBar: true,
                    });
                }
            }
        } catch (error) {
            dispatch({
                type: userTypes.CREATE_USER_FAILURE,
                payload: error,
            });
        }
    }
}

export const otpRequestCode = (emailReq) => async (dispatch) => {
    dispatch({ type: userTypes.CREATE_OTP_REQUEST });
    try {
        const response = await apiFetch(`${baseUrl}/kopi/auth/trypasswordreset`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(emailReq),
        });
        if (response.status >= 500) {
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
        } else if (response.status === 404) {
            Swal.fire({
                icon: 'error',
                title: 'Ups...',
                text: 'Email tidak ditemukan',
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
                text: 'Kode OTP berhasil dikirim. Cek email sekarang!',
                showConfirmButton: false,
                timer: 2000,
                allowEscapeKey: false,
                allowOutsideClick: false,
                timerProgressBar: true,
            }).then(() => {
                window.location.href = '/user/passwordreset';
            });
            const data = await response.json();
            dispatch({
                type: userTypes.CREATE_OTP_SUCCESS,
                payload: data.data,
            });
        }
    } catch (error) {
        dispatch({
            type: userTypes.CREATE_OTP_FAILURE,
            payload: error,
        });
    }
};

export const resetPassword = (data) => async (dispatch) => {
    dispatch({ type: userTypes.CREATE_RESET_PASSWORD_REQUEST });
    try {
        const token = localStorage.getItem('&l2');
        const response = await apiFetch(`${baseUrl}/kopi/user/passwordreset`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        if (response.status >= 500) {
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
        } else if (response.status === 401) {
            Swal.fire({
                icon: 'error',
                title: 'Ups, Maaf...',
                text: 'OTP salah atau udah kadaluarsa. Coba lagi',
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
                text: 'Password berhasil direset',
                showConfirmButton: false,
                timer: 2000,
                allowEscapeKey: false,
                allowOutsideClick: false,
                timerProgressBar: true,
            }).then(() => {
                if (!token) {
                    window.location.href = '/user/login';
                } else {
                    window.location.href = '/home';
                }
            });
            const data = await response.json();
            dispatch({
                type: userTypes.CREATE_RESET_PASSWORD_SUCCESS,
                payload: data.data,
            });
        }
    } catch (error) {
        dispatch({
            type: userTypes.CREATE_RESET_PASSWORD_FAILURE,
            payload: error,
        });
    }
};

// Ranah Admin
export const createUser = (id_user, role, user) => async (dispatch) => {
    dispatch({ type: userTypes.CREATE_USER_REQUEST });
    try {
        const token = localStorage.getItem('&l2');
        const response = await apiFetch(`${baseUrl}/kopi/user/data/${id_user}/${role}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(user),
        });
        if (response.status >= 500) {
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

export const getUserAdm = (id, role) => {
    return async (dispatch) => {
        dispatch({ type: userTypes.GET_ADMIN_REQUEST });
        try {
            const token = localStorage.getItem('&l2');
            const response = await apiFetch(`${baseUrl}/kopi/user/data/${id}/${role}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const data = await response.json();
            const dataNumber = data.meta;

            dispatch({
                type: userTypes.GET_ADMIN_SUCCESS,
                payload: {
                    data: data.data,
                    meta: dataNumber,
                },
            });
        } catch (error) {
            dispatch({
                type: userTypes.GET_ADMIN_FAILURE,
                payload: error,
            });
        }
    };
};

export const getDataId = (id_user, role, id) => {
    return async (dispatch) => {
        dispatch({ type: userTypes.GET_ADMIN_ID_REQUEST });
        try {
            const token = localStorage.getItem('&l2');
            const response = await apiFetch(`${baseUrl}/kopi/user/data/${id_user}/${role}/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                if (response.status >= 400) {
                    Object.keys(localStorage).forEach(key => {
                        if (key !== 'dark-mode') {
                            localStorage.removeItem(key);
                        }
                    });
                    window.location.href = '/user/login';
                    return;
                }
            }

            const data = await response.json();
            dispatch({
                type: userTypes.GET_ADMIN_ID_SUCCESS,
                payload: data.data,
            });
            return data;

        } catch (error) {
            dispatch({
                type: userTypes.GET_ADMIN_ID_FAILURE,
                payload: error,
            });

            Object.keys(localStorage).forEach(key => {
                if (key !== 'dark-mode') {
                    localStorage.removeItem(key);
                }
            });
            window.location.href = '/user/login';
        }
    };
};

export const updateData = (id, role, userId, updatedUser) => async (dispatch) => {
    dispatch({ type: userTypes.UPDATE_USER_REQUEST });
    try {
        const token = localStorage.getItem('&l2');
        const response = await apiFetch(`${baseUrl}/kopi/user/edit/data/${id}/${role}/${userId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(updatedUser),
        });
        if (response.status >= 500) {
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
                window.location.href = '/dashboard'
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

export const deleteUser = (id_user, role, id) => async (dispatch) => {
    dispatch({ type: userTypes.DESTROY_ADMIN_ID_REQUEST });
    try {
        const token = localStorage.getItem('&l2');
        const response = await apiFetch(`${baseUrl}/kopi/user/data/${id_user}/${role}/${id}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        if (response.status >= 500) {
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
            dispatch({
                type: userTypes.DESTROY_ADMIN_ID_SUCCESS,
                payload: id,
            });
        }
    } catch (error) {
        dispatch({
            type: userTypes.DESTROY_ADMIN_ID_FAILURE,
            payload: error,
        });
    }
};

export const createTemplat = (id_user, role, templat) => async (dispatch) => {
    dispatch({ type: userTypes.CREATE_TEMPLAT_REQUEST });
    try {
        const token = localStorage.getItem('&l2');
        const response = await apiFetch(`${baseUrl}/kopi/galeri/${id_user}/${role}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(templat),
        });
        if (response.status >= 500) {
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
                title: 'Penambahan berhasil!',
                showConfirmButton: false,
                timer: 2000,
                allowEscapeKey: false,
                allowOutsideClick: false,
                timerProgressBar: true,
            }).then(() => {
                Swal.close();
                window.location = '/dashboard';
            });
            const data = await response.json();
            dispatch({
                type: userTypes.CREATE_TEMPLAT_SUCCESS,
                payload: data.data,
            });
        }
    } catch (error) {
        dispatch({
            type: userTypes.CREATE_TEMPLAT_FAILURE,
            payload: error,
        });
    }
};

export const viewAllTemplate = () => {
    return async (dispatch) => {
        dispatch({ type: userTypes.VIEW_TEMPLAT_REQUEST });
        try {
            const token = localStorage.getItem('&l2');
            const response = await apiFetch(`${baseUrl}/kopi/galeri`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const data = await response.json();
            const dataNumber = data.meta;

            dispatch({
                type: userTypes.VIEW_TEMPLAT_SUCCESS,
                payload: {
                    data: data.data,
                    meta: dataNumber,
                },
            });
        } catch (error) {
            dispatch({
                type: userTypes.VIEW_TEMPLAT_FAILURE,
                payload: error,
            });
        }
    };
};

export const viewAllTemplateId = (id) => {
    return async (dispatch) => {
        dispatch({ type: userTypes.VIEW_TEMPLAT_ID_REQUEST });
        try {
            const token = localStorage.getItem('&l2');
            const response = await apiFetch(`${baseUrl}/kopi/galeri/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const data = await response.json();
            dispatch({
                type: userTypes.VIEW_TEMPLAT_ID_SUCCESS,
                payload: data.data,
            });
            return data;
        } catch (error) {
            dispatch({
                type: userTypes.VIEW_TEMPLAT_ID_FAILURE,
                payload: error,
            });
        }
    };
};

export const updateTemplat = (id_user, role, id, updatedTemplat) => async (dispatch) => {
    dispatch({ type: userTypes.UPDATE_TEMPLAT_REQUEST });
    try {
        const token = localStorage.getItem('&l2');
        const response = await apiFetch(`${baseUrl}/kopi/galeri/edit/${id_user}/${role}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(updatedTemplat),
        });
        const data = await response.json();
        console.log(data);
        if (response.status >= 500) {
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
                text: 'Data templat berhasil diubah',
                showConfirmButton: false,
                timer: 2000,
                allowEscapeKey: false,
                allowOutsideClick: false,
                timerProgressBar: true,
            }).then(() => {
                Swal.close();
                window.location = `/templatedetail/${id}`;
            });
            dispatch({
                type: userTypes.UPDATE_TEMPLAT_SUCCESS,
                payload: data.data,
            });
        }
    } catch (error) {
        dispatch({
            type: userTypes.UPDATE_TEMPLAT_FAILURE,
            payload: error,
        });
    }
};

export const deleteTemplat = (id_user, role, id) => async (dispatch) => {
    dispatch({ type: userTypes.DELETE_TEMPLAT_REQUEST });
    try {
        const token = localStorage.getItem('&l2');
        const response = await apiFetch(`${baseUrl}/kopi/galeri/${id_user}/${role}/${id}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        if (response.status >= 500) {
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
                title: 'Dihapus!',
                text: 'Data templat berhasil dihapus.',
                timer: 2000,
                showConfirmButton: false,
                allowEscapeKey: false,
                allowOutsideClick: false,
                timerProgressBar: true,
            }).then(() => {
                window.location.reload();
            });
            dispatch({
                type: userTypes.DELETE_TEMPLAT_SUCCESS,
                payload: id,
            });
        }
    } catch (error) {
        dispatch({
            type: userTypes.DELETE_TEMPLAT_FAILURE,
            payload: error,
        });
    }
};

//Ranah Umum
export const getUserId = (id, role) => {
    return async (dispatch) => {
        dispatch({ type: userTypes.GET_USER_ID_LIST_REQUEST });
        try {
            const token = localStorage.getItem('&l2');
            const response = await apiFetch(`${baseUrl}/kopi/user/${id}/${role}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                if (response.status >= 400) {
                    Object.keys(localStorage).forEach(key => {
                        if (key !== 'dark-mode') {
                            localStorage.removeItem(key);
                        }
                    });
                    window.location.href = '/user/login';
                    return;
                }
            }

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

            Object.keys(localStorage).forEach(key => {
                if (key !== 'dark-mode') {
                    localStorage.removeItem(key);
                }
            });
            window.location.href = '/user/login';
        }
    };
};

export const updateUser = (id, role, userId, updatedUser) => async (dispatch) => {
    dispatch({ type: userTypes.UPDATE_USER_REQUEST });
    try {
        const token = localStorage.getItem('&l2');
        const response = await apiFetch(`${baseUrl}/kopi/user/${id}/${role}/${userId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(updatedUser),
        });
        if (response.status >= 500) {
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
                window.location.href = '/home'
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

//Pengalaman Kerja
export const createPengalamanKerja = (id, role, pengalaman_kerja) => async (dispatch) => {
    dispatch({ type: userTypes.CREATE_PENGALAMAN_REQUEST });
    try {
        const token = localStorage.getItem('&l2');
        const response = await apiFetch(`${baseUrl}/kopi/pengalamankerja/${id}/${role}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(pengalaman_kerja),
        });
        if (response.status >= 500) {
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

export const readPengalamanKerja = (id_user, role, id) => {
    return async (dispatch) => {
        dispatch({ type: userTypes.GET_PENGALAMAN_ID_REQUEST });
        try {
            const token = localStorage.getItem('&l2');
            const response = await apiFetch(
                `${baseUrl}/kopi/pengalamankerja/${id_user}/${role}/${id}`,
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

export const readPengalamanKerjaId = (id_user, role, id, id_pengalaman_kerja) => {
    return async (dispatch) => {
        dispatch({ type: userTypes.GET_PENGALAMAN_ID_REQUEST });
        try {
            const token = localStorage.getItem('&l2');
            const response = await apiFetch(
                `${baseUrl}/kopi/pengalamankerja/${id_user}/${role}/${id}/${id_pengalaman_kerja}`,
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
    (id_user, role, id, id_pengalaman_kerja, updatedPengalamanKerja) => async (dispatch) => {
        dispatch({ type: userTypes.UPDATE_PENGALAMAN_REQUEST });
        try {
            const token = localStorage.getItem('&l2');
            const response = await apiFetch(
                `${baseUrl}/kopi/pengalamankerja/edit/${id_user}/${role}/${id}/${id_pengalaman_kerja}`,
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify(updatedPengalamanKerja),
                }
            );
            if (response.status >= 500) {
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
                    Swal.close();
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

export const deletePengalamanKerja = (id_user, role, id, idData) => async (dispatch) => {
    dispatch({ type: userTypes.DELETE_PENGALAMAN_REQUEST });
    try {
        const token = localStorage.getItem('&l2');
        await apiFetch(`${baseUrl}/kopi/pengalamankerja/${id_user}/${role}/${id}/${idData}`, {
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
    (id, role, pendidikan_terakhir) => async (dispatch) => {
        dispatch({ type: userTypes.CREATE_PENDIDIKAN_ID_REQUEST });
        try {
            const token = localStorage.getItem('&l2');
            const response = await apiFetch(`${baseUrl}/kopi/pendidikanterakhir/${id}/${role}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(pendidikan_terakhir),
            });
            if (response.status >= 500) {
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
                    Swal.close();
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

export const readPendidikanTerakhir = (id_user, role, id) => {
    return async (dispatch) => {
        dispatch({ type: userTypes.GET_PENDIDIKAN_ID_REQUEST });
        try {
            const token = localStorage.getItem('&l2');
            const response = await apiFetch(
                `${baseUrl}/kopi/pendidikanterakhir/${id_user}/${role}/${id}`,
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

export const readPendidikanTerakhirId = (id_user, role, id, idPendidikanTerakhir) => {
    return async (dispatch) => {
        dispatch({ type: userTypes.GET_PENDIDIKAN_ID_REQUEST });
        try {
            const token = localStorage.getItem('&l2');
            const response = await apiFetch(
                `${baseUrl}/kopi/pendidikanterakhir/${id_user}/${role}/${id}/${idPendidikanTerakhir}`,
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
    (id_user, role, id, idPendidikanTerakhir, updatedPendidikanTerakhir) => async (dispatch) => {
        dispatch({ type: userTypes.UPDATE_PENDIDIKAN_ID_REQUEST });
        try {
            const token = localStorage.getItem('&l2');
            const response = await apiFetch(
                `${baseUrl}/kopi/pendidikanterakhir/edit/${id_user}/${role}/${id}/${idPendidikanTerakhir}`,
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify(updatedPendidikanTerakhir),
                }
            );
            if (response.status >= 500) {
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
                    Swal.close();
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

export const deletePendidikanTerakhir = (id_user, role, id, idData) => async (dispatch) => {
    dispatch({ type: userTypes.DELETE_PENDIDIKAN_ID_REQUEST });
    try {
        const token = localStorage.getItem('&l2');
        await apiFetch(`${baseUrl}/kopi/pendidikanterakhir/${id_user}/${role}/${id}/${idData}`, {
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
export const createKeahlian = (id, role, keahlian) => async (dispatch) => {
    dispatch({ type: userTypes.CREATE_KEAHLIAN_ID_REQUEST });
    try {
        const token = localStorage.getItem('&l2');
        const response = await apiFetch(`${baseUrl}/kopi/keahlian/${id}/${role}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(keahlian),
        });
        if (response.status >= 500) {
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
                Swal.close();
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

export const readKeahlian = (id_user, role, id) => {
    return async (dispatch) => {
        dispatch({ type: userTypes.GET_KEAHLIAN_ID_REQUEST });
        try {
            const token = localStorage.getItem('&l2');
            const response = await apiFetch(`${baseUrl}/kopi/keahlian/${id_user}/${role}/${id}`, {
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

export const readKeahlianId = (id_user, role, id, idKeahlian) => {
    return async (dispatch) => {
        dispatch({ type: userTypes.GET_KEAHLIAN_ID_REQUEST });
        try {
            const token = localStorage.getItem('&l2');
            const response = await apiFetch(`${baseUrl}/kopi/keahlian/${id_user}/${role}/${id}/${idKeahlian}`, {
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

export const updateKeahlian = (id_user, role, id, idKeahlian, keahlianUserUpdate) => async (dispatch) => {
    dispatch({ type: userTypes.UPDATE_KEAHLIAN_ID_REQUEST });
    try {
        const token = localStorage.getItem('&l2');
        const response = await apiFetch(
            `${baseUrl}/kopi/keahlian/edit/${id_user}/${role}/${id}/${idKeahlian}`,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(keahlianUserUpdate),
            }
        );
        if (response.status >= 500) {
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

export const deleteKeahlian = (id_user, role, id, idData) => async (dispatch) => {
    dispatch({ type: userTypes.DELETE_KEAHLIAN_ID_REQUEST });
    try {
        const token = localStorage.getItem('&l2');
        await apiFetch(`${baseUrl}/kopi/keahlian/${id_user}/${role}/${id}/${idData}`,
            {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
        dispatch({
            type: userTypes.DELETE_KEAHLIAN_ID_SUCCESS,
            payload: id,
        });
    } catch (error) {
        dispatch({
            type: userTypes.DELETE_KEAHLIAN_ID_FAILURE,
            payload: error,
        });
    }
};

//Prestasi Kerja /:id_user/:role/:id_pengalaman_kerja
export const createPrestasi = (id_user, role, id_pengalaman_kerja, prestasi) => async (dispatch) => {
    dispatch({ type: userTypes.CREATE_PRESTASI_ID_REQUEST });
    try {
        const token = localStorage.getItem('&l2');
        const response = await apiFetch(`${baseUrl}/kopi/prestasikerja/${id_user}/${role}/${id_pengalaman_kerja}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(prestasi),
        });
        if (response.status >= 500) {
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

export const readPrestasi = (id_user, role, id_pengalaman_kerja) => {
    return async (dispatch) => {
        dispatch({ type: userTypes.GET_PRESTASI_REQUEST });
        try {
            const token = localStorage.getItem('&l2');
            const response = await apiFetch(`${baseUrl}/kopi/prestasikerja/${id_user}/${role}/${id_pengalaman_kerja}`, {
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

export const readPrestasiId = (id_user, role, id_pengalaman_kerja, id_prestasi_kerja) => {
    return async (dispatch) => {
        dispatch({ type: userTypes.GET_PRESTASI_REQUEST });
        try {
            const token = localStorage.getItem('&l2');
            const response = await apiFetch(`${baseUrl}/kopi/prestasikerja/${id_user}/${role}/${id_pengalaman_kerja}/${id_prestasi_kerja}`, {
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
//edit/:id_user/:role/:id_pengalaman_kerja/:id_prestasi_kerja

export const updatePrestasi =
    (id_user, role, id_pengalaman_kerja, id_prestasi_kerja, updatedPrestasi) => async (dispatch) => {
        dispatch({ type: userTypes.UPDATE_PRESTASI_ID_REQUEST });
        try {
            const token = localStorage.getItem('&l2');
            const response = await apiFetch(
                `${baseUrl}/kopi/prestasikerja/edit/${id_user}/${role}/${id_pengalaman_kerja}/${id_prestasi_kerja}`,
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify(updatedPrestasi),
                }
            );
            if (response.status >= 500) {
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

export const deletePrestasi = (id_user, role, id_pengalaman_kerja, id_prestasi_kerja) => async (dispatch) => {
    dispatch({ type: userTypes.DELETE_PRESTASI_ID_REQUEST });
    try {
        const token = localStorage.getItem('&l2');
        const response = await apiFetch(
            `${baseUrl}/kopi/prestasikerja/${id_user}/${role}/${id_pengalaman_kerja}/${id_prestasi_kerja}`,
            {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        if (response.status >= 500) {
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
export const createPelatihan = (id, role, pelatihan) => async (dispatch) => {
    dispatch({ type: userTypes.CREATE_PELATIHAN_ID_REQUEST });
    try {
        const token = localStorage.getItem('&l2');
        const response = await apiFetch(`${baseUrl}/kopi/pelatihan/${id}/${role}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(pelatihan),
        });
        if (response.status >= 500) {
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

export const readPelatihan = (id_user, role, id) => {
    return async (dispatch) => {
        dispatch({ type: userTypes.GET_PELATIHAN_ID_REQUEST });
        try {
            const token = localStorage.getItem('&l2');
            const response = await apiFetch(`${baseUrl}/kopi/pelatihan/${id_user}/${role}/${id}`, {
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

export const readPelatihanId = (id_user, role, id, idPelatihan) => {
    return async (dispatch) => {
        dispatch({ type: userTypes.GET_PELATIHAN_ID_REQUEST });
        try {
            const token = localStorage.getItem('&l2');
            const response = await apiFetch(`${baseUrl}/kopi/pelatihan/${id_user}/${role}/${id}/${idPelatihan}`, {
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

export const updatePelatihan = (id_user, role, id, idPelatihan, updatedPelatihan) => async (dispatch) => {
    dispatch({ type: userTypes.UPDATE_PELATIHAN_ID_REQUEST });
    try {
        const token = localStorage.getItem('&l2');
        const response = await apiFetch(
            `${baseUrl}/kopi/pelatihan/edit/${id_user}/${role}/${id}/${idPelatihan}`,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(updatedPelatihan),
            }
        );
        if (response.status >= 500) {
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

export const deletePelatihan = (id_user, role, id, idData) => async (dispatch) => {
    dispatch({ type: userTypes.DELETE_PELATIHAN_ID_REQUEST });
    try {
        const token = localStorage.getItem('&l2');
        const response = await apiFetch(
            `${baseUrl}/kopi/pelatihan/${id_user}/${role}/${id}/${idData}`,
            {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        if (response.status >= 500) {
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
