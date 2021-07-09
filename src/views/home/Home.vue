<template>
  <div id="home" class="warrper">
    <nav-bar class="home-nav">
      <template v-slot:center>购物街</template>
    </nav-bar>
    <tab-control class="tab-control" :titles="['流行', '新款', '精选']"
                 @tabClick="tabClick"
                 ref="tabControl1"
                 v-show="tabFixed"
    ></tab-control>
    <scroll class="content" ref="scroll" @pullingUp="loadMore" @scroll="contentScroll">
    <home-swiper :banners="banners"></home-swiper>
    <recommend-view :recommends="recommends"></recommend-view>
    <feature-view></feature-view>
    <tab-control class="tab-control" :titles="['流行', '新款', '精选']"
                 @tabClick="tabClick"
                 ref="tabControl2"
                 v-show="!tabFixed"
    ></tab-control>
    <goods-list :goods="goods[currentType].list"></goods-list>
    </scroll>
    <back-top @click.native="backClick" v-show="showBackTop"></back-top>
  </div>
</template>

<script>
import HomeSwiper from "./childComps/HomeSwiper";
import RecommendView from "./childComps/RecommendView";
import FeatureView from "./childComps/FeatureView";

import TabControl from "../../components/content/tabControl/TabControl";
import NavBar from "../../components/common/navbar/NavBar";
import GoodsList from "../../components/content/goods/GoodsList";
import GoodsListItem from "../../components/content/goods/GoodsListItem";
import BackTop from "../../components/content/backTop/BackTop";

import {getHomeMultidate, getHomeGoods} from "../../network/home";
import scroll from "../../components/common/scroll/scroll";
import {debounce} from "../../common/utils";

export default {
  name: "Home",
  components: {
    NavBar,
    HomeSwiper,
    RecommendView,
    FeatureView,
    TabControl,
    GoodsList,
    GoodsListItem,
    scroll,
    BackTop,
  },
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        'pop': {page: 0, list: []},
        'new': {page: 0, list: []},
        'sell': {page: 0, list: []},
      },
      currentType: 'pop',
      showBackTop: false,
      tabFixed: false,
      tabOffsetTop: 0,
    }
  },
  created() {
    getHomeMultidate().then(res => {
      this.banners = res.data.banner.list
      this.recommends = res.data.recommend.list
    })
    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')
  },
  mounted() {
    const refresh = debounce(this.refreshScroll, 50)
    this.$bus.$on('itemImgLoad', () => {
      refresh()
    })
  },
  methods: {
    refreshScroll() {
      this.$refs.scroll.scroll.refresh()
    },
    loadMore() {
      this.getHomeGoods(this.currentType)
    },
    contentScroll(position) {
      if(this.tabOffsetTop == 0) this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
      this.showBackTop = position.y < -1000
      this.tabFixed = position.y < -this.tabOffsetTop
    },
    backClick() {
      this.$refs.scroll.scroll.scrollTo(0, 0, 500)
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1
      getHomeGoods(type, page).then(res => {
        this.goods[type].list.push(...res.data.list)
        this.goods[type].page = page
        this.$refs.scroll.scroll.finishPullUp()
      })
    },
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = 'pop'
          break
        case 1:
          this.currentType = 'new'
          break
        case 2:
          this.currentType = 'sell'
      }
      this.$refs.tabControl1.currentIndex = index
      this.$refs.tabControl2.currentIndex = index
    }
  }
}
</script>

<style scoped>
  #home {
    padding-top: 44px;
    height: 100vh;
  }
  .home-nav {
    background-color: #ff8198;
    color: #ffffff;
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9;
  }

  .tab-control {
    /*position: sticky;*/
    top: 44px;
    z-index: 9;
  }

  .content {
    height: calc(100vh - 90px);
    overflow: hidden;
  }

</style>