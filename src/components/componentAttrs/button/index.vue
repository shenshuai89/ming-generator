<template>
  <div style="padding: 10px 12px" v-if="current">
    <el-form label-width="80px">
      <el-form-item label="按钮文案">
        <el-input
          v-model="current.attrs.btntext"
          placeholder="请输入按钮文案"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item label="按钮类型">
        <el-select v-model="current.attrs.type">
          <el-option label="default" value="default">默认按钮</el-option>
          <el-option label="primary" value="primary">主要按钮</el-option>
          <el-option label="danger" value="danger">危险按钮</el-option>
          <el-option label="warning" value="warning">警告按钮</el-option>
          <el-option label="success" value="success">成功按钮</el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="按钮图标">
        <el-input
          v-model="current.attrs.icon"
          placeholder="请输入按钮图标"
          clearable
        ></el-input>
        <el-button
          style="margin-top: 20px"
          type="primary"
          @click="clickBtn('icon')"
          size="small"
          >选择图标</el-button
        >
      </el-form-item>
      <el-form-item label="按钮尺寸">
        <el-select v-model="current.attrs.size">
          <el-option value="normal">正常</el-option>
          <el-option value="large">大号</el-option>
          <el-option value="small">小号</el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="按钮颜色">
        <el-color-picker v-model="current.attrs.color" />
      </el-form-item>
      <el-form-item label="朴素按钮">
        <el-switch v-model="current.attrs.plain"></el-switch>
      </el-form-item>
      <el-form-item label="圆形按钮">
        <el-switch v-model="current.attrs.round"></el-switch>
      </el-form-item>
      <el-form-item label="方形按钮">
        <el-switch v-model:checked="current.attrs.square"></el-switch>
      </el-form-item>
      <el-form-item label="是否禁用">
        <el-switch v-model:checked="current.attrs.disabled"></el-switch>
      </el-form-item>
      <el-form-item label="0.5px边框">
        <el-switch v-model:checked="current.attrs.hairline"></el-switch>
      </el-form-item>
      <el-form-item label="加载状态">
        <el-switch v-model:checked="current.attrs.loading"></el-switch>
      </el-form-item>
      <el-form-item label="加载文案" v-if="current.attrs.loading">
        <el-input
          v-model:value="current.attrs.loadingText"
          placeholder="请输入按钮文案"
          allowClear
        ></el-input>
      </el-form-item>
      <el-form-item label="加载图标" v-if="current.attrs.loading">
        <el-select v-model:value="current.attrs.loadingType">
          <el-select-option value="circular">圆圈</el-select-option>
          <el-select-option value="spinner">花朵</el-select-option>
        </el-select>
      </el-form-item>
      <el-form-item label="跳转链接">
        <el-input
          v-model:value="current.attrs.url"
          placeholder="请输入跳转链接"
          allowClear
        ></el-input>
      </el-form-item>
      <el-form-item label="路由路径">
        <el-input
          v-model:value="current.attrs.to"
          placeholder="请输入路由路径"
          allowClear
        ></el-input>
      </el-form-item>
      <el-form-item label="替换页面">
        <el-switch v-model:checked="current.attrs.replace"></el-switch>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { computed, watch, ref } from "vue";
import { useStore } from "vuex";
// import ChooseIcon from '@/components/chooseIcon/chooseIcon.vue'

let store = useStore();

let current: any = computed(() => store.state.currentComponent);

let labelCol = { span: 6 };
let wrapperCol = { span: 16 };
let visible = ref<boolean>(false);
let position = ref<string>("");

let clickBtn = (val: string) => {
  position.value = val;
  visible.value = true;
};

let choose = (item: string) => {
  (current.value.attrs as any)[position.value] = item;
  position.value = "";
};

watch(
  () => current.value,
  (val) => {
    localStorage.setItem("currentComponent", JSON.stringify(val));
    store.commit("setCurrentComponent", val);
  },
  { deep: true }
);
</script>

<style lang="scss" scoped></style>
