import request from '@/utils/request'

export default {
    getHomeTent() {
        return request({
            url: '/home/content',
            method: 'get'
        })
    }
}