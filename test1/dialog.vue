<!--
 * @FilePath: /src/components/common/bettinguser/external/component/dialog_find_abnormal.vue
 * @Description: 账户中心-投注用户管理(查询异常 弹窗)
-->
<template>
  <div
      style="width: 700px; height: auto; max-width: 700px; overflow: hidden"
      class="text-panda-text-7"
  >
      <q-card class="bg-white text-black">
          <q-card-section class="no-padding">
              <div class=" row line-height-40px fs14 bg-panda-dialog text-panda-text-7 pr10x " >     
                  <!-- 查询异常 -->
                  <div  class="pl20x fw_600 col q-pr-md"> {{ $t("external.account.user_risk_control.label36") }}</div>
                  <div class="col-1 justify-end">
                      <q-space></q-space>
                      <q-btn class="mr5x text-panda-dialog-close" icon="close" v-close-popup />
                  </div>
              </div>
          </q-card-section>
          <q-separator></q-separator>
          <div class="pt20x pl20x pr20x ">
              

              
          </div>
        
      </q-card>
  </div>
</template>
<script>

</script>
<style lang="scss" scoped>
// .fixed-footer ::v-deep .ant-pagination {
//     display: none;
// }
// .fixed-footer .small-table-type-1 ::v-deep .ant-table {
//     border-top: none;
// }
// .fixed-footer ::v-deep .ant-table-thead > tr > th {
//     background: #f4f5f8 !important;
// }
// .fixed-footer ::v-deep .ant-table-thead > tr > th,
// .fixed-footer ::v-deep .ant-table-tbody > tr > td {
//     border-left: 1px solid #e8e8e8;
// }
// .fixed-footer ::v-deep .ant-table-body {
//     overflow-x: hidden !important;
// }
// .fixed-footer ::v-deep .ant-table {
//     border-left: none !important;
// }








::v-deep .swiper-wrapper{
    justify-content: center;
}
</style>
