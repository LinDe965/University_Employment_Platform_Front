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

                <el-input v-model="query.studentName" placeholder="用户名" class="handle-input mr10"></el-input>
                <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
            </div>

            <el-table :data="studentData" border class="table" ref="multipleTable"
                      header-cell-class-name="table-header">
                <!--学生学号-->
                <el-table-column prop="studentId" label="学生学号" align="center"
                                 class-name="studentId"></el-table-column>
                <!--学生姓名-->
                <el-table-column prop="studentName" align="center" label="学生姓名" class-name="studentName"></el-table-column>
                <!--学生性别-->
                <el-table-column prop="studentSex" align="center" label="学生性别"></el-table-column>
                <!--学生年龄-->
                <el-table-column prop="studentAge" align="center" label="学生年龄"></el-table-column>
                <!--学生联系方式-->
                <el-table-column prop="studentTel" align="center" label="联系方式"></el-table-column>
                <!--学生身份证号-->
                <el-table-column prop="studentIdCards" align="center" label="身份证号"></el-table-column>
                <!--学生所在院系-->
                <el-table-column prop="studentDepartment" align="center" label="所在院系"></el-table-column>
                <!--学生所在专业-->
                <el-table-column prop="studentSubject" align="center" label="所在专业"></el-table-column>
                <!--学生毕业年份-->
                <el-table-column prop="studentEndYear" align="center" label="毕业年份"></el-table-column>

                <el-table-column prop="deleted" align="center" label="用户状态">
                    <template #default="scope">
                        <el-tag :type="
                                     scope.row.deleted === 0
                                     ? 'success'
                                     : scope.row.deleted === 1
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
        <el-dialog title="编辑" v-model="editVisible" width="40%">
            <el-form label-width="70px">
                <el-form-item label="学生姓名">
                    <el-input v-model="form.studentName"></el-input>
                </el-form-item>
                <el-form-item label="学生年龄">
                    <el-input v-model="form.studentAge"></el-input>
                </el-form-item>
                <el-form-item label="联系方式">
                    <el-input v-model="form.studentTel"></el-input>
                </el-form-item>

                <el-form-item label="所在院系">
                    <el-input v-model="form.studentDepartment"></el-input>
                </el-form-item>
                <el-form-item label="所在专业">
                    <el-input v-model="form.studentSubject"></el-input>
                </el-form-item>
                <el-form-item label="毕业年份">
                    <el-date-picker
                        v-model="form.studentEndYear"
                        type="year"
                        placeholder="选择年">
                    </el-date-picker>
<!--                    <el-input v-model="form.studentEndYear"></el-input>-->
                </el-form-item>
                <el-switch
                    v-model="form.deleted"
                    inactive-color="#13ce66"
                    active-color="#ff4949"
                    active-text="启用"
                    inactive-text="禁用"
                    :active-value="0"
                    inactive-value="1"
                >
                </el-switch>

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
    fetchStudentByStudentName,
    fetchStudentsDetailData, fetchUpdateStudentsInformationByAdmin,

} from "../../api/index";

export default {
    name: "adminStudentManagement",
    methods: {
        state(row) {
            let user_state = row.deleted;
            if (user_state === 0) {
                return '启用'
            } else {
                return '禁用'
            }
        }
    },
    setup() {
        const query = reactive({
            studentId: '',
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
        const studentData = ref([]);
        const pageTotal = ref(0);

        // 获取表格数据
        const getData = () => {
            fetchStudentsDetailData(query).then((res) => {
                console.log(res.data);
                studentData.value = res.data;
                //pageTotal.value = res.pageTotal || 50;
            });
        };
        getData();

        // 查询操作
        const handleSearch = () => {
            fetchStudentByStudentName(query).then((res) =>{
                console.log(res.data);
                studentData.value = res.data;
            })

            // query.pageIndex = 1;
            // getData();
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
            studentId: '',
            studentName: '',
            studentSex: '',
            studentAge: '',
            studentTel: '',
            studentIdCards: '',
            studentDepartment: '',
            studentSubject: '',
            studentEndYear: '',
            deleted:0
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
            ElMessageBox.confirm("确定要修改吗？", "提示", {type: "warning",}).then(()=>{
                fetchUpdateStudentsInformationByAdmin(form).then((res) => {
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
