import axios from 'axios';
import { call, put, select, takeLatest } from 'redux-saga/effects';
import ApiBase from '../../utils/apibase';
import EndPoint from '../../utils/endpoints';
import { ADMIN_USER_LIST_FAIL, ADMIN_USER_LIST_REQ, ADMIN_USER_LIST_RES } from '../actions/listActions';
import { startLoaderSaga, stopLoaderSaga } from './loader';

function* adminUserListReqSaga({ payload }) {
    try {
        // yield startLoaderSaga()
        const authToken = yield select((state) => state.auth.loginResponse.refreshToken.token);
        const headers = { 'Authorization': authToken }
        const response = yield call(axios.post, `${ApiBase}${EndPoint.AdminUserList}`, payload, { headers });
        if (response.status === 200) {
            yield put({ type: ADMIN_USER_LIST_RES, payload: response.data });
        } else {
            yield put({ type: ADMIN_USER_LIST_FAIL, error: response.error });
        }
        // yield stopLoaderSaga()
    } catch (error) {
        // yield stopLoaderSaga()
        yield put({ type: ADMIN_USER_LIST_FAIL, error: error.response });
    }
}

function* listSaga() {
    yield takeLatest(ADMIN_USER_LIST_REQ, adminUserListReqSaga);
}

export default listSaga;
