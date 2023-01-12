import * as DeviceInfo from 'expo-device';
import {Setting} from '@configs';
import {Platform} from 'react-native';

export default class DeviceModel {
  constructor(data) {
    this.appVersion = data.appVersion;
    this.brand = data.brand;
    this.buildNumber = data.buildNumber;
    this.bundleId = data.bundleId;
    this.deviceId = data.deviceId;
    this.deviceType = data.deviceType;
    this.model = data.model;
    this.systemName = data.systemName;
    this.systemVersion = data.systemVersion;
    this.buildNumber = data.buildNumber;
    this.token = data.token;
  }

  static async fromDeviceInfo() {
    try {
      return new DeviceModel({
        appVersion: Setting.appVersion,
        brand: DeviceInfo.brand,
        deviceId: DeviceInfo.modelId,
        deviceType: DeviceInfo.DeviceType,
        model: DeviceInfo.modelName,
        systemName: Platform.OS,
        systemVersion: Platform.Version,
      });
    } catch (e) {
      console.log(e.toString());
    }
  }
}
