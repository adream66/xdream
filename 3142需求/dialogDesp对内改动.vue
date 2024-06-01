<!--
 * @Desc: 对内 商户中心——投注用户管理-投注特殊限额弹窗
 * @Date: 2019-12-25 15:49:45
 * @Author:Nice
 * @FilePath: /src/components/common/bettinguser/internal/component/dialogDesp.vue
 -->
<template>
  <div
    style="width: 500px ; height:auto;max-width:500px;overflow:hidden;"
    class="text-panda-text-7"
  >
    <q-card class="bg-white text-black">
      <q-card-section class="no-padding">
        <div
          class="row line-height-40px fs14 bg-panda-dialog text-panda-text-7 pr10x"
        >
        <div class="col-11">
            <div class="pl20x fw_600">
            <!-- 查看情况下   非 信用 模式 通用  非 编辑状态   仅仅查看状态 1无      specialBettingLimitType    ：  1   2  3 4    -->
              <div class="pl20x fw_600 col q-pr-md" v-if=" [1].includes(detailObj.specialBettingLimitType)">
                <a-tooltip trigger="hover">
                  <!-- 对特殊VIP限额、特殊单注单场限额、单注限额百分比的用户限额需求，需联系B端风控 -->
                  <template slot="title"> {{ $t("internal.betting.label2") }}</template>
                  <a-icon type="question-circle" class=" fs15" />
                </a-tooltip>
                {{ specialBettingLimit_title[detailObj.specialBettingLimitType] }}
                <a-input
                  v-model="percentageLimit"
                  v-if="detailObj.specialBettingLimitType == 2 && [1].includes(detailObj.specialBettingLimitType) "
                  style="width:70px;margin-top:7px"
                  readonly
                  disabled
                  class="disabled-white"
                />
              </div>
              <!-- 查看情况下   非 信用 模式 通用  非 编辑状态   仅仅查看状态 2特殊限额      specialBettingLimitType    ：  1   2  3 4    -->
              <div class="pl20x fw_600 col q-pr-md" v-if=" [2].includes(detailObj.specialBettingLimitType)">
                <a-tooltip trigger="hover">
                  <!-- 对特殊VIP限额、特殊单注单场限额、单注限额百分比的用户限额需求，需联系B端风控 -->
                  <template slot="title"> {{ $t("internal.betting.label3") }}</template>
                  <a-icon type="question-circle" class=" fs15" />
                </a-tooltip>
                {{ $t("internal.betting.label4") }}
                <!-- {{ specialBettingLimit_title[detailObj.specialBettingLimitType] }} -->
              </div>
            
            
            </div>
       
        </div>
        <div class="col-1 justify-end">

                    <q-btn
            class="mr5x text-panda-dialog-close"
            icon="close"
            v-close-popup
          />
        </div>


        </div>
      </q-card-section>
      <q-separator></q-separator>
      <div class=" pt10x pl20x pr20x pb20x fixed-footer">
    <!-- 只能查看  2特殊限额 -->
        <div v-if=" [2].includes(detailObj.specialBettingLimitType)">
          <dialogSpecialBetLimit :disabled="true" :detailObj="detailObj"></dialogSpecialBetLimit>
        </div>

      <a-table
        v-if="tabledata.length>0"
        :loading="tabledata_loading"
        :columns="columns"
        :dataSource="tabledata"
        :scroll="{ x: 400 }"
        size="small"
        rowKey="id"
      >
      </a-table>
      <a-table
        v-if="tabledata_1.length>0"
        class="small-table-type-1"
        :loading="tabledata_loading"
        :columns="columns_2"
        :dataSource="tabledata_1"
        :scroll="{ x: 400 }"
        size="small"
        rowKey="id"
      >
      </a-table>
      <div class="row mt20x mb20x pl20x">
          <div class="text-panda-text-7 mb12x fw_600 col-2">{{$t('internal.common.label71')}}：</div>
          <div class="append-handle-btn-input col-10" style="width: 310px;">
              <a-textarea v-model="specialBettingLimitRemark"  readonly disabled  class="disabled-white"
                  :autoSize="{ minRows: 3, maxRows: 3 }"/>
          </div>
      </div>
      </div>
    </q-card>
  </div>
