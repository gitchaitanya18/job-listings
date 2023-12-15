import axios from 'axios';
import { call, put, select, takeLatest } from 'redux-saga/effects';
import ApiBase from '../../utils/apibase';
import EndPoint from '../../utils/endpoints';
import { ADMIN_DELETE_JOB_FAIL, ADMIN_DELETE_JOB_REQ, ADMIN_DELETE_JOB_RES, ADMIN_JOB_LIST_FAIL, ADMIN_JOB_LIST_REQ, ADMIN_JOB_LIST_RES, ADMIN_UPDATE_JOB_FAIL, ADMIN_UPDATE_JOB_REQ, ADMIN_UPDATE_JOB_RES, EMP_CREATE_JOB_FAIL, EMP_CREATE_JOB_REQ, EMP_CREATE_JOB_RES, EMP_DELETE_JOB_FAIL, EMP_DELETE_JOB_REQ, EMP_DELETE_JOB_RES, EMP_JOB_DETAIL_FAIL, EMP_JOB_DETAIL_REQ, EMP_JOB_DETAIL_RES, EMP_JOB_LIST_FAIL, EMP_JOB_LIST_REQ, EMP_JOB_LIST_RES, EMP_UPDATE_JOB_FAIL, EMP_UPDATE_JOB_REQ, EMP_UPDATE_JOB_RES, SEEKER_JOB_LIST_FAIL, SEEKER_JOB_LIST_REQ, SEEKER_JOB_LIST_RES } from '../actions/jobsActions';
import { startLoaderSaga, stopLoaderSaga } from './loader';

function* employerJobListReqSaga({ payload }) {
    try {
        // yield startLoaderSaga()
        const authToken = yield select((state) => state.auth.loginResponse.refreshToken.token);
        const headers = { 'Authorization': authToken }
        const response = yield call(axios.post, `${ApiBase}${EndPoint.EmployerJobList}`, payload, { headers });
        if (response.status === 200) {
            yield put({ type: EMP_JOB_LIST_RES, payload: response.data });
        } else {
            yield put({ type: EMP_JOB_LIST_FAIL, error: response.error });
        }
        // yield stopLoaderSaga()
    } catch (error) {
        // yield stopLoaderSaga()
        yield put({ type: EMP_JOB_LIST_FAIL, error: error.response });
    }
}

function* employerCreateJobReqSaga({ payload }) {
    try {
        yield startLoaderSaga()
        const authToken = yield select((state) => state.auth.loginResponse.refreshToken.token);
        const headers = { 'Authorization': authToken }
        const response = yield call(axios.post, `${ApiBase}${EndPoint.EmployerJobPost}`, payload, { headers });
        if (response.status === 200) {
            yield put({ type: EMP_CREATE_JOB_RES, payload: response.data });
        } else {
            yield put({ type: EMP_CREATE_JOB_FAIL, error: response.error });
        }
        yield stopLoaderSaga()
    } catch (error) {
        yield stopLoaderSaga()
        yield put({ type: EMP_CREATE_JOB_FAIL, error: error.response });
    }
}

function* employerUpdateJobReqSaga({ payload }) {
    try {
        yield startLoaderSaga()
        const authToken = yield select((state) => state.auth.loginResponse.refreshToken.token);
        const headers = { 'Authorization': authToken }
        const response = yield call(axios.post, `${ApiBase}${EndPoint.EmployerJobUpdate}`, payload, { headers });
        if (response.status === 200) {
            yield put({ type: EMP_UPDATE_JOB_RES, payload: response.data });
        } else {
            yield put({ type: EMP_UPDATE_JOB_FAIL, error: response.error });
        }
        yield stopLoaderSaga()
    } catch (error) {
        yield stopLoaderSaga()
        yield put({ type: EMP_UPDATE_JOB_FAIL, error: error.response });
    }
}

function* employerDeleteJobReqSaga({ payload }) {
    try {
        yield startLoaderSaga()
        const authToken = yield select((state) => state.auth.loginResponse.refreshToken.token);
        const headers = { 'Authorization': authToken }
        const response = yield call(axios.post, `${ApiBase}${EndPoint.EmployerDeleteJob}`, payload, { headers });
        if (response.status === 200) {
            yield put({ type: EMP_DELETE_JOB_RES, payload: response.data });
        } else {
            yield put({ type: EMP_DELETE_JOB_FAIL, error: response.error });
        }
        yield stopLoaderSaga()
    } catch (error) {
        yield stopLoaderSaga()
        yield put({ type: EMP_DELETE_JOB_FAIL, error: error.response });
    }
}

