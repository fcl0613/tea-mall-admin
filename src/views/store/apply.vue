<template>
  <div class="container">
    <div class="header">
      <div class="form-area">
        <el-form :model="searchDTO" label-width="90px">
          <el-form-item label="申请人姓名">
            <el-input v-model="searchDTO.name"></el-input>
          </el-form-item>
          <el-form-item label="手机号">
            <el-input v-model="searchDTO.phone"></el-input>
          </el-form-item>
          <el-form-item label="店铺名">
            <el-input v-model="searchDTO.storeName"></el-input>
          </el-form-item>
          <el-form-item label="处理状态">
            <el-select v-model="searchDTO.status" placeholder="请选择">
              <el-option label="未处理" :value="0"></el-option>
              <el-option label="同意" :value="1"></el-option>
              <el-option label="拒绝" :value="2"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <div class="btn-area">
        <el-button @click="reset">重置</el-button>
        <el-button type="primary" @click="getList">搜索</el-button>
      </div>
    </div>
    <div class="table-area">
      <el-card>
        <el-table :data="applyList" border style="width: 100%">
          <el-table-column type="index" label="编号" width="50">
          </el-table-column>
          <el-table-column prop="name" label="申请人姓名" width="180">
          </el-table-column>
          <el-table-column prop="phone" label="申请人电话" width="180">
          </el-table-column>
          <el-table-column prop="storeName" label="店铺名字"> </el-table-column>
          <el-table-column prop="createTime" label="提交时间">
          </el-table-column>
          <el-table-column prop="status" label="申请状态">
            <template slot-scope="scope">
              <div v-if="scope.row.status === 0">待处理</div>
              <div v-if="scope.row.status === 1">已通过</div>
              <div v-if="scope.row.status === 2">未通过</div>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <div v-if="scope.row.status !== 0">已处理</div>
              <div v-if="scope.row.status === 0">
                <el-button
                  type="primary"
                  size="small"
                  @click="agreeApply(scope.row.id)"
                  >同意</el-button
                >
                <el-button
                  type="danger"
                  size="small"
                  @click="refuseApply(scope.row.id)"
                  >拒绝</el-button
                >
              </div>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </div>
    <div class="page-area">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="searchDTO.pageNum"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="searchDTO.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </div>

    <el-dialog title="拒绝原因" :visible.sync="dialogFormVisible" width="30%">
      <el-form :model="refuseForm" label-width="80px">
        <el-form-item label="拒绝原因">
          <el-input v-model="refuseForm.note" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="subApply"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import applyApi from '@/api/store/apply'
export default {
  data() {
    return {
      searchDTO: {
        pageNum: 1,
        pageSize: 10,
      },
      applyList: [],
      total: 0,
      dialogFormVisible: false,
      refuseForm: {}
    }
  },
  created() {
    this.getList()
  },
  methods: {
    handleSizeChange(val) {
      this.searchDTO.pageSize = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.searchDTO.pageNum = val
      this.getList()
    },
    getList() {
      applyApi.getList(this.searchDTO).then((res) => {
        this.applyList = res.data.list
        this.total = res.data.total
      })
    },
    reset() {
      this.searchDTO = {
        pageNum: 1,
        pageSize: 10,
      }
      this.getList()
    },
    agreeApply(id) {
      this.$confirm('确定同意该申请吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        applyApi.agree(id).then((res) => {
          this.$message.success(res.msg)
          this.getList()
        })
      })
    },
    refuseApply(id) {
      this.refuseForm.id = id
      this.dialogFormVisible = !this.dialogFormVisible
    },
    cancel() {
      this.refuseForm = {}
      this.dialogFormVisible = !this.dialogFormVisible
    },
    subApply() {
      applyApi.refuse(this.refuseForm).then((res) => {
        this.$message.success(res.msg)
        this.dialogFormVisible = !this.dialogFormVisible
        this.getList()
      })
    }
  },
}
</script>

<style lang="less" scoped>
.container {
  .header {
    width: 100%;
    display: flex;
    justify-content: space-between;
    border: 1px solid rgb(189, 189, 189);
    padding-top: 20px;
    background-color: #fff;
    margin-bottom: 30px;
    .form-area {
      .el-form {
        display: flex;
        margin-left: 20px;
      }
    }
    .btn-area {
      margin-right: 20px;
    }
  }
  .page-area {
    margin-top: 10px;
    float: right;
  }
}
</style>