import { userTypes } from "../actionTypes";
import { createClient } from '@supabase/supabase-js';
const baseUrl = process.env.REACT_APP_BASE_URL;
const baseUrlSignUp = process.env.REACT_APP_BASE_URL_SIGNUP;
const baseUrlSignIn = process.env.REACT_APP_BASE_URL_SIGNIN;
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

// Create User (POST) Admin
export const createUser = (user) => async (dispatch) => {
    dispatch({ type: userTypes.CREATE_USER_REQUEST });
    try {
        const response = await fetch(baseUrlSignUp, {
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

// Create User - Register (POST)
export const createUserSelf = (user) => async (dispatch) => {
    dispatch({ type: userTypes.CREATE_USER_REQUEST });
    try {
        const response = await fetch(baseUrlSignUp, {
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

// User - Login (POST)
export const postUserLogin = (user) => async (dispatch) => {
    dispatch({ type: userTypes.CREATE_USER_REQUEST });
    try {
        const response = await fetch(baseUrlSignIn, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
        });

        const data = await response.json();
        const token = data.token;
        const roleUser = data.role;
        localStorage.setItem("token", token);
        localStorage.setItem("role", roleUser);
        const sentToken = localStorage.getItem("token");
        const secondResponse = await fetch(baseUrlSignIn, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${sentToken}`,
            },
            body: JSON.stringify(user),
        });
        const secondData = await secondResponse.json();
        dispatch({ type: userTypes.CREATE_USER_SUCCESS, payload: secondData.data });
    } catch (error) {
        console.error("Error during login:", error);
        dispatch({ type: userTypes.CREATE_USER_FAILURE, payload: error });
    }
};

// Read (GET)
export const getUser = () => {
    return async (dispatch) => {
        dispatch({ type: userTypes.GET_USER_LIST_REQUEST });
        try {
            const token = localStorage.getItem("token");
            const response = await fetch(baseUrl, {
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

// Read (GET ID)
export const getUserId = (id) => {
    return async (dispatch) => {
        dispatch({ type: userTypes.GET_USER_ID_LIST_REQUEST });
        try {
            const token = localStorage.getItem("token");
            const response = await fetch(`${baseUrl}/${id}`, {
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

// Update (PUT)
export const updateUser = (id, updatedUser) => async (dispatch) => {
    dispatch({ type: userTypes.UPDATE_USER_REQUEST });
    try {
        const token = localStorage.getItem("token");
        const response = await fetch(`${baseUrl}/${id}`, {
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

// Delete (DELETE)
export const deleteUser = (id) => async (dispatch) => {
    dispatch({ type: userTypes.DELETE_USER_REQUEST });
    try {
        const token = localStorage.getItem("token");
        await fetch(`${baseUrl}/${id}`, {
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
