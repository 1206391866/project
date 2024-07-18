<script setup>
import { ref, onMounted, computed } from 'vue';
import {useRouter} from 'vue-router';
import axios from 'axios';
import { useUserInfoStore } from "@/stores/userInfo";
import {showNotify} from "vant";

const router =useRouter();

const store=useUserInfoStore()
const payeeList = []

const columns = [
      { text: '杭州', value: 'Hangzhou' },
      { text: '宁波', value: 'Ningbo' },
      { text: '温州', value: 'Wenzhou' },
      { text: '绍兴', value: 'Shaoxing' },
      { text: '湖州', value: 'Huzhou' },
    ];

onMounted(() => {
    console.log("收款人预加载");
    getPayeeList();
  })

function getPayeeList() {
  axios.get ('http://localhost:8080/payee/list?fromAccountId=' + store.user.accountId).then(function (response) {
    // 处理成功情况
    console.log(response.data);
    if(response.data.code==0){
        console.log("交易查询成功");
        console.log(response.data.data);
        console.log(JSON.stringify(response.data.data));
        response.data.data.forEach(element => {
          let item = {text: element.text, value:element.value}
          console.log(item)
          payeeList.push(item)
        });
        console.log(payeeList)
    }
  })
  .catch(function (error) {
    // 处理错误情况
    console.log(error);
  })
}

const onClickLeft=()=>{
    console.log('click left');
    router.push(
        {
            path:'/home',
        }
    );
};

const toAccountId = ref('');
const money = ref('');
const remark = ref('');

const payeeListShow = ref(false)
const payeeListPicker = ref('')


const payeeListConfirm = () => {
  console.log(payeeListPicker.value)
  toAccountId.value = payeeListPicker.value
  payeeListShow.value = false
}

const onSubmit = (values) => {
  console.log('submit', values);
  axios.post('http://localhost:8080/deposit/trade', {
    fromAccountId: store.user.accountId,
    toAccountId:toAccountId.value,
    money: money.value,
    remark:remark.value,
  }, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  }).then(function (response) {
    console.log(response.data);
    if(response.data.code==0){
        console.log("转账成功");
        showNotify("转账成功");
    }else{
      console.log("转账失败");
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
        title="同行转账"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
        />
    <van-form @submit="onSubmit">
      <van-cell-group inset>
        <van-field
          v-model="toAccountId"
          name="转入账户"
          label="转入账户"
          placeholder="请输入转入账户"
          :rules="[{ required: true, message: '请填写转入账户' }]" @click="payeeListShow=true" />
        <!-- <van-popup :show="payeeListShow" position="bottom" :style="{ height:'35%' }">
          <van-picker value-key='text' v-model="payeeListPicker" title="选择汇款人" :columns="columns"
                      @confirm="payeeListConfirm" @cancel="payeeListShow=false" >
          </van-picker>
        </van-popup> -->
        <van-field
          v-model="money"
          name="转出金额"
          label="转出金额"
          placeholder="转出金额"
          :rules="[{ required: true, message: '请填写转出金额' }]"
        />

        <van-field
          v-model="remark"
          name="备注"
          label="备注"
          placeholder="请输入备注"
          :rules="[{ required: true, message: '请填写备注' }]"
        />
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