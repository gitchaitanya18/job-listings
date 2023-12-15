import { ADMIN_USER_LIST_FAIL, ADMIN_USER_LIST_RES } from '../actions/listActions';

const initialState = {
    adminUserList: null,
    adminUserListError: null
};

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADMIN_USER_LIST_RES:
            return {
                ...state,
                adminUserList: action.payload
            };
        case ADMIN_USER_LIST_FAIL:
            return {
                ...state,
                adminUserListError: action.payload
            };
        default:
            return state;
    }
};

export default adminReducer;
