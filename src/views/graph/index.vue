<template>
  <div id="flow" class="flow">
    <canvas-paper/>
    <tools-bar/>
  </div>
</template>

<script>

import CanvasPaper from './canvas'
import ToolsBar    from './tools'
import { mapGetters, mapMutations, mapActions } from 'vuex';
export default {
  name: 'graph',
  components: {
    CanvasPaper,
    ToolsBar
  }
}

</script>

<style lang="scss">

</style>