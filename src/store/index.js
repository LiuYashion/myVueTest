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
      '$1':{
        id:'$1',
        type: 'start',
        title: '开始',
        position: {
          top:50,
          left: 50
        },
        begin:{
          beginX:0,
          beginY:0
        }
      },
      '$2':{
        id:'$2',
        type: 'decision',
        title: '判断',
        position: {
          top:700,
          left: 400
        },
        begin:{
          beginX:0,
          beginY:0
        }
      },
      '$3':{
        id:'$3',
        type: 'end',
        title: '结束',
        position: {
          top:400,
          left:800
        },
        begin:{
          beginX:0,
          beginY:0
        }
      }
    },
    linkData:{
      'L&001':{
        begin:'$1',
        end:'$2',
        content:'测试连线1'
      },
      'L&002':{
        begin:'$1',
        end:'$3',
        content:'测试连线'
      },
      'L&003':{
        begin:'$3',
        end:'$2',
        content:'测试连线'
      },
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
