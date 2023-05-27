<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i> 学生投递表
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">

                <el-input v-model="query.studentName" placeholder="用户名" class="handle-input mr10"></el-input>
                <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
            </div>

            <el-table :data="studentDeliverData" border class="table" ref="multipleTable"
                      header-cell-class-name="table-header">
                <!--学生姓名-->
                <el-table-column prop="studentName" align="center" label="学生姓名"></el-table-column>
                <!--所在专业-->
                <el-table-column prop="studentSubject" align="center" label="所在专业"></el-table-column>
                <!--投递岗位-->
                <el-table-column prop="positionName" align="center" label="投递岗位"></el-table-column>
                <!--投递时间-->
                <el-table-column prop="deliverTime" align="center" label="投递时间"></el-table-column>

                <!--                <el-table-column label="可售" align="center">-->

                <!--                </el-table-column>-->

                <!--投递状态-->
                <el-table-column prop="deliverStatus" align="center" label="投递状态">
                    <template #default="scope">
                        <el-tag :type="
                                     scope.row.deliverStatus === 1
                                     ? 'success'
                                     : scope.row.deliverStatus === 0
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
        <el-dialog title="编辑" v-model="editVisible" width="30%">
            <el-switch
                    v-model="form.deliverStatus"
                    active-color="#13ce66"
                    inactive-color="#ff4949"
                    active-text="通过"
                    inactive-text="未通过"
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
    fetchDeliverLikeByHr,
    fetchUpdateDeliverStatusByCompanyHr,
    getByHrIdStudentDeliver
} from "../../api/index";
import Cookies from "js-cookie";

export default {
    name: "CompanyHrStudentDeliverManagement",
    methods: {
        state(row) {
            let user_state = row.deliverStatus;
            if (user_state === 1) {
                return '通过'
            } else {
                return '未通过'
            }
        }
    },
    setup() {
        const query = reactive({
            companyHrId:Cookies.get("companyHrId"),
            studentName: '',
            studentSubject: '',
            positionName: '',
            deliverTime: '',
            deliverStatus: 0,
            pageIndex: 1,
            pageSize: 10,
        });
        const studentDeliverData = ref([]);
        const pageTotal = ref(0);

        // 获取表格数据
        const getData = () => {
            const companyHrId = Cookies.get("companyHrId");
            getByHrIdStudentDeliver(companyHrId).then((res) => {
                console.log(res.data);
                studentDeliverData.value = res.data;
                //pageTotal.value = res.pageTotal || 50;
            });
        };
        getData();

        // 查询操作
        const handleSearch = () => {
            fetchDeliverLikeByHr(query).then((res) =>{
                console.log(res.data);
                studentDeliverData.value = res.data;
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
                    studentDeliverData.value.splice(index, 1);
                })
                .catch(() => {
                });
        };

        // 表格编辑时弹窗和保存
        const editVisible = ref(false);
        let form = reactive({
            deliverId: '',
            deliverStatus: 0,
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
            ElMessageBox.confirm("确定要通过吗？", "提示", {type: "warning",}).then(() => {
                fetchUpdateDeliverStatusByCompanyHr(form).then((res) => {
                    console.log(res)
                    if (res.code == 20031) {
                        ElMessage.success(`修改第 ${idx + 1} 行成功`);
                        Object.keys(form).forEach((item) => {
                            studentDeliverData.value[idx][item] = form[item];
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
            studentName: '',
            studentSubject: '',
            positionName: '',
            deliverTime: '',
            deliverStatus: '',
        })

        const addStudentDetailInformationFormEvent = () => {

            //关闭弹窗
            addStudentDetailInformationDialog.value = false;
        }


        return {
            query,
            studentDeliverData,
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
