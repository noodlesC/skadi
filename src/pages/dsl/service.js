import request from '@/utils/request';

export async function purcharserSearchApi(params) {
  return request('/api/skadi/skadi/search/itemJson', {
    // return request('/skadi/search/itemJson', {
    method: 'POST',
    data: params,
  });
}
