<template>
    <div class="login-wrap">
        <div class="ms-login">
            <div class="ms-title">后台管理系统</div>
            <el-form :model="loginData" :rules="rules" ref="login" label-width="0px" class="ms-content">
                <el-form-item prop="email">
                    <el-input v-model="loginData.email" placeholder="email">
                        <template #prepend>
                            <el-button icon="el-icon-user"></el-button>
                        </template>
                    </el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input type="password" placeholder="password" v-model="loginData.password"
                              @keyup.enter="submitForm()">
                        <template #prepend>
                            <el-button icon="el-icon-lock"></el-button>
                        </template>
                    </el-input>
                </el-form-item>
                <div>
                    <el-radio-group v-model="loginData.role" style="margin-bottom: 15px;margin-left: 50px">
                        <el-radio label="student" value="student">学生</el-radio>
                        <el-radio label="hr" value="hr">企业</el-radio>
                        <el-radio label="admin" value="admin">老师</el-radio>
                    </el-radio-group>
                </div>
                <div class="login-btn">
                    <el-button type="primary" @click="submitForm()">登录</el-button>
                </div>
                <div style="display: flex">
                    <p class="login-tips" style="margin-top: 7px;margin-right: 30px">Tips : 用户名和密码随便填。</p>
                    <div class="flex justify-space-between mb-4 flex-wrap gap-4">
                        <el-button type="primary" @click="addRegisterUserDialog = true">注册</el-button>
                        <el-dialog v-model="addRegisterUserDialog" :visible.sync="addRegisterUserDialog" title="学生注册">
                            <el-form label-width="70px">
                                <el-form-item label="学号">
                                    <el-input v-model="addRegisterUserForm.studentId"></el-input>
                                </el-form-item>
                                <el-form-item label="姓名">
                                    <el-input v-model="addRegisterUserForm.studentName"></el-input>
                                </el-form-item>
                                <el-form-item label="性别">
                                    <el-select v-model="addRegisterUserForm.studentSex" placeholder="请选择性别">
                                        <el-option label="男" value="男"></el-option>
                                        <el-option label="女" value="女"></el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="年龄">
                                    <el-input v-model="addRegisterUserForm.studentAge"></el-input>
                                </el-form-item>
                                <el-form-item label="邮箱">
                                    <el-input v-model="addRegisterUserForm.studentEmail"></el-input>
                                </el-form-item>
                                <el-form-item label="手机号">
                                    <el-input v-model="addRegisterUserForm.studentTel"></el-input>
                                </el-form-item>
                                <el-form-item label="身份证号">
                                    <el-input v-model="addRegisterUserForm.studentIdCards"></el-input>
                                </el-form-item>
                                <el-form-item label="所在院校">
                                    <el-input v-model="addRegisterUserForm.studentDepartment"></el-input>
                                </el-form-item>
                                <el-form-item label="所在系">
                                    <el-input v-model="addRegisterUserForm.studentSubject"></el-input>
                                </el-form-item>
                                <el-form-item label="毕业年份">
                                    <el-input v-model="addRegisterUserForm.studentEndYear"></el-input>
<!--                                    <el-date-picker-->
<!--                                        v-model="addRegisterUserForm.studentEndYear"-->
<!--                                        type="date"-->
<!--                                        format="yyyy"-->
<!--                                        placeholder="毕业年份">-->
<!--                                    </el-date-picker>-->
                                </el-form-item>
                                <el-form-item label="密码">
                                    <el-input v-model="addRegisterUserForm.password"></el-input>
                                </el-form-item>
                            </el-form>
                            <template #footer>
                                <span class="dialog-footer">
                                    <el-button @click="addRegisterUserDialog = false">取 消</el-button>
                                     <el-button type="primary" @click="addRegisterUserFormEvent">确 定</el-button>
                                </span>
                            </template>
                        </el-dialog>
                    </div>
                </div>
            </el-form>
        </div>
    </div>
</template>

<script>
import {ref, reactive} from "vue";
import {useStore} from "vuex";
import {useRouter} from "vue-router";
import {
    fetchSaveStudentOne,
    // getCookieAdminId,
    // getCookieCompanyHrId,
    // getCookieStudentId,
    loginPushPage
} from "../api/index";
import {ElMessage} from "element-plus";
import {getUserInfo, subjectLogin} from "../api/user";
import {setToken} from "../utils/auth";
import axios from "axios";

