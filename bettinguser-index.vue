<!--
 * @FilePath: /src/components/common/bettinguser/index.vue
 * @Description: 共用：投注用户管理(内/外)+投注用户白名单(对内)
-->
<template>
  <div class="full-height full-width">
    <!--头部面包屑导航-->
    <div class="pl10x pt10x pb10x" id="top1">
      <q-breadcrumbs separator="/" active-color="whiddte" class="panda-text-2">
      <!-- 0:商户中心 -->
        <q-breadcrumbs-el
        v-if="src_internal"
          :label="$t('internal.merchant.bettinguser.index.bar')[0]"
        />
         <!-- 账户中心-->
         <q-breadcrumbs-el
         v-else
          :label="$t('external.merchant.bettinguser.index.bar')[0]"
        />
          <!-- 0:商户中心  1:投注用户管理 2:投注用户白名单 -->
          <q-breadcrumbs-el
          v-if="src_internal"
          :label="$t('internal.merchant.bettinguser.index.bar')[is_for_white_betting_users ? '2' : '1']"
          class="panda-text-1"
        />
          <q-breadcrumbs-el
          v-else
          :label="$t('external.merchant.bettinguser.index.bar')[is_for_white_betting_users ? '2' : '1']"
          class="panda-text-1"
        />
      </q-breadcrumbs>
    </div>
    <div
      class="bg-panda-bg-6 shadow-3 border-radius-4px ml10x"
      style="magin: 0 10px 10px 0"
    >
      <div id="top2" class=" row line-height-30px items-center text-panda-text-dark bg-panda-bg-6 p110x pt10x pb10x border-radius-4px " >
        <!--请输入用户ID-->
        <div class=" no-left append-handle-btn-input row ml10x position-relative w-180 " >
          <a-input
            v-model.trim="searchForm.userId"
            :placeholder="$t('internal.merchant.bettinguser.index.placeholder.userId')"
            @keydown.enter="handle_search"
            autocomplete="off"
            allowClear
          >
            <my-icon
              slot="suffix"
              type="p-icon-chazhao"
              class="text-panda-text-4 fs12"
            />
          </a-input>
          <div class="position-absolute select-left-border-finance"></div>
        </div>
        <!-- 请输入用户名 -->
        <div class=" no-left append-handle-btn-input row ml10x position-relative w-180 " >
            <a-input
              v-model.trim="searchForm.userName"
              :placeholder="$t('internal.placeholder.label16')"
              @keydown.enter="handle_search"
              autocomplete="off"
              allowClear
            >
              <my-icon
                slot="suffix"
                type="p-icon-chazhao"
                class="text-panda-text-4 fs12"
              />
            </a-input>
            <div class="position-absolute select-left-border-finance"></div>
          </div>
        <div
          class="no-left append-handle-btn-input ml10x position-relative"
          style="width: 200px !important; height: 30px"
          v-if="src_internal||src_external&&[1, 10].includes(get_user_info.agentLevel)"
        >
          <tree-select
            :tree_list="src_internal?merchantList:merhchantList"
            v-on:change-value="searchForm.merchantCodeList = $event"
          ></tree-select>
        </div>
        <!--全部-->
        <div class="append-handle-btn-input position-relative ml10x" v-if="src_internal && !is_for_white_betting_users">
          <a-select
            autocomplete
            class="w-200"
            :placeholder=" $t( 'internal.merchant.bettinguser.index.placeholder.specialBettingLimitType' ) "
            v-model.trim="searchForm.specialBettingLimitType"
            @change="handle_search"
          >
            <a-select-option :value="''">
            {{ $t("internal.template.label56") }}
            </a-select-option>
            <a-select-option
              :value="Number(index)"
              v-for="(item, index) in specialBettingLimit"
              :key="index"
              >{{ item }}</a-select-option
            >
          </a-select>
          <div class="position-absolute select-left-border-finance"></div>
        </div>
        <!--特殊限额设置时间-->
        <div class="append-handle-btn-input line-height-30px ml10x" v-if="src_external">
          <div>
            <div class="">
              {{ $t("internal.template.label147") }}&nbsp;
              <a-range-picker
                style="width: 200px"
                showToday
                @change="on_change"
              />
            </div>
          </div>
        </div>
        <!--请选择投注币种-->
        <div class="append-handle-btn-input pl10x position-relative" v-if="src_internal && !is_for_white_betting_users">
          <a-select
            autocomplete
            :filter-option="filterOptionCurrency"
            show-search
            class="w-150"
            :placeholder="
              $t('internal.data.matchbonus.index.placeholder.currencyList')
            "
            @change="handle_currency"
            v-model="searchForm.currencyCode"
          >
            <a-select-option
              :value="item.value"
              v-for="(item, index) in currencyList"
              :key="index"
              >{{ item.label }}</a-select-option
            >
          </a-select>
          <div class="position-absolute select-left-border-finance"></div>
        </div>
         <!--是否线路商vip    -->
        <div class="append-handle-btn-input pl10x position-relative"  v-if="src_internal && !is_for_white_betting_users">
          <a-select
            autocomplete
            class="w-150"
           :value="$t('internal.merchant.bettinguser.config.21')"
           v-model="searchForm.isvip"
           @change="handle_is_vip"
          >
            <a-select-option
              :value="item.value"
               v-for="(item, index) in is_vip_list"
              :key="index"
              >{{ item.label }}</a-select-option
            >
          </a-select>
          <div class="position-absolute select-left-border-finance"></div>
        </div>
      <!--全部来源-->
        <div class="append-handle-btn-input pl10x position-relative"  v-if="src_internal && is_for_white_betting_users">
          <a-select
            autocomplete
            class="w-150"
           :value="$t('internal.merchant.bettinguser.config.35')"
            v-model="searchForm.allowListSource "
          >
          <a-select-option
                    v-for="(item, index) in total_source_list"
                    :key="index"
                    :value="item.value"
                     >
                     {{ item.label }}
                     
              </a-select-option >
          </a-select>
          <div class="position-absolute select-left-border-finance"></div>
        </div>

        <div class=" no-left append-handle-btn-input row ml10x position-relative  "  v-if="src_external">
          <!-- 赔率分组 -->
          {{ $t("external.account.user_risk_control.label19") }}
          <a-select
            v-model="searchForm.marketLevel"
            style="width:100px;margin-left:5px"
            class="disabled-white"
            allowClear
          >
            <a-select-option
              v-for="item in market_level_list"
              :key="`${item.value }_market_level_list`"
              :value="item.value"
            >{{ item.label  }}
            </a-select-option>
          </a-select>
        </div>
        <div class=" no-left append-handle-btn-input row ml10x position-relative " v-if="src_external">
          <!-- 投注延时 -->
          {{ $t("external.merchant.bettinguser.config.19") }}
          <a-input-number id="inputNumber" v-model="searchForm.specialBettingLimitDelayTime" style="margin-left:5px" />
        </div>
      <!-- 折叠按钮 -->
      <div class="top line-height-32px"  v-if="!is_for_white_betting_users">
        <my-icon 
        @click="handle_click_expand"      
          :type="is_expand ? 'p-icon-bottom' : 'p-icon-top'"
          class="fs20 ml10x cursor-pointer"
        >
        </my-icon>
      </div>
        <!--搜索-->
        <q-btn
          class="panda-btn-primary-dense bg-primary ml10x"
          style="width: 70px; height: 30px"
          :label="$t('internal.search')"
          @click="handle_search"
        />
        <!-- </div> -->
           <!--全部删除-->
          <a-popconfirm  v-if="src_internal"
            :title="$t('internal.merchant.bettinguser.config.43')"
            @confirm="hande_all_delete(record)"
            :okText="$t('internal.sure')"
            :cancelText="$t('internal.cancel')"
            placement="topRight"
          >
              <!-- 全部删除 -->
            <a-tooltip placement="top" v-if="is_for_white_betting_users" >
            <q-btn
          class="panda-btn-primary-dense bg-primary ml10x"
          style="width: 100px; height: 30px"
         :label="$t('internal.merchant.bettinguser.config.37')"
        />
            </a-tooltip>
          </a-popconfirm>
         <!-- 导入白名单 -->
         <q-btn
          v-if="src_internal && is_for_white_betting_users"
          class="panda-btn-primary-dense bg-primary ml10x"
          style="width: 160px; height: 30px"
          :label="$t('internal.merchant.bettinguser.config.38')"
           @click="handle_whitelist_import()"
        />
        <!-- 导入线路VIP -->
         <q-btn
          v-if="src_internal && !is_for_white_betting_users"
          class="panda-btn-primary-dense bg-primary ml10x"
          style="width: 160px; height: 30px"
          :label="$t('internal.merchant.bettinguser.config.26')"
           @click="handle_vip_import()"
        />
        <!-- 批量启&禁用 -->
        <q-btn
          v-if="src_internal && !is_for_white_betting_users && $_has('Merchant:user:importToDisabled')"
          class="panda-btn-primary-dense bg-primary ml10x"
          style="width: 140px; height: 30px"
          :label="$t('internal.merchant.bettinguser.config.28')"
           @click="handle_disabled_user"
        />
        <!-- 导出 -->
        <q-btn
          v-if="src_internal && $_has('Merchant:Order:user:bet:export')"
          class="panda-btn-primary-dense bg-primary ml10x"
          style="width: 70px; height: 30px"
          :label="$t('internal.label.label42')"
           @click="handle_export_excel"
        />
        <template v-if="is_expand">
      <!-- 第二排  开始 -->
      <div class=" row mt5x full-width items-center line-height-30px bg-panda-bg-6 q-gutter-y-sm text-panda-text-dark " >
      <!-- 按时间分类 2330需求 -->
      <div class="append-handle-btn-input pl10x position-relative "  v-if="!is_for_white_betting_users">
        <a-select
          autocomplete
          class="w-150"
          :placeholder="$t('internal.page_multilingual.page_data.text_62')"
          v-model="searchForm.timeType"
        >
          <a-select-option
            :value="item.value"
             v-for="(item, index) in filterByTime"
            :key="index"
            >{{ item.label }}</a-select-option
          >
        </a-select>
        <div class="position-absolute select-left-border-finance"></div>
      </div>
      <!-- 天数快选 -->
      <div class="append-handle-btn-input pl10x position-relative "  v-if="!is_for_white_betting_users ">
        <a-select
          autocomplete
          class="w-100"
          :placeholder="$t('internal.merchant.bettinguser.config.45')"
          v-model="searchForm.dateType"
           @change="handle_date_range"
        >
          <a-select-option
            :value="item.value"
             v-for="(item, index) in numberOfDay"
            :key="index"
            >{{ item.label }}</a-select-option
          >
        </a-select>
        <div class="position-absolute select-left-border-finance"></div>
      </div>
      <!-- 日期选择 -->
      <div class="append-handle-btn-input ml10x w-270"  v-if="!is_for_white_betting_users">
            <a-range-picker 
            :disabled = 'searchForm.dateType !== 4'
            :show-time="true"
            showToday 
            :allowClear="false"
            :value="[
            searchForm.startTime,
            searchForm.endTime, 
              ]"
              @change="on_change_time" 
             />
          </div>
          </div>
          <!-- 第二排  结束 -->
        </template>
      </div>
      <a-table
        class="pl10x pr10x"
        :columns="columns"
        :dataSource="tabledata"
        :scroll="{ x: 2040, y: scrollHeight }"
        :pagination="false"
        :loading="tabledata_loading"
        @change="sorterForTable"
        size="middle"
        :rowKey="(record) => record._index"
      >
        <!-- 用户ID -->
        <span slot="userId" slot-scope="text, record">
          <span
            class="cursor-pointer"
            @click="handleCopy(record.userId, $t('internal.uid_text'))"
            >{{ record.userId }}
            </span >
        </span>
        <!-- 用户名 -->
        <span slot="userName" slot-scope="text, record">
          <div
            class="cursor-pointer"
            style="width: 150px"
            @click="handleCopy(record.userName, $t('internal.username_text'))"
          >
            <table-cell-ellipsis-ant
              :str_all="record.userName"
            ></table-cell-ellipsis-ant>
          </div>
        </span>
          <!-- 投注用户白名单 来源 -->
        <span  slot="allowListSource" slot-scope="text, record">
          <div style="width: 150px" >
           {{  compute_show_record_allowListSource(record)}}
          </div>
        </span>
        <!-- 启&禁用 -->
        <span slot="disabled" slot-scope="text, record">
            <!-- 0启用/1禁用   label8启用 / label9禁用 -->
            <template v-if="$_has('Merchant:user:updateDisabled')">
              <a-switch @click="disabled_swith_user(record)" :checked="text == 1 ? false : true"
              :checked-children="$t('internal.message.label8')"
              :un-checked-children="$t('internal.message.label9')" />
              <!-- 提示框 有备注字段-->
              <a-tooltip overlayClassName="tooltip-content-remark-text" v-if="record.remark">
                <template slot="title">
                  <div v-html="record.remark.replace(/\n/g,'<br>')"></div>
                </template>
                <!-- 禁用 && 有备注 才展示提示按钮-->
                <a-icon type="info-circle" class="text-red fs15 cursor-pointer q-ml-xs" v-if="text == 1 && record.remark.length" />
              </a-tooltip>
            </template>
            <template v-else><span>{{ text == 1 ? $t('internal.message.label9'):  $t('internal.message.label8')  }}</span></template>
        </span>
        <!-- 所属商户 -->
        <span slot="merchantName" slot-scope="text, record">
          <table-cell-ellipsis-ant
            :span_html=" '<div class=\'ellipsis\'>' + record.merchantName + '</div>' "
            :str_all="'<div>' + record.merchantName + '</div>'"
            :defaultplace="'topLeft'"
            :str="record.merchantName"
            :col_width="180"
          ></table-cell-ellipsis-ant>
        </span>
        <!-- 线路vip -->
        <span slot="isvip" slot-scope="text, record">
          <div class="text-over"
            v-if="!record.isvip_editing"
            @mouseenter="handle_isvip_enter(record)"
            @mouseleave="handle_isvip_leave(record)">
            <!--  1或者null  否  2:是 -->
            <span>{{ record.isvip == 2 ?$t('internal.common.label63')   : $t('internal.common.label64') }}</span>
             <q-icon
              v-if="record.show_isvip_edit_icon "
              class=" panda-icon panda-icon-bian-ji panda-icon-hover fs18 cursor-pointer ml5x "
              @click="handle_isvip_edit_icon_click(record)"
            >
            </q-icon>
          </div>
              <!-- 编辑状态 -->
            <!-- vip 下拉框 -->
           <div  v-if="record.isvip_editing">
            <a-select
               v-model="record.isvip_edit"
              default-value=""
              style="width: 80px"
            >
           <a-select-option
              v-for="(item, index) in vip_list"
              :key="index"
              :value="item.value"
            >
              {{ item.label }}
              </a-select-option>
            </a-select>
            <a-icon
              type="check"
             @click="handle_isvip_edit_complete(record)"
              class="duihao  q-mx-sm"
            />
            <a-icon
              type="close"
              @click="handle_isvip_edit_cancel(record)"
              class="guanbi"
            />
          </div>
        </span>
        <!-- 可用余额 -->
        <span slot="amount" slot-scope="text, record">
          <div class="text-over">
            <span>{{ record.amount | filterMoneyFormat }}</span>
          </div>
        </span>
        <!-- 累计投注额 -->
        <span slot="betAmount" slot-scope="text, record">
          <div class="text-over">
            <span>{{ record.betAmount | filterMoneyFormat }}</span>
          </div>
        </span>
          <!-- 有效投注额 -->
          <span slot="orderValidBetMoney" slot-scope="text, record">
          <div class="text-over">
            <span>{{ record.orderValidBetMoney | filterMoneyFormat }}</span>
          </div>
        </span>
        <!-- 累计盈利 -->
        <span slot="profit" slot-scope="text, record">
          <div class="text-over">
            <span>{{ record.profit | filterMoneyFormat }}</span>
          </div>
        </span>
        <!-- 注单数量 -->
        <span slot="betNum" slot-scope="text, record">
          <div class="text-over">
            <span v-if="src_internal">{{ record.betNum | filterAmount }}</span>
            <span v-else>{{ record.betNum | amount }}</span>
          </div>
        </span>
        <!-- 用户币种 -->
        <span slot="currencyCode" slot-scope="text, record">
          <div class="text-over">
            <span>{{ filterCurrency[record.currencyCode] }}</span>
          </div>
        </span>
         <!--注册时间 -->
         <span slot="createTime" slot-scope="text, record">
             {{ moment(record.createTime).format("YYYY-MM-DD HH:mm:ss") }}
        </span>
        <!-- 最后登录时间 -->
        <span slot="lastLoginStr" slot-scope="text, record">
          <span
            v-if=" record.lastLoginStr == $t('internal.merchant.bettinguser.index.just_now')[0] "
            >{{ record.lastLoginStr }}</span>
          <span v-else >
            {{ record.lastLoginStr }}
            <span v-if="record.lastLoginStr">
            {{ $t("internal.merchant.bettinguser.index.just_now")[1] }}
            </span>
            </span>
        </span>
        <!-- 在线状态 -->
        <span slot="enabled" slot-scope="enabled">
          <span v-if="enabled == 1">
          {{ $t("internal.merchant.bettinguser.index.online") }}
          </span>
          <span v-else>--</span>
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
        <!-- 投注延时 -->
        <span
          slot="specialBettingLimitDelayTime"
          slot-scope="text, record"
          >
          {{ record.specialBettingLimitDelayTime?record.specialBettingLimitDelayTime:'-' }}
          </span>
        <!-- 赔率分组 -->
        <span slot="marketLevel" slot-scope="text, record" > {{ record.marketLevel|filter_market_level_list }}</span >
        <!-- 特殊管控设置时间 -->
        <span
          v-if="text"
          slot="specialBettingLimitTime"
          slot-scope="text, record"
          >
          {{ moment(record.specialBettingLimitTime).format("YYYY-MM-DD HH:mm:ss") }}
          </span>
        <!-- 操作 -->
        <span
          slot="action"
          slot-scope="text, record, index"
          class="row"
        >
         <!-- 特殊限额  请忽删除-->
          <!-- <a
            class="bet q-ml-md"
            v-if="
            src_external&&
              [1, 2, 5].includes(1 * record.specialBettingLimitType) &&
              have_special_limit_permission
            "
            @click.prevent="handle_show_special_limit(record, index)"
            >{{ $t("external.template2.label31") }}</a
          > -->
          <div>
              <a-tooltip placement="bottomRight" v-if="!is_for_white_betting_users">
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
                <img v-if="src_external" src="~src/assets/external/odds_grouped.svg" alt="" class="table-svg cp" @click.prevent="handle_show_special_limit(record, index,1)">
              </a-tooltip>
              <!-- <span>投注延时</span> -->
              <a-tooltip placement="bottomRight">
                <template slot="title">
                   <span>{{ $t("external.merchant.bettinguser.config.19") }}</span>
                </template>
                <img v-if="src_external" src="~src/assets/external/special_delay.svg" alt="" class="table-svg cp" @click.prevent="handle_show_special_limit(record, index,2)">
              </a-tooltip>
              <a-tooltip placement="bottomRight">
                <template slot="title">
                  <!-- <span>特殊限额</span> -->
                  <span>{{ $t("external.account.user_risk_control.label16") }}</span>
                </template>
                 
                    <!-- 改动 592-- v-if=" src_external&& [1, 2, 5].includes(1 * record.specialBettingLimitType) && have_special_limit_permission " -->
                  <img src="~src/assets/external/special_betting_limits.svg" alt="" class="table-svg cp"  
              
                  v-if=" src_external&& [1, 2, 5].includes(1 * record.specialBettingLimitType) && have_special_limit_permission "
                @click.prevent="handle_show_special_limit(record, index)">
              </a-tooltip>
          </div>
          <!-- 删除单条 白名单记录  你确定删除白名单吗? -->
          <a-popconfirm  v-if="src_internal"
            :title="$t('internal.merchant.bettinguser.config.44')"
            @confirm="handle_confirm_delete_row(record)"
            :okText="$t('internal.sure')"
            :cancelText="$t('internal.cancel')"
            placement="topRight"
          >
              <!-- 删除白名单 -->
            <a-tooltip placement="top" v-if="is_for_white_betting_users" >
              <template slot="title">
                <div class="fs12">
                 {{ $t("internal.merchant.bettinguser.config.42") }}
                </div>
              </template>
              <q-icon class="ml60x panda-icon panda-icon-delete panda-icon-hover fs19 cursor-pointer " ></q-icon>
            </a-tooltip>
          </a-popconfirm>
        </span>
      </a-table>
      <a-pagination
        v-if="tabledata.length > 0"
        :total="pagination.total"
        :current="pagination.current"
        show-size-changer
        show-quick-jumper
        :page-size-options="pagination.pageSizeOptions"
        :page-size="pagination.pageSize"
        :show-total=" (total) => $t('internal.showTotal_text', [pagination.total]) "
        @change="onChange"
        @showSizeChange="onShowSizeChange"
      />
    </div>
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
    <!-- 用户名标签组件-->
    <q-dialog
      v-model="show_user"
      persistent
      transition-show="scale"
      transition-hide="scale"
    >
      <user-name
        :userIdList="this.src_internal?userIdList:''"
        @handle_confirm="handle_confirm_"
      ></user-name>
    </q-dialog>
    <!-- 信用限额 模式  查看弹窗   -->
    <q-dialog
      v-model="show_credit_limit"
      persistent
      transition-show="scale"
      transition-hide="scale"
    >
      <dialog-credit-limit
        :detailObj="showDialogObj"
        isindialog
        @close="handleCloseCreditLimit"
      ></dialog-credit-limit>
    </q-dialog>
    <!-- 操作  赔率分组、投注延迟  弹窗-->
    <q-dialog
      v-model="show_user_odds_grouped"
      persistent
      transition-show="scale"
      transition-hide="scale"
    >
     <dialogOddsGrouped
        :detailObj="showDialogObj"
         isindialog
         @handleCloseDesp="close_odds_grouped"
      ></dialogOddsGrouped>
      <!-- 导入线路vip -->
    </q-dialog>
    <!-- 批量启&禁用 弹窗   -->
    <q-dialog v-model="show_disabled_user" persistent>
      <dialog-disabled-user 
      @on_close="handleCloseDisabledUser" 
      :dialogtitle="$t('internal.merchant.bettinguser.config.30')" 
      titleId="user"
      ></dialog-disabled-user>
    </q-dialog>
    <!-- 报表下载弹窗 -->
    <q-dialog
      v-model="exportExcelShow"
      persistent
      transition-show="scale"
      transition-hide="scale"
    >
      <dialog-excel :export_param="export_param"></dialog-excel>
    </q-dialog>
