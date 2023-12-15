import { LOGIN_FAILURE, LOGIN_SUCCESS, LOGOUT, REGISTER_FAIL, REGISTER_RES } from '../actions/authActions';

const initialState = {
    loginResponse: null,
    loginError: null,
    registerResponse: null,
    registerError: null
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_SUCCESS:
            return {
                ...state,
                loginResponse: action.payload
            };
        case LOGIN_FAILURE:
            return {
                ...state,
                loginError: action.payload
            };
        case REGISTER_RES:
            return {
                ...state,
                registerResponse: action.payload
            };
        case REGISTER_FAIL:
            return {
                ...state,
                registerError: action.payload
            };
        case LOGOUT:
            return {
                ...state,
                loginResponse: null,
                loginError: null
            };
        default:
            return state;
    }
};

export default authReducer;
