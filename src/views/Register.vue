<script setup>
import{ref,reactive}from 'vue';

import {useRouter} from 'vue-router';

import axios from 'axios';

import { useUserInfoStore } from "@/stores/userInfo";
import {showNotify} from "vant";
const store=useUserInfoStore()

const router = useRouter();

const accountId=ref('');
const password=ref('');
const identityName = ref();
const mobile = ref();

const onSubmit = (values) => {
    console.log('submit', values);
    axios.post('http://localhost:8080/account/register', {
      accountId: accountId.value,
      password: password.value,
      identityName: identityName.value,
      mobile: mobile.value
    }, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }).then(function (response) {
      console.log(response.data);
      if(response.data.code==0){
        console.log("注册成功");
        console.log(response.data.msg)
        store.user.accountId=response.data.data.accountId;
        store.user.identityName=response.data.data.identityName;
        router.push({path:'/home',});
      } else {
        console.log("注册失败");
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
    <van-nav-bar class="van-bar" title="手机银行" />
    <van-form @submit="onSubmit">
      <van-cell-group inset>
        <van-field
          v-model=" accountId"
          name="银行账号"
          label="用户名"
          placeholder="请输入您的银行账号"
          :rules="[{ required: true, message: '请填写银行账号' }]"
        />
        <van-field
          v-model="password"
          type="password"
          name="银行密码"
          label="银行密码"
          placeholder="请输入您的银行密码"
          :rules="[{ required: true, message: '请填写银行密码' }]"
        />
        <van-field
            v-model="identityName"
            type="identityName"
            name="姓名"
            label="姓名"
            placeholder="请输入您的姓名"
            :rules="[{ required: true, message: '请填写姓名' }]"
        />
        <van-field
            v-model="mobile"
            type="mobile"
            name="手机号码"
            label="手机号码"
            placeholder="请输入您的手机号码"
            :rules="[{ required: true, message: '请填写手机号码' }]"
        />
      </van-cell-group>
        <div style="margin: 16px;">
          <van-button round block type="default" native-type="submit">
            注册银行账户
          </van-button>
        </div>
    </van-form>
  </div>
</template>
<style>
/* .van-bar{
    background-color: rgb(0, 60, 255);
} */
</style>