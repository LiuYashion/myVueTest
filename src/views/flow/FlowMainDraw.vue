<template>
  <div id="flowMainCont" class="flow-main-cont">
    <div class="crumbs">
      <strong class="unuse">Platform</strong>
      <span class="split-line">/</span>
      <strong>未命名</strong>
    </div>
    <div id="drawContainer" class="draw-wrap">
      <div 
        id="draw" 
        class="main-bg" 
        :style="{transform:`scale(${drawStyle.zoomRate})`,transformOrigin:`${drawStyle.origin}`}" 
        @drop.prevent="dropHandle" 
        @dragover.stop.prevent 
        @mousedown="drawLineStart" 
        @mousemove="drawingLine" 
        @mouseup="drawLineEnd" 
        @mousewheel.alt.prevent="wheelHandle" 
        @click.stop.prevent="editEnd"
      >
        <flow-node-draw></flow-node-draw>
        <flow-line-draw></flow-line-draw>
        <tool-menu 
          :ulStyle="'width:100px;text-align:center'" 
          :visible.sync="visible" 
          :menuData="menuData" 
          @selItme="deleteHandle" 
          :style="{top:menuInfo.top,left:menuInfo.left}"
        ></tool-menu>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import ToolMenu from './ToolMenu';
import FlowNodeDraw from './FlowNodeDraw';
import FlowLineDraw from './FlowLineDraw';

