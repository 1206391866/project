<script setup>
import TabBar from "@/components/TabBar.vue";
import {useRouter} from 'vue-router';
const router =useRouter();

const goTrader = ()=>{
    router.push({
        path:'/trader',
    });
}

const goTradeList = ()=>{
  router.push({
    path:'/tradelist',
  });
}

const goPayeeList = ()=>{
  router.push({
    path:'/payeeList',
  });
}

const goDeposit = ()=>{
  router.push({
    path:'/deposit',
  });
}

const images = [
  'https://fastly.jsdelivr.net/npm/@vant/assets/apple-1.jpeg',
  'https://fastly.jsdelivr.net/npm/@vant/assets/apple-2.jpeg',
];

</script>

<template>
    <div> 
      <van-nav-bar  class="van-bar" title="手机银行首页" />
      <van-swipe :autoplay="3000" lazy-render >
        <van-swipe-item v-for="image in images" :key="image">
          <img :src="image"  height="500px" width="100%" />
        </van-swipe-item>
      </van-swipe>
<!--      <img src="@/assets/logo.jpg" width="100%" height="200px" alt="首页图片">-->
<!--      <img src="@/assets/logo.jpg" width="100%" height="200px" alt="首页图片">-->
      <van-grid :gutter="10">
          <van-grid-item icon="user" text="我的账户" />
          <van-grid-item icon="gold-coin" text="我的资产" />
          <van-grid-item icon="balance-list" text="我的交易" />
          <van-grid-item icon="bill" text="我的支付" />
      </van-grid>

      <van-divider/>

      <van-grid :gutter="10">
        <van-grid-item icon="todo-list-o" text="同行转账" wx:for="{{ 8 }}" @click="goTrader"/>
        <van-grid-item icon="friends-o" text="交易查询" wx:for="{{ 8 }}" @click="goTradeList"/>
        <van-grid-item icon="photo-o" text="定期存款" wx:for="{{ 8 }}" @click="goDeposit"/>
        <van-grid-item icon="friends-o" text="维护收款人" wx:for="{{ 8 }}" @click="goPayeeList"/>
      </van-grid>



<!--        <van-space direction="vertical" fill>-->
<!--            <van-button type="primary" @click="goTrader" block>同行转账</van-button>-->
<!--            <van-button type="primary" @click="goTradeList" block>交易查询</van-button>-->
<!--            <van-button type="primary" @click="goPayeeList" block>定期存款</van-button>-->
<!--            <van-button type="primary" block>维护收款人</van-button>-->
<!--        </van-space>-->
    </div>
   <TabBar/>
  
</template>
<style scoped>
</style>