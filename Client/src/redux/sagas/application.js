import axios from 'axios';
import { call, put, select, takeLatest } from 'redux-saga/effects';
import ApiBase from '../../utils/apibase';
import EndPoint from '../../utils/endpoints';
import { EMPLOYER_APPLY_LIST_FAIL, EMPLOYER_APPLY_LIST_REQ, EMPLOYER_APPLY_LIST_RES, SEEKER_APPLY_FAIL, SEEKER_APPLY_LIST_FAIL, SEEKER_APPLY_LIST_REQ, SEEKER_APPLY_LIST_RES, SEEKER_APPLY_REQ, SEEKER_APPLY_RES } from '../actions/applicationActions';
import { startLoaderSaga, stopLoaderSaga } from './loader';

function* seekerApplyReqSaga({ payload }) {
    try {
        yield startLoaderSaga()
        const authToken = yield select((state) => state.auth.loginResponse.refreshToken.token);
        const headers = { 'Authorization': authToken }
        const response = yield call(axios.post, `${ApiBase}${EndPoint.SeekerApply}`, payload, { headers });
        if (response.status === 200) {
            yield put({ type: SEEKER_APPLY_RES, payload: response.data });
        } else {
            yield put({ type: SEEKER_APPLY_FAIL, error: response.error });
        }
        yield stopLoaderSaga()
    } catch (error) {
        yield stopLoaderSaga()
        yield put({ type: SEEKER_APPLY_FAIL, error: error.response });
    }
}

function* seekerApplicationListReqSaga({ payload }) {
    try {
        // yield startLoaderSaga()
        const authToken = yield select((state) => state.auth.loginResponse.refreshToken.token);
        const headers = { 'Authorization': authToken }
        const response = yield call(axios.post, `${ApiBase}${EndPoint.SeekerApplicationList}`, payload, { headers });
        if (response.status === 200) {
            yield put({ type: SEEKER_APPLY_LIST_RES, payload: response.data.data.results });
        } else {
            yield put({ type: SEEKER_APPLY_LIST_FAIL, error: response.error });
        }
        // yield stopLoaderSaga()
    } catch (error) {
        // yield stopLoaderSaga()
        yield put({ type: SEEKER_APPLY_LIST_FAIL, error: error.response });
    }
}

function* employerApplicationListReqSaga({ payload }) {
    try {
        // yield startLoaderSaga()
        const authToken = yield select((state) => state.auth.loginResponse.refreshToken.token);
        const headers = { 'Authorization': authToken }
        const response = yield call(axios.post, `${ApiBase}${EndPoint.EmployerApplicationList}`, payload, { headers });
        if (response.status === 200) {
            yield put({ type: EMPLOYER_APPLY_LIST_RES, payload: response.data });
        } else {
            yield put({ type: EMPLOYER_APPLY_LIST_FAIL, error: response.error });
        }
        // yield stopLoaderSaga()
    } catch (error) {
        // yield stopLoaderSaga()
        yield put({ type: EMPLOYER_APPLY_LIST_FAIL, error: error.response });
    }
}

function* applicationSaga() {
    yield takeLatest(SEEKER_APPLY_REQ, seekerApplyReqSaga);
    yield takeLatest(SEEKER_APPLY_LIST_REQ, seekerApplicationListReqSaga);
    yield takeLatest(EMPLOYER_APPLY_LIST_REQ, employerApplicationListReqSaga);
}

export default applicationSaga;
