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

                <el-input v-model="query.name" placeholder="商品名" class="handle-input mr10"></el-input>
                <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>

                <!--  添加功能    -->
                <el-button type="primary" @click="addItemDialog = true" style="float: right">产品添加</el-button>
                <el-dialog v-model="addItemDialog" :visible.sync="addItemDialog" title="产品添加">
                    <el-form label-width="70px" :model="addItemForm">
                        <!--            <el-form-item label="产品名">-->
                        <!--              <el-input v-model="addItemForm.product_name"></el-input>-->
                        <!--            </el-form-item>-->
                        <el-form-item label="分类ID">
                            <el-select v-model="addItemForm.product_id" class="m-2" placeholder="Select">
                                <el-option
                                        v-for="item in categoryData"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value"
                                />
                            </el-select>
                        </el-form-item>
                        <el-form-item label="商品ID">
                            <el-input v-model="addItemForm.item_id"></el-input>
                        </el-form-item>
                        <el-form-item label="商品价格">
                            <el-input v-model="addItemForm.item_price"></el-input>
                        </el-form-item>
                        <el-form-item label="商品折扣">
                            <el-input v-model="addItemForm.item_discount"></el-input>
                        </el-form-item>
                        <el-form-item label="商品选项">
                            <!--              <el-input v-model="addItemForm.item_option"></el-input>-->
                            <el-select v-model="addItemForm.item_option" placeholder="请选择">
                                <el-option
                                        v-for="item in options"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>

                        <el-form-item label="库存数">
                            <el-input v-model="addItemForm.item_stock"></el-input>
                        </el-form-item>
                        <el-form-item label="是否可售">
                            <el-radio-group v-model="addItemForm.for_sale">
                                <el-radio key="1" label="true" value="value">可售</el-radio>
                                <el-radio key="2" label="false" value="value">不可售</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </el-form>
                    <template #footer>
                <span class="dialog-footer">
                    <el-button @click="addItemDialog = false">取 消</el-button>
                    <el-button type="primary" @click="addItemFormEvent">确 定</el-button>
                </span>
                    </template>
                </el-dialog>
            </div>


            <el-table :data="ItemData" border class="table" ref="multipleTable" header-cell-class-name="table-header">

                <el-table-column prop="product_id" label="产品ID" width="70px" align="center"></el-table-column>
                <el-table-column prop="item_id" label="商品ID" align="center"></el-table-column>
                <el-table-column prop="product_name" label="产品名" align="center"></el-table-column>
                <!--cat_id分类id-->
                <el-table-column label="商品价格" align="center">
                    <template #default="scope">￥{{ scope.row.item_price }}</template>
                </el-table-column>
                <el-table-column prop="item_discount" label="商品折扣" align="center"></el-table-column>
                <el-table-column prop="item_option" label="商品选项" align="center"></el-table-column>
                <el-table-column prop="item_stock" label="库存数" align="center"></el-table-column>
                <!--        <el-table-column prop="for_sale" label="可售"></el-table-column>-->
                <el-table-column label="可售" align="center">
                    <template #default="scope">
                        <el-tag :type="
                                scope.row.for_sale === true
                                    ? 'success'
                                    : scope.row.for_sale === false
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
                                   @click="handleDelete(scope.$index,scope.row)">删除
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
                <el-form-item label="商品ID">
                    <el-input v-model="form.item_id"></el-input>
                </el-form-item>
                <el-form-item label="产品ID">
                    <el-input v-model="form.product_id"></el-input>
                </el-form-item>
                <el-form-item label="商品价格">
                    <el-input v-model="form.item_price"></el-input>
                </el-form-item>
                <el-form-item label="商品选项">
                    <el-input v-model="form.item_option"></el-input>
                </el-form-item>
                <el-form-item label="商品折扣">
                    <el-input v-model="form.item_discount"></el-input>
                </el-form-item>
                <el-form-item label="库存数">
                    <!--          <el-input v-model="form.item_stock"></el-input>-->
                    <el-input-number v-model="form.item_stock" :min="form.item_stock" :max="form.item_stock+10000"
                                     @change="handleChange"/>
                </el-form-item>
                <el-form-item label="可售">
                    <el-radio-group v-model="form.for_sale">
                        <el-radio key="1" label="true" value="true">可售</el-radio>
                        <el-radio key="2" label="false" value="false">不可售</el-radio>
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
import {addItemData, deleteItemData, deleteProductData, fetchItemData, updateItemData} from "../../api";
import {fetchCategoryData} from "../../api";

