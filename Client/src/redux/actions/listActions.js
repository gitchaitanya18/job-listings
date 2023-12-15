export const ADMIN_USER_LIST_REQ = 'ADMIN_USER_LIST_REQ';
export const ADMIN_USER_LIST_RES = 'ADMIN_USER_LIST_RES';
export const ADMIN_USER_LIST_FAIL = 'ADMIN_USER_LIST_FAIL';

export const adminUserList = (payload) => ({
    type: ADMIN_USER_LIST_REQ,
    payload
});

export const adminUserListSuccess = (payload, response) => ({
    type: ADMIN_USER_LIST_RES,
    payload,
    response
});

export const adminUserListFailure = (payload, response) => ({
    type: ADMIN_USER_LIST_FAIL,
    payload,
    response
});
