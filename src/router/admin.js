import {createRouter, createWebHashHistory} from "vue-router";
import Admin from "../views/Admin.vue";
import CompanyHr from "../views/CompanyHr.vue";
import Student from "../views/Student.vue";

const routes = [
    {
        path: '/',
        redirect:'/pages'
    },
    {
        path:'/pages',
        name:'Pages',
        meta:{
            title: '前台'
        },
        component: () => import ( /* webpackChunkName: "login" */ "../views/pages/Pages.vue")
    },
    {
        path:'/pagesDetail/:positionId',
        name:'PagesDetail',
        meta:{
            title: '招聘信息详情页'
        },
        component: () => import ( /* webpackChunkName: "login" */ "../views/pages/PagesDetail.vue")
    },
    {
        path: "/admin",
        name: "Admin",
        component: Admin,
        children: [
            {
                path: "/admin/dashboard",
                name: "dashboard",
                meta: {
                    title: '系统首页'
                },
                component: () => import ( /* webpackChunkName: "dashboard" */ "../views/admin/AdminDashboard.vue")
            },
            {
                path:"/admin/AdminStudentManagement",
                name:"AdminStudentManagement",
                meta: {
                    title: "学生管理"
                },
                component:()=> import("../views/admin/AdminStudentManagement.vue")
            },
            // {
            //     path:"/admin/AdminCompanyManagement",
            //     name:"AdminCompanyManagement",
            //     meta: {
            //         title: "公司信息管理"
            //     },
            //     component:()=> import("../views/admin/AdminCompanyManagement.vue")
            // },
            {
                path:"/admin/AdminCompanyHrManagement",
                name:"AdminCompanyHrManagement",
                meta: {
                    title: "公司招聘人员管理"
                },
                component:()=> import("../views/admin/AdminCompanyHrManagement.vue")
            },
            {
                path:"/admin/AdminPositionManagement",
                name:"AdminPositionManagement",
                meta: {
                    title: "职位信息管理"
                },
                component:()=> import("../views/admin/AdminPositionManagement.vue")
            },
            {
                path:"/admin/AdminEmployManagement",
                name:"AdminEmployManagement",
                meta: {
                    title: "就业信息管理"
                },
                component:()=> import("../views/admin/AdminEmployManagement.vue")
            },
            {
                path:"/admin/AdminIndividualCenter",
                name:"AdminIndividualCenter",
                meta: {
                    title: "个人中心"
                },
                component:()=> import("../views/admin/AdminIndividualCenter.vue")
            },

        ]
    },

    {
        path: "/companyHr",
        name: "CompanyHr",
        component: CompanyHr,
        children: [
            {
                path: "/companyHr/CompanyHrDashboard",
                name: "CompanyHrDashboard",
                meta: {
                    title: '系统首页'
                },
                component: () => import ("../views/companyHr/CompanyHrDashboard.vue")
            },
            {
                path: "/companyHr/CompanyHrPositionManagement",
                name: "CompanyHrPositionManagement",
                meta: {
                    title: '职位管理'
                },
                component: () => import ("../views/companyHr/CompanyHrPositionManagement.vue")
            },
            {
                path: "/companyHr/CompanyHrStudentDeliverManagement",
                name: "CompanyHrStudentDeliverManagement",
                meta: {
                    title: '投递管理'
                },
                component: () => import ("../views/companyHr/CompanyHrStudentDeliverManagement.vue")
            },
            {
                path: "/companyHr/CompanyHrResumeManagement",
                name: "CompanyHrResumeManagement",
                meta: {
                    title: '简历管理'
                },
                component: () => import ("../views/companyHr/CompanyHrResumeManagement.vue")
            },
            {
                path: "/companyHr/CompanyHrInterviewManagement",
                name: "CompanyHrInterviewManagement",
                meta: {
                    title: '面试管理'
                },
                component: () => import ("../views/companyHr/CompanyHrInterviewManagement.vue")
            },
            {
                path: "/companyHr/CompanyHrSigningManagement",
                name: "CompanyHrSigningManagement",
                meta: {
                    title: '签约管理'
                },
                component: () => import ("../views/companyHr/CompanyHrSigningManagement.vue")
            },
            {
                path: "/companyHr/CompanyHrIndividualCenter",
                name: "CompanyHrIndividualCenter",
                meta: {
                    title: '个人中心'
                },
                component: () => import ( "../views/companyHr/CompanyHrIndividualCenter.vue")
            },
        ]
    },

    {
        path: "/student",
        name: "Student",
        component: Student,
        children: [
            {
                path: "/student/StudentDashboard",
                name: "StudentDashboard",
                meta: {
                    title: '系统首页'
                },
                component: () => import ("../views/student/StudentDashboard.vue")
            },
            {
                path: "/student/StudentResumeManagement",
                name: "StudentResumeManagement",
                meta: {
                    title: '简历管理'
                },
                component: () => import ("../views/student/StudentResumeManagement.vue")
            },
            {
                path: "/student/StudentDeliverManagement",
                name: "StudentDeliverManagement",
                meta: {
                    title: '投递管理'
                },
                component: () => import ("../views/student/StudentDeliverManagement.vue")
            },
            {
                path: "/student/StudentInterviewManagement",
                name: "StudentInterviewManagement",
                meta: {
                    title: '面试管理'
                },
                component: () => import ("../views/student/StudentInterviewManagement.vue")
            },
            {
                path: "/student/StudentAdmitPositionManagement",
                name: "StudentAdmitPositionManagement",
                meta: {
                    title: '签约管理'
                },
                component: () => import ("../views/student/StudentAdmitPositionManagement.vue")
            },
            {
                path: "/student/StudentJobCollection",
                name: "StudentJobCollection",
                meta: {
                    title: '职位收藏'
                },
                component: () => import ("../views/student/StudentJobCollection.vue")
            },

            {
                path: "/student/StudentIndividualCenter",
                name: "StudentIndividualCenter",
                meta: {
                    title: '个人中心'
                },
                component: () => import ( "../views/student/StudentIndividualCenter.vue")
            },
        ]
    },

    {
        path: "/login",
        name: "Login",
        meta: {
            title: '登录'
        },
        component: () => import ( /* webpackChunkName: "login" */ "../views/Login.vue")
    },

];

const router = createRouter({
    history: createWebHashHistory(),
    routes
});

// router.beforeEach((to, from, next) => {
//     document.title = `${to.meta.title} | vue-manage-system`;
//     const role = localStorage.getItem('ms_username');
//     if (!role && to.path !== '/login') {
//         next('/login');
//     } else if (to.meta.permission) {
//         // 如果是管理员权限则可进入，这里只是简单的模拟管理员权限而已
//         role === 'admin'
//             ? next()
//             : next('/403');
//     } else {
//         next();
//     }
// });

export default router
