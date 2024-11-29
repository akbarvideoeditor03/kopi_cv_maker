import { userTypes } from "../actionTypes";
const baseUrl = "http://localhost:4000/user";

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
        console.log(data);
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
            // console.log(data);
            // console.log(data.data.map((item => item.nama)));
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
            console.log(data.data);
            // console.log(data);
            // console.log(data.data.map((item => item.nama)));
            dispatch({
                type: userTypes.GET_USER_ID_LIST_SUCCESS,
                payload: data.data,
            });
        } catch (error) {
            dispatch({ type: userTypes.GET_USER_ID_LIST_FAILURE, payload: error });
        }
    };
};

// Update (PUT/PATCH)
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
