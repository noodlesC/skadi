import request from '@/utils/request';

export async function queryAnalyze(params) {
  return request('/api/skadi/skadi/search/analyze', {
    // return request('/skadi/search/analyze', {
    method: 'POST',
    data: params,
  });
}
