<template>
  <div>
    <h3>我是child组件</h3>
    <el-button type="success">成功按钮</el-button>
    <el-button type="primary" icon="el-icon-search">搜索</el-button>
    <br />
    <input type="file" @change="handleFileChange">
    <el-button @click="handleUpload">upload</el-button>
  </div>
</template>

<script>
// 切片大小 chunk size
const SIZE = 10 * 1024 * 1024

export default {
  name: "childVue",
  data() {
    return {
      container: {
        file: null,
      },
      data: []
    }
  },
  methods: {

    // input框选择文件
    handleFileChange(e) {
      const [file] = e.target.files
      if (!file) return
      Object.assign(this.$data, this.$options.data())
      this.container.file = file
      console.log('this.container.file', this.container.file);
     this.createFileChunk(this.container.file)

    },
    // button按钮上传
    async handleUpload() {
      if (!this.container.file) return
      const fileChunkList = this.createFileChunk(this.container.file)
      this.data = fileChunkList.map(({ file }, index) => ({
        chunk: file,
        hash: this.container.file.name + '-' + index
      }))
      await this.uploadChunks()
    },
    // 生成文件切片
    createFileChunk(file, size = SIZE) {
      const fileChunkList = []
      let cur = 0
      while (cur < file.size) {
        fileChunkList.push({ file: file.slice(cur, cur + size) })
        cur += size
      }
      console.log('fileChunkList',fileChunkList);
      return fileChunkList
    },
    // 上传切片
    async uploadChunks() {
      const requestList = this.data.map(({ chunk, hash }) => {
        const formData = new FormData()
        formData.append('chunk', chunk)
        formData.append('hash', hash)
        formData.append('filename', this.container.file.name)
        return { formData }
      }).map(({ formData }) => this.request({
        url: "http://localhost:3000",
        data: formData
      })
      )
      // 并发请求
      await Promise.all(requestList)
    },
    request({
      url,
      method = "post",
      data,
      headers = {},
      // requestList
    }) {
      return new Promise(resolve => {
        const xhr = new XMLHttpRequest();
        xhr.open(method, url);
        Object.keys(headers).forEach(key =>
          xhr.setRequestHeader(key, headers[key])
        );
        xhr.send(data);
        xhr.onload = e => {
          resolve({
            data: e.target.response
          });
        };
      });
    }


  },
  beforeCreate() {
    console.log('我是child的beforeCreate');
  },
  created() {
    console.log('我是child的created');

  },
  beforeMount() {

    console.log('我是child的beforeMount');
  },
  mounted() {
    console.log('我是child的mounted');

  },
  beforeDestroy() {
    console.log('我是child的beforeDestroy');

  },
  destroyed() {
    console.log('我是child的destroyed');

  }



}
</script>

<style></style>