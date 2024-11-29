import { userTypes } from "../actionTypes";

const initState = {
    userList: [],
    isLoading: false,
    error: null,
};

const users = (state = initState, action) => {
    switch (action.type) {
        // Create
        case userTypes.CREATE_USER_REQUEST:
            return { ...state, isLoading: true, error: null };
        case userTypes.CREATE_USER_SUCCESS:
            return {
                ...state,
                isLoading: false,
                userList: [...state.userList, action.payload],
            };
        case userTypes.CREATE_USER_FAILURE:
            return { ...state, isLoading: false, error: action.payload };

        //Read
        case userTypes.GET_USER_LIST_REQUEST:
            return {
                ...state,
                isLoading: true,
                error: null,
            };
        case userTypes.GET_USER_LIST_SUCCESS:
            return {
                ...state,
                isLoading: false,
                userList: action.payload,
            };
        case userTypes.GET_USER_LIST_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload,
            };

        //Read_Id
        case userTypes.GET_USER_ID_LIST_REQUEST:
            return {
                ...state,
                isLoading: true,
                error: null,
            };
        case userTypes.GET_USER_ID_LIST_SUCCESS:
            return {
                ...state,
                isLoading: false,
                userList: action.payload,
            };
        case userTypes.GET_USER_ID_LIST_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload,
            };

        // Update
        case userTypes.UPDATE_USER_REQUEST:
            return { ...state, isLoading: true, error: null };
        case userTypes.UPDATE_USER_SUCCESS:
            return {
                ...state,
                isLoading: false,
                userList: state.userList.map((user) =>
                    user.id === action.payload.id ? action.payload : user
                ),
            };
        case userTypes.UPDATE_USER_FAILURE:
            return { ...state, isLoading: false, error: action.payload };

        // Delete
        case userTypes.DELETE_USER_REQUEST:
            return { ...state, isLoading: true, error: null };
        case userTypes.DELETE_USER_SUCCESS:
            return {
                ...state,
                isLoading: false,
                userList: state.userList.filter((user) => user.id !== action.payload),
            };
        case userTypes.DELETE_USER_FAILURE:
            return { ...state, isLoading: false, error: action.payload };

        // Default
        default:
            return state;
    }
};

export default users;
