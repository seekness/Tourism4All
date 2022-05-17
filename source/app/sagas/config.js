import {all, put, takeEvery, delay} from 'redux-saga/effects';
import url from 'url';
import * as actionTypes from '@actions/actionTypes';
import * as api from '@api';
import {SettingModel} from '@models';
import {BaseSetting} from '@config';
import DeviceInfo from 'react-native-device-info';

export function* onSetup(action) {
  const urlObject = url.parse(
    [BaseSetting.protocol, action.domain].join('://'),
  );
  yield put({type: actionTypes.SAVE_URL, url: urlObject});
  yield put({type: actionTypes.SYNC_DEVICE_INFO});
  yield delay(250);
  try {
    const response = yield api.getSetting();
    if (response.success) {
      const setting = new SettingModel(response.data);
      yield put({type: actionTypes.SAVE_SETTING, setting});
    }
  } catch (error) {}
  yield put({type: actionTypes.FETCH_HOME});

  if (action.user) {
    yield put({type: actionTypes.VALID_TOTEN, callback: action.callback});
  } else {
    action.callback?.();
  }
}

export function* onDeviceSync(action) {
  let device = {};
  device.uniqueId = DeviceInfo.getUniqueId();
  device.deviceId = DeviceInfo.getDeviceId();
  device.bundleId = DeviceInfo.getBundleId();
  device.systemName = DeviceInfo.getSystemName();
  device.systemVersion = DeviceInfo.getSystemVersion();
  device.version = DeviceInfo.getVersion();
  device.readableVersion = DeviceInfo.getReadableVersion();
  device.buildNumber = DeviceInfo.getBuildNumber();
  device.isTablet = DeviceInfo.isTablet();
  device.appName = DeviceInfo.getApplicationName();
  device.brand = DeviceInfo.getBrand();
  device.model = DeviceInfo.getModel();
  device.deviceType = DeviceInfo.getDeviceType();
  yield put({type: actionTypes.SAVE_DEVICE_INFO, device});
}

function* watchSetup() {
  yield takeEvery(actionTypes.SETUP_CONFIG, onSetup);
}

function* syncDeviceInfo() {
  yield takeEvery(actionTypes.SYNC_DEVICE_INFO, onDeviceSync);
}

export default function* configSagas() {
  yield all([watchSetup(), syncDeviceInfo()]);
}
