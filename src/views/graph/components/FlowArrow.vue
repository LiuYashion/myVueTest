<template>
  <div >
    <div 
      class="cube"
      draggable="true"
      :style="nodePosition"
      
      @mouseenter="mouseEnterNode" 
      @mouseleave="mouseLeaveNode"

      @dragstart="whenDragStart(item)"
      @drag="whenDragging(item)"
    >
      {{item.type}}
    </div>

    <div 
      class="cube-box"
      :style="toolPosition"
      v-if="toolVisible"
    >
      111
    </div>
  </div>
</template>

<script>

import { mapMutations, mapState } from 'vuex';

export default {
  name: 'tools',
  data(){
    return {
      toolVisible: false
    }
  },
  props:{
    item: {
      type: Object
    }
  },
  computed:{
    ...mapState([
      'latestNode',
    ]),
    nodePosition(){
      console.log(666, this.item)
      return {
        top:`${this.item.position.top}px`,
        left:`${this.item.position.left}px`
      }
    },
    toolPosition(){
      console.log(666, this.item)
      return {
        top:`${this.item.position.top}px`,
        left:`${this.item.position.left + 90}px`
      }
    },
  },
  methods:{
    ...mapMutations([
      'SET_GLOBAL_NODE',
    ]),
    whenDragging(item){
      this.$emit('nodeDragging', {item, event});
    },
    whenDragStart(item){
      item.begin = {
        beginX: event.offsetX, 
        beginY: event.offsetY
      }
      this.SET_GLOBAL_NODE(item)
    },
    mouseEnterNode(id) {
      this.toolVisible = true;
    },
    mouseLeaveNode() {
      this.toolVisible = false;
    }
  }
}
</script>

<style lang="scss">
  .cube{
    width: 80px;
    z-index:30;
    border-radius:4px;
    position: absolute;
    text-align: center;
    line-height: 40px;
    height: 40px;
    background: lightgoldenrodyellow;
  }
  .cube-box{
    position:absolute;
    width:40px;
    height:40px;
    background:#333;
    border-radius:4px;
  }
</style>