<!-- 文章列表 -->
<template>
    <div>
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>文章列表</span>
            </div>
            <el-form :inline="true" :model="listform" class="demo-form-inline" style="width: 100%">
                <!-- 文章分类 -->
                <el-form-item label="文章分类">
                    <el-select v-model="listform.cate_id" placeholder="请选择分类" size="small">
                        <el-option label="区域一" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                </el-form-item>
                <!-- 发布状态 -->
                <el-form-item label="发布状态" style="margin-left: 15px;">
                    <el-select v-model="listform.state" placeholder="请选择发布状态" size="small" >
                        <el-option label="区域一" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                </el-form-item>
                <!-- 操作 -->
                <el-form-item>
                    <el-button type="primary" @click="onSubmit" size="small">筛 选</el-button>
                    <el-button type="info" @click="onSubmit" size="small">重 置</el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>

<script>
export default {
  name: 'art-list',
  data () {
    return {
      listform: {
        cate_id: '',
        state: ''
      }
    }
  },
  methods: {
    onSubmit () {
    }
  }
}
</script>

<style></style>
