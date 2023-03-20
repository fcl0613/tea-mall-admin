<template>
  <div class="container">
    <div class="user-list-area">
      <el-card>
        <div class="search-area">
          <div class="left">
            <el-input
              placeholder="请搜索输入内容"
              v-model="keyword"
              clearable
              @clear="getUserList"
            >
              <el-button
                slot="append"
                icon="el-icon-search"
                @click="getUserList"
              ></el-button>
            </el-input>
          </div>
          <div class="right">
            <el-button type="primary" @click="showAddDialog">添加</el-button>
          </div>
        </div>
        <div class="data-table">
          <el-table :data="userlist" border stripe style="width: 100%">
            <el-table-column label="编号" type="index" width="200">
            </el-table-column>
            <el-table-column prop="username" label="用户名" width="200">
            </el-table-column>
            <el-table-column prop="phone" label="电话" width="200">
            </el-table-column>
            <el-table-column
              prop="nickName"
              label="昵称"
              width="200"
            ></el-table-column>
            <el-table-column
              prop="idCard"
              label="身份证"
              width="300"
            ></el-table-column>
            <el-table-column label="性别" width="100">
              <template slot-scope="scope">
                <div v-if="scope.row.sex === 0">保密</div>
                <div v-if="scope.row.sex === 1">男</div>
                <div v-if="scope.row.sex === 2">女</div>
              </template>
            </el-table-column>
            <el-table-column label="角色" width="100">
              <template slot-scope="scope">
                <div v-if="scope.row.role === 0">普通用户</div>
                <div v-if="scope.row.role === 1">茶农</div>
              </template>
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button
                  type="primary"
                  icon="el-icon-edit"
                  @click="showEditDialog(scope.row)"
                ></el-button>
                <el-button
                  type="danger"
                  icon="el-icon-delete"
                  @click="removeUserOne(scope.row.id)"
                ></el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="page-area">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="pageNum"
            :page-sizes="[10, 20, 30, 40]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
          >
          </el-pagination>
        </div>
      </el-card>
    </div>

    <el-dialog
      :title="dialogTitle"
      :visible.sync="dialogVisible"
      width="30%"
      @close="resetUserDTO"
    >
      <el-form
        :model="userDTO"
        :rules="rules"
        ref="userDTORef"
        label-width="100px"
      >
        <el-form-item label="用户名称" prop="username">
          <el-input
            v-model="userDTO.username"
            :disabled="userDTO.id ? true : false"
          ></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="phone">
          <el-input v-model="userDTO.phone"></el-input>
        </el-form-item>
        <el-form-item label="身份证" prop="idCard">
          <el-input v-model="userDTO.idCard"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-radio v-model="userDTO.sex" :label="0">保密</el-radio>
          <el-radio v-model="userDTO.sex" :label="1">男</el-radio>
          <el-radio v-model="userDTO.sex" :label="2">女</el-radio>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="subForm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import userApi from '@/api/user'
export default {
  data() {
    const checkPhone = (rule, value, cb) => {
      const phoneReg = /^(?:(?:\+|00)86)?1[3-9]\d{9}$/
      if (phoneReg.test(value)) {
        return cb()
      }
      cb(new Error('请输入正确的手机号'))
    }

    const checkIdCard = (rule, value, cb) => {
      const idCardReg = /^\d{6}((((((19|20)\d{2})(0[13-9]|1[012])(0[1-9]|[12]\d|30))|(((19|20)\d{2})(0[13578]|1[02])31)|((19|20)\d{2})02(0[1-9]|1\d|2[0-8])|((((19|20)([13579][26]|[2468][048]|0[48]))|(2000))0229))\d{3})|((((\d{2})(0[13-9]|1[012])(0[1-9]|[12]\d|30))|((\d{2})(0[13578]|1[02])31)|((\d{2})02(0[1-9]|1\d|2[0-8]))|(([13579][26]|[2468][048]|0[048])0229))\d{2}))(\d|X|x)$/
      if (idCardReg.test(value)) {
        return cb()
      }
      cb(new Error('请输入正确的身份证'))
    }

    return {
      pageNum: 1,
      pageSize: 10,
      keyword: '',
      userlist: [],
      total: 0,
      userDTO: {
        sex:0
      },
      removeUserIdList: [],
      dialogVisible: false,
      dialogTitle: '添加',
      rules: {
        username: [
          { required: true, message: '请输入用户名称', trigger: 'blur' },
        ],
        phone: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { validator: checkPhone, trigger: 'blur' },
        ],
        idCard: [{ required: true, message: '请输入身份证', trigger: 'blur' },
        { validator: checkIdCard, trigger: 'blur' }],
      },
    }
  },
  created() {
    this.getUserList()
  },
  methods: {
    getUserList() {
      userApi.getList(this.pageNum, this.pageSize, this.keyword).then((res) => {
        this.userlist = res.data.list
        this.total = res.data.total
      })
    },
    handleSizeChange(val) {
      this.pageSize = val
      this.getUserList()
    },
    handleCurrentChange(val) {
      this.pageNum = val
      this.getUserList()
    },
    createUser() {
      userApi.create(this.userDTO).then((res) => {
        this.$message.success(res.msg)
        this.dialogVisible = !this.dialogVisible
        this.getUserList()
      })
    },
    updateUser() {
      userApi.update(this.userDTO).then((res) => {
        this.$message.success(res.msg)
        this.dialogVisible = !this.dialogVisible
        this.getUserList()
      })
    },
    getUserDetail(id) {
      console.log(id)
      userApi.getInfo(id).then((res) => {
        this.userDTO = res.data
      })
    },
    showAddDialog() {
      this.dialogVisible = !this.dialogVisible
      this.dialogTitle = '添加'
    },
    resetUserDTO() {
      this.$refs.userDTORef.resetFields()
      this.userDTO = {sex:0}
    },
    subForm() {
      this.$refs.userDTORef.validate((valid) => {
        if (!valid) return
        if (this.userDTO.id) {
          // 对象中存在id走用户更新逻辑
          this.updateUser()
        } else {
          // 走用户添加逻辑
          this.createUser()
        }
      })
    },
    showEditDialog(obj) {
      //   console.log(obj)
      this.getUserDetail(obj.id)
      this.dialogVisible = !this.dialogVisible
      this.dialogTitle = '修改'
    },
    removeUserOne(id) {
      this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        userApi.delete(id).then((res) => {
          this.$message.success(res.msg)
          this.removeUserIdList = []
          this.getUserList()
        })
      })
    },
  },
}
</script>

<style lang="less" scoped>
.container {
  .user-list-area {
    .search-area {
      display: flex;
      justify-content: space-between;
    }
    .data-table {
      margin-top: 20px;
    }
    .page-area {
      margin-top: 20px;
      margin-bottom: 10px;
      float: right;
    }
  }
}
</style>