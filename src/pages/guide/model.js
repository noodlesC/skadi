import { getAppList } from './service';

const Model = {
  namespace: 'guide',
  state: {
    appList: [],
  },
  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(getAppList, payload);
      yield put({
        type: 'save',
        payload: response,
      });
    },
  },
  reducers: {
    save(state, action) {
      return { ...state, appList: action.payload };
    },
  },
};
export default Model;
