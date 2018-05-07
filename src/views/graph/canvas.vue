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
  
    <div>
      <flow-node 
        v-for="item in nodeData" 
        @nodeDragging="nodeDragging" 
        :item="item">
      </flow-node>
    </div>

    <div>
      <flow-line 
        v-for="item in linkData" 
        @nodeDragging="nodeDragging" 
        :item="item">
      </flow-line>
    </div>

  </div>
</template>

<script>

import { mapMutations, mapState } from 'vuex';

import FlowNode from './components/FlowNode';
import FlowLine from './components/FlowLine';

export default {
  name: 'canvas-paper',
  data(){
    return {

    }
  },
  components:{
    FlowNode,
    FlowLine
  },
  computed:{
    ...mapState([
      'nodeData',
      'linkData'
    ])
  },
  methods:{
    ...mapMutations([
      'UPDATE_NODE',
    ]),
    nodeDrop(){
      console.log(6543)
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
</style>