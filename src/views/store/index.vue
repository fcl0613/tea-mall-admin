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
              @clear="getStoreList"
            >
              <el-button
                slot="append"
                icon="el-icon-search"
                @click="getStoreList"
              ></el-button>
            </el-input>
          </div>
        </div>
        <div class="data-table">
          <el-table :data="storeList" border stripe style="width: 100%">
            <el-table-column label="编号" type="index" width="200">
            </el-table-column>
            <el-table-column label="店铺名" prop="storeName"> </el-table-column>
            <el-table-column label="店铺联系人" prop="name"> </el-table-column>
            <el-table-column label="店铺联系人手机" prop="phone">
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
  </div>
</template>

<script>
import storeApi from '@/api/store'
export default {
  data() {
    return {
      pageNum: 1,
      pageSize: 10,
      keyword: '',
      storeList: [],
      total: 0,
    }
  },
  created() {
      this.getStoreList()
  },
  methods: {
    handleSizeChange(val) {
      this.pageSize = val
    },
    handleCurrentChange(val) {
      this.pageNum = val
    },
    getStoreList() {
        storeApi.getStoreList(this.pageNum, this.pageSize, this.keyword).then((res) => {
            this.storeList = res.data.list
            this.total = res.data.total
        })
    }
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