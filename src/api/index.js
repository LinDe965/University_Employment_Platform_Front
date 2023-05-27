import request from '../utils/request';

//登录
export const loginPushPage = (loginDataForm) => {
    return request({
        url: 'http://localhost:8088/api/login',
        method: 'post',
        params:loginDataForm,
        headers:{'Content-Type':'multipart/form-data'}
    });
};

//注册
export const fetchSaveStudentOne = (query) => {
    return request({
        url: 'http://localhost:8088/api/students/insertStudentOne',
        method: 'post',
        params:query,
        headers:{
            'Content-Type':'application/json'
            // headers:{'Content-Type':'multipart/form-data'}
        },
    });
};

//companyHr_companyHr_companyHr_companyHr_companyHr_companyHr_companyHr_companyHr_companyHr_companyHr_companyHr_companyHr
//获取companyHrId的cookie
export const getCookieCompanyHrId = (companyHrIdData) => {
    return request({
        url: 'http://localhost:8088/api/cookie/companyHrId',
        method: 'post',
        params:companyHrIdData,
        headers:{
            'Content-Type':'application/json'
        },
    });
};
//hr修改密码
export const updateCompanyHrPasswordById = (query) => {
    return request({
        url: 'http://localhost:8088/companyHr/password',
        method: 'post',
        params:query,
        headers:{
            'Content-Type':'multipart/form-data'
        },
    });
};

//hr个人信息
export const fetchCompanyHrDetailByCompanyHrId = (companyHrId) =>{
    return request({
        url: 'http://localhost:8088/companyHr/getCompanyHrOne',
        method: 'get',
        params: {companyHrId},
        headers:{
            'Content-Type':'application/json'
        },
    });
}

//职位管理
export const getByHrIdPositionInformation = (companyHrId) =>{
    return request({
        url: 'http://localhost:8088/position/getByHrId',
        method: 'get',
        params: {companyHrId},
        headers:{
            'Content-Type':'application/json'
        },
    });
}
    //模糊搜索
export  const fetchPositionLikeByHr = query => {
    return request({
        url:'http://localhost:8088/position/hr/like',
        method:'get',
        params:query,
        headers:{
            'Content-Type':'application/json'
        },
    });
};

    //添加
export const fetchSavePositionByCompanyHr = (query) => {
    return request({
        url: 'http://localhost:8088/position/savePositionByCompanyHr',
        method: 'get',
        params:query,
        headers:{
            'Content-Type':'application/json'
        },
    });
};
    //修改
export const fetchUpdatePositionByCompanyHr = (query) => {
    return request({
        url: 'http://localhost:8088/position/updatePositionByCompanyHr',
        method: 'put',
        params:query,
        headers:{
            'Content-Type':'multipart/form-data'
        },
    });
};
    //删除
export const fetchDeletePositionByCompanyHr = (positionId) => {
    return request({
        url: 'http://localhost:8088/position/deletePositionByCompanyHr',
        method: 'delete',
        params:{positionId},
        headers:{
            'Content-Type':'multipart/form-data'
        },
    });
};

//companyHr投递管理
export const getByHrIdStudentDeliver = (companyHrId) =>{
    return request({
        url: 'http://localhost:8088/deliver/hrDeliverStudent',
        method: 'get',
        params: {companyHrId},
        headers:{
            'Content-Type':'application/json'
        },
    });
}
//模糊搜索
export  const fetchDeliverLikeByHr = query => {
    return request({
        url:'http://localhost:8088/deliver/hr/like',
        method:'get',
        params:query,
        headers:{
            'Content-Type':'application/json'
        },
    });
};

    //更新投递状态
export const fetchUpdateDeliverStatusByCompanyHr = (query) => {
    return request({
        url: 'http://localhost:8088/deliver/updateStatusByHr',
        method: 'put',
        params:query,
        headers:{
            'Content-Type':'multipart/form-data'
        },
    });
};

