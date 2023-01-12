import {
  all,
  call,
  debounce,
  put,
  select,
  takeEvery,
  delay,
} from 'redux-saga/effects';
import * as Notifications from 'expo-notifications';
import {Platform} from 'react-native';
import {actionTypes} from '@actions';
import api from '@api';
import {UserModel} from '@models';
import {userSelect} from '@selectors';
import {Toast} from '@components';

/**
 * on handle auth check
 * @param action
 * @returns {Generator<*, void, *>}
 */
function* onAuthCheck(action) {
  try {
    const user = yield select(userSelect);
    if (user?.token) {
      const response = yield call(api.validateToken);
      if (response.code === 'jwt_auth_valid_token') {
        yield put({type: actionTypes.FETCH_USER});
        yield put({type: actionTypes.LOAD_WISHLIST});
      } else {
        Toast.show(response?.message ?? response?.code);
      }
    }
  } catch (error) {
    action.callback?.({
      success: false,
      message: error?.response?.data?.message ?? error?.message,
    });
  }
}

/**
 * on handle login
 * @param action
 * @returns {Generator<*, void, *>}
 */
function* onLogin(action) {
  try {
    const {status} = yield Notifications.requestPermissionsAsync();
    if (status === 'granted') {
      const token = (yield Notifications.getExpoPushTokenAsync()).data;
      if (token) {
        yield put({type: actionTypes.SYNC_DEVICE_INFO, token});
        yield delay(200);
      }
    }
    if (Platform.OS === 'android') {
      yield Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
      });
    }

    const response = yield call(api.login, action.params);
    if (response.success) {
      const user = UserModel.fromJson(response.data);
      yield put({type: actionTypes.SAVE_USER, user});
      yield put({type: actionTypes.LOAD_WISHLIST});
    }
    action.callback?.({success: response.success, message: response.message});
  } catch (error) {
    action.callback?.({
      success: false,
      message: error?.response?.data?.message ?? error?.message,
    });
  }
}

/**
 * handle register
 * @param action
 * @returns {Generator<*, void, *>}
 */
function* onRegister(action) {
  try {
    const response = yield call(api.register, action.params);
    action.callback?.({
      success: response.code === 200,
      message: response.message ?? response.msg,
    });
  } catch (error) {
    action.callback?.({success: false, message: error.message});
  }
}

/**
 * handle forgot password
 * @param action
 * @returns {Generator<*, void, *>}
 */
function* onForgot(action) {
  try {
    const response = yield call(api.forgotPassword, action.params);
    action.callback?.({
      success: response.success,
      message: response.message ?? response.msg,
    });
  } catch (error) {
    action.callback?.({success: false, message: error.message});
  }
}

/**
 * on handle logout
 * @param action
 * @returns {Generator<*, void, *>}
 */
function* onLogout(action) {
  try {
    yield put({type: actionTypes.LOGOUT_SUCCESS});
    yield put({type: actionTypes.RESET_WISHLIST});
    action.callback?.({success: true});
  } catch (error) {
    action.callback?.({success: false, message: error.message});
  }
}

/**
 * handle edit profile
 * @param action
 * @returns {Generator<*, void, *>}
 */
function* onEditProfile(action) {
  try {
    const response = yield call(api.editProfile, action.params);
    const success = !response.code;
    if (success) {
      yield put({type: actionTypes.FETCH_USER});
    }
    action.callback?.({
      success: success,
      message: response.code ?? 'update_success',
    });
  } catch (error) {
    action.callback?.({success: false, message: error.message});
  }
}

/**
 * handle fetch user data
 * @param action
 * @returns {Generator<*, void, *>}
 */
function* onFetchUser(action) {
  try {
    const response = yield call(api.getUser);
    if (response.success) {
      const user = UserModel.fromJson(response.data);
      yield put({type: actionTypes.SAVE_USER, user: user.dataNotEmpty});
    }
    action.callback?.({
      success: response.success,
      message: response.message,
    });
  } catch (error) {
    action.callback?.({success: false, message: error.message});
  }
}

/**
 * handle change password
 * @param action
 * @returns {Generator<*, void, *>}
 */
function* onChangePassword(action) {
  try {
    const response = yield call(api.changePassword, action.params);
    action.callback?.({
      success: response.code == null,
      message: response.code ?? 'update_success',
    });
  } catch (error) {
    action.callback?.({success: false, message: error.message});
  }
}

/**
 * handle deactivate account
 * @param action
 * @returns {Generator<*, void, *>}
 */
function* onDeactivate(action) {
  try {
    const response = yield call(api.deactivateAccount);
    yield put({type: actionTypes.LOGOUT});
    action.callback?.({
      success: response.success,
      message: response.message,
    });
  } catch (error) {
    action.callback?.({success: false, message: error.message});
  }
}

function* watchAuthCheck() {
  yield takeEvery(actionTypes.AUTH_CHECK, onAuthCheck);
}

function* watchLogin() {
  yield takeEvery(actionTypes.LOGIN, onLogin);
}

function* watchRegister() {
  yield takeEvery(actionTypes.REGISTER, onRegister);
}

function* watchForgot() {
  yield takeEvery(actionTypes.FORGOT, onForgot);
}

function* watchLogout() {
  yield takeEvery(actionTypes.LOGOUT, onLogout);
}

function* watchEditProfile() {
  yield takeEvery(actionTypes.EDIT_PROFILE, onEditProfile);
}

function* watchFetchUser() {
  yield takeEvery(actionTypes.FETCH_USER, onFetchUser);
}

function* watchChangePassword() {
  yield takeEvery(actionTypes.CHANGE_PASSWORD, onChangePassword);
}

function* watchExpireToken() {
  yield debounce(500, actionTypes.EXPIRE_TOKEN, onLogout);
}

function* watchDeactivate() {
  yield takeEvery(actionTypes.DEACTIVATE, onDeactivate);
}

export default function* authSagas() {
  yield all([
    watchLogin(),
    watchAuthCheck(),
    watchForgot(),
    watchLogout(),
    watchRegister(),
    watchEditProfile(),
    watchFetchUser(),
    watchChangePassword(),
    watchExpireToken(),
    watchDeactivate(),
  ]);
}
