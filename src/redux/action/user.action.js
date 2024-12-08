import Swal from "sweetalert2";
import { userTypes } from "../actionTypes";
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
            .from("final_project")
            .upload(newFileName, file, {
                contentType: file.type,
                upsert: false,
            });

        if (error) {
            console.error("Error uploading file:", error);
            throw error;
        }

        const publicUrlResponse = supabase.storage
            .from("final_project")
            .getPublicUrl(data.path);

        return publicUrlResponse.data.publicUrl;
    } catch (error) {
        console.error("Error uploading file to Supabase Storage:", error);
        throw error;
    }
};

// User (Include Admin)
export const createUser = (user) => async (dispatch) => {
    dispatch({ type: userTypes.CREATE_USER_REQUEST });
    try {
        const response = await fetch(`${baseUrl}/user/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
        });
        const data = await response.json();
        dispatch({ type: userTypes.CREATE_USER_SUCCESS, payload: data.data });
    } catch (error) {
        dispatch({ type: userTypes.CREATE_USER_FAILURE, payload: error });
    }
};

export const createUserSelf = (user) => async (dispatch) => {
    dispatch({ type: userTypes.CREATE_USER_REQUEST });
    try {
        const response = await fetch(`${baseUrl}/user/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
        });
        const data = await response.json();
        dispatch({ type: userTypes.CREATE_USER_SUCCESS, payload: data.data });
    } catch (error) {
        dispatch({ type: userTypes.CREATE_USER_FAILURE, payload: error });
    }
};

export const postUserLogin = (user) => async (dispatch) => {
    dispatch({ type: userTypes.CREATE_USER_REQUEST });
    try {
        const response = await fetch(`${baseUrl}/user/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
        });

        const data = await response.json();
        const idUser = data.id;
        const token = data.token;
        const roleUser = data.role;
        if (!idUser && !token && !roleUser) {
            Swal.fire({
                icon: "error",
                title: "Oopss...",
                text: "Akun tidak ditemukan. Atau password salah",
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
                icon: "success",
                title: "Selamat",
                text: "Akun berhasil masuk",
                showConfirmButton: false,
                timer: 3000,
                allowEscapeKey: false,
                allowOutsideClick: false,
                timerProgressBar: true,
            }).then(() => {
                localStorage.setItem("id", idUser);
                localStorage.setItem("role", roleUser);
                localStorage.setItem("token", token);
                Swal.close();
                window.location = '/';
            });
        }
        dispatch({ type: userTypes.CREATE_USER_SUCCESS, payload: data.data });
    } catch (error) {
        console.error("Error during login:", error);
        dispatch({ type: userTypes.CREATE_USER_FAILURE, payload: error });
    }
};

export const getUser = () => {
    return async (dispatch) => {
        dispatch({ type: userTypes.GET_USER_LIST_REQUEST });
        try {
            const token = localStorage.getItem("token");
            const response = await fetch(`${baseUrl}/user`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const data = await response.json();
            const dataNumber = data.meta;

            dispatch({
                type: userTypes.GET_USER_LIST_SUCCESS,
                payload: ({
                    data: data.data,
                    meta: dataNumber,
                }),
            });
        } catch (error) {
            dispatch({ type: userTypes.GET_USER_LIST_FAILURE, payload: error });
        }
    };
};

export const getUserId = (id) => {
    return async (dispatch) => {
        dispatch({ type: userTypes.GET_USER_ID_LIST_REQUEST });
        try {
            const token = localStorage.getItem("token");
            const response = await fetch(`${baseUrl}/user/${id}`, {
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
            dispatch({ type: userTypes.GET_USER_ID_LIST_FAILURE, payload: error });
        }
    };
};

export const updateUser = (id, updatedUser) => async (dispatch) => {
    dispatch({ type: userTypes.UPDATE_USER_REQUEST });
    try {
        const token = localStorage.getItem("token");
        const response = await fetch(`${baseUrl}/user/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(updatedUser),
        });

        const data = await response.json();
        dispatch({ type: userTypes.UPDATE_USER_SUCCESS, payload: data.data });
    } catch (error) {
        dispatch({ type: userTypes.UPDATE_USER_FAILURE, payload: error });
    }
};