//companyHr简历管理
export const getByHrIdStudentResumes = (companyHrId) =>{
    return request({
        url: 'http://localhost:8088/studentResumes/hrResumesStudent',
        method: 'get',
        params: {companyHrId},
        headers:{
            'Content-Type':'application/json'
        },
    });
}
//模糊搜索
export  const fetchStudentResumeLikeByHr = query => {
    return request({
        url:'http://localhost:8088/studentResumes/hr/like',
        method:'get',
        params:query,
        headers:{
            'Content-Type':'application/json'
        },
    });
};

//companyHr面试管理
export const getStudentInterviewByHrId = (companyHrId) =>{
    return request({
        url: 'http://localhost:8088/interview/hrInterviewStudent',
        method: 'get',
        params: {companyHrId},
        headers:{
            'Content-Type':'application/json'
        },
    });
}
//模糊搜索
export  const fetchStudentInterviewLikeByHr = query => {
    return request({
        url:'http://localhost:8088/interview/hr/like',
        method:'get',
        params:query,
        headers:{
            'Content-Type':'application/json'
        },
    });
};

  //修改面试通过状态
export const fetchUpdateInterviewStatusByCompanyHr = (query) => {
    return request({
        url: 'http://localhost:8088/interview/updateInterviewStatusByHr',
        method: 'put',
        params:query,
        headers:{
            'Content-Type':'multipart/form-data'
        },
    });
};
    //添加面试记录
export const fetchSaveStudentInterviewByHr = (query) => {
    return request({
        url: 'http://localhost:8088/interview/insertInterview',
        method: 'get',
        params:query,
        headers:{
            'Content-Type':'application/json'
        },
    });
};

//companyHr录用管理
export const getStudentSigningByHrId = (companyHrId) =>{
    return request({
        url: 'http://localhost:8088/signing/hrSigningStudent',
        method: 'get',
        params: {companyHrId},
        headers:{
            'Content-Type':'application/json'
        },
    });
}
export const fetchUpdateSigningStatusByCompanyHr = (query) => {
    return request({
        url: 'http://localhost:8088/signing/updateSigningStatusByHr',
        method: 'put',
        params:query,
        headers:{
            'Content-Type':'multipart/form-data'
        },
    });
};
    //添加录用记录
export const fetchSaveStudentSigningByHr = (query) => {
    return request({
        url: 'http://localhost:8088/signing/insertSigning',
        method: 'get',
        params:query,
        headers:{
            'Content-Type':'application/json'
        },
    });
};

//模糊搜索
export  const fetchStudentSigningLikeByHr = query => {
    return request({
        url:'http://localhost:8088/signing/hr/like',
        method:'get',
        params:query,
        headers:{
            'Content-Type':'application/json'
        },
    });
};


//Student_Student_Student_Student_Student_Student_Student_Student_Student_Student_Student_Student_Student_Student_Student_Student
//获取studentId的cookie
export const getCookieStudentId = (studentIdData) => {
    return request({
        url: 'http://localhost:8088/api/cookie/studentId',
        method: 'post',
        params:studentIdData,
        headers:{
            'Content-Type':'application/json'
        },
    });
};

//student修改密码
export const updateStudentPasswordById = (query) => {
    return request({
        url: 'http://localhost:8088/api/students/password',
        method: 'post',
        params:query,
        headers:{
            'Content-Type':'multipart/form-data'
        },
    });
};
//简历管理
export const getStudentResumesByStudentId = (studentId) =>{
    return request({
        url: 'http://localhost:8088/api/students/studentId',
        method: 'get',
        params: {studentId},
        headers:{
            'Content-Type':'application/json'
        },
    });
}
//修改简历内容
export const fetchUpdateStudentResumeByStudent = (query) => {
    return request({
        url: 'http://localhost:8088/studentResumes/update/student/resume',
        method: 'put',
        params:query,
        headers:{
            'Content-Type':'multipart/form-data'
        },
    });
};
//投递管理
export const getStudentDeliverByStudentId = (studentId) =>{
    return request({
        url: 'http://localhost:8088/deliver/studentDeliver',
        method: 'get',
        params: {studentId},
        headers:{
            'Content-Type':'application/json'
        },
    });
}
 //模糊搜索
