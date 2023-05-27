<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-calendar"></i> 表单
                </el-breadcrumb-item>
                <el-breadcrumb-item>基本表单</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="form-box">
                <el-descriptions column="2">
                    <el-descriptions-item label="姓名：">{{ detailList.studentName }}</el-descriptions-item>
                    <el-descriptions-item label="性别：">{{ detailList.studentSex }}</el-descriptions-item>
                    <el-descriptions-item label="年龄：">{{ detailList.studentAge }}</el-descriptions-item>
                    <el-descriptions-item label="电话：">{{ detailList.studentTel }}</el-descriptions-item>
                    <el-descriptions-item label="邮箱：">{{ detailList.studentEmail }}</el-descriptions-item>
                    <el-descriptions-item label="身份证号：">{{ detailList.studentIdCards }}</el-descriptions-item>
                    <el-descriptions-item label="所在院校：">{{ detailList.studentDepartment }}</el-descriptions-item>
                    <el-descriptions-item label="所在专业：">{{ detailList.studentSubject }}</el-descriptions-item>
                    <el-descriptions-item label="毕业年份：">{{ detailList.studentEndYear }}</el-descriptions-item>
                </el-descriptions>
                <el-descriptions column="1">
                    <el-descriptions-item label="个人经历：">{{ detailList.resumeExperience }}</el-descriptions-item>
                    <el-descriptions-item label="个人技能：">{{ detailList.resumeSkills }}</el-descriptions-item>
                    <el-descriptions-item label="自我评价：">{{ detailList.resumeEvaluation }}</el-descriptions-item>
                    <el-descriptions-item label="期望薪资：">{{ detailList.resumeSalaryExpectation }}
                    </el-descriptions-item>
                </el-descriptions>

                <el-button type="primary" @click="editVisible = true">编辑信息</el-button>
                <!-- 编辑弹出框 -->
                <el-dialog title="修改简历" v-model="editVisible" width="30%">
                    <el-form>
                        <el-form-item label="个人经历">
                            <el-input type="textarea" v-model="form.resumeExperience"></el-input>
                        </el-form-item>
                        <el-form-item label="个人技能">
                            <el-input type="textarea" v-model="form.resumeSkills"></el-input>
                        </el-form-item>
                        <el-form-item label="自我评价">
                            <el-input type="textarea" v-model="form.resumeEvaluation"></el-input>
                        </el-form-item>
                        <el-form-item label="期望薪资">
                            <el-input v-model="form.resumeSalaryExpectation"></el-input>
                        </el-form-item>
                    </el-form>

                    <template #footer>
                <span class="dialog-footer">
                    <el-button @click="editVisible = false">取 消</el-button>
                    <el-button type="primary" @click="saveEdit">保 存</el-button>
                </span>
                    </template>
                </el-dialog>

            </div>
        </div>
    </div>
</template>

<script>
import {reactive, ref} from "vue";
import {ElMessage, ElMessageBox} from "element-plus";
import {

    fetchUpdateStudentResumeByStudent,
    getStudentResumesByStudentId
} from "../../api/index";
import Cookies from "js-cookie";

export default {
    name: "studentResumeManagement",
    setup() {
        const rules = {
            name: [
                {required: true, message: "请输入表单名称", trigger: "blur"},
            ],
        };
        const formRef = ref(null);
        const form = reactive({
            studentId:Cookies.get("studentId"),
            studentName: "",
            studentSex: "",
            studentAge: "",
            studentTel: "",
            studentEmail: "",
            studentIdCards: "",
            studentDepartment: "",
            studentSubject: "",
            studentEndYear: "",
            resumeExperience: "",
            resumeSkills: "",
            resumeEvaluation: "",
            resumeSalaryExpectation: ""
        });

        const detailList = ref({
            studentName: "",
            studentSex: "",
            studentAge: "",
            studentTel: "",
            studentEmail: "",
            studentIdCards: "",
            studentDepartment: "",
            studentSubject: "",
            studentEndYear: "",
            resumeExperience: "",
            resumeSkills: "",
            resumeEvaluation: "",
            resumeSalaryExpectation: ""
        })

        //获取表单信息
        const getData = () => {
            const studentId = Cookies.get("studentId");
            getStudentResumesByStudentId(studentId).then((res) => {
                console.log(res.data);
                detailList.value = res.data;
            })
        }
        getData();


        const editVisible = ref(false);
        const saveEdit = () => {
            ElMessageBox.confirm("确定要通过吗？", "提示", {type: "warning",}).then(()=>{
                fetchUpdateStudentResumeByStudent(form).then((res) => {
                    console.log(res)
                    if (res.code == 20031) {
                        ElMessage.success(`修改成功`);
                        getData();
                    } else {
                        ElMessage.error(`修改失败`)
                    }
                })
            })
            editVisible.value = false;
        };


        return {
            rules,
            formRef,
            form,
            getData,
            detailList,
            editVisible,
            saveEdit
        };
    },
};
</script>
