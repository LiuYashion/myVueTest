<template>
  <div class='cube-wrap'>
    <div 
      class='cube-box'
      :style="nodePosition1"  
      @mouseover="arrowPointEnter"
      @mouseleave="arrowPointLeave" 
      @drag="nodeDrag" 
      @dragend="nodeDragEnd" 

      @dragstart="nodeDragStart" 
      @mousedown="mouseDown"
      
      draggable="true"
    ></div> 

    <div 
      class='cube-box'
      :style="nodePosition2"  
      @mouseover="arrowPointEnter"
      @mouseleave="arrowPointLeave" 
      @drag="nodeDrag" 
      @dragend="nodeDragEnd" 

      @dragstart="nodeDragStart" 
      @mousedown="mouseDown"
      
      draggable="true"
    ></div> 

    <div 
      class='cube-box'
      :style="nodePosition3"  
      @mouseover="arrowPointEnter"
      @mouseleave="arrowPointLeave" 
      @drag="nodeDrag" 
      @dragend="nodeDragEnd" 

      @dragstart="nodeDragStart" 
      @mousedown="mouseDown"
      
      draggable="true"
    ></div> 

    <div 
      class='cube-box'
      :style="nodePosition4"  
      @mouseover="arrowPointEnter"
      @mouseleave="arrowPointLeave" 
      @drag="nodeDrag" 
      @dragend="nodeDragEnd" 

      @dragstart="nodeDragStart" 
      @mousedown="mouseDown"
      
      draggable="true"
    ></div> 

  </div>
</template>

<script>

import { mapMutations, mapState } from 'vuex';

export default {
  name: 'tools',
  data(){
    return {
      toolVisible: false,
      offsetX:0,
      offsetY:0
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
      'mouseState'
    ]),
    nodePosition1(){
      return {
        top:`${this.item.position.top + 15 }px`,
        left:`${this.item.position.left + 80}px`
      }
    },
    nodePosition2(){
      return {
        top:`${this.item.position.top + 15 }px`,
        left:`${this.item.position.left - 10 }px`
      }
    },
    nodePosition3(){
      return {
        top:`${this.item.position.top - 10 }px`,
        left:`${this.item.position.left + 35 }px`
      }
    },
    nodePosition4(){
      return {
        top:`${this.item.position.top + 40 }px`,
        left:`${this.item.position.left + 35}px`
      }
    },
    toolPosition(){
      return {
        top:`${this.item.position.top}px`,
        left:`${this.item.position.left + 80}px`
      }
    },
  },
  methods:{
    ...mapMutations([
      'SET_GLOBAL_NODE',
      'SET_TEMP_LINK'
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
    nodeDrag(){
      //console.log(this.item.id, 11111111111111)
      var { clientX, clientY } = event

      this.SET_TEMP_LINK({
        begin: this.item.id,
        end:{
          top: clientY,
          left: clientX - 200
        },
        content:'?????'
      })
      
    },
    mouseDown(){
      this.offsetX = event.offsetX
      this.offsetY = event.offsetY
    },
    nodeDragStart(){
      console.log('----->999')
    },
    nodeDragEnd(){
      console.log('----->777')
      let cont = event.dataTransfer.getData('dropType')
      console.log(999, cont)
      //
    },

    
    addLinkMouseDown(){
      // this.SET_MOUSESTATE('Linking')
    },
    addLinkMouseMove(){
      
    },
    addLinkMouseUp(){
      // this.SET_MOUSESTATE('Null')
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
  }
  .cube-box{
    position:absolute;
    width:10px;
    height:10px;
    background: transparent;
    border: solid 1px #c1daf5;
    border-radius:5px;
    li{
      background:#fae1d2;
      height:20px;
      margin:5px 5px;
      cursor:pointer;
    }
  }
  .cube-wrap{
    margin-left:20px;
  }
</style>