export  const fetchStudentDeliverLikeByStudent = query => {
    return request({
        url:'http://localhost:8088/deliver/student/like',
        method:'get',
        params:query,
        headers:{
            'Content-Type':'application/json'
        },
    });
};


//面试管理
export const getStudentInterviewByStudentId = (studentId) =>{
    return request({
        url: 'http://localhost:8088/interview/studentInterview',
        method: 'get',
        params: {studentId},
        headers:{
            'Content-Type':'application/json'
        },
    });
}

    //模糊搜索
export  const fetchStudentInterviewLikeByStudent = query => {
    return request({
        url:'http://localhost:8088/interview/student/like',
        method:'get',
        params:query,
        headers:{
            'Content-Type':'application/json'
        },
    });
};


//修改状态
export const fetchUpdateInterviewStudentStatusByStudent = (query) => {
    return request({
        url: 'http://localhost:8088/interview/updateInterviewStudentStatusByStudent',
        method: 'put',
        params:query,
        headers:{
            'Content-Type':'multipart/form-data'
        },
    });
};
//签约管理
export const getStudentSigningByStudentId = (studentId) =>{
    return request({
        url: 'http://localhost:8088/signing/studentSigning',
        method: 'get',
        params: {studentId},
        headers:{
            'Content-Type':'application/json'
        },
    });
}
//模糊搜索
export  const fetchStudentSigningLikeByStudent = query => {
    return request({
        url:'http://localhost:8088/signing/student/like',
        method:'get',
        params:query,
        headers:{
            'Content-Type':'application/json'
        },
    });
};

//修改签约状态
export const fetchUpdateSigningStudentStatusByStudent = (query) => {
    return request({
        url: 'http://localhost:8088/signing/updateSigningStudentStatusByStudent',
        method: 'put',
        params:query,
        headers:{
            'Content-Type':'multipart/form-data'
        },
    });
};

//收藏管理
export const getStudentFavoriteByStudentId = (studentId) =>{
    return request({
        url: 'http://localhost:8088/favorites/studentFavorites',
        method: 'get',
        params: {studentId},
        headers:{
            'Content-Type':'application/json'
        },
    });
}

  //模糊搜索
export  const fetchStudentFavoriteLikeByStudent = query => {
    return request({
        url:'http://localhost:8088/favorites/student/like',
        method:'get',
        params:query,
        headers:{
            'Content-Type':'application/json'
        },
    });
};
    //收藏管理切换状态
export const fetchUpdateFavoriteStatusByStudent = (query) => {
    return request({
        url: 'http://localhost:8088/favorites/updateStatusByHr',
        method: 'put',
        params:query,
        headers:{
            'Content-Type':'multipart/form-data'
        },
    });
};

//admin_admin_admin_admin_admin_admin_admin_admin_admin_admin_admin_admin_admin_admin_admin_admin_admin_admin_admin_admin
//获取adminId的cookie
export const getCookieAdminId = (adminIdData) => {
    return request({
        url: 'http://localhost:8088/api/cookie/adminId',
        method: 'post',
        params:adminIdData,
        headers:{
            'Content-Type':'application/json'
        },
    });
};

//admin修改密码
export const updateAdminsPasswordById = (query) => {
    return request({
        url: 'http://localhost:8088/api/admins/password',
        method: 'post',
        params:query,
        headers:{
            'Content-Type':'multipart/form-data'
        },
    });
};

//admin个人信息
export const fetchAdminDetailByAdminId = (adminId) =>{
    return request({
        url: 'http://localhost:8088/api/admins/getOne',
        method: 'get',
        params: {adminId},
        headers:{
            'Content-Type':'application/json'
        },
    });
}



//公司信息
export const getCompanyAllByAdmin = () => {
    return request({
        url: 'http://localhost:8088/company',
        method: 'get',
        headers:{
            'Content-Type':'application/json'
        },
    });
};

//hr信息
export const getCompanyHrAllByAdmin = () => {
    return request({
        url: 'http://localhost:8088/companyHr',
        method: 'get',
        headers:{
            'Content-Type':'application/json'
        },
    });
};
    //模糊搜索
