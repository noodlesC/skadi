import { searchApi } from './service';

const SEARCH = {
  namespace: 'search',
  state: {
    dataSource: [],
    pagination: { current: 1, total: 0, pageSize: 10 },
  },
  effects: {
    *fetch({ payload }, { call, put }) {
      const { params } = payload;
      const { pageSize, page } = params || {};
      const response = yield call(searchApi, params);
      const {
        entities: { data = [], total },
      } = response || {};
      yield put({
        type: 'saveDataSource',
        payload: { data, total, pageSize, page },
      });
      return response;
    },
  },
  reducers: {
    saveDataSource(state, action) {
      const {
        payload: { data, total, pageSize, page },
      } = action;
      const { pagination } = state;
      return {
        ...state,
        dataSource: data,
        pagination: { ...pagination, pageSize, current: page, total },
      };
    },
  },
};
export default SEARCH;
