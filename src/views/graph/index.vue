<template>
  <div id="flow" class="flow">
    <canvas-paper/>
    <tools-bar/>
  </div>
</template>

<script>
import CanvasPaper from './canvas'
import ToolsBar    from './tools'

export default {
  name: 'flow',
  components: {
    CanvasPaper,
    ToolsBar
  }
}
</script>

<style lang="scss">

</style>