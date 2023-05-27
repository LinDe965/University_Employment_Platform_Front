<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-lx-cascades"></i> 用户角色管理表
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <div class="handle-box">

        <el-input v-model="query.username" placeholder="用户名" class="handle-input mr10"></el-input>
        <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
      </div>

      <el-table :data="tableData" border class="table" ref="multipleTable" header-cell-class-name="table-header">
        <!--id用户-->
        <el-table-column prop="uid" label="用户ID"  align="center" class-name="uid">
          <template #default="scope">
            <el-tooltip class="item" effect="dark" :content="scope.row.uid" placement="top-start">
              <span>{{scope.row.uid.substring(0,10)}}...</span>
            </el-tooltip>
          </template>
        </el-table-column>
        <!--avatar头像-->
<!--        <el-table-column label="头像(查看大图)" align="center">-->
<!--          <template #default="scope">-->
<!--            <el-image class="table-td-avatar" :src="scope.row.avatar" :preview-src-list="[scope.row.avatar]">-->
<!--            </el-image>-->
<!--          </template>-->
<!--        </el-table-column>-->
        <!--username用户名-->
        <el-table-column prop="username" label="用户名" class-name="username"></el-table-column>
        <!--role用户角色-->
        <el-table-column prop="role" label="用户角色"></el-table-column>
        <!--tel用户电话-->
        <el-table-column prop="tel" label="电话"></el-table-column>
        <!--email邮箱-->
        <el-table-column prop="email" label="邮箱"></el-table-column>
        <!--enable用户启用-->
        <el-table-column label="用户启用" align="center">
          <template #default="scope">
            <el-tag :type="
                                scope.row.enable === true
                                    ? 'success'
                                    : scope.row.enable === false
                                    ? 'danger'
                                    : ''
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

      <div class="pagination">
        <el-pagination background layout="total, prev, pager, next" :current-page="query.pageIndex"
                       :page-size="query.pageSize" :total="pageTotal"
                       @current-change="handlePageChange"></el-pagination>
      </div>
    </div>

    <!-- 编辑弹出框 -->
    <el-dialog title="编辑" v-model="editVisible" width="30%">
      <el-form label-width="70px">
        <el-form-item label="用户名">
          <el-input v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="用户角色">
          <el-radio-group v-model="form.role">
            <el-radio key="1" label="普通用户" value="普通用户">普通用户</el-radio>
            <el-radio key="2" label="商家" value="商家">商家</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="电话">
          <el-input v-model="form.tel"></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="form.email"></el-input>
        </el-form-item>
        <el-form-item label="用户启用">
          <el-radio-group v-model="form.enable">
            <el-radio key="1" label="true" value="true">正常</el-radio>
            <el-radio key="2" label="false" value="false">拉黑</el-radio>
          </el-radio-group>
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
import {fetchUserData} from "../../api";

export default {
  name: "userMange",
  methods:{
    state(row){
      let user_state = row.enable;
      if(user_state === true){
        return '正常'
      }else{
        return '拉黑'
      }
    }
  },
  setup() {
    const query = reactive({
      username: "",
      tel: "",
      email: "",
      role: "",
      enable: "",
      pageIndex: 1,
      pageSize: 10,
    });
    const tableData = ref([]);
    const pageTotal = ref(0);

    // 获取表格数据
    const getData = () => {
      fetchUserData(query).then((res) => {
        tableData.value = res.data.user_list;
        pageTotal.value = res.pageTotal || 50;
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
            tableData.value.splice(index, 1);
          })
          .catch(() => {
          });
    };

    // 表格编辑时弹窗和保存
    const editVisible = ref(false);
    let form = reactive({
      username: "",
      role: "",
      tel: "",
      email: "",
      enable: ""
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
        tableData.value[idx][item] = form[item];
      });
    };

    return {
      query,
      tableData,
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
