<template>
  <div class="flow-line" draggable="true" :style="nodeStyles">


    <svg xmlns="http://www.w3.org/2000/svg" version="1.1" class="svg line-wrap" >
      <marker 
        id="markerArrow" 
        markerWidth="13" 
        markerHeight="13" 
        refX="2" 
        refY="3" 
        orient="auto" 
        markerUnits="strokeWidth"
      >
        <path d="M 0 0 L 9 4 L 0 9  L 3 4" style="fill:#fff;" transform="scale(0.7)"></path>
      </marker>

      <line 
        :x1="nodeStyles.beg_x" 
        :y1="nodeStyles.beg_y"  
        :x2="nodeStyles.end_x" 
        :y2="nodeStyles.end_y" 
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
import { mapMutations, mapState } from "vuex";

export default {
  name: "tools",
  data() {
    return {
      widthLock: false,
      heightLock: false,
      shadowBeginTop: null,
      shadowBeginLeft: null,
      shadowEndTop: null,
      shadowEndLeft: null
    };
  },
  props: {
    item: {
      type: Object
    }
  },
  computed: {
    ...mapState(["nodeData"]),
    nodeStyles() {
      let { begin, end } = this.item;

      let _beginNode = this.nodeData[begin].position;
      let _endNode = this.nodeData[end].position;

      /** 正在移动的节点 */

      let currentMoving = "";

      let compareBT = this.shadowBeginTop - _beginNode.top;
      let compareBL = this.shadowBeginLeft - _beginNode.left;

      let compareET = this.shadowEndTop - _endNode.top;
      let compareEL = this.shadowEndLeft - _endNode.left;

      this.shadowBeginTop = _beginNode.top;
      this.shadowBeginLeft = _beginNode.left;
      this.shadowEndTop = _endNode.top;
      this.shadowEndLeft = _endNode.left;

      if (
        compareBT == 0 &&
        compareBL == 0 &&
        compareET != 0 &&
        compareEL != 0
      ) {
        currentMoving = "BEGIN";
      } else if (
        compareBT != 0 &&
        compareBL != 0 &&
        compareET == 0 &&
        compareEL == 0
      ) {
        currentMoving = "END";
      } else {
      }

      /** 线头朝向 */
      let XType = _endNode.left - _beginNode.left > 0 ? "RIGHT" : "LEFT";
      let YType = _endNode.top - _beginNode.top > 0 ? "BOTTOM" : "TOP";

      let nail_width = Math.abs(_endNode.left - _beginNode.left);
      let nail_height = Math.abs(_endNode.top - _beginNode.top);

      /** 方框的top left坐标 */
      let nail_top = Math.min(_beginNode.top, _endNode.top) + 20; // 加上偏移量 2/heigth  20
      let nail_left = Math.min(_beginNode.left, _endNode.left) + 40; // 加上偏移量 2/width   40

      let operator = 45;

      /** 宽高比,为避免误差取分子小于分母的数值 */
      let _hw = this.toDouble(nail_height / nail_width);
      let _wh = this.toDouble(nail_width / nail_height);

      let end_x,
        end_y,
        beg_x,
        beg_y = 0;

      let operNum,
        minType = 0;

      /** XType  YType */

      if (_hw <= 1) {
        

        if (XType == "RIGHT") {
          beg_x = operator ;
          end_x = nail_width - operator;
        } else {
          beg_x = nail_width - operator;
          end_x = operator;
        }

        if (YType == "BOTTOM") {
          beg_y = operator * _hw;
          end_y = nail_height - operator * _hw;
        } else {
          beg_y = nail_height - operator * _hw;
          end_y = operator * _hw;
        }

        /** height过小 */
        if( nail_height < 60 ){
          nail_top = _beginNode.top - 40
          nail_height = 120

          

          if (YType == "BOTTOM") {
            beg_y = beg_y + 60
            end_y = end_y + 60
          } else {
            beg_y = 60 - operator * _hw;
            end_y = 60 - nail_width * _hw + operator * _hw;
          }


          if(currentMoving === 'BEGIN'){

          }else{

          }


        }
      } else {
        

        if (XType == "RIGHT") {
          beg_x = operator * _wh;
          end_x = nail_width - operator * _wh;
        } else {
          beg_x = nail_width - operator * _wh;
          end_x = operator * _wh;
        }

        if (YType == "BOTTOM") {
          end_y = nail_height - operator;
          beg_y = operator;
        } else {
          end_y = operator;
          beg_y = nail_height - operator;
        }

        /** width过小 */
        if( nail_width < 60 ){

          nail_left = _beginNode.left - 20
          nail_width = 120


          if (XType == "RIGHT") {
            beg_x = 60 + operator * _wh;
            end_x = 60 + (nail_height - operator)* _wh;
          } else {
            beg_x = 60 - operator * _wh;
            end_x = 60 - (nail_height - operator) * _wh;
          }



          if(currentMoving === 'BEGIN'){

          }else{

          }
        }
      }

      return {
        top: `${nail_top}px`,
        left: `${nail_left}px`,

        width: `${nail_width}px`,
        height: `${nail_height}px`,

        beg_x: `${beg_x}px`,
        beg_y: `${beg_y}px`,
        end_x: `${end_x}px`,
        end_y: `${end_y}px`
      };
    }
  },
  methods: {
    ...mapMutations(["SET_GLOBAL_NODE"]),
    toDouble(value) {
      return Math.round(value * 100) / 100;
    }
  }
};
</script>

<style lang="scss">
.flow-line {
  width: 80px;
  position: absolute;
  z-index: 10;
  text-align: center;
  line-height: 40px;
  height: 40px;
}
.flow-line-info {
  position: absolute;
  width: 200px;
  transform: translate(50%, 50%);
  right: 50%;
  bottom: 50%;
}
.svg {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
}
.line-wrap {
  background: transparent;
}
</style>