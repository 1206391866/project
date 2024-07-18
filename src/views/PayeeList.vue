<script setup>
  import { ref, reactive ,onMounted} from 'vue';
  import {useRouter} from 'vue-router';
  import axios from 'axios';
  import moment from 'moment';
  import { useUserInfoStore } from "@/stores/userInfo";
  import {Dialog, showConfirmDialog} from "vant";

  const store = useUserInfoStore()

  const router =useRouter();

  const onClickLeft = () => {
      console.log('click left');
      router.push(
          {
              path:'/home',
          }
      );
  };

  const onClickRight =() => {
    console.log('click right');
    router.push(
        {
          path:'/addPayee',
        }
    );
  };

  // const beforeClose = ({position}) => {
  //   switch (position) {
  //     case 'left':
  //     case 'cell':
  //     case 'outside':
  //       return true;
  //     case 'right':
  //       return new Promise((resolve) => {
  //         showConfirmDialog({
  //           width: "100%",
  //           title: "确定删除吗？",
  //         }).then(() => {
  //           resolve(true)
  //         }).catch(() => resolve(false));
  //       });
  //   }
  // }

  const deletePayee = (payeeId) => {
    showConfirmDialog({
      width: '100%',
      title: '确定删除吗？'
    }).then(() => {
      axios.get ('http://localhost:8080/deletePayee?payeeId=' + payeeId).then(function (response) {
        console.log(response.data);
        if (response.data.code==0) {
          window.location.reload();
        }
      }).catch(function (error) {
        // 处理错误情况
        console.log(error);
      })
    }).catch(() => console.log('出错了'));
    console.log(payeeId)
  }

  const page = ref(1); //当前页面
  const payeeList = ref([]); //交易列表数组
  const total = ref(1);
  const size = ref(5);

  onMounted(() => {
    console.log("交易查询");
    pageTradeInfo();
  })

  function pageTradeInfo() {
    axios.get ('http://localhost:8080/payees?page=' +  page.value + '&fromAccountId=' + store.user.accountId).then(function (response) {
      // 处理成功情况
      console.log(response.data);
      if(response.data.code==0){
        console.log("交易查询成功");
        console.log(response.data.data);
        payeeList.value=response.data.data.records;
        page.value = response.data.data.current;
        total.value=response.data.data.total;
        size.value=response.data.data.size;
      }
    }).catch(function (error) {
      // 处理错误情况
      console.log(error);
    })
  }
</script>

<template>
  <div>
    <van-nav-bar class="van-bar"
                 title="收款人查询" left-text="返回" left-arrow @click-left="onClickLeft"
                 right-text="新增" right-arrow  @click-right="onClickRight"/>
    <van-swipe-cell :right-width="60" :left-width="60" async-close
                    v-for="(item,index) in payeeList" :key="index">
      <template #left>
        <van-button
            square
            type="danger"
            text="编辑"
            class="select-button"
        />
      </template>
      <van-card
          :num="'创建时间：'+ moment(item.tradeTime).format('YYYY-MM-DD, HH:mm:ss')"
          :price="item.tradeMoney"
          :desc="'账号：' + item.toAccountId"
          :title="'姓名：' + item.identityName"
      />
      <template #right>
        <van-button
            square
            type="danger"
            text="删除"
            class="delete-button"
            @click = "deletePayee(item.payeeId)"
        />
      </template>
    </van-swipe-cell>
    <van-pagination v-model="page" :total-items="total" @change="pageTradeInfo"  :items-per-page="size" />
  </div>
</template>

<style scoped>
  .delete-button {
    height: 100%;
  }
  .select-button {
    height: 100%;
  }
</style>