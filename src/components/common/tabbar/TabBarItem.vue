<template>
  <div class="tab-bar-item" @click="itemclick">
    <div v-if="!isActive"><slot name="item-icon"></slot></div>
    <div v-else><slot name="item-icon-ac"></slot></div>
    <div :class="{active: isActive}"><slot name="item-text"></slot></div>
<!--    <img src="../../assets/img/tabbar/home.svg" alt="">-->
<!--    <div>首页</div>-->
  </div>
</template>

<script>
export default {
  name: "TabBarItem",
  props: {
    path: String
  },
  data() {
    return {
      // isActive: true
    }
  },
  computed: {
    isActive() {
      return this.$route.path.includes(this.path)
    }
  },
  methods: {
    itemclick() {
      this.$router.push(this.path).catch(() => {})
    }
  }
}
</script>

<style scoped>


.tab-bar-item {
  flex: 1;
  text-align: center;
  height: 45px;
  background-color: #f6f6f6;
  font-size: 10px;
}

body {
  padding: 0;
  margin: 0;
}

.tab-bar-item img {
  width: 20px;
  height: 20px;
  margin-top: 3px;
  vertical-align: middle;
}

.active {
  color: #ff5777;
}
</style>