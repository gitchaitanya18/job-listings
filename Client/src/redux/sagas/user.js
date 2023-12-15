import axios from 'axios';
import { call, put, select, takeLatest } from 'redux-saga/effects';
import ApiBase from '../../utils/apibase';
import EndPoint from '../../utils/endpoints';
import { DELETE_USER_FAIL, DELETE_USER_REQ, DELETE_USER_RES, UPDATE_USER_FAIL, UPDATE_USER_REQ, UPDATE_USER_RES } from '../actions/userActions';
import { startLoaderSaga, stopLoaderSaga } from './loader';

function* updateUserReqSaga({ payload }) {
    try {
        yield startLoaderSaga()
        const authToken = yield select((state) => state.auth.loginResponse.refreshToken.token);
        const headers = { 'Authorization': authToken }
        const updatePayload = {
            username: payload.name,
            email: payload.email,
            role: payload.loginType
        }
        const response = yield call(axios.put, `${ApiBase}${EndPoint.AdminUpdateUser}${payload.id}`, updatePayload, { headers });
        if (response.status === 200) {
            yield put({ type: UPDATE_USER_RES, payload: response.data });
        } else {
            yield put({ type: UPDATE_USER_FAIL, error: response.error });
        }
        yield stopLoaderSaga()
    } catch (error) {
        yield stopLoaderSaga()
        yield put({ type: UPDATE_USER_FAIL, error: error.response });
    }
}

function* deleteUserReqSaga({ payload }) {
    try {
        yield startLoaderSaga()
        const authToken = yield select((state) => state.auth.loginResponse.refreshToken.token);
        const headers = { 'Authorization': authToken }
        console.log('==>', payload, `${ApiBase}${EndPoint.AdminDeleteUser}${payload}`)
        const response = yield call(axios.delete, `${ApiBase}${EndPoint.AdminDeleteUser}${payload}`, { headers });
        if (response.status === 200) {
            yield put({ type: DELETE_USER_RES, payload: response.data });
        } else {
            yield put({ type: DELETE_USER_FAIL, error: response.error });
        }
        yield stopLoaderSaga()
    } catch (error) {
        yield stopLoaderSaga()
        yield put({ type: DELETE_USER_FAIL, error: error.response });
    }
}

function* userSaga() {
    yield takeLatest(UPDATE_USER_REQ, updateUserReqSaga);
    yield takeLatest(DELETE_USER_REQ, deleteUserReqSaga);
}

export default userSaga;
