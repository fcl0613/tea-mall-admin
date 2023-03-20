import request from '@/utils/request'

export default {
    create(obj) {
        return request({
            url: '/user/create',
            method: 'post',
            data: obj
        })
    },
    getList(pageNum, pageSize, keyword) {
        return request({
            url: '/user/list',
            method: 'get',
            params: {
                pageNum,
                pageSize,
                keyword
            }
        })
    },
    update(obj) {
        return request({
            url: '/user/update',
            method: 'post',
            data: obj
        })
    },
    delete(id) {
        return request({
            url: '/user/delete',
            method: 'post',
            params: {
                id
            }
        })
    },
    getInfo(id) {
        return request({
            url: '/user/info',
            method: 'get',
            params: {
                id
            }
        })
    }
}