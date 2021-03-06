/*
  @version: 0.2
  @author: 71117124湛钊
  @date: 2019-8-30
*/

import AsyncStorage from '@react-native-community/async-storage';
import {postData} from './FetchHelper';

const keys = [
  'uuid',
  'password',
  'username',
  'phonenumber',
  'idcard',
  'studentid',
  'address',
  'avatarurl',
  'verified',
  'score',
  'token',
  'itemList',
  'info',
];

const publisherdUrl = 'http://hanyuu.top:8080/user/published';

class UserInfo {
  uuid = '';
  password = '';
  username = '';
  phonenumber = '';
  idcard = '';
  studentid = '';
  address = '';
  avatarurl = '';
  verified = '';
  score = '';
  token = '';
  itemList = '';
  info = '';

  /**
   * 获取
   * @param key
   * @returns {Promise<T>|*|Promise.<TResult>}
   */

  static get(key) {
    try {
      return AsyncStorage.getItem(key)
        .then(value => {
          const jsonValue = JSON.parse(value);
          return jsonValue;
        })
        .catch(e => {});
    } catch (e) {}
  }

  /**
   * 保存
   * @param key
   * @param value
   * @returns {*}
   */
  static save(key, value) {
    try {
      return AsyncStorage.setItem(key, JSON.stringify(value)).catch(e => {});
    } catch (e) {}
  }

  static saveUserInfo(userInfo) {
    this.save('uuid', userInfo.info.uuid);
    //this.save('password', userInfo.info.password);
    this.save('username', userInfo.info.username);
    this.save('phonenumber', userInfo.info.phonenumber);
    this.save('idcard', userInfo.info.idcard);
    this.save('studentid', userInfo.info.studentid);
    this.save('address', userInfo.info.address);
    this.save('avatarurl', 'http://hanyuu.top:8080/' + userInfo.info.avatarurl);
    this.save('verified', userInfo.info.verified);
    this.save('score', userInfo.info.score);
    this.save('token', userInfo.token);
    this.save('info', userInfo.info.info);
  }

  /**
   * 更新
   * @param key
   * @param value
   * @returns {Promise<T>|Promise.<TResult>}
   */
  static update(key, value) {
    return DeviceStorage.get(key).then(item => {
      value =
        typeof value === 'string' ? value : Object.assign({}, item, value);
      return AsyncStorage.setItem(key, JSON.stringify(value));
    });
  }

  /**
   * 更新
   * @param key
   * @returns {*}
   */
  static delete(key) {
    return AsyncStorage.removeItem(key);
  }
}

export default UserInfo;
