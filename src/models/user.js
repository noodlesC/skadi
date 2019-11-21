import { queryCurrent, queryBaseInfo } from '@/services/user';

const UserModel = {
  namespace: 'user',
  state: {
    currentUser: {},
    menus: [],
    urls: {},
    btns: {},
  },
  effects: {
    *fetchCurrent(_, { call, put }) {
      let response = yield call(queryCurrent);
      response = response || '{}';
      yield put({
        type: 'saveCurrentUser',
        payload: JSON.parse(response),
      });
    },
    *fetchBaseInfo(_, { call, put }) {
      const { success, data } = yield call(queryBaseInfo);
      if (success) {
        yield put({
          type: 'saveBaseInfo',
          payload: data,
        });
      }
    },
  },
  reducers: {
    saveCurrentUser(state, action) {
      return { ...state, currentUser: action.payload || {} };
    },
    saveBaseInfo(state, action) {
      const { menus, urls, btns } = action.payload;
      const urlsMap = {};
      const btnsMap = {};
      if (urls) {
        urls.map(item => {
          urlsMap[item.value] = true;
          return item;
        });
      }
      if (btns) {
        btns.map(item => {
          btnsMap[item.value] = true;
          return item;
        });
      }
      return { ...state, menus, urls: urlsMap, btns: btnsMap };
    },
  },
};
export default UserModel;
