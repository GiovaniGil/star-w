import Vue from 'vue';
import Vuex from 'vuex';

import peopleStore from '@/app/store/people';
import filmsStore from '@/app/store/films';

Vue.use(Vuex);

const COLOR_MODE = 'setColorMode';

export default new Vuex.Store({
  state: {
    colorMode: 'light',
  },
  getters: {},
  mutations: {
    setColorMode(state, payload) {
      state.colorMode = payload;
    },
  },
  actions: {
    setColorMode({ commit }, data) {
      commit(COLOR_MODE, data);
    },
  },
  modules: {
    peopleStore,
    filmsStore,
  },
});
