<!--
 * @FilePath: /src/pages/internal/data/user_abnormal_list/index.vue
 * @Description: 对内：数据中心/异常用户名单    对外：账户中心/异常用户名单
-->
<template>
  <div class="pr">
    <div
      class="pl10x pt10x pb10x"
      id="top1"
    >
      <!--头部面包屑导航-->
      <q-breadcrumbs
        separator="/"
        active-color="whiddte"
        class="panda-text-2"
      >
      <!-- 对内：数据中心/异常用户名单    对外：账户中心/异常用户名单  产品要求暂时注释，特殊限额用户名单页面暂不删除
       :label="activeKey == 1 ? $t('internal.user_abnormal_list.label2') : $t('internal.user_abnormal_list.label730_5')"
      -->
        <q-breadcrumbs-el :label="src_internal ? $t('internal.user_abnormal_list.label1') : $t('external.account.channel.label1') " />
        <q-breadcrumbs-el
          :label="activeKey == 1 ? $t('internal.user_abnormal_list.label2') : $t('internal.user_abnormal_list.label2')"
          class="panda-text-1"
        />
      </q-breadcrumbs>
    </div>
    <!-- 切换资源   产品要求暂时注释，特殊限额用户名单页面暂不删除-->
    <!-- <a-tabs v-model="activeKey" type="card" style="margin: 0 10px 0 10px; background: #fff;">
         <a-tab-pane :key="1" :tab="$t('internal.user_abnormal_list.label2')"> -->
        <div class="bg-panda-bg-6 shadow-3 border-radius-4px ml10x" >
          <!-- 对账工具——用户对账顶部 -->
          <div
            id="top2"
            style="min-width: 1600px; overflow-x: hidden"
            class=" row
              line-height-30px
              items-center
              text-panda-text-7
              bg-panda-bg-6
              pb10x
              pt10x
              border-radius-4px
            "
          >
            <!-- 用户ID/用户名 -->
            <div class="append-handle-btn-input ml10x">
              <a-input
                v-model="searchForm.userId"
                allowClear
                style="width: 160px"
                :placeholder="$t('external.account.user_risk_control.label1')"
              />
            </div>
            
            <!-- 商户名称（对内）  请输入或选择商户名称-->
            <div
              v-if="src_internal"
              class="
                no-left
                append-handle-btn-input
                ml10x
                row
                position-relative
              "
              style="width: 180px !important; height: 30px"
            >
              <tree-select
                v-model="searchForm.merchantCodes"
                :tree_list="merchantList"
                @change-value="searchForm.merchantCodes = $event"
              >
              </tree-select>
            </div>

            <!-- 日期选择 -->
            <!-- 
            说明：
            disabledDate：不可选择的日期
            :allowClear="false"    不显示清除日期 x
            -->
            <div class="ml20x w-200">
              <a-range-picker
                :allowClear="false"
                @change="on_change"
                :value="[moment(searchForm.startDate,'YYYY-MM-DD'), moment(searchForm.endDate, 'YYYY-MM-DD')]"
                format="YYYY-MM-DD"
              />
            </div>

            <!-- 异常类型 -->
            <div class="append-handle-btn-input ml20x">
              <a-select
                v-model="searchForm.userType"
                :placeholder="$t('internal.user_abnormal_list.label4')"
                style="width: 110px"
                allowClear
              >
                <a-select-option
                  v-for="(item, index) in risk_control_list"
                  :value="item.value"
                  :key="index"
                >
                  {{ item.label }}
                </a-select-option>
              </a-select>
            </div>

            <!-- 查询 -->
            <div class="append-handle-btn-input pl20x height-30px line-height-30px">
              <a-button
                type="primary"
                @click="handle_serarch"
              >
                {{ $t('internal.user_abnormal_list.label5') }}
              </a-button>
            </div>

            <!-- 导出 -->
            <div class="append-handle-btn-input pl20x height-30px line-height-30px">
              <a-button
                type="primary"
                @click="handle_export_excel"
              >
                {{ $t('internal.user_abnormal_list.label6') }}
              </a-button>
            </div>
            <q-space />

          </div>
          <div class="pr">
            <!--  表格数据 
            columns 表格头部配置
            dataSource 内容数据
            showHeader  没数据不显示表头
            -->
            <a-table
              ref="TableInfo"
              class="pl10x pr10x expanded"
              :columns="columns"
              :dataSource="tabledata"
              :scroll="{ x: 1600, y: scrollHeight - 45 }"
              :pagination="false"
              :loading="tabledata_loading"
              size="middle"
              :rowKey="(record) => record.id"
            >
              <!-- 用户ID -->
              <span slot="userId" slot-scope="text, record" > <span class="cursor-pointer" @click="handleCopy(record.userId, $t('internal.uid_text'))" >{{ record.userId }}</span> </span>
              <!-- 用户名 -->
              <span slot="userName" slot-scope="text, record" > <span class="cursor-pointer" @click="handleCopy(record.userName, $t('internal.username_text'))" >{{ record.userName }}</span> </span>
            
              <!-- 操作时间 -->
              <span slot="operateTime" slot-scope="text, record">
              <span>
                {{ moment(record.operateTime).format("YYYY-MM-DD HH:mm:ss") }}
              </span>
            </span>


        <!-- 体育赔率分组 -->
        <span slot="marketLevel" slot-scope="text, record" > {{ record.marketLevel|filter_market_level_list }}</span >
          <!-- 电竞赔率分组 -->
        <span slot="esMarketLevel" slot-scope="text, record" > {{ record.esMarketLevel|filter_market_level_list2 }}</span >
        <!-- 投注延时 -->
        <span slot="specialBettingLimitDelayTime" slot-scope="text, record" >
          {{ record.specialBettingLimitDelayTime?record.specialBettingLimitDelayTime:'-' }}
        </span>
        <!-- 投注特殊限额 -->
        <span
          slot="specialBettingLimitType"
          slot-scope="text, record"
          @mouseover="desp_key = record.userId"
          @mouseleave="desp_key = false"
        >
        <div
        class="cursor-pointer display-block"
        @click="handleSetDesp(record)"
        >
            <q-icon
              v-if="text&&src_internal||
              src_external&&[1, 2, 3, 4].includes(record.specialBettingLimitType)"
              class=" panda-icon panda-icon-cha-kan panda-icon-hover fs18 cursor-pointer float-left mr5x "
            ></q-icon>
            <!-- //   "1": "无",  //   "3": "特殊单注单场限额", //   "4": "特殊VIP限额" //    "5": 信用限额       -->
            <span class="float-left"
            v-if="src_internal||src_external&&record.specialBettingLimitType != 2"
            >
              {{ specialBettingLimit[record.specialBettingLimitType] }}
            </span>
            <span class="float-left" v-if="src_external&&record.specialBettingLimitType == 2"
              >
              {{ tabledata_specialBettingLimitType_2[`index_${record._index}`] }}
            </span>
          </div>
        </span>
         <!-- 操作 -->
        <span
          slot="operation"
          slot-scope="text, record, index"
          class="row"
        >
             <div>
              <a-tooltip placement="bottomRight">
                <template slot="title">
                  <span>{{ $t("internal.data.user.index.betting_detail") }}</span>
                  <!-- 投注详情 -->
                </template>
                  <img src="~src/assets/external/betting_details.svg" alt="" class="table-svg cp" @click.prevent="handle_look(record, index)">
              </a-tooltip>

                  <!-- <span>赔率分组</span> -->
              <a-tooltip placement="bottomRight">
                <template slot="title">
                  <span>{{ $t("external.account.user_risk_control.label19") }}</span>
                </template>
                <img src="~src/assets/external/odds_grouped.svg" alt="" class="table-svg cp" @click.prevent="handle_show_special_limit(record, index,1)">
              </a-tooltip>
              <!-- <span>投注延时</span> -->
              <a-tooltip placement="bottomRight">
                <template slot="title">
                   <span>{{ $t("external.merchant.bettinguser.config.19") }}</span>
                </template>
                <img  src="~src/assets/external/special_delay.svg" alt="" class="table-svg cp" @click.prevent="handle_show_special_limit(record, index,2)">
              </a-tooltip>
              <a-tooltip placement="bottomRight">
                <template slot="title">
                  <!-- <span>特殊限额</span> -->
                  <span>{{ $t("external.account.user_risk_control.label16") }}</span>
                </template>
                  <img src="~src/assets/external/special_betting_limits.svg" alt="" class="table-svg cp"  
              
                @click.prevent="handle_show_special_limit(record, index)">
              </a-tooltip>
          </div>
        </span>
            </a-table>

          </div>
          <!-- 表格区域 -->
          <!-- 分页器 -->
          <a-pagination
            v-if="this.pagination.total"
            :total="pagination.total"
            :current="pagination.current"
            show-size-changer
            show-quick-jumper
            :page-size-options="pagination.pageSizeOptions"
            :page-size="pagination.pageSize"
            :show-total="total => $t('internal.showTotal_text', [pagination.total])"
            @change="onChange"
            @showSizeChange="onShowSizeChange"
          />
        </div>
       
       <!-- 产品要求暂时注释，此页面暂不删除 -->
      <!-- </a-tab-pane>
      <a-tab-pane :key="2" :tab="$t('internal.user_abnormal_list.label730_5')">
        <specialLimit/>
      </a-tab-pane>
    </a-tabs> -->
 <!-- 修改备注-->
    <q-dialog
      v-model="show_Desp"
      persistent
      transition-show="scale"
      transition-hide="scale"
    >
      <dialog-desp
      v-if="src_internal"
        :detailObj="showDialogObj"
        @handleCloseDesp="handleCloseDesp"
      ></dialog-desp>
      <dialog-desp-external
        v-else
        :detailObj="showDialogObj"
        :can_edit="dialog_desp_can_edit"
        @handleCloseDesp="handleCloseDesp"
      ></dialog-desp-external>
    </q-dialog>
  <!-- 操作  赔率分组、延迟 -->
    <q-dialog
      v-model="show_user_odds_grouped"
      persistent
      transition-show="scale"
      transition-hide="scale"
    >
     <dialogOddsGrouped
        :detailObj="showDialogObj"
        :show_type="show_user_odds_grouped_type"
         isindialog
         @handleCloseDesp="close_odds_grouped"
      ></dialogOddsGrouped>
      <!-- 导入线路vip -->
    </q-dialog>

    <!-- 报表下载弹窗 -->
    <q-dialog v-model="exportExcelShow" persistent teansition-show="scale" transition-hide="scale">
       <dialog-excel :export_param="export_param">
      </dialog-excel>
    </q-dialog>
  </div>
