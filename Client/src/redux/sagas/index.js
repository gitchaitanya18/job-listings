import { all } from 'redux-saga/effects';
import applicationSaga from './application';
import authSaga from './auth';
import jobSaga from './job';
import listSaga from './list';
import profileSaga from './profile';
import userSaga from './user';

function* rootSaga() {
    yield all([
        authSaga(),
        listSaga(),
        profileSaga(),
        jobSaga(),
        applicationSaga(),
        userSaga()
    ]);
}

export default rootSaga;
