<template>
  <div 
    id="canvas" 
    class="canvas" 
    @drop.prevent="nodeDrop" 

    @dragend="nodeDragEnd" 
    @dragstart="nodeDragStart" 
    @dragover.stop.prevent 

    @mousedown="mouseDown" 
    @mousemove="mouseMove" 
    @mouseup="mouseUp" 
    
    @mouseenter="mouseEnterCanvas" 
    @mouseleave="mouseLeaveCanvas"
  >

    <!-- 节点 -->
    <flow-node 
      v-for="item in nodeData" 
      :item="item"
    ></flow-node>
    
    <!-- 连线 -->
    <flow-line 
      v-for="item in linkData" 
      @nodeDragging="nodeDragging" 
      :item="item"
    ></flow-line>
    
    <!-- 拖拽连线 -->
    <flow-temp-line
      @nodeDragging="nodeDragging" 
      :item="tempLink"
    ></flow-temp-line>

  </div>
</template>

<script>

import { mapMutations, mapState } from 'vuex';

import { getRandomID } from './utils';

import FlowBlock    from './components/FlowBlock';
import FlowNode     from './components/FlowNode';
import FlowLine     from './components/FlowLine';
import FlowArrow    from './components/FlowArrow';
import FlowTempLine from './components/FlowTempLine';



export default {
  name: 'canvas-paper',
  data(){
    return {

    }
  },
  components:{
    FlowNode,
    FlowLine,
    FlowTempLine
  },
  computed:{
    ...mapState([
      'nodeData',
      'linkData',
      'latestNode',
      'tempLink'
    ])
  },
  methods:{
    ...mapMutations([
      'UPDATE_NODE',
      'ADD_NODE',
      'SET_MOUSESTATE'
    ]),
    arrowPointEnter() {
      console.log(11111111111)
    },
    arrowPointLeave() {
      console.log(22222222222)
    },
    nodeDrop(ev){

      let info = event.dataTransfer.getData('Text')
      
      // 新增节点
      if( info === 'add' ){

        let item = this.latestNode

        var { beginX, beginY } = item.begin
        var clientX = ev.clientX
        var clientY = ev.clientY
        
        this.ADD_NODE({
          id:`N&${getRandomID()}`,
          begin: item.begin,
          type: item.type,
          title: item.type,
          position: {
            top: clientY - beginY,
            left: clientX - beginX - 200
          }
        })
        
      } else {

        

      }
      

    },
    mouseDown(){
      // console.log(6666)
    },
    mouseMove(){
      // console.log(7777)
    },
    mouseUp(){
      // this.SET_MOUSESTATE('Null')
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
</style>