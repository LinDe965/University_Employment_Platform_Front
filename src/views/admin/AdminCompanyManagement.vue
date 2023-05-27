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

                <el-input v-model="query.companyName" placeholder="用户名" class="handle-input mr10"></el-input>
                <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
                <!--添加学生信息-->
                <el-button type="primary" @click="addCompanyInformationDialog = true" style="float: right">
                    学生信息添加
                </el-button>
                <el-dialog v-model="addCompanyInformationDialog" :visible.sync="addCompanyInformationDialog"
                           title="学生信息添加">
                    <el-form label-width="70px">
                        <el-form-item label="公司名字">
                            <el-input v-model="addCompanyInformationForm.companyName"></el-input>
                        </el-form-item>
                        <el-form-item label="公司地址">
                            <el-input v-model="addCompanyInformationForm.companyAddress"></el-input>
                        </el-form-item>
                        <el-form-item label="业务类型">
                            <el-input v-model="addCompanyInformationForm.companyIndustry"></el-input>
                        </el-form-item>
                        <el-form-item label="公司简介">
                            <el-input v-model="addCompanyInformationForm.companyIntroduction"></el-input>
                        </el-form-item>
                        <el-form-item label="公司详情">
                            <el-input v-model="addCompanyInformationForm.companyDetail"></el-input>
                        </el-form-item>
                    </el-form>
                    <template #footer>
                <span class="dialog-footer">
                    <el-button @click="addCompanyInformationDialog = false">取 消</el-button>
                    <el-button type="primary" @click="addCompanyInformationFormEvent">确 定</el-button>
                </span>
                    </template>
                </el-dialog>
            </div>

            <el-table :data="studentData" border class="table" ref="multipleTable"
                      header-cell-class-name="table-header">

                <!--公司名字-->
                <el-table-column prop="companyName" align="center" label="公司名字"></el-table-column>
                <!--公司地址-->
                <el-table-column prop="companyAddress" align="center" label="公司地址"></el-table-column>
                <!--业务类型-->
                <el-table-column prop="companyIndustry" align="center" label="业务类型"></el-table-column>
                <!--公司简介-->
                <el-table-column prop="companyIntroduction" align="center" label="公司简介">
                    <template #default="scope">
                        <el-tooltip class="item" effect="dark" :content="scope.row.companyIntroduction" placement="top-start">
                            <span>{{ scope.row.companyIntroduction.substring(0, 20) }}...</span>
                        </el-tooltip>
                    </template>
                </el-table-column>
                <!--公司详情-->
                <el-table-column prop="companyDetail" align="center" label="公司详情">
                    <template #default="scope">
                        <el-tooltip class="item" effect="dark" :content="scope.row.companyIntroduction" placement="top-start">
                            <span>{{ scope.row.companyIntroduction.substring(0, 50) }}...</span>
                        </el-tooltip>
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
            <el-form label-width="70px">
                <el-form-item label="公司名字">
                    <el-input v-model="form.companyName"></el-input>
                </el-form-item>
                <el-form-item label="公司地址">
                    <el-input v-model="form.companyAddress"></el-input>
                </el-form-item>
                <el-form-item label="业务类型">
                    <el-input v-model="form.companyIndustry"></el-input>
                </el-form-item>
                <el-form-item label="公司简介">
                    <el-input type="textarea" v-model="form.companyIntroduction"></el-input>
                </el-form-item>
                <el-form-item label="公司详情">
                    <el-input type="textarea" v-model="form.companyDetail"></el-input>
                </el-form-item>
            </el-form>
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
import {getCompanyAllByAdmin} from "../../api/index";

export default {
    name: "adminStudentManagement",
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
            companyName: '',
            companyAddress: '',
            companyIndustry: '',
            companyIntroduction: '',
            companyDetail: '',
            pageIndex: 1,
            pageSize: 10,
        });
        const studentData = ref([]);
        const pageTotal = ref(0);

        // 获取表格数据
        const getData = () => {
            getCompanyAllByAdmin(query).then((res) => {
                console.log(res.data);
                studentData.value = res.data;
                //pageTotal.value = res.pageTotal || 50;
            });
        };
        getData();

        // 查询操作
        const handleSearch = () => {
            query.pageIndex = 1;
            getData();
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
            companyName: '',
            companyAddress: '',
            companyIndustry: '',
            companyIntroduction: '',
            companyDetail: '',
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
                studentData.value[idx][item] = form[item];
            });
        };

        //添加功能实现
        const addCompanyInformationDialog = ref(false);

        const addCompanyInformationForm = reactive({
            companyName: '',
            companyAddress: '',
            companyIndustry: '',
            companyIntroduction: '',
            companyDetail: '',

        })

        const addCompanyInformationFormEvent = () => {

            //关闭弹窗
            addCompanyInformationDialog.value = false;
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
            addCompanyInformationDialog,
            addCompanyInformationForm,
            addCompanyInformationFormEvent
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
