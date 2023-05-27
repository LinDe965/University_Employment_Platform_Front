<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i> 学生简历表
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">

                <el-input v-model="query.studentName" placeholder="用户名" class="handle-input mr10"></el-input>
                <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
            </div>

            <el-table :data="studentResumeData" border class="table" ref="multipleTable"
                      header-cell-class-name="table-header">
                <!--姓名-->
                <el-table-column prop="studentName" align="center" label="姓名" class-name="studentName"></el-table-column>
                <!--联系方式-->
                <el-table-column prop="studentTel" align="center" label="联系方式"></el-table-column>
                <!--邮箱-->
                <el-table-column prop="studentEmail" align="center" label="邮箱"></el-table-column>
                <!--专业-->
                <el-table-column prop="studentSubject" align="center" label="专业"></el-table-column>
                <!--毕业年份-->
                <el-table-column prop="studentEndYear" align="center" label="毕业年份"></el-table-column>
                <!--个人经验-->
                <el-table-column prop="resumeExperience" align="center" label="个人经验">
                    <template #default="scope">
                        <el-tooltip class="item" effect="dark" :content="scope.row.resumeExperience" placement="top-start">
                            <span>{{scope.row.resumeExperience.substring(0,10)}}...</span>
                        </el-tooltip>
                    </template>
                </el-table-column>
                <!--个人技能-->
                <el-table-column prop="resumeSkills" align="center" label="个人技能">
                    <template #default="scope">
                        <el-tooltip class="item" effect="dark" :content="scope.row.resumeSkills" placement="top-start">
                            <span>{{scope.row.resumeSkills.substring(0,10)}}...</span>
                        </el-tooltip>
                    </template>
                </el-table-column>
                <!--自我评价-->
                <el-table-column prop="resumeEvaluation" align="center" label="自我评价">
                    <template #default="scope">
                        <el-tooltip class="item" effect="dark" :content="scope.row.resumeEvaluation" placement="top-start">
                            <span>{{scope.row.resumeEvaluation.substring(0,10)}}...</span>
                        </el-tooltip>
                    </template>
                </el-table-column>
                <!--期望薪资-->
                <el-table-column prop="resumeSalaryExpectation" align="center" label="期望薪资"></el-table-column>

                <el-table-column label="查看详情" width="180" align="center">
                    <template #default="scope">
                        <el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row)">查看
                        </el-button>
<!--                        <el-button type="text" icon="el-icon-delete" class="red"-->
<!--                                   @click="handleDelete(scope.$index, scope.row)">删除-->
<!--                        </el-button>-->
                    </template>
                </el-table-column>
            </el-table>

<!--            <div class="pagination">-->
<!--                <el-pagination background layout="total, prev, pager, next" :current-page="query.pageIndex"-->
<!--                               :page-size="query.pageSize" :total="pageTotal"-->
<!--                               @current-change="handlePageChange"></el-pagination>-->
<!--            </div>-->
        </div>

        <!-- 编辑弹出框 -->
        <el-dialog title="简历详情" v-model="editVisible" width="30%">
            <el-descriptions column="1">
                <el-descriptions-item label="姓名：">{{resumeList.studentName}}</el-descriptions-item>
                <el-descriptions-item label="性别：">{{resumeList.studentSex}}</el-descriptions-item>
                <el-descriptions-item label="年龄：">{{resumeList.studentAge}}</el-descriptions-item>
                <el-descriptions-item label="电话：">{{resumeList.studentTel}}</el-descriptions-item>
                <el-descriptions-item label="邮箱：">{{resumeList.studentEmail}}</el-descriptions-item>
                <el-descriptions-item label="所在院：">{{resumeList.studentDepartment}}</el-descriptions-item>
                <el-descriptions-item label="所在系：">{{resumeList.studentSubject}}</el-descriptions-item>
                <el-descriptions-item label="身份证号：">{{resumeList.studentIdCards}}</el-descriptions-item>
                <el-descriptions-item label="毕业年份：">{{resumeList.studentEndYear}}</el-descriptions-item>
                <el-descriptions-item label="个人经历：">{{resumeList.resumeExperience}}</el-descriptions-item>
                <el-descriptions-item label="个人技能：">{{resumeList.resumeSkills}}</el-descriptions-item>
                <el-descriptions-item label="自我评价：">{{resumeList.resumeEvaluation}}</el-descriptions-item>
                <el-descriptions-item label="期望薪资：">{{resumeList.resumeSalaryExpectation}}</el-descriptions-item>
            </el-descriptions>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="editVisible = false">取 消</el-button>
                    <el-button type="primary">确 定</el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>

