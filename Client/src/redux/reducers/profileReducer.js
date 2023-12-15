import { ADMIN_PROFILE_FAIL, ADMIN_PROFILE_RES, EMPLOYER_PROFILE_FAIL, EMPLOYER_PROFILE_RES, SEEKER_PROFILE_FAIL, SEEKER_PROFILE_RES, UPDATE_PROFILE_FAIL, UPDATE_PROFILE_RES } from '../actions/profileActions';

const initialState = {
    adminProfile: null,
    adminProfileError: null,
    adminUpdateProfile: null,
    adminUpdateProfileError: null,
    employerProfile: null,
    employerProfileError: null,
    seekerProfile: null,
    seekerProfileError: null,
};

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADMIN_PROFILE_RES:
            return {
                ...state,
                adminProfile: action.payload
            };
        case ADMIN_PROFILE_FAIL:
            return {
                ...state,
                adminProfileError: action.payload
            };
        case UPDATE_PROFILE_RES:
            return {
                ...state,
                adminUpdateProfile: action.payload
            };
        case UPDATE_PROFILE_FAIL:
            return {
                ...state,
                adminUpdateProfileError: action.payload
            };
        case EMPLOYER_PROFILE_RES:
            return {
                ...state,
                employerProfile: action.payload
            };
        case EMPLOYER_PROFILE_FAIL:
            return {
                ...state,
                employerProfileError: action.payload
            };
        case SEEKER_PROFILE_RES:
            return {
                ...state,
                seekerProfile: action.payload
            };
        case SEEKER_PROFILE_FAIL:
            return {
                ...state,
                seekerProfileError: action.payload
            };
        default:
            return state;
    }
};

export default profileReducer;
