<template>
    <div class="header">

        <div>
            <router-link class="logo" to="/pages" @click="cleanPositionCookie">
                <span>高校就业管理平台</span>
            </router-link>
        </div>
        <div class="header-right">
            <div class="search-box">

                <div class="search-button">
                    <el-input placeholder="请输入搜索内容" v-model.trim="keyword" clearable
                              @keyup.enter.native="handleSearch"/>
                    <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
                </div>


                <div v-if="!isLogin">
                    <router-link class="login" to="/login">登录</router-link>
                </div>

                <div v-if="isLogin">
                    <!-- 用户头像 -->
                    <div class="user-avator">
                        <img src="../assets/img/lbxx.png"/>
                    </div>
                    <!-- 用户名下拉菜单 -->
                    <el-dropdown class="user-name" trigger="click" @command="handleCommand" >
                    <span class="el-dropdown-link">
                        <i class="el-icon-caret-bottom"></i>
                    </span>
                        <template #dropdown>
                            <el-dropdown-menu>
                                <el-dropdown-item command="user">个人中心</el-dropdown-item>
                                <el-dropdown-item divided command="loginout">退出登录</el-dropdown-item>
                            </el-dropdown-menu>
                        </template>
                    </el-dropdown>
                </div>

            </div>
            <div class="header-user-con">
            </div>
        </div>
    </div>
</template>
<script>
import {computed, onMounted, ref} from "vue";
import {useStore} from "vuex";
import {useRouter} from "vue-router";
import Cookies from "js-cookie";

export default {
    // mounted() {
    //     function clearAllCookies() {
    //         var cookies = document.cookie.split(";");
    //
    //         for (var i = 0; i < cookies.length; i++) {
    //             var cookie = cookies[i];
    //             var eqPos = cookie.indexOf("=");
    //             var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
    //             document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    //         }
    //     }
    //
    //     window.addEventListener("unload", function(event) {
    //         clearAllCookies();
    //     });
    //
    // },
    setup() {

        let isLogin = false;

        const username = localStorage.getItem("ms_username");


        if (Cookies.get("studentId")) {
            isLogin = true;
        }

        const message = 2;

        const store = useStore();
        const collapse = computed(() => store.state.collapse);
        // 侧边栏折叠
        const collapseChage = () => {
            store.commit("handleCollapse", !collapse.value);
        };

        onMounted(() => {
            if (document.body.clientWidth < 1500) {
                collapseChage();
            }
        });

        // 用户名下拉菜单选择事件
        const router = useRouter();
        const handleCommand = (command) => {
            if (command == "loginout") {
                Cookies.remove("adminId")
                Cookies.remove("studentId")
                router.push("/pages");
                router.go(0)
            } else if (command == "user") {
                if(Cookies.get("adminId")){
                    router.push("/admin/AdminIndividualCenter");
                }
                else if(Cookies.get("studentId")){
                    router.push("/student/StudentIndividualCenter");
                }
            }
        };


        const keyword = ref("");

        const handleSearch = () => {
        };

        //跳转主页清楚cookie
        const cleanPositionCookie = () => {
            Cookies.remove("positionId");
        }

        return {
            isLogin,
            username,
            message,
            collapse,
            keyword,
            handleSearch,
            collapseChage,
            handleCommand,
            cleanPositionCookie
        };
    },
};
</script>
<style scoped>
.header {
    position: relative;
    box-sizing: border-box;
    width: 100%;
    height: 70px;
    font-size: 22px;
    color: #fff;
}

.header .logo {
    float: left;
    width: 250px;
    line-height: 70px;
    margin-left: 30px;
    color: white;
}


.header-right {
    float: right;
    padding-right: 50px;
}

.header-user-con {
    display: flex;
    height: 70px;
    align-items: center;
}

.search-box {
    display: flex;
    align-items: center;
    margin-top: 15px;
}

.login {
    margin-left: 20px;
    font-size: 20px;
    color: white;
}


.el-input {
    width: 300px;
    margin-right: 10px;
}

.btn-fullscreen {
    transform: rotate(45deg);
    margin-right: 5px;
    font-size: 24px;
}

.btn-bell,
.btn-fullscreen {
    position: relative;
    width: 30px;
    height: 30px;
    text-align: center;
    border-radius: 15px;
    cursor: pointer;
}

.btn-bell-badge {
    position: absolute;
    right: 0;
    top: -2px;
    width: 8px;
    height: 8px;
    border-radius: 4px;
    background: #f56c6c;
    color: #fff;
}

.btn-bell .el-icon-bell {
    color: #fff;
}

.user-name {
    margin-left: 10px;
    margin-bottom: 50px;
}

.user-avator {
    margin-left: 20px;
}

.user-avator img {
    display: block;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-right: 50px;
}

.el-dropdown-link {
    color: #fff;
    cursor: pointer;
    margin-left: 50px;
}

.el-dropdown-menu__item {
    text-align: center;
}
.search-button {
    margin-right: 150px;
    margin-bottom: 10px;
}



</style>
