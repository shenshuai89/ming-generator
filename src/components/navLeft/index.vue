<template>
  <div class="left">
    <el-tabs tab-position="left" class="demo-tabs">
      <el-tab-pane>
        <template #label>
          <span class="custom-tabs-label">
            <el-icon><calendar /></el-icon>
            <span>基础</span>
          </span>
        </template>
        <left-list :list="baseComponent"></left-list>
      </el-tab-pane>
      <el-tab-pane>
        <template #label>
          <span class="custom-tabs-label">
            <el-icon><DataAnalysis /></el-icon>
            <span>图表</span>
          </span>
        </template>
        <left-list :list="chartsComponent"></left-list>
      </el-tab-pane>
      <el-tab-pane
        ><template #label>
          <span class="custom-tabs-label">
            <el-icon><Collection /></el-icon>
            <span>业务</span>
          </span>
        </template>
        <left-list :list="businessComponent"></left-list>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup lang="ts">
import { baseComponent, chartsComponent, businessComponent } from "@/config";
import leftList from "./leftList.vue";
</script>
<style lang="scss" scoped>
.left {
  width: 380px;
  border-right: 1px solid #eee;
  height: 100%;
}
</style>
