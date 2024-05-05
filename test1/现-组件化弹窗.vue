<!--
 * @Desc: 对外-账户中心-投注用户管理-特殊限额
 * @Date: 2019-12-25 15:49:45
 * @Author:Nice
 * @FilePath: /src/components/common/bettinguser/external/component/dialogDesp.vue
 -->
 <template>
  <div
    style="width: 700px ; height:auto;max-width:700px;overflow:hidden;"
    class="text-panda-text-7"
  >
    <q-card class="bg-white text-black">
      <q-card-section class="no-padding">
        <div
          class="row line-height-40px fs14 bg-panda-dialog text-panda-text-7 pr10x"
        >
          <!-- 查看情况下   非 信用 模式 通用  非 编辑状态   仅仅查看状态       specialBettingLimitType    ：  1   2  3 4    -->
          <div class="pl20x fw_600 col q-pr-md" v-if="!can_edit">
            <a-tooltip trigger="hover">
              <!-- 对特殊VIP限额、特殊单注单场限额、单注限额百分比的用户限额需求，需联系B端风控 -->
              <template slot="title"> {{ $t("internal.betting.label2") }}</template>
              <a-icon type="question-circle" class=" fs15" />
            </a-tooltip>
            {{ specialBettingLimit_title[detailObj.specialBettingLimitType] }}
            <a-input
              v-model="percentageLimit"
              v-if="detailObj.specialBettingLimitType == 2"
              style="width:70px;margin-top:7px"
              readonly
              disabled
              class="disabled-white"
            />
          </div>
          <!-- 编辑情况下      //   "1": "无",      //   "2": "特殊百分比限额",  -->
       
  
          <div  v-if="
              // can_edit && [1, 2].includes(detailObj.specialBettingLimitType)
              can_edit && [2].includes(detailObj.specialBettingLimitType)
          " >
            <dialogSpecialBetLimit  :detailObj = "detailObj"></dialogSpecialBetLimit>

          </div>


        <div  v-if="
          // can_edit && [1, 2].includes(detailObj.specialBettingLimitType)
          can_edit && [1].includes(detailObj.specialBettingLimitType)
        ">
          <dialogNoSpecialBetLimit :detailObj = "detailObj"></dialogNoSpecialBetLimit>

        </div>


   
        <q-space></q-space>
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
      <div></div>

      <div class=" pt10x pl20x pr20x pb20x fixed-footer">
        <!-- 投注特殊限额弹窗  -->
        <!-- <dialogSpecialBetLimit :detailObj = "detailObj"></dialogSpecialBetLimit> -->
        <!-- 用户id  -->

        <!-- //   "3": "特殊单注单场限额",    //   "4": "特殊VIP限额" -->

        <a-table
          v-if="
            [3, 4].includes(detailObj.specialBettingLimitType) &&
              tabledata.length > 0
          "
          :loading="tabledata_loading"
          :columns="columns"
          :dataSource="tabledata"
          :scroll="{ x: 400 }"
          size="small"
          rowKey="id"
        >
        </a-table>

        <a-table
          v-if="
            [3, 4].includes(detailObj.specialBettingLimitType) &&
              tabledata_1.length > 0
          "
          class="small-table-type-1"
          :loading="tabledata_loading"
          :columns="columns_2"
          :dataSource="tabledata_1"
          :scroll="{ x: 400 }"
          size="small"
          rowKey="id"
        >
        </a-table>
          <!-- 注意：早盘、滚球分别计算，都不能超过这里设定的特殊限额。   -->
        <div class="row mt20x mb20x"  v-if="detailObj.specialBettingLimitType == 3 || detailObj.specialBettingLimitType == 4">
          <div class=" text-panda-text-7 mb12x fw_600 " style="min-width:100px">
            <span class="panda-text-red "> {{ $t("external.account.betting.label8") }}</span>
          </div>
        </div>

        <!-- 备注   -->
        <div class="row mt20x mb20x">
          <div class=" text-panda-text-7 mb12x fw_600 " style="min-width:100px">
            <span class="panda-text-red ">*</span>
            <span> {{ $t("external.account.betting.label2") }}：</span>
          </div>
          <!-- 请说明限额原因   -->
          <div class="append-handle-btn-input  col">
            <a-textarea
              v-model.trim="specialBettingLimitRemark"
              :read-only="!can_edit"
              :disabled="!can_edit"
              class="disabled-white"
              :autoSize="{ minRows: 3, maxRows: 3 }"
            />
          </div>
        </div>

        <!-- 确定和返回 按钮  -->

        <div
          v-if="can_edit"
          class="row justify-end"
        >
          <q-btn
            class="panda-btn-primary-dense bg-primary ml20x"
            style="width:80px;height:30px; "
            :label="$t('external.betting_.label3')"
            v-close-popup
          />

          <!--确定-->
          <q-btn
            class="panda-btn-primary-dense bg-primary ml20x"
            style="width:80px;height:30px; "
            :label="$t('external.betting_.label4')"
            @click="handle_post_userReport_updateRcsLimit()"
          />
        </div>
      </div>
    </q-card>
  </div>
