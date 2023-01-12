import DeviceInfo from 'react-native-device-info';

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
        appVersion: DeviceInfo.getVersion(),
        brand: DeviceInfo.getBrand(),
        buildNumber: DeviceInfo.getBuildNumber(),
        bundleId: DeviceInfo.getBundleId(),
        deviceId: await DeviceInfo.getUniqueId(),
        deviceType: DeviceInfo.getDeviceType(),
        model: DeviceInfo.getModel(),
        systemName: DeviceInfo.getSystemName(),
        systemVersion: DeviceInfo.getSystemVersion(),
      });
    } catch (e) {
      console.log(e.toString());
    }
  }
}
