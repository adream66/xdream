<template>
  <div>
    <h3>我是parent组件</h3>
    <h5>parent的arr的值为: {{ arr }}</h5>
    <h5>parent的obj的值为: {{ obj }}</h5>

    <button @click="change_arr">修改arr</button>
    <button @click="change_arr2">修改arr2</button>

    <div>
      <child></child>
    </div>
  </div>
</template>

<script>
// import Vue from 'vue'
import child from './Child.vue'
export default {
  name: "parentVue",
  components: {child},
  data() {
    return {
      arr:[1,2,3],
      obj:{
        a:1,
        b:[7,8,9],
        c:{
          d:"xm"
        }
      }
    }
  },
  methods: {
    change_arr() {
      // this.$set(this.arr,2,5)
      this.arr.splice(1,2,20,30)
      // this.arr.unshift(10)
      this.obj.b = "xixi"
      // this.obj.c.e = "xiaoming" //可以添加上，但添加的e不是响应式的
    //  console.log("this.obj",this.obj);
    this.$set(this.obj.c, 'e','jack')
      // this.obj.b[2] = 90 //不支持修改
      // this.arr[1] = 20 //不能直接修改数组里的某项值
      // this.obj.c.d[1] = 10 //对象也不能直接修改数组某项值
      // Vue.set(this.obj,"c", "xixi")

    },
    change_arr2() {
      this.obj.c.e = "xiaohong" //修改e不生效
      // console.log("this.arr",this.arr);

    }
  },
  beforeCreate() {
    console.log('我是parent的beforeCreate');
  },
  created() {
    console.log('我是parent的created');

  },
  beforeMount() {

    console.log('我是parent的beforeMount');
  },
  mounted() {
    console.log('我是parent的mounted');

  },
  beforeDestroy() {
    console.log('我是parent的beforeDestroy');

  },
  destroyed() {
    console.log('我是parent的destroyed');

  }
}
</script>

<style>

</style>