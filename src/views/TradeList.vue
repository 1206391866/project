<script setup>
  import { ref, reactive ,onMounted} from 'vue';
  import {useRouter} from 'vue-router';
  const router = useRouter();
  import axios from 'axios';
  import moment from 'moment';
  import { useUserInfoStore } from "@/stores/userInfo";

  const store = useUserInfoStore()

  const onClickLeft =() => {
      console.log('click left');
      router.push(
          {
              path:'/home',
          }
      );
  };

  const page = ref(1); //当前页面
  const tradeList = ref([]); //交易列表数组
  const total = ref(1);
  const size = ref(5);

  onMounted(() => {
    console.log("交易查询");
    pageTradeInfo();
  })

  function pageTradeInfo() {
    axios.get ('http://localhost:8080/trades?page=' + page.value + '&fromAccountId=' + store.user.accountId).then(function (response) {
      // 处理成功情况
      console.log(response.data);
      if(response.data.code==0){
          console.log("交易查询成功");
          console.log(response.data.data);
          tradeList.value=response.data.data.records;
          page.value = response.data.data.current;
          total.value=response.data.data.total;
          size.value=response.data.data.size;
      }
    })
    .catch(function (error) {
      // 处理错误情况
      console.log(error);
    })
  }
</script>

<template>
  <div>
    <van-nav-bar
      class="van-bar"
      title="交易查询"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    <van-cell-group :right-width="60" :left-width="60" 
                    v-for="(item,index) in tradeList" :key="index" >
      <van-card
          :num="'交易时间：'+ moment(item.tradeTime).format('YYYY-MM-DD, HH:mm:ss')"
          :price="item.tradeMoney"
          :desc="item.summary"
          :title="item.tradeType"
      />
    </van-cell-group>
    <van-pagination v-model="page" :total-items="total" @change="pageTradeInfo" :items-per-page="size" />
  </div>
</template>

<style scoped>
</style>