export const deleteUser = (id) => async (dispatch) => {
    dispatch({ type: userTypes.DELETE_USER_REQUEST });
    try {
        const token = localStorage.getItem("token");
        await fetch(`${baseUrl}/user/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        dispatch({ type: userTypes.DELETE_USER_SUCCESS, payload: id });
    } catch (error) {
        dispatch({ type: userTypes.DELETE_USER_FAILURE, payload: error });
    }
};


//Pengalaman Kerja
export const createPengalamanKerja = (pengalaman_kerja) => async (dispatch) => {
    dispatch({ type: userTypes.CREATE_PENGALAMAN_REQUEST });
    try {
        const response = await fetch(`${baseUrl}/pengalamankerja`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(pengalaman_kerja),
        });
        const data = await response.json();
        dispatch({ type: userTypes.CREATE_PENGALAMAN_SUCCESS, payload: data.data });
    } catch (error) {
        dispatch({ type: userTypes.CREATE_PENGALAMAN_FAILURE, payload: error });
    }
};

export const readPengalamanKerja = (id) => {
    return async (dispatch) => {
        dispatch({ type: userTypes.GET_PENGALAMAN_ID_REQUEST });
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${baseUrl}/pengalamankerja/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const data = await response.json();
            dispatch({
                type: userTypes.GET_PENGALAMAN_ID_SUCCESS,
                payload: data.data,
            });
            return data;
        } catch (error) {
            dispatch({ type: userTypes.GET_PENGALAMAN_ID_FAILURE, payload: error });
        }
    };
};

export const updatePengalamanKerja = (id, updatedPengalamanKerja) => async (dispatch) => {
    dispatch({ type: userTypes.UPDATE_PENGALAMAN_REQUEST });
    try {
        const token = localStorage.getItem("token");
        const id_user = localStorage.getItem("id");
        const response = await fetch(`${baseUrl}/pengalamankerja/${id_user}/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(updatedPengalamanKerja),
        });
        const data = await response.json();
        dispatch({ type: userTypes.UPDATE_PENGALAMAN_SUCCESS, payload: data.data });
    } catch (error) {
        dispatch({ type: userTypes.UPDATE_PENGALAMAN_FAILURE, payload: error });
    }
};

export const deletePengalamanKerja = (id) => async (dispatch) => {
    dispatch({ type: userTypes.DELETE_PENGALAMAN_REQUEST });
    try {
        const token = localStorage.getItem("token");
        const id_user = localStorage.getItem("id");
        await fetch(`${baseUrl}/pengalamankerja/${id_user}/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        dispatch({ type: userTypes.DELETE_PENGALAMAN_SUCCESS, payload: id });
    } catch (error) {
        dispatch({ type: userTypes.DELETE_PENGALAMAN_FAILURE, payload: error });
    }
};


//Pendidikan Terakhir
export const createPendidikanTerakhir = (pendidikan_terakhir) => async (dispatch) => {
    dispatch({ type: userTypes.CREATE_PENDIDIKAN_ID_REQUEST });
    try {
        const response = await fetch(`${baseUrl}/pendidikanterakhir`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(pendidikan_terakhir),
        });
        const data = await response.json();
        dispatch({ type: userTypes.CREATE_PENDIDIKAN_ID_SUCCESS, payload: data.data });
    } catch (error) {
        dispatch({ type: userTypes.CREATE_PENDIDIKAN_ID_FAILURE, payload: error });
    }
};

export const readPendidikanTerakhir = (id) => {
    return async (dispatch) => {
        dispatch({ type: userTypes.GET_PENDIDIKAN_ID_REQUEST });
        try {
            const token = localStorage.getItem("token");
            const response = await fetch(`${baseUrl}/pendidikanterakhir/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const data = await response.json();

            dispatch({
                type: userTypes.GET_PENDIDIKAN_ID_SUCCESS,
                payload: data.data,
            });
            return data;
        } catch (error) {
            dispatch({ type: userTypes.GET_PENDIDIKAN_ID_FAILURE, payload: error });
        }
    };
};

