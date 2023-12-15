export const SEEKER_APPLY_REQ = 'SEEKER_APPLY_REQ';
export const SEEKER_APPLY_RES = 'SEEKER_APPLY_RES';
export const SEEKER_APPLY_FAIL = 'SEEKER_APPLY_FAIL';

export const seekerApplyRequest = (payload) => ({
    type: SEEKER_APPLY_REQ,
    payload
});

export const seekerApplySuccess = (payload, response) => ({
    type: SEEKER_APPLY_RES,
    payload,
    response
});

export const seekerApplyFailure = (payload, response) => ({
    type: SEEKER_APPLY_FAIL,
    payload,
    response
});


export const SEEKER_APPLY_LIST_REQ = 'SEEKER_APPLY_LIST_REQ';
export const SEEKER_APPLY_LIST_RES = 'SEEKER_APPLY_LIST_RES';
export const SEEKER_APPLY_LIST_FAIL = 'SEEKER_APPLY_LIST_FAIL';

export const seekerApplicationListRequest = (payload) => ({
    type: SEEKER_APPLY_LIST_REQ,
    payload
});

export const seekerApplicationListSuccess = (payload, response) => ({
    type: SEEKER_APPLY_LIST_RES,
    payload,
    response
});

export const seekerApplicationListFailure = (payload, response) => ({
    type: SEEKER_APPLY_LIST_FAIL,
    payload,
    response
});


export const EMPLOYER_APPLY_LIST_REQ = 'EMPLOYER_APPLY_LIST_REQ';
export const EMPLOYER_APPLY_LIST_RES = 'EMPLOYER_APPLY_LIST_RES';
export const EMPLOYER_APPLY_LIST_FAIL = 'EMPLOYER_APPLY_LIST_FAIL';

export const employerApplicationListRequest = (payload) => ({
    type: EMPLOYER_APPLY_LIST_REQ,
    payload
});

export const employerApplicationListSuccess = (payload, response) => ({
    type: EMPLOYER_APPLY_LIST_RES,
    payload,
    response
});

export const employerApplicationListFailure = (payload, response) => ({
    type: EMPLOYER_APPLY_LIST_FAIL,
    payload,
    response
});
