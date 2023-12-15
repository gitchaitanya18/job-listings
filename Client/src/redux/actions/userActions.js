export const UPDATE_USER_REQ = 'UPDATE_USER_REQ';
export const UPDATE_USER_RES = 'UPDATE_USER_RES';
export const UPDATE_USER_FAIL = 'UPDATE_USER_FAIL';

export const updateUserRequest = (payload) => ({
    type: UPDATE_USER_REQ,
    payload
});

export const updateUserSuccess = (payload, response) => ({
    type: UPDATE_USER_RES,
    payload,
    response
});

export const updateUserFailure = (payload, response) => ({
    type: UPDATE_USER_FAIL,
    payload,
    response
});


export const DELETE_USER_REQ = 'DELETE_USER_REQ';
export const DELETE_USER_RES = 'DELETE_USER_RES';
export const DELETE_USER_FAIL = 'DELETE_USER_FAIL';

export const deleteUserRequest = (payload) => ({
    type: DELETE_USER_REQ,
    payload
});

export const deleteUserSuccess = (payload, response) => ({
    type: DELETE_USER_RES,
    payload,
    response
});

export const deleteUserFailure = (payload, response) => ({
    type: DELETE_USER_FAIL,
    payload,
    response
});
