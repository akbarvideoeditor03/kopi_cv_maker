import { userTypes } from "../actionTypes";

const initState = {
    userList: [],
    pengalamanKerja: [],
    pendidikanTerakhir: [],
    prestasiKerja: [],
    keahlian: [],
    pelatihan: [],
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

        // Read
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

        // Read_Id
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


        //Pendidikan Terakhir (Create)
        case userTypes.CREATE_PENDIDIKAN_REQUEST:
            return {
                ...state,
                isLoading: true,
                error: null
            };
        case userTypes.CREATE_PENDIDIKAN_SUCCESS:
            return {
                ...state,
                isLoading: false,
                pendidikanTerakhir: [...state.pendidikanTerakhir, action.payload],
            };
        case userTypes.CREATE_PENDIDIKAN_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload
            };

        //Pendidikan Terakhir (Read ID)
        case userTypes.GET_PENDIDIKAN_ID_REQUEST:
            return {
                ...state,
                isLoading: true,
                error: null
            };
        case userTypes.GET_PENDIDIKAN_ID_SUCCESS:
            return {
                ...state,
                isLoading: false,
                pendidikanTerakhir: action.payload,
            };
        case userTypes.GET_PENDIDIKAN_ID_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload
            };

        //Pendidikan Terakhir (Update ID)
        case userTypes.UPDATE_PENDIDIKAN_REQUEST:
            return {
                ...state,
                isLoading: true,
                error: null
            };
        case userTypes.UPDATE_PENDIDIKAN_SUCCESS:
            return {
                ...state,
                isLoading: false,
                pendidikanTerakhir: state.pendidikanTerakhir.map((pendidikan) =>
                    pendidikan.id === action.payload.id ? action.payload : pendidikan
                ),
            };
        case userTypes.UPDATE_PENDIDIKAN_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload
            };

        //Pendidikan Terakhir (Delete ID)
        case userTypes.DELETE_PENDIDIKAN_REQUEST:
            return {
                ...state,
                isLoading: true,
                error: null
            };
        case userTypes.DELETE_PENDIDIKAN_SUCCESS:
            return {
                ...state,
                isLoading: false,
                pendidikanTerakhir: state.pendidikanTerakhir.filter((pendidikan) => pendidikan.id !== action.payload),
            };
        case userTypes.DELETE_PENDIDIKAN_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload
            };

        //Pengalaman Kerja (Create)
        case userTypes.CREATE_PENGALAMAN_REQUEST:
            return {
                ...state,
                isLoading: true,
                error: null
            };
        case userTypes.CREATE_PENGALAMAN_SUCCESS:
            return {
                ...state,
                isLoading: false,
                pengalamanKerja: [...state.pengalamanKerja, action.payload],
            };
        case userTypes.CREATE_PENGALAMAN_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload
            };

        //Pengalaman Kerja (Read ID)
        case userTypes.GET_PENGALAMAN_ID_REQUEST:
            return {
                ...state,
                isLoading: true,
                error: null
            };
        case userTypes.GET_PENGALAMAN_ID_SUCCESS:
            return {
                ...state,
                isLoading: false,
                pengalamanKerja: action.payload,
            };
        case userTypes.GET_PENGALAMAN_ID_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload
            };

        //Pengalaman Kerja (Update ID)
        case userTypes.UPDATE_PENGALAMAN_REQUEST:
            return {
                ...state,
                isLoading: true,
                error: null
            };
        case userTypes.UPDATE_PENGALAMAN_SUCCESS:
            return {
                ...state,
                isLoading: false,
                pengalamanKerja: state.pengalamanKerja.map((pengalaman) =>
                    pengalaman.id === action.payload.id ? action.payload : pengalaman
                ),
            };
        case userTypes.UPDATE_PENGALAMAN_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload
            };

        //Pengalaman Kerja (Delete ID)
        case userTypes.DELETE_PENGALAMAN_REQUEST:
            return {
                ...state,
                isLoading: true,
                error: null
            };
        case userTypes.DELETE_PENGALAMAN_SUCCESS:
            return {
                ...state,
                isLoading: false,
                pengalamanKerja: state.pengalamanKerja.filter((pengalaman) => pengalaman.id !== action.payload),
            };
        case userTypes.DELETE_PENGALAMAN_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload
            };

        //Prestasi Kerja (Create)
        case userTypes.CREATE_PRESTASI_REQUEST:
            return {
                ...state,
                isLoading: true,
                error: null
            };
        case userTypes.CREATE_PRESTASI_SUCCESS:
            return {
                ...state,
                isLoading: false,
                prestasiKerja: [...state.prestasiKerja, action.payload],
            };
        case userTypes.CREATE_PRESTASI_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload
            };

        //Prestasi Kerja (Read ID)
        case userTypes.GET_PRESTASI_ID_REQUEST:
            return {
                ...state,
                isLoading: true,
                error: null
            };
        case userTypes.GET_PRESTASI_ID_SUCCESS:
            return {
                ...state,
                isLoading: false,
                prestasiKerja: action.payload,
            };
        case userTypes.GET_PRESTASI_ID_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload
            };

        //Prestasi Kerja (Update ID)
        case userTypes.UPDATE_PRESTASI_REQUEST:
            return {
                ...state,
                isLoading: true,
                error: null
            };
        case userTypes.UPDATE_PRESTASI_SUCCESS:
            return {
                ...state,
                isLoading: false,
                prestasiKerja: state.prestasiKerja.map((prestasi) =>
                    prestasi.id === action.payload.id ? action.payload : prestasi
                ),
            };
        case userTypes.UPDATE_PRESTASI_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload
            };

        //Prestasi Kerja (Delete ID)
        case userTypes.DELETE_PRESTASI_REQUEST:
            return {
                ...state,
                isLoading: true,
                error: null
            };
        case userTypes.DELETE_PRESTASI_SUCCESS:
            return {
                ...state,
                isLoading: false,
                prestasiKerja: state.prestasiKerja.filter((prestasi) => prestasi.id !== action.payload),
            };
        case userTypes.DELETE_PRESTASI_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload
            };

        //Keahlian (Create)
        case userTypes.CREATE_KEAHLIAN_REQUEST:
            return {
                ...state,
                isLoading: true,
                error: null
            };
        case userTypes.CREATE_KEAHLIAN_SUCCESS:
            return {
                ...state,
                isLoading: false,
                keahlian: [...state.keahlian, action.payload],
            };
        case userTypes.CREATE_KEAHLIAN_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload
            };

        //Keahlian (Read ID)
        case userTypes.GET_KEAHLIAN_ID_REQUEST:
            return {
                ...state,
                isLoading: true,
                error: null
            };
        case userTypes.GET_KEAHLIAN_ID_SUCCESS:
            return {
                ...state,
                isLoading: false,
                keahlian: action.payload,
            };
        case userTypes.GET_KEAHLIAN_ID_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload
            };

        //Keahlian (Update ID)
        case userTypes.UPDATE_KEAHLIAN_REQUEST:
            return {
                ...state,
                isLoading: true,
                error: null
            };
        case userTypes.UPDATE_KEAHLIAN_SUCCESS:
            return {
                ...state,
                isLoading: false,
                keahlian: state.keahlian.map((keahlian) =>
                    keahlian.id === action.payload.id ? action.payload : keahlian
                ),
            };
        case userTypes.UPDATE_KEAHLIAN_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload
            };

        //Keahlian (Delete ID)
        case userTypes.DELETE_KEAHLIAN_REQUEST:
            return {
                ...state,
                isLoading: true,
                error: null
            };
        case userTypes.DELETE_KEAHLIAN_SUCCESS:
            return {
                ...state,
                isLoading: false,
                keahlian: state.keahlian.filter((keahlian) => keahlian.id !== action.payload),
            };
        case userTypes.DELETE_KEAHLIAN_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload
            };

        // Pelatihan (Create)
        case userTypes.CREATE_PELATIHAN_REQUEST:
            return {
                ...state,
                isLoading: true,
                error: null
            };
        case userTypes.CREATE_PELATIHAN_SUCCESS:
            return {
                ...state,
                isLoading: false,
                pelatihan: [...state.pelatihan, action.payload],
            };
        case userTypes.CREATE_PELATIHAN_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload
            };

        // Pelatihan (Read ID)
        case userTypes.GET_PELATIHAN_ID_REQUEST:
            return {
                ...state,
                isLoading: true,
                error: null
            };
        case userTypes.GET_PELATIHAN_ID_SUCCESS:
            return {
                ...state,
                isLoading: false,
                pelatihan: action.payload,
            };
        case userTypes.GET_PELATIHAN_ID_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload
            };

        // Pelatihan (Update)
        case userTypes.UPDATE_PELATIHAN_REQUEST:
            return {
                ...state,
                isLoading: true,
                error: null
            };
        case userTypes.UPDATE_PELATIHAN_SUCCESS:
            return {
                ...state,
                isLoading: false,
                pelatihan: state.pelatihan.map((pelatihan) =>
                    pelatihan.id === action.payload.id ? action.payload : pelatihan
                ),
            };
        case userTypes.UPDATE_PELATIHAN_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload
            };

        // Pelatihan (Delete ID)
        case userTypes.DELETE_PELATIHAN_REQUEST:
            return {
                ...state,
                isLoading: true,
                error: null
            };
        case userTypes.DELETE_PELATIHAN_SUCCESS:
            return {
                ...state,
                isLoading: false,
                pelatihan: state.pelatihan.filter((pelatihan) => pelatihan.id !== action.payload),
            };
        case userTypes.DELETE_PELATIHAN_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload
            };

        // Default
        default:
            return state;
    }
};

export default users;