export const updatePendidikanTerakhir = (id, updatedPendidikanTerakhir) => async (dispatch) => {
    dispatch({ type: userTypes.UPDATE_PENDIDIKAN_ID_REQUEST });
    try {
        const token = localStorage.getItem("token");
        const id_user = localStorage.getItem("id");
        const response = await fetch(`${baseUrl}/pendidikanterakhir/${id_user}/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(updatedPendidikanTerakhir),
        });

        const data = await response.json();
        dispatch({ type: userTypes.UPDATE_PENDIDIKAN_ID_SUCCESS, payload: data.data });
    } catch (error) {
        dispatch({ type: userTypes.UPDATE_PENDIDIKAN_ID_FAILURE, payload: error });
    }
};

export const deletePendidikanTerakhir = (id) => async (dispatch) => {
    dispatch({ type: userTypes.DELETE_PENDIDIKAN_ID_REQUEST });
    try {
        const token = localStorage.getItem("token");
        const id_user = localStorage.getItem("id");
        await fetch(`${baseUrl}/pendidikanterakhir/${id_user}/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        dispatch({ type: userTypes.DELETE_PENDIDIKAN_ID_SUCCESS, payload: id });
    } catch (error) {
        dispatch({ type: userTypes.DELETE_PENDIDIKAN_ID_FAILURE, payload: error });
    }
};


//Keahlian
export const createKeahlian = (keahlian) => async (dispatch) => {
    dispatch({ type: userTypes.CREATE_KEAHLIAN_ID_REQUEST });
    try {
        const response = await fetch(`${baseUrl}/keahlian`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(keahlian),
        });
        const data = await response.json();
        dispatch({ type: userTypes.CREATE_KEAHLIAN_ID_SUCCESS, payload: data.data });
    } catch (error) {
        dispatch({ type: userTypes.CREATE_KEAHLIAN_ID_FAILURE, payload: error });
    }
};

