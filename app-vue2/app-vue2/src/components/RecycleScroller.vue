 <template>
  <RecycleScroller
    class="scroller"
    :items="list"
    :item-size="40"
    key-field="id"
    v-slot="{ item }">
    <div class="user">
        {{ item.name }}
    </div>
  </RecycleScroller>
</template>
<script>
export default {
  // props: {
  //   list: Array,
  // }
  data() {
    return {
      list:[]
    }
  },
  created() {
    this.list = [...Array(1000).keys()].map((v, i) => ({
        id: i + 1,
        name: `第${i + 1}项`,
        height: 60
      }));
  }
}
</script>
<style scoped>
.scroller {
  width: 500px;
  height: 600px;
  background: #ccc;

}
.user {
  font-size: 30px;
  /* height: 50%;
   */
   /* height: 60px; */
  padding: 0 12px;
  /* display: flex;
  align-items: center; */
  border-bottom:1px solid white;
  text-align: center;
  /* outline: solid 1px #fff; */

}
</style>
