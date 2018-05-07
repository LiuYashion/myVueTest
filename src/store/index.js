import Vue from 'vue'
import Vuex from 'vuex'
import flow from './flow'
// import _ from 'lodash'
import { cloneDeep } from 'lodash/fp'
// import { fromJS } from 'immutable'


Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    latestNode: 'null',
    nodeData:{
      'N&001':{
        id:'$1',
        type: 'start',
        title: '开始',
        position: {
          top:302,
          left: 100
        },
        begin:{
          beginX:0,
          beginY:0
        }
      },
      'N&002':{
        id:'$2',
        type: 'decision',
        title: '判断',
        position: {
          top:124,
          left: 320
        },
        begin:{
          beginX:0,
          beginY:0
        }
      },
      'N&003':{
        id:'$3',
        type: 'end',
        title: '结束',
        position: {
          top:120,
          left: 63
        },
        begin:{
          beginX:0,
          beginY:0
        }
      }
    },
    linkData:{
      'L&0123':{
        begin:'N&001',
        end:'N&002',
        content:'我是连线'
      },
      'L&0522':{
        begin:'N&001',
        end:'N&003',
        content:'我是连线'
      }
    },
    name: 'weish',
    age: 22
  },
  getters: {
    personInfo(state) {
      return `My name is ${state.name}, I am ${state.age}`;
    }
  },
  mutations: {
    SET_GLOBAL_NODE(state, type = 'unknown') {
      state.latestNode = type
    },
    UPDATE_NODE(state, item) {
      state.nodeData = {
        ...state.nodeData,
        [item.id]: {
          ...state.nodeData[item.id]
        }
      }
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
