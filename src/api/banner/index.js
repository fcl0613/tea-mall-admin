import request from '@/utils/request'

export default {
    addBanner(obj) {
        return request({
            url: '/banner/add',
            method: 'post',
            data: obj
        })
    },
    publishBanner(id) {
        return request({
            url: '/banner/publish',
            method: 'post',
            params: {
                id
            }
        })
    },
    unPublishBanner(id) {
        return request({
            url: '/banner/unPublish',
            method: 'post',
            params: {
                id
            }
        })
    },
    deleteBanner(id) {
        return request({
            url: '/banner/delete',
            method: 'post',
            params: {
                id
            }
        })
    },
    getBannerList(pageNum, pageSize) {
        return request({
            url: '/banner/list',
            method: 'post',
            params: {
                pageNum, pageSize
            }
        })
    }
}