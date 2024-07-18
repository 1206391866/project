<script setup>
import { ref,reactive } from 'vue';
import {useRouter} from 'vue-router';
import axios from 'axios';
import { useUserInfoStore } from "@/stores/userInfo";
import {showNotify} from "vant";
import moment from 'moment';

const router =useRouter();

const store=useUserInfoStore()

const onClickLeft=()=>{
    console.log('click left');
    router.push(
        {
            path:'/home',
        }
    );
};


const remaining = ref()
const interestRate = ref()
const depositType = ref('')
const remark = ref('');

const minDate = ref(new Date(2024, 1, 1))
const maxDate = ref(new Date())
const startTimeShow = ref(false)
const endTimeShow = ref(false)
const depositTime = ref()
const expireTime = ref()
const startPickerTime = ref()
const endPickerTime = ref()

const startPickerConfirm = () => {
  console.log(startPickerTime.value)
  depositTime.value = moment(startPickerTime.value).format("yyyy-MM-DD")
  startTimeShow.value = false
}

const endPickerConfirm = () => {
  console.log(endPickerTime.value)
  expireTime.value = moment(endPickerTime.value).format("yyyy-MM-DD")
  endTimeShow.value = false
}


const onSubmit = (values) => {
  console.log('submit', values);
  axios.post('http://localhost:8080/deposit/update', {
    accountId: store.user.accountId,
    depositType: depositType.value,
    remaining: remaining.value,
    remark: remark.value,
    depositTime: moment(depositTime.value).format("yyyy-MM-DD"),
    expireTime: moment(expireTime.value).format("yyyy-MM-DD"),
    interestRate: interestRate.value
  }, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  }).then(function (response) {
    console.log(response.data);
    if(response.data.code==0){
        console.log("存款成功");
        showNotify("存款成功");
    }else{
      console.log("存款失败");
      showNotify(response.data.msg);
    }
  }).catch(function (error) {
    console.log(error);
  });
};

</script>

<template>
  <div>
    <van-nav-bar
        class="van-bar"
        title="活/定期存款"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
        />

    <van-form @submit="onSubmit">
      <van-cell-group inset>
        <van-cell title="请选择存款模式">
          <van-radio-group v-model="depositType" :value="depositType" bind:change="onChange" right>
            <van-row>
              <van-radio name="活期">活期</van-radio>
              <van-radio name="定期">定期</van-radio>
            </van-row>
          </van-radio-group>
        </van-cell>
        <van-field v-model="remaining"
                   name="输入存款金额"
                   label="输入存款金额"
                   placeholder="请输入存款金额"
                   :rules="[{ required: true, message: '请填写存款金额' }]" />
        <van-field v-model="depositTime"
                  :value="depositTime"
                   name="存款开始时间"
                   label="存款开始时间"
                   placeholder="请选择存款开始时间"
                   :rules="[{ required: true, message: '请选择存款开始时间' }]" @click="startTimeShow = true"/>
        <van-popup :show="startTimeShow" position="bottom" :style="{ height:'35%' }">
          <van-date-picker v-model="startPickerTime" type="date" title="选择日期"
                             @confirm="startPickerConfirm" @cancel="startTimeShow=false" />
        </van-popup>
        <van-field v-model="expireTime"
                  :value="expireTime"
                   name="存款结束时间"
                   label="存款结束时间"
                   placeholder="请选择存款结束时间"
                   :rules="[{ required: true, message: '请选择存款结束时间' }]" @click="endTimeShow = true"/>
        <van-popup :show="endTimeShow" position="bottom" :style="{ height:'35%' }">
          <van-date-picker v-model="endPickerTime" type="date" title="选择日期"
                             @confirm="endPickerConfirm" @cancel="endTimeShow=false" />
        </van-popup>
        <van-field v-model="interestRate"
                   name="利率"
                   label="利率"
                   placeholder="存款利率"
                   :rules="[{ required: true, message: '请填写存款利率' }]" />

        <van-field v-model="remark"
                   name="备注"
                   label="备注"
                   placeholder="请输入备注"
                   :rules="[{ required: true, message: '请填写备注' }]" />
      </van-cell-group>
      <div style="margin: 16px;">
        <van-button round block type="primary" native-type="submit">
          提交
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<style scoped>
</style>