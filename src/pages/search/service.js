import request from '@/utils/request';

export async function searchApi(params) {
  debugger;
  return request('/api/skadi/skadi/search/simpleSearch', {
    // return request('/skadi/search/simpleSearch', {
    method: 'POST',
    data: params,
  });
}
