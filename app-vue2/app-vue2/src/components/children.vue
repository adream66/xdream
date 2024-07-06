<template>
  <div style="width: 500px; ">
    <h2>我是children组件</h2>
    <!-- <el-button type="primary">主要按钮</el-button> -->
    <input type="text" v-model.number="dataLength">条
    <div class="virtual-scroller" @scroll="onScroll"  :style="{height: 600 + 'px'}">
      <div class="phantom"    :style="{height: this.dataLength * itemHeight + 'px'}">
        <ul :style="{'margin-top': `${scrollTop}px`}">
          <li v-for="item in visibleList" :key="item.brandId" :style="{height: `${itemHeight}px`, 'line-height': `${itemHeight}px`}">
            <div>
              <div>{{item.name}}</div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "vue-virtual-scroller",
  data() {
    return {
      itemHeight: 60,
      visibleCount: 10,
      dataLength: 500000, // 总数量
      startIndex: 0,
      endIndex: 10,
      scrollTop: 0
    }
  },
  computed: {
    dataList() {
      const newDataList = [...Array(this.dataLength || 0).keys()].map((v, i) => ({ //数组的keys方法返回迭代器对象，通过。next。value拿到数组每一项的索引，这里用展开运算符接收到每一项的索引
        brandId: i + 1,
        name: `第${i + 1}项`,
        height: this.itemHeight
      }));
      return newDataList
    },
    visibleList() {
      return this.dataList.slice(this.startIndex, this.endIndex)
    }
  },
  methods: {
    onScroll(e) {
      console.log(111);
      const scrollTop = e.target.scrollTop
      this.scrollTop = scrollTop
      console.log('scrollTop', scrollTop)
      this.startIndex = Math.floor(scrollTop / this.itemHeight)
      this.endIndex = this.startIndex + 10
    }
  }
}
</script>

<style scoped>
.virtual-scroller {
  border: solid 1px #eee;
  margin-top: 10px;
  height: 600px;
  overflow: auto
}

.phantom {
  overflow: hidden;
}

ul {
  background: #ccc;
  list-style: none;
  padding: 0;
  margin: 0;
}

li {
  outline: solid 1px #fff;
}
</style>

