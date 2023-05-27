<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i> 签约管理表
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">

                <el-input v-model="query.studentName" placeholder="用户名" class="handle-input mr10"></el-input>
                <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
                <!--添加学生信息-->
                <el-button type="primary" @click="addStudentSigningDialog = true" style="float: right">
                    添加录用信息
                </el-button>
                <el-dialog v-model="addStudentSigningDialog" :visible.sync="addStudentSigningDialog"
                           title="添加录用信息">
                    <el-form label-width="70px">

                        <el-form-item label="学生姓名">
                            <el-input v-model="addStudentSigningForm.studentName"></el-input>
                        </el-form-item>
                        <el-form-item label="应聘职位">
                            <el-input v-model="addStudentSigningForm.positionName"></el-input>
                        </el-form-item>
                        <el-form-item label="签约地点">
                            <el-input v-model="addStudentSigningForm.signingAddress"></el-input>
                        </el-form-item>
                    </el-form>
                    <template #footer>
                <span class="dialog-footer">
                    <el-button @click="addStudentSigningDialog = false">取 消</el-button>
                    <el-button type="primary" @click="addStudentSigningFormEvent">确 定</el-button>
                </span>
                    </template>
                </el-dialog>
            </div>

            <el-table :data="studentData" border class="table" ref="multipleTable"
                      header-cell-class-name="table-header">

                <!--学生姓名-->
                <el-table-column prop="studentName" align="center" label="学生姓名" class-name="studentName"></el-table-column>
                <!--应聘职位-->
                <el-table-column prop="positionName" align="center" label="应聘职位"></el-table-column>
                <!--签约时间-->
                <el-table-column prop="signingAddress" align="center" label="签约地点"></el-table-column>
                <!--签约地点-->
                <el-table-column prop="signingTime" align="center" label="签约时间"></el-table-column>

                <el-table-column prop="signingStudentStatus" align="center" label="学生签约状态">
                    <template #default="scope">
                        <el-tag :type="
                                     scope.row.signingStudentStatus === 1
                                     ? 'success'
                                     : scope.row.signingStudentStatus === 0
                                     ? 'danger'
                                     : 'danger'
                                     "
                                v-text="state1(scope.row)"
                        ></el-tag>
                    </template>
                </el-table-column>

                <!--签约状态-->
                <el-table-column prop="signingStatus" align="center" label="hr签约状态">
                    <template #default="scope">
                        <el-tag :type="
                                     scope.row.signingStatus === 1
                                     ? 'success'
                                     : scope.row.signingStatus === 0
                                     ? 'danger'
                                     : 'danger'
                                     "
                                v-text="state(scope.row)"
                        ></el-tag>
                    </template>
                </el-table-column>



                <el-table-column label="操作" width="180" align="center">
                    <template #default="scope">
                        <el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row)">编辑
                        </el-button>
                        <el-button type="text" icon="el-icon-delete" class="red"
                                   @click="handleDelete(scope.$index, scope.row)">删除
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
                v-model="form.signingStatus"
                active-color="#13ce66"
                inactive-color="#ff4949"
                active-text="允许签约"
                inactive-text="拒绝签约"
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
    fetchSaveStudentSigningByHr, fetchStudentSigningLikeByHr,
    fetchUpdateSigningStatusByCompanyHr,
    getStudentSigningByHrId
} from "../../api/index";
import Cookies from "js-cookie";

export default {
    name: "CompanyHrSigningManagement",
    methods: {
        state(row) {
            let user_state = row.signingStatus;
            if (user_state === 1) {
                return '允许签约'
            } else {
                return '拒绝签约'
            }
        },
        state1(row) {
            let user_state = row.signingStudentStatus;
            if (user_state === 1) {
                return '接受签约'
            } else {
                return '拒绝签约'
            }
        },
    },
    setup() {
        const query = reactive({
            companyHrId:Cookies.get("companyHrId"),
            studentName: '',
            positionName: '',
            signingAddress: '',
            signingTime: '',
            signingStatus: 0,
            signingStudentStatus: 0,
            pageIndex: 1,
            pageSize: 10,
        });
        const studentData = ref([]);
        const pageTotal = ref(0);

        // 获取表格数据
        const getData = () => {
            const companyHrId = Cookies.get("companyHrId");
            getStudentSigningByHrId(companyHrId).then((res) => {
                console.log(res.data);
                studentData.value = res.data;
                //pageTotal.value = res.pageTotal || 50;
            });
        };
        getData();

        // 查询操作
        const handleSearch = () => {
            fetchStudentSigningLikeByHr(query).then((res) =>{
                console.log(res.data);
                studentData.value = res.data;
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
                    studentData.value.splice(index, 1);
                })
                .catch(() => {
                });
        };

        // 表格编辑时弹窗和保存
        const editVisible = ref(false);
        let form = reactive({
            signingId:'',
            signingStatus: 0,
            signingStudentStatus:0,
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
                fetchUpdateSigningStatusByCompanyHr(form).then((res) => {
                    console.log(res)
                    if (res.code == 20031) {
                        ElMessage.success(`修改第 ${idx + 1} 行成功`);
                        Object.keys(form).forEach((item) => {
                            studentData.value[idx][item] = form[item];
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
        const addStudentSigningDialog = ref(false);

        const addStudentSigningForm = reactive({
            studentName: '',
            positionName: '',
            signingAddress: '',
            companyHrId: Cookies.get("companyHrId")
        })

        const addStudentSigningFormEvent = () => {
            ElMessageBox.confirm("确定要添加吗？", "提示", {type: "warning",}).then(() => {
                console.log(addStudentSigningForm)
                fetchSaveStudentSigningByHr(addStudentSigningForm).then((res) => {
                    console.log(res)
                    if (res.code == 20011) {
                        ElMessage.success(`添加成功`);
                        getData();
                    } else {
                        ElMessage.error(`添加失败`)
                    }
                })
            })
            //关闭弹窗
            addStudentSigningDialog.value=false;
        }


        return {
            query,
            studentData,
            pageTotal,
            editVisible,
            form,
            handleSearch,
            handlePageChange,
            handleDelete,
            handleEdit,
            saveEdit,
            addStudentSigningDialog,
            addStudentSigningForm,
            addStudentSigningFormEvent
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
