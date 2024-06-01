<!--
 * @FilePath: /src/components/common/bettinguser/external/component/dialog_odds_grouped.vue
 * @Description: 账户中心-投注用户管理(赔率分组、投注延迟  弹窗)
-->
<template>
    <div
        style="width: 700px; height: auto; max-width: 700px; overflow: hidden"
        class="text-panda-text-7"
    >
        <q-card class="bg-white text-black">
            <q-card-section class="no-padding">
                <div class=" row line-height-40px fs14 bg-panda-dialog text-panda-text-7 pr10x " >     
                    <!-- 赔率分组 -->
                    <div v-if="detailObj.dialogtype==1" class="pl20x fw_600 col q-pr-md"> {{ $t("external.merchant.bettinguser.config.18") }}</div>
                    <!-- 特殊投注延时 -->
                    <div v-if="detailObj.dialogtype==2" class="pl20x fw_600 col q-pr-md">{{ $t("external.daily_investigation.text49") }}</div>
                    <div class="col-1 justify-end">
                        <q-space></q-space>
                        <q-btn class="mr5x text-panda-dialog-close" icon="close" v-close-popup />
                    </div>
                </div>
            </q-card-section>
            <q-separator></q-separator>
            <div class="pt20x pl20x pr20x ">
                <div v-if="detailObj.dialogtype==1">
                    <!-- 请选择用户的体育赛事赔率组别 -->
                    <span class="text-panda-text-7 fw_600">{{ $t("external.daily_investigation.text75") }}</span>
                    <a-select
                        v-model="marketLevel"
                        style="width:105px;margin-left:7px"
                        class="disabled-white"
                        >
                        <a-select-option
                            v-for="item in market_level_list"
                            :key="`${item.value }_market_level_list`"
                            :value="item.value"
                            >{{ item.lable }}
                        </a-select-option>
                    </a-select>
                </div>
                <div class="q-mt-xs" v-if="detailObj.dialogtype==1">
                    <!-- 请选择用户的电竞赛事赔率组别 -->
                    <span class="text-panda-text-7 fw_600">{{ $t("external.daily_investigation.text76") }}</span>
                    <a-select
                        v-model="esMarketLevel"
                        style="width:105px;margin-left:7px"
                        class="disabled-white"
                        >
                        <a-select-option
                            v-for="item in dj_market_level_list"
                            :key="`${item.value }_market_level_list`"
                            :value="item.value"
                            >{{ item.lable }}
                        </a-select-option>
                    </a-select>
                </div>
                <div v-if="detailObj.dialogtype==2" class="row">
                    <!-- 用户注单延迟接单 -->
                    <span class="text-panda-text-7 fw_600 mr10x">{{ $t("external.daily_investigation.text51") }}</span>
                    <a-select
                        v-model="specialBettingLimitDelayTime"
                        style="width:105px;"
                        class="disabled-white"
                        >
                        <a-select-option
                            v-for="item in betExtraDelay_list"
                            :key="item"
                            :value="item"
                            >{{ item }}
                        </a-select-option>
                    </a-select>
                    <advanced-select 
                        class=" ml20x"
                        style="width:380px!important;margin-left: 20px!important;"
                        :placeholder="$t('external.common.label52')"
                        :passed_in_data="allMatches"
                        :need_refresh="hotPlayList_chang"
                        @select-change="handle_hotPlay_value_change"
                        :label_key="'label'"
                        :value_key="'value'"
                        :default_selected="default_selected"
                    ></advanced-select>

                    
                </div>
            </div>
            <div class="pt10x pl20x pr20x pb20x fixed-footer">
                <!-- 备注   -->
                <div class="row mt20x mb20x">
                    <div class="text-panda-text-7 mb12x fw_600" style="min-width: 100px" >
                        <span class="panda-text-red">*</span>
                        <span> {{ $t("external.account.betting.label2") }}：</span >
                    </div>
                    <div class="append-handle-btn-input col">
                        <a-textarea
                            v-model.trim="remark"
                            :placeholder="$t('external.daily_investigation.text52')"
                            class="disabled-white"
                            :autoSize="{ minRows: 3, maxRows: 3 }"
                        />
                    </div>
                </div>
                <!-- 返回   -->
                <div class="row justify-end">
                    <q-btn
                        class="panda-btn-primary-dense bg-primary ml20x"
                        style="width: 80px; height: 30px"
                        :label="$t('external.betting_.label3')"
                        v-close-popup
                    />
                    <!--确定-->
                    <q-btn
                        class="panda-btn-primary-dense bg-primary ml20x"
                        style="width: 80px; height: 30px"
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
import { api_account,api_data } from "src/api/index.js";
import commonmixin from "src/mixins/external/common/commontoolmixin.js";
import advancedSelect from "src/components/common/select/advanced_select1.vue";
export default {
    mixins: [commonmixin],
    components:{advancedSelect},
    data() {
        return {
            remark: "",
            data:{},//接口请求原始数据
            allMatches:[], //全部赛种
            bet_sportIds:[],//延时的数据
            default_selected:[],//默认的赛种
            marketLevel:null,
            esMarketLevel: 0,
            hotPlayList_chang:1,
            specialBettingLimitDelayTime:null,
            market_level_list:{
                0:{lable:i18n.t('internal.merchant.bettinguser.config.19'),value:'0'},
                11:{lable:'1',value:'11'},
                12:{lable:'2',value:'12'},
                13:{lable:'3',value:'13'},
                14:{lable:'4',value:'14'},
                15:{lable:'5',value:'15'}
            },
            dj_market_level_list: {
                0:{lable:i18n.t('internal.merchant.bettinguser.config.19'),value:'0'},
                11:{lable:'1',value:'1'},
                12:{lable:'2',value:'2'},
                13:{lable:'3',value:'3'},
                14:{lable:'4',value:'4'},
                15:{lable:'5',value:'5'}
            },
           //投注延时
            betExtraDelay_list:[
                1,2,3,4,5,6,7,8,9,10
            ],
        };
    },
    props: {
        detailObj: {
            type: Object,
            default() {
                return {};
            },
        },
        // can_edit:{
        //   type:Boolean,
        //   default:false
        // },
        //   "1": "无", //   "2": "特殊百分比限额",    才能编辑
        can_edit: false,
    },
    created() {
        this.init_data();
    },
    methods: {
         /**
          "specialBettingLimit": {
          "1": "无",
          "2": "特殊百分比限额",
          "3": "特殊单注单场限额",
          "4": "特殊VIP限额"
          "5": 信用限额
           },
         */
        /**
         * @description:查询详情
         */
        async init_data() {
            await api_account
                .post_order_user_queryUserBetLimitDetail({
                    userId: this.detailObj.userId,
                })
                .then((res) => {
                    let code = this.$lodash.get(res, "data.code");
                    let data = this.$lodash.get(res, "data.data");
                    if(code == "0000000"){
                        this.marketLevel = data.marketLevel+''
                        this.esMarketLevel = data.esMarketLevel + ""
                        this.data = data
                        // 如果用户被操盘后台设置过特殊延时且最新设置的特殊延时为N，则商户后台的特殊延时下拉选项不显示小于N的选项
                        this.specialBettingLimitDelayTime = Number(data.specialBettingLimitDelayTime)
                    }else{
                        this.$message.error(res.data.msg);
                    }
                });
            // 限制的数据
            await api_account
                .get_order_user_getUserTradeRestrict({
                    userId: this.detailObj.userId,
                })
                .then((res) => {
                    let code = this.$lodash.get(res, "data.code");
                    let data = this.$lodash.get(res, "data.data");
                    if(code == "0000000"){
           
                        let marketLevel = data.tagMarketLevelId
                        if(!this.$lodash.isNaN(marketLevel)){
                            let market_level_obj = JSON.parse(JSON.stringify(this.market_level_list))
                            Object.keys(market_level_obj).forEach(el=>{
                                if(el < marketLevel){
                                    delete market_level_obj[el]
                                }
                            })
                            this.market_level_list = JSON.parse(JSON.stringify(market_level_obj))
                            //   // 如果用户被操盘后台设置过赔率分组且最新设置的赔率分组为N，则商户后台的赔率组别下拉选项不显示小于N的选项
                        }
                        let betExtraDelay = data.betExtraDelay
                        if(!this.$lodash.isNaN(betExtraDelay)){
                            // betExtraDelay_list
                            let item_index = this.betExtraDelay_list.findIndex(el=>el >=
                                betExtraDelay
                            );
                            this.betExtraDelay_list.splice(
                                0,
                                item_index
                            );
                            // this.min_betExtraDelay = betExtraDelay
                            // 如果用户被操盘后台设置过特殊延时且最新设置的特殊延时为N，则商户后台的特殊延时下拉选项不显示小于N的选项
                        }
                        let sportIds = data.sportIds
                        if(!this.$lodash.isNaN(sportIds)){
                            this.default_selected = sportIds?sportIds.split(',').map(el=>el*1):[]
                            this.bet_sportIds = JSON.parse(JSON.stringify(this.default_selected))
                        }

                    }else{
                        this.$message.error(res.data.msg);
                    }
                });
            try {
                let res = await api_data.get_admin_player_getSportList({});
                if (res.data.code == "0000000") {
                let matches = res.data.data || [];
                matches = matches.map(match => ({
                    label: match.name,
                    value: match.id
                }));
                // matches.unshift({ label: i18n.t("internal.common.label24"), value: "" });
                this.allMatches = matches;
                this.hotPlayList_chang = matches.length
                }
            } catch (error) {
                console.error(error);
            }
        },
        /**
         * 更新 限额
         */
        handle_post_userReport_updateRcsLimit() {
            // {"rcsUserConfigVo":{"userId":"169570651347558400","specialBettingLimit":2,[]}]}
            // percentage  这个改成那个限额比例，  betExtraDelay  这个是特殊延时  marketLevel 这个是赔率分组。
            if (!this.remark) {
                this.$message.warn(i18n.t('external.daily_investigation.text53'));
                return false;
            }
            let params = {rcsUserConfigVo:{
                // marketLevel:this.marketLevel,
                    remarks:this.remark,
                    userId: this.detailObj.userId,
                    // specialBettingLimit: this.data.specialBettingLimitType,
                    // betExtraDelay:this.specialBettingLimitDelayTime,
                }
            };
            if(this.detailObj.dialogtype==1){
                params.rcsUserConfigVo.marketLevel = this.marketLevel*1
                params.rcsUserConfigVo.esMarketLevel = this.esMarketLevel * 1
            }
            if(this.detailObj.dialogtype==2){
                params.rcsUserConfigVo.betExtraDelay = this.specialBettingLimitDelayTime
                params.rcsUserConfigVo.sportIdList = this.bet_sportIds
            }
            // let params = {rcsUserConfigVo:{
            //     marketLevel:this.marketLevel,
            //     remarks:this.remark,
            //     userId: this.detailObj.userId,
            //     specialBettingLimit: this.data.specialBettingLimitType,
            //     betExtraDelay:this.specialBettingLimitDelayTime,
            //     }
            // };
            api_account.post_userReport_updateRcsLimit(params).then((res) => {
                let code = this.$lodash.get(res, "data.code");
                let data = this.$lodash.get(res, "data.data");
                let msg = this.$lodash.get(res, "data.msg");
                if(code == "0000000"){
                    this.$message.success(msg);
                    this.$emit("handleCloseDesp");
                        // this.marketLevel = data.marketLevel+''
                }else{
                    this.$message.error(msg);
                }
            });
        },
        handle_hotPlay_value_change( val){
            if (val && val.length > 0) {
                this.bet_sportIds = val
            } else {
                this.bet_sportIds = null;
            }
        },
    },
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
