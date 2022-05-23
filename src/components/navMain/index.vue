<template>
  <div class="main">
    <div class="editor" @drop="drop" @dragover="dragover" @click="clickEditor">
      <div ref="editorItem" v-if="componentList && componentList.length">
        <div v-for="item in componentList" :key="item">
          <el-dropdown trigger="contextmenu" @command="handleCommand">
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
            <template #dropdown>
              <el-dropdown-menu @click="contextMenuClick">
                <el-dropdown-item command="copy">复制</el-dropdown-item>
                <el-dropdown-item command="deleteItem">删除</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ElMessage } from "element-plus";
import { computed, ComputedRef, watch, ref } from "vue";
import { useStore } from "vuex";
import { ComponentItem } from "../../types/index";
let store = useStore();
let editorItem = ref<HTMLDivElement | null>(null);
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

let clickEditor = (e: any) => {
  if (!editorItem.value!.contains(e.target)) {
    store.commit("setActiveIndex", null);
    localStorage.removeItem("activeIndex");
    store.commit("setCurrentComponent", null);
    localStorage.removeItem("currentComponent");
  }
};

const handleCommand = (command: string | number | object) => {
  if (command === "copy") {
    copy(currentComponent.value);
  } else if (command === "deleteItem") {
    deleteItem(activeIndex.value);
  }
};
let copy = (item: ComponentItem) => {
  if (!currentComponent.value) {
    ElMessage.warning("请先选择组件");
    return;
  } else {
    componentList.value.push(item);
    localStorage.setItem("currentComponent", JSON.stringify(item));
    store.commit("setCurrentComponent", item);
    localStorage.setItem("componentList", JSON.stringify(componentList.value));
    store.commit("setComponentList", componentList.value);
    localStorage.setItem("activeIndex", String(componentList.value.length - 1));
    store.commit("setActiveIndex", componentList.value.length - 1);
  }
};

let deleteItem = (index: number) => {
  if (!currentComponent.value) {
    ElMessage.warning("请先选择组件");
    return;
  } else {
    if (componentList.value.length !== 1) {
      componentList.value.splice(index, 1);
      localStorage.setItem(
        "currentComponent",
        JSON.stringify(componentList.value[componentList.value.length - 1])
      );
      store.commit(
        "setCurrentComponent",
        componentList.value[componentList.value.length - 1]
      );
      localStorage.setItem(
        "componentList",
        JSON.stringify(componentList.value)
      );
      store.commit("setComponentList", componentList.value);
      localStorage.setItem(
        "activeIndex",
        String(componentList.value.length - 1)
      );
      store.commit("setActiveIndex", componentList.value.length - 1);
    } else {
      store.commit("setComponentList", null);
      store.commit("setCurrentComponent", null);
      store.commit("setActiveIndex", null);
      localStorage.removeItem("componentList");
      localStorage.removeItem("currentComponent");
      localStorage.removeItem("activeIndex");
    }
  }
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
