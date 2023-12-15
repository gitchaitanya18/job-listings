import { ADMIN_DELETE_JOB_FAIL, ADMIN_DELETE_JOB_RES, ADMIN_JOB_LIST_FAIL, ADMIN_JOB_LIST_RES, ADMIN_UPDATE_JOB_FAIL, ADMIN_UPDATE_JOB_RES, EMP_CREATE_JOB_FAIL, EMP_CREATE_JOB_RES, EMP_DELETE_JOB_FAIL, EMP_DELETE_JOB_RES, EMP_JOB_DETAIL_FAIL, EMP_JOB_DETAIL_RES, EMP_JOB_LIST_FAIL, EMP_JOB_LIST_RES, EMP_UPDATE_JOB_FAIL, EMP_UPDATE_JOB_RES, SEEKER_JOB_LIST_FAIL, SEEKER_JOB_LIST_RES } from '../actions/jobsActions';

const initialState = {
    employerJobList: null,
    employerJobListError: null,
    employerCreateJob: null,
    employerCreateJobError: null,
    employerDeleteJob: null,
    employerDeleteJobError: null,
    employerUpdateJob: null,
    employerUpdateJobError: null,
    employerJobDetail: null,
    employerJobDetailError: null,
    seekerJobList: null,
    seekerJobListError: null,
    adminJobList: null,
    adminJobListError: null,
    adminJobUpdate: null,
    adminJobUpdateError: null,
    adminJobDelete: null,
    adminJobDeleteError: null,
};

const jobReducer = (state = initialState, action) => {
    switch (action.type) {
        case EMP_JOB_LIST_RES:
            return {
                ...state,
                employerJobList: action.payload
            };
        case EMP_JOB_LIST_FAIL:
            return {
                ...state,
                employerJobListError: action.payload
            };
        case EMP_CREATE_JOB_RES:
            return {
                ...state,
                employerCreateJob: action.payload
            };
        case EMP_CREATE_JOB_FAIL:
            return {
                ...state,
                employerCreateJobError: action.payload
            };
        case EMP_DELETE_JOB_RES:
            return {
                ...state,
                employerDeleteJob: action.payload
            };
        case EMP_DELETE_JOB_FAIL:
            return {
                ...state,
                employerDeleteJobError: action.payload
            };
        case SEEKER_JOB_LIST_RES:
            return {
                ...state,
                seekerJobList: action.payload
            };
        case SEEKER_JOB_LIST_FAIL:
            return {
                ...state,
                seekerJobListError: action.payload
            };
        case EMP_UPDATE_JOB_RES:
            return {
                ...state,
                employerUpdateJob: action.payload
            };
        case EMP_UPDATE_JOB_FAIL:
            return {
                ...state,
                employerUpdateJobError: action.payload
            };

        case EMP_JOB_DETAIL_RES:
            return {
                ...state,
                employerJobDetail: action.payload
            };
        case EMP_JOB_DETAIL_FAIL:
            return {
                ...state,
                employerJobDetailError: action.payload
            };

        case ADMIN_JOB_LIST_RES:
            return {
                ...state,
                adminJobList: action.payload
            };
        case ADMIN_JOB_LIST_FAIL:
            return {
                ...state,
                adminJobListError: action.payload
            };

        case ADMIN_UPDATE_JOB_RES:
            return {
                ...state,
                adminJobUpdate: action.payload
            };
        case ADMIN_UPDATE_JOB_FAIL:
            return {
                ...state,
                adminJobUpdateError: action.payload
            };

        case ADMIN_DELETE_JOB_RES:
            return {
                ...state,
                adminJobDelete: action.payload
            };
        case ADMIN_DELETE_JOB_FAIL:
            return {
                ...state,
                adminJobDeleteError: action.payload
            };
        default:
            return state;
    }
};

export default jobReducer;
