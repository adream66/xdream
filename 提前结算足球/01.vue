<!--
 * @FilePath: /src/pages/internal/merchant/merchantc/component/dialogFootballEarlySettle.vue
 * @Description: 提前结算-足球弹窗 设置 弹窗
-->
<template>
  <div
    style="width: 500px; height: auto; max-width: 500px; overflow: hidden"
    class="text-panda-text-7"
  >
    <q-card
      class="bg-white text-black"
      style="width: 500px; height: 300px; max-width: 500px; overflow: hidden"
    >
      <q-card-section class="no-padding">
        <div
          class="
            row
            line-height-40px
            fs14
            bg-panda-dialog
            text-panda-text-7
            pr10x
          "
          v-if="src_internal"
        >
          <div class="pl20x fw_600">
            <!-- 提前结算-足球 -->
            {{ $t("internal.system_level_switch.label30") }} 
            <!-- {{ detailObj.merchantName }} -
            {{ $t("internal.system_level_switch.label2") }}  -->
          </div>
          <q-space></q-space>
          <q-btn
            class="mr5x text-panda-dialog-close"
            icon="close"
            v-close-popup
          />
        </div>
      </q-card-section>
      <q-separator v-if="src_internal"></q-separator>
      <q-card-section
        class="position-relative"
        :class="src_internal ? 'no-padding' : 'plr-0x'"
      >
        <div class="row ml20x mb10x" :class="src_internal ? 'mt20x' : ''">
          <div class="full-height full-width">
            <div
              class="
                line-height-30px
                items-center
                text-panda-text-dark
                bg-panda-bg-6
                ml10x
                mr10x
                border-radius-4px
              "
            >
              <div class="ml80x mt30x">
                <!-- <div> -->
                  <!-- 预约盘口值            -->
                  <!-- <span class="q-mr-md">{{ $t("internal.merchantc_.label12") }}</span> -->
                <!-- </div> -->
                    <div>
                  <!-- 部分提前结算 开关 0关 1开            -->
                  <span class="q-mr-md">      {{ $t("internal.system_level_switch.label28") }}  </span>
                  <a-switch
                    v-model="partialEarlySettlement"
                    v-if="!toggleLoading"
                    @click="handle_click_bookMarketSwitch()"
                    :checked-children="$t('internal.template.label177')"
                    :un-checked-children="$t('internal.template.label171')"
                  />
                </div>
                    <div>
                  <!-- 预约提前结算  开关 0关 1开            -->
                   <span class="q-mr-md">     {{ $t("internal.system_level_switch.label29") }} </span>
                  <a-switch
                    v-model="appointmentEarlySettlement"
                    v-if="!toggleLoading"
                    @click="handle_click_bookMarketSwitch()"
                    :checked-children="$t('internal.template.label177')"
                    :un-checked-children="$t('internal.template.label171')"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <q-card-section class="fs14">
          <div class="row flex justify-center mt50x">
            <div class="row mb10x mr5x">
              <!-- 保存 -->
              <q-btn
                class="panda-btn-primary-dense bg-primary mr20x"
                style="width: 100px; height: 32px"
                @click="handle_submit"
                :loading="loading"
                :label="$t('internal.save')"
              />
              <!-- 取消 -->
              <q-btn
                v-if="src_internal"
                class="panda-btn-white border-1px"
                style="width: 80px; height: 32px"
                v-close-popup
                :label="$t('internal.cancel')"
              />
              <q-btn
                v-else
                class="panda-btn-white border-1px"
                style="width: 80px; height: 32px"
                :label="$t('internal.cancel')"
              />
            </div>
          </div>
        </q-card-section>
      </q-card-section>
    </q-card>
  </div>
</template>
<script>
import { api_merchant } from "src/api/index.js";
import lan_name from "src/components/common/dialog_lan/mixin/lan_name.js";
const FOR_WHICH = process.env.FOR_WHICH;
export default {
  mixins: [lan_name],
  data() {
    return {
      loading: false,
      partialEarlySettlement: true, //部分提前结算(0关,1开)
      appointmentEarlySettlement: true, //预约提前结算(0关,1开)
      toggleLoading: false,
    };
  },
  props: {
    detailObj: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  mounted() {
    this.init();
  },
  methods: {
    //获取商户当前预约投注的状态
    init() {
      let params = { merchantCode: this.detailObj.merchantCode };
      try {
        api_merchant
          .post_manage_config_queryMarketSwitch(params)
          .then((res) => {
            let code = this.$lodash.get(res, "data.code");
            let msg = this.$lodash.get(res, "data.msg");
            let data = this.$lodash.get(res, "data.data");
            let status = data;
            console.log(data, "---status");
            if (code == "0000000") {
              this.partialEarlySettlement =
                status.partialEarlySettlement == 1 ? true : false;
                this.appointmentEarlySettlement =
                status.appointmentEarlySettlement == 1 ? true : false;
              this.toggleLoading = false;
            } else {
              console.error(msg);
            }
          });
      } catch (error) {
        console.error(err);
      } finally {
        this.toggleLoading = true;
      }
    },

    // 预约盘口开关  0关 1开
    handle_click_bookMarketSwitch() {
      console.log("--------预约盘口开关  0关 1开");
      // this.currentRecord = record;
    },
    // 编辑预约盘口 提交参数开关状态
    handle_submit() {
      this.loading = true;
      let params = {
        partialEarlySettlement: this.partialEarlySettlement ? 1 : 0,//足球
        appointmentEarlySettlement: this.appointmentEarlySettlement ? 1 : 0,//篮球
        merchantCode: this.detailObj.merchantCode,
      };

      api_merchant
        .post_manage_config_updateMarketSwitch(params)
        .then((res) => {
          console.log(
            "--------预约盘口开关  0关 1开   编辑预约盘口 提交参数开关状态"
          );
          let code = this.$lodash.get(res, "data.code");
          let msg = this.$lodash.get(res, "data.msg");
          if (code == "0000000") {
            this.loading = false;
            this.$message.success(msg);
            this.$emit("handleCloseLanDefault");
          } else {
            this.loading = false;
            this.$message.error(msg);
            console.error(msg);
          }
        })
        .catch((err) => {
          this.loading = false;
          this.$message.error(err);
        });
    },
  },
};
</script>
<style lang="scss" scoped>
</style>
