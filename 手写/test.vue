<!--
 * @FilePath: /src/components/common/techInfoSecond/index.vue
 * @Description: 账户中心.二级商户管理.新建~编辑 二级商户(技术参数)
-->
<template>
  <div class="busniess-info">
    <a-form class="edit" :form="form" @submit="handle_tech_second_submit">
      <div class="col-12">
        <div class="row">
          <div class="pl20x">
            <!-- 品牌 * -->
            <div class="text-panda-text-7 mb10x fw_600">
              {{ $t("internal.common.c5") }}
              <span class="panda-text-red">*</span>
            </div>
            <div class="append-handle-btn-input position-relative w-160">
              <a-form-item>
                <a-select
                  :disabled="isUpdate"
                  autocomplete
                  class="w-240"
                  :placeholder="$t('internal.placeholder.pleaseChoose')"
                  size="large"
                  v-decorator="['brand', {rules: [ {required: true,message: $t('internal.message.label166'),}, ], }, ]">
                  <a-select-option
                    :value="item.value"
                    v-for="(item, index) in brand_list"
                    :key="index"
                    >{{ item.label }}</a-select-option
                  >
                </a-select>
              </a-form-item>
            </div>
          </div>
          <div class="pl20x">
            <!-- PC布局样式 * -->
            <div class="text-panda-text-7 mb10x fw_600">
              {{ $t("internal.common.c6") }}
              <span class="panda-text-red">*</span>
            </div>
            <div class="append-handle-btn-input position-relative w-160">
              <a-form-item>
                <a-select
                  :disabled="isUpdate"
                  autocomplete
                  class="w-240"
                  :placeholder="$t('internal.placeholder.pleaseChoose')"
                  size="large"
                  v-decorator="['pcLayout', {rules: [ {required: true,message: $t('internal.message.label167'),}, ], }, ]">
                  <a-select-option
                    :value="item.value"
                    v-for="(item, index) in layout_list"
                    :key="index"
                    >{{ item.label }}</a-select-option
                  >
                </a-select>
              </a-form-item>
            </div>
          </div>
          <div class="pl20x">
            <!-- H5布局样式 * -->
            <div class="text-panda-text-7 mb10x fw_600">
              {{ $t("internal.common.c7") }}
              <span class="panda-text-red">*</span>
            </div>
            <div class="append-handle-btn-input position-relative w-160">
              <a-form-item>
                <a-select
                  :disabled="isUpdate"
                  autocomplete
                  class="w-240"
                  :placeholder="$t('internal.placeholder.pleaseChoose')"
                  size="large"
                  v-decorator="['h5Layout', {rules: [ {required: true,message: $t('internal.message.label168'),}, ], }, ]">
                  <a-select-option
                    :value="item.value"
                    v-for="(item, index) in layout_list"
                    :key="index"
                    >{{ item.label }}</a-select-option
                  >
                </a-select>
              </a-form-item>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="pl20x">
          <!-- 商户钱包类型 -->
            <div class="text-panda-text-7 mb10x fw_600">
              {{$t("internal.template.label78")}}{{channelToSecond.transferMode}}
              <span class="panda-text-red">*</span>
            </div>
            <div class="append-handle-btn-input position-relative w-160">
              <a-form-item>
                <a-select
                  autocomplete
                  class="w-240"
                   :placeholder='$t("internal.placeholder.label38")'
                   disabled
                  size="large"
                  @change="handleTransfeiModeChange"
                  v-decorator="[
                    'transferMode',
                    { rules: [{ required: true, message: $t('internal.message.label64') }] },
                  ]"
                >
                  <a-select-option
                    :value="item.value"
                    v-for="(item, index) in transferModeList"
                    :key="index"
                  >{{item.label}}</a-select-option>
                </a-select>
              </a-form-item>
            </div>
          </div>
        </div>
        <div class="row" v-if="formData.transferMode == 1">
          <div class="ml20x">
            <div class="text-panda-text-7 mb10x fw_600">
             {{$t("internal.template.label109")}}URL
              <span class="panda-text-red">*</span>
            </div>
            <div class="append-handle-btn-input row">
              <a-form-item style="width: 35vw" has-feedback>
                <a-input
                  :placeholder='$t("internal.placeholder.label39")'
                  autocomplete="off"
                  v-decorator="[
                    'url',
                    { rules: [
                      {
                        type: 'url',
                        message: $t('internal.message.label83'),
                      },
                      {
                        required: true,
                        message: $t('internal.message.label84'),
                      },
                    ]}
                  ]"
                />
              </a-form-item>
            </div>
          </div>
        </div>
        <!-- 加扣款回调 -->
        <div class="row" v-if="formData.transferMode == 1 || formData.transferMode == 2 ">
          <div class="ml20x">
            <div class="text-panda-text-7 mb10x fw_600">
             {{$t("internal.template.label110")}}URL
              <!-- <span class="panda-text-red">*</span> -->
            </div>
            <div class="append-handle-btn-input row">
              <a-form-item style="width: 35vw" has-feedback>
                <a-input
                   :placeholder='$t("internal.placeholder.label40")'
                  autocomplete="off"
                  v-decorator="['callbackUrl']"
                />
              </a-form-item>
            </div>
          </div>
        </div>
        <!-- 余额回调URL -->
        <div class="row" v-if="formData.transferMode == 1">
          <div class="ml20x">
            <div class="text-panda-text-7 mb10x fw_600">{{$t("internal.template.label133")}}</div>
            <div class="append-handle-btn-input row">
              <a-form-item style="width: 35vw" has-feedback>
                <a-input
                   :placeholder='$t("internal.placeholder.label41")'
                  autocomplete="off"
             
                  v-decorator="[
                    'balanceUrl'
                  ]"
                />
              </a-form-item>
            </div>
          </div>
        </div>
        <!-- 保存取消按钮 -->
        <div class="row flex justify-center mb20x">
          <q-btn
            class="panda-btn-white mr20x"
            style="width:100px;height:32px;border: 1px solid #8A92A5; "
            @click="handle_previous"
             :label='$t("internal.label.label17")' 
          />
          <q-btn
            class="panda-btn-primary-dense bg-primary mr20x"
            style="width:100px;height:32px; "
            @click="handle_tech_second_submit"
            :loading="ajaxLoading"
            :label="$t('internal.save')"
          />
          <q-btn
            class="panda-btn-white"
            style="width:80px;height:32px;border: 1px solid #8A92A5; "
            @click="handle_cancel"
            :label="$t('internal.cancel')"
          />
        </div>
      </div>
    </a-form>
    <!-- 选择商户等级 -->
    <q-dialog v-model="selectLevelShow" persistent transition-show="scale" transition-hide="scale">
      <dialog-select-level @closeSelectDialog="handle_close_dialog_select"></dialog-select-level>
    </q-dialog>
  </div>
