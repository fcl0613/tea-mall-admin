import request from '@/utils/request'

export default {
    getStoreList(pageNum, pageSize, keyword) {
        return request({
            url: '/store/list',
            method: 'get',
            params: {
                pageNum,
                pageSize,
                keyword
            }
        })
    }
}