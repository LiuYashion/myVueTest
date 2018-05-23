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
      <div>鼠标状态：{{this.mouseState}}</div>
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
      'mouseState'
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
      item.begin = {
        beginX: event.offsetX, 
        beginY: event.offsetY
      }
      this.SET_GLOBAL_NODE(item)
      event.dataTransfer.setData('Text', 'add');
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
      width: 80px;
      height: 40px;
      margin: 0 auto;
      line-height: 40px;
      text-align: center;
      border-radius: 4px;
      background: lightcyan;
    }
  }
  .debug-info{
    padding:20px
  }
</style>