<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i> 职位信息管理
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <el-input v-model="query.positionName" placeholder="职位名称" class="handle-input mr10"></el-input>
                <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
            </div>

            <el-table :data="positionData" border class="table" ref="multipleTable"
                      header-cell-class-name="table-header">

                <!--公司名字-->
                <el-table-column prop="companyName" align="center" label="公司名字"></el-table-column>
                <!--hr名称-->
                <el-table-column prop="companyHrName" align="center" label="hr名称"></el-table-column>
                <!--职位名称-->
                <el-table-column prop="positionName" align="center" label="职位名称"></el-table-column>
                <!--招聘人数-->
                <el-table-column prop="positionRecruitNumber" align="center" label="招聘人数"></el-table-column>
                <!--招聘薪资-->
                <el-table-column prop="positionSalary" align="center" label="招聘薪资"></el-table-column>
                <!--公司简介-->
                <el-table-column prop="positionRequire" align="center" label="职位要求">
                    <template #default="scope">
                        <el-tooltip class="item" effect="dark" :content="scope.row.positionRequire" placement="top-start">
                            <span>{{ scope.row.positionRequire.substring(0, 50) }}...</span>
                        </el-tooltip>
                    </template>
                </el-table-column>
                <!--职位发布时间-->
                <el-table-column prop="positionCreateTime" align="center" label="职位发布时间"></el-table-column>
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
                v-model="form.enable"
                inactive-color="#13ce66"
                active-color="#ff4949"
                active-text="下架"
                inactive-text="上架"
                :active-value="0"
                inactive-value="1"
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
    fetchPositionLikeByAdmin,
    fetchUpdatePositionEnableByAdmin,
    getPositionByAdmin
} from "../../api/index";

export default {
    name: "adminPositionManagement",
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
            positionId:'',
            companyName: '',
            companyHrName: '',
            positionName: '',
            positionRecruitNumber: '',
            positionSalary: '',
            positionRequire: '',
            positionCreateTime: '',
            pageIndex: 1,
            pageSize: 10,
        });
        const positionData = ref([]);
        const pageTotal = ref(0);

        // 获取表格数据
        const getData = () => {
            getPositionByAdmin().then((res) => {
                console.log(res.data);
                positionData.value = res.data;
                //pageTotal.value = res.pageTotal || 50;
            });
        };
        getData();

        // 查询操作
        const handleSearch = () => {
            fetchPositionLikeByAdmin(query).then((res) =>{
                console.log(res.data);
                positionData.value = res.data;
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
                    positionData.value.splice(index, 1);
                })
                .catch(() => {
                });
        };

        // 表格编辑时弹窗和保存
        const editVisible = ref(false);
        let form = reactive({
            positionId:'',
            // companyName: '',
            // companyHrName: '',
            // positionName: '',
            // positionRecruitNumber: '',
            // positionSalary: '',
            // positionRequire: '',
            // positionCreateTime: '',
            enable:1
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
                fetchUpdatePositionEnableByAdmin(form).then((res) => {
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

