<!--
 * @Desc: 对内/外-账户中心-投注用户管理-包含 特殊限额及 自动升额度 弹窗 
 * @FilePath: /src/components/common/bettinguser/external/component/dialogAutoAddLimit.vue
 -->


 <template>
  <div>



    <!-- 用户id  -->
          <span> {{ $t("internal.betting.label8")   }} : 	 {{ detailObj.userId }} </span>  
          <span style="margin-left:40px;"> {{ $t("internal.betting.label9")   }}: {{ detailObj.userName }}</span>
    
          <div style="margin-top:7px">
         
            <!-- <q-radio 
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
              
            /> -->
         
          </div>
    <div v-if=" radio_type == 'special_percentage' " style="font-size: 14px;">
 

      <!-- 用户单日投注 -->
      <div> {{ $t("internal.betting.label5") }}
        <a-select 
          v-model="percent_limit_obj.percent_danri_limit"
          :disabled="disabled"   size="small"
          style="width:105px;margin:7px 0px 0px 60px" class="disabled-white"
        >
          <a-select-option v-for="item in percentageLimit_arr" :key="item" :value="item">
            {{ item }}%  
          </a-select-option>
        </a-select>
      </div>
      <!-- 用户单场投注 -->
      <div> {{ $t("internal.betting.label6") }}  
        <a-select
          v-model="modelObj.percent_danchang_limit"

          :disabled="disabled" size="small"
          style="width:105px;margin:7px 0px 0px 60px" class="disabled-white"
        >
          <a-select-option v-for="item in percentageLimit_arr" :key="item" :value="item">{{ item }}%
          </a-select-option>
        </a-select>
      </div>
      <!-- 用户单注投注 -->
      <div> {{ $t("internal.betting.label7") }}
        <a-select 
          v-model="modelObj.percent_danzhu_limit"

          :disabled="disabled" size="small"
          style="width:105px;margin:7px 0px 0px 60px" class="disabled-white"
        >
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

        </div>
        <div class="mt10x"> 
          <!-- 自动升额度开关  -->
          <span  style="margin-right: 80px;">{{ $t("internal.betting.label16") }}</span>
    
          <span>
            <a-switch 
              @click="handle_change_swith()" :checked="add_limit == 1 ? false : true"
              :checked-children="$t('internal.template.label177')" 
              :un-checked-children="$t('internal.template.label171')" 
              :disabled="percent_limit_obj.add_limit"
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
    percent_limit_obj:{
      type:Object,
      default(){
        return {}
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
     
      percentageLimit_arr: [1, 2, 5, 10, 25, 50, 75, 100],
      special_percentage: i18n.t('internal.betting.label10'),  // 特殊百分比radio
      automatic_limit: i18n.t('internal.betting.label11'),  // 自动升额度radio
      radio_type: "special_percentage",  // 按钮
      add_limit:false, //升额度开关
      modelObj:{}
    }
  },
  watch: {
    percent_limit_obj(){
      this.modelObj = JSON.parse(JSON.stringify(this.percent_limit_obj))
      console.log('----',this.percent_limit_obj,this.modelObj);
    }
  },
  created() {
    console.log("@@",this. detailObj);
    // this.modelObj = JSON.parse(JSON.stringify(this.percent_limit_obj))
  },
  computed: { 
    read_percentageLimit() {
      let res = this.detailObj.rcsUserSpecialBetLimitConfigList[0].percentageLimit
      res =
        (item_list.percentageLimit * 100).toFixed(2) + "%";
        return  res
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
    },
    // 单日百分比限额
    changePercent1(e) {
      // console.log("EE", e);
      this.$emit('handleChange', e)
    },
    // 单场百分比限额
    changePercent2(e) {
      // console.log("EE", e);
      this.$emit('handleChange', e)
    },
    // 单注百分比限额
    changePercent3(e) {
      // console.log("EE", e);
      this.$emit('handleChange', e)
    },
    // 启&禁用 开关
    async handle_change_swith(record){
    // disabled   1 禁用 0启用  2-5 启用 
    // 修改传参 0 启用 1 禁用
      // try {
      //   let params = {
      //     userIds: record.userId,
      //     disabled: record.disabled == 1 ? 0: 1,
      //   }
      //   const res = await api_user.post_update_Disabled(params)
      //   const code = this.$lodash.get(res, "data.code");
      //   const msg = this.$lodash.get(res, "data.msg");
      //   if(code == "0000000"){
      //     this.$message.success(msg);
      //     this.$set(record,"disabled", record.disabled == 1 ? 0: 1)
      //   }else {
      //     this.$message.error(msg, 5);
      //   }
      // } catch (error) {
      //   console.error(error)
      // }
      console.log(66);
      this.add_limit = !this.add_limit
      // if(this.add_limit == false){
      //   this.disabled = true
      // }
    },
    
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