<script>
import {ref, reactive} from "vue";
import {ElMessage, ElMessageBox} from "element-plus";
import {fetchStudentResumeLikeByHr, getByHrIdStudentResumes, getStudentResumesByStudentId} from "../../api/index";
import Cookies from "js-cookie";

export default {
    name: "CompanyHrResumeManagement",
    methods: {
        state(row) {
            let user_state = row.enable;
            if (user_state === true) {
                return '正常'
            } else {
                return '拉黑'
            }
        }
    },
    setup() {
        const query = reactive({
            companyHrId:Cookies.get("companyHrId"),
            studentName: '',
            studentTel: '',
            studentDepartment: '',
            studentSubject: '',
            studentEndYear: '',
            resumeExperience: '',
            resumeSkills: '',
            resumeEvaluation: '',
            resumeSalaryExpectation:'',
            pageIndex: 1,
            pageSize: 10,
        });
        const studentResumeData = ref([]);
        const pageTotal = ref(0);

        // 获取表格数据
        const getData = () => {
            const companyHrId = Cookies.get("companyHrId");
            getByHrIdStudentResumes(companyHrId).then((res) => {
                console.log(res.data);
                studentResumeData.value = res.data;
                //pageTotal.value = res.pageTotal || 50;
            });
        };
        getData();

        // 查询操作
        const handleSearch = () => {
            fetchStudentResumeLikeByHr(query).then((res) =>{
                console.log(res.data);
                studentResumeData.value = res.data;
            })
        };
        // 分页导航
        const handlePageChange = (val) => {
            query.pageIndex = val;
            getData();
        };

        // 删除操作
        const handleDelete = (index) => {
            // 二次确认删除
            ElMessageBox.confirm("确定要删除吗？", "提示", {
                type: "warning",
            })
                .then(() => {
                    ElMessage.success("删除成功");
                    studentResumeData.value.splice(index, 1);
                })
                .catch(() => {
                });
        };

        // 表格编辑时弹窗和保存
        const editVisible = ref(false);
        let form = reactive({
            studentName: '',
            studentTel: '',
            studentEmail: '',
            // studentSex: '',
            // studentAge: '',
            // studentIdCards: '',
            // studentDepartment: '',
            studentSubject: '',
            studentEndYear: '',
            resumeExperience: '',
            resumeSkills: '',
            resumeEvaluation: '',
            resumeSalaryExpectation:'',
        });
        let idx = -1;


        //添加功能实现
        const addStudentDetailInformationDialog = ref(false);

        const addStudentDetailInformationForm = reactive({
            studentName: '',
            studentTel: '',
            studentEmail: '',
            // studentSex: '',
            // studentAge: '',
            // studentIdCards: '',
            studentDepartment: '',
            studentSubject: '',
            studentEndYear: '',
            resumeExperience: '',
            resumeSkills: '',
            resumeEvaluation: '',
            resumeSalaryExpectation:'',

        })

        const addStudentDetailInformationFormEvent = () => {

            //关闭弹窗
            addStudentDetailInformationDialog.value=false;
        }


        //查看
        const resumeList = ref({
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

        const handleEdit = (index, row) => {
            idx = index;
            console.log(row)
            getStudentResumesByStudentId(row.studentId).then((res)=>{
                console.log(res)
                resumeList.value = res.data
            })
            editVisible.value = true;
        };
        const saveEdit = () => {
            editVisible.value = false;
        };

        return {
            query,
            studentResumeData,
            pageTotal,
            editVisible,
            form,
            handleSearch,
            handlePageChange,
            handleDelete,
            handleEdit,
            saveEdit,
            addStudentDetailInformationDialog,
            addStudentDetailInformationForm,
            addStudentDetailInformationFormEvent,
            resumeList
        };
    },
};
</script>

<style scoped>
.handle-box {
    margin-bottom: 20px;
}

.handle-select {
    width: 120px;
}

.handle-input {
    width: 300px;
    display: inline-block;
}

.table {
    width: 100%;
    font-size: 14px;
}

.red {
    color: #ff0000;
}

.mr10 {
    margin-right: 10px;
}

.table-td-avatar {
    display: block;
    margin: auto;
    width: 40px;
    height: 40px;
}
</style>
