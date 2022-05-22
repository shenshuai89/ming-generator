<template>
  <div class="main">
    <div
      class="editor"
      :style="{ width: width + 'px', height: height + 'px' }"
      @drop="drop"
      @dragover="dragover"
    >
      <div ref="editorItem" v-if="componentList && componentList.length">
        <div v-for="item in componentList" :key="item">
          <div class="item">
            <component :is="`el-${item.type}`">
              <template v-if="item.type === 'button'">
                {{ item.attrs.text }}</template
              >
              <template v-else-if="item.type === 'icon'">
                <component :is="`${item.attrs.name}`"></component>
              </template>
              <template v-else>{{ item.type }}</template>
            </component>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ComputedRef, watch, ref } from "vue";
import { useStore } from "vuex";
import { ComponentItem } from "../../types/index";
let store = useStore();
let componentList: ComputedRef<ComponentItem[]> = computed(
  () => store.state.componentList
);
let currentComponent = computed(() => store.state.currentComponent);
let activeIndex = computed(() => store.state.activeIndex);
let width = ref<number>(375);
let inputWidth = ref<number>(375);
let height = ref<number>(667);
let inputHeight = ref<number>(667);

let dragover = (e: DragEvent) => {
  e.preventDefault();
};
// 拖动 放入元素组件
let drop = (e: DragEvent) => {
  let item = JSON.parse(e.dataTransfer!.getData("item"));
  localStorage.setItem("currentComponent", JSON.stringify(item));
  store.commit("setCurrentComponent", item);
  if (componentList.value && componentList.value.length) {
    componentList.value.push(item);
    localStorage.setItem("componentList", JSON.stringify(componentList.value));
    store.commit("setComponentList", componentList.value);
    localStorage.setItem("activeIndex", String(componentList.value.length - 1));
    store.commit("setActiveIndex", componentList.value.length - 1);
  } else {
    let arr = [];
    arr.push(item);
    localStorage.setItem("componentList", JSON.stringify(arr));
    store.commit("setComponentList", arr);
    localStorage.setItem("activeIndex", "0");
    store.commit("setActiveIndex", 0);
  }
};

const clickItem = (item, index) => {
  console.log(item, index);
};
</script>
<style lang="scss" scoped>
.main {
  width: 100%;
  height: 100%;
  background: #f5f5f5;
  position: relative;
}
</style>
