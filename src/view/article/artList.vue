<!-- 文章列表 -->
<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>文章列表</span>
      </div>
      <!-- 搜索 -->
      <el-form :inline="true" :model="listform" class="demo-form-inline" style="width: 100%">
        <!-- 文章分类 -->
        <el-form-item label="文章分类">
          <el-select v-model="listform.cate_id" placeholder="请选择分类" size="small">
            <el-option v-for="obj in cate_list" :key="obj.id" :label="obj.cate_name" :value="obj.id"></el-option>
          </el-select>
        </el-form-item>
        <!-- 发布状态 -->
        <el-form-item label="发布状态" style="margin-left: 15px;">
          <el-select v-model="listform.state" placeholder="请选择发布状态" size="small">
            <el-option label="已发布" value="已发布"></el-option>
            <el-option label="草稿" value="草稿"></el-option>
          </el-select>
        </el-form-item>
        <!-- 操作 -->
        <el-form-item>
          <el-button type="primary" @click="choseFn" size="small">筛 选</el-button>
          <el-button type="info" @click="resetFn" size="small">重 置</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="bth-pub" size="small" @click="showdialog">发表文章</el-button>
        </el-form-item>
      </el-form>
      <!-- 列表 -->
      <el-table :data="article_list" style="width: 100%">
        <el-table-column label="文章标题" prop="title">
          <!-- 作用域插槽 -->
          <template v-slot="scope">
            <el-link type="primary" @click="showDetailFn(scope.row.id)">{{ scope.row.title }}</el-link>
          </template>
        </el-table-column>
        <el-table-column prop="cate_name" label="分类">
        </el-table-column>
        <el-table-column prop="pub_date" label="发表时间">
          <!-- 作用域插槽 -->
          <template v-slot="scope">
            <span>{{ $formatDate(scope.row.pub_date) }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="state" label="状态">
        </el-table-column>
        <el-table-column label="操作">
          <template v-slot="{ row }">
          <el-button type="danger" size="mini" @click="removefn(row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
        :current-page.sync="listform.pagenum" :page-sizes="[2, 3, 5, 10]" :page-size.sync="listform.pagesize"
        layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
      <!-- 发布文章对话框 -->
      <el-dialog title="发表文章" :visible.sync="dialogVisible" fullscreen :before-close="handleClose" @close="closedialog">
        <el-form :model="pubForm" :rules="rules" ref="pubref" label-width="100px" class="demo-ruleForm">
          <el-form-item label="文章标题" prop="title">
            <el-input v-model="pubForm.title"></el-input>
          </el-form-item>
          <el-form-item label="文章分类" prop="cate_id">
            <el-select v-model="pubForm.cate_id" placeholder="请选择活动区域" style="width: 100%;">
              <el-option v-for="item in cate_list" :label="item.cate_name" :value="item.id" :key="item.id"></el-option>
            </el-select>
          </el-form-item>
          <!-- 富文本 -->
          <el-form-item label="文章内容" prop="content">
            <quill-editor v-model="pubForm.content" @blur="changeeditor"></quill-editor>
          </el-form-item>
          <!-- 文章封面 -->
          <el-form-item label="文章封面" prop="cover_img">
            <img src="../../assets/images/cover.jpg" alt="" ref="imgref">
            <br>
            <input type="file" style="display: none;" accept="image/*" @change="changecover" ref="fileref">
            <el-button type="text" @click="coverFn">+ 选择封面</el-button>
          </el-form-item>
          <!-- 发布或暂存 -->
          <el-form-item>
            <el-button type="primary" size="small" @click="pubFn('已发布')">发布</el-button>
            <el-button type="info" size="small" @click="pubFn('草稿')">暂存</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
      <!-- 文章详情对话框 -->
      <el-dialog title="文章预览" :visible.sync="detailVisible" width="80%" >
        <h1 class="title">{{detaillist.title}}</h1>
        <div class="info">
          <span>作者：{{detaillist.nickname || detaillist.username}}</span>
          <span>发布时间：{{ $formatDate(detaillist.pub_date) }}</span>
          <span>所属分类：{{ detaillist.cate_name }}</span>
          <span>状态：{{ detaillist.state }}</span>
        </div>
        <!-- 分割线 -->
        <el-divider></el-divider>
        <!-- 文章封面  -->
         <img  :src="baseURL+detaillist.cover_img" alt="">
         <!-- 文章内容 -->
          <div v-html="detaillist.content" class="detail-box"></div>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
import { getartdetail, getarticle, getarticlelist, removeartdetail, uploadarticle } from '@/api/article'
import imgObj from '@/assets/images/cover.jpg'
import { baseURL } from '@/utils/request'
export default {
  name: 'art-list',
  data () {
    return {
      listform: {
        cate_id: '', // 文章分类
        state: '', // 文章标题
        pagenum: 1, // 当前页码数
        pagesize: 2// 当前页面需要的数据条数
      },
      // 控制对话框的弹出
      dialogVisible: false,
      // 添加文章的表单数据
      pubForm: {
        title: '', // 标题
        cate_id: '', // 类别
        cover_img: '', // 封面
        content: '', // 文章内容
        state: '' // 状态
      },
      // 表单验证
      rules: {
        title: [
          { required: true, message: '请输入文章标题', trigger: 'blur' },
          { min: 1, max: 30, message: '文章标题长度为1-30个字符', trigger: 'blur' }
        ],
        cate_id: [
          { required: true, message: '请选择文章标题', trigger: 'change' }
        ],
        content: [
          { required: true, message: '请输入文章内容', trigger: 'change' }
        ],
        cover_img: [
          { required: true, message: '请选择封面', trigger: 'blur' }
        ]
      },
      // 分类
      cate_list: [],
      // 文章列表
      article_list: [],
      total: 0, // 列表数据总条数
      // 文章详情
      detailVisible: false,
      detaillist: {},
      // 基地址封装
      baseURL: baseURL
    }
  },
  methods: {
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
      // 单独验证封面
      this.$refs.pubref.validateField('cover_img')
    },
    // 选择状态 发布/暂存
    pubFn (state) {
      this.pubForm.state = state
      // 兜底校验
      this.$refs.pubref.validate(async valid => {
        if (valid) {
          // 传给后台
          const fd = new FormData()
          fd.append('title', this.pubForm.title)
          fd.append('cate_id', this.pubForm.cate_id)
          fd.append('cover_img', this.pubForm.cover_img)
          fd.append('content', this.pubForm.content)
          fd.append('state', this.pubForm.state)
          const { data: res } = await uploadarticle(fd)
          if (res.code !== 0) return this.$message.error(res.message)
          this.$message.success(res.message)
          // 关闭对话框
          this.dialogVisible = false
          // 刷新文章列表
          this.getarticlelist()
        } else {
          return false // 阻止默认提交行为
        }
      })
    },
    // 单独验证富文本
    changeeditor () {
      this.$refs.pubref.validateField('content')
    },
    // 关闭对话框时清除内容
    closedialog () {
      this.$refs.pubref.resetFields()
      // 手动还原图片
      this.$refs.imgref.setAttribute('src', imgObj)
    },
    // 获取文章列表
    async getarticlelist () {
      const { data: res } = await getarticlelist(this.listform)
      this.article_list = res.data
      this.total = res.total
    },
    // 切换显示几条数据的回调
    handleSizeChange (sizes) {
      // this.listform.pagesize = sizes
      this.listform.pagenum = 1
      this.getarticlelist()
    },
    // 切换显示几页数据的回调
    handleCurrentChange (nowPage) {
      // this.listform.pagenum = nowPage
      this.getarticlelist()
    },
    // 筛选
    choseFn () {
      this.listform.pagenum = 1
      this.listform.pagesize = 2
      this.getarticlelist()
    },
    // 重置
    resetFn () {
      this.listform.pagenum = 1
      this.listform.pagesize = 2
      this.listform.cate_id = ''
      this.listform.state = ''
      this.getarticlelist()
    },
    // 点击获取文章详情
    async showDetailFn (id) {
      const { data: res } = await getartdetail(id)
      this.detailVisible = true
      this.detaillist = res.data
      // 转换图片格式s
      console.log(this.detaillist)
    },
    // 删除文章
    async removefn (id) {
      const { data: res } = await removeartdetail(id)
      if (res.code !== 0) return this.$message.error('删除失败')
      this.$message.success(res.message)
      // 解决页面单条数据删除bug
      if (this.article_list.length === 1) {
        if (this.listform.pagenum > 1) {
          this.listform.pagenum--
        }
      }
      this.getarticlelist()
    }
  },
  created () {
    // 获取文章分类
    this.initcatelist()
    // 获取文章列表
    this.getarticlelist()
  }
}
</script>
<style lang="less" scoped>
.box-card {
  .bth-pub {
    margin-left: 750px;
  }
// 样式穿透
  ::v-deep .ql-editor {
    min-height: 300px;
  }
  .info span:nth-of-type(n+2) {
    margin-left: 5px;
  }
}
</style>
