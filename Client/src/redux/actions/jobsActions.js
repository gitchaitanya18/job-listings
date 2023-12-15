export const EMP_JOB_LIST_REQ = 'EMP_JOB_LIST_REQ';
export const EMP_JOB_LIST_RES = 'EMP_JOB_LIST_RES';
export const EMP_JOB_LIST_FAIL = 'EMP_JOB_LIST_FAIL';


export const employerJobListRequest = (payload) => ({
    type: EMP_JOB_LIST_REQ,
    payload
});

export const employerJobListSuccess = (payload, response) => ({
    type: EMP_JOB_LIST_RES,
    payload,
    response
});

export const employerJobListFailure = (payload, response) => ({
    type: EMP_JOB_LIST_FAIL,
    payload,
    response
});


export const EMP_CREATE_JOB_REQ = 'EMP_CREATE_JOB_REQ';
export const EMP_CREATE_JOB_RES = 'EMP_CREATE_JOB_RES';
export const EMP_CREATE_JOB_FAIL = 'EMP_CREATE_JOB_FAIL';

export const employerCreateJobRequest = (payload) => ({
    type: EMP_CREATE_JOB_REQ,
    payload
});

export const employerCreateJobSuccess = (payload, response) => ({
    type: EMP_CREATE_JOB_RES,
    payload,
    response
});

export const employerCreateJobFailure = (payload, response) => ({
    type: EMP_CREATE_JOB_FAIL,
    payload,
    response
});


export const EMP_UPDATE_JOB_REQ = 'EMP_UPDATE_JOB_REQ';
export const EMP_UPDATE_JOB_RES = 'EMP_UPDATE_JOB_RES';
export const EMP_UPDATE_JOB_FAIL = 'EMP_UPDATE_JOB_FAIL';

export const employerUpdateJobRequest = (payload) => ({
    type: EMP_UPDATE_JOB_REQ,
    payload
});

export const employerUpdateJobSuccess = (payload, response) => ({
    type: EMP_UPDATE_JOB_RES,
    payload,
    response
});

export const employerUpdateJobFailure = (payload, response) => ({
    type: EMP_UPDATE_JOB_FAIL,
    payload,
    response
});


export const EMP_JOB_DETAIL_REQ = 'EMP_JOB_DETAIL_REQ';
export const EMP_JOB_DETAIL_RES = 'EMP_JOB_DETAIL_RES';
export const EMP_JOB_DETAIL_FAIL = 'EMP_JOB_DETAIL_FAIL';

export const employerJobDetailRequest = (payload) => ({
    type: EMP_JOB_DETAIL_REQ,
    payload
});

export const employerJobDetailSuccess = (payload, response) => ({
    type: EMP_JOB_DETAIL_RES,
    payload,
    response
});

export const employerJobDetailFailure = (payload, response) => ({
    type: EMP_JOB_DETAIL_FAIL,
    payload,
    response
});


export const EMP_DELETE_JOB_REQ = 'EMP_DELETE_JOB_REQ';
export const EMP_DELETE_JOB_RES = 'EMP_DELETE_JOB_RES';
export const EMP_DELETE_JOB_FAIL = 'EMP_DELETE_JOB_FAIL';

export const employerDeleteJobRequest = (payload) => ({
    type: EMP_DELETE_JOB_REQ,
    payload
});

export const employerDeleteJobSuccess = (payload, response) => ({
    type: EMP_DELETE_JOB_RES,
    payload,
    response
});

export const employerDeleteJobFailure = (payload, response) => ({
    type: EMP_DELETE_JOB_FAIL,
    payload,
    response
});


export const SEEKER_JOB_LIST_REQ = 'SEEKER_JOB_LIST_REQ';
export const SEEKER_JOB_LIST_RES = 'SEEKER_JOB_LIST_RES';
export const SEEKER_JOB_LIST_FAIL = 'SEEKER_JOB_LIST_FAIL';


export const seekerJobListRequest = (payload) => ({
    type: SEEKER_JOB_LIST_REQ,
    payload
});

export const seekerJobListSuccess = (payload, response) => ({
    type: SEEKER_JOB_LIST_RES,
    payload,
    response
});

export const seekerJobListFailure = (payload, response) => ({
    type: SEEKER_JOB_LIST_FAIL,
    payload,
    response
});


export const ADMIN_JOB_LIST_REQ = 'ADMIN_JOB_LIST_REQ';
export const ADMIN_JOB_LIST_RES = 'ADMIN_JOB_LIST_RES';
export const ADMIN_JOB_LIST_FAIL = 'ADMIN_JOB_LIST_FAIL';


export const adminJobListRequest = (payload) => ({
    type: ADMIN_JOB_LIST_REQ,
    payload
});

export const adminJobListSuccess = (payload, response) => ({
    type: ADMIN_JOB_LIST_RES,
    payload,
    response
});

export const adminJobListFailure = (payload, response) => ({
    type: ADMIN_JOB_LIST_FAIL,
    payload,
    response
});



export const ADMIN_UPDATE_JOB_REQ = 'ADMIN_UPDATE_JOB_REQ';
export const ADMIN_UPDATE_JOB_RES = 'ADMIN_UPDATE_JOB_RES';
export const ADMIN_UPDATE_JOB_FAIL = 'ADMIN_UPDATE_JOB_FAIL';

export const adminUpdateJobRequest = (payload) => ({
    type: ADMIN_UPDATE_JOB_REQ,
    payload
});

export const adminUpdateJobSuccess = (payload, response) => ({
    type: ADMIN_UPDATE_JOB_RES,
    payload,
    response
});

export const adminUpdateJobFailure = (payload, response) => ({
    type: ADMIN_UPDATE_JOB_FAIL,
    payload,
    response
});


export const ADMIN_DELETE_JOB_REQ = 'ADMIN_DELETE_JOB_REQ';
export const ADMIN_DELETE_JOB_RES = 'ADMIN_DELETE_JOB_RES';
export const ADMIN_DELETE_JOB_FAIL = 'ADMIN_DELETE_JOB_FAIL';

export const adminDeleteJobRequest = (payload) => ({
    type: ADMIN_DELETE_JOB_REQ,
    payload
});

export const adminDeleteJobSuccess = (payload, response) => ({
    type: ADMIN_DELETE_JOB_RES,
    payload,
    response
});

export const adminDeleteJobFailure = (payload, response) => ({
    type: ADMIN_DELETE_JOB_FAIL,
    payload,
    response
});