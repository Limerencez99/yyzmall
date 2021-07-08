<template>
  <div class="wrapper" ref="warpper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";

export default {
  name: "scroll",
  data() {
    return {
     scroll: null
    }
  },
  mounted() {
    this.scroll = new BScroll(this.$refs.warpper, {
      observeDOM: true,
      click: true,
      probeType: 3,
      pullUpLoad: true
    })
    this.scroll.on('scroll', (position) => {
      this.$emit('scroll', position)
    })
    this.scroll.on('pullingUp', () => {
      this.$emit('pullingUp')
    })
  }
}
</script>

<style scoped>

</style>