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

                <el-input v-model="query.name" placeholder="产品名" class="handle-input mr10"></el-input>
                <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
                <!--  添加功能    -->
                <el-button type="primary" @click="addProductDialog = true" style="float: right">产品添加</el-button>
                <el-dialog v-model="addProductDialog" :visible.sync="addProductDialog" title="产品添加">

                    <el-form label-width="70px" :model="addProduct">
                        <el-form-item label="添加图片">
                            <el-upload class="upload-demo" :auto-upload="false" drag :on-change="(file)=>save_img(file)"
                                       action=""
                                       multiple>
                                <i class="el-icon-upload"></i>
                                <div class="el-upload__text">
                                    将文件拖到此处，或
                                    <em>点击上传</em>
                                </div>
                            </el-upload>
                        </el-form-item>
                        <el-form-item label="分类ID">
                            <el-select v-model="addProduct.cat_id" class="m-2" placeholder="Select">
                                <el-option
                                        v-for="item in categoryData"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value"
                                />
                            </el-select>
                        </el-form-item>
                        <el-form-item label="产品名">
                            <el-input v-model="addProduct.product_name"></el-input>
                        </el-form-item>
                        <el-form-item label="产品详情">
                            <el-input type="textarea" v-model="addProduct.product_detail"></el-input>
                        </el-form-item>

                    </el-form>
                    <template #footer>
              <span class="dialog-footer">
                <el-button @click="addProductDialog = false">取 消</el-button>
                <el-button type="primary" @click="handleAddProduct">确 定</el-button>
              </span>
                    </template>
                </el-dialog>
            </div>

            <el-table :data="productData" border class="table" ref="multipleTable"
                      header-cell-class-name="table-header">
                <!--product_id产品id-->
                <el-table-column prop="product_id" label="产品id" width="70" align="center"
                                 class-name="product_id"></el-table-column>
                <!--cat_id分类id-->
                <el-table-column prop="cat_id" label="分类id" width="70" align="center"></el-table-column>
                <!-- product_img 图片       -->
                <el-table-column label="产品图片(查看大图)" align="center">
                    <template #default="scope">
                        <el-image class="table-td-avatar" :src="scope.row.product_img"
                                  :preview-src-list="[scope.row.product_img]">
                        </el-image>
                    </template>
                </el-table-column>
                <!--product_name产品名-->
                <el-table-column prop="product_name" label="产品名" align="center"></el-table-column>
                <!--商品选项-->
                <el-table-column prop="item_option" label="商品选项" align="center">
                    <template #default="scope">
                        <el-select v-model="value[scope.$index]" @change="cityItem(scope)" value-key="value"
                                   placeholder="Select"
                                   width="200">
                            <el-option
                                    v-for="item in scope.row.item_list"
                                    :key="item.item_id"
                                    :label="item.item_option"
                                    :value="item.item_id"
                            >
                                <span style="float: left">{{ item.item_id }}</span>
                                <span
                                        style="float: right;
                  color: var(--el-text-color-secondary);
                  font-size: 13px;
                  margin-left: 40px">{{ item.item_option }}</span>
                            </el-option>
                        </el-select>
                    </template>
                </el-table-column>
                <!--product_detail产品详情-->
                <el-table-column prop="product_detail" label="产品详情" align="center"></el-table-column>

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

                <el-form-item label="图片修改">
                    <el-upload class="upload-demo" :auto-upload="false" drag :on-change="(file)=>save_img(file)"
                               action=""
                               multiple>
                        <i class="el-icon-upload"></i>
                        <div class="el-upload__text">
                            将文件拖到此处，或
                            <em>点击上传</em>
                        </div>
                    </el-upload>
                </el-form-item>

                <el-form-item label="产品ID">
                    <el-input v-model="form.product_id"></el-input>
                </el-form-item>
                <el-form-item label="分类ID">
                    <el-input v-model="form.cat_id"></el-input>
                </el-form-item>
                <el-form-item label="产品名">
                    <el-input v-model="form.product_name"></el-input>
                </el-form-item>

                <el-form-item label="产品详情">
                    <el-input type="textarea" v-model="form.product_detail"></el-input>
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
import {fetchProductData, addProductData, deleteProductData, fetchCategoryData, updateProductData} from "../../api";
import defaultSrc from "../../assets/img/img.jpg";


