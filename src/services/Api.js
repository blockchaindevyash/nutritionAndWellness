import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export default class Api {
  static baseUrl1 = 'https://nutriwellness.medendx.com/api/';
}

export const onLoginApi = async requestData => {
  const url = Api.baseUrl1 + 'auth/login';
  console.log('Get URL>>', url);
  return new Promise((resolve, reject) => {
    axios
      .post(url, requestData, {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      })
      .then(res => resolve(res))
      .catch(err => reject(err));
  });
};

export const onRegistrationApi = async requestData => {
  console.log('get requestData>>', requestData);
  const url = Api.baseUrl1 + 'auth/register';
  return new Promise((resolve, reject) => {
    axios
      .post(url, requestData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Accept: 'application/json',
        },
      })
      .then(res => resolve(res))
      .catch(err => reject(err));
  });
};

export const onForgotPasswordApi = async requestData => {
  const url = Api.baseUrl1 + 'auth/forgot-password';
  return new Promise((resolve, reject) => {
    axios
      .post(url, requestData, {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      })
      .then(res => resolve(res))
      .catch(err => reject(err));
  });
};

export const onDeleteCommonApi = async urlData => {
  const token = await AsyncStorage.getItem('accessToken');
  const url = Api.baseUrl1 + urlData;
  console.log('Get  Url:::', url);
  return new Promise((resolve, reject) => {
    axios
      .delete(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(res => resolve(res))
      .catch(err => reject(err));
  });
};

export const onGetWithoutTokenCommonApi = async urlData => {
  const url = Api.baseUrl1 + urlData;
  console.log('Get Url:::', url);
  return new Promise((resolve, reject) => {
    axios
      .get(url)
      .then(res => resolve(res))
      .catch(err => reject(err));
  });
};

export const onGetCommonApi = async urlData => {
  const token = await AsyncStorage.getItem('accessToken');
  const url = Api.baseUrl1 + urlData;
  console.log('Get Url:::', url);
  return new Promise((resolve, reject) => {
    axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(res => resolve(res))
      .catch(err => reject(err));
  });
};

export const onGetSpecificCommonApi = async urlData => {
  const token = await AsyncStorage.getItem('accessToken');
  const url = Api.baseUrl1 + urlData;
  console.log('Get Url:::', url);
  return new Promise((resolve, reject) => {
    axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(res => resolve(res))
      .catch(err => reject(err));
  });
};

export const onAddCommonJsonApi = async (dataUrl, requestData) => {
  const token = await AsyncStorage.getItem('accessToken');
  const url = Api.baseUrl1 + dataUrl;
  console.log('Get Login Url:::', url);
  return new Promise((resolve, reject) => {
    axios
      .post(url, requestData, {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
      .then(res => resolve(res))
      .catch(err => reject(err));
  });
};

export const onAddCommonFormApi = async (dataUrl, requestData) => {
  const token = await AsyncStorage.getItem('accessToken');
  const url = Api.baseUrl1 + dataUrl;
  console.log('Get Login Url:::', url);
  return new Promise((resolve, reject) => {
    axios
      .post(url, requestData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      })
      .then(res => resolve(res))
      .catch(err => reject(err));
  });
};

export const onEditCommonFormApi = async (dataUrl, requestData) => {
  const token = await AsyncStorage.getItem('accessToken');
  const url = Api.baseUrl1 + dataUrl;
  console.log('Get Login Url:::', url);
  return new Promise((resolve, reject) => {
    axios
      .patch(url, requestData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      })
      .then(res => resolve(res))
      .catch(err => reject(err));
  });
};

export const onEditCommonJsonApi = async (dataUrl, requestData) => {
  const token = await AsyncStorage.getItem('accessToken');
  const url = Api.baseUrl1 + dataUrl;
  console.log('Get Login Url:::', url);
  return new Promise((resolve, reject) => {
    axios
      .patch(url, requestData, {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
      .then(res => resolve(res))
      .catch(err => reject(err));
  });
};
