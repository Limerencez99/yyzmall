<template>
  <div id="app">
    <TabBar>
      <tab-bar-item path="/home">
        <template v-slot:item-icon><img src="./assets/img/tabbar/home.svg" alt=""></template>
        <template v-slot:item-icon-ac><img src="./assets/img/tabbar/home-ac.svg" alt=""></template>
        <template v-slot:item-text><div>首页</div></template>
      </tab-bar-item>
      <tab-bar-item path="/fenlei">
        <template v-slot:item-icon><img src="./assets/img/tabbar/fenlei.svg" alt=""></template>
        <template v-slot:item-icon-ac><img src="./assets/img/tabbar/fenlei-ac.svg" alt=""></template>
        <template v-slot:item-text><div>分类</div></template>
      </tab-bar-item>
      <tab-bar-item path="/gouwuche">
        <template v-slot:item-icon><img src="./assets/img/tabbar/gouwuche.svg" alt=""></template>
        <template v-slot:item-icon-ac><img src="./assets/img/tabbar/gouwuche-ac.svg" alt=""></template>
        <template v-slot:item-text><div>购物车</div></template>
      </tab-bar-item>
      <tab-bar-item path="/wode">
        <template v-slot:item-icon><img src="./assets/img/tabbar/wode.svg" alt=""></template>
        <template v-slot:item-icon-ac><img src="./assets/img/tabbar/wode-ac.svg" alt=""></template>
        <template v-slot:item-text><div>我的</div></template>
      </tab-bar-item>
    </TabBar>
    <router-view></router-view>
  </div>
</template>

<script>
import TabBar from "./components/common/tabbar/TabBar";
import TabBarItem from "./components/common/tabbar/TabBarItem";

export default {
  name: 'App',
  components: {
    TabBar,
    TabBarItem
  }
}
</script>

<style>
  @import "./assets/css/base.css";
</style>
