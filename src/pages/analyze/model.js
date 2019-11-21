import { queryAnalyze } from './service';

const Search = {
  namespace: 'analyze',
  state: {
    tokens: [],
  },
  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryAnalyze, payload);
      const { tokens = [] } = response || {};
      yield put({
        type: 'saveTokens',
        payload: tokens,
      });
      return response;
    },
  },
  reducers: {
    saveTokens(state, action) {
      return { ...state, tokens: action.payload };
    },
  },
};
export default Search;
