<template>
  <div class="right">
    <div class="container">
      <div style="padding: 10px" v-if="current">
        <h2>属性设置{{ current.type }}</h2>
        <icon-attrs v-if="current.type === 'icon'"></icon-attrs>
        <button-attrs v-if="current.type === 'button'"></button-attrs>
      </div>
      <div v-else>
        <a-result
          status="404"
          title="还没有数据喔"
          sub-title="赶快拖拽组件来生成你的H5页面吧"
        ></a-result>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ComputedRef, ref } from "vue";
import { useStore } from "vuex";
import { ComponentItem } from "../../types";
import buttonAttrs from "../componentAttrs/button/index.vue";
let store = useStore();

let current: ComputedRef<ComponentItem> = computed(
  () => store.state.currentComponent
);
</script>
<style lang="scss" scoped>
.right {
  height: 100%;
  border-left: 1px solid #eee;
  overflow: hidden;
  .container {
    height: 100%;
    overflow: scroll;
  }
}
</style>
