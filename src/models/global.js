import { queryMenus } from '@/services/user';

const GlobalModel = {
  namespace: 'global',
  state: {
    menus: [],
  },
  effects: {
    *fetchMenus(_, { call, put }) {
      const { data } = yield call(queryMenus);
      yield put({
        type: 'saveMenus',
        payload: data,
      });
    },
  },
  reducers: {
    changeLayoutCollapsed(state = { collapsed: true }, { payload }) {
      return {
        ...state,
        collapsed: payload,
      };
    },
    saveMenus(
      state = {
        menus: [],
      },
      { payload },
    ) {
      return {
        ...state,
        menus: payload,
      };
    },
  },
};
export default GlobalModel;
