<template>
  <div class="container">
    <el-button type="primary" @click="showAddDialog">添加</el-button>
    <div class="category-list-area">
      <el-card>
        <div class="data-table">
          <el-table :data="bannerList" border stripe style="width: 100%">
            <el-table-column label="编号" type="index" width="200">
            </el-table-column>
            <el-table-column prop="bannerName" label="轮播图名" width="400">
            </el-table-column>
            <el-table-column label="图片" width="400">
              <template slot-scope="scope">
                <el-image
                  style="width: 100px; height: 100px"
                  :src="baseUrl + scope.row.bannerUrl"
                  fit="fit"
                ></el-image>
              </template>
            </el-table-column>
            <el-table-column label="状态" width="300">
              <template slot-scope="scope">
                <el-switch
                  v-model="scope.row.publishStatus"
                  :active-value="0"
                  :inactive-value="1"
                  @change="updateStatus(scope.row)"
                >
                </el-switch>
              </template>
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button
                  type="danger"
                  icon="el-icon-delete"
                  @click="removeBanner(scope.row.id)"
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
      title="轮播图添加"
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
        <el-form-item label="轮播图名称" prop="bannerName">
          <el-input v-model="dataFrom.bannerName"></el-input>
        </el-form-item>
        <el-form-item label="轮播图状态">
          <el-switch
            v-model="dataFrom.publishStatus"
            :active-value="0"
            :inactive-value="1"
          >
          </el-switch>
        </el-form-item>
        <el-form-item label="上传图片">
          <el-upload
            class="avatar-uploader"
            action=""
            :http-request="coverUpload"
            :show-file-list="false"
            :on-success="handleCoverSuccess"
          >
            <img v-if="coverUrl" :src="baseUrl + coverUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
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
import bannerApi from '@/api/banner'
import baseUrl from '@/utils/baseImageUrl'
import fileUploadApi from '@/api/fileUpload'
export default {
  data() {
    return {
      pageNum: 1,
      pageSize: 10,
      dialogVisible: false,
      baseUrl: baseUrl.BASE_IMG_URL,
      bannerList: [],
      total: 0,
      dataFrom: {
        publishStatus: 0,
      },
      coverUrl: '',
      rules: {
        bannerName: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
        ],
      },
    }
  },
  created() {
    this.getBannerList()
  },
  methods: {
    getBannerList() {
      bannerApi.getBannerList(this.pageNum, this.pageSize).then((res) => {
        this.bannerList = res.data.list
        this.total = res.data.total
      })
    },
    handleSizeChange(val) {
      this.pageSize = val
      this.getBannerList()
    },
    handleCurrentChange(val) {
      this.pageNum = val
      this.getBannerList()
    },
    removeBanner(id) {
      this.$confirm('此操作将永久删除该轮播图, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          bannerApi.deleteBanner(id).then((res) => {
            this.$message.success('删除成功')
            this.getBannerList()
          })
        })
        .catch(() => {})
    },
    coverUpload(options) {
      let file = options.file
      let formData = new FormData()
      formData.append('file', file)
      fileUploadApi.fileUpload(formData).then((response) => {
        let res = response.data
        if (res.code == 200) {
          console.log(res)
          this.coverUrl = res.data
          this.dataFrom.bannerUrl = this.coverUrl
          console.log(this.coverUrl)
          this.$message.success('文件上传成功')
        } else {
          this.$message.error('文件上传失败')
        }
      })
    },
    updateStatus(row) {
      if (row.publishStatus === 0) {
        bannerApi.publishStatus(row.id).then((res) => {
          this.$message.success(res.msg)
        })
      } else {
        bannerApi.unPublishBanner(row.id).then((res) => {
          this.$message.success(res.msg)
        })
      }
    },
    showAddDialog() {
      this.dialogVisible = !this.dialogVisible
    },
    subForm() {
      this.$refs.ruleForm.validate((valid) => {
        if (!valid) return
        if (!this.dataFrom.bannerUrl) {
          this.$message.error('请先上传图片')
          return
        }
        bannerApi.addBanner(this.dataFrom).then((res) => {
          this.$message.success(res.msg)
          this.dialogVisible = !this.dialogVisible
          this.getBannerList()
        })
      })
    },
    handleCoverSuccess(response, file, fileList) {
      console.log(response, file, fileList)
    },
    initForm() {
      this.dataFrom = {
        publishStatus: 0,
      }
    },
  },
}
</script>

<style lang="less" scoped>
.container {
  .category-list-area {
    margin-top: 10px;
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
.avatar-uploader {
  .avatar {
    width: 100px;
    height: 100px;
    display: block;
  }
  .avatar-uploader-icon {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    font-size: 28px;
    color: #8c939d;
    width: 100px;
    height: 100px;
    line-height: 100px;
    text-align: center;
  }
}
</style>