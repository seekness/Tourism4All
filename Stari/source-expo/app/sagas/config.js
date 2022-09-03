import {all, put, takeEvery, delay} from 'redux-saga/effects';
import url from 'url';
import * as actionTypes from '@actions/actionTypes';
import * as api from '@api';
import {SettingModel} from '@models';
import {BaseSetting} from '@config';
import * as Device from 'expo-device';

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
  device.deviceId = Device.modelName;
  device.systemName = Device.osName;
  device.systemVersion = Device.osVersion;
  device.model = Device.osInternalBuildId;
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