export default {
    setup() {
        const router = useRouter();
        const loginInfo = reactive({});

        const loginData = reactive({
            email: 'atest@qq.com',
            password: '123456',
            role: ''
        });
        const submitForm = () => {
            loginPushPage(loginData).then((res)=> {
                console.log(res);
                if(20041 == res.code && res.data.role==='hr' && res.data.deleted === 0){
                    ElMessage.success("登录成功")
                    setCookie("companyHrId",res.data.companyHrId,86400);
                    router.push("/companyHr/CompanyHrDashboard")
                }else if(20041 == res.code && res.data.role==='student' && res.data.deleted === 0){
                    ElMessage.success("登录成功")
                    setCookie("studentId",res.data.studentId,86400);
                    router.push("/student/StudentDashboard")
                }else if(20041 == res.code && res.data.role==='admin'){
                    ElMessage.success("登录成功")
                    router.push("/admin/dashboard")
                    setCookie("adminId",res.data.adminId,86400);
                }
                else {
                    ElMessage.error("登录失败")
                }
            }).catch(error =>{
                console.log(error);
            })
        }

        const rules = {
            email: [
                {
                    required: true,
                    message: "请输入用户名",
                    trigger: "blur",
                },
            ],
            password: [
                {required: true, message: "请输入密码", trigger: "blur"},
            ],
        };

        const login = ref(null);

        const addRegisterUserDialog = ref(false);

        function getCookie(name) {
            var nameEQ = name + "=";
            var ca = document.cookie.split(';');    //把cookie分割成组
            for(var i=0;i < ca.length;i++) {
                var c = ca[i];                      //取得字符串
                while (c.charAt(0)==' ') {          //判断一下字符串有没有前导空格
                    c = c.substring(1,c.length);      //有的话，从第二位开始取
                }
                if (c.indexOf(nameEQ) == 0) {       //如果含有我们要的name
                    return unescape(c.substring(nameEQ.length,c.length));    //解码并截取我们要值
                }
            }
            return false;
        }

//清除cookie
        function clearCookie(name) {
            setCookie(name, "", -1);
        }

//设置cookie
        function setCookie(name, value, seconds) {
            seconds = seconds || 0;   //seconds有值就直接赋值，没有为0，这个根php不一样。
            var expires = "";
            if (seconds != 0 ) {      //设置cookie生存时间
                var date = new Date();
                date.setTime(date.getTime()+(seconds*1000));
                expires = "; expires="+date.toGMTString();
            }
            document.cookie = name+"="+escape(value)+expires+"; path=/";   //转码并赋值
        }

        const addRegisterUserForm = reactive({
            studentId:'',
            studentName: '',
            studentSex: '',
            studentAge: '',
            studentEmail: '',
            studentTel: '',
            studentIdCards: '',
            studentDepartment: '',
            studentSubject: '',
            studentEndYear: '',
            role:'student',
            deleted:0,
            password:''
        })

        const addRegisterUserFormEvent = () => {
            fetchSaveStudentOne(addRegisterUserForm).then((res)=>{
                console.log(res)
                if (res.code == 20011) {
                    ElMessage.success(`注册成功`);
                } else {
                    ElMessage.error(`注册失败`)
                }
            })
            addRegisterUserDialog.value = false;
        };



        const store = useStore();
        store.commit("clearTags");


        return {
            rules,
            login,
            submitForm,
            loginInfo,
            loginData,
            router,
            addRegisterUserDialog,
            addRegisterUserForm,
            addRegisterUserFormEvent,
            setCookie,
        };
    },
}
</script>

<style scoped>
.login-wrap {
    position: relative;
    width: 100%;
    height: 100%;
    background-image: url(../assets/img/login-bg.jpg);
    background-size: 100%;
}

.ms-title {
    width: 100%;
    line-height: 50px;
    text-align: center;
    font-size: 20px;
    color: #fff;
    border-bottom: 1px solid #ddd;
}

.ms-login {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 380px;
    margin: -190px 0 0 -175px;
    border-radius: 5px;
    background: rgba(255, 255, 255, 0.3);
    overflow: hidden;
}

.ms-content {
    padding: 30px 30px;
}

.login-btn {
    text-align: center;
}

.login-btn button {
    width: 100%;
    height: 36px;
    margin-bottom: 10px;
}

.login-tips {
    font-size: 12px;
    line-height: 30px;
    color: #fff;
}
</style>