export default {
  name: 'flowMainDraw',
  data() {
    return {
      // 节点相关
      isDragging: false,
      selNodeInfo: {},
      showArrow: false,
      showResize: false,
      showLineSet: false,
      clickInfo: {},
      // 连线相关
      drawLineInfo: {
        startNode: '',
        endNode: '',
        startDirection: '',
        endDirection: '',
        // type: 'StraightLine',
        type: '',
        lineStyle: {
          // x1: '',
          // y1: '',
          // x2: '',
          // y2: ''
        }
      },
      selNodeId: '',
      editable: false,
      lineDrawing: false,
      arrowDirection: '',
      arrowPadding: 15,
      timer: null,
      drawScale: 2,
      zoomType: 'zoomIn',
      visible: false,
      menuData: [
        {
          title: '删除'
        }
      ],
      menuInfo: {
        top: 0,
        left: 0,
        selType: '',
        selId: ''
      }
    };
  },

  components: {
    ToolMenu,
    FlowNodeDraw,
    FlowLineDraw
  },
  computed: {
    ...mapState('flow', [
      'nodeData',
      'selNodeType',
      'dragging',
      'lineData',
      'selLineType',
      'drawStyle'
    ]),
    line(el, binding, vnode) {
      let _this = vnode.context;
      el.oncontextmenu = ev => {
        ev.preventDefault();
        _this.visible = true;
        // _this.showArrow = false
        let x = ev.offsetX;
        let y = ev.offsetY;
        _this.menuInfo.top = `${y}px`;
        _this.menuInfo.left = `${x}px`;
        _this.menuInfo.selType = el.id.replace(/-.*/g, '');
        _this.menuInfo.id = el.id;
      };
      el.onclick = ev => {
        _this.clickInfo = _this.deepCopy(_this.lineData[el.id]);
        _this.clickInfo.lineStyle.stroke = '#00a8ff';
        _this.clickInfo.lineStyle['stroke-dasharray'] = '3 3';
        _this.showLineSet = true;
      };
      el.onmousedown = ev => {
        _this.lineDrawing = true;
        _this.drawLineInfo.lineStyle.path = '';
        // let { path } = _this.lineData[el.id]
      };
      el.ondblclick = ev => {
        _this.editable = true;
        let editor = el.querySelector('.line-text');
        el.querySelector('foreignObject').setAttribute('pointer-events', 'all');
        editor.focus();
        let fn = () => {
          let text = editor.innerHTML;
          let result = _this.deepCopy(_this.lineData[el.id]);
          result.text = text;
          _this.UPDATE_LINE({
            [el.id]: result
          });
          _this.editable = false;
          document.querySelector('.line-text').removeEventListener('blur', fn);
        };
        document.querySelector('.line-text').addEventListener('blur', fn);
      };
    }
  },
  methods: {
    ...mapMutations('flow', [
      'SEL_NODETYPE',
      'UPDATE_NODE',
      'UPDATE_LINE',
      'UPDATE_DRAWSTYLE'
    ]),
    editEnd() {
      if (this.editable && !this.showArrow) {
        this.editable = false;
      }
    },
    deleteNode(id = '') {
      for (var key in this.lineData) {
        if (
          this.lineData[key].startNode === id ||
          this.lineData[key].endNode === id
        ) {
          delete this.lineData[key];
          this.UPDATE_LINE(this.lineData);
        }
      }
      delete this.nodeData[id];
      this.UPDATE_NODE(this.nodeData);
      this.showArrow = false;
      this.showResize = false;
    },
    deleteHandle(ev) {
      let { id, selType } = this.menuInfo;
      switch (selType) {
        case 'node':
          this.deleteNode(id);
          break;
        case 'line':
          delete this.lineData[id];
          this.UPDATE_NODE(this.lineData);
          break;
        default:
          break;
      }
    },
    wheelHandle(ev) {
      if (ev.deltaY < 0) {
        this.zoomType = 'zoomIn';
      } else {
        this.zoomType = 'zoomOut';
      }
      let x = ev.offsetX;
      let y = ev.offsetY;
      if (this.zoomType === 'zoomIn') {
        if (this.drawStyle.zoomRate < 3) {
          let zoomRate = this.drawStyle.zoomRate + 0.25;
          this.UPDATE_DRAWSTYLE({
            zoomRate,
            origin: `${x}px ${y}px`
          });
        }
      } else if (this.zoomType === 'zoomOut') {
        if (this.drawStyle.zoomRate > 0.25) {
          let zoomRate = this.drawStyle.zoomRate - 0.25;
          this.UPDATE_DRAWSTYLE({
            zoomRate,
            origin: `${x}px ${y}px`
          });
        }
      }
    },
    // 节点添加
    dropHandle(ev) {
      // 防止拖拽速度过快导致定位错误
      if (ev.target.tagName !== 'DIV') return;
      let cont = event.dataTransfer.getData('Text'),
        // 为了解决节点移动时位置问题，节点位置为 update:nodeID的形式
        key = cont.replace(/\:.*/g, ''),
        x = ev.offsetX - 40, // 这边的50是设置dragImage时的偏移量，(由于使 iconfont 实际icon与svg存在间隙)
        y = ev.offsetY - 40;
      ev.dataTransfer.dropEffect = 'copy';
      let fn = {
        update() {
          let id = cont.replace(/.*\:/g, '');
          this.UPDATE_NODE({
            [id]: {
              ...this.nodeData[id],
              top: y,
              left: x
            }
          });
        },
        add() {
          let id = 'node-' + new Date().getTime();
          let imgSrc = ev.dataTransfer.getData('URL');
          this.UPDATE_NODE({
            [id]: {
              id: 'node-' + new Date().getTime(),
              type: this.selNodeType,
              top: y,
              left: x,
              text: '',
              imgSrc
            }
          });
        }
      };
      if (typeof key !== 'undefined') {
        fn[key].call(this);
      }
    },
    enterArrow(ev) {
      this.arrowDirection = ev.target.dataset.direction;
      ev.target.style.opacity = 1;
    },
    outArrow(ev) {
      this.arrowDirection = '';
      ev.target.style.opacity = 0.5;
    },
    computeLine(direction, obj) {
      let { top, left, width, height } = obj;
      let w = width / 2;
      let h = height / 2;
      switch (direction) {
        case 't':
          top = top - h;
          break;
        case 'b':
          top = top + h;
          break;
        case 'l':
          left = left - w;
          break;
        case 'r':
          left = left + w;
          break;
        default:
          break;
      }
      return {
        top,
        left
      };
    },
    computePolyLine(start, end, direction) {
      let startPoint = {
        x: +start.split(',')[0],
        y: +start.split(',')[1]
      };
      let endPoint = {
        x: +end.split(',')[0],
        y: +end.split(',')[1]
      };
      let m1, m2;
      switch (direction) {
        case 't':
        case 'b':
          let mY = startPoint.y + (endPoint.y - startPoint.y) / 2;
          m1 = {
            x: startPoint.x,
            y: mY
          };
          m2 = {
            x: endPoint.x,
            y: mY
          };
          break;
        case 'l':
        case 'r':
          let mX = startPoint.x + (endPoint.x - startPoint.x) / 2;
          m1 = {
            x: mX,
            y: startPoint.y
          };
          m2 = {
            x: mX,
            y: endPoint.y
          };
          break;
        default:
          break;
      }

      return `${startPoint.x},${startPoint.y} ${m1.x},${m1.y} ${m2.x},${m2.y} ${endPoint.x},${endPoint.y}`;
    },
    drawLineStart(ev) {
      if (ev.buttons === 2) {
        return;
      }
      if (this.arrowDirection && !this.isDragging && this.showArrow) {
        this.lineDrawing = true;
        let { id } = this.selNodeInfo;
        let { top, left } = this.computeLine(
          this.arrowDirection,
          this.selNodeInfo
        );
        let style = {};
        switch (this.selLineType) {
          case 'LinePoly':
            style = {
              points: `${left},${top}`
            };
            break;
          case 'StraightLine':
            style = {
              x1: left,
              y1: top,
              x2: left,
              y2: top
            };
            break;
          default:
            break;
        }

        this.drawLineInfo = {
          ...this.drawLineInfo,
          lineStyle: {
            ...style
          },
          type: this.selLineType,
          startNode: id,
          startDirection: this.arrowDirection
        };
      }
    },
    drawingLine(ev) {
      if (this.lineDrawing && ev.target.tagName !== 'IMG' && !this.isDragging) {
        let top = ev.offsetY;
        let left = ev.offsetX;

        switch (this.selLineType) {
          case 'LinePoly':
            let startP = this.drawLineInfo.lineStyle.points.split(' ')[0];
            let direction = this.drawLineInfo.startDirection;
            let endP = `${left},${top}`;
            this.drawLineInfo.lineStyle.points = this.computePolyLine(
              startP,
              endP,
              direction
            );
            break;
          case 'StraightLine':
            this.drawLineInfo.lineStyle.x2 = left;
            this.drawLineInfo.lineStyle.y2 = top;
            break;
          default:
            break;
        }

        this.arrowDirection = '';
      }
    },
    deepCopy(s, t = {}) {
      for (var i in s) {
        if (typeof s[i] === 'object') {
          t[i] = s[i].constructor === Array ? [] : {};
          this.deepCopy(s[i], t[i]);
        } else {
          t[i] = s[i];
        }
      }
      return t;
    },
    drawLineEnd(ev) {
      if (this.lineDrawing && this.arrowDirection && this.showArrow) {
        let { id } = this.selNodeInfo;
        let { top, left } = this.computeLine(
          this.arrowDirection,
          this.selNodeInfo
        );
        this.drawLineInfo.endNode = id;
        let style = {};
        switch (this.selLineType) {
          case 'LinePoly':
            style = {
              ...this.drawLineInfo.lineStyle
            };
            break;
          case 'StraightLine':
            style = {
              ...this.drawLineInfo.lineStyle,
              x2: left,
              y2: top
            };
            break;
          default:
            break;
        }

        this.drawLineInfo = {
          ...this.drawLineInfo,
          lineStyle: {
            ...style
          },
          endDirection: this.arrowDirection,
          text: ''
        };
        // vuex 不应该直接用响应式数据，需先进行深拷贝

        // let deepCopy = (s, t = {}) => {
        //   for (var i in s) {
        //     if (typeof s[i] === 'object') {
        //       t[i] = (s[i].constructor === Array) ? [] : {}
        //       deepCopy(s[i], t[i])
        //     } else {
        //       t[i] = s[i]
        //     }
        //   }
        //   return t
        // }

        let data = this.deepCopy(this.drawLineInfo);
        let lineId = 'line-' + new Date().getTime();
        data.id = lineId;
        this.UPDATE_LINE({
          [lineId]: data
        });
      } else {
        this.drawLineInfo = {
          startNode: '',
          endNode: '',
          type: this.selLineType,
          lineStyle: {}
        };
      }
      this.lineDrawing = false;
      this.arrowDirection = '';
    },
    updateLine() {
      let { id } = this.selNodeInfo;
      let data = {};

      for (var key in this.lineData) {
        if (this.lineData[key].startNode === id) {
          // 获取开始端口坐标
          let direction = this.lineData[key].startDirection;
          let { left, top } = this.computeLine(direction, this.selNodeInfo);
          let type = this.lineData[key].type;

          switch (type) {
            case 'LinePoly':
              let arr = this.lineData[key].lineStyle.points.split(' ');
              let startP = `${left},${top}`;
              let endP = arr[arr.length - 1];
              let points = this.computePolyLine(startP, endP, direction);
              data[key] = {
                ...this.lineData[key],
                lineStyle: {
                  ...this.lineData[key].lineStyle,
                  points
                }
              };
              break;
            case 'StraightLine':
              data[key] = {
                ...this.lineData[key],
                lineStyle: {
                  ...this.lineData[key].lineStyle,
                  x1: left,
                  y1: top
                }
              };
              break;
            default:
              break;
          }
        } else if (this.lineData[key].endNode === id) {
          // 获取结束端口坐标
          let direction = this.lineData[key].endDirection;
          let { left, top } = this.computeLine(direction, this.selNodeInfo);
          let type = this.lineData[key].type;
          switch (type) {
            case 'LinePoly':
              let arr = this.lineData[key].lineStyle.points.split(' ');
              let startP = arr[0];
              let endP = `${left},${top}`;
              let points = this.computePolyLine(startP, endP, direction);
              data[key] = {
                ...this.lineData[key],
                lineStyle: {
                  ...this.lineData[key].lineStyle,
                  points
                }
              };
              break;
            case 'StraightLine':
              data[key] = {
                ...this.lineData[key],
                lineStyle: {
                  ...this.lineData[key].lineStyle,
                  x2: left,
                  y2: top
                }
              };
              break;
            default:
              break;
          }
        }
      }

      this.UPDATE_LINE(data);
    }
  },
  mounted() {
    document.addEventListener('mouseup', ev => {
      if (this.showResize || this.showLineSet) {
        this.clickInfo = {};
        this.showResize = false;
        this.showLineSet = false;
      }
    });
    // 阻止右键事件
    document.addEventListener('contextmenu', ev => {
      ev.preventDefault();
    });
    document.addEventListener('keydown', ev => {
      switch (ev.keyCode) {
        case 46:
          let { id } = this.clickInfo;
          let selType = id.replace(/-.*/, '');
          switch (selType) {
            case 'node':
              this.deleteNode(id);
              break;
            case 'line':
              delete this.lineData[id];
              this.UPDATE_NODE(this.lineData);
              this.showLineSet = false;
              this.clickInfo = {};
              break;
            default:
              break;
          }
          break;

        default:
          break;
      }
    });
  }
};
</script>

