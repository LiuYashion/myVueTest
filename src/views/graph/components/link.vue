<template>
  <div 
    class="link-box"
    :style="nodePosition"
    
  >
    {{item.content}}
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
      'linkData'
    ]),
    nodePosition(item){

      return {
        top:`${this.item.position.top}px`,
        left:`${this.item.position.left}px`,
        width:`${200}px`,
        height:`${200}px`
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
  .link-box{
    width: 80px;
    position: absolute;
    text-align: center;
    line-height: 40px;
    height: 40px;
    background: #333;
  }
</style>