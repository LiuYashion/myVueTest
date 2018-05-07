<template>
  <div class="flow-line"
    draggable="true"
    :style="nodePosition"
  >
    <svg xmlns="http://www.w3.org/2000/svg" version="1.1" class="svg">
      <line 
        :x1="0" 
        :y1="0"  
        :x2="nodePosition.width" 
        :y2="nodePosition.height" 
        style="stroke:#fff;stroke-width:2" 
      />
    </svg>
    <span class="flow-line-info">
      {{item.content}}
    </span>
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
      'nodeData',
    ]),
    linePosition(){
      let { begin, end } = this.item

      let _b = this.nodeData[begin].position
      let _e = this.nodeData[end].position
      
      let _x1 = 0
      let _y1 = 0

      let _x2 = _e.left - 50
      let _y2 = _e.top - 50

      return {
        _x1,
        _y1,
        _x2,
        _y2
      }
    },
    nodePosition(){
      let { begin, end } = this.item

      let _b = this.nodeData[begin].position
      let _e = this.nodeData[end].position

      let _x = _b.top + 20
      let _y = _b.left + 40

      let endX = _e.top + 20
      let endY = _e.left + 40

      let _w = _e.left - _b.left
      let _h = _e.top  - _b.top

      console.log(_w, _h)

      return {
        top:`${_x}px`,
        left:`${_y}px`,
        width:`${_w}px`,
        height:`${_h}px`,
        endX,
        endY
      }
    }
  },
  methods:{
    ...mapMutations([
      'SET_GLOBAL_NODE',
    ])
  }
}
</script>

<style lang="scss">
  .flow-line{
    width: 80px;
    position: absolute;
    z-index:10;
    text-align: center;
    line-height: 40px;
    height: 40px;
  }
  .flow-line-info{
    position:absolute;
    width:200px;
    transform:translate(50%, 50%);
    right:50%;
    bottom:50%;
  }
  .svg{
    position:relatiove;
    width:100%;
    height:100%;
  }
</style>