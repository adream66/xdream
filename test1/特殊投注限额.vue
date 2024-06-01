<!--
 * @Desc: 对外-账户中心-投注用户管理-特殊限额弹窗
 * @FilePath: /src/components/common/bettinguser/external/component/dialogSpecialBetLimit.vue
 -->


 <template>
  <!-- 用户id  -->
  <div style="font-size: 14px;">
  <span> {{ $t("internal.betting.label8")   }} : 	512057993542200016 {{  }} </span>  
  <span style="margin-left:40px;"> {{ $t("internal.betting.label9")   }}: tyzRU4LbtLsV {{  }}</span>

  <div style="margin-top:7px">
    <q-radio :label="special_percentage" style="margin-right: 140px;" />
    <q-radio :label="automatic_limit" />
  
  </div>

  <!-- 用户单日投注 -->
  <div> {{$t("internal.betting.label5")   }}
    <a-select
      v-model="percentageLimit"
      style="width:105px;margin:7px 0px 0px 80px"
      class="disabled-white"
      :disabled="[3, 4].includes(detailObj.specialBettingLimitType)"
      size="small"
    >
      <a-select-option
        v-for="item in percentageLimit_arr"
        :key="item"
        :value="item"
        >{{ item }}%
      </a-select-option>
    </a-select>
  </div>
  <!-- 用户单场投注 -->
  <div> {{$t("internal.betting.label6")   }}
    <a-select
      v-model="percentageLimit"
      style="width:105px;margin:7px 0px 0px 80px"
      class="disabled-white"
      :disabled="[3, 4].includes(detailObj.specialBettingLimitType)"
      size="small"

    >
      <a-select-option
        v-for="item in percentageLimit_arr"
        :key="item"
        :value="item"
        >{{ item }}%
      </a-select-option>
    </a-select>
  </div>
  <!-- 用户单注投注 -->
  <div>  {{$t("internal.betting.label7")   }}
    <a-select
      v-model="percentageLimit"
      style="width:105px;margin:7px 0px 0px 80px"
      class="disabled-white"
      :disabled="[3, 4].includes(detailObj.specialBettingLimitType)"
      size="small"

    >
      <a-select-option
        v-for="item in percentageLimit_arr"
        :key="item"
        :value="item"
        >{{ item }}%
      </a-select-option>
    </a-select>
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
    // can_edit:{
    //   type:Boolean,
    //   default:false
    // },
    //   "1": "无", //   "2": "特殊百分比限额",    才能编辑
    can_edit: false
  },
  data() {
    return {
      percentageLimit: 100,
      percentageLimit_arr: [1, 2, 5, 10, 25, 50, 75, 100],
      special_percentage:i18n.t('internal.betting.label10'),  // 特殊百分比radio
      automatic_limit:i18n.t('internal.betting.label11'),  // 自动升额度radio
    }
  }
}
</script>

<style>

</style>