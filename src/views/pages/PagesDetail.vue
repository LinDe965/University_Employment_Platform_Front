<template>

    <div class="page-container">
        <el-container>
            <!-- header 区域 -->
            <v-header/>

            <!-- 详细信息 -->
            <el-main class="pageDetail">
                <div class="headerDetail">
                    <el-breadcrumb separator-class="el-icon-arrow-right">
                        <el-breadcrumb-item :to="{ path: '/pages' }" @click="goToPages">首页</el-breadcrumb-item>
                        <el-breadcrumb-item>招聘信息详情</el-breadcrumb-item>
                    </el-breadcrumb>
                </div>
                <div class="information">
                    <h1 style="text-align: center;font-size: 45px">{{ detailList.companyName }}招聘</h1>
                    <el-descriptions column="1" class="descriptions">
                        <el-descriptions-item label="公司名称：">{{ detailList.companyName}}</el-descriptions-item>
                        <el-descriptions-item label="公司地址：">{{ detailList.companyAddress}}</el-descriptions-item>
                        <el-descriptions-item label="公司行业：">{{ detailList.companyIndustry}}</el-descriptions-item>
                        <el-descriptions-item label="公司简介：">{{ detailList.companyIntroduction}}</el-descriptions-item>
                        <el-descriptions-item label="公司详情：">{{ detailList.companyDetail}}</el-descriptions-item>
                        <el-descriptions-item label="职位名称：">{{ detailList.positionName}}</el-descriptions-item>
                        <el-descriptions-item label="招聘人数：">{{ detailList.positionRecruitNumber}}</el-descriptions-item>
                        <el-descriptions-item label="职位薪资：">{{ detailList.positionSalary}}</el-descriptions-item>
                        <el-descriptions-item label="招聘要求：">{{ detailList.positionRequire}}</el-descriptions-item>
                    </el-descriptions>
                    <el-descriptions column="1" style="float: right;margin-right: 50px">
                        <el-descriptions-item label="HR名称：">{{ detailList.companyHrName}}</el-descriptions-item>
                        <el-descriptions-item label="HR联系方式：">{{ detailList.companyHrTel}}</el-descriptions-item>
                        <el-descriptions-item label="HR电子邮箱：">{{ detailList.companyHrEmail}}</el-descriptions-item>
                        <el-descriptions-item label="发布时间：">{{ detailList.positionCreateTime}}</el-descriptions-item>
                    </el-descriptions>
                </div>

                <!--操作按钮-->
                <div class="allButton">
                    <el-button type="warning" @click="collectEvent">收藏</el-button>
                    <el-button type="danger" @click="deliverEvent">投递</el-button>
                </div>
            </el-main>

            <!-- footer 区域 -->
            <el-footer height="60px" style="background-color: #f4f4f5;">
                <span class="footer">毕业生就业指导中心</span>
            </el-footer>
        </el-container>
    </div>


</template>

<script>
import vHeader from "../../components/Header.vue";
import Cookies from "js-cookie";
import {useRouter} from "vue-router";
import {reactive, ref} from "vue";
import {fetchFrontPositionDetailData, fetchSaveStudentDeliverData, fetchSaveStudentFavoriteData} from "../../api/index";
import {ElMessage, ElMessageBox} from "element-plus";

export default {
    name: "PagesDetail",
    components: {
        vHeader,
    },
    setup() {

        const router = useRouter();

        const detailList = ref({
            companyName: '',
            companyAddress: '',
            companyIndustry: '',
            companyIntroduction: '',
            companyDetail: '',

            positionName: '',
            positionRecruitNumber: '',
            positionSalary: '',
            positionRequire: '',
            positionCreateTime: '',

            companyHrName: '',
            companyHrTel: '',
            companyHrEmail: '',
        });

        //获取信息接口
        const getPositionDetailData = ()=>{
            const positionId = Cookies.get("positionId");
            fetchFrontPositionDetailData(positionId).then((res)=>{
                console.log(res.data);
                detailList.value = res.data;
            })
        }

        getPositionDetailData();

        //面包屑返回首页并清楚cookie
        const goToPages = () => {
            Cookies.remove("positionId");
        }


        //按钮收藏事件
        const collectEvent = () =>{
            ElMessageBox.confirm("确定要收藏吗？", "提示", {type: "warning",}).then(()=>{
                const positionId = Cookies.get("positionId");
                const studentId = Cookies.get("studentId");
                fetchSaveStudentFavoriteData({positionId,studentId}).then((res) =>{
                    console.log(res);
                    if (res.code == 20011) {
                        ElMessage.success(`收藏成功`);
                    } else {
                        ElMessage.error(`收藏失败`)
                    }
                })
            })
        }
        //按钮投递事件
        const deliverEvent = () =>{
            ElMessageBox.confirm("确定要投递吗？", "提示", {type: "warning",}).then(()=>{
                const positionId = Cookies.get("positionId");
                const studentId = Cookies.get("studentId");
                fetchSaveStudentDeliverData({positionId,studentId}).then((res) =>{
                    console.log(res);
                    if (res.code == 20011) {
                        ElMessage.success(`投递成功`);
                    } else {
                        ElMessage.error(`投递失败`)
                    }
                }).catch(error=>{
                    ElMessage.error(`投递失败`)
                })
            })
        }

        return {
            router,
            detailList,
            goToPages,
            getPositionDetailData,
            deliverEvent,
            collectEvent
        }
    }
}
</script>

<style scoped>
.page-container {
    display: flex;
    flex-direction: column;
    height: 100%;
    overflow: auto;

}

.pageDetail {
    height: 100%;
    //background-position: center;
}

.headerDetail {
    margin-left: 20px;
    margin-bottom: 20px;
}

.information {
    border: 1px solid #ccc;
    padding: 16px;
    height: 100%;
}

.descriptions {
    margin-left: 50px;
}

.allButton {
    margin-top: 10px;
    float: right;
    margin-right: 30px;
}

.footer {
    font-size: 20px;
    float: right;
    margin-top: 10px;
}
</style>
