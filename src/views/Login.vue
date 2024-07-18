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
const images = [
      'https://fastly.jsdelivr.net/npm/@vant/assets/apple-1.jpeg',
      'https://fastly.jsdelivr.net/npm/@vant/assets/apple-2.jpeg',
    ];

const onSubmit = (values) => {
  console.log('submit', values);
  axios.post('http://localhost:8080/login', {
    accountId: accountId.value,
    password: password.value,
  }, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  }).then(function (response) {
    console.log(response.data);
    if(response.data.code==0){
      console.log("登陆成功");
      console.log(response.data.data)
      store.user.accountId=response.data.data.accountId;
      store.user.identityName=response.data.data.identityName;
      router.push({path:'/home',});

    }else{
      console.log("登陆失败");
      showNotify(response.data.show);
    }
  })
  .catch(function (error) {
    console.log(error);
  });

   //   router.push({path:'/home',});
}

const goRegister = ()=>{
  router.push({
    path:'/register',
  });
}
</script>

<template>
<div>
    <van-nav-bar class="van-bar" title="手机银行" />
      <van-swipe :autoplay="3000" lazy-render >
        <van-swipe-item v-for="image in images" :key="image">
            <img :src="image"  height="500px" width="100%" />
        </van-swipe-item>
      </van-swipe>

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
  </van-cell-group>
  <div style="margin: 16px;">
    <van-button round block type="primary" native-type="submit">
      登录
    </van-button>

    <van-button round block type="default" native-type="submit" @click="goRegister">
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