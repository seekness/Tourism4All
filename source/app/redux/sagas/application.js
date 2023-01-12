import {all, call, delay, put, select, takeEvery} from 'redux-saga/effects';
import {actionTypes} from '@actions';
import api from '@api';
import {Setting} from '@configs';
import {DeviceModel, SettingModel} from '@models';
import {domainSelect, onboardSelect} from '@selectors';
import Navigator from '@navigator';
import {isValidURL} from '@utils';

/**
 * task for start application
 * @param action
 * @returns {Generator<*, void, *>}
 */
function* onStartApplication(action) {
  const domain = yield select(domainSelect);
  const onboard = yield select(onboardSelect);
  yield all([
    yield put({type: actionTypes.SYNC_DEVICE_INFO}),
    yield put({
      type: actionTypes.SAVE_DOMAIN,
      domain: domain ?? Setting.domain,
    }),
  ]);
  yield put({type: actionTypes.AUTH_CHECK});
  yield put({type: actionTypes.LOAD_HOME});
  yield put({type: actionTypes.LOAD_DISCOVERY});
  yield put({type: actionTypes.SYNC_SETTING});
  action.callback?.({success: true});

  if (onboard !== Setting.appVersion && !Setting.storeReview) {
    yield delay(1000);
    yield put({type: actionTypes.SAVE_ONBOARD, onboard: Setting.appVersion});
    Navigator.push('OnBoard', {allowChangeLanguage: true});
  }
}

/**
 * sync device info
 * @param action
 * @returns {Generator<*, void, *>}
 */
function* onDeviceSync(action) {
  const device = yield DeviceModel.fromDeviceInfo();
  if (action?.token) {
    device.token = action.token;
  }
  yield put({type: actionTypes.SAVE_DEVICE_INFO, device});
}

/**
 * sync setting of listing
 * @returns {Generator<*, void, *>}
 */
function* onSettingSync() {
  try {
    const response = yield call(api.getSetting);
    let setting = SettingModel.fromDefault();
    if (response.success) {
      setting = SettingModel.fromJson(response.data);
      yield put({type: actionTypes.SAVE_SETTING, setting});
    }
  } catch (error) {
    console.log(error.toString());
  }
}

/**
 * change domain
 * @param action
 * @returns {Generator<*, void, *>}
 */
function* onChangeDomain(action) {
  try {
    const valid = isValidURL(action.domain);
    if (valid) {
      yield put({type: actionTypes.LOGOUT});
      yield put({
        type: actionTypes.SAVE_DOMAIN,
        domain: action.domain,
      });
    }
    action.callback?.({
      success: valid,
      message: valid ? 'update_success' : 'not_is_domain',
    });
  } catch (error) {
    action.callback?.({success: true, message: error.message});
  }
}

function* watchStartApplication() {
  yield takeEvery(actionTypes.START_APPLICATION, onStartApplication);
}

function* watchSyncDeviceInfo() {
  yield takeEvery(actionTypes.SYNC_DEVICE_INFO, onDeviceSync);
}

function* watchSyncSetting() {
  yield takeEvery(actionTypes.SYNC_SETTING, onSettingSync);
}

function* watchChangeDomain() {
  yield takeEvery(actionTypes.CHANGE_DOMAIN, onChangeDomain);
}

export default function* applicationSagas() {
  yield all([
    watchStartApplication(),
    watchSyncDeviceInfo(),
    watchSyncSetting(),
    watchChangeDomain(),
  ]);
}
