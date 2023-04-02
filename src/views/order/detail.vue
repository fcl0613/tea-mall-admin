<template>
  <div class="conatiner">
    <div class="content">
      <el-page-header @back="goBack" content="详情页面"> </el-page-header>
      <div class="order-area">
        <div class="title">
          订单号：<span>{{ orderObj.orderId }}</span>
        </div>
        <el-divider></el-divider>
        <div class="status">{{ orderObj.statusStr }}</div>
        <div
          class="goods-list"
          v-if="orderObj.goods && orderObj.goods.length > 0"
        >
          <div
            class="goods-area"
            v-for="(item, index) in orderObj.goods"
            :key="index"
          >
            <div class="goods-pic">
              <el-image
                style="width: 100px; height: 100px"
                :src="baseUrl + item.goodsCover"
                fit="fit"
              ></el-image>
            </div>
            <div class="goods-name">{{ item.goodsName }}</div>
            <div class="goods-info">
              <span>{{ item.goodsPrice }}</span
              >×<span>{{ item.goodsCount }}</span>
            </div>
          </div>
        </div>
        <el-divider></el-divider>
        <div class="adress-area">
          <div class="address-area-title">收货信息</div>
          <div class="address-name">
            姓名：<span>{{ orderObj.deliveryName }}</span>
          </div>
          <div class="address-phone">
            电话：<span>{{ orderObj.deliveryPhone }}</span>
          </div>
          <div class="address">
            地址：<span>{{ orderObj.address }}</span>
          </div>
        </div>
        <el-divider></el-divider>
        <div class="price-area">
          商品总价: <span>{{ orderObj.totalPrice }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import orderApi from '@/api/order'
import baseImageUrl from '@/utils/baseImageUrl'
export default {
  data() {
    return {
      id: this.$route.query.id,
      orderObj: {},
      baseUrl: baseImageUrl.BASE_IMG_URL,
    }
  },
  created() {
    this.getDetail()
  },
  methods: {
    goBack() {
      this.$router.go(-1)
    },
    getDetail() {
      orderApi.getOrderDetail(this.id).then((res) => {
        this.orderObj = res.data
      })
    },
  },
}
</script>

<style lang="less" scoped>
.container {
  //   padding: 20px;
  
  width: 100%;
  .content {
    padding: 20px;
    background-color: #fff;
    .order-area {
      margin-top: 20px;
      color: #262626;
      .title {
        font-size: 18px;
      }
      .status {
        margin-bottom: 10px;
        font-size: 15px;
      }
      .goods-list {
        .goods-area {
          margin-bottom: 10px;
          display: flex;
          align-items: center;
          color: #757575;
          .goods-name {
            margin-left: 30px;
          }
          .goods-info {
            margin-left: 30px;
          }
        }
      }
      .adress-area {
        font-size: 14px;
        color: #757575;
        div {
          margin-bottom: 10px;
        }
        .address-area-title {
          margin-bottom: 10px;
          font-size: 15px;
          color: #262626;
        }
      }
      .price-area {
        span {
          color: #a10000;
        }
      }
    }
  }
}
</style>