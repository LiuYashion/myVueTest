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
    mouseState:'Null',
    tempLink:{
      begin: 'N&1',
      end:{
        top: 500,
        left: 500
      },
      content:'xxxxxxxx'
    },
    nodeData:{
      'N&1':{
        id:'N&1',
        type: 'start',
        title: '开始',
        position: {
          top:90,
          left:90
        },
        begin:{
          beginX:0,
          beginY:0
        }
      },
      'N&2':{
        id:'N&2',
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
      'N&3':{
        id:'N&3',
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
        begin:'N&1',
        end:'N&2',
        content:'测试连线1'
      },
      'L&002':{
        begin:'N&1',
        end:'N&3',
        content:'测试连线'
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
    },
    ADD_NODE(state, item) {
      state.nodeData = {
        ...state.nodeData,
        [item.id]: item
      }
    },
    DELETE_NODE(state, item) {
      
    },
    SET_TEMP_LINK(state, link){
      state.tempLink = link
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
