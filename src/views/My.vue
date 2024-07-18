<script setup>
import TabBar from "@/components/TabBar.vue";
import { useUserInfoStore } from "@/stores/userInfo";
import { ref, onMounted } from 'vue';
import axios from 'axios';
const store = useUserInfoStore()
const activeRemaining = ref(0);
const deadRemaining = ref(0);

onMounted(() => {
    console.log("查询个人主要信息");
    getPersonalInfo();
})



function getPersonalInfo() {
    axios.get ('http://localhost:8080/my/account/info?accountId=' + store.user.accountId).then(function (response) {
        // 处理成功情况
        console.log(response.data);
        if(response.data.code==0){
            console.log("查询成功");
            console.log(response.data.data);
            activeRemaining.value=response.data.data.activeRemaining;
            deadRemaining.value=response.data.data.deadRemaining;
        }
    }).catch(function (error) {
        // 处理错误情况
        console.log(error);
    })
}

</script>

<template>
    <div> 
        <van-nav-bar class="van-bar" title="我的" />
        <van-card
        :price="'活期存款可用余额为：' + activeRemaining + ';定期存款可用余额为：' + deadRemaining"
        :desc="`当前账户是：`+store.user.accountId"
        :title="`姓名： `+store.user.identityName"
        thumb="https://fastly.jsdelivr.net/npm/@vant/assets/icon-demo.png" 
        />
    </div>
   <TabBar />
  
</template>
<style scoped>
</style>