import Vue from 'vue'
import Vuex from 'vuex'
// import flow from './flow'
// // import _ from 'lodash'
// import { cloneDeep } from 'lodash/fp'
// // import { fromJS } from 'immutable'


Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    latestNode: 'null',
    mouseState:'Null',
    tempLink:{
      begin: 'N&1',
      end:{
        top: 50,
        left: 300
      },
      content:'xxxxxxxx'
    },
    nodeData:{
      'N&1':{
        id: 'N&1',
        type: 'start',
        title: '开始',
        position: { top:100, left:100 },
        begin: { beginX:0,beginY:0 }
      },
      'N&2':{
        id: 'N&2',
        type: 'start',
        title: '开始',
        position: { top:600, left:100 },
        begin: { beginX:0,beginY:0 }
      },
      'N&3':{
        id: 'N&3',
        type: 'start',
        title: '开始',
        position: { top:350, left:350 },
        begin: { beginX:0,beginY:0 }
      },
      'N&4':{
        id: 'N&4',
        type: 'start',
        title: '开始',
        position: { top:100, left:600 },
        begin: { beginX:0,beginY:0 }
      },
      'N&5':{
        id: 'N&5',
        type: 'start',
        title: '开始',
        position: { top:600, left:600 },
        begin: { beginX:0,beginY:0 }
      },
    },
    linkData:{
      // 'L&001':{
      //   begin:'N&1', end:'N&2', content:''
      // },
      // 'L&002':{
      //   begin:'N&2', end:'N&5', content:''
      // },
      // 'L&003':{
      //   begin:'N&5', end:'N&4', content:''
      // },
      // 'L&004':{
      //   begin:'N&4', end:'N&1', content:''
      // },
      // 'L&005':{
      //   begin:'N&3', end:'N&1', content:''
      // },
      // 'L&006':{
      //   begin:'N&3', end:'N&2', content:''
      // },
      'L&007':{
        begin:'N&3', end:'N&4', content:''
      },
      // 'L&008':{
      //   begin:'N&3', end:'N&5', content:''
      // },
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