export default {
    name: "ItemManage",
    data() {
        return {
            item: [{
                product_id: '',
                item_id: '',
                item_price: '',
                item_discount: '',
                item_option: '',
                item_stock: '',
                for_sale: ''
            }],
            addItemForm: {
                product_id: '',
                item_id: '',
                item_price: '',
                item_discount: '',
                item_option: '',
                item_stock: '',
                for_sale: ''
            },
            form: {
                item_id: "",
                product_id: "",
                item_price: "",
                item_discount: "",
                item_option: "",
                item_stock: "",
                for_sale: ""
            },
            categoryData: [],
            options: [{
                value: '512GB',
                label: '512GB'
            }, {
                value: '1TB',
                label: '1TB'
            }, {
                value: '2TB',
                label: '2TB'
            }, {
                value: '4TB',
                label: '4TB'
            }],
            value: '',
        }
    },
    created() {
        this.getCategory()
    },
    methods: {
        //修改
        saveEdit() {
            const jsonBlob = new Blob([JSON.stringify(this.form)], {
                type: 'application/json'
            })
            updateItemData(jsonBlob).then((res) => {
                console.log(res.code);
                if (res.code == 200) {
                    ElMessage.success(`修改成功`);
                } else {
                    ElMessage.error(`修改失败`)
                }
                this.editVisible.value = false;
            }).catch(() => {
            })
        },
        getCategory() {
            fetchCategoryData(this.cat_name).then((res) => {
                const result = res.data.Category;

                console.log(result);
                result.forEach(element => {
                    this.categoryData.push({label: element.cat_name, value: element.cat_id})
                })
            }).catch(error => {
                console.log(error)
            })
        },
        //添加
        addItemFormEvent() {
            // let addForm = new FormData()
            ElMessageBox.confirm("确定要添加吗？", "提示", {type: "warning",}).then(() => {
                const jsonBlob = new Blob([JSON.stringify(this.addItemForm)], {
                    type: 'application/json',
                });
                // addForm.append("item", jsonBlob)
                addItemData(jsonBlob).then((res) => {
                    console.log(res.code);
                    if (res.code == 200) {
                        this.$message({showClose: true, message: "添加成功", type: 'success'});
                    } else {
                        this.$message({showClose: false, message: "添加失败", type: 'danger'})
                    }
                    this.addItemDialog = false
                }).catch(() => {
                });
            })
        },
        //是否可售的判断
        state(row) {
            let forSale = row.for_sale;
            if (forSale === true) {
                return '可售'
            } else {
                return '不可售'
            }
        }
    },

    setup() {

        const query = reactive({
            item_price: "",
            for_sale: "",
            pageIndex: 1,
            pageSize: 10,
        });
        const ItemData = ref([]);
        const pageTotal = ref(0);


        // 获取表格数据
        const getData = () => {
            fetchItemData(query).then((res) => {
                ItemData.value = res.data.ItemList;
                // ItemData.value = res.list;
                pageTotal.value = res.pageTotal || 50;
            });
        };

        getData();

        // const addData = () => {
        //   addItemData(query).then((res) => {
        //     ItemData.value = res.list;
        //   });
        // };
        // addData();

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
        const handleDelete = (index, row) => {
            // 二次确认删除
            ElMessageBox.confirm("确定要删除吗？", "提示", {type: "warning",}).then(() =>
                deleteItemData(row.item_id).then((res) => {
                    console.log(res.code)
                    if (res.code == 200) {
                        ElMessage.success("删除成功");
                        ItemData.value.splice(index, 1);
                    } else {
                        ElMessage.error("删除失败");
                    }
                }).catch(() => {
                })
            )

        };

        // 表格编辑时弹窗和保存
        const editVisible = ref(false);
        let form = reactive({
            item_id: "",
            product_id: "",
            item_price: "",
            item_discount: "",
            item_option: "",
            item_stock: "",
            for_sale: ""
        });
        let idx = -1;
        const handleEdit = (index, row) => {
            idx = index;
            Object.keys(form).forEach((item) => {
                form[item] = row[item];
            });
            editVisible.value = true;
        };

        //编辑增加库存数按钮
        const handleChange = (value) => {
            console.log(value)
        }

        //添加信息弹窗标记
        const addItemDialog = ref(false);


        return {
            query,
            ItemData,
            pageTotal,
            editVisible,
            form,
            addItemDialog,
            handleSearch,
            handlePageChange,
            handleDelete,
            handleEdit,
            // saveEdit,
            handleChange,
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