export  const fetchCompanyHrAllLikeByAdmin = query => {
    return request({
        url:'http://localhost:8088/companyHr/admin/like',
        method:'get',
        params:query,
        headers:{
            'Content-Type':'application/json'
        },
    });
};
    //修改hr用户权限
export const fetchUpdateCompanyHrDeletedByAdmin = (query) => {
    return request({
        url: 'http://localhost:8088/companyHr/update/companyHrDeleted',
        method: 'put',
        params:query,
        headers:{
            'Content-Type':'multipart/form-data'
        },
    });
};

//职位管理
export const getPositionByAdmin = () => {
    return request({
        url: 'http://localhost:8088/position/admin',
        method: 'get',
        headers:{
            'Content-Type':'application/json'
        },
    });
};

//模糊搜索
export  const fetchPositionLikeByAdmin = query => {
    return request({
        url:'http://localhost:8088/position/admin/like',
        method:'get',
        params:query,
        headers:{
            'Content-Type':'application/json'
        },
    });
};
    //admin职业管理状态切换

export const fetchUpdatePositionEnableByAdmin = (query) => {
    return request({
        url: 'http://localhost:8088/position/admin/enable',
        method: 'put',
        params:query,
        headers:{
            'Content-Type':'multipart/form-data'
        },
    });
};

//就业管理
export const getStudentSigningByAdmin = () => {
    return request({
        url: 'http://localhost:8088/signing/adminEmploy',
        method: 'get',
        headers:{
            'Content-Type':'application/json'
        },
    });
};

    //模糊搜索
export  const fetchStudentSigningLikeByAdmin = query => {
    return request({
        url:'http://localhost:8088/signing/admin/like',
        method:'get',
        params:query,
        headers:{
            'Content-Type':'application/json'
        },
    });
};

//学生管理
export  const fetchStudentsDetailData = query => {
    return request({
        url:'http://localhost:8088/api/students',
        method:'get',
        params:query,
        //headers:{'Content-Type':'multipart/form-data'}
    });
};
   //模糊查询
export  const fetchStudentByStudentName = query => {
    return request({
        url:'http://localhost:8088/api/students/studentName',
        method:'get',
        params:query,
        headers:{
            'Content-Type':'application/json'
        },
    });
};
//admin更新stu信息
export const fetchUpdateStudentsInformationByAdmin = (query) => {
    return request({
        url: 'http://localhost:8088/api/students/admin/update',
        method: 'put',
        params:query,
        headers:{
            'Content-Type':'multipart/form-data'
        },
    });
};

//前台——前台——前台——前台——前台——前台——前台——前台——前台——前台——前台——前台——前台——前台——前台——前台——前台——前台——前台——前台——前台——前台——
//前台招聘信息列表接口

export  const fetchFrontPositionList = query => {
    return request({
        url:'http://localhost:8088/position/posList',
        method:'get',
        params:query,
        headers:{
            'Content-Type':'application/json'
        },
    });
};
//获取详细招聘信息
export const fetchFrontPositionDetailData = (positionId) =>{
    return request({
        url: 'http://localhost:8088/position/posDetail',
        method: 'get',
        params: {positionId},
        headers:{
            'Content-Type':'application/json'
        },
    });
}
//按钮收藏事件
export const fetchSaveStudentFavoriteData = (query) =>{
    return request({
        url: 'http://localhost:8088/favorites/insertFavorites',
        method: 'get',
        params: query,
        headers:{
            'Content-Type':'application/json'
        },
    });
}

//按钮投递事件

export const fetchSaveStudentDeliverData = (query) =>{
    return request({
        url: 'http://localhost:8088/deliver/insertDeliver',
        method: 'get',
        params: query,
        headers:{
            'Content-Type':'application/json'
        },
    });
}
































export const fetchUserData = query => {
    return request({
        url: 'http://stanoswald.cn:30900/admin/api/user/get/all',
        method: 'get',
        params: query,

    });
};
export const fetchOrderData = query => {
    return request({
        url: 'http://stanoswald.cn:30900/admin/api/order/get/all',
        method: 'get',
        params: query,
    });
};

