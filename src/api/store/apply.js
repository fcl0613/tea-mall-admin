import request from '@/utils/request'

export default {
    getList(obj) {
        return request({
            url: '/store/apply/list',
            method: 'post',
            data: obj
        })
    },
    refuse(obj) {
        return request({
            url: '/store/apply/refuse',
            method: 'post',
            data: obj
        })
    },
    agree(id) {
        return request({
            url: '/store/apply/agree',
            method: 'post',
            params: {
                id
            }
        })
    },
}