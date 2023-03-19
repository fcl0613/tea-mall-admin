import request from '@/utils/request'

export default {
    getList(keyword, pageNum, pageSize) {
        return request({
            url: '/category/list',
            method: 'get',
            params: {
                keyword, 
                pageNum, 
                pageSize
            }
        })
    },
    create(parentId, categoryName) {
        return request({
            url: '/category/create',
            method: 'post',
            params: {
                parentId, 
                categoryName
            }
        })
    },
    update(id, parentId, categoryName) {
        return request({
            url: '/category/update',
            method: 'post',
            params: {
                id,
                parentId, 
                categoryName
            }
        })
    },
    delete(id) {
        return request({
            url: '/category/delete',
            method: 'post',
            params: {
                id
            }
        })
    },
    getInfo(id) {
        return request({
            url: '/category/info',
            method: 'get',
            params: {
                id
            }
        })
    },
    getAllParnetCategory() {
        return request({
            url: '/category/parent',
            method: 'get'
        })
    }
}