</template>

<script>
import { i18n } from 'src/boot/i18n';
import { mapGetters } from 'vuex'
import dialogSelectLevel from "src/pages/internal/merchant/merchantc/component/dialogSelectLevel.vue";
import editOrUpdateMixin from "src/components/common/techInfoSecond/mixin/index.js";
export default {
  mixins: [editOrUpdateMixin],
  props: {
    isUpdate:false,
    detail: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  components: {
    dialogSelectLevel
  },
  computed: {
    ...mapGetters(['get_channel','get_detail']),
    channelToSecond() {
      return this.$q.sessionStorage.getItem('channelToSecond') || {};
    },
  },
  data() {
    return {

    };
  },
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: "edit-tech-info-second" });
  },
  created(){
    this.init_channel_merchant();
  },
  mounted(){
    this.init_form_callbackUrl();
    this.get_detail !== null && this.get_init_values()
  },
  watch: {
    get_channel: {
      handler(val){
        this.formData = {...val}
        this.$nextTick(() => {
          this.form.setFieldsValue(val);    
        })
      },
      immediate: true,
    }
  },
  methods: {
    /**
     * @description 渠道商户处理点击设置二级商户进来初始化数据
     * @return {undefined} undefined
     */
    init_channel_merchant() {
      if(this.channelToSecond.id){
        this.formData.transferMode = this.channelToSecond.transferMode; //控制url是否显示
        let initValues = ''
        if(this.channelToSecond.transferMode == 1){
          initValues = {
            transferMode: this.channelToSecond.transferMode,
            url: this.channelToSecond.url,
            callbackUrl: this.channelToSecond.callbackUrl,
            balanceUrl: this.channelToSecond.balanceUrl,
            whiteIp: this.channelToSecond.whiteIp
          }     
          if(!this.channelToSecond.balanceUrl){
            delete initValues.balanceUrl;
          }
        }else{
          initValues = {
            transferMode: this.channelToSecond.transferMode,
            whiteIp: this.channelToSecond.whiteIp
          }
        }
        this.$nextTick(() => {       
          this.form.setFieldsValue(initValues);
        });
      }
    },
    /**
     * @description 
     * @return {undefined} undefined
     */
    get_init_values(){
      let initValues = {
        whiteIp: this.get_detail.whiteIp,
        brand: this.get_detail.brand,
        pcLayout: this.get_detail.pcLayout,
        h5Layout: this.get_detail.h5Layout,
      };
      this.$nextTick(() => {
        this.form.setFieldsValue(initValues);
      });
    },
    handle_previous() {
      this.$emit("handlePrevious",'techInfoSecond');
    },
    handleTransfeiModeChange(val) {
      this.formData.transferMode = val;
    },
    handle_tech_second_submit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log(values, "values");
          // values.status = 1
          this.$emit("collect_tech_info", values);
        }
      });
    },
    handleNeedValues(values) {
      if (values.vipAmount && !values.vipPaymentCycle) {
        this.$message.warn( i18n.t('internal.message.label19'));
        return false;
      } else if (values.techniqueAmount && !values.techniquePaymentCycle) {
        this.$message.warn( i18n.t('internal.message.label20'));
        return false;
      } else {
        return true;
      }
    },
    //表单初始化，加扣款回调URL这个字段，后端有返回callbackUrl这个字段值就一定要填充上去
    init_form_callbackUrl() {
      Object.assign(this.formData, this.detail)
      // this.formData.transferMode = val;
      this.$nextTick(() => {
        this.form.setFieldsValue(this.formData);
      });
    }
  }
};
</script>

