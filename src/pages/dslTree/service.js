import request from '@/utils/request';

export async function skadiSearchApi(params) {
  return request('/api/skadi/skadi/search/itemJson', {
    // return request('/skadi/search/itemJson', {
    method: 'POST',
    data: params,
  });
}
