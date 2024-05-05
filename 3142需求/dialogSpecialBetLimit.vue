<!--
 * @Desc: 对内/外-账户中心-投注用户管理-特殊限额弹窗/自动生额度弹窗
 * @FilePath: /src/components/common/bettinguser/external/component/dialogSpecialBetLimit.vue
 -->


<template>
  <div>



    <!-- 用户id  -->
          <span> {{ $t("internal.betting.label8")   }} : 	 {{ detailObj.userId }} </span>  
          <span style="margin-left:40px;"> {{ $t("internal.betting.label9")   }}: {{ detailObj.userName }}</span>
    
          <div v-if="limit_add" style="margin-top:7px">
            <q-radio  :disabled="disabled" :label="special_percentage" style="margin-right: 140px;" />
            <q-radio  :disabled="disabled" :label="automatic_limit" />
         
          </div>

    <div style="font-size: 14px;">
      <!-- 用户单日投注 -->
  
        <div> {{ $t("internal.betting.label5") }}
          <a-select v-model="percentageLimit" style="width:105px;margin:7px 0px 0px 80px" class="disabled-white"
            :disabled="disabled"   size="small">
            <a-select-option v-for="item in percentageLimit_arr" :key="item" :value="item">{{ item }}%
            </a-select-option>
          </a-select>
        </div>
        <!-- 用户单场投注 -->
        <div> {{ $t("internal.betting.label6") }}
          <a-select v-model="percentageLimit" style="width:105px;margin:7px 0px 0px 80px" class="disabled-white"
          :disabled="disabled" size="small">
            <a-select-option v-for="item in percentageLimit_arr" :key="item" :value="item">{{ item }}%
            </a-select-option>
          </a-select>
        </div>
        <!-- 用户单注投注 -->
        <div> {{ $t("internal.betting.label7") }}
          <a-select v-model="percentageLimit" style="width:105px;margin:7px 0px 0px 80px" class="disabled-white"
            :disabled="disabled" size="small">
            <a-select-option v-for="item in percentageLimit_arr" :key="item" :value="item">{{ item }}%
            </a-select-option>
          </a-select>
        </div>
    </div>
    <div style="font-size: 14px;">
        <!-- 自动升额度% -->
        <div> 自动升额度%  <button>1500%</button>

        </div>
        <div> 自动升额度开关 
          <button></button>

        </div>


      </div>



  </div>
</template>

<script>
import { i18n } from "src/boot/i18n";

export default {
  props: {
    detailObj: {
      type: Object,
      default() {
        return {};
      }
    },
    disabled:{
      type:Boolean,
      default:false
    },
    //   "1": "无", //   "2": "特殊百分比限额",    才能编辑
    // can_edit: false

  },
  data() {
    return {
      percentageLimit: 100,
      percentageLimit_arr: [1, 2, 5, 10, 25, 50, 75, 100],
      special_percentage: i18n.t('internal.betting.label10'),  // 特殊百分比radio
      automatic_limit: i18n.t('internal.betting.label11'),  // 自动升额度radio
      
    }
  }
}
</script>

<style></style>