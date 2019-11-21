import request from '@/utils/request';

export async function queryAnalyze(params) {
  return request('/items-read/_analyze', {
    method: 'POST',
    data: params,
  });
}