export const readKeahlian = (id) => {
    return async (dispatch) => {
        dispatch({ type: userTypes.GET_KEAHLIAN_ID_REQUEST });
        try {
            const token = localStorage.getItem("token");
            const response = await fetch(`${baseUrl}/keahlian/${id}`, {
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
            dispatch({ type: userTypes.GET_KEAHLIAN_ID_FAILURE, payload: error });
        }
    };
};

export const updateKeahlian = (id, updatedKeahlian) => async (dispatch) => {
    dispatch({ type: userTypes.UPDATE_KEAHLIAN_ID_REQUEST });
    try {
        const token = localStorage.getItem("token");
        const id_user = localStorage.getItem("id");
        const response = await fetch(`${baseUrl}/keahlian/${id_user}/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(updatedKeahlian),
        });

        const data = await response.json();
        dispatch({ type: userTypes.UPDATE_KEAHLIAN_ID_SUCCESS, payload: data.data });
    } catch (error) {
        dispatch({ type: userTypes.UPDATE_KEAHLIAN_ID_FAILURE, payload: error });
    }
};

export const deleteKeahlian = (id) => async (dispatch) => {
    dispatch({ type: userTypes.DELETE_KEAHLIAN_ID_REQUEST });
    try {
        const token = localStorage.getItem("token");
        const id_user = localStorage.getItem("id");
        await fetch(`${baseUrl}/keahlian/${id_user}/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        dispatch({ type: userTypes.DELETE_KEAHLIAN_ID_SUCCESS, payload: id });
    } catch (error) {
        dispatch({ type: userTypes.DELETE_KEAHLIAN_ID_FAILURE, payload: error });
    }
};

//Prestasi Kerja
export const createPrestasi = (prestasi) => async (dispatch) => {
    dispatch({ type: userTypes.CREATE_PRESTASI_ID_REQUEST });
    try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${baseUrl}/prestasikerja`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(prestasi),
        });
        const data = await response.json();
        dispatch({ type: userTypes.CREATE_PRESTASI_ID_SUCCESS, payload: data.data });
    } catch (error) {
        dispatch({ type: userTypes.CREATE_PRESTASI_ID_FAILURE, payload: error });
    }
};

export const readPrestasi = () => {
    return async (dispatch) => {
        dispatch({ type: userTypes.GET_PRESTASI_REQUEST });
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${baseUrl}/prestasikerja`, {
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
            dispatch({ type: userTypes.GET_PRESTASI_FAILURE, payload: error });
        }
    };
};

export const updatePrestasi = (id, id_pengalaman_kerja, updatedPrestasi) => async (dispatch) => {
    dispatch({ type: userTypes.UPDATE_PRESTASI_ID_REQUEST });
    try {
        const token = localStorage.getItem("token");
        const response = await fetch(`${baseUrl}/prestasikerja/${id_pengalaman_kerja}/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(updatedPrestasi),
        });
        const data = await response.json();
        dispatch({ type: userTypes.UPDATE_PRESTASI_ID_SUCCESS, payload: data.data });
    } catch (error) {
        dispatch({ type: userTypes.UPDATE_PRESTASI_ID_FAILURE, payload: error });
    }
};

export const deletePrestasi = (id, id_pengalaman_kerja) => async (dispatch) => {
    dispatch({ type: userTypes.DELETE_PRESTASI_ID_REQUEST });
    try {
        const token = localStorage.getItem("token");
        await fetch(`${baseUrl}/prestasikerja/${id_pengalaman_kerja}/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        dispatch({ type: userTypes.DELETE_PRESTASI_ID_SUCCESS, payload: id });
    } catch (error) {
        dispatch({ type: userTypes.DELETE_PRESTASI_ID_FAILURE, payload: error });
    }
};

//Pelatihan
export const createPelatihan = (pelatihan) => async (dispatch) => {
    dispatch({ type: userTypes.CREATE_PELATIHAN_ID_REQUEST });
    try {
        const response = await fetch(`${baseUrl}/pelatihan`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(pelatihan),
        });
        const data = await response.json();
        dispatch({ type: userTypes.CREATE_PELATIHAN_ID_SUCCESS, payload: data.data });
    } catch (error) {
        dispatch({ type: userTypes.CREATE_PELATIHAN_ID_FAILURE, payload: error });
    }
};

export const readPelatihan = (id) => {
    return async (dispatch) => {
        dispatch({ type: userTypes.GET_PELATIHAN_ID_REQUEST });
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${baseUrl}/pelatihan/${id}`, {
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
            dispatch({ type: userTypes.GET_PELATIHAN_ID_FAILURE, payload: error });
        }
    };
};

export const updatePelatihan = (id, updatedPelatihan) => async (dispatch) => {
    dispatch({ type: userTypes.UPDATE_PELATIHAN_ID_REQUEST });
    try {
        const token = localStorage.getItem("token");
        const id_user = localStorage.getItem("id");
        const response = await fetch(`${baseUrl}/pelatihan/${id_user}/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(updatedPelatihan),
        });
        const data = await response.json();
        dispatch({ type: userTypes.UPDATE_PELATIHAN_ID_SUCCESS, payload: data.data });
    } catch (error) {
        dispatch({ type: userTypes.UPDATE_PELATIHAN_ID_FAILURE, payload: error });
    }
};

export const deletePelatihan = (id) => async (dispatch) => {
    dispatch({ type: userTypes.DELETE_PELATIHAN_ID_REQUEST });
    try {
        const token = localStorage.getItem("token");
        const id_user = localStorage.getItem("id");
        await fetch(`${baseUrl}/pelatihan/${id_user}/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        dispatch({ type: userTypes.DELETE_PELATIHAN_ID_SUCCESS, payload: id });
    } catch (error) {
        dispatch({ type: userTypes.DELETE_PELATIHAN_ID_FAILURE, payload: error });
    }
};