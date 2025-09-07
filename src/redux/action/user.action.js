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
            Swal.fire({
                icon: 'error',
                title: 'Ups...',
                text: 'Terjadi kesalahan. Coba lagi',
                timer: 2000
            }).then(() => {
                Swal.close();
            });
            throw error;
        }
        const publicUrlResponse = supabase.storage
            .from(`${supabaseFolder}`)
            .getPublicUrl(data.path);

        return publicUrlResponse.data.publicUrl;
    } catch (error) {
        Swal.fire({
            icon: 'error',
            title: 'Ups...',
            text: 'Gagal upload file. Coba lagi',
            timer: 2000
        }).then(() => {
            Swal.close();
        });
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
        const data = await response.json().catch(() => null);
        if (data) {
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

        const data = await response.json().catch(() => null);
        if (data) {
            localStorage.setItem('/v%', data.id);
            localStorage.setItem('$f*', data.role);
            localStorage.setItem('&l2', data.token);
            dispatch({
                type: userTypes.LOGIN_SUCCESS,
                payload: data.data,
            });
        } else {
            dispatch({
                type: userTypes.LOGIN_FAILURE,
                payload: 'Token missing',
            });
            return;
        }
    } catch (error) {
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
            const data = await result.json();
            if (data) {
                localStorage.setItem('/v%', data.id);
                localStorage.setItem('$f*', data.role);
                localStorage.setItem('&l2', data.token);
                window.location = '/';
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
        const data = await response.json().catch(() => null);
        if (data) {
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

export const resetPassword = (newData) => async (dispatch) => {
    dispatch({ type: userTypes.CREATE_RESET_PASSWORD_REQUEST });
    try {
        const response = await apiFetch(`${baseUrl}/kopi/auth/passwordreset`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newData),
        });
        const data = await response.json().catch(() => null);
        if (data) {
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
        const data = await response.json().catch(() => null);
        if (data) {
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
            const data = await response.json().catch(() => null);
            const dataNumber = data.meta;
            if (data && dataNumber) {
                dispatch({
                    type: userTypes.GET_ADMIN_SUCCESS,
                    payload: {
                        data: data.data,
                        meta: dataNumber,
                    },
                });
            }
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
            const data = await response.json().catch(() => null);
            if (data) {
                dispatch({
                    type: userTypes.GET_ADMIN_ID_SUCCESS,
                    payload: data.data,
                });
            }
        } catch (error) {
            dispatch({
                type: userTypes.GET_ADMIN_ID_FAILURE,
                payload: error,
            });
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
        const data = await response.json().catch(() => null);
        if (data) {
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
        dispatch({
            type: userTypes.DESTROY_ADMIN_ID_SUCCESS,
            payload: 'Data pengguna berhasil dihapus',
        });
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
        const data = await response.json().catch(() => null);
        if (data) {
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
            const data = await response.json().catch(() => null);
            const dataNumber = data.meta;

            if (data && dataNumber) {
                dispatch({
                    type: userTypes.VIEW_TEMPLAT_SUCCESS,
                    payload: {
                        data: data.data,
                        meta: dataNumber,
                    },
                });
            }
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
            const data = await response.json().catch(() => null);
            if (data) {
                dispatch({
                    type: userTypes.VIEW_TEMPLAT_ID_SUCCESS,
                    payload: data.data,
                });
            }
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
        const data = await response.json().catch(() => null);
        if (data) {
            setTimeout(() => {
                window.location = `/templatedetail/${id}`;
            }, 2000);
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
        dispatch({
            type: userTypes.DELETE_TEMPLAT_SUCCESS,
            payload: 'Data template berhasil dihapus',
        });
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

            const data = await response.json().catch(() => null);
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

export const updateUser = (id, role, updatedUser) => async (dispatch) => {
    dispatch({ type: userTypes.UPDATE_USER_REQUEST });
    try {
        const token = localStorage.getItem('&l2');
        const response = await apiFetch(`${baseUrl}/kopi/user/${id}/${role}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(updatedUser),
        });
        const data = await response.json().catch(() => null);
        if (data) {
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
        const data = await response.json().catch(() => null);
        if (data) {
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

export const readPengalamanKerja = (id_user, role) => {
    return async (dispatch) => {
        dispatch({ type: userTypes.GET_PENGALAMAN_ID_REQUEST });
        try {
            const token = localStorage.getItem('&l2');
            const response = await apiFetch(
                `${baseUrl}/kopi/pengalamankerja/${id_user}/${role}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            const data = await response.json().catch(() => null);
            if (data) {
                dispatch({
                    type: userTypes.GET_PENGALAMAN_ID_SUCCESS,
                    payload: data.data,
                });
            }
        } catch (error) {
            dispatch({
                type: userTypes.GET_PENGALAMAN_ID_FAILURE,
                payload: error,
            });
        }
    };
};

export const readPengalamanKerjaId = (id_user, role, id_pengalaman_kerja) => {
    return async (dispatch) => {
        dispatch({ type: userTypes.GET_PENGALAMAN_ID_REQUEST });
        try {
            const token = localStorage.getItem('&l2');
            const response = await apiFetch(
                `${baseUrl}/kopi/pengalamankerja/${id_user}/${role}/${id_pengalaman_kerja}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            const data = await response.json().catch(() => null);
            dispatch({
                type: userTypes.GET_PENGALAMAN_ID_SUCCESS,
                payload: data.data,
            });
        } catch (error) {
            dispatch({
                type: userTypes.GET_PENGALAMAN_ID_FAILURE,
                payload: error,
            });
        }
    };
};

export const updatePengalamanKerja =
    (id_user, role, id_pengalaman_kerja, updatedPengalamanKerja) => async (dispatch) => {
        dispatch({ type: userTypes.UPDATE_PENGALAMAN_REQUEST });
        try {
            const token = localStorage.getItem('&l2');
            const response = await apiFetch(
                `${baseUrl}/kopi/pengalamankerja/edit/${id_user}/${role}/${id_pengalaman_kerja}`,
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify(updatedPengalamanKerja),
                }
            );
            const data = await response.json().catch(() => null);
            dispatch({
                type: userTypes.UPDATE_PENGALAMAN_SUCCESS,
                payload: data.data,
            });
        } catch (error) {
            dispatch({
                type: userTypes.UPDATE_PENGALAMAN_FAILURE,
                payload: error,
            });
        }
    };

export const deletePengalamanKerja = (id_user, role, idData) => async (dispatch) => {
    dispatch({ type: userTypes.DELETE_PENGALAMAN_REQUEST });
    try {
        const token = localStorage.getItem('&l2');
        await apiFetch(`${baseUrl}/kopi/pengalamankerja/${id_user}/${role}/${idData}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        dispatch({
            type: userTypes.DELETE_PENGALAMAN_SUCCESS,
            payload: 'Pengalaman kerja berhasil dihapus',
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
            const data = await response.json().catch(() => null);
            if (data) {
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

export const readPendidikanTerakhir = (id_user, role) => {
    return async (dispatch) => {
        dispatch({ type: userTypes.GET_PENDIDIKAN_ID_REQUEST });
        try {
            const token = localStorage.getItem('&l2');
            const response = await apiFetch(
                `${baseUrl}/kopi/pendidikanterakhir/${id_user}/${role}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            const data = await response.json().catch(() => null);
            if (data) {
                dispatch({
                    type: userTypes.GET_PENDIDIKAN_ID_SUCCESS,
                    payload: data.data,
                });
            }
        } catch (error) {
            dispatch({
                type: userTypes.GET_PENDIDIKAN_ID_FAILURE,
                payload: error,
            });
        }
    };
};

export const readPendidikanTerakhirId = (id_user, role, idPendidikanTerakhir) => {
    return async (dispatch) => {
        dispatch({ type: userTypes.GET_PENDIDIKAN_ID_REQUEST });
        try {
            const token = localStorage.getItem('&l2');
            const response = await apiFetch(
                `${baseUrl}/kopi/pendidikanterakhir/${id_user}/${role}/${idPendidikanTerakhir}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            const data = await response.json().catch(() => null);
            if (data) {
                dispatch({
                    type: userTypes.GET_PENDIDIKAN_ID_SUCCESS,
                    payload: data.data,
                });
            }
        } catch (error) {
            dispatch({
                type: userTypes.GET_PENDIDIKAN_ID_FAILURE,
                payload: error,
            });
        }
    };
};

export const updatePendidikanTerakhir =
    (id_user, role, idPendidikanTerakhir, updatedPendidikanTerakhir) => async (dispatch) => {
        dispatch({ type: userTypes.UPDATE_PENDIDIKAN_ID_REQUEST });
        try {
            const token = localStorage.getItem('&l2');
            const response = await apiFetch(
                `${baseUrl}/kopi/pendidikanterakhir/edit/${id_user}/${role}/${idPendidikanTerakhir}`,
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify(updatedPendidikanTerakhir),
                }
            );
            const data = await response.json().catch(() => null);
            if (data) {
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

export const deletePendidikanTerakhir = (id_user, role, idData) => async (dispatch) => {
    dispatch({ type: userTypes.DELETE_PENDIDIKAN_ID_REQUEST });
    try {
        const token = localStorage.getItem('&l2');
        await apiFetch(`${baseUrl}/kopi/pendidikanterakhir/${id_user}/${role}/${idData}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        dispatch({
            type: userTypes.DELETE_PENDIDIKAN_ID_SUCCESS,
            payload: "Pendidikan terakhir berhasil dihapus",
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
        const data = await response.json().catch(() => null);
        if (data) {
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

export const readKeahlian = (id_user, role) => {
    return async (dispatch) => {
        dispatch({ type: userTypes.GET_KEAHLIAN_ID_REQUEST });
        try {
            const token = localStorage.getItem('&l2');
            const response = await apiFetch(`${baseUrl}/kopi/keahlian/${id_user}/${role}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const data = await response.json().catch(() => null);
            if (data) {
                dispatch({
                    type: userTypes.GET_KEAHLIAN_ID_SUCCESS,
                    payload: data.data,
                });
            }
            return data;
        } catch (error) {
            dispatch({
                type: userTypes.GET_KEAHLIAN_ID_FAILURE,
                payload: error,
            });
        }
    };
};

export const readKeahlianId = (id_user, role, idKeahlian) => {
    return async (dispatch) => {
        dispatch({ type: userTypes.GET_KEAHLIAN_ID_REQUEST });
        try {
            const token = localStorage.getItem('&l2');
            const response = await apiFetch(`${baseUrl}/kopi/keahlian/${id_user}/${role}/${idKeahlian}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const data = await response.json().catch(() => null);
            if (data) {
                dispatch({
                    type: userTypes.GET_KEAHLIAN_ID_SUCCESS,
                    payload: data.data,
                });
            }
        } catch (error) {
            dispatch({
                type: userTypes.GET_KEAHLIAN_ID_FAILURE,
                payload: error,
            });
        }
    };
};

export const updateKeahlian = (id_user, role, idKeahlian, keahlianUserUpdate) => async (dispatch) => {
    dispatch({ type: userTypes.UPDATE_KEAHLIAN_ID_REQUEST });
    try {
        const token = localStorage.getItem('&l2');
        const response = await apiFetch(
            `${baseUrl}/kopi/keahlian/edit/${id_user}/${role}/${idKeahlian}`,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(keahlianUserUpdate),
            }
        );
        const data = await response.json().catch(() => null);
        if (data) {
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

export const deleteKeahlian = (id_user, role, idData) => async (dispatch) => {
    dispatch({ type: userTypes.DELETE_KEAHLIAN_ID_REQUEST });
    try {
        const token = localStorage.getItem('&l2');
        await apiFetch(`${baseUrl}/kopi/keahlian/${id_user}/${role}/${idData}`,
            {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
        dispatch({
            type: userTypes.DELETE_KEAHLIAN_ID_SUCCESS,
            payload: "Keahlian berhasil dihapus",
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
        const data = await response.json().catch(() => null);
        if (data) {
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

export const readPrestasi = (id_user, role, idPengalamanKerja) => {
    return async (dispatch) => {
        dispatch({ type: userTypes.GET_PRESTASI_REQUEST });
        try {
            const token = localStorage.getItem('&l2');
            const response = await apiFetch(`${baseUrl}/kopi/prestasikerja/${id_user}/${role}/${idPengalamanKerja}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const data = await response.json().catch(() => null);
            if (data) {
                dispatch({
                    type: userTypes.GET_PRESTASI_SUCCESS,
                    payload: data.data,
                });
            }
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

            const data = await response.json().catch(() => null);
            if (data) {
                dispatch({
                    type: userTypes.GET_PRESTASI_SUCCESS,
                    payload: data.data,
                });
            }
        } catch (error) {
            dispatch({
                type: userTypes.GET_PRESTASI_FAILURE,
                payload: error,
            });
        }
    };
};

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
            const data = await response.json().catch(() => null);
            if (data) {
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
        dispatch({
            type: userTypes.DELETE_PRESTASI_ID_SUCCESS,
            payload: "Prestasi berhasil dihapus",
        });
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
        const data = await response.json().catch(() => null);
        if (data) {
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

export const readPelatihan = (id_user, role) => {
    return async (dispatch) => {
        dispatch({ type: userTypes.GET_PELATIHAN_ID_REQUEST });
        try {
            const token = localStorage.getItem('&l2');
            const response = await apiFetch(`${baseUrl}/kopi/pelatihan/${id_user}/${role}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const data = await response.json().catch(() => null);
            if (data) {
                dispatch({
                    type: userTypes.GET_PELATIHAN_ID_SUCCESS,
                    payload: data.data,
                });
            }
        } catch (error) {
            dispatch({
                type: userTypes.GET_PELATIHAN_ID_FAILURE,
                payload: error,
            });
        }
    };
};

export const readPelatihanId = (id_user, role, idPelatihan) => {
    return async (dispatch) => {
        dispatch({ type: userTypes.GET_PELATIHAN_ID_REQUEST });
        try {
            const token = localStorage.getItem('&l2');
            const response = await apiFetch(`${baseUrl}/kopi/pelatihan/${id_user}/${role}/${idPelatihan}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const data = await response.json().catch(() => null);
            if (data) {
                dispatch({
                    type: userTypes.GET_PELATIHAN_ID_SUCCESS,
                    payload: data.data,
                });
            }
        } catch (error) {
            dispatch({
                type: userTypes.GET_PELATIHAN_ID_FAILURE,
                payload: error,
            });
        }
    };
};

export const updatePelatihan = (id_user, role, idPelatihan, updatedPelatihan) => async (dispatch) => {
    dispatch({ type: userTypes.UPDATE_PELATIHAN_ID_REQUEST });
    try {
        const token = localStorage.getItem('&l2');
        const response = await apiFetch(
            `${baseUrl}/kopi/pelatihan/edit/${id_user}/${role}/${idPelatihan}`,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(updatedPelatihan),
            }
        );
        const data = await response.json().catch(() => null);
        if (data) {
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

export const deletePelatihan = (id_user, role, idData) => async (dispatch) => {
    dispatch({ type: userTypes.DELETE_PELATIHAN_ID_REQUEST });
    try {
        const token = localStorage.getItem('&l2');
        const response = await apiFetch(
            `${baseUrl}/kopi/pelatihan/${id_user}/${role}/${idData}`,
            {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        dispatch({
            type: userTypes.DELETE_PELATIHAN_ID_SUCCESS,
            payload: id,
        });
    } catch (error) {
        dispatch({
            type: userTypes.DELETE_PELATIHAN_ID_FAILURE,
            payload: error,
        });
    }
};

//Pelatihan
export const readPortofolio = (id_user, role) => {
    return async (dispatch) => {
        dispatch({ type: userTypes.GET_PORTOFOLIO_ID_REQUEST });
        try {
            const token = localStorage.getItem('&l2');
            const response = await apiFetch(`${baseUrl}/kopi/portofolio/${id_user}/${role}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const data = await response.json().catch(() => null);
            if (data) {
                dispatch({
                    type: userTypes.GET_PORTOFOLIO_ID_SUCCESS,
                    payload: data.data,
                });
            }
        } catch (error) {
            dispatch({
                type: userTypes.GET_PORTOFOLIO_ID_FAILURE,
                payload: error,
            });
        }
    };
};

export const readPortofolioId = (id_user, role, idPortofolio) => {
    return async (dispatch) => {
        dispatch({ type: userTypes.GET_PORTOFOLIO_ID_REQUEST });
        try {
            const token = localStorage.getItem('&l2');
            const response = await apiFetch(`${baseUrl}/kopi/portofolio/${id_user}/${role}/${idPortofolio}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const data = await response.json().catch(() => null);
            if (data) {
                dispatch({
                    type: userTypes.GET_PORTOFOLIO_ID_SUCCESS,
                    payload: data.data,
                });
            }
        } catch (error) {
            dispatch({
                type: userTypes.GET_PORTOFOLIO_ID_FAILURE,
                payload: error,
            });
        }
    };
};

export const createPortofolio = (id, role, portofolio) => async (dispatch) => {
    dispatch({ type: userTypes.CREATE_PORTOFOLIO_REQUEST });
    try {
        const token = localStorage.getItem('&l2');
        const response = await apiFetch(`${baseUrl}/kopi/portofolio/${id}/${role}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(portofolio),
        });
        const data = await response.json().catch(() => null);
        if (data) {
            dispatch({
                type: userTypes.CREATE_PORTOFOLIO_SUCCESS,
                payload: data.data,
            });
        }
    } catch (error) {
        dispatch({
            type: userTypes.CREATE_PORTOFOLIO_FAILURE,
            payload: error,
        });
    }
};

export const updatePortofolio = (id_user, role, idPortofolio, updatedPortofolio) => async (dispatch) => {
    dispatch({ type: userTypes.UPDATE_PORTOFOLIO_ID_REQUEST });
    try {
        const token = localStorage.getItem('&l2');
        const response = await apiFetch(
            `${baseUrl}/kopi/portofolio/edit/${id_user}/${role}/${idPortofolio}`,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(updatedPortofolio),
            }
        );
        const data = await response.json().catch(() => null);
        if (data) {
            dispatch({
                type: userTypes.UPDATE_PORTOFOLIO_ID_SUCCESS,
                payload: data.data,
            });
        }
    } catch (error) {
        dispatch({
            type: userTypes.UPDATE_PORTOFOLIO_ID_FAILURE,
            payload: error,
        });
    }
};

export const deletePortofolio = (id_user, role, idData) => async (dispatch) => {
    dispatch({ type: userTypes.DELETE_PORTOFOLIO_ID_REQUEST });
    try {
        const token = localStorage.getItem('&l2');
        const response = await apiFetch(
            `${baseUrl}/kopi/portofolio/${id_user}/${role}/${idData}`,
            {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        dispatch({
            type: userTypes.DELETE_PORTOFOLIO_ID_SUCCESS,
            payload: id,
        });
    } catch (error) {
        dispatch({
            type: userTypes.DELETE_PORTOFOLIO_ID_FAILURE,
            payload: error,
        });
    }
};
