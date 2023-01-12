import axios from 'axios';
import * as FileSystem from 'expo-file-system';
import {store} from '@store';
import {authActions} from '@actions';
import Navigator from '@navigator';
import {getFileName} from '@utils';
import {deviceSelect, domainSelect, userSelect} from '@selectors';

const getToken = () => userSelect(store.getState())?.token;
const getDevice = () => deviceSelect(store.getState());
const getDomain = () => domainSelect(store.getState());

/**
 * class for for network client layer
 */

class HTTP {
  constructor() {
    this.http = this.setupInterceptors();
    this.exceptionCode = ['jwt_auth_bad_iss', 'jwt_auth_invalid_token'];
  }

  /**
   * setup member axios
   *
   * @returns
   * @memberof Api
   */
  setupInterceptors() {
    const api = axios.create({
      timeout: 30000,
    });
    api.interceptors.request.use(
      config => {
        const token = getToken();
        const device = getDevice();
        if (!config.baseURL) {
          config.baseURL = `${getDomain()}/index.php/wp-json`;
        }
        console.log('Before Request >>>', config);
        // Add more config before request
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        if (device) {
          config.headers['Device-Id'] = device.deviceId;
          config.headers['Device-Model'] = device.model;
          config.headers['Device-Version'] = device.systemVersion;
          config.headers['Device-Token'] = device.token;
          config.headers.Type = device.systemName;
        }
        return config;
      },
      error => {
        console.log('Error Request >>>', error);
        // Do something with response error
        return new Promise.reject(error);
      },
    );

    api.interceptors.response.use(
      response => {
        console.log('After Request >>>', response);
        // process more after response
        return response;
      },
      error => {
        console.log('Error Response >>>', error);
        // process more when exception
        const code = error.response?.data?.code;
        const message = error.response?.data?.message;
        if (code && this.exceptionCode.includes(code)) {
          Navigator.popToTop();
          store.dispatch(authActions.onExpire());
        }
        if (message) {
          error = new Error(message);
        }
        return new Promise.reject(error);
      },
    );
    return api;
  }

  /**
   * get method
   * @param endPoint
   * @param params
   * @param headers
   * @param responseType
   * @param loading
   * @returns {Promise<unknown>}
   */
  async get(endPoint, {params, headers, responseType, loading = false}) {
    if (loading) {
      Navigator.showLoading({loading: true});
    }
    try {
      const response = await this.http.get(endPoint, {
        params: params ?? {},
        headers: headers ?? {},
        responseType: responseType ?? 'json',
      });
      if (loading) {
        Navigator.showLoading({loading: false});
      }
      return Promise.resolve(response.data);
    } catch (error) {
      if (loading) {
        Navigator.showLoading({loading: false});
      }
      return Promise.reject(error);
    }
  }

  /**
   * post method
   * @param endPoint
   * @param params
   * @param headers
   * @param loading
   * @param onProgress
   * @returns {Promise<unknown>}
   */
  async post(endPoint, {params, headers, loading = false, onProgress}) {
    if (loading) {
      Navigator.showLoading({loading: true});
    }
    try {
      const response = await this.http.post(endPoint, params, {
        headers: headers,
        onUploadProgress: event => {
          const percent = (event.loaded / event.total) * 100;
          onProgress?.(percent);
        },
      });
      if (loading) {
        Navigator.showLoading({loading: false});
      }
      return Promise.resolve(response.data);
    } catch (error) {
      if (loading) {
        Navigator.showLoading({loading: false});
      }
      return Promise.reject(error);
    }
  }

  /**
   * upload method
   * @param endPoint
   * @param params
   * @param headers
   * @param loading
   * @param onProgress
   * @returns {Promise<unknown>}
   */
  async download(endPoint, {params, headers, loading = false, onProgress}) {
    if (loading) {
      Navigator.showLoading({loading: true});
    }
    const fileName = getFileName(endPoint) ?? Date.now();
    const storePath = `${FileSystem.documentDirectory}/${fileName}`;

    const instance = FileSystem.createDownloadResumable(
      endPoint,
      storePath,
      {headers},
      e => {
        const value = (e.totalBytesWritten / e.totalBytesExpectedToWrite) * 100;
        onProgress?.(value);
      },
    );
    try {
      const {uri} = await instance.downloadAsync();
      if (loading) {
        Navigator.showLoading({loading: false});
      }
      return Promise.resolve(uri);
    } catch (e) {
      if (loading) {
        Navigator.showLoading({loading: false});
      }
      return Promise.reject(error);
    }
  }
}

export default new HTTP();
