import hashValue from '../../util/encrypt';
import { userTypes } from '../actionTypes';

const adminKey = await hashValue(process.env.REACT_APP_ADMIN_KEY);
const userKey = await hashValue(process.env.REACT_APP_USER_KEY);

const initState = {
    userList: [],
    pengalamanKerja: [],
    pendidikanTerakhir: [],
    prestasiKerja: [],
    keahlian: [],
    pelatihan: [],
    otpRequest: [],
    resetPassword: [],
    templatList: [],
    isWebsite: adminKey,
    isViews: userKey,
    isLoading: false,
    error: null,
};

const users = (state = initState, action) => {
    switch (action.type) {
        //Login
        case userTypes.LOGIN_REQUEST:
            return { ...state, isLoading: true, error: null };
        case userTypes.LOGIN_SUCCESS:
            return {
                ...state,
                isLoading: false,
                userList: [...state.userList, action.payload],
            };
        case userTypes.LOGIN_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload,
            };

        //Register
        case userTypes.REGISTER_REQUEST:
            return { ...state, isLoading: true, error: null };
        case userTypes.REGISTER_SUCCESS:
            return {
                ...state,
                isLoading: false,
                userList: [...state.userList, action.payload],
            };
        case userTypes.REGISTER_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload,
            };

        // User (CRUD)
        case userTypes.CREATE_USER_REQUEST:
            return { ...state, isLoading: true, error: null };
        case userTypes.CREATE_USER_SUCCESS:
            return {
                ...state,
                isLoading: false,
                userList: [...state.userList, action.payload],
            };
        case userTypes.CREATE_USER_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload,
            };

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

            case userTypes.SET_HASHED_ROLES:
            return {
                ...state,
                isWebsite: action.payload.isWebsite,
                isViews: action.payload.isViews,
            };

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
            return {
                ...state,
                isLoading: false,
                error: action.payload,
            };

        case userTypes.DELETE_USER_REQUEST:
            return { ...state, isLoading: true, error: null };
        case userTypes.DELETE_USER_SUCCESS:
            return {
                ...state,
                isLoading: false,
                userList: state.userList.filter(
                    (user) => user.id !== action.payload
                ),
            };
        case userTypes.DELETE_USER_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload,
            };

        //OTP
        case userTypes.CREATE_OTP_REQUEST:
            return { ...state, isLoading: true, error: null };
        case userTypes.CREATE_OTP_SUCCESS:
            return {
                ...state,
                isLoading: false,
                otpRequest: [...state.otpRequest, action.payload],
            };
        case userTypes.CREATE_OTP_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload,
            };

        //OTP
        case userTypes.CREATE_RESET_PASSWORD_REQUEST:
            return { ...state, isLoading: true, error: null };
        case userTypes.CREATE_RESET_PASSWORD_SUCCESS:
            return {
                ...state,
                isLoading: false,
                resetPassword: [...state.resetPassword, action.payload],
            };
        case userTypes.CREATE_RESET_PASSWORD_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload,
            };

        //TemplatCV
        case userTypes.CREATE_TEMPLAT_SUCCESS:
            return {
                ...state,
                isLoading: true,
                error: null,
            };
        case userTypes.CREATE_TEMPLAT_REQUEST:
            return {
                ...state,
                isLoading: false,
                templatList: [
                    ...state.templatList,
                    action.payload,
                ],
            };
        case userTypes.CREATE_TEMPLAT_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload,
            };

        case userTypes.VIEW_TEMPLAT_SUCCESS:
            return {
                ...state,
                isLoading: false,
                templatList: action.payload,
            };
        case userTypes.VIEW_TEMPLAT_REQUEST:
            return {
                ...state,
                isLoading: false,
                templatList: action.payload,
            };
        case userTypes.VIEW_TEMPLAT_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload,
            };

        case userTypes.VIEW_TEMPLAT_ID_SUCCESS:
            return {
                ...state,
                isLoading: false,
                templatList: action.payload,
            };
        case userTypes.VIEW_TEMPLAT_ID_REQUEST:
            return {
                ...state,
                isLoading: false,
                templatList: action.payload,
            };
        case userTypes.VIEW_TEMPLAT_ID_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload,
            };

        case userTypes.UPDATE_TEMPLAT_REQUEST:
            return {
                ...state,
                isLoading: true,
                error: null,
            };
        case userTypes.UPDATE_TEMPLAT_SUCCESS:
            return {
                ...state,
                isLoading: false,
                templatList: state.templatList.map(
                    (templat) =>
                        templat.id === action.payload.id
                            ? action.payload
                            : templat
                ),
            };
        case userTypes.UPDATE_TEMPLAT_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload,
            };

        case userTypes.DELETE_TEMPLAT_SUCCESS:
            return {
                ...state,
                isLoading: false,
                templatList: state.templatList.filter(
                    (templat) => templat.id !== action.payload
                ),
            };
        case userTypes.DELETE_TEMPLAT_REQUEST:
            return {
                ...state,
                isLoading: false,
                error: action.payload,
            };
        case userTypes.DELETE_TEMPLAT_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload,
            };

        //Pendidikan Terakhir (CRUD)
        case userTypes.CREATE_PENDIDIKAN_ID_REQUEST:
            return {
                ...state,
                isLoading: true,
                error: null,
            };
        case userTypes.CREATE_PENDIDIKAN_ID_SUCCESS:
            return {
                ...state,
                isLoading: false,
                pendidikanTerakhir: [
                    ...state.pendidikanTerakhir,
                    action.payload,
                ],
            };
        case userTypes.CREATE_PENDIDIKAN_ID_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload,
            };

        case userTypes.GET_PENDIDIKAN_ID_REQUEST:
            return {
                ...state,
                isLoading: true,
                error: null,
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
                error: action.payload,
            };

        case userTypes.UPDATE_PENDIDIKAN_ID_REQUEST:
            return {
                ...state,
                isLoading: true,
                error: null,
            };
        case userTypes.UPDATE_PENDIDIKAN_ID_SUCCESS:
            return {
                ...state,
                isLoading: false,
                pendidikanTerakhir: state.pendidikanTerakhir.map(
                    (pendidikan) =>
                        pendidikan.id === action.payload.id
                            ? action.payload
                            : pendidikan
                ),
            };
        case userTypes.UPDATE_PENDIDIKAN_ID_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload,
            };

        case userTypes.DELETE_PENDIDIKAN_ID_REQUEST:
            return {
                ...state,
                isLoading: true,
                error: null,
            };
        case userTypes.DELETE_PENDIDIKAN_ID_SUCCESS:
            return {
                ...state,
                isLoading: false,
                pendidikanTerakhir: state.pendidikanTerakhir.filter(
                    (pendidikan) => pendidikan.id !== action.payload
                ),
            };
        case userTypes.DELETE_PENDIDIKAN_ID_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload,
            };

        //Pengalaman Kerja (CRUD)
        case userTypes.CREATE_PENGALAMAN_REQUEST:
            return {
                ...state,
                isLoading: true,
                error: null,
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
                error: action.payload,
            };

        case userTypes.GET_PENGALAMAN_ID_REQUEST:
            return {
                ...state,
                isLoading: true,
                error: null,
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
                error: action.payload,
            };

        case userTypes.UPDATE_PENGALAMAN_REQUEST:
            return {
                ...state,
                isLoading: true,
                error: null,
            };
        case userTypes.UPDATE_PENGALAMAN_SUCCESS:
            return {
                ...state,
                isLoading: false,
                pengalamanKerja: state.pengalamanKerja.map((pengalaman) =>
                    pengalaman.id === action.payload.id
                        ? action.payload
                        : pengalaman
                ),
            };
        case userTypes.UPDATE_PENGALAMAN_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload,
            };

        case userTypes.DELETE_PENGALAMAN_REQUEST:
            return {
                ...state,
                isLoading: true,
                error: null,
            };
        case userTypes.DELETE_PENGALAMAN_SUCCESS:
            return {
                ...state,
                isLoading: false,
                pengalamanKerja: state.pengalamanKerja.filter(
                    (pengalaman) => pengalaman.id !== action.payload
                ),
            };
        case userTypes.DELETE_PENGALAMAN_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload,
            };

        //Prestasi Kerja (CRUD)
        case userTypes.CREATE_PRESTASI_ID_REQUEST:
            return {
                ...state,
                isLoading: true,
                error: null,
            };
        case userTypes.CREATE_PRESTASI_ID_SUCCESS:
            return {
                ...state,
                isLoading: false,
                prestasiKerja: [...state.prestasiKerja, action.payload],
            };
        case userTypes.CREATE_PRESTASI_ID_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload,
            };

        case userTypes.GET_PRESTASI_REQUEST:
            return {
                ...state,
                isLoading: true,
                error: null,
            };
        case userTypes.GET_PRESTASI_SUCCESS:
            return {
                ...state,
                isLoading: false,
                prestasiKerja: action.payload,
            };
        case userTypes.GET_PRESTASI_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload,
            };

        case userTypes.UPDATE_PRESTASI_ID_REQUEST:
            return {
                ...state,
                isLoading: true,
                error: null,
            };
        case userTypes.UPDATE_PRESTASI_ID_SUCCESS:
            return {
                ...state,
                isLoading: false,
                prestasiKerja: state.prestasiKerja.map((prestasi) =>
                    prestasi.id === action.payload.id
                        ? action.payload
                        : prestasi
                ),
            };
        case userTypes.UPDATE_PRESTASI_ID_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload,
            };

        case userTypes.DELETE_PRESTASI_ID_REQUEST:
            return {
                ...state,
                isLoading: true,
                error: null,
            };
        case userTypes.DELETE_PRESTASI_ID_SUCCESS:
            return {
                ...state,
                isLoading: false,
                prestasiKerja: state.prestasiKerja.filter(
                    (prestasi) => prestasi.id !== action.payload
                ),
            };
        case userTypes.DELETE_PRESTASI_ID_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload,
            };

        //Keahlian (CRUD)
        case userTypes.CREATE_KEAHLIAN_ID_REQUEST:
            return {
                ...state,
                isLoading: true,
                error: null,
            };
        case userTypes.CREATE_KEAHLIAN_ID_SUCCESS:
            return {
                ...state,
                isLoading: false,
                keahlian: [...state.keahlian, action.payload],
            };
        case userTypes.CREATE_KEAHLIAN_ID_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload,
            };

        case userTypes.GET_KEAHLIAN_ID_REQUEST:
            return {
                ...state,
                isLoading: true,
                error: null,
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
                error: action.payload,
            };

        case userTypes.UPDATE_KEAHLIAN_ID_REQUEST:
            return {
                ...state,
                isLoading: true,
                error: null,
            };
        case userTypes.UPDATE_KEAHLIAN_ID_SUCCESS:
            return {
                ...state,
                isLoading: false,
                keahlian: state.keahlian.map((keahlian) =>
                    keahlian.id === action.payload.id
                        ? action.payload
                        : keahlian
                ),
            };
        case userTypes.UPDATE_KEAHLIAN_ID_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload,
            };

        case userTypes.DELETE_KEAHLIAN_ID_REQUEST:
            return {
                ...state,
                isLoading: true,
                error: null,
            };
        case userTypes.DELETE_KEAHLIAN_ID_SUCCESS:
            return {
                ...state,
                isLoading: false,
                keahlian: state.keahlian.filter(
                    (keahlian) => keahlian.id !== action.payload
                ),
            };
        case userTypes.DELETE_KEAHLIAN_ID_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload,
            };

        // Pelatihan (CRUD)
        case userTypes.CREATE_PELATIHAN_ID_REQUEST:
            return {
                ...state,
                isLoading: true,
                error: null,
            };
        case userTypes.CREATE_PELATIHAN_ID_SUCCESS:
            return {
                ...state,
                isLoading: false,
                pelatihan: [...state.pelatihan, action.payload],
            };
        case userTypes.CREATE_PELATIHAN_ID_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload,
            };

        case userTypes.GET_PELATIHAN_ID_REQUEST:
            return {
                ...state,
                isLoading: true,
                error: null,
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
                error: action.payload,
            };

        case userTypes.UPDATE_PELATIHAN_ID_REQUEST:
            return {
                ...state,
                isLoading: true,
                error: null,
            };
        case userTypes.UPDATE_PELATIHAN_ID_SUCCESS:
            return {
                ...state,
                isLoading: false,
                pelatihan: state.pelatihan.map((pelatihan) =>
                    pelatihan.id === action.payload.id
                        ? action.payload
                        : pelatihan
                ),
            };
        case userTypes.UPDATE_PELATIHAN_ID_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload,
            };

        case userTypes.DELETE_PELATIHAN_ID_REQUEST:
            return {
                ...state,
                isLoading: true,
                error: null,
            };
        case userTypes.DELETE_PELATIHAN_ID_SUCCESS:
            return {
                ...state,
                isLoading: false,
                pelatihan: state.pelatihan.filter(
                    (pelatihan) => pelatihan.id !== action.payload
                ),
            };
        case userTypes.DELETE_PELATIHAN_ID_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload,
            };

        // Default
        default:
            return state;
    }
};

export default users;
