<template>
  <div>

    <!-- 节点内容 -->
    <flow-block  
      @arrowPointEnter="arrowPointEnter"
      @arrowPointLeave="arrowPointLeave" 
      @nodeDragging="nodeDragging" 
      :item="item"
      :class="item.type"
    ></flow-block>

    <!-- 节点周围拖拽的点 -->
    <flow-arrow 
      @arrowPointEnter="arrowPointEnter"
      @arrowPointLeave="arrowPointLeave" 
      v-if="toolVisisable"
      :item="item"
    ></flow-arrow>

  </div>
</template>

<script>

import { mapMutations, mapState } from 'vuex';

import { getRandomID } from '../utils';

import FlowBlock  from './FlowBlock';
import FlowArrow  from './FlowArrow';


export default {
  name: 'canvas-paper',
  data(){
    return {
      toolVisisable: false
    }
  },
  props:{
    item: {
      type: Object
    }
  },
  components:{
    FlowBlock,
    FlowArrow
  },
  computed:{
    ...mapState([
      'nodeData',
      'linkData',
      'latestNode'
    ])
  },
  methods:{
    ...mapMutations([
      'UPDATE_NODE',
      'ADD_NODE'
    ]),
    arrowPointEnter() {
      this.toolVisisable = true
    },
    arrowPointLeave() {
      this.toolVisisable = false
    },
    nodeDrop(ev){
      console.log('?????????')
    },
    mouseDown(){
      // console.log(6666)
    },
    mouseMove(){
      // console.log(7777)
    },
    mouseUp(){
      // console.log(8888)
    },
    nodeDragStart(){
      // console.log(9999)
    },
    nodeDragging(data, type){
      
      var { item, event } = data
      var { clientX, clientY } = event
      var { beginX, beginY } = item.begin

      item.position.top  = clientY - beginY
      item.position.left = clientX - beginX - 200

      this.UPDATE_NODE(item)

    },
    nodeDragEnd(){
      
    },
    mouseEnterCanvas(){
      //console.log(3333)
    },
    mouseLeaveCanvas(){
      //console.log(4444)
    }
  }
}
</script>

<style lang="scss">
  .canvas{
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 200px;
    background: #666;
  }
  .start{
    background: #ffcece;
  }
  .decision{
    background: #fdffc9;
  }
  .end{
    background: #c3f5ff;
  }
</style>