import axios from 'axios';
import { call, delay, put, takeLatest } from 'redux-saga/effects';
import ApiBase from '../../utils/apibase';
import EndPoint from '../../utils/endpoints';
import { LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, REGISTER_FAIL, REGISTER_REQ, REGISTER_RES } from '../actions/authActions';
import { startLoaderSaga, stopLoaderSaga } from './loader';
import { showToast } from '../../utils/methods';

function* loginRequestSaga({ payload }) {
    try {
        yield startLoaderSaga()
        let Login = ''
        if (payload.loginType === 'Admin') {
            Login = EndPoint.AdminLogin
        } else if (payload.loginType === 'Employer') {
            Login = EndPoint.EmployerLogin
        } else {
            Login = EndPoint.SeekerLogin
        }
        let data = { email: payload.email, password: payload.password }
        const response = yield call(axios.post, `${ApiBase}${Login}`, data);
        if (response.status === 200) {
            showToast(response.data.message, 'green')
            yield put({ type: LOGIN_SUCCESS, payload: response.data });
        } else {
            showToast(response.data.message, 'red')
            yield put({ type: LOGIN_FAILURE, error: response.error });
        }
        yield stopLoaderSaga()
    } catch (error) {
        yield stopLoaderSaga()
        yield put({ type: LOGIN_FAILURE, error: error.response });
    }
}

function* registerRequestSaga({ payload }) {
    try {
        yield startLoaderSaga()
        let Register = '';
        if (payload.loginType === 'EMPLOYER') {
            Register = EndPoint.EmployerRegister
        } else {
            Register = EndPoint.SeekerRegister
        }
        let data = { username: payload.name, email: payload.email, password: payload.password, role: payload.loginType }
        console.log('Payload', payload, Register, data)
        const response = yield call(axios.post, `${ApiBase}${Register}`, data);
        console.log('res', response)
        if (response.status === 200) {
            showToast(response.data.message, 'green')
            yield put({ type: REGISTER_RES, payload: response.data });
        } else {
            showToast(response.data.message, 'red')
            yield put({ type: REGISTER_FAIL, error: response.error });
        }
        yield stopLoaderSaga()
    } catch (error) {
        yield stopLoaderSaga()
        yield put({ type: REGISTER_FAIL, error: error.response });
    }
}

function* authSaga() {
    yield takeLatest(LOGIN_REQUEST, loginRequestSaga);
    yield takeLatest(REGISTER_REQ, registerRequestSaga);
}

export default authSaga;
