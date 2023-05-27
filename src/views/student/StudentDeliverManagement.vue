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

                <el-input v-model="query.positionName" placeholder="职位名" class="handle-input mr10"></el-input>
                <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
            </div>

            <el-table :data="studentDeliverData" border class="table" ref="multipleTable"
                      header-cell-class-name="table-header">
                <!--公司名称-->
                <el-table-column prop="companyName" align="center" label="公司名称"></el-table-column>
                <!--职位名称-->
                <el-table-column prop="positionName" align="center" label="职位名称"></el-table-column>
                <!--投递时间-->
                <el-table-column prop="deliverTime" align="center" label="投递时间"></el-table-column>
                <!--投递状态-->
                <el-table-column prop="deliverStatus" align="center" label="投递状态">
                    <template #default="scope">
                        <el-tag :type="
                                     scope.row.deliverStatus === true
                                     ? 'success'
                                     : scope.row.deliverStatus === false
                                     ? 'danger'
                                     : 'danger'
                                     "
                                v-text="state(scope.row)"
                        ></el-tag>
                    </template>
                </el-table-column>

<!--                <el-table-column label="操作" width="180" align="center">-->
<!--                    <template #default="scope">-->
<!--                        <el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row)">编辑-->
<!--                        </el-button>-->
<!--                        <el-button type="text" icon="el-icon-delete" class="red"-->
<!--                                   @click="handleDelete(scope.$index, scope.row)">删除-->
<!--                        </el-button>-->
<!--                    </template>-->
<!--                </el-table-column>-->
            </el-table>

<!--            <div class="pagination">-->
<!--                <el-pagination background layout="total, prev, pager, next" :current-page="query.pageIndex"-->
<!--                               :page-size="query.pageSize" :total="pageTotal"-->
<!--                               @current-change="handlePageChange"></el-pagination>-->
<!--            </div>-->
        </div>
    </div>
</template>

<script>
import {ref, reactive} from "vue";
import {ElMessage, ElMessageBox} from "element-plus";
import {fetchStudentDeliverLikeByStudent, getStudentDeliverByStudentId} from "../../api/index";
import Cookies from "js-cookie";

export default {
    name: "StudentDeliverManagement",
    methods: {
        state(row) {
            let user_state = row.deliverStatus;
            if (user_state === true) {
                return '通过'
            } else {
                return '未通过'
            }
        }
    },
    setup() {
        const query = reactive({
            studentId:Cookies.get("studentId"),
            companyName: '',
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
            const studentId = Cookies.get("studentId");
            getStudentDeliverByStudentId(studentId).then((res) => {
                console.log(res.data);
                studentDeliverData.value = res.data;
                //pageTotal.value = res.pageTotal || 50;
            });
        };
        getData();

        // 查询操作
        const handleSearch = () => {
            fetchStudentDeliverLikeByStudent(query).then((res) =>{
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
            companyName: '',
            positionName: '',
            deliverTime: '',
            deliverStatus: '',
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
            editVisible.value = false;
            ElMessage.success(`修改第 ${idx + 1} 行成功`);
            Object.keys(form).forEach((item) => {
                studentDeliverData.value[idx][item] = form[item];
            });
        };

        //添加功能实现
        const addStudentDetailInformationDialog = ref(false);

        const addStudentDetailInformationForm = reactive({
            companyName: '',
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