function* employerJobDetailReqSaga({ payload }) {
    try {
        // yield startLoaderSaga()
        const authToken = yield select((state) => state.auth.loginResponse.refreshToken.token);
        const headers = { 'Authorization': authToken }
        const response = yield call(axios.get, `${ApiBase}${EndPoint.EmployerJobDetail}${payload.id}`, { headers });
        if (response.status === 200) {
            yield put({ type: EMP_JOB_DETAIL_RES, payload: response?.data?.data?.job });
        } else {
            yield put({ type: EMP_JOB_DETAIL_FAIL, error: response.error });
        }
        // yield stopLoaderSaga()
    } catch (error) {
        // yield stopLoaderSaga()
        yield put({ type: EMP_JOB_DETAIL_FAIL, error: error.response });
    }
}

function* seekerJobListReqSaga({ payload }) {
    try {
        // yield startLoaderSaga() 
        const authToken = yield select((state) => state.auth.loginResponse.refreshToken.token);
        const headers = { 'Authorization': authToken }
        const response = yield call(axios.post, `${ApiBase}${EndPoint.SeekerJobList}`, payload, { headers });
        if (response.status === 200) {
            yield put({ type: SEEKER_JOB_LIST_RES, payload: response.data });
        } else {
            yield put({ type: SEEKER_JOB_LIST_FAIL, error: response.error });
        }
    } catch (error) {
        // yield stopLoaderSaga()
        yield put({ type: SEEKER_JOB_LIST_FAIL, error: error.response });
    }
}

function* adminJobListReqSaga({ payload }) {
    try {
        // yield startLoaderSaga() 
        const authToken = yield select((state) => state.auth.loginResponse.refreshToken.token);
        const headers = { 'Authorization': authToken }
        const response = yield call(axios.post, `${ApiBase}${EndPoint.AdminJobList}`, payload, { headers });
        if (response.status === 200) {
            yield put({ type: ADMIN_JOB_LIST_RES, payload: response.data });
        } else {
            yield put({ type: ADMIN_JOB_LIST_FAIL, error: response.error });
        }
    } catch (error) {
        // yield stopLoaderSaga()
        yield put({ type: ADMIN_JOB_LIST_FAIL, error: error.response });
    }
}

function* adminUpdateJobReqSaga({ payload }) {
    try {
        yield startLoaderSaga()
        const authToken = yield select((state) => state.auth.loginResponse.refreshToken.token);
        const headers = { 'Authorization': authToken }
        const jobPayload = {
            title: payload.title,
            description: payload.description,
            location: payload.location,
            salary: payload.salary,
            status: "active"
        };
        console.log('job update', payload, jobPayload, `${ApiBase}${EndPoint.AdminJobUpdate}${payload.id}`)
        const response = yield call(axios.put, `${ApiBase}${EndPoint.AdminJobUpdate}${payload.id}`, jobPayload, { headers });
        if (response.status === 200) {
            yield put({ type: ADMIN_UPDATE_JOB_RES, payload: response.data });
        } else {
            yield put({ type: ADMIN_UPDATE_JOB_FAIL, error: response.error });
        }
        yield stopLoaderSaga()
    } catch (error) {
        yield stopLoaderSaga()
        yield put({ type: ADMIN_UPDATE_JOB_FAIL, error: error.response });
    }
}

function* adminDeleteJobReqSaga({ payload }) {
    try {
        yield startLoaderSaga()
        const authToken = yield select((state) => state.auth.loginResponse.refreshToken.token);
        const headers = { 'Authorization': authToken }
        console.log('==>', payload, `${ApiBase}${EndPoint.AdminDeleteJob}${payload.id}`)
        const response = yield call(axios.delete, `${ApiBase}${EndPoint.AdminDeleteJob}${payload.id}`, { headers });
        if (response.status === 200) {
            yield put({ type: ADMIN_DELETE_JOB_RES, payload: response.data });
        } else {
            yield put({ type: ADMIN_DELETE_JOB_FAIL, error: response.error });
        }
        yield stopLoaderSaga()
    } catch (error) {
        yield stopLoaderSaga()
        yield put({ type: ADMIN_DELETE_JOB_FAIL, error: error.response });
    }
}

function* jobSaga() {
    yield takeLatest(EMP_JOB_LIST_REQ, employerJobListReqSaga);
    yield takeLatest(EMP_CREATE_JOB_REQ, employerCreateJobReqSaga);
    yield takeLatest(EMP_UPDATE_JOB_REQ, employerUpdateJobReqSaga);
    yield takeLatest(EMP_DELETE_JOB_REQ, employerDeleteJobReqSaga);
    yield takeLatest(EMP_JOB_DETAIL_REQ, employerJobDetailReqSaga);
    yield takeLatest(SEEKER_JOB_LIST_REQ, seekerJobListReqSaga);
    yield takeLatest(ADMIN_JOB_LIST_REQ, adminJobListReqSaga);
    yield takeLatest(ADMIN_UPDATE_JOB_REQ, adminUpdateJobReqSaga);
    yield takeLatest(ADMIN_DELETE_JOB_REQ, adminDeleteJobReqSaga);
}

export default jobSaga;
