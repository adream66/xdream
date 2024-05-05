<!--
 * @Desc: 对内/外-账户中心-投注用户管理-包含 特殊限额及 自动升额度 弹窗 
 * @FilePath: /src/components/common/bettinguser/external/component/dialogSpecialBetLimit.vue
 -->


 <template>
  <div>



    <!-- 用户id  -->
          <span> {{ $t("internal.betting.label8")   }} : 	 {{ detailObj.userId }} </span>  
          <span style="margin-left:40px;"> {{ $t("internal.betting.label9")   }}: {{ detailObj.userName }}</span>
    
          <div style="margin-top:7px">
         
            <q-radio 
              style="margin-right: 140px;"  
              v-model="radio_type"
              :disabled="disabled" 
              :label="special_percentage"   
              val="special_percentage"
              @click="handle_change"
              
            />
            <q-radio  
              v-model="radio_type"
              :disabled="disabled" 
              :label="automatic_limit" 
              val="automatic_limit"
              @click="handle_change"
              
            />
         
          </div>
    <div v-if=" radio_type == 'special_percentage' " style="font-size: 14px;">
 

      <!-- 用户单日投注 -->
      <div> {{ $t("internal.betting.label5") }}
        <a-select v-model="percentageLimit" style="width:105px;margin:7px 0px 0px 60px" class="disabled-white"
          :disabled="disabled"   size="small">
          <a-select-option v-for="item in percentageLimit_arr" :key="item" :value="item">{{ item }}%
          </a-select-option>
        </a-select>
      </div>
      <!-- 用户单场投注 -->
      <div> {{ $t("internal.betting.label6") }}
        <a-select v-model="percentageLimit" style="width:105px;margin:7px 0px 0px 60px" class="disabled-white"
        :disabled="disabled" size="small">
          <a-select-option v-for="item in percentageLimit_arr" :key="item" :value="item">{{ item }}%
          </a-select-option>
        </a-select>
      </div>
      <!-- 用户单注投注 -->
      <div> {{ $t("internal.betting.label7") }}
        <a-select v-model="percentageLimit" style="width:105px;margin:7px 0px 0px 60px" class="disabled-white"
          :disabled="disabled" size="small">
          <a-select-option v-for="item in percentageLimit_arr" :key="item" :value="item">{{ item }}%
          </a-select-option>
        </a-select>
      </div>
    </div>

       <!-- 自动升额度% -->
    <div v-if=" radio_type == 'automatic_limit' "  style="font-size: 14px;">
        <div  class="mt10x"> 
          <!-- 自动升额度%  -->
          <span  style="margin-right: 70px;">{{ $t("internal.betting.label15") }}</span>
           <!-- <button style="background-color: #fff; ">1500%</button> -->
           <span class="limit_btn" style="padding: 0 12px 0 6px; border: 1px solid gray;"> 1500% </span>
           <!-- <a-button
            size="small"
            color="black"
           >
            1500%
          </a-button> -->
      

        </div>
        <div class="mt10x"> 
          <!-- 自动升额度开关  -->
          <span  style="margin-right: 80px;">{{ $t("internal.betting.label16") }}</span>
    
          <span>
            <a-switch 
              :checked-children="$t('internal.template.label177')" :un-checked-children="$t('internal.template.label171')" 
            />
          </span>

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
      radio_type: "special_percentage"  // 按钮
      
    }
  },
  methods: {
        // 百分比、自动升额度按钮 选中
    handle_change() {
      console.log(this.radio_type);
      // this.radio_type = type
    },
    handle_click(val) {
      console.log(val);
    }
    
  }
}
</script>

<style lang="scss" scoped>
  // .limit_text{
  //   margin-left: 30px;
  // }
  .limit_btn {
    padding: 0 10px;
    border: 1px solid gray;

  }
</style>