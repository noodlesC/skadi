import request from '@/utils/request';

export async function getAppList() {
  return request('/api/app');
}
