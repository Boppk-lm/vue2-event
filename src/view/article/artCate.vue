<template>
    <!-- 文章分类 -->
    <div>
        <el-card class="box-card">
            <div slot="header" class="clearfix header-box">
                <span>文章分类</span>
                <el-button style="float: right" type="primary" size="mini" @click="addArtFn">添加分类</el-button>
            </div>
            <!-- 文章列表 -->
            <el-table :data="artlist" style="width: 100%">
                <el-table-column type="index" label="序号" width="180">
                </el-table-column>
                <el-table-column prop="cate_name" label="分类名称">
                </el-table-column>
                <el-table-column prop="cate_alias" label="分类别名">
                </el-table-column>
                <el-table-column label="操作">
                    <template v-slot="scope">
                      <!--  获取这一行数据 -->
                      <el-button type="primary" size="mini" @click="updateArt(scope.row)">修改</el-button>
                      <el-button type="danger" size="mini" @click="delArt(scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 添加文章 -->
            <el-dialog title="文章分类" :visible.sync="dialogVisible" width="30%" @close="dialogCloseFn">
                <!-- 文章信息 -->
                <el-form ref="addref" :model="addform" :rules="rules" label-width="80px">
                    <el-form-item prop="cate_name" label="分类名称" >
                        <el-input v-model="addform.cate_name"></el-input>
                    </el-form-item>
                    <el-form-item prop="cate_alias" label="分类别名" >
                        <el-input v-model="addform.cate_alias"></el-input>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="cancelFn">取 消</el-button>
                    <el-button type="primary" @click="confirmFn">确 定</el-button>
                </span>
            </el-dialog>
        </el-card>
    </div>
</template>

<script>
import { addarticle, deletearticle, getarticle, updatearticle } from '@/api/article'

export default {
  name: 'art-cate',
  data () {
    return {
      artlist: [],
      dialogVisible: false,
      addform: {
        cate_name: '', // 分类名称
        cate_alias: '' // 分类别名
      },
      rules: {
        // 分类名称验证
        cate_name: [
          { required: true, message: '请输入分类名称', trigger: 'blur' },
          { pattern: /^\S{1,10}$/, message: '分类名称必须是1-10的非空字符串', trigger: 'blur' }
        ],
        // 分类别名验证
        cate_alias: [
          { required: true, message: '请输入分类别名', trigger: 'blur' },
          { pattern: /^[a-zA-Z0-9]{1,15}$/, message: '分类别名必须是1-15位的字母数字', trigger: 'blur' }
        ]
      },
      isEdit: false, // true为编辑 false为新增
      editId: '' // 要编辑文章的id值
    }
  },
  created () {
    this.getartlist()
  },
  methods: {
    // 获取文章数据
    async getartlist () {
      const res = await getarticle()
      this.artlist = res.data.data
    },
    // 新增文章数据弹出对话框
    addArtFn () {
      this.isEdit = false // 变为新增
      this.editId = ''
      this.dialogVisible = true
    },
    // 确认新增或编辑
    confirmFn () {
      this.dialogVisible = false
      // 兜底验证
      this.$refs.addref.validate(async valid => {
        if (valid) {
        // 通过验证
        // 进行判断 是编辑还是新增
          if (this.isEdit) {
          // 编辑
            const id = this.editId
            this.addform.id = id
            const { data: res } = await updatearticle(this.addform)
            if (res.code !== 0) return this.$message.error(res.message)
            this.$message.success(res.message)
          } else {
          // 新增
            const { data: res } = await addarticle(this.addform)
            if (res.code !== 0) return this.$message.error(res.message)
            this.$message.success(res.message)
          }
          // 重新获取文章数据
          this.getartlist()
        } else {
          return false
        }
      })
    },
    // 取消新增
    cancelFn () {
      this.dialogVisible = false
    },
    // 取消对话框时的回调
    dialogCloseFn () {
      this.$refs.addref.resetFields()
      this.addform.cate_alias = ''
      this.addform.cate_name = ''
    },
    // 修改文章
    updateArt (obj) {
      this.dialogVisible = true
      this.isEdit = true // 变为编辑
      this.editId = obj.id
      // 数据回显
      this.addform.cate_name = obj.cate_name
      this.addform.cate_alias = obj.cate_alias
    },
    // 删除文章
    async delArt (obj) {
      this.editId = obj.id
      const { data: res } = await deletearticle(this.editId)
      // 确认弹框
      this.$confirm('此操作将永久删除该文章, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 确认删除
        if (res.code === 0) {
          this.$message({
            type: 'success',
            message: res.message
          })
          // 重新获取文章
          this.getartlist()
        } else {
          this.$message({
            type: 'error',
            message: res.message
          })
        }
      }).catch(() => {
        // 取消删除
      })
    }
  }
}
</script>

<style lang="less" scoped>
.clearfix:before,
.clearfix:after {
    display: table;
    content: "";
}

.clearfix:after {
    clear: both
}

.box-card {
    width: 100%;
}
</style>
