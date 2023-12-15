export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

export const loginRequest = (payload) => ({
    type: LOGIN_REQUEST,
    payload
});

export const loginSuccess = (payload, response) => ({
    type: LOGIN_SUCCESS,
    payload,
    response
});

export const loginFailure = (payload, response) => ({
    type: LOGIN_FAILURE,
    payload,
    response
});

export const LOGOUT = 'LOGOUT';

export const logoutAction = () => ({
    type: LOGOUT
});


export const REGISTER_REQ = 'REGISTER_REQ';
export const REGISTER_RES = 'REGISTER_RES';
export const REGISTER_FAIL = 'REGISTER_FAIL';

export const registerRequest = (payload) => ({
    type: REGISTER_REQ,
    payload
});

export const registerSuccess = (payload, response) => ({
    type: REGISTER_RES,
    payload,
    response
});

export const registerFailure = (payload, response) => ({
    type: REGISTER_FAIL,
    payload,
    response
});