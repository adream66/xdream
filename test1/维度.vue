<!--
 * @FilePath: /src/pages/internal/data/user_betting_amount/common/user_amount.vue
 * @Description: 用户可用额度查询
-->
<template>
  <div class="">
    <div class="title pl10x">
      <!-- /用户可用额度查询-->
      <span class="title-text">{{
        $t("internal.user_betting_amount.label2")
      }}</span>
    </div>
    <div style="height: 20px" class="ant-layout"></div>
    <!-- 上半部分-->
    <div class="pl10x q-py-md">
      <!-- 串关单日可用额度查询 -->
      <div style="padding: 10px 0; background: #ccc; width: 200px">
        {{ $t("internal.user_betting_amount.label3") }}
      </div>
      <div class="row series-div">
        <div class="row items-center">
          <!-- <a-select
                    show-search
                    :value="series_user_name"
                    :placeholder="'用户名称'"
                    style="width: 200px"
                    :default-active-first-option="false"
                    :show-arrow="false"
                    :filter-option="false"
                    :not-found-content="null"
                    @search="series_handle_search"
                    @change="handleChange"
                >
                    <a-select-option v-for="d in series_user_data" :key="`series_${d.userId}`" :value="d.userId">
                    {{ d.userName }}
                    </a-select-option>
                </a-select> -->
          <!-- 用户ID  -->
          <a-input
            v-model="series_user_id"
            allow-clear
            :placeholder="$t('internal.user_betting_amount.label4')"
            style="width: 180px"
            type="number"
          />
          <!-- 查询 -->
          <a-button
            type="primary"
            class="ml10x"
            @click="query_series"
            :disabled="series_disabled"
          >
            {{ $t("internal.user_betting_amount.label7") }}
          </a-button>
        </div>
        <div class="row ml40x border">
          <!-- 当日串关可用额度 -->
          <div style="padding: 0 20px; background: #f4f5f8">
            {{ $t("internal.user_betting_amount.label8") }}
          </div>
          <!-- 额度充足 -->
          <div class="series-num" v-if="series_user_num == 'A'">
            {{ $t("internal.user_betting_amount.label11") }}
          </div>
          <div class="series-num" v-else>
            {{ series_user_num | filterAmount }}
          </div>
        </div>
      </div>
    </div>
    <div style="height: 20px" class="ant-layout"></div>
    <!-- 下 半部分-->
    <div class="pl10x q-py-md">
      <!-- 单关可用额度查询 -->
      <div style="padding: 10px 0; background: #ccc; width: 200px">
        {{ $t("internal.user_betting_amount.label9") }}
      </div>
      <div class="series-div">
        <div class="row items-center">
          <!-- <a-select
                    show-search
                    :value="single_user_name"
                    placeholder="用户名称"
                    style="width: 200px"
                    :default-active-first-option="false"
                    :show-arrow="false"
                    :filter-option="false"
                    :not-found-content="null"
                    @search="single_handle_search"
                    @change="single_handle_change"
                >
                    <a-select-option v-for="d in single_user_data" :key="`single_${d.userId}`" :value="d.userId">
                    {{ d.userName }}
                    </a-select-option>
                </a-select> -->
          <!-- 用户ID -->
          <a-input
            v-model="single_user_id"
            allow-clear
            :placeholder="$t('internal.user_betting_amount.label4')"
            class="ml10x"
            style="width: 180px"
            type="number"
          />
          <!-- single_user_id -->
          <!-- 赛事ID -->
          <a-input
            v-model="match_id"
            allow-clear
            :placeholder="$t('internal.user_betting_amount.label5')"
            class="ml10x"
            style="width: 160px; margin-left: 10px"
            type="number"
            @change="play_id = ''"
            @blur="get_play_ball"
          />
          <!-- 玩法 -->
          <a-select
            :value="play_id"
            show-search
            :placeholder="$t('internal.user_betting_amount.label12')"
            style="width: 160px; margin-left: 10px"
            @change="play_handle_change"
            :filterOption="filterOption"
            option-filter-prop="children"
          >
            <a-select-option
              v-for="d in play_data"
              :key="`play_${d.playId}`"
              :value="d.playId"
              :text="d.playName"
            >
              {{ d.playName }}
            </a-select-option>
          </a-select>
          <!-- 查询 -->
          <a-button
            type="primary"
            class="ml10x"
            @click="query_single"
            :disabled="single_disabled"
          >
            {{ $t("internal.user_betting_amount.label7") }}
          </a-button>
        </div>
        <div class="border mt20x row w630px">
          <!-- 赛事操盘方 -->
          <div style="padding: 0 20px; background: #f4f5f8">
            {{ $t("internal.user_betting_amount.label6") }}
          </div>
          <div class="series-num">
            {{ match_traders }}
          </div>
          <!-- 玩法可用赔率额度 -->
          <div class="series-num" style="padding: 0 10px; background: #f4f5f8">
            {{ $t("internal.user_betting_amount.label10") }}
          </div>
          <div class="series-num">
            <!-- 特殊VIP   -->
            <!-- 受单场特殊限额限制 -->
            <div v-if="userSpecialLimitType == 4">
              {{ $t("internal.user_betting_amount.label13") }}
            </div>

            <div v-else-if="play_lines == 'A' || play_lines == 'B'">
              {{ play_lines == "A" ? "额度充足" : "限额以数据商为准" }}
            </div>
            <div v-else>
              {{ play_lines | filterAmount }}
            </div>
          </div>
        </div>
      </div>
    </div>  
     <div style="height: 20px" class="ant-layout"></div>
    <div class="pl10x ">
      <!-- 派彩可用额度查询 -->
      <div style="padding: 10px 0; background: #ccc; width: 200px;color:green">
        {{ $t('internal.user_betting_amount.label16') }}
      </div>
      <div class="row series-div">
        <div class="row items-center"> 
          <!-- 用户ID  -->
          <a-input
            v-model="user_id"
            allow-clear
            :placeholder="$t('internal.user_betting_amount.label4')"
            style="width: 180px"
            type="number"
          />
          <!-- 查询 -->
          <a-button
            type="primary"
            class="ml10x"   
            @click="query_quota_pies"
           :disabled="quota_pies_disabled"
          >
            {{ $t("internal.user_betting_amount.label7") }}
          </a-button>
        </div>
        <div class="row ml40x border">
          <!-- 当日派彩可用额度-->
          <div style="padding: 0 20px; background: #f4f5f8;color:green">
            {{ $t('internal.user_betting_amount.label17') }}
          </div>
          <!-- 异常/用户为特殊VIP，无派彩限制 -->
          <div class="series-num" v-if="data_staus == true" style="text-align:left">
            {{!user_id ? '': quota_pies}}
          </div>
          <div class="series-num" v-else  :style="data_staus == false  ? 'height:480px' : 'height:40px'">
          <div  v-for="(item,index) in sport_piese" :key="index" style="text-align:left">
            {{item.sportName}} :{{item.albPltMoney}}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { i18n } from "src/boot/i18n";
