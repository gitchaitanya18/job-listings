import { SEEKER_APPLY_RES, SEEKER_APPLY_FAIL, SEEKER_APPLY_LIST_RES, SEEKER_APPLY_LIST_FAIL, EMPLOYER_APPLY_LIST_RES, EMPLOYER_APPLY_LIST_FAIL } from '../actions/applicationActions';

const initialState = {
    seekerApply: null,
    seekerApplyError: null,
    seekerApplicationList: null,
    seekerApplicationListError: null,
    employerApplicationList: null,
    employerApplicationListError: null
};

const applicationReducer = (state = initialState, action) => {
    switch (action.type) {
        case SEEKER_APPLY_RES:
            return {
                ...state,
                seekerApply: action.payload
            };
        case SEEKER_APPLY_FAIL:
            return {
                ...state,
                seekerApplyError: action.payload
            };
        case SEEKER_APPLY_LIST_RES:
            return {
                ...state,
                seekerApplicationList: action.payload
            };
        case SEEKER_APPLY_LIST_FAIL:
            return {
                ...state,
                seekerApplicationListError: action.payload
            };
        case EMPLOYER_APPLY_LIST_RES:
            return {
                ...state,
                employerApplicationList: action.payload
            };
        case EMPLOYER_APPLY_LIST_FAIL:
            return {
                ...state,
                employerApplicationListError: action.payload
            };
        default:
            return state;
    }
};

export default applicationReducer;
