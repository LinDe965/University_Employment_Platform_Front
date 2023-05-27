<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i> 应聘信息管理表
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">

                <el-input v-model="query.studentName" placeholder="学生姓名" class="handle-input mr10"></el-input>
                <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
            </div>

            <el-table :data="studentEmployData" border class="table" ref="multipleTable"
                      header-cell-class-name="table-header">

                <!--姓名-->
                <el-table-column prop="studentName" align="center" label="姓名"></el-table-column>
                <!--联系方式-->
                <el-table-column prop="studentTel" align="center" label="联系方式"></el-table-column>
                <!--所在专业-->
                <el-table-column prop="studentSubject" align="center" label="所在专业"></el-table-column>
                <!--毕业年份-->
                <el-table-column prop="studentEndYear" align="center" label="毕业年份"></el-table-column>
                <!--公司名称-->
                <el-table-column prop="companyName" align="center" label="公司名称"></el-table-column>
                <!--公司类型-->
                <el-table-column prop="companyIndustry" align="center" label="公司类型"></el-table-column>
                <!--职位名称-->
                <el-table-column prop="positionName" align="center" label="职位名称"></el-table-column>

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
import {fetchStudentSigningLikeByAdmin, getStudentSigningByAdmin} from "../../api/index";

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
            studentName: '',
            studentTel: '',
            studentSubject: '',
            studentEndYear: '',
            companyName: '',
            companyIndustry: '',
            positionName: '',
            pageIndex: 1,
            pageSize: 10,
        });
        const studentEmployData = ref([]);
        const pageTotal = ref(0);

        // 获取表格数据
        const getData = () => {
            getStudentSigningByAdmin(query).then((res) => {
                console.log(res.data);
                studentEmployData.value = res.data;
                //pageTotal.value = res.pageTotal || 50;
            });
        };
        getData();

        // 查询操作
        const handleSearch = () => {
            fetchStudentSigningLikeByAdmin(query).then((res) =>{
                console.log(res.data);
                studentEmployData.value = res.data;
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
                    studentEmployData.value.splice(index, 1);
                })
                .catch(() => {
                });
        };

        // 表格编辑时弹窗和保存
        const editVisible = ref(false);
        let form = reactive({
            studentName: '',
            studentTel: '',
            studentSubject: '',
            studentEndYear: '',
            companyName: '',
            companyIndustry: '',
            positionName: '',
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
                studentEmployData.value[idx][item] = form[item];
            });
        };

        //添加功能实现
        const addCompanyInformationDialog = ref(false);

        const addCompanyInformationForm = reactive({
            studentName: '',
            studentTel: '',
            studentSubject: '',
            studentEndYear: '',
            companyName: '',
            companyIndustry: '',
            positionName: '',
        })

        const addCompanyInformationFormEvent = () => {

            //关闭弹窗
            addCompanyInformationDialog.value = false;
        }


        return {
            query,
            studentEmployData,
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