import { api_merchant, api_user } from "src/api/index.js";
export default {
  data() {
    return {
      series_user_name: undefined, //串关查询的用户名称
      series_user_data: [], //串关输入后的查询结果，下拉选择
      series_user_id: null, //
      series_user_num: "", //串关额度
      single_user_name: undefined, //单关查询的用户名称
      single_user_id: null, //
      single_user_data: [], //单关输入后的查询结果，下拉选择
      match_id: null, //赛事ID
      play_id: null, //玩法下拉选择id
      play_data: [], //玩法下拉选择内容
      match_traders: null, //串关操盘方
      play_lines: null, //限额
      userSpecialLimitType: "", // 限额类型
      user_id:null,//派彩可用额度用户ID
      quota_pies:'',//异常/用户为特殊VIP,派彩限制字段
      data_staus:null,//异常/用户为特殊VIP显示阈值
      sport_piese:[//派彩可用额度显示模板
        {
         albPltMoney:null,
         sportName:'全部'
        },
        {
         albPltMoney:null,
         sportName:'足球'
        },
        {
          albPltMoney:null,
         sportName:'篮球'
        },
        {
         albPltMoney:null,
         sportName:'网球'
        },
        {
          albPltMoney:null,
         sportName:'乒乓球'
        },
        {
          albPltMoney:null,
         sportName:'羽毛球'
        },
        {
          albPltMoney:null,
         sportName:'斯诺克'
        },
        {
          albPltMoney:null,
         sportName:'排球'
        },
        {
          albPltMoney:null,
         sportName:'冰球'
        },
        {
          albPltMoney:null,
         sportName:'棒球'
        },
        {
          albPltMoney:null,
         sportName:'美式足球'
        },
        {
          albPltMoney:null,
         sportName:'其他'
        },
       
      ]
    };
  },
  computed: {
    // 串关查询按状态
    series_disabled() {
      if (this.series_user_id) {
        return false;
      } else {
        return true;
      }
    },
    // // 单关查询按状态
    single_disabled() {
      if (this.single_user_id && this.match_id && this.play_id) {
        
        return false;
      } else {
        return true;
      }
    },
    // 当日派彩可用额度查询按状态
    quota_pies_disabled(){
    if (this.user_id ) {
        return false;
      } else {
        this.quota_pies = '',
        this.data_staus = true
        return true;
      }
    }
  },
  methods: {
    //派彩可用额度查询
    query_quota_pies () {
    let params ={ uid:this.user_id}
      api_user.get_listAlbPayoutLimit(params).then((res) => {
          let code = this.$lodash.get(res, "data.code");
          let data = this.$lodash.get(res, "data.data") || [];
          let msg = this.$lodash.get(res, "data.msg");
          if (code == '0000000') {
            let data_key1 = Object.values(data)
            data_key1.forEach(item=>{
              if(item.code == '0000000'){
                 let key_data =  Object.keys(item.data)
                      if(key_data[0] == '2'|| key_data[0] == '3'){
                            let key_data1 =  Object.values(item.data)
                             key_data1[0].forEach(x=>{
                           this.sport_piese.forEach(items=>{
                             if(items.sportName == x.sportName){
                              items.albPltMoney =  x.albPltMoney
                      }
                           })
                             })
                             this.data_staus = false
                      }else if(key_data[0] == '1'){
                          // this.quota_pies = '用户为特殊VIP，无派彩限制'
                         this.quota_pies =i18n.t('internal.user_betting_amount.label18')
                          this.data_staus = true
                      }else if(key_data[0] == '0'&& key_data[0] == '2'&& key_data[0] == '3'){
                        this.quota_pies = '异常',
                    this.data_staus = true
                      }


             
            }
            })
         
          } else {
            this.$Message.error(`${msg}`);
          }
        })
        .catch((err) => {
          console.error(err);
          this.$Message.error(`${err}`);
        });
 },
    // 单关
    handleChange(value) {
      this.series_user_name = value;
    },
    // 串关
    single_handle_change(value) {
      this.single_user_name = value;
    },
    // 串关远程搜索的结果value输入值
    // series_handle_search(value){
    //     if(value){
    //         this.handle_search(value,1)
    //     }else{
    //         this.series_user_data = []
    //     }
    // },
    // 单关远程搜索的结果value输入值
    // single_handle_search(value){
    //     console.warn(value);
    //     if(value){
    //         this.handle_search(value,2)
    //     }else{
    //         this.single_user_data = []
    //     }
    // },
    // 远程搜索接口  value 搜索值  type 1是串 2是单
    // handle_search(value,type){
    //         api_merchant.get_order_user_queryFakeNameByCondition({fakeName: value}).then(res=>{
    //             let sus = this.$lodash.get(res, "data.code");
    //             let data = this.$lodash.get(res, "data.data") || [];
    //             let msg = this.$lodash.get(res, "data.msg");
    //             if(sus == 0){
    //                 if(type == 1){
    //                     this.series_user_data =data
    //                 }else{
    //                     this.single_user_data =data
    //                 }
    //             }else{
    //                 this.$Message.error(`${msg}`);
    //             }
    //         }).catch(err=>{
    //             console.error(err);
    //             this.$Message.error(`${err}`);
    //         })
    // },
    // 串关点击搜索
    query_series() {
      api_merchant
        .post_userSeriesAvailableLimit({ userId: this.series_user_id })
        .then((res) => {
          let sus = this.$lodash.get(res, "data.code");
          let data = this.$lodash.get(res, "data.data") || [];
          let msg = this.$lodash.get(res, "data.msg");
          if (sus == 0) {
            // 取串关单日总可用额度显示，但是，当总可用额度/串关单日初始额度>=30%时，不显示具体可用额度数值，显示“额度充足”；反之，当该比例小于30%时，显示用户串关单日总可用额度的具体数值(精确至个位数）
            let compensate_total =
              data.dailySeriesPaymentTotalLimit -
              data.dailySeriesPaymentTotalUsedLimit;
            let total_num = data.dailySeriesPaymentTotalLimit;
            // new BigDecimal(Integer.MAX_VALUE)  dailySeriesPaymentTotalLimit的值是这个，则是无限制，所以判断是否是nan就好
            if (this.$lodash.isNaN(compensate_total)) {
              this.series_user_num = `A`;
            } else {
              if (compensate_total / total_num >= 0.3) {
                this.series_user_num = `A`;
              } else {
                this.series_user_num = "" + parseInt(compensate_total);
              }
            }

            // 单日串关赔付总可用限额 = dailySeriesPaymentTotalLimit - dailySeriesPaymentTotalUsedLimit
          } else {
            this.$Message.error(`${msg}`);
          }
        })
        .catch((err) => {
          console.error(err);
          this.$Message.error(`${err}`);
        });
    },
    // 玩法
    play_handle_change(val) {
      this.play_id = val;
    },
    // 玩法本地搜索
    filterOption(input, option) {
      return option.data.attrs.text.includes(input);
    },
    // 根据赛事id获取赛种
    get_play_ball() {
      let params = {
        matchId: this.match_id,
      };
      api_merchant
        .get_getSportIdByMatchManageId(params)
        .then((res) => {
          let sus = this.$lodash.get(res, "data.code");
          let data = this.$lodash.get(res, "data.data") || [];
          let msg = this.$lodash.get(res, "data.msg");
          if (sus == 0) {
            if (data) {
              this.get_play_data(data); //然后再根据赛种来获取玩法数据
            }
          } else {
            this.$Message.error(`${msg}`);
          }
        })
        .catch((err) => {
          console.error(err);
          this.$Message.error(`${err}`);
        });
    },
    // 获取玩法数据
    get_play_data(data) {
          let params = {};
        if(data.length<1){
          params = {sportId:null};
        }else{
          params = {sportId:data};
        }
      api_user
        .post_order_user_queryHotPlayName(params)
        .then((res) => {
          let sus = this.$lodash.get(res, "data.code");
          let data = this.$lodash.get(res, "data.data") || [];
          let msg = this.$lodash.get(res, "data.msg");
          if (sus == 0) {
            this.play_data = data;
            console.warn(data);
          } else {
            this.$Message.error(`${msg}`);
          }
        })
        .catch((err) => {
          console.error(err);
          this.$Message.error(`${err}`);
        });
    },
    // 单关搜索按钮
    query_single() {
      let params = {
        userId: this.single_user_id,
        matchId: this.match_id,
        playId: this.play_id || 1,
      };
      api_merchant
        .post_userSingleAvailableLimit(params)
        .then((res) => {
          let sus = this.$lodash.get(res, "data.code");
          let data = this.$lodash.get(res, "data.data") || [];
          let msg = this.$lodash.get(res, "data.msg");
          if (sus == 0) {
            // （2）当赛事为MTS时，赛事操盘方显示“MTS”，玩法可用赔付额度不显示数值，显示文字“限额以数据商为准”
            // （3）当赛事为Panda操盘赛事时，赛事操盘方显示“Panda”，玩法可用赔付额度取相应用户“单日单关赔付总可用额度、赛事对应赛种的单日可用额度、用户单场可用额度、玩法剩余可用额度”的最小值；然后判断，如果该最小值/所查询玩法的初始额度>=50%时，不显示具体可用额度数值，显示“额度充足”；反之，当该比例小于50%时，显示该最小值的具体数值(精确至个位数）
            let match_traders = data.riskManagerCode; //赛事操盘方
            let playAvailableLimit = data.playAvailableLimit; //玩法可用额度
            let playLimit = data.playLimit; //玩法的初始额度
            let userSpecialLimitType = data.userSpecialLimitType; // 限额类型
            if (match_traders == "PA") {
              this.match_traders = "Panda";
              // play_lines =
              if (playAvailableLimit / playLimit >= 0.5) {
                this.play_lines = "A";
                // 为A显示额度充足
              } else {
                this.play_lines = "" + parseInt(playAvailableLimit);
              }
            } else {
              this.match_traders = "MTS";
              this.play_lines = "B"; //显示限额以数据商为准
            }
            this.userSpecialLimitType = userSpecialLimitType;
          } else {
            this.$Message.error(`${msg}`);
            this.match_traders = null;
            this.play_lines = null;
          }
        })
        .catch((err) => {
          console.error(err);
          this.$Message.error(`${err}`);
        });
    },
  },

};
</script>
<style scoped lang='scss'>
.title {
  height: 38px;
  line-height: 38px;
  margin-top: 6px;
}
.title .title-text {
  position: relative;
  font-size: 14px;
  color: #3c4551;
  font-weight: 600;
  display: inline-block;
  height: 100%;
}
.title .title-text:before {
  content: "";
  position: absolute;
  left: 0px;
  bottom: 0px;
  right: 0px;
}
.series-div {
  margin: 3px 0 10px 0;
  line-height: 38px;
}
.border {
  border: 1px solid #3c4551;
}
.series-num {
  border-left: 1px solid #3c4551;
  min-width: 160px;
  height: 38px;
  vertical-align: middle;
  text-align: right;
  padding: 0 10px;
}
::v-deep .ant-input-affix-wrapper input::-webkit-outer-spin-button,
::v-deep .ant-input-affix-wrapper input::-webkit-inner-spin-button {
  -webkit-appearance: none;
}
.w630px {
  width: 630px;
}
</style>
