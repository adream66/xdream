<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
     <div style="display: flex;">
      <children></children>
      <children2></children2>
      <div style="height: 600px;">
        <recycleScroller></recycleScroller>

      </div>
      <div>
        <parent>

        </parent>
      </div>
     </div>

  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import children from './components/children.vue';
import children2 from './components/children2.vue';

import recycleScroller from './components/RecycleScroller.vue';
import parent from './view/Parent.vue'

export default {
  name: 'App',
  components: {
    // HelloWorld, 
    children,
    recycleScroller,
    parent,
    children2
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