</template>
<script>
import { i18n } from "src/boot/i18n";
import { api_account } from "src/api/index.js";
import {
  despconfig_1,
  despconfig_2
} from "src/components/common/bettinguser/external/config/despconfig.js";
import commonmixin from "src/mixins/external/common/commontoolmixin.js";
import dialogSpecialBetLimit from "./dialogSpecialBetLimit.vue"  //特殊限额弹窗
import dialogNoSpecialBetLimit from "./dialogNoSpecialBetLimit.vue"  //无特殊限额弹窗

export default {
  mixins: [commonmixin],
  components: {
    dialogSpecialBetLimit,
    dialogNoSpecialBetLimit
  },
  data() {
    return {
      columns: despconfig_1,
      columns_2: despconfig_2,
      tabledata_loading: false,
      loading: false,
      specialBettingLimit_title: i18n.t(
        "internal.betting.specialBettingLimit_title"
      ),
      sportId_name: i18n.t("external.merchant.bettinguser.index.sportId_name"),
      sportId_name_2: i18n.t(
        "external.merchant.bettinguser.index.sportId_name_2"
      ),
      //详情
      specialBettingLimitRemark: "",
      //百分比
      percentageLimit: 100,
      percentageLimit_arr: [1, 2, 5, 10, 25, 50, 75, 100],
      tabledata: [],
      tabledata_1: [],
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
    },
    // can_edit:{
    //   type:Boolean,
    //   default:false
    // },
    //   "1": "无", //   "2": "特殊百分比限额",    才能编辑
    can_edit: false
  },
  created() {
    this.init_data();
  },
  methods: {
    //       "specialBettingLimit": {
    //   "1": "无",
    //   "2": "特殊百分比限额",

    //   "3": "特殊单注单场限额",
    //   "4": "特殊VIP限额"
    //    "5": 信用限额
    // },

    /**
     * @description:查询详情
     */
    init_data() {
      this.tabledata_loading = true;
      api_account
        .post_order_user_queryUserBetLimitDetail({
          userId: this.detailObj.userId
        })
        .then(res => {
          let code = this.$lodash.get(res, "data.code");
          this.tabledata_loading = false;
          if (code == "0000000") {
            this.specialBettingLimitRemark = this.$lodash.get(
              res,
              "data.data.specialBettingLimitRemark"
            );
            let arr =
              this.$lodash.get(
                res,
                "data.data.rcsUserSpecialBetLimitConfigList"
              ) || [];
            if ([3, 4].includes(this.detailObj.specialBettingLimitType)) {
              //   "3": "特殊单注单场限额", //   "4": "特殊VIP限额"
              arr = this.rebuild_tabledata_to_needed(arr);
              this.tabledata = arr.filter(x => x.orderType == 1);
              this.tabledata_1 = arr.filter(x => x.orderType == 2);
            } else if (
              this.detailObj.specialBettingLimitType == 2 &&
              arr.length
            ) {
              let item_list = arr.find(item => item.status);
              this.percentageLimit =
                (item_list.percentageLimit * 100).toFixed(2) + "%";
              
            }
          }
        });
        api_account
          .get_order_user_getUserTradeRestrict({
            userId: this.detailObj.userId,
          })
          .then((res) => {
            let code = this.$lodash.get(res, "data.code");
            let data = this.$lodash.get(res, "data.data");
            if(code == "0000000"){

                let percentag = data.percentageLimit
                if(percentag &&percentag !== 0 ){
                  let percentageLimit =(percentag * 100).toFixed(2)
                  let item_index = this.percentageLimit_arr.findIndex(el=>el>
                      percentageLimit
                  );
                  if(item_index >=0){
                      this.percentageLimit_arr.splice(
                        item_index,
                        this.percentageLimit_arr.length - item_index
                      );
                  }
                }
            }else{
                this.$message.error(res.data.msg);
            }
          });

    },
    /**
     * 更新 限额
     */
    handle_post_userReport_updateRcsLimit() {
      // {"rcsUserConfigVo":{"userId":"169570651347558400","specialBettingLimit":2,[]}]}

      //    private String userId;
      //   private Integer specialBettingLimit;
      //   private BigDecimal percentage;
      //   private Integer betExtraDelay;
      //   private Integer marketLevel;
      //   private String remarks;
      
      let percentageLimit = this.percentageLimit.toString().replace("%","")
      if (!this.percentageLimit) {
        //百分比必须设置
         this.$message.warn(i18n.t('internal.common.w6'));
        return false;
      }

      if (!this.specialBettingLimitRemark) {
         //备注必须填写
         this.$message.warn(i18n.t('internal.common.w7'));
        return false;
      }

      let params = {rcsUserConfigVo:{}};
      // "3": "特殊单注单场限额"   "4": "特殊VIP限额"
      if([3, 4].includes(this.detailObj.specialBettingLimitType)){
        params.rcsUserConfigVo.userId = this.detailObj.userId;
        params.rcsUserConfigVo.specialBettingLimit = this.detailObj.specialBettingLimitType;
        params.rcsUserConfigVo.remarks = this.specialBettingLimitRemark;
      } else {
        params.rcsUserConfigVo.userId = this.detailObj.userId;
        params.rcsUserConfigVo.specialBettingLimit = 2;
        params.rcsUserConfigVo.percentage = percentageLimit*1;
        params.rcsUserConfigVo.remarks = this.specialBettingLimitRemark;
      }
      api_account.post_userReport_updateRcsLimit(params).then(res => {
        console.log(res);
        this.$emit("handleCloseDesp");
      });
    },
    /**
     * @description:将值扩展
     * @param {type}
     * @return {type}
     */
    rebuild_tabledata_to_needed(arr) {
      let new_arr = {};
      let new_arr_2 = {};
      arr.map((item, index) => {
        if (item.orderType == 1) {
          new_arr[item.sportId + ""] = item;
        } else {
          new_arr_2[item.sportId + ""] = item;
        }
        item.sportId =
          item.orderType == 1
            ? this.sportId_name[item.sportId + ""]
            : this.sportId_name_2[item.sportId + ""];
      });
      //specialBettingLimitType==4的情况下,返回的数据有可能不是固定5条
      let new_arr_3 = [
        new_arr["-1"] || {
          id: 1,
          orderType: 1,
          sportId: this.sportId_name["-1"]
        },
        new_arr["1"] || {
          id: 2,
          orderType: 1,
          sportId: this.sportId_name["1"]
        },
        new_arr["2"] || {
          id: 3,
          orderType: 1,
          sportId: this.sportId_name["2"]
        },
        new_arr["0"] || {
          id: 4,
          orderType: 1,
          sportId: this.sportId_name["0"]
        },
        new_arr_2["-1"] || {
          id: 5,
          orderType: 2,
          sportId: this.sportId_name_2["-1"]
        }
      ];
      arr = new_arr_3;
      return arr;
    }
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
.fixed-footer ::v-deep .ant-table-thead > tr > th,
.fixed-footer ::v-deep .ant-table-tbody > tr > td {
  border-left: 1px solid #e8e8e8;
}
.fixed-footer ::v-deep .ant-table-body {
  overflow-x: hidden !important;
}
.fixed-footer ::v-deep .ant-table {
  border-left: none !important;
}
</style>
