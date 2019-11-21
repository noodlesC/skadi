import request from '@/utils/request';
import { getUserInfo } from '@/utils/user';

export async function queryCurrent() {
  return new Promise(resolve => {
    let userInfo = getUserInfo();
    userInfo = userInfo || '';
    setTimeout(() => {
      resolve(userInfo);
    }, 1000);
  });
}

export async function queryMenus() {
  return request('/resource/menusByApp');
}

export async function queryBaseInfo() {
  return request('/resource/getBaseInfo');
}