</template>
<script>
import { i18n } from 'src/boot/i18n';
import { api_user } from "src/api/index.js";
import { despconfig_1,despconfig_2 } from "src/components/common/bettinguser/internal/config/despconfig.js"; 
import commonmixin from "src/mixins/internal/common/commontoolmixin.js";
import dialogSpecialBetLimit from "src/components/common/bettinguser/external/component/dialogSpecialBetLimit.vue"
export default {
  mixins: [commonmixin],
  components: { dialogSpecialBetLimit },
  data() {
    return {
      columns: despconfig_1,
      columns_2: despconfig_2,
      tabledata_loading: false,
      loading:false,
      specialBettingLimit_title:i18n.t('internal.merchant.bettinguser.index.specialBettingLimit_title'),
      sportId_name:i18n.t('internal.merchant.bettinguser.index.sportId_name'),
      sportId_name_2:i18n.t('internal.merchant.bettinguser.index.sportId_name_2'),
      //详情
      specialBettingLimitRemark:"",
      //百分比
      percentageLimit:0,
      tabledata:[],
      tabledata_1:[],
      special_percentage:i18n.t('internal.betting.label10'),  // 特殊百分比radio
      automatic_limit:i18n.t('internal.betting.label11'),  // 自动升额度radio
    };
  },
  props: {
    detailObj: {
      type: Object,
      default() {
        return {};
      }
    }
  },

  created(){
    this.init_data();
  },
  methods: {
    /**
    * @description:查询详情
    */
    init_data() {
    this.tabledata_loading = true;
      api_user.post_order_user_queryUserBetLimitDetail({userId:this.detailObj.userId}).then(res => {
        let code = this.$lodash.get(res, "data.code");
        this.tabledata_loading = false;
        if (code == "0000000") {
          this.specialBettingLimitRemark=this.$lodash.get(res, "data.data.specialBettingLimitRemark") 
          let arr = this.$lodash.get(res, "data.data.rcsUserSpecialBetLimitConfigList") || [];
          if([3,4].includes(this.detailObj.specialBettingLimitType)){
            arr = this.rebuild_tabledata_to_needed(arr);
            this.tabledata=arr.filter(x=>x.orderType==1)
            this.tabledata_1=arr.filter(x=>x.orderType==2)
          }else if(this.detailObj.specialBettingLimitType==2&&arr.length==1){
            this.percentageLimit=arr[0].percentageLimit*100+"%"
          }
        }
      });
    },
    /**
    * @description:将值扩展
    * @param {type}
    * @return {type}
    */
    rebuild_tabledata_to_needed(arr) {
      let new_arr={}
      let new_arr_2={}
      arr.map((item, index) => {
        if(item.orderType==1){
        new_arr[item.sportId+""]=item
        }
        else{
        new_arr_2[item.sportId+""]=item
        }
        item.sportId=item.orderType==1? this.sportId_name[item.sportId+""]: this.sportId_name_2[item.sportId+""]
      });
      //specialBettingLimitType==4的情况下,返回的数据有可能不是固定5条
      let new_arr_3=[
        new_arr["-1"]||{id:1,orderType:1,sportId:this.sportId_name["-1"]},
        new_arr["1"]||{id:2,orderType:1,sportId:this.sportId_name["1"]},
        new_arr["2"]||{id:3,orderType:1,sportId:this.sportId_name["2"]},
        new_arr["0"]||{id:4,orderType:1,sportId:this.sportId_name["0"]},
        new_arr_2["-1"]||{id:5,orderType:2,sportId:this.sportId_name_2["-1"]},
        ]
      arr=new_arr_3
      return arr;
    },
  }
};
</script>
<style lang="scss" scoped>
.fixed-footer ::v-deep .ant-pagination {
	 display: none;
}
 .fixed-footer .small-table-type-1 ::v-deep .ant-table {
	 border-top: none;
}
 .fixed-footer ::v-deep .ant-table-thead > tr > th {
	 background: #f4f5f8 !important;
}
 .fixed-footer ::v-deep .ant-table-thead > tr > th, .fixed-footer ::v-deep .ant-table-tbody > tr > td {
	 border-left: 1px solid #e8e8e8;
}
 .fixed-footer ::v-deep .ant-table-body {
	 overflow-x: hidden !important;
}
 .fixed-footer ::v-deep .ant-table {
	 border-left: none !important;
}
 
</style>