<style lang="scss">
.flow-main-cont {
  right: 0;
  left: 208px;
  top: 66px;
  bottom: 0;
  overflow: auto;
  background: #ebebeb;
  position: absolute;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  .crumbs {
    width: 100%;
    height: 50px;
    background: #fff;
    border-top: 3px solid #ddd;
    color: #333;
    padding-left: 20px;
    display: flex;
    align-items: center;
    .unuse {
      color: #999;
    }
    .split-line {
      margin: 0 8px;
    }
  }
  .main-bg {
    overflow: hidden;
    width: 5000px;
    height: 5000px;
    background: url('../../assets/bg.png') #fff;
  }
  .draw-wrap {
    flex: 1;
    overflow: auto;
  }
  .shape-text {
    width: 400px;
    margin-left: -200px;
    text-align: center;
    outline: none;
    margin-top: -10px;
  }
  .line-text {
    width: 400px;
    margin-left: -200px;
    text-align: center;
    outline: none;
    margin-top: -10px;
    z-index: 9999;
    cursor: pointer;
  }
  .arrow {
    position: absolute;
    opacity: 0.3;
    z-index: 9999;
    cursor: crosshair;
    &-bottom {
      transform: rotate(-180deg);
    }
    &-left {
      transform: rotate(-90deg);
    }
    &-right {
      transform: rotate(90deg);
    }
    &:hover {
      opacity: 1;
    }
  }
}
</style>