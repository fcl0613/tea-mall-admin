import request from '@/utils/request'

export default {
    getOrderList(obj) {
        return request({
            url: 'order/list',
            method: 'post',
            data: obj
        })
    },
    getOrderDetail(id) {
        return request({
            url: 'order/detail',
            method: 'get',
            params: {
                id
            }
        })
    },
    deleteOrder(id) {
        return request({
            url: 'order/delete',
            method: 'post',
            params: {
                id
            }
        })
    },
    cancelOrder(id) {
        return request({
            url: 'order/cancel',
            method: 'post',
            params: {
                id
            }
        })
    }
}