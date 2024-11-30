import { userTypes } from "../actionTypes";
import { createClient } from '@supabase/supabase-js';
const baseUrl = "http://localhost:4000/user";

const supabaseUrl = 'https://umvqfijgyrkcxaubrerq.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVtdnFmaWpneXJrY3hhdWJyZXJxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzI2MzA0MjUsImV4cCI6MjA0ODIwNjQyNX0.yp13eY3-UjoSEa-nUdY7a_cJdpOXD3v7TiihzTGxF4U';
const supabase = createClient(supabaseUrl, supabaseKey);
export default supabase;


export const uploadToSupabase = async (file) => {
    try {
        const { data, error } = await supabase.storage
            .from("final_project")
            .upload(file.name, file, {
                upsert: false,
            });

        if (error) {
            console.error('Error uploading file:', error);
            throw error;
        }

        const { publicUrl } = supabase.storage.from("final_project").getPublicUrl(data.path);
        return publicUrl;
    } catch (error) {
        console.error("Error uploading file to Supabase Storage:", error);
        throw error;
    }
}

// Create (POST)
export const createUser = (user) => async (dispatch) => {
    dispatch({ type: userTypes.CREATE_USER_REQUEST });
    try {
        const response = await fetch(baseUrl, {
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

// Read (GET)
export const getUser = () => {
    return async (dispatch) => {
        dispatch({ type: userTypes.GET_USER_LIST_REQUEST });
        try {
            const response = await fetch(baseUrl);
            const data = await response.json();

            dispatch({
                type: userTypes.GET_USER_LIST_SUCCESS,
                payload: data.data,
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
            const response = await fetch(`${baseUrl}/${id}`);
            const data = await response.json();

            dispatch({
                type: userTypes.GET_USER_ID_LIST_SUCCESS,
                payload: data.data,
            });
        } catch (error) {
            dispatch({ type: userTypes.GET_USER_ID_LIST_FAILURE, payload: error });
        }
    };
};

// Update (PUT)
export const updateUser = (id, updatedUser) => async (dispatch) => {
    dispatch({ type: userTypes.UPDATE_USER_REQUEST });
    try {
        const response = await fetch(`${baseUrl}/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedUser),
        });
        const data = await response.json();
        dispatch({ type: userTypes.UPDATE_USER_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: userTypes.UPDATE_USER_FAILURE, payload: error });
    }
};

// Delete (DELETE)
export const deleteUser = (id) => async (dispatch) => {
    dispatch({ type: userTypes.DELETE_USER_REQUEST });
    try {
        await fetch(`${baseUrl}/${id}`, {
            method: "DELETE",
        });
        dispatch({ type: userTypes.DELETE_USER_SUCCESS, payload: id });
    } catch (error) {
        dispatch({ type: userTypes.DELETE_USER_FAILURE, payload: error });
    }
};
