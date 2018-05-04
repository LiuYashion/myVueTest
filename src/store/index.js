import Vue from 'vue'
import Vuex from 'vuex'
import flow from './flow'
// import _ from 'lodash'
import { cloneDeep } from 'lodash/fp'
// import { fromJS } from 'immutable'


Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    latestNode: '',
    name: 'weish',
    age: 22
  },
  getters: {
    personInfo(state) {
      return `My name is ${state.name}, I am ${state.age}`;
    }
  },
  mutations: {
    SET_AGE(state, age) {
      commit(age, age);
    }
  },
  actions: {
    nameAsyn({commit}) {
      setTimeout(() => {
        commit('SET_AGE', 18);
      }, 1000);
    }
  }
})
