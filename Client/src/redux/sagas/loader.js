import { put, takeLatest } from 'redux-saga/effects';
import { START_LOADER, STOP_LOADER, startLoader, stopLoader } from '../actions/loaderActions';

export function* startLoaderSaga() {
    yield put(startLoader());
}

export function* stopLoaderSaga() {
    yield put(stopLoader());
}

function* loaderSaga() {
    yield takeLatest(START_LOADER, startLoaderSaga);
    yield takeLatest(STOP_LOADER, stopLoaderSaga);
}

export default loaderSaga;
