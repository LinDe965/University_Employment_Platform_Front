<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i> 学生管理表
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">

                <el-input v-model="query.positionName" placeholder="职位名 " class="handle-input mr10"></el-input>
                <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
            </div>



            <el-table :data="studentInterviewData" border class="table" ref="multipleTable"
                      header-cell-class-name="table-header">
                <!--公司名称-->
                <el-table-column prop="companyName" align="center" label="公司名称"></el-table-column>
                <!--hr负责人-->
                <el-table-column prop="companyHrName" align="center" label="hr负责人"></el-table-column>
                <!--职位名称-->
                <el-table-column prop="positionName" align="center" label="职位名称"></el-table-column>
                <!--面试时间-->
                <el-table-column prop="interviewTime" align="center" label="面试时间"></el-table-column>
                <!--面试状态-->
                <el-table-column prop="interviewStatus" align="center" label="面试状态(hr)">
                    <template #default="scope">
                        <el-tag :type="
                                     scope.row.interviewStatus === 1
                                     ? 'success'
                                     : scope.row.interviewStatus === 0
                                     ? 'danger'
                                     : 'danger'
                                     "
                                v-text="state(scope.row)"
                        ></el-tag>
                    </template>
                </el-table-column>
                <el-table-column prop="interviewStudentStatus" align="center" label="是否面试(stu)">
                    <template #default="scope">
                        <el-tag :type="
                                     scope.row.interviewStudentStatus === 1
                                     ? 'success'
                                     : scope.row.interviewStudentStatus === 0
                                     ? 'danger'
                                     : 'danger'
                                     "
                                v-text="state1(scope.row)"
                        ></el-tag>
                    </template>
                </el-table-column>


                <el-table-column label="操作" width="180" align="center">
                    <template #default="scope">
                        <el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row)">编辑
                        </el-button>
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
        <el-dialog title="编辑" v-model="editVisible" width="30%">
            <el-switch
                v-model="form.interviewStudentStatus"
                active-color="#13ce66"
                inactive-color="#ff4949"
                active-text="接受面试"
                inactive-text="不接受面试"
                :active-value="1"
                :inactive-value="0"
            >
            </el-switch>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="editVisible = false">取 消</el-button>
                    <el-button type="primary" @click="saveEdit">确 定</el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>

<script>
import {ref, reactive} from "vue";
import {ElMessage, ElMessageBox} from "element-plus";
import {
    fetchStudentInterviewLikeByStudent,

    fetchUpdateInterviewStudentStatusByStudent,
    getStudentInterviewByStudentId
} from "../../api/index";
import Cookies from "js-cookie";

export default {
    name: "StudentInterviewManagement"
    ,
    methods: {
        state(row) {
            let user_state = row.interviewStatus;
            if (user_state === 1) {
                return '允许面试'
            } else {
                return '未允许面试'
            }
        },
        state1(row) {
            let user_state = row.interviewStudentStatus;
            if (user_state === 1) {
                return '接受面试'
            } else {
                return '未接受面试'
            }
        }
    },
    setup() {
        const query = reactive({
            companyName: '',
            companyHrName: '',
            positionName: '',
            interviewStudentStatus: '',
            interviewTime: '',

            studentId:Cookies.get("studentId"),
            studentName: '',
            studentSex: '',
            studentAge: '',
            studentTel: '',
            studentIdCards: '',
            studentDepartment: '',
            studentSubject: '',
            studentEndYear: '',
            pageIndex: 1,
            pageSize: 10,
        });
        const studentInterviewData = ref([]);
        const pageTotal = ref(0);

        // 获取表格数据
        const getData = () => {
            const studentId = Cookies.get("studentId");
            getStudentInterviewByStudentId(studentId).then((res) => {
                console.log(res.data);
                studentInterviewData.value = res.data;
                //pageTotal.value = res.pageTotal || 50;
            });
        };
        getData();

        // 查询操作
        const handleSearch = () => {
            fetchStudentInterviewLikeByStudent(query).then((res) => {
                console.log(res.data);
                studentInterviewData.value = res.data;
            });
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
                    studentInterviewData.value.splice(index, 1);
                })
                .catch(() => {
                });
        };

        // 表格编辑时弹窗和保存
        const editVisible = ref(false);
        let form = reactive({
            interviewId:'',
            interviewStudentStatus:0,
        });
        let idx = -1;
        const handleEdit = (index, row) => {
            idx = index;
            Object.keys(form).forEach((item) => {
                form[item] = row[item];
            });
            editVisible.value = true;
        };
        const saveEdit = () => {
            ElMessageBox.confirm("确定要通过吗？", "提示", {type: "warning",}).then(()=>{
                fetchUpdateInterviewStudentStatusByStudent(form).then((res) => {
                    console.log(res)
                    if (res.code == 20031) {
                        ElMessage.success(`修改第 ${idx + 1} 行成功`);
                        Object.keys(form).forEach((item) => {
                            studentInterviewData.value[idx][item] = form[item];
                        });
                        getData();
                    } else {
                        ElMessage.error(`修改失败`)
                    }
                })
            })
            editVisible.value = false;
        };

        //添加功能实现
        const addStudentDetailInformationDialog = ref(false);

        const addStudentDetailInformationForm = reactive({
            companyName: '',
            companyHrName: '',
            positionName: '',
            interviewStudentStatus: '',
            interviewTime: '',

            studentId: '',
            studentName: '',
            studentSex: '',
            studentAge: '',
            studentTel: '',
            studentIdCards: '',
            studentDepartment: '',
            studentSubject: '',
            studentEndYear: '',

        })

        const addStudentDetailInformationFormEvent = () => {

            //关闭弹窗
            addStudentDetailInformationDialog.value = false;
        }


        return {
            query,
            studentInterviewData,
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
            addStudentDetailInformationFormEvent
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
