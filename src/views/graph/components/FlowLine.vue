<template>
  <div class="flow-line" draggable="true" :style="nodeStyles">
    <svg xmlns="http://www.w3.org/2000/svg" version="1.1" class="svg" >
      <defs>
        <marker id="markerArrow" markerWidth="13" markerHeight="13" refX="2" refY="3" orient="auto" markerUnits="strokeWidth">
          <path d="M 0 0 L 9 4 L 0 9  L 3 4" style="fill:#fff;" transform="scale(0.7)"></path>
        </marker>
      </defs>
      <line 
        :x1="nodeStyles._x1" 
        :y1="nodeStyles._y1"  
        :x2="nodeStyles._x2"
        :y2="nodeStyles._y2" 
        style="stroke:#fff;stroke-width:2" 
        marker-end='url(#markerArrow)'
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
    nodeStyles(){

      /** Link的数据结构：begin气死节点，end结束节点，content是文字内容。至于节点数据，根据id去Node中取 */
      /**
        'L&002':{
          begin:'$1',
          end:'$3',
          content:'测试连线'
        }
       */
      
      let { begin, end } = this.item

      let _beginNode = this.nodeData[begin].position
      let _endNode   = this.nodeData[end].position

      let XType = (_endNode.left - _beginNode.left)  > 0 ? 'RIGHT' : 'LEFT'
      let YType = (_endNode.top  - _beginNode.top)   > 0 ? 'BOTTOM' : 'TOP'
      
      let _width = Math.abs(_endNode.left - _beginNode.left)
      let _height = Math.abs(_endNode.top  - _beginNode.top)
      
      let _w = _width   // 相对x作差即为宽度
      let _h = _height   // 相对x作差即为高度

      
      let _y = Math.min(_beginNode.top,  _endNode.top)  + 20   // 加上偏移量 2/heigth  20
      let _x = Math.min(_beginNode.left, _endNode.left) + 40   // 加上偏移量 2/width   40

      

      let operator   = 50

      let proportion1 = this.toDouble(_h/_w)
      let proportion2 = this.toDouble(_w/_h)


      let _x2, _y2, _x1, _y1 = 0;
      
      if(proportion1 <= 1){

        _x2 = _w - operator
        _y2 = _h - operator*proportion1
        _x1 = operator
        _y1 = operator*proportion1
        

      }else{

        _x2 = _w - operator*proportion2
        _y2 = _h - operator
        _x1 = operator*proportion2
        _y1 = operator
        
      }

      let Config
      
      const threshold = 60
      
      // 当线框svg的情况下
      if( _w < threshold || _h < threshold ){

        _w = Math.max(_w, threshold*2)
        _h = Math.max(_h, threshold*2)
        _x = _x - this.toDouble(threshold/2)
        _y = _y - this.toDouble(threshold/2)
        _x1 = _x1 + this.toDouble(threshold/2)
        _x2 = _x2 + this.toDouble(threshold/2)
        _y1 = _y1 + this.toDouble(threshold/2)
        _y2 = _y2 + this.toDouble(threshold/2)

        // -= this.toDouble(threshold/2)

      }

      switch (`${XType}/${YType}`) {
        case 'RIGHT/TOP':
          Config = {
            _x1:  `${_x1}px`,
            _y1:  `${_y2}px`,
            _x2:  `${_x2}px`,
            _y2:  `${_y1}px`,
          }
          break;
        case 'RIGHT/BOTTOM':
          Config = {
            _x1:  `${_x1}px`,
            _y1:  `${_y1}px`,
            _x2:  `${_x2}px`,
            _y2:  `${_y2}px`,
          }
          break;
        case 'LEFT/TOP':
          Config = {
            _x1:  `${_x2}px`,
            _y1:  `${_y2}px`,
            _x2:  `${_x1}px`,
            _y2:  `${_y1}px`,
          }
          break;
        case 'LEFT/BOTTOM':
          Config = {
            _x1:  `${_x2}px`,
            _y1:  `${_y1}px`,
            _x2:  `${_x1}px`,
            _y2:  `${_y2}px`,
          }
          break;
      }


      return {

        top:  `${_y}px`,
        left: `${_x}px`,

        width:  `${_w}px`,
        height: `${_h}px`,

        ...Config
      }

    }
  },
  methods:{
    ...mapMutations([
      'SET_GLOBAL_NODE',
    ]),
    toDouble(value){
      return Math.round(value* 100) / 100
    }
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
    position: absolute;
    left: 0;
    top: 0;
    width:100%;
    height:100%;
  }
</style>