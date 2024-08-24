<template>
    <el-container style="height: 100%">
        <!-- 头部 -->
        <el-header>
            <!-- logo -->
            <img src="../../assets/images/logo.png" alt="">
            <el-menu  class="el-menu-demo" mode="horizontal"
                background-color="#1f232a" text-color="#fff" active-text-color="#1f232a">
                <el-submenu index="1">
                    <template slot="title">
                        <img src="../../assets/images/avatar.jpg"  class="avatar" alt="">
                       个人中心</template>
                    <el-menu-item index="1-1"><i class="el-icon-tickets"></i>基本资料</el-menu-item>
                    <el-menu-item index="1-2"><i class="el-icon-picture-outline-round"></i>更换头像</el-menu-item>
                    <el-menu-item index="1-3"><i class="el-icon-refresh-right"></i>重置密码</el-menu-item>
                </el-submenu>
                <el-menu-item index="2" ><i class="el-icon-switch-button"></i>退出</el-menu-item>
            </el-menu>
        </el-header>
        <!-- 侧边栏 -->
        <el-container>
            <el-aside width="200px">Aside</el-aside>
            <el-container>
                <!-- 主体 -->
                <el-main>Main</el-main>
                <!-- 底部 -->
                <el-footer><i class="el-icon-trophy"></i>www.3294578041@qq.com - lvdameng</el-footer>
            </el-container>
        </el-container>
    </el-container>
</template>
<script>
export default {
  name: 'my-layout'
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
    text-align: center;
    line-height: 200px;
}

.el-main {
    background-color: #fff;
    color: #333;
    line-height: 160px;
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
</style>
