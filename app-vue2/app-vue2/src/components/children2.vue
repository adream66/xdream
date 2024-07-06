<template>
  <div id="box">
    <input type="text" v-model.number="total">条 
    <input type="text" v-model.number="startIndex">开始
    <input type="text" v-model.number="endIndex">结束       {{ scrollTop }}
    <div>
      <div ref="container" class="container" @scroll="handle_scroll" :style="{height:'600px'}" >
        <div class="intainer" :style="{height: total * itemHeight+'px','margin-top': scrollTop + 'px'}">
          <ul>
            <li  v-for="item in visibleData" :key="item.id" :style="{height: `${itemHeight}px`}">
              {{ item.text }}
            </li>
          </ul>
        </div>
   
      </div>
    </div>

  </div>
</template>

<script>

export default {
  name: 'children2Vue',
  data() {
    return {
      total:100, //总条数
      itemHeight: 60, //每个item的高度
      startIndex: 0,
      endIndex: 10,
      scrollTop: 0, //滚动距离
    }
  },
  methods: {
    handle_scroll(e) {
      console.log('滚动距离',  e.target.scrollTop,this.$refs.container.scrollTop);
    // 滚动距离  this.$refs.container.scrollTop
    this.scrollTop =  this.$refs.container.scrollTop
      // 开始索引
      this.startIndex = Math.floor(this.scrollTop/ this.itemHeight)
      // 结束索引
      this.endIndex = this.startIndex + 10
    }
  },
  watch:{
    dataList() {
   
    }
  },
  mounted() {
    // console.log('this.dataList',this.dataList);
  },
  computed: {
    dataList() { 
      let arr = []
       Array(this.total).fill('').map((item,index) => {
        arr.push( { id:index, height:this.itemHeight, text:`我是第${index+1}项`})
      })
      return arr
    },
    visibleData() {
      return this.dataList.slice(this.startIndex, this.endIndex)
    }
  },
}
</script>

<style lang='css' scoped>
#box{
  margin: 0;
  padding: 0;
}
.container {
  width: 400px;
  height: 600px;
  border: 1px solid #ccc;
  overflow:auto;
}
.intainer {
  /* height: 6000px; */
}
ul,li {
  margin: 0;
  padding: 0;
  width: 100%;
  list-style: none;
}
ul {
  /* height: 100%; */
}
li {
  background-color: #ccc;
  outline: solid 1px #fff;

  
}
</style>