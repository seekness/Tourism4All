import axios from 'axios';
import url from 'url';
import {store} from '@store';
import i18n from 'i18next';

const getUrl = () => store.getState().config?.url;

const getToken = () => store.getState().auth?.user?.token;

const getDevice = () => store.getState().config?.device;

/**
 * class for for network client layer
 * @counterDownload handle dispose stack limit request download
 * @counterUpload handle dispose stack limit request upload
 * @class Api
 */

class Api {
  constructor() {
    this.counterDownload = 0;
    this.counterUpload = 0;
    this.uniqueRequest = {};
    this.network = this.setupInterceptors();
  }

  /**
   * setup member axios
   *
   * @returns
   * @memberof Api
   */
  setupInterceptors() {
    const api = axios.create({});

    api.interceptors.request.use(
      config => {
        const token = getToken();
        const device = getDevice();

        if (!config.url.startsWith('http')) {
          config.url = url.format(getUrl()) + config.url;
        }
        console.log('Before Request >>>', config);
        // Add more config before request
        if (token) {
          config.headers['Authorization'] = `Bearer ${token}`;
        }
        config.headers['Device-Id'] = device?.uniqueId;
        config.headers['Device-Name'] = device?.model;
        config.headers['Device-Model'] = device?.systemName;
        config.headers['Device-Version'] = device?.systemVersion;
        config.headers['Push-Token'] = device?.token;
        config.headers['Type'] = device?.deviceId;
        config.headers['Lang'] = i18n.language;
        config.timeout = 10000;
        return config;
      },
      error => {
        console.log('Error Request >>>', error);
        // Do something with response error
        return Promise.reject(error);
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
        // process more when exeption
        return Promise.reject(error);
      },
    );
    return api;
  }

  /**
   * Cancel all request
   *
   * @memberof Api
   */
  cancelAllRequest() {
    this.uniqueRequest.forEach(item => {});
  }

  /**
   * Cancel one request
   *
   * @param {*} key
   * @memberof Api
   */
  cancelRequest(key) {
    if (this.uniqueRequest?.[key]) {
      console.log('Cancel request key', key);
      this.uniqueRequest[key]?.cancel();
    }
  }

  /**
   *
   * remove one request
   * @param {*} key
   * @memberof Api
   */
  removeTokenRequest(key) {
    if (this.uniqueRequest?.[key]) {
      console.log('Remove uniqueRequest request key', key);
      this.uniqueRequest[key] = null;
    }
  }

  /**
   * Get Mothod
   *
   * @param {*} endPoint
   * @param {*} [params={}]
   * @param {*} [headers={}]
   * @param {*} uniqueRequest
   * @param {string} [responseType='json']
   * @returns
   * @memberof Api
   */
  async get(endPoint, {params, headers, uniqueRequest, responseType}) {
    let cancelToken;
    if (uniqueRequest) {
      this.cancelRequest(uniqueRequest);
      cancelToken = axios.CancelToken.source();
      this.uniqueRequest[uniqueRequest] = cancelToken;
    }
    try {
      const response = await this.network({
        method: 'get',
        url: endPoint,
        params: params ?? {},
        headers: headers ?? {},
        responseType: responseType ?? 'json',
        cancelToken: cancelToken?.token,
      });
      this.removeTokenRequest(uniqueRequest);
      return Promise.resolve(response.data);
    } catch (error) {
      this.removeTokenRequest(uniqueRequest);
      return Promise.reject(error);
    }
  }

  /**
   * Post Method
   *
   * @param {*} endPoint
   * @param {*} [payload={}]
   * @param {*} [headers={}]
   * @param {*} uniqueRequest
   * @returns
   * @memberof Api
   */
  async post(endPoint, {params, headers, uniqueRequest}) {
    let cancelToken;
    if (uniqueRequest) {
      this.cancelRequest(uniqueRequest);
      cancelToken = axios.CancelToken.source();
      this.uniqueRequest[uniqueRequest] = cancelToken;
    }
    return this.network({
      method: 'post',
      url: endPoint,
      data: params ?? {},
      headers: headers ?? {},
      cancelToken: cancelToken?.token,
    })
      .then(response => {
        this.removeTokenRequest(uniqueRequest);
        return Promise.resolve(response.data);
      })
      .catch(error => {
        this.removeTokenRequest(uniqueRequest);
        return Promise.reject(error);
      });
  }
}

const _API = new Api();

export default _API;