</template>
<script>
import { i18n } from "src/boot/i18n";
import { mapGetters } from "vuex";
import { tablecolumns_config as internal_tablecolumns_config } from "src/pages/internal/data/user_abnormal_list/config/internal_config.js"//账户中心-异常用户名单(对外) & 数据中心—异常用户名单(对内)----列表配置共用
import specialLimit from "src/pages/internal/data/user_abnormal_list/special_limit/index.vue"
import { api_merchant  ,api_account} from "src/api/index.js";
import { handleCopy } from "src/util/module/common.js";
import financesorter from "src/mixins/internal/module/financesorter.js";
import commonmixin from "src/mixins/internal/common/commontoolmixin.js";
import dataCenterMixin from "src/components/common/bet_slip/internal/mixin/datacentertablemixin.js";
import financesorter_external from "src/mixins/external/module/financesorter.js"; // pagination 分页
import commonmixin_external from "src/mixins/external/common/commontoolmixin.js"; // 格式化请求参数delete_empty_property_with_exclude
import moment from "moment";
import dialogExcel from "src/components/common/dialog/dialogExcel.vue"   // 导出excel
import dialogOddsGrouped from "src/components/common/dialog/dialog_odds_grouped.vue";//赔率分组
import dialogDesp from "src/components/common/dialog/dialogDesp.vue";
import dialogDespExternal from "src/components/common/bettinguser/external/component/dialogDesp.vue";
import treeSelect from "src/components/common/tree/tree_select.vue";

