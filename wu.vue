<template>
  <div>

          <!-- 编辑情况下      //   "1": "无",      //   "2": "特殊百分比限额",  -->
       
          <div
            class="pl20x fw_600 col q-pr-md"
          >
          
            <!-- 对特殊VIP限额、特殊单注单场限额、单注限额百分比的用户限额需求 -->
            <a-tooltip trigger="hover">
              <template slot="title">
                {{ $t("internal.betting.label2") }} 
              </template>
              <a-icon type="question-circle" class=" fs15" />
            </a-tooltip>
            <!-- 用户单日、单场、玩法累计投注限额是正常用户的 -->
            {{ $t("internal.betting.label1") }}
            <a-select
              v-model="percentageLimit"
              style="width:105px;margin-top:7px"
              class="disabled-white"
              :disabled="[3, 4].includes(detailObj.specialBettingLimitType)"
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


<template>
  <div
class="cursor-pointer display-block"
@click="handleSetDesp(record)"
style="display: flex;"
>
<q-icon
  v-if="text&&src_internal||
  src_external&&[1, 2, 3, 4].includes(record.specialBettingLimitType)"
  class=" panda-icon panda-icon-cha-kan panda-icon-hover fs18 cursor-pointer float-left mr5x "
></q-icon>
<!-- //   "1": "无",  //   "3": "特殊单注单场限额", //   "4": "特殊VIP限额" //    "5": 信用限额       -->
<!-- 有特殊限额的用户在列表中投注特殊限额字段显示三行单日/单场/单注限额百分比 -->
<div>
  <span class="float-left" v-if="src_external&&record.specialBettingLimitType == 2"
    >
    <!-- {{ tabledata_specialBettingLimitType_2[`index_${record._index}`] }} -->
    {{ $t(`internal.betting.label12`) }} {{ tabledata_specialBettingLimitType_2[`index_${record._index}`] }} <br />
    {{ $t(`internal.betting.label13`) }} {{ tabledata_specialBettingLimitType_2[`index_${record._index}`] }}  <br />
    {{ $t(`internal.betting.label14`) }} {{ tabledata_specialBettingLimitType_2[`index_${record._index}`] }} <br />

  </span>
</div>
</div>
</template>














