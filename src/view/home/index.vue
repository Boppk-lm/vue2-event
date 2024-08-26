<template>
    <div>
        <!-- 头部 -->
        <div class="container-head">
            <el-row :gutter="10">
                <el-col :sm="6" :xs="12">
                    <div class="spannel">
                        <em>10015</em><span>篇</span>
                    <b>总文章数</b>
                    </div>
                </el-col>
                <el-col :sm="6" :xs="12">
                    <div class="spannel color1">
                        <em>123</em><span>篇</span>
                    <b>日新增文章数</b>
                    </div>
                </el-col>
                <el-col :sm="6" :xs="12">
                    <div class="spannel color2">
                        <em>35</em><span>条</span>
                    <b>评论总数</b>
                    </div>
                </el-col>
                <el-col :sm="6" :xs="12">
                    <div class="spannel color3">
                        <em>123</em><span>条</span>
                    <b>日新增评论数</b>
                    </div>
                </el-col>
            </el-row>
        </div>
        <!-- 主体 -->
         <div class="container-main">
            <el-row :gutter="10">
                <el-col :sm="16" :xs="16">
                    <div class="gragh_pannel">
                        11
                    </div>
                </el-col>
                <el-col :sm="8" :xs="8">
                    <div class="gragh_pannel">
                        11
                    </div>
                </el-col>
            </el-row>
         </div>
         <!-- 底部 -->
          <div class="container-foot">
            <div class="column_pannel"></div>
          </div>
    </div>
</template>

<script>
export default {
  name: 'my-home'
}
</script>

<style lang="less" scoped>
.el-row {
    margin-bottom: 20px;
    &:last-child {
        margin-bottom: 0;
    }
}

.el-col {
    border-radius: 4px;
}

.row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
}
.container-head {
    line-height: 90px;
    .spannel {
    text-align: center;
    background-color: #ffffff;
    color: #7fa3ee;
    em {
        font-style: normal;
        font-size: 46px;
        font-weight: 500;
    }
    span {
        margin: 7px;
    }
    b {
        line-height: 25px;
        display: block;
        background-color: #e5e5e5;
        color: #000;
        font-weight: normal;
    }
}
.color1 {
        color: #66bbd9;
    }
    .color2 {
        color: #58cbde;
    }
    .color3 {
        color: #53c291;
    }
}
.container-main {
    margin-top: 20px;
    line-height: 500px;
    .gragh_pannel{
        background-color: #fff;
    }
}
.container-foot {
    .column_pannel{
        margin-top: 20px;
        height: 105px;
        background-color: #fff;
    }
}
</style>
