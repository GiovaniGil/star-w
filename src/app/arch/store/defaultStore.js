import {
  DATA_TO_LIST,
  DATA_TO_CHANGE,
  CLEAR_STATE,
  LOADING,
  PAGINATION,
  FILTER,
} from './types';

export default (RequestClass) => {
  return {
    store: {
      namespaced: true,
      state: {
        list: [],
        data: {},
        loading: false,
        pagination: {
          page: 1,
          limit: 0,
          count: 0,
        },
        filters: {},
      },
      getters: {
        getList(state) {
          return state.list;
        },
        getData(state) {
          return state.data;
        },
        getLoading(state) {
          return state.loading;
        },
        getFilters(state) {
          return state.filters;
        },
        getPagination(state) {
          return {
            limit: state.pagination.limit,
            page: state.pagination.page,
          };
        },
        getCount(state) {
          return state.pagination.count;
        },
        getListFilter(state) {
          return state.filters;
        },
      },
      mutations: {
        setDataToList(state, payload) {
          const { data, count, page, limit } = payload;
          state.list = data;
          state.pagination.count = count;
          state.pagination.limit = limit;
          state.pagination.page = page;
        },
        setData(state, payload) {
          const { data } = payload;
          state.data = data;
        },
        clearState(state) {
          state.list = [];
          state.data = {};
          state.loading = false;
          state.pagination = {
            page: 1,
            limit: 10,
            count: 0,
          };
          state.filters = {};
        },
        setLoading(state, payload) {
          state.loading = payload;
        },
        setPagination(state, payload) {
          state.pagination.limit = payload.limit;
          state.pagination.page = payload.page;
        },
        setFilter(state, payload) {
          state.filters = {
            ...payload,
          };
          state.pagination.page = 1;
        },
      },
      actions: {
        setPagination({ commit }, data) {
          commit(PAGINATION, data);
        },
        setFilter({ commit }, data) {
          commit(FILTER, data);
        },
        setData({ commit }, data) {
          commit(LOADING, true);
          return new Promise((resolve, reject) => {
            RequestClass.get(data)
              .then((response) => {
                commit(DATA_TO_CHANGE, {
                  data: response.data,
                });
                resolve(response);
              })
              .catch((error) => {
                reject(error);
              })
              .finally(() => {
                commit(LOADING, false);
              });
          });
        },
        setDataToList({ commit }, data) {
          commit(LOADING, true);
          return new Promise((resolve, reject) => {
            RequestClass.list(data)
              .then((response) => {
                const results = response?.data?.results || [];
                const count = response?.data?.count || 0;
                const limit = count > 1 ? Math.ceil(count / 10) : 1;
                const page = data?.page || 1;

                commit(DATA_TO_LIST, {
                  data: results,
                  count,
                  limit,
                  page,
                });
                resolve(response);
              })
              .catch((error) => {
                reject(error);
              })
              .finally(() => {
                commit(LOADING, false);
              });
          });
        },
        clearState({ commit }) {
          commit(CLEAR_STATE);
        },
      },
    },
  };
};
