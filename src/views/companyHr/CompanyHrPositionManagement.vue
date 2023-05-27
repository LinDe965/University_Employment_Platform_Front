<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i> 职位管理表
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">

                <el-input v-model="query.positionName" placeholder="职位名称" class="handle-input mr10"></el-input>
                <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
                <!--添加学生信息-->
                <el-button type="primary" @click="addPositionDialog = true" style="float: right">
                    职位信息添加
                </el-button>
                <el-dialog v-model="addPositionDialog" :visible.sync="addPositionDialog"
                           title="职位信息添加">
                    <el-form label-width="70px">
                        <el-form-item label="职位名称">
                            <el-input v-model="addPositionForm.positionName"></el-input>
                        </el-form-item>
                        <el-form-item label="招聘人数">
                            <el-input-number v-model="addPositionForm.positionRecruitNumber" :min="1"
                                             :max="100"></el-input-number>
                        </el-form-item>
                        <el-form-item label="职位薪资">
                            <el-input v-model="addPositionForm.positionSalary"></el-input>
                        </el-form-item>
                        <el-form-item label="职位要求">
                            <el-input v-model="addPositionForm.positionRequire"></el-input>
                        </el-form-item>
                    </el-form>
                    <template #footer>
                <span class="dialog-footer">
                    <el-button @click="addPositionDialog = false">取 消</el-button>
                    <el-button type="primary" @click="addPositionFormEvent">确 定</el-button>
                </span>
                    </template>
                </el-dialog>
            </div>

            <el-table :data="positionData" border class="table" ref="multipleTable"
                      header-cell-class-name="table-header">
                <!--职位名称-->
                <el-table-column prop="positionName" label="职位名称" align="center"
                                 class-name="positionName"></el-table-column>
                <!--招聘人数-->
                <el-table-column prop="positionRecruitNumber" align="center" label="招聘人数"
                                 class-name="positionRecruitNumber"></el-table-column>
                <!--职位薪资-->
                <el-table-column prop="positionSalary" align="center" label="职位薪资"></el-table-column>
                <!--职位要求-->
                <el-table-column prop="positionRequire" align="center" label="职位要求">
                    <template #default="scope">
                        <el-tooltip class="item" effect="dark" :content="scope.row.positionRequire"
                                    placement="top-start">
                            <span>{{ scope.row.positionRequire.substring(0, 50) }}...</span>
                        </el-tooltip>
                    </template>
                </el-table-column>
                <!--发布时间-->
                <el-table-column prop="positionCreateTime" align="center" label="发布时间"></el-table-column>
                <el-table-column prop="deleted" align="center" label="上架状态">
                    <template #default="scope">
                        <el-tag :type="
                                     scope.row.enable === 1
                                     ? 'success'
                                     : scope.row.enable === 0
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
            <el-form label-width="70px">
                <el-form-item label="职位名称">
                    <el-input v-model="form.positionName"></el-input>
                </el-form-item>
                <el-form-item label="招聘人数">
                    <el-input v-model="form.positionRecruitNumber"></el-input>
                </el-form-item>
                <el-form-item label="职位薪资">
                    <el-input v-model="form.positionSalary"></el-input>
                </el-form-item>
                <el-form-item label="职位要求">
                    <el-input v-model="form.positionRequire"></el-input>
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
import {
    fetchDeletePositionByCompanyHr, fetchPositionLikeByHr,
    fetchSavePositionByCompanyHr,
    fetchUpdatePositionByCompanyHr,
    getByHrIdPositionInformation
} from "../../api/index";
import Cookies from "js-cookie";

export default {
    name: "CompanyHrPositionManagement",
    methods: {
        state(row) {
            let user_state = row.enable;
            if (user_state === 1) {
                return '已上架'
            } else {
                return '已下架'
            }
        }
    },
    setup() {
        const query = reactive({
            positionName: '',
            positionRecruitNumber: '',
            positionSalary: '',
            positionRequire: '',
            positionCreateTime: '',
            enable:'',
            deleted:0,
            pageIndex: 1,
            // pageSize: 10,
        });
        const positionData = ref([]);
        const pageTotal = ref(0);


        // 获取表格数据
        const getData = () => {
            const companyHrId = Cookies.get("companyHrId");
            getByHrIdPositionInformation(companyHrId).then((res) => {
                console.log(res);
                positionData.value = res.data;
                //pageTotal.value = res.pageTotal || 50;
            });
        };
        getData();

        // 查询操作
        const handleSearch = () => {
            fetchPositionLikeByHr(query).then((res) =>{
                console.log(res.data);
                positionData.value = res.data;
            })
            //getData();
        };
        // 分页导航
        const handlePageChange = (val) => {
            query.pageIndex = val;
            getData();x
        };

        // 删除操作
        const handleDelete = (index,row) => {
            // 二次确认删除
            ElMessageBox.confirm("确定要删除吗？", "提示", {type: "warning",}).then(() => {
                console.log(row.positionId)
                    fetchDeletePositionByCompanyHr(row.positionId).then((res)=>{
                        console.log(res)
                        if (res.code == 20021) {
                            ElMessage.success("删除成功");
                            positionData.value.splice(index, 1);
                                getData();
                        } else {
                            ElMessage.error(`删除失败`)
                        }
                    })

                })
                .catch(() => {

                });
        };

        // 表格编辑时弹窗和保存
        const editVisible = ref(false);
        let form = reactive({
            positionId:'',
            positionName: '',
            positionRecruitNumber: '',
            positionSalary: '',
            positionRequire: '',
        });
        let idx = -1;
        const handleEdit = (index, row) => {
            console.log(row.positionId)
            idx = index;
            Object.keys(form).forEach((item) => {
                form[item] = row[item];
            });
            editVisible.value = true;
        };
        const saveEdit = () => {
            ElMessageBox.confirm("确定要修改吗？", "提示", {type: "warning",}).then(()=>{
                fetchUpdatePositionByCompanyHr(form).then((res)=>{
                    console.log(res)
                    if (res.code == 20031) {
                        ElMessage.success(`修改第 ${idx + 1} 行成功`);
                        Object.keys(form).forEach((item) => {
                            positionData.value[idx][item] = form[item];
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
        const addPositionDialog = ref(false);

        const addPositionForm = reactive({
            positionName: '',
            positionRecruitNumber: 1,
            positionSalary: '',
            positionRequire: '',
            companyHrId: Cookies.get("companyHrId")
        })

        const addPositionFormEvent = () => {
            ElMessageBox.confirm("确定要添加吗？", "提示", {type: "warning",}).then(() => {
                fetchSavePositionByCompanyHr(addPositionForm).then((res) => {
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
            addPositionDialog.value = false;
        }




        return {
            query,
            positionData,
            pageTotal,
            editVisible,
            form,
            handleSearch,
            handlePageChange,
            handleDelete,
            handleEdit,
            saveEdit,
            addPositionDialog,
            addPositionForm,
            addPositionFormEvent
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
