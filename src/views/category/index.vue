<template>
  <div class="container">
    <div class="category-list-area">
      <el-card>
        <div class="search-area">
          <div class="left">
            <el-input
              placeholder="请搜索输入内容"
              v-model="keyword"
              clearable
              @clear="getCategoryList"
            >
              <el-button
                slot="append"
                icon="el-icon-search"
                @click="getCategoryList"
              ></el-button>
            </el-input>
          </div>
          <div class="right">
            <el-button type="primary" @click="showAddDialog">添加</el-button>
          </div>
        </div>
        <div class="data-table">
          <el-table :data="categoryList" border stripe style="width: 100%">
            <el-table-column label="编号" type="index" width="200">
            </el-table-column>
            <el-table-column prop="categoryName" label="分类名" width="500">
            </el-table-column>
            <el-table-column label="分类等级" width="500">
              <template slot-scope="scope">
                <div v-if="scope.row.parentId === 0">一级分类</div>
                <div v-if="scope.row.parentId !== 0">二级分类</div>
              </template>
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button
                  type="primary"
                  icon="el-icon-edit"
                  @click="showEditDialog(scope.row.id)"
                ></el-button>
                <el-button
                  type="danger"
                  icon="el-icon-delete"
                  @click="removeCategoryOne(scope.row.id)"
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
      :title="title"
      :visible.sync="dialogVisible"
      width="30%"
      @close="initForm"
    >
      <el-form
        :model="dataFrom"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
      >
        <el-form-item label="分类名称" prop="categoryName">
          <el-input v-model="dataFrom.categoryName"></el-input>
        </el-form-item>
        <el-form-item label="父级分类" v-if="addOrUpdateFlag | dataFrom.parentId !== 0">
          <el-select v-model="dataFrom.parentId" placeholder="请选择">
            <el-option
              v-for="item in parentList"
              :key="item.id"
              :label="item.categoryName"
              :value="item.id"
            >
            </el-option>
          </el-select>
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
import categoryApi from '@/api/category'
export default {
  data() {
    return {
      keyword: '',
      pageNum: 1,
      pageSize: 10,
      categoryList: [],
      total: 0,
      dialogVisible: false,
      dataFrom: {
        parentId: 0,
      },
      rules: {
        categoryName: [
          { required: true, message: '请输入分类名称', trigger: 'blur' },
        ],
      },
      title: '添加',
      parentList: [],
      addOrUpdateFlag: true     // true add  false update
    }
  },
  created() {
    this.getCategoryList()
  },
  methods: {
    getCategoryList() {
      categoryApi
        .getList(this.keyword, this.pageNum, this.pageSize)
        .then((res) => {
          this.categoryList = res.data.list
          this.total = res.data.total
        })
    },
    getCategoryDetail(id) {
      categoryApi.getInfo(id).then((res) => {
        this.dataFrom = res.data
        this.imageUrl = res.data.categoryIcon
      })
    },
    addCategory() {
      categoryApi
        .create(this.dataFrom.parentId, this.dataFrom.categoryName)
        .then((res) => {
          this.$message.success('添加成功')
          this.dialogVisible = !this.dialogVisible
          this.getCategoryList()
        })
    },
    updateCategory() {
      categoryApi
        .update(
          this.dataFrom.id,
          this.dataFrom.parentId,
          this.dataFrom.categoryName
        )
        .then((res) => {
          this.$message.success('更新成功')
          this.dialogVisible = !this.dialogVisible
          this.getCategoryList()
        })
    },
    showAddDialog() {
      this.title = '添加'
      this.dialogVisible = !this.dialogVisible
      this.addOrUpdateFlag = true
      this.getAllParentCategory()
    },
    showEditDialog(id) {
      this.title = '修改'
      this.dialogVisible = !this.dialogVisible
      this.getAllParentCategory()
      this.getCategoryDetail(id)
      this.addOrUpdateFlag = false
    },
    removeCategoryOne(id) {
      this.$confirm('此操作将永久删除该分类, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        categoryApi.delete(id).then((res) => {
          this.$message.success('删除成功')
          this.getCategoryList()
        })
      })
    },
    handleSizeChange(val) {
      this.pageSize = val
      this.getCategoryList()
    },
    handleCurrentChange(val) {
      this.pageNum = val
      this.getCategoryList()
    },
    subForm() {
      if (this.dataFrom.id) {
        this.updateCategory()
      } else {
        this.addCategory()
      }
    },
    initForm() {
      this.$refs.ruleForm.resetFields()
      this.dataFrom = {
        parentId: 0,
      }
    },
    getAllParentCategory() {
      categoryApi.getAllParnetCategory().then((res) => {
        this.parentList = res.data
      })
    },
  },
}
</script>

<style lang="less" scoped>
.container {
  .category-list-area {
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