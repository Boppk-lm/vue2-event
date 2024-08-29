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
          <el-select v-model="listform.state" placeholder="请选择发布状态" size="small">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <!-- 操作 -->
        <el-form-item>
          <el-button type="primary" @click="onSubmit" size="small">筛 选</el-button>
          <el-button type="info" @click="onSubmit" size="small">重 置</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="bth-pub" size="small" @click="showdialog">发表文章</el-button>
        </el-form-item>
      </el-form>
      <!-- 对话框 -->
      <el-dialog title="发表文章" :visible.sync="dialogVisible" fullscreen :before-close="handleClose">
        <el-form :model="pubForm" :rules="rules" ref="pubref" label-width="100px" class="demo-ruleForm">
          <el-form-item label="文章标题" prop="title">
            <el-input v-model="pubForm.title"></el-input>
          </el-form-item>
          <el-form-item label="文章分类" prop="cate_id">
            <el-select v-model="pubForm.cate_id" placeholder="请选择活动区域" style="width: 100%;">
              <el-option v-for="item in cate_list" :label="item.cate_name" value="item.id" :key="item.id"></el-option>
            </el-select>
          </el-form-item>
          <!-- 富文本 -->
          <el-form-item label="文章内容" prop="content">
              <quill-editor v-model="pubForm.content"></quill-editor>
          </el-form-item>
          <!-- 文章封面 -->
          <el-form-item label="文章封面" prop="cover">
            <img src="../../assets/images/cover.jpg" alt="" ref="imgref">
            <br>
            <input type="file" style="display: none;" accept="image/*" @change="changecover" ref="fileref">
            <el-button type="text" @click="coverFn">+ 选择封面</el-button>
          </el-form-item>
          <!-- 发布或暂存 -->
          <el-form-item>
          <el-button type="primary"  size="small" @click="pubFn('已发布')">发布</el-button>
          <el-button type="info"  size="small" @click="pubFn('草稿')">暂存</el-button>
        </el-form-item>
        </el-form>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
import { getarticle } from '@/api/article'
import imgObj from '@/assets/images/cover.jpg'
export default {
  name: 'art-list',
  data () {
    return {
      listform: {
        cate_id: '', // 文章分类
        state: '' // 文章标题

      },
      // 控制对话框的弹出
      dialogVisible: false,
      // 添加文章的表单数据
      pubForm: {
        title: '', // 标题
        cate_id: '', // 类别
        cover_img: null, // 封面
        content: '', // 文章内容
        state: '' // 状态
      },
      // 表单验证
      rules: {
        title: [
          { required: true, message: '请输入文章标题', trgger: 'blur' },
          { min: 1, max: 30, message: '文章标题长度为1-30个字符', trgger: 'blur' }
        ],
        cate_id: [
          { required: true, message: '请选择文章分类', trgger: 'blur' }
        ],
        content: [
          { required: true, message: '请输入文章内容', trgger: 'blur' }
        ],
        cover: [
          { required: true, message: '请选择封面', trgger: 'blur' }
        ]
      },
      cate_list: []
    }
  },
  methods: {
    onSubmit () {
    },
    // 对话框关闭前的回调
    handleClose (done) {
      // 确认框
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
        this.dialogVisible = false
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    // 显示对话框
    showdialog () {
      this.dialogVisible = true
    },
    // 获取文章分类
    async initcatelist () {
      const { data: res } = await getarticle()
      this.cate_list = res.data
    },
    // 选择封面 点击按钮模拟点击事件
    coverFn () {
      this.$refs.fileref.click()
    },
    // 保存选择图片的地址
    changecover (e) {
      const files = e.target.files
      // 不选中
      if (files.length === 0) {
        this.pubForm.cover_img = null
        // 取消变回原来的图片
        this.$refs.imgref.setAttribute('src', imgObj)
      } else {
        // 选中
        this.pubForm.cover_img = files[0]
        const url = URL.createObjectURL(files[0])
        this.$refs.imgref.setAttribute('src', url)
      }
    },
    // 选择状态 发布/暂存
    pubFn (state) {
      this.pubForm.state = state
      // 兜底校验
      this.$refs.pubref.validate(async valid => {
        if (valid) {
          console.log(11)
        } else {
          return false // 阻止默认提交行为
        }
      })
    }
  },
  created () {
    this.initcatelist()
  }
}
</script>
<style lang="less" scoped>
.box-card {
  .bth-pub {
    margin-left: 750px;
  }
  ::v-deep .ql-editor {
    min-height: 300px;
  }
}
</style>
