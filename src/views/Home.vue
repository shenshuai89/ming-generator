<template>
  <div class="container">
    <div class="header">
      <nav-header></nav-header>
    </div>
    <div class="content">
      <div class="left">
        <nav-left></nav-left>
      </div>
      <div class="main">
        <nav-main></nav-main>
      </div>
      <div class="right">
        <nav-right></nav-right>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import navHeader from "../components/navHeader/index.vue";
import navLeft from "../components/navLeft/index.vue";
import navMain from "../components/navMain/index.vue";
import navRight from "../components/navRight/index.vue";
</script>
<style lang="scss" scoped>
.content {
  display: flex;
  height: calc(100vh - 51px);
  .main {
    flex: 1;
  }
  .right {
    width: 300px;
  }
}
</style>