<!-- 导入线路VIP -->
<q-dialog
 v-model="show_import_vip_dialog"
 persistent
 transition-show="scale"
 transition-hide="scale"
>
<dialog-import-line-vip
:getailObj="showDialogObj"
@close_dialog_import_line_vip="handle_close_dialog_import_vip"
>
</dialog-import-line-vip>
</q-dialog>
  <!-- 导入白名单  弹窗  -->
    <q-dialog 
     v-model="show_import_whitelist_dialog"
      persistent
      transition-show="scale"
      transition-hide="scale"
    >
       <dialog-import-whitelist 
       :detailObj="showDialogObj"
        @close_dialog_import_whitelist="handle_close_dialog_import_whitelist"
       >
      </dialog-import-whitelist>
    </q-dialog>
  </div>
</template>
<script>
import moment from "moment";
import { i18n } from "src/boot/i18n";
import { mapGetters, mapActions } from "vuex";
import mixins from "src/mixins/internal/index.js";
import { api_user ,api_account} from "src/api/index.js";
import mixins_external from "src/mixins/external/index.js";
import constantmixin from "src/mixins/internal/common/constantmixin.js";
import usernamemixin from "src/mixins/internal/common/usernamemixin.js";
import basepagination from "src/mixins/internal/module/basepagination.js";
import constantmixin_external from "src/mixins/external/common/constantmixin.js";
import { handleCopy} from "src/util/module/common.js";
import { channelConfig } from "src/components/common/bettinguser/external/config/channelConfig.js";//账户中心.投注用户管理（渠道：列表配置）
import { tablecolumns_config as tablecolumns_config_external} from "src/components/common/bettinguser/external/config/config.js";//账户中心.投注用户管理（直营&二级：列表配置）
import { tablecolumns_config as tablecolumns_config_internal } from "src/components/common/bettinguser/internal/config/config.js";//商户中心.投注用户管理(列表配置)
import treeSelect from "src/components/common/tree/tree_select.vue";
import dialogExcel from "src/components/common/dialog/dialogExcel.vue";// 导出
import dialogDisabledUser from "src/components/common/dialog_set/dialogDisabledUser.vue";// 批量启&禁用
import dialogImportWhitelist from "src/components/common/dialog_set/dialogImportWhitelist.vue";// 导入白名单弹窗
import dialogImportLineVip from "src/components/common/dialog_set/importLineVip.vue";// 导入线路VIP弹窗
import tableCellEllipsisAnt from "src/components/internal/table/tableCellEllipsisAnt.vue";
import dialogDesp from "src/components/common/bettinguser/internal/component/dialogDesp.vue";
import dialogCreditLimit from "src/pages/external/account/component/dialogCreditLimitComEdit.vue";
import dialogDespExternal from "src/components/common/bettinguser/external/component/dialogDesp.vue"; // 对外-账户中心-投注用户管理-特殊限额
import dialogOddsGrouped from "src/components/common/bettinguser/external/component/dialog_odds_grouped.vue";//账户中心-投注用户管理（赔率分组、投注延迟  弹窗 ）
const xinyong_svg_icon = require("src/assets/external/icon/xinyong.svg");
const FOR_WHICH = process.env.FOR_WHICH;
let mixins_custom=  [...mixins, constantmixin, usernamemixin ,basepagination];
if(FOR_WHICH=="external"){
  mixins_custom= [...mixins_external, constantmixin_external,basepagination];
}
export default {
  mixins: [...mixins_custom],
  data() {
    return {
      is_expand: false,//展开按钮
      columns:[],
      timer: null,// 定时器 
      desp_key: "",//投注特殊限额
      channelConfig,
      xinyong_svg_icon,
      tabledata: [], // 表格数据   
      export_param: {}, // 导出报表参数
      showDialogObj: {},
      tabledata_specialBettingLimitType_2: {}, //当前列表内所有的 特殊百分比限额的 限额数据
      is_for_white_betting_users: false, // betting_user： 投注用户管理    white_betting_users：投注用户白名单
      show_user: false, // 用户名标签弹窗阀值
      show_Desp: false, //设置备注
      exportExcelShow: false,//导出报表阈值
      tabledata_loading: false,//表格loading
      show_credit_limit: false,//信用限额 模式  查看弹窗
      show_disabled_user: false,// 批量启&禁用 弹窗阈值
      dialog_desp_can_edit: false,//非 信用限额 模式  查看弹窗  是否开启 编辑功能
      show_import_vip_dialog:false,//导入vip的弹窗 显示控制
      show_import_whitelist_dialog:false,//导入白名单的弹窗 显示控制
      show_user_odds_grouped :false,//操作的延时和赔率分组
      is_vip_list: i18n.t("internal.filters.is_vip_list"),//是否线路vip下拉框
      vip_list: i18n.t("internal.filters.vip_list"),//线路 vip编辑下拉框
      total_source_list: i18n.t("internal.filters.total_source"),//全部来源 ：0.全部来源  2.商户VIP  3.测试商户  4.C端测试账户  3.其他
      import_total_source_list: i18n.t("internal.filters.import_total_source"),//请输入白名单来源 下拉选择 :0.请输入白名单来源  2.商户VIP  3.测试商户  4.C端测试账户  5.其他 
      market_level_list: i18n.t("internal.filters.market_level_list"),//赔率分组：
      specialBettingLimit: i18n.t("internal.filters.specialBettingLimit"),//全部 投注特殊限额: 1.无  2.特殊百分比限额  3.特殊单注单场限额  4.特殊VIP限额
      filterByTime: i18n.t("internal.filters.filterByTime"), // 注册时间： 1.注册时间  2.最后投注时间 3.最后登录时间
      numberOfDay: i18n.t("internal.filters.numberOfDay"), //日期选择： 1. 3天  2. 7天 3. 14天
      searchForm_temp: {
        userId: "", //商户ID
        userName: "", //用户名
        merchantCodeList: "", //商户名称
        specialBettingLimitType: "", //投注特殊限额   赔率分组/投注延时 
        startSpecialBettingLimitTimeL: null,
        endSpecialBettingLimitTimeL: null,
        currencyCode: "", //全部币种
        marketLevel:null,//赔率分组
        specialBettingLimitDelayTime:null,//投注延时
        isvip:"",//默认不选择  1或者null  否  2:是
        allowListSource :"", //全部来源 ：0.全部来源  2.商户VIP  3.测试商户  4.C端测试账户  5.
        dateType:3, //选择查询的时间段
        timeType:1,//选择查询的时间的类型
        startTime: `${moment(new Date().setDate(new Date().getDate()- 13 )).format("YYYY-MM-DD")} 00:00:00`, //开始日期
        endTime: `${moment(new Date().setDate(new Date().getDate()) + 3).format("YYYY-MM-DD")} 23:59:59`, // 结束日期 
      }, 
      searchForm:{},
    };
  },
  components: {
    treeSelect,
    tableCellEllipsisAnt,
    dialogCreditLimit,
    dialogDesp,
    dialogDespExternal,
    dialogOddsGrouped,//账户中心-投注用户管理（赔率分组、投注延迟  弹窗） 
    dialogDisabledUser,
    dialogExcel,
    dialogImportWhitelist,
    dialogImportLineVip,//导入线路VIP 弹窗
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
  },
  computed: {
    ...mapGetters(["get_user_info", "get_data"]),
    have_special_limit_permission() {

      let { menus } = this.get_user_info;       // 改动  844
      let all_menu_name = []; // 接 收 所有的  设置的菜单的   path
      let digui = (menus, all_menu_name) => {
        menus.map((x, i) => {
          all_menu_name.push(x.path);
          digui(x.children || [], all_menu_name);
        });
      };
      digui(menus, all_menu_name);

      console.log("计算 all_menu_name ----------", all_menu_name);
      let show_special_limit = all_menu_name.includes("special_limit");       // 改动  855
      if (!show_special_limit) {
        this.columns[this.columns.length - 1]["width"] = 60;
      }
      return show_special_limit;
    },
    show_credit() {
      let show = false;
      show = [0, 2].includes(Number(this.pagination.agentLevel));
      return show;
    },
  },
  created() {
    // this.handle_date_range()
    this.init_config_by_route();
    this.columns=this.src_internal?this.columns:this.columns_external();
    this.init_params();
    this.src_internal&&this.init_merchant_list()||
    this.src_external&&[1, 10].includes(this.get_user_info.agentLevel) &&
    this.init_merchant_list();
  },
 watch: {
    $route(newValue, oldValue) {
      this.init_config_by_route();
    }
  },
  methods: {
    moment,
    ...mapActions(["clear_data"]),
    handleCopy,
    /**
     * 搜索条件重置按钮
     */
     handle_click_expand() {
      this.is_expand = !this.is_expand;
      this.$nextTick(()=>{
        this.get_max_height();
      })
    },
    /**
     * 计算列表配置项
     */
    compute_columns(){
    let columns=[]
      if(FOR_WHICH=="external"){
        //对外
        columns=tablecolumns_config_external
      }else{
        //对内
      let route_name =   this.$route.name
      columns=tablecolumns_config_internal({route_name})
      }
      this.columns = columns
    },
    /**
     * 重置  searchForm
     */
    rebase_searchForm(){
      this.searchForm ={...this.searchForm_temp}
    },
     // 当路由改变根据路由 计算 当前  用 betting_user 还是 white_betting_users 的 页面配置
    // 或者页面创建的时候去 初始化
    init_config_by_route() {
      let rname = this.$route.name;
      if(this.src_internal){
        let fw = rname == "betting_user" ? "betting_user" : "white_betting_users";
        this.is_for_white_betting_users = fw == "white_betting_users";
      }
      this.compute_columns()
      this.rebase_searchForm()
      this.rebase_pagination()
      this.tabledata=[]
    },
    // 鼠标进入线路vip
    handle_isvip_enter(record) {
      record.show_isvip_edit_icon = true;
    },
    // 鼠标离开线路vip
    handle_isvip_leave(record) {
      record.show_isvip_edit_icon = false;
    },
    //打开线路vip编辑框
    handle_isvip_edit_icon_click(record) {
      record.isvip_editing = true;
      record.show_isvip_edit_icon = false;
    },
    //取消编辑vip
    handle_isvip_edit_cancel(record) {
      record.isvip_editing = false;
      record.show_isvip_edit_icon = false;
      record.isvip_edit  =  record.isvip ;
    },
    //线路vip修改完成
    handle_isvip_edit_complete(record) {
      record.isvip_editing = false;
      record.show_isvip_edit_icon = false;
    this.handle_update_isvipOrExternal(record)
    },
  //修改线路vip
    handle_update_isvipOrExternal(record){
    console.log('handle_update_isvipOrExternal(record) -',record );
    let {userId,isvip_edit} = record
    let params={
        userId :userId.toString(),
      // isVipDomain i 1或者null  否  2:是
        isVipDomain:isvip_edit
    }
    api_user.get_update_IsVipDomain(params).then(res=>{
     let {code,msg} = res.data 
     if(code=='0000000'){
       //设置成功
        this.$message.success(msg); 
     }else{
        this.$message.warn(msg); 
     }
     this.initTableData()   
    })
  },
/**
 * @description: 转换显示来源
 * @param {*} record
 * @return {*}
 */
compute_show_record_allowListSource(record){
  let {allowListSource=''} =record
  if(allowListSource===''){ return ''}
  let arr=  Object.values(this.import_total_source_list).filter(x=>x.value>0)
  let obj = arr.find(x=>x.value==allowListSource)||{}
  return obj.label||''
  },
    //导入白名单 弹窗控制
    handle_whitelist_import(){
       this.show_import_whitelist_dialog = true;
    },
    //关闭导入白名单弹窗
    handle_close_dialog_import_whitelist(){
     this.show_import_whitelist_dialog = false;
     this.initTableData() 
    },
    //导入vip弹窗控制
    handle_vip_import(){
       this.show_import_vip_dialog = true;
    },
    //关闭导入线路VIP弹窗
  handle_close_dialog_import_vip(){
   this.show_import_vip_dialog = false;
   this.initTableData()
    },
    /**
     * @description:   //是否C端vip下拉框切换
     * @param {*} val
     * @return {*}
     */    
    handle_is_vip(val){
    this.searchForm.isvip = val;
    },
    handle_confirm_(){
      if(this.src_internal){
        this.handle_confirm()
      }
    },
    /**
     *  表格配置 根据登录进来用户商户等级匹配不同表格配置
     */
    columns_external() {
      return [1, 10].includes(this.get_user_info.agentLevel)
        ? this.channelConfig
        :  this.columns;
    },
    on_change(dates, dateStrings) {
      if (!(dateStrings[0] && dateStrings[1])) {
        return false;
      }
      Object.assign(this.searchForm, {
        startSpecialBettingLimitTimeL: dateStrings[0] + " 00:00:00",
        endSpecialBettingLimitTimeL: dateStrings[1] + " 23:59:59",
      });
    },
    /**
     * @description 从我的消息跳转过来需要弹出编辑key弹窗
     * @return {undefined} undefined
     */
    init_params() {
      if (this.get_data) {
        this.searchForm.userId = this.get_data.uid + "";
        this.clear_data();
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
    //计算 当前列表数据中所有的 特殊百分比限额的数值
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
    /**
     * @description 设置备注
     * @param  {Object} record 点击某行数据对象
     * @param  {Number} index 点击某行的索引
     */
    handleCloseDesp() {
      this.show_Desp = false;
      this.initTableData();
    },
    close_odds_grouped(){
      this.show_user_odds_grouped = false
      this.initTableData();
    },
    /**
     * @description: 请求列表数据
     * @return {*}
     */    
    initTableData() {
      this.tabledata_loading = true;
      let params = this.compute_init_tabledata_params();
      params = this.delete_empty_property_with_exclude(params);
      let post_order_user_queryUserBetList=this.compute_api()
      post_order_user_queryUserBetList(params).then((res) => {
        console.log(res)
        this.tabledata_loading = false;
        let code = this.$lodash.get(res, "data.code");
        if (code == "0000000") {
          let arr = this.$lodash.get(res, "data.data.list") || [];
          this.pagination.start = this.$lodash.get(res, "data.data.startRow");
          this.tabledata = this.rebuild_tabledata_to_needed(arr);
          if(this.src_external){
            this.compute_tabledata_specialBettingLimitType_2(this.tabledata);
          }
          this.pagination.total =
            this.$lodash.get(res, "data.data.total") * 1 || 0;
        } else {
            this.tabledata = [];
            this.$message.error(res.data.msg);
          }
      });
    },
    /**
     * @description: 计算列表请求接口
     * @return {*}
     */    
    compute_api(){
      // post_order_user_queryUserBetList 对内投注用户管理接口
      // get_order_allowlist_usert_list   对内投注用户白名单接口
      // post_admin_userRepor_queryAllUserStatisticList 对外投注用户管理接口
      if( this.src_internal){
        return this.is_for_white_betting_users ? api_user.get_order_allowlist_usert_list : api_user.post_order_user_queryUserBetList
      }else{
         return api_account.post_admin_userRepor_queryAllUserStatisticList
      }

    },
       rebuild_tabledata_to_needed(arr) {
       let all_can = 0;
       arr.map((item, index) => {
        item._index =
          (this.pagination.current - 1) * this.pagination.pageSize + index + 1;
        if (item.orderStatus == 0) {
          item.selected = false;
          all_can += 1;
        }
      });
      arr.map((item, index) => {
      // 是否vip 1否 2是  
        item.isvip_editing = false;
        item.show_isvip_edit_icon = false;
        item.isvip_edit =  item.isvip || 1;
      });
      return arr;
    },
    // 关闭  信用网商 弹窗
    handleCloseCreditLimit() {
      this.show_credit_limit = false;
      this.initTableData();
    },
    // 点击特殊限额 显示特殊限额
    handle_show_special_limit(record, index,type) {
      if(type == 1){
        // 这个是赔率分组
          this.showDialogObj = { ...record,dialogtype:type };
          this.show_user_odds_grouped = true;
      }else if(
        type ==2
      ){
        // 这个是投注延时
         this.showDialogObj = { ...record,dialogtype:type };
          this.show_user_odds_grouped = true;

      }else{
        let { specialBettingLimitType } = record;
        specialBettingLimitType = Number(specialBettingLimitType);
        if (specialBettingLimitType == 5) {
          //  // 显示  信用网商 弹窗
          this.handle_show_credit_limit(record, index);
        } else if ([1, 2].includes(specialBettingLimitType)) {     //改动 1208
          // 用户特殊限额为无、或者特殊百分比限额：显示”特殊限额“入口   ,显示百分比的
          this.showDialogObj = { ...record };
          this.show_Desp = true;
          this.dialog_desp_can_edit = true;
        }
      }
    },
    // 显示  信用网商 弹窗
    handle_show_credit_limit(record, index) {
      console.log("   handle_show_credit_limit(record,index){", record);
      this.showDialogObj = { ...record };
      this.show_credit_limit = true;
    },
    compute_init_tabledata_params() {
      let userIdList
      let {
        userId,
        userName,
        merchantCodeList,
        specialBettingLimitType,
        startSpecialBettingLimitTimeL,
        endSpecialBettingLimitTimeL,
        currencyCode,
        marketLevel,
        specialBettingLimitDelayTime,
        isvip,
        allowListSource ,//来源
        timeType,  //按时间分类
        startTime,
        endTime
      } = this.searchForm;

      if(this.src_internal){
      userIdList=this.searchForm.userIdList;
      }
      let { current, pageSize, sort, orderBy } = this.pagination;
      let params = {
        userId, // 用户ID
        userName,
        merchantCodeList, // 多个商户编码
        specialBettingLimitType, // 投注特殊限额
        startSpecialBettingLimitTimeL: moment(
        startSpecialBettingLimitTimeL
        ).valueOf(),
        endSpecialBettingLimitTimeL: moment(
          endSpecialBettingLimitTimeL
        ).valueOf(),
        pageNum: current,
        pageSize,
        sort,
        orderBy,
        userIdList,
        currencyCode: currencyCode, //所有币种
        marketLevel,//赔率分组
        specialBettingLimitDelayTime,
        isvip,
        allowListSource, //来源
        timeType,  //按时间分类
       beginDateTime: startTime,
       endDateTime: endTime,
      };
      if(this.src_internal){
        //当页面是投注用户白名单管理时，去除此两项参数
        if(this.is_for_white_betting_users){
          delete params.startSpecialBettingLimitTimeL
          delete params.endSpecialBettingLimitTimeL
          delete params.beginDateTime
          delete params.endDateTime
        }
      }
     
      return params;
      // if(this.src_external){
      //   if (/^\+?[0-9][0-9]*$/.test(userId) && params.userId.length > 16) {
      //     params.userId = userId;
      //     params.userName = "";
      //   } else {
      //     params.userName = userId;
      //     params.userId = "";
      //   }
      //   return params;
      // }else{
      //   console.log("====revise_userId_and_fakeNam=====",revise_userId_and_fakeName(params, "userName"))
      // return revise_userId_and_fakeName(params, "userName");
      // }
    },
    /**
     * @description 切换投注币种类型
     * @return {undefined} undefined
     */
    handle_currency(value) {
      console.log("切换投注币种类型------------value", value);
      console.warn(value);
      this.searchForm.currencyCode = value;
      if(this.src_internal){
      if (!value) {
        this.current_search_currency_text = "人民币";
      } else {
        this.current_search_currency_text =
          this.compute_currencyRate_obj_by_code(value)["countryZh"];
      }
      }
      this.initTableData();
    },
    // 点击搜索按钮
    handle_search() {
      this.initTableData();
    },
    // 全部删除
    hande_all_delete(){
    // 参数 ： 无
	// 返回：data：100  -- 踢出数量
     console.log("-----全部删除");
     api_user.post_order_allowlist_user_delAll({}).then(res =>{
      this.searchForm.userId = "";
    
      this.searchForm.merchantCodeList = "";
      this.$message.info(   `已删除${  res.data?.data }条数据`)
      this.initTableData();
    });
  },
 
  //删除单条 白名单记录
  handle_confirm_delete_row(record){
    let params = {
      userId: record.userId,
    };
    console.log("删除单条 白名单记录",params);
    api_user.post_order_allowlist_user_del(params).then((res) =>{
      this.$message.info(   `已删除${  res.data?.data }条数据`)
    this.initTableData();
    });
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
    // 批量启&禁用
    handle_disabled_user(){
      this.show_disabled_user = true;
    },
    // 关闭 批量启&禁用 弹窗
    handleCloseDisabledUser(){
      this.show_disabled_user = false
      if(this.timer){
        clearTimeout(this.timer)
        this.timer = null
      }
      this.timer = setTimeout(()=>{
        this.initTableData()
      },800)
    },
    // 启&禁用 开关
    async disabled_swith_user(record){
      // disabled   1 禁用 0启用  2-5 启用 
      // 修改传参 0 启用 1 禁用
      try {
        let params = {
          userIds: record.userId,
          disabled: record.disabled == 1 ? 0: 1,
        }
        const res = await api_user.post_update_Disabled(params)
        const code = this.$lodash.get(res, "data.code");
        const msg = this.$lodash.get(res, "data.msg");
        if(code == "0000000"){
          this.$message.success(msg);
          this.$set(record,"disabled", record.disabled == 1 ? 0: 1)
        }else {
          this.$message.error(msg, 5);
        }
      } catch (error) {
        console.error(error)
      }
    },
     /**
     * @description 导出报表
     * @return {undefined} undefined
     */
    handle_export_excel() {
      if (this.pagination.total > 0) {
        let params = this.compute_init_tabledata_params();
        params = this.delete_empty_property_with_exclude(params);
        //当导出页面是投注用户白名单时，去除 "user-id" "app-id" 参数
          if(this.is_for_white_betting_users){
           Object.assign(
          params,
          { "pageSize": this.pagination.total },
          { url:"/order/allowlist/user/export" }
        );
        }else{
            Object.assign(
          params,
          { "pageSize": this.pagination.total },
          { "user-id": this.get_user_info.userId },
          { "app-id": this.get_user_info.appId },
          { url: "/order/user/queryUserBetListExport" }
        );
        }
        this.export_param = params;
        this.exportExcelShow = true;
      } else {
        // 暂无数据
        this.$message.error( i18n.t('external.message2.label67'))
      }
    },
    /**
     * @description: 天数快选
     * @param {*} value
     * @return {*} time
     */  
    handle_date_range(value) {
      let start_time_3 = `${moment(new Date().setDate(new Date().getDate()- 2 )).format("YYYY-MM-DD")} 00:00:00`
      let start_time_7 = `${moment(new Date().setDate(new Date().getDate()- 6)).format("YYYY-MM-DD")} 00:00:00`
      let start_time_14 = `${moment(new Date().setDate(new Date().getDate()- 13 )).format("YYYY-MM-DD")} 00:00:00`
      if(value == 1 ){
         this.searchForm.startTime = start_time_3 //3天
      }else if(value == 2){
         this.searchForm.startTime = start_time_7  //7天
      }else{
         this.searchForm.startTime = start_time_14  //14天
      }
      this.searchForm.endTime= `${moment(new Date().setDate(new Date().getDate()) + 3).format("YYYY-MM-DD")} 23:59:59` // 结束日期 
    },
   /**
    * @description: 日期选择
    * @param {*} dates
    * @param {*} dateStrings
    * @return {*} 
    */   
   on_change_time(dates, dateStrings){
    if (!(dateStrings[0] && dateStrings[1])) {
        return false;
      }
      this.searchForm.startTime = dateStrings[0]
      this.searchForm.endTime = dateStrings[1]
 }
  },
  beforeDestroy(){
    if(this.timer){
      clearTimeout(this.timer)
      this.timer = null
    }
  },


};
</script>
<style lang="scss" scoped>
::v-deep .ant-spin-nested-loading > div > .ant-spin {
	 max-height: 760px;
	 min-height: 760px;
}
::v-deep .ant-empty-normal {
	 margin: 314px 0;
}
 .ellipsis {
	 display: block;
	 max-width: 160px;
	 text-overflow: ellipsis;
	 overflow: hidden;
	 white-space: nowrap;
}
.no-left ::v-deep  .q-field__append {
	 border-left: none;
}
::v-deep .ant-table-middle > .ant-table-content > .ant-table-scroll > .ant-table-header > table > .ant-table-thead > tr > th {
	 background: #f4f5f8;
}
::v-deep .ant-table-middle > .ant-table-content > .ant-table-fixed-right > .ant-table-header > table > .ant-table-thead > tr > th {
	 background: #f4f5f8;
}
::v-deep .ant-table-middle > .ant-table-content > .ant-table-fixed-left > .ant-table-header > table > .ant-table-thead > tr > th {
	 background: #f4f5f8;
}
::v-deep .info:hover {
	 text-decoration: underline;
}
::v-deep .user .ant-input-affix-wrapper .ant-input-suffix {
	 right: 5px;
}
::v-deep .bet:hover {
	 text-decoration: underline;
}
.table-svg{
  font-size: 16px;
  width: 20px;
  height: 20px;
  margin-left: 10px;
}
 .duihao {
	 font-size: 20px;
	 color: #f00;
}
 .guanbi {
	 font-size: 20px;
	 color: #008000;
}
</style>
<style>
/* 启&禁用 备注 tooltip提示框样式 */
.tooltip-content-remark-text  {
  max-width: 350px;
  word-break: break-all;
}
</style>