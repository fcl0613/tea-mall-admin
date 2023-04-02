<template>
  <div class="conatiner">
    <el-descriptions title="数据统计" :column="3" border>
      <el-descriptions-item
        label="上架商品数量"
        label-class-name="my-label"
        content-class-name="my-content"
        >{{ homeContent.publishGoodsCount }}</el-descriptions-item
      >
      <el-descriptions-item label="商品数量">{{ homeContent.goodsCount }}</el-descriptions-item>
      <el-descriptions-item label="订单总数量">{{ homeContent.orderCount }}</el-descriptions-item>
      <el-descriptions-item label="待发货订单">{{ homeContent.waitingSendOrderCount }}</el-descriptions-item>
      <el-descriptions-item label="待付款订单">{{ homeContent.waitingPayOrderCount }}</el-descriptions-item>
      <el-descriptions-item label="待收货订单">{{ homeContent.waitingDeliveryOrderCount }}</el-descriptions-item>
      <el-descriptions-item label="销售总额">{{ homeContent.totalIncome }}</el-descriptions-item>
      <el-descriptions-item label="昨日销售总额">{{ homeContent.yesterdayIncome }}</el-descriptions-item>
      <el-descriptions-item label="昨日订单">{{ homeContent.yesterdayOrderCount }}</el-descriptions-item>
    </el-descriptions>
  </div>
</template>

<script>
import homeAPi from '@/api/home'
export default {
  data() {
    return {
      homeContent: {},
    }
  },
  created() {
    this.getHomeContent()
  },
  methods: {
    getHomeContent() {
      homeAPi.getHomeTent().then((res) => {
        this.homeContent = res.data
      })
    }
  },
}
</script>

<style lang="less" scoped>
</style>