const FOR_WHICH = process.env.FOR_WHICH;
const src_internal = FOR_WHICH == "internal";
let mixins_custom = [
  commonmixin,
  financesorter,
  dataCenterMixin
];
if (FOR_WHICH == "external") {
  mixins_custom = [
    commonmixin_external,
    financesorter_external,
  ];
}
export default {
  name: "checkToolsUser",
  mixins: [...mixins_custom],
  components: {
   treeSelect,
   "dialog-excel": dialogExcel,
   specialLimit,
   dialogOddsGrouped,
   dialogDesp,
   dialogDespExternal
  },
  data () {
    return {
      is_handle_serarch:false,  //如果是点击了查询按钮则这个变量为true
      is_default_find_model: true,  // 默认是投注查询模式   切换预约模式 / 切换到投注查询模式
      tabledata_specialBettingLimitType_2: {}, //当前列表内所有的 特殊百分比限额的 限额数据
      export_param: {}, //导出报表参数
	    exportExcelShow: false,  // 导出报表弹窗阈值
      tabledata_loading: false, //表格loading
      show_user_odds_grouped :false,//操作的延时和赔率分组
      show_user_odds_grouped_type :1,//操作的延时和赔率分组 区分类型
      dialog_desp_can_edit: false, //     非   信用限额 模式  查看弹窗  是否开启 编辑功能
      show_Desp: false, //设置备注
      tabledata: [],   // 表格数据
      columns: [],   // 表格头部配置
      totalColumns: [],  // (总计配置)
      showDialogObj: {},
      searchForm: {
        startDate: moment(new Date().setDate(new Date().getDate() - 1)).format("YYYY-MM-DD"),      // 日开始时间
        endDate: moment(new Date().setDate(new Date().getDate())).format("YYYY-MM-DD"),  // 日结束时间
        userName: "", // 用户名
        merchantCode: "",   // 商户
        merchantCodes: "",  //多个商户
        userId: "", // 用户ID
        userType: undefined,    // 异常类型
      },
      value: [],// 日期默认值
      risk_control_list: i18n.t("internal.filters.risk_control_list"),//异常类型：1观察名单 2.异常会员
      specialBettingLimit: i18n.t("internal.filters.specialBettingLimit"),//全部 投注特殊限额
      activeKey: 1, // 资源切换
    };
  },
  computed: {
    ...mapGetters(["get_user_info"]),
  },
  filters:{
    filter_market_level_list(val) {
    if(!val){  return ''}
    let obj = i18n.t("internal.filters.market_level_list");
    let arr= Object.values(obj)
    let find1=  arr.find(x=>x.value==val)
      if(find1){
      return  find1.label;
      }else{
      return val
      } 
  },
  filter_market_level_list2(val) {
    if(!val){  return ''}
    let obj = i18n.t("internal.filters.market_level_list2");
    let arr= Object.values(obj)
    let find1=  arr.find(x=>x.value==val)
      if(find1){
      return  find1.label;
      }else{
      return val
      } 
  },
  },
  created () {
    // 商户表头判断
    let params = { src_internal:src_internal };
    this.columns = internal_tablecolumns_config(params).filter((x) =>x)
    this.initTableData()
    if(this.src_internal){
      this.init_merchant_list_type_code();
    }
    console.log(this.$route.query)
  },
  watch: {
    $route: {
      handler( newValue,oldValue ) {
        if ( oldValue.name === 'user_abnormal_list' ) {
          this.initTableData()
        }
      },
      deep:true
    }
  },
  methods: {
    moment,
    handleCopy,
    // 组装数据
    compute_init_tabledata_params () {
      let isClick = this.$route.query.isClick
      let abnormalClickTime = this.$route.query.abnormalClickTime
      let { userId, userName, startDate, endDate,userType,merchantCode,merchantCodes } = this.searchForm;
      if ( this.is_handle_serarch === true ) {
        isClick = null;
        abnormalClickTime = null;
      }
      let params = {
        pageNum: this.pagination.current, //  分页，查询第几页数据。
        pageSize: this.pagination.pageSize, //   分页，每页查询多少条，默认20条。可不传  
        startDate,
        endDate,
        merchantCode,
        merchantCodes,
        isClick,
        abnormalClickTime
      };      
      if(this.$lodash.isUndefined(userType)){
        params.userType = 0
      }else{
        params.userType = userType
      }
      // 判断是用户id还是用户名
      if (/^\+?[0-9][0-9]*$/.test(userId) && userId.length > 16) {
        params.userId = userId;
      } else {
        params.userName = userId;
      }
      this.is_handle_serarch = false;
      return params;
    },
      /**
     * @description 设置备注
     * @param  {Object} record 点击某行数据对象
     * @param  {Number} index 点击某行的索引
     */
    handleCloseDesp() {
      this.show_Desp = false;
      this.initTableData();
    },
    /**
     * 关闭操作  赔率分组、延迟 弹窗
     */
    close_odds_grouped(){
      this.show_user_odds_grouped = false
      this.initTableData();
    },
    /**
     * 计算 当前列表数据中所有的 特殊百分比限额的数值
     */
     
    compute_tabledata_specialBettingLimitType_2(arr) {
      this.tabledata_specialBettingLimitType_2 = {};
      let all_promise = [];
      arr.map((x) => {
        if (x.specialBettingLimitType == 2) {
          all_promise.push(this.handle_queryUserBetLimitDetail_(x));
        }
      });
      Promise.all(all_promise).then((res) => {
        let obj = {};
        res.map((y) => {
          obj = {
            ...obj,
            ...y,
          };
        });
        this.tabledata_specialBettingLimitType_2 = obj;
      });
    },
    // 请求数据
    initTableData () {
      let params = this.compute_init_tabledata_params();
      params = this.delete_empty_property_with_exclude(params)   // 此方法 值针对一层 或者 2层 结构
      let api_fn_name = "post_userabnormal_list";
      this.tabledata_loading = true;
      api_merchant[api_fn_name](params).then(res => {
        this.tabledata_loading = false;
        let code = this.$lodash.get(res, "data.code");
        let msg = this.$lodash.get(res, "data.msg");
        if (code == "0000000") {
          let arr = this.$lodash.get(res, "data.data.list") || [];
           this.tabledata = this.rebuild_tabledata_to_needed(arr);
          if(this.src_external){
            this.compute_tabledata_specialBettingLimitType_2(this.tabledata);
          } 
          this.pagination.total = this.$lodash.get(res, "data.data.total") * 1 || 0;
        } else {
          this.$message.error(msg, 5)
          this.tabledata_loading = false;
        }
      });
    },
    /**
     * 向返回的表格数据中添加——index下标
     */
    rebuild_tabledata_to_needed(arr) {
       arr.map((item, index) => {
        item._index =
          (this.pagination.current - 1) * this.pagination.pageSize + index + 1;
      })
      return arr
        },
    // 查询
    handle_serarch(){      
      this.pagination.pageNum = 1
      this.is_handle_serarch = true;
      this.initTableData()
    },

    // 导出跳转到任务中心下载
    handle_export_excel() {
      if (this.pagination.total > 0 && this.pagination.total <= 50000) {
        let { endDate, startDate, userType, merchantCode, userId, userName } = this.compute_init_tabledata_params();
        let params = {
          pageNum: this.pagination.current, //  分页
          pageSize: this.pagination.total,  // 导出数据条数
          startDate,
          endDate,
          userType,
          merchantCode,
          userId, 
          userName,
        } 
        params = this.delete_empty_property_with_exclude(params);
         if(this.src_internal){
            Object.assign(
            params,
            { "user-id": this.get_user_info.userId },
            { "app-id": this.get_user_info.appId },
            { url: "/order/abnormal/exportAbnormalStatistic" }
            );
        }else{
          Object.assign(
          params,
          { "user-id": this.get_user_info.userId },
          { "app-id": this.get_user_info.appId },
          { url: "/admin/abnormal/exportAbnormalStatistic" }
          );
        }        
        this.export_param = params;
        this.exportExcelShow = true;
      } else {
        this.$message.error(i18n.t("internal.user_abnormal_list.label13"))
      }
    },

    // 更新日期
    on_change (date, dateStrings) {
      if (dateStrings) {
        Object.assign(this.searchForm, {
          startDate: dateStrings[0],
          endDate: dateStrings[1]
        });
      }
    },

   // 查看
    handle_look(record, index) {
      this.$q.sessionStorage.set("record", record);
      this.$router.push({
        name: "betting_user_detail",
        query: {
          userId: record.userId,
          currencyCode:this.src_internal? this.searchForm.currencyCode: record["currencyCode"],
        },
      });
    },
  // 点击特殊限额 显示特殊限额
    handle_show_special_limit(record, index,type) {
      if(type == 1){
        // 这个是赔率分组
          this.showDialogObj = { ...record,dialogtype:type };
          this.show_user_odds_grouped = true;
          this.show_user_odds_grouped_type=1
      }else if(
        type ==2
      ){
        // 这个是投注延时
         this.showDialogObj = { ...record,dialogtype:type };
          this.show_user_odds_grouped = true;
        this.show_user_odds_grouped_type=2
      }else{
        let { specialBettingLimitType } = record;
        specialBettingLimitType = Number(specialBettingLimitType);
  
        if (specialBettingLimitType == 5) {
          //  // 显示  信用网商 弹窗
          this.handle_show_credit_limit(record, index);
        } 
        // else if ([1, 2].includes(specialBettingLimitType)) {
          // 用户特殊限额为无、或者特殊百分比限额：显示”特殊限额“入口   ,显示百分比的
          // http://lan-confluence.sportxxxr1pub.com/pages/external/viewpage.action?pageId=43499725
  
          this.showDialogObj = { ...record };
          this.show_Desp = true;
          this.dialog_desp_can_edit = true;
        // }

      }
    },

     /**
     * @description 设置c端多语言
     * @param  {Object} record 点击某行数据对象
     * @param  {Number} index 点击某行的索引
     */
    handleSetDesp(record) {
        if(this.src_external){
      let check = [1, 2, 3, 4].includes(record.specialBettingLimitType);
      if (!check) {
        return false;
      }   
        }
      this.showDialogObj = { ...record };
      this.show_Desp = true;
        if(this.src_external){  
      this.dialog_desp_can_edit = false;
        }
    },

    /**
     * @description:查询 限额  备注 详情
     */
     async handle_queryUserBetLimitDetail_(detailObj) {
      //       "specialBettingLimit": {
      //   "1": "无",
      //   "2": "特殊百分比限额",
      //   "3": "特殊单注单场限额",
      //   "4": "特殊VIP限额"
      //    "5": 信用限额
      // },
      let percentageLimit_show_num = "";
      let res = await api_account.post_order_user_queryUserBetLimitDetail({
        userId: detailObj.userId,
      });
      let code = this.$lodash.get(res, "data.code");
      if (code == "0000000") {
        let arr =
          this.$lodash.get(res, "data.data.rcsUserSpecialBetLimitConfigList") ||
          [];
          if (arr.length >= 1) {
            let item_list = arr.find(item => item.status)
            percentageLimit_show_num =
            (item_list.percentageLimit * 100).toFixed(2) + "%";
          }//投注特殊限额选项
      }
      return Promise.resolve({
        [`index_${detailObj._index}`]: percentageLimit_show_num,
      });
    },


  }
};
</script>
<style lang="scss" scoped>
::v-deep .ant-spin-nested-loading > div > .ant-spin {
  max-height: 660px;
  min-height: 660px;
}
::v-deep .ant-empty-normal {
  margin: 277px 0;
}
::v-deep .ant-table-footer .ant-table-body {
  overflow: hidden !important;
}
::v-deep .ant-table-footer {
  padding: 0px;
  padding-right: 8px;
}
.text-over1 {
  display: inline-block;
  max-width: 155px;
  vertical-align: middle;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
.text-over3 {
  display: inline-block;
  max-width: 65px;
  vertical-align: middle;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
.text-over {
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100px;
  white-space: nowrap;
}
.text-over-130 {
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 230px;
  white-space: nowrap;
}
.text-over-200 {
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 200px;
  white-space: nowrap;
}
.no-left ::v-deep .q-field__append {
  border-left: none;
}
::v-deep .ant-table-thead > tr > th .ant-table-column-sorter {
  right: 20%;
}
::v-deep .ant-table-expanded-row td {
  padding: 0px;
}
::v-deep
  .ant-table-middle
  > .ant-table-content
  > .ant-table-scroll
  > .ant-table-header
  > table
  > .ant-table-thead
  > tr
  > th {
  background: #f4f5f8;
}
::v-deep
  .ant-table-middle
  > .ant-table-content
  > .ant-table-fixed-right
  > .ant-table-header
  > table
  > .ant-table-thead
  > tr
  > th {
  background: #f4f5f8;
}
::v-deep
  .ant-table-middle
  > .ant-table-content
  > .ant-table-fixed-left
  > .ant-table-header
  > table
  > .ant-table-thead
  > tr
  > th {
  background: #f4f5f8;
}
.text-indent {
  text-indent: 28px;
}
.loading-mian {
  position: absolute;
  z-index: 99;
  background-color: #fff;
  top: 0px;
  bottom: 10px;
  left: 10px;
  right: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
}
.loading-mian .anticon-info-circle {
  font-size: 40px;
  margin-right: 8px;
}
.loading-mian .anticon-sync {
  font-size: 30px;
  margin-bottom: 10px;
}
.loading-mian .anticon-check-circle {
  font-size: 40px;
  margin-right: 8px;
}
.loading-mian .color-primary {
  color: #1890ff;
}
.pr {
  position: relative;
}
.color-red {
  color: #f00;
}
.color-2CE858 {
  color: #5ccc76;
}
.table-svg{
  font-size: 16px;
  width: 20px;
  height: 20px;
  margin-left: 10px;
}

</style>
