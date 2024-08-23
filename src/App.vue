<template>
    <!-- 路由出口 -->
    <router-view></router-view>
</template>
<script>
import { reguser } from '@/api/reg'
export default {
  async created () {
    const res = await reguser({
      username: '11111',
      password: 124578963,
      repassword: 124578963
    })
    console.log(res)
  }
}
</script>
<style lang="less" scoped></style>