<style lang="scss" scoped>
// form表单input样式重写
::v-deep .q-field__bottom--animated {
	 bottom: 6px;
}
 ::v-deep .q-field__marginal {
	 font-size: 14px;
}
 ::v-deep .q-field__native, .q-field__prefix, .q-field__suffix {
	 font-size: 12px;
}
 ::v-deep .ant-upload-list {
	 display: none;
}
 ::v-deep .ant-upload.ant-upload-select {
	 height: 30px;
	 line-height: 30px;
}
 

::v-deep #commerce .ant-select-selection__rendered {
	 line-height: 30px;
}
 ::v-deep .ant-input {
	 min-height: 30px;
	 line-height: 30px;
	 font-size: 12px;
}
 ::v-deep .has-error .ant-form-explain, .has-error .ant-form-split {
	 font-size: 12px;
}
 ::v-deep .ant-select-selection--single {
	 height: 30px;
	 line-height: 30px;
}
 

.ant-select-selection__placeholder {
	 margin-top: 0px;
	 line-height: 30px;
}
 ::v-deep .ant-select-selection__placeholder, .ant-select-search__field__placeholder {
	 font-size: 12px;
	 margin-top: -10px;
}
 ::v-deep .ant-select-selection-selected-value {
	 font-size: 12px;
	 line-height: 28px;
	 margin-top: 0px;
}
 

::v-deep .ant-input-number {
	 width: 160px;
	 height: 30px;
	 font-size: 12px;
	 line-height: 30px;
}
 ::v-deep #time .ant-input {
	 height: 30px;
	 line-height: 30px;
	 font-size: 12px;
	 padding: 0 11px;
}
 

// 复写input框
::v-deep .q-field--dense .q-field__control, .q-field--dense .q-field__marginal {
  height: 30px;
}

::v-deep .q-field--dense .q-field__marginal {
  height: 30px;
}

::v-deep .q-field--auto-height.q-field--dense .q-field__control {
  min-height: 30px;
}

::v-deep .q-field--auto-height.q-field--dense .q-field__native {
  min-height: 30px;
}

::v-deep .ant-form-explain, .ant-form-extra {
  margin-top: -3px;
}

::v-deep .ant-select-lg .ant-select-selection__rendered {
	 line-height: 30px;
}
 
</style>