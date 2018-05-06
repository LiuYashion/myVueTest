<template>
  <div id="tools" class="tools">
    <ul>
      <li class="tools-item" v-for="(item, index) in toolItems" :key="index">
        <div 
          draggable="true" 
          @mousedown="selectNode(item)" 
          @dragstart="dragNode(item)"
        >
          {{item.title}}
        </div>
      </li>
    </ul>
    <div class="debug-info">
      <div>debug info</div>
      <div>当前节点：{{this.latestNode}}</div>
    </div>
  </div>
</template>

<script>

import { mapMutations, mapState } from 'vuex';

export default {
  name: 'tools',
  data(){
    return {
      toolItems:[{
        type: 'start',
        title: '开始'
      },{
        type: 'decision',
        title: '判断'
      },{
        type: 'end',
        title: '结束'
      }]
    }
  },
  computed:{
    ...mapState([
      'latestNode',

    ])
  },
  methods:{
    ...mapMutations([
      'SET_GLOBAL_NODE',
    ]),
    selectNode(item){
      this.SET_GLOBAL_NODE(item.type)
    },
    dragNode(item){
      console.log(222222)
    }
  }
}
</script>

<style lang="scss">
  .tools{
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    width: 200px;
    background: #ccc;
  }
  .tools-item{
    margin-top: 10px;
    div{
      width: 60px;
      height: 60px;
      margin: 0 auto;
      line-height: 60px;
      text-align: center;
      border-radius: 4px;
      background: lightcyan;
    }
  }
  .debug-info{
    padding:20px
  }
</style>