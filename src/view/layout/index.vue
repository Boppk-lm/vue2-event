<template>
  <el-container style="height: 100%">
    <!-- 头部 -->
    <el-header>
      <!-- logo -->
      <img src="../../assets/images/logo.png" alt="">
      <el-menu class="el-menu-demo" mode="horizontal" background-color="#1f232a" text-color="#fff"
        active-text-color="#3f9cd6">
        <el-submenu index="1">
          <template slot="title">
            <img src="../../assets/images/avatar.jpg" class="avatar" alt="">
            个人中心</template>
          <el-menu-item index="1-1"><i class="el-icon-tickets"></i>基本资料</el-menu-item>
          <el-menu-item index="1-2"><i class="el-icon-picture-outline-round"></i>更换头像</el-menu-item>
          <el-menu-item index="1-3"><i class="el-icon-refresh-right"></i>重置密码</el-menu-item>
        </el-submenu>
        <el-menu-item index="2" @click="quit"><i class="el-icon-switch-button"></i>退出</el-menu-item>
      </el-menu>
    </el-header>
    <!-- 侧边栏 -->
    <el-container>
      <el-aside width="200px">
        <!-- 用户信息 -->
        <div class="user-box">
          <img :src="user_pic" alt="" v-if="user_pic">
          <img src="../../assets/images/logo.png" alt="" v-else>
          <span>欢迎<span>{{ nickname || username }}</span></span>
        </div>
        <!-- 侧边栏 -->
          <el-menu :default-active="$route.path" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose"
          background-color="#1b1e25" text-color="#fff" active-text-color="#2b81d4" router>
          <template v-for="item in menus">
          <el-menu-item :index="item.indexPath" v-if="!item.children" :key="item.indexPath">
            <i :class="item.icon"></i>
            <span slot="title">{{ item.title }}</span>
          </el-menu-item>
          <el-submenu :index="item.indexPath" v-else :key="item.indexPath">
            <template slot="title">
              <i :class="item.icon"></i>
              <span>{{ item.title }}</span>
            </template>
              <el-menu-item v-for="obj in item.children" :index="obj.indexPath" :key="obj.indexPath"><i :class="obj.icon"></i>{{ obj.title }}</el-menu-item>
          </el-submenu>
        </template>
        </el-menu>
      </el-aside>
      <el-container>
        <!-- 主体 -->
        <el-main>
          <!-- 二级路由出口 -->
          <router-view></router-view>
        </el-main>
        <!-- 底部 -->
        <el-footer><i class="el-icon-trophy"></i>www.3294578041@qq.com - lvdameng</el-footer>
      </el-container>
    </el-container>
  </el-container>
</template>
<script>
import { getMenus } from '@/api/user'
import { removeToken } from '@/utils/storage'
import { mapGetters } from 'vuex'
export default {
  name: 'my-layout',
  data () {
    return {
      menus: []
    }
  },
  methods: {
    // 退出登录
    quit () {
      // 提示框
      this.$confirm('这就走了, 你确定要离开我吗?', '大事件管理系统', {
        confirmButtonText: '我走了',
        cancelButtonText: '不会的',
        type: 'warning'
      }).then(() => {
        // 退出成功
        this.$message({
          type: 'info',
          message: '再见--'
        })
        // 删除本地和vuex的token 跳转到登录页面
        removeToken()
        this.$store.commit('updateToken', '')
        this.$router.push('/login')
        // 删除用户信息
        this.$store.commit('updateuser', {})
      }).catch(() => {
        // 退出失败
        this.$message({
          type: 'success',
          message: '我就知道~'
        })
      })
    },
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    },
    // 保存侧边栏数据
    async getMenus () {
      const { data: { data: res } } = await getMenus()
      this.menus = res
    }
  },
  created () {
    // 获取侧边栏数据
    this.getMenus()
  },
  computed: {
    ...mapGetters(['username', 'nickname', 'user_pic', 'id'])
  }
}
</script>

<style lang="less" scoped>
.el-header {
  float: left;
  color: #fff;
  background-color: #1f232a;
  line-height: 60px;
}

.el-header .el-menu-demo {
  width: 15%;
  float: right;

  .avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-right: 10px;
  }
}

.el-footer {
  background-color: #ededed;
  color: #333;
  text-align: center;
  line-height: 60px;

  .el-icon-trophy {
    margin-right: 10px;
  }
}

.el-aside {
  background-color: #1f232a;
  color: #333;
}

.el-main {
  background-color: #f2f2f2;
  color: #333;
}

body>.el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}

.user-box {
  height: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #000;
  user-select: none;
  box-sizing: border-box;
  img {
    width: 35px;
    height: 35px;
    border-radius: 50%;
    background-color: #fff;
    object-fit: cover;
    margin-right: 10px;
  }

  span {
    margin-left: 5px;
    color: #fff;
    font-size: 12px;
  }
}
</style>
