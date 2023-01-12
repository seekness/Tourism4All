import {all, put, takeEvery, delay} from 'redux-saga/effects';
import * as actionTypes from '@actions/actionTypes';
import * as api from '@api';
import * as Notifications from 'expo-notifications';
import {UserModel} from '@models';

function* onLogin(action) {
  try {
    const {status} = yield Notifications.requestPermissionsAsync();
    if (status === 'granted') {
      const value = yield Notifications.getExpoPushTokenAsync();
      const token = value.data;
      yield put({type: actionTypes.SAVE_DEVICE_TOKEN, token});
    }

    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }
    delay(250);
    const response = yield api.fetchLogin(action.params);
    if (response.success) {
      const user = new UserModel(response.data);
      yield put({type: actionTypes.LOGIN_SUCCESS, user: user});
      yield put({type: actionTypes.GET_WISHLIST});
    }
    action.callback?.(response);
  } catch (error) {
    action.callback?.(error.response ?? error.message);
  }
}

function* onValid(action) {
  try {
    const response = yield api.fetchValid();
    if (response.code === 'jwt_auth_valid_token') {
      yield put({type: actionTypes.GET_WISHLIST});
      yield put({type: actionTypes.GET_USER_INFO});
    } else {
      yield put({type: actionTypes.LOGOUT});
    }
    action.callback?.(response);
  } catch (error) {
    yield put({type: actionTypes.LOGOUT});
    action.callback?.(error.response ?? error.message);
  }
}

function* onGetInfo(action) {
  try {
    const response = yield api.getUserInfo();
    if (response.success) {
      const user = new UserModel(response.data);
      yield put({type: actionTypes.UPDATE_USER, user: user});
    }
    action.callback?.(response);
  } catch (error) {
    action.callback?.(error.response ?? error.message);
  }
}

function* updateInfo(action) {
  try {
    const response = yield api.updateProfile(action.params);
    yield put({type: actionTypes.GET_USER_INFO});
    action.callback?.(response);
  } catch (error) {
    action.callback?.(error.response ?? error.message);
  }
}

function* watchLogin() {
  yield takeEvery(actionTypes.LOGIN, onLogin);
}

function* watchValid() {
  yield takeEvery(actionTypes.VALID_TOTEN, onValid);
}

function* watchGetInfo() {
  yield takeEvery(actionTypes.GET_USER_INFO, onGetInfo);
}

function* watchEditProfile() {
  yield takeEvery(actionTypes.ON_UPDATE_PROFILE, updateInfo);
}

export default function* authSagas() {
  yield all([watchLogin(), watchValid(), watchGetInfo(), watchEditProfile()]);
}
