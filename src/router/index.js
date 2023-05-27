import {createRouter, createWebHashHistory} from "vue-router";
import Home from "../views/CompanyHr.vue";

const routes = [
    {
        path: '/',
        redirect: '/login'
    },
    {
        path: "/",
        name: "Home",
        component: Home,
        children: [
            {
                path: "/UsersManage",
                name: "UsersManage",
                meta: {
                    title: '用户管理'
                },
                component: () => import ( /* webpackChunkName: "dashboard" */ "../views/testManagement/UserManage.vue")
            },
            {
                path: "/OrdersManage",
                name: "OrdersManage",
                meta: {
                    title: '订单管理'
                },
                component: () => import ( /* webpackChunkName: "dashboard" */ "../views/testManagement/OrderManage.vue")
            },
            {
                path: "/ProductManage",
                name: "ProductManage",
                meta: {
                    title: '产品管理'
                },
                component: () => import ( /* webpackChunkName: "dashboard" */ "../views/testManagement/ProductManage.vue")
            },
            {
                path: "/ItemManage",
                name: "ItemManage",
                meta: {
                    title: '商品管理'
                },
                component: () => import ( /* webpackChunkName: "dashboard" */ "../views/testManagement/ItemManage.vue")
            },
            {
                path: "/dashboard",
                name: "dashboard",
                meta: {
                    title: '系统首页'
                },
                component: () => import ( /* webpackChunkName: "dashboard" */ "../views/testManagement/Dashboard.vue")
            },
            {
                path: "/table",
                name: "basetable",
                meta: {
                    title: '表格'
                },
                component: () => import ( /* webpackChunkName: "table" */ "../views/testManagement/BaseTable.vue")
            },
            {
                path: "/charts",
                name: "basecharts",
                meta: {
                    title: '图表'
                },
                component: () => import ( /* webpackChunkName: "charts" */ "../views/testManagement/BaseCharts.vue")
            },
            {
                path: "/form",
                name: "baseform",
                meta: {
                    title: '表单'
                },
                component: () => import ( /* webpackChunkName: "form" */ "../views/testManagement/BaseForm.vue")
            },
            {
                path: "/tabs",
                name: "tabs",
                meta: {
                    title: 'tab标签'
                },
                component: () => import ( /* webpackChunkName: "tabs" */ "../views/testManagement/Tabs.vue")
            },
            {
                path: "/donate",
                name: "donate",
                meta: {
                    title: '鼓励作者'
                },
                component: () => import ( /* webpackChunkName: "donate" */ "../views/testManagement/Donate.vue")
            },
            {
                path: "/permission",
                name: "permission",
                meta: {
                    title: '权限管理',
                    permission: true
                },
                component: () => import ( /* webpackChunkName: "permission" */ "../views/testManagement/Permission.vue")
            },
            {
                path: "/i18n",
                name: "i18n",
                meta: {
                    title: '国际化语言'
                },
                component: () => import ( /* webpackChunkName: "i18n" */ "../views/testManagement/I18n.vue")
            },
            {
                path: "/upload",
                name: "upload",
                meta: {
                    title: '上传插件'
                },
                component: () => import ( /* webpackChunkName: "upload" */ "../views/testManagement/Upload.vue")
            },
            {
                path: "/icon",
                name: "icon",
                meta: {
                    title: '自定义图标'
                },
                component: () => import ( /* webpackChunkName: "icon" */ "../views/testManagement/Icon.vue")
            },
            {
                path: '/404',
                name: '404',
                meta: {
                    title: '找不到页面'
                },
                component: () => import (/* webpackChunkName: "404" */ '../views/testManagement/404.vue')
            },
            {
                path: '/403',
                name: '403',
                meta: {
                    title: '没有权限'
                },
                component: () => import (/* webpackChunkName: "403" */ '../views/testManagement/403.vue')
            },
            {
                path: '/user',
                name: 'user',
                meta: {
                    title: '个人中心'
                },
                component: () => import (/* webpackChunkName: "user" */ '../views/testManagement/User.vue')
            },
            {
                path: '/editor',
                name: 'editor',
                meta: {
                    title: '富文本编辑器'
                },
                component: () => import (/* webpackChunkName: "editor" */ '../views/testManagement/Editor.vue')
            }
        ]
    },
    {
        path: "/login",
        name: "Login",
        meta: {
            title: '登录'
        },
        component: () => import ( /* webpackChunkName: "login" */ "../views/Login.vue")
    }, {
        path: "/index",
        name: "Index",
        meta: {
            title: '登录'
        },
        component: () => import ( /* webpackChunkName: "login" */ "../views/Index.vue")
    }
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

export default router;
