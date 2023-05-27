import request from '../utils/request';


// 注册方法
export function registerMember(formItem) {
    return request({
        url: 'http://stanoswald.cn:30900/auth/register',
        method: 'post',
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        data:formItem
    })
}

//登录的方法
export function subjectLogin(userInfo) {
    return request({
        url: 'http://stanoswald.cn:30900/auth/login',
        method: 'post',
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        data:userInfo
    })
}

//根据token获取用户信息
export function getUserInfo() {
    return request({
        url:'http://stanoswald.cn:30900/user/api/get',
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        method: 'get',
    })
}
