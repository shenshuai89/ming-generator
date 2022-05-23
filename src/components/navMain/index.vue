<template>
  <div class="main">
    <div class="editor" @drop="drop" @dragover="dragover">
      <div ref="editorItem" v-if="componentList && componentList.length">
        <div v-for="item in componentList" :key="item">
          <div class="item" @click="clickItem(item, index)">
            <component
              :is="`el-${item.type}`"
              v-bind="{
                ...item.attrs,
              }"
            >
              <template v-if="item.type === 'button'">
                {{ item.attrs.btntext }}</template
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

const clickItem = (item: ComponentItem, index: number) => {
  localStorage.setItem("currentComponent", JSON.stringify(item));
  store.commit("setCurrentComponent", item);
  localStorage.setItem("activeIndex", String(index));
  store.commit("setActiveIndex", index);
};
watch(
  () => currentComponent.value,
  (val) => {
    localStorage.setItem("currentComponent", JSON.stringify(val));
    store.commit("setCurrentComponent", val);
    console.log(val, "setCurrentComponent");
    if (componentList.value && componentList.value.length) {
      console.log(componentList.value, "setCurrentComponent");

      componentList.value[activeIndex.value] = val;
      localStorage.setItem(
        "componentList",
        JSON.stringify(componentList.value)
      );
      store.commit("setComponentList", componentList.value);
    }
  },
  { deep: true }
);
</script>
<style lang="scss" scoped>
.main {
  width: 100%;
  height: 100%;
  background: #f5f5f5;
  position: relative;
  .editor {
    width: 100%;
    height: 100%;
  }
}
</style>