export default {
    name: "ProductManage",
    data() {
        return {
            product: [{
                product_id: '',
                cat_id: '',
                product_name: '',
                item_option: '',
                product_detail: '',
                img: ''
            }],
            addProduct: {
                cat_id: '',
                product_name: '',
                product_detail: '',
            },
            form: {
                product_id: "",
                cat_id: "",
                product_name: "",
                product_detail: ""
            },
            image: '',
            categoryData: []
        }
    },
    created() {
        this.getCategory()
    },
    methods: {

        saveEdit() {
            let updateForm = new FormData()
            const jsonBlob = new Blob([JSON.stringify(this.form)], {
                type: 'application/json',
            });
            updateForm.append("img", this.image)
            updateForm.append("product", jsonBlob)

            updateProductData(updateForm).then((res) => {
                console.log(res.code);
                if (res.code == 200) {
                    this.$message({showClose: true, message: "修改成功", type: 'success'});
                } else {
                    this.$message({showClose: false, message: "修改失败", type: 'danger'})
                }
                this.addProductDialog.value = false
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

        cityItem(row) {
            console.log(row)
        },
        save_img(image) {
            this.image = image.raw
        },
        handleAddProduct() {

            ElMessageBox.confirm("确认添加该商品吗", "提示", {type: "warning",}).then(() => {
                let addForm = new FormData()
                const jsonBlob = new Blob([JSON.stringify(this.addProduct)], {
                    type: 'application/json',
                });
                addForm.append("img", this.image)
                addForm.append("product", jsonBlob)
                addProductData(addForm).then((res) => {
                    // this.productData.data.push(this.addProduct)
                    console.log(res.code);
                    if (res.code == 200) {
                        this.$message({showClose: true, message: "添加成功", type: 'success'});
                    } else {
                        this.$message({showClose: false, message: "添加失败", type: 'danger'})
                    }
                    this.addProductDialog = false
                })
            })
        },
    },
    setup() {
        const query = reactive({
            product_name: "",
            item_option: "",

            pageIndex: 1,
            pageSize: 10,
        });
        const productData = ref([]);
        const pageTotal = ref(0);
        const value = ref([]);
        // 获取表格数据
        const getProductData = () => {
            fetchProductData(query).then((res) => {
                productData.value = res.data.productList;
                pageTotal.value = res.pageTotal || 50;
            });
        };
        getProductData();


        // 查询操作
        const handleSearch = () => {
            query.pageIndex = 1;
            getProductData();
        };
        // 分页导航
        const handlePageChange = (val) => {
            query.pageIndex = val;
            getProductData();
        };

        // 删除操作 deleteProductData

        const handleDelete = (index, row) => {
            // 二次确认删除
            console.log(row.product_id)
            console.log(typeof (row.product_id))
            ElMessageBox.confirm("确定要删除吗？", "提示", {type: "warning",}).then(() => {
                let form = new FormData()
                form.append("product_id", row.product_id + "")
                deleteProductData(form).then((res) => {
                    console.log(res.code);
                    if (res.code == 200) {
                        ElMessage.success("删除成功");
                        productData.value.splice(index, 1);
                    } else {
                        ElMessage.error("删除失败");
                    }
                }).catch(() => {
                })
            })
        };

        // 表格编辑时弹窗和保存
        const editVisible = ref(false);
        let form = reactive({
            product_id: "",
            cat_id: "",
            product_img: "",
            product_name: "",
            product_detail: ""
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
        const addProductDialog = ref(false);

        //图片上传
        const imgSrc = ref("");
        const cropImg = ref(defaultSrc);
        const dialogVisible = ref(false);
        const cropper = ref(null);

        const setImage = (e) => {
            const file = e.target.files[0];
            if (!file.type.includes("image/")) {
                return;
            }
            const reader = new FileReader();
            reader.onload = (event) => {
                dialogVisible.value = true;
                imgSrc.value = event.target.result;
                cropper.value && cropper.value.replace(event.target.result);
            };
            reader.readAsDataURL(file);
        };

        const cropImage = () => {
            cropImg.value = cropper.value.getCroppedCanvas().toDataURL();
        };

        const cancelCrop = () => {
            dialogVisible.value = false;
            cropImg.value = defaultSrc;
        };

        return {
            value,
            query,
            productData,
            pageTotal,
            editVisible,
            form,
            addProductDialog,
            handleSearch,
            handlePageChange,
            handleDelete,
            handleEdit,

            cropper,
            imgSrc,
            cropImg,
            dialogVisible,
            setImage,
            cropImage,
            cancelCrop,
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

.el-select-dropdown__item {
    padding: 0 13px 0 13px;
}
</style>
