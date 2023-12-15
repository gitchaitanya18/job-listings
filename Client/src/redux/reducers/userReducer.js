import { DELETE_USER_FAIL, DELETE_USER_RES, UPDATE_USER_FAIL, UPDATE_USER_RES } from "../actions/userActions";

const initialState = {
    updateUser: null,
    updateUserError: null,
    deleteUser: null,
    deleteUserError: null
};

const loaderReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_USER_RES:
            return {
                ...state,
                updateUser: true
            };
        case UPDATE_USER_FAIL:
            return {
                ...state,
                updateUserError: false
            };

        case DELETE_USER_RES:
            return {
                ...state,
                deleteUser: true
            };
        case DELETE_USER_FAIL:
            return {
                ...state,
                deleteUserError: false
            };
        default:
            return state;
    }
};

export default loaderReducer;