//修改订单地址
export const updateOrderModifyAddress = (updateForm) => {
    return request({
        url: 'http://stanoswald.cn:30900/admin/api/order/modify_address',
        method: 'post',
        data:updateForm,
        headers:{'Content-Type':'multipart/form-data'
            // 'token':'Bearer eyJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJzZWxmIiwic3ViIjoiOGFjN2ZlYmEtMmUwMi00MWI3LTkxYmYtZmM1ZDJkYzNiMTEyIiwiZXhwIjoxNjU3MzY1ODY4LCJpYXQiOjE2NTczMjk4NjgsInNjb3BlIjoiQURNSU4ifQ.6GOJf1Fn3VrMbIkM408gSKyCmsYc5wkrPEz6VIXNlLMYfVvpfkrVBQQlR9U1t16PbwTTzSjHMoiEMB4KJdraGheUHW5T4RYd4k6jxogxB0fTJ6pW4lWFT3icn6YzY2J45c2I6W_Tnxq446yWNa2Krms_jhjLytaIyT8qh3PGZZ6UUO-BvR7o4J488BuZZqaCqhUwJKPf7rBDnYU2Ef0YkAAzlPbeBH6Ix4j4SgpKc-Kf1q9cOyMdNHcx1fDs0m_mmpjGyjEH_7eM5-PH8P1v4xKXb2HNDwUFwJTlfsXoAEHyCCjxAwQwNC7toHvFqxkurR2g-AYNWIB9neXBKLHl9g'

        }
    });
};

//订单发货
export const updateOrderShipTime = (updateForm) => {
    return request({
        url: 'http://stanoswald.cn:30900/admin/api/order/ship',
        method: 'post',
        data:updateForm,
        headers:{'Content-Type':'multipart/form-data'}
    });
};



//产品数据读取
export const fetchProductData = query => {
    return request({
        url: 'http://stanoswald.cn:30900/public/api/product/get/all',
        method: 'get',
        params: query
    });
};
//产品数据添加
export const addProductData = (addProduct) => {
    return request({
        url: 'http://stanoswald.cn:30900/admin/api/product/add',
        method: 'post',
        headers:{
            'Content-Type':'multipart/form-data'
        },
        data:addProduct
    });
};
//产品数据删除
export const deleteProductData = (form) => {
    return request({
        url: 'http://stanoswald.cn:30900/admin/api/product/delete',
        method: 'post',
        data: form,
        headers:{
            'Content-Type':'multipart/form-data'
        },
    });
};
//更新
export const updateProductData = (updateForm) =>{
    return request({
        url:'http://stanoswald.cn:30900/admin/api/product/update',
        method:'post',
        headers:{
            'Content-Type':'multipart/form-data'
        },
        data:updateForm
    })
}

export const fetchItemData = query => {
    return request({
        url: 'http://stanoswald.cn:30900/public/api/item/get/all',
        // url: './item.json',
        method: 'get',
        params: query
    });
};

export const addItemData = (addForm) => {
    return request({
        url: 'http://stanoswald.cn:30900/admin/api/item/add',
        method: 'post',
        data:addForm,
        headers:{
            'Content-Type':'application/json'
        },

    });
};

export const deleteItemData = (item_id) => {
    return request({
        url: 'http://stanoswald.cn:30900/admin/api/item/delete',
        method: 'post',
        params: {item_id},
        headers:{
            'Content-Type':'multipart/form-data'
        },
    });
};

export const updateItemData = (updateForm) => {
    return request({
        url: 'http://stanoswald.cn:30900/admin/api/item/update',
        method: 'post',
        data:updateForm,
        headers:{
            'Content-Type':'application/json'
        },
    });
};


export const fetchCategoryData =(query)=> {
    return request({
        url: 'http://stanoswald.cn:30900/public/api/category/get/all',
        method: 'get',
        params:query,
        headers:{'Content-Type':'multipart/form-data'}
    });
};
