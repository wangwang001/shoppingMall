<template>
  <div id="app">
    <div class="content" :class="{blur:isBlur}">
      <transition name="slide-left">
        <router-view></router-view>
      </transition>
    </div>
    <v-loading v-show="loading"></v-loading>
    <v-tabar @isShowShade="isShowShade"></v-tabar>
  </div>
</template>

<script>
import tabar from '@/components/tabar';
import loading from '@/components/loading';
export default {
  name: 'App',
  components: {
		'v-tabar': tabar,
    'v-loading':loading
  },
  data() {
    return {
      isBlur: false,
      loading:true
    }
  },
  mounted() {
    setTimeout(() => {
      this.loading = false;
    },100)
  },
  methods: {
    isShowShade(data) {
      this.isBlur = data.isShowShade;
    }
  }
}
</script>

<style scoped>
#app {
  height: 100%;
  position: relative;
  /* font-family: 'Avenir', Helvetica, Arial, sans-serif; */
  font-family: 'myNewFont' !important;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #666;
}
#app .content{
  height: 100%;
}
.blur{
  filter: blur(10px);
}
</style>
