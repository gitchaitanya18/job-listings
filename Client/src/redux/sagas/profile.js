import axios from 'axios';
import { call, put, select, takeLatest } from 'redux-saga/effects';
import ApiBase from '../../utils/apibase';
import EndPoint from '../../utils/endpoints';
import { ADMIN_PROFILE_FAIL, ADMIN_PROFILE_REQ, ADMIN_PROFILE_RES, EMPLOYER_PROFILE_FAIL, EMPLOYER_PROFILE_REQ, EMPLOYER_PROFILE_RES, SEEKER_PROFILE_FAIL, SEEKER_PROFILE_REQ, SEEKER_PROFILE_RES, UPDATE_PROFILE_FAIL, UPDATE_PROFILE_REQ, UPDATE_PROFILE_RES } from '../actions/profileActions';
import { startLoaderSaga, stopLoaderSaga } from './loader';

function* adminProfileReqSaga({ payload }) {
    try {
        // yield startLoaderSaga()
        const authToken = yield select((state) => state.auth.loginResponse.refreshToken.token);
        const headers = { 'Authorization': authToken }
        const response = yield call(axios.post, `${ApiBase}${EndPoint.AdminProfile}`, payload, { headers });
        if (response.status === 200) {
            yield put({ type: ADMIN_PROFILE_RES, payload: response.data });
        } else {
            yield put({ type: ADMIN_PROFILE_FAIL, error: response.error });
        }
        // yield stopLoaderSaga()
    } catch (error) {
        // yield stopLoaderSaga()
        yield put({ type: ADMIN_PROFILE_FAIL, error: error.response });
    }
}

function* adminUpdateProfileReqSaga({ payload }) {
    try {
        // yield startLoaderSaga()
        const authToken = yield select((state) => state.auth.loginResponse.refreshToken.token);
        const headers = { 'Authorization': authToken }
        const response = yield call(axios.post, `${ApiBase}${EndPoint.AdminUpdateProfile}`, payload, { headers });
        if (response.status === 200) {
            yield put({ type: UPDATE_PROFILE_RES, payload: response.data });
        } else {
            yield put({ type: UPDATE_PROFILE_FAIL, error: response.error });
        }
    } catch (error) {
        // yield stopLoaderSaga()
        yield put({ type: UPDATE_PROFILE_FAIL, error: error.response });
    }
}

function* employerProfileReqSaga({ payload }) {
    try {
        // yield startLoaderSaga()
        const authToken = yield select((state) => state.auth.loginResponse.refreshToken.token);
        const headers = { 'Authorization': authToken }
        const response = yield call(axios.post, `${ApiBase}${EndPoint.EmployerProfile}`, payload, { headers });
        if (response.status === 200) {
            yield put({ type: EMPLOYER_PROFILE_RES, payload: response.data });
        } else {
            yield put({ type: EMPLOYER_PROFILE_FAIL, error: response.error });
        }
        // yield stopLoaderSaga()
    } catch (error) {
        // yield stopLoaderSaga()
        yield put({ type: EMPLOYER_PROFILE_FAIL, error: error.response });
    }
}

function* seekerProfileReqSaga({ payload }) {
    try {
        // yield startLoaderSaga()
        const authToken = yield select((state) => state.auth.loginResponse.refreshToken.token);
        const headers = { 'Authorization': authToken }
        const response = yield call(axios.post, `${ApiBase}${EndPoint.SeekerProfile}`, payload, { headers });
        if (response.status === 200) {
            yield put({ type: SEEKER_PROFILE_RES, payload: response.data });
        } else {
            yield put({ type: SEEKER_PROFILE_FAIL, error: response.error });
        }
        // yield stopLoaderSaga()
    } catch (error) {
        // yield stopLoaderSaga()
        yield put({ type: SEEKER_PROFILE_FAIL, error: error.response });
    }
}

function* profileSaga() {
    yield takeLatest(ADMIN_PROFILE_REQ, adminProfileReqSaga);
    yield takeLatest(UPDATE_PROFILE_REQ, adminUpdateProfileReqSaga);
    yield takeLatest(EMPLOYER_PROFILE_REQ, employerProfileReqSaga);
    yield takeLatest(SEEKER_PROFILE_REQ, seekerProfileReqSaga);
}

export default profileSaga;
