<template>
  <div 
    class="cube"
    draggable="true"
    :style="nodePosition"
    
    @dragstart="whenDragStart(item)"
    @drag="whenDragging(item)"
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
    }
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
</style>