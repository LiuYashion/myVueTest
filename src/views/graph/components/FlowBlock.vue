<template>
  <div 
      class="cube" 
      draggable="true" 
      :style="nodePosition"
 
      @dragstart="whenDragStart(item)" 
      @drag="whenDragging(item)" 

      @mouseover="arrowPointEnter"
      @mouseleave="arrowPointLeave" 

      @mouseup.stop="addLinkMouseUp" 
    >
      {{item.type}}
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
      return {
        top:`${this.item.position.top}px`,
        left:`${this.item.position.left}px`
      }
    },
    toolPosition(){
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
    arrowPointEnter() {
      this.$emit('arrowPointEnter');
    },
    arrowPointLeave() {
      this.$emit('arrowPointLeave');
    },
    addLinkMouseUp(){
      console.log('松开鼠标')
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
    z-index:30;
    width:40px;
    height:40px;
    background:#333;
    border-radius:4px;
  }
</style>