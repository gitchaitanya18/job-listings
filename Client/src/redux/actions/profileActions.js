export const ADMIN_PROFILE_REQ = 'ADMIN_PROFILE_REQ';
export const ADMIN_PROFILE_RES = 'ADMIN_PROFILE_RES';
export const ADMIN_PROFILE_FAIL = 'ADMIN_PROFILE_FAIL';

export const adminProfileRequest = (payload) => ({
    type: ADMIN_PROFILE_REQ,
    payload
});

export const adminProfileSuccess = (payload, response) => ({
    type: ADMIN_PROFILE_RES,
    payload,
    response
});

export const adminProfileFailure = (payload, response) => ({
    type: ADMIN_PROFILE_FAIL,
    payload,
    response
});


export const UPDATE_PROFILE_REQ = 'UPDATE_PROFILE_REQ';
export const UPDATE_PROFILE_RES = 'UPDATE_PROFILE_RES';
export const UPDATE_PROFILE_FAIL = 'UPDATE_PROFILE_FAIL';

export const adminUpdateProfileRequest = (payload) => ({
    type: UPDATE_PROFILE_REQ,
    payload
});

export const adminUpdateProfileSuccess = (payload, response) => ({
    type: UPDATE_PROFILE_RES,
    payload,
    response
});

export const adminUpdateProfileFailure = (payload, response) => ({
    type: UPDATE_PROFILE_FAIL,
    payload,
    response
});


export const EMPLOYER_PROFILE_REQ = 'EMPLOYER_PROFILE_REQ';
export const EMPLOYER_PROFILE_RES = 'EMPLOYER_PROFILE_RES';
export const EMPLOYER_PROFILE_FAIL = 'EMPLOYER_PROFILE_FAIL';

export const employerProfileRequest = (payload) => ({
    type: EMPLOYER_PROFILE_REQ,
    payload
});

export const employerProfileSuccess = (payload, response) => ({
    type: EMPLOYER_PROFILE_RES,
    payload,
    response
});

export const employerProfileFailure = (payload, response) => ({
    type: EMPLOYER_PROFILE_FAIL,
    payload,
    response
});


export const SEEKER_PROFILE_REQ = 'SEEKER_PROFILE_REQ';
export const SEEKER_PROFILE_RES = 'SEEKER_PROFILE_RES';
export const SEEKER_PROFILE_FAIL = 'SEEKER_PROFILE_FAIL';

export const seekerProfileRequest = (payload) => ({
    type: SEEKER_PROFILE_REQ,
    payload
});

export const seekerProfileSuccess = (payload, response) => ({
    type: SEEKER_PROFILE_RES,
    payload,
    response
});

export const seekerProfileFailure = (payload, response) => ({
    type: SEEKER_PROFILE_FAIL,
    payload,
    response
});