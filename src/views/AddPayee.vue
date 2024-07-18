<script setup>
import{ref,reactive}from 'vue';

import {useRouter} from 'vue-router';

import axios from 'axios';

import { useUserInfoStore } from "@/stores/userInfo";
import {showNotify} from "vant";

const store=useUserInfoStore()

const router = useRouter();

const accountId = ref('');
const toAccountId = ref('');
const identityName = ref('');

const onClickLeft = () => {
  console.log('click left');
  router.push(
      {
        path:'/payeeList',
      }
  );
};

const onSubmit = (values) => {
    console.log('submit', values);
    axios.post('http://localhost:8080/addPayee', {
      accountId: store.user.accountId,
      toAccountId: toAccountId.value,
      identityName: identityName.value,
    }, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }).then(function (response) {
      console.log(response.data);
      if(response.data.code==0){
        console.log("添加收款人成功");
        console.log(response.data.msg)
        router.push({path:'/payeeList',});
      } else {
        console.log("添加收款人失败");
        console.log(response.data.msg);
        showNotify(response.data.msg);
      }
    }).catch(function (error) {
      console.log(error);
    });
}
</script>

<template>
  <div>
    <van-nav-bar class="van-bar" title="手机银行" left-text="返回" left-arrow @click-left="onClickLeft"/>
    <van-form @submit="onSubmit">
      <van-cell-group inset>
        <van-field v-model="identityName"
                   name="收款人姓名"
                   label="收款人姓名"
                   placeholder="请输入收款人姓名"
                   :rules="[{ required: true, message: '请填写收款人姓名' }]" />
        <van-field v-model="toAccountId"
                   type="toAccountId"
                   name="收款人账号"
                   label="收款人账号"
                   placeholder="请输入你收款人银行账号"
                   :rules="[{ required: true, message: '请填写收款人银行账号' }]" />
      </van-cell-group>
        <div style="margin: 16px;">
          <van-button round block type="default" native-type="submit">
            新增收款人
          </van-button>
        </div>
    </van-form>
  </div>
</template>

<style>
</style>