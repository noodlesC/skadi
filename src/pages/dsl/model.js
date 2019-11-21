import { purcharserSearchApi } from './service';
import { wrap } from '../../utils/utils';

const DSL = {
  namespace: 'dsl',
  state: {
    purcharses: [],
    data: [],
    length: 0,
    total: 0,
    entities: [],
  },
  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(purcharserSearchApi, payload);
      const {
        entities: { data = [], total = 0 },
      } = response || {};
      const purcharses = [];
      let maxLength = 0;
      data.forEach(item => {
        const { explanation, ...others } = item;
        const { details = [] } = explanation || {};
        const { data: result, length } = wrap(details);
        maxLength = Math.max(maxLength, length);
        const purcharse = { ...others, ...result };
        purcharses.push(purcharse);
      });

      yield put({
        type: 'savePurcharser',
        payload: { purcharses, length: maxLength, total, data },
      });
      return purcharses;
    },
  },
  reducers: {
    savePurcharser(state, { payload }) {
      const { purcharses, length, total, data } = payload;
      return { ...state, purcharses, length, total, entities: data };
    },
  },
};
export default DSL;
