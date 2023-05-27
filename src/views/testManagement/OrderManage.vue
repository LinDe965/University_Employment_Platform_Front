<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i> 订单管理
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">

                <el-input v-model="query.name" placeholder="订单ID" class="handle-input mr10"></el-input>
                <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>

                <!--  添加功能    -->
                <el-button type="primary" @click="addOrderDialog = true" style="float: right">发货提交</el-button>
                <el-dialog v-model="addOrderDialog" :visible.sync="addOrderDialog" title="订单添加">
                    <el-form label-width="70px">
                        <el-form-item label="用户ID">
                            <el-input v-model="addOrderForm.uid"></el-input>
                        </el-form-item>
                        <el-form-item label="订单ID">
                            <el-input v-model="addOrderForm.order_id"></el-input>
                        </el-form-item>
                        <el-form-item label="订单总价">
                            <el-input v-model="addOrderForm.total_price"></el-input>
                        </el-form-item>
                        <el-form-item label="地址">
                            <el-input type="textarea" v-model="addOrderForm.address"></el-input>
                        </el-form-item>
                        <el-form-item label="创建时间">
                            <el-date-picker
                                    v-model="addOrderForm.create_time"
                                    type="date"
                                    placeholder="Pick a day"
                                    :size="size"
                            />
                        </el-form-item>

                    </el-form>
                    <template #footer>
                <span class="dialog-footer">
                    <el-button @click="addOrderDialog = false">取 消</el-button>
                    <el-button type="primary" @click="addOrderFormEvent">确 定</el-button>
                </span>
                    </template>
                </el-dialog>

            </div>


            <el-table :data="orderData" border class="table" ref="multipleTable" header-cell-class-name="table-header">
                <!--订单order_id-->
                <el-table-column prop="order_id" label="订单ID">
                    <template #default="scope">
                        <el-tooltip class="item" effect="dark" :content="scope.row.order_id" placement="top-start">
                            <span>{{ scope.row.order_id.substring(0, 15) }}...</span>
                        </el-tooltip>
                    </template>
                </el-table-column>
                <!--用户uid-->
                <el-table-column prop="uid" label="用户ID" align="center" class-name="uid">
                    <template #default="scope">
                        <el-tooltip class="item" effect="dark" :content="scope.row.uid" placement="top-start">
                            <span>{{ scope.row.uid.substring(0, 15) }}...</span>
                        </el-tooltip>
                    </template>
                </el-table-column>
                <!--total_price订单总价-->
                <el-table-column label="订单总价" align="center">
                    <template #default="scope">￥{{ scope.row.total_price }}</template>
                </el-table-column>
                <!--address地址-->
                <el-table-column prop="address" label="地址"></el-table-column>

                <!--enable用户启用-->
                <el-table-column label="订单状态" align="center">
                    <template #default="scope">
                        <el-tag :type="state(scope.row)" v-text="state1(scope.row)"/>
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
                <el-form-item label="订单ID">
                    <el-input v-model="form.order_id"></el-input>
                </el-form-item>
                <el-form-item label="用户ID">
                    <el-input v-model="form.uid"></el-input>
                </el-form-item>
                <el-form-item label="订单总价">
                    <el-input v-model="form.total_price"></el-input>
                </el-form-item>
                <el-form-item label="地址">
                    <el-input type="textarea" v-model="form.address"></el-input>
                </el-form-item>

                <el-form-item label="订单状态">
                    <template #default="scope">
                        <el-radio-group v-model="form.create_time">
                            <el-radio key="1" label="create_time" value="create_time">未发货</el-radio>
                            <el-radio key="2" label="ship_time" value="ship_time">运输中</el-radio>
                        </el-radio-group>
                    </template>
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
import {fetchOrderData, updateOrderShipTime, updateOrderModifyAddress} from "../../api";
//updateOrderShipTime updateOrderModifyAddress
export default {
    name: "OrderManage",
    data() {
        return {
            form: {
                uid: "",
                order_id: "",
                total_price: "",
                address: "",
                create_time: "",
                ship_time: ""
            }
        }
    },
    methods: {

        saveEdit() {
            let updateDataForm = new FormData();
            updateDataForm.append("order_id", this.form.order_id);
            updateDataForm.append("address", this.form.address);
            updateOrderModifyAddress(updateDataForm).then((res) => {
                console.log(res.code);
                if (res.code === 200) {
                    ElMessage.success(`修改地址成功`);
                } else {
                    ElMessage.error(`修改地址失败`)
                }
                editVisible.value = false;
            }).catch(() => {
            })

            let updateDataForm2 = new FormData();
            updateDataForm2.append("order_id", this.form.order_id);
            updateOrderShipTime(updateDataForm2).then((res) => {
                console.log(res.code);
                if (res.code === 200) {
                    ElMessage.success(`修改货物信息成功`);
                } else {
                    ElMessage.error(`修改货物信息失败`)
                }
                this.editVisible.value = false;
            }).catch(() => {
            })

        },
        state(row) {
            console.log(row);
            //创建订单时间
            let create_date = row.create_time;
            let createTime = new Date(create_date).getTime();
            console.log(createTime);

            let ship_date = row.ship_time;
            let shipTime = new Date(ship_date).getTime();
            console.log(shipTime);
            //
            let finished_date = row.finished_time;
            let finishedTime = new Date(finished_date).getTime();
            console.log(finishedTime);

            if (finishedTime - shipTime > 0) {
                return ''
            } else if (isNaN(finishedTime) && shipTime - createTime > 0) {
                return 'warning'
            } else if (isNaN(finishedTime) && isNaN(shipTime)) {
                return 'danger'
            }
        },
        state1(row) {
            console.log(row);
            //创建订单时间=
            let create_date = row.create_time;
            let createTime = new Date(create_date).getTime();
            console.log(createTime);

            let ship_date = row.ship_time;
            let shipTime = new Date(ship_date).getTime();
            console.log(shipTime);

            let finished_date = row.finished_time;
            let finishedTime = new Date(finished_date).getTime();
            console.log(finishedTime);
            console.log(finishedTime - shipTime);
            console.log(shipTime - createTime);

            if (finishedTime - shipTime > 0) {
                return '已完成'
            } else if (isNaN(finishedTime) && shipTime - createTime > 0) {
                return '运输中'
            } else if (isNaN(finishedTime) && isNaN(shipTime)) {
                return '未发货'
            }
        },
    },
    setup() {
        const query = reactive({
            uid: "",
            order_id: "",
            total_price: "",
            address: "",
            create_time: "",
            pageIndex: 1,
            pageSize: 10,
        });
        const orderData = ref([]);
        const pageTotal = ref(0);

        // 获取表格数据
        const getData = () => {
            fetchOrderData(query).then((res) => {
                orderData.value = res.data.order_list;
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
                    orderData.value.splice(index, 1);
                })
                .catch(() => {
                });
        };

        // 表格编辑时弹窗和保存
        const editVisible = ref(false);
        let form = reactive({
            uid: "",
            order_id: "",
            total_price: "",
            address: "",
            create_time: ""
        });
        let idx = -1;
        const handleEdit = (index, row) => {
            idx = index;
            Object.keys(form).forEach((item) => {
                form[item] = row[item];
            });
            editVisible.value = true;
        };


        //添加信息弹窗标记
        const addOrderDialog = ref(false);

        const addOrderForm = reactive({
            uid: '',
            order_id: '',
            total_price: '',
            address: '',
            create_time: '',
        })

        const addOrderFormEvent = () => {
            addOrderDialog.value = false;
            ElMessage.success(`成功添加 ${idx + 1} 行`);
        };


        return {
            addOrderDialog,
            query,
            orderData,
            pageTotal,
            editVisible,
            form,
            addOrderForm,
            handleSearch,
            handlePageChange,
            handleDelete,
            handleEdit,
            // saveEdit,
            addOrderFormEvent
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
