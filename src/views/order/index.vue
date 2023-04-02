<template>
  <div class="container">
    <div class="banner">
      <el-form ref="form" :model="searchForm" label-width="80px">
        <el-form-item label="订单编号">
          <el-input v-model="searchForm.orderId"></el-input>
        </el-form-item>
        <el-form-item label="订单状态">
          <el-select v-model="searchForm.orderStatus" placeholder="请选择">
            <el-option
              v-for="item in statusOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="日期">
          <el-date-picker
            v-model="dateValue"
            type="daterange"
            value-format="yyyy-MM-dd HH:mm:ss"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          >
          </el-date-picker>
        </el-form-item>
      </el-form>
      <div class="btn-group">
        <el-button @click="reset">重置</el-button>
        <el-button type="primary" @click="getOrderList">搜索</el-button>
      </div>
    </div>
    <div class="data-area">
      <el-card>
        <el-table :data="orderList" border style="width: 100%">
          <el-table-column type="index" label="编号" width="100">
          </el-table-column>
          <el-table-column prop="orderId" label="订单编号"> </el-table-column>
          <el-table-column prop="totalPrice" label="订单总价">
          </el-table-column>
          <el-table-column prop="orderStatusStr" label="订单状态">
          </el-table-column>
          <el-table-column prop="creatTime" label="下单时间"> </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button @click="toDetailPage(scope.row.orderId)"
                >查看详情</el-button
              >
              <el-button
                type="danger"
                @click="deleteOrder(scope.row.orderId)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </div>
    <div class="page-area">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="searchForm.pageNum"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="searchForm.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import orderApi from '@/api/order'
export default {
  data() {
    return {
      searchForm: {
        pageNum: 1,
        pageSize: 10,
      },
      statusOptions: [
        { label: '待支付', value: 1 },
        { label: '待发货', value: 2 },
        { label: '待收货', value: 3 },
        { label: '已完成', value: 4 },
        { label: '已取消', value: 5 },
      ],
      dateValue: [],
      orderList: [],
      total: 0,
    }
  },
  created() {
    this.getOrderList()
  },
  methods: {
    getOrderList() {
      if (this.dateValue.length > 0) {
        this.searchForm.beginTime = this.dateValue[0]
        this.searchForm.endTime = this.dateValue[1]
      }
      orderApi.getOrderList(this.searchForm).then((res) => {
        this.orderList = res.data.list
        this.total = res.data.total
      })
    },
    reset() {
      this.searchForm = {
        pageNum: 1,
        pageSize: 10,
      }
      this.dateValue = []
      this.getOrderList()
    },
    toDetailPage(id) {
      this.$router.push({
        path: '/orderDetail',
        query: {
          id: id,
        },
      })
    },
    handleSizeChange(val) {
      this.searchForm.pageSize = val
      this.getOrderList()
    },
    handleCurrentChange(val) {
      this.searchForm.pageNum = val
      this.getOrderList()
    },
    deleteOrder(id) {
      this.$confirm('确定删除该订单吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          orderApi.deleteOrder(id).then((res) => {
            this.$message.success(res.msg)
            this.getOrderList()
          })
        })
        .catch(() => {})
    },
    cancelOrder(id) {
      this.$confirm('确定取消该订单吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          orderApi.cancelOrder(id).then((res) => {
            this.$message.success(res.msg)
            this.getOrderList()
          })
        })
        .catch(() => {})
    },
  },
}
</script>

<style lang="less" scoped>
.container {
  .banner {
    padding: 20px;
    margin-bottom: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #fff;
    .el-form {
      display: flex;
      .el-form-item {
        margin-right: 20px;
      }
    }
  }
  .page-area {
    margin-top: 20px;
    display: flex;
    justify-content: flex-end;
  }
}
</style>