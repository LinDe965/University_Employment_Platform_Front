<template>
    <div class="page-container">
        <el-container>
            <!-- header 区域 -->
            <v-header />

            <!-- 轮播图区域 -->
            <div class="carousel-container">
                <el-carousel :interval="5000" arrow-direction="none"
                             type="card"
                             style="width: 99%;background-color:#F5F5F5;">
                    <el-carousel-item v-for="(item, index) in carouselList" :key="index">
                        <img :src="item.imageUrl" alt="">
                        <div class="carousel-item-text">{{ item.text }}</div>
                    </el-carousel-item>
                </el-carousel>
            </div>

            <el-container>
                <!-- 侧边栏区域 -->
                <el-aside width="300px">
                    <el-menu>
                        <el-menu-item>
                            <i class="el-icon-setting"></i>
                            <span slot="title">招聘信息</span>
                        </el-menu-item>
                    </el-menu>
                </el-aside>

                <!-- 主内容区域 -->
                <div class="main-container">
                    <el-main style="padding: 20px;">
                        <el-card
                            v-for="pos in posList" :key="pos.positionId" class="pos-card" @click="goToDetail(pos.positionId)">
                            <div style="font-size: 20px;margin-bottom: 5px">{{pos.companyName}}</div>
                            <div style="font-size: 20px;margin-bottom: 5px">{{pos.companyAddress}}</div>
<!--                            <div>{{pos.companyHrName}}</div>-->
                            <div style="display: flex;margin-top: 2px;justify-content: space-between">
                                <div>
                                    <div style="font-size: 20px;margin-bottom: 5px;color: #409EFF">{{pos.positionName}}</div>
                                    <div style="font-size: 20px;margin-bottom: 5px">{{pos.companyIndustry}}</div>
                                </div>
                                <div style="float: right;margin-top: 15px">
                                    <div style="font-size: 16px;margin-bottom: 5px;color: #f56c6c">薪资 {{pos.positionSalary}}</div>
                                    <div style="font-size: 16px;margin-bottom: 5px">发布时间 {{pos.positionCreateTime}}</div>
                                </div>
                            </div>

                        </el-card>
                    </el-main>
                    <div class="pagination">
                        <el-pagination background layout="total, prev, pager, next" :current-page="query.currentPage"
                                       :page-size="query.pageSize" :total="posList.length"
                                       @current-change="handlePageChange"></el-pagination>
                    </div>
                </div>

            </el-container>

            <!-- footer 区域 -->
            <el-footer height="60px" style="background-color: #f4f4f5;">
                <span class="footer">毕业生就业指导中心</span>
            </el-footer>
        </el-container>
    </div>
</template>

<script>
import vHeader from "../../components/Header.vue";
import {reactive, ref} from "vue";
import {fetchFrontPositionList} from "../../api";
import {useRouter} from "vue-router";


export default {
    name: 'Pages',
    data() {
        return {
            // 轮播图数据
            carouselList: [
                {
                    name:"",
                    imageUrl:new URL("../../assets/img/p4.png", import.meta.url).href,
                    text: '汽车制造业招聘大会'
                },
                {
                    name:"",
                    imageUrl:new URL("../../assets/img/p2.png", import.meta.url).href,
                    text: 'xxx科技股份有限公司招聘'
                },
                {
                    name:"",
                    imageUrl:new URL("../../assets/img/p3.png", import.meta.url).href,
                    text: '欢迎加入xxx有限公司！！'
                },
                {
                    name:"",
                    imageUrl:new URL("../../assets/img/p1.png", import.meta.url).href,
                    text: '中国银行招聘须知'
                },
            ]
        }
    },
    components: {
        vHeader,
    },
    setup() {
        const query = reactive({
            positionId: '',
            companyName: '',
            companyAddress: '',
            companyIndustry: '',
            companyHrName: '',
            positionName: '',
            positionSalary: '',
            enable:1,
            currentPage: 1,
            pageSize: 10,
        });

        const posList = ref([]);

        //获取数据
        const getPositionData = ()=>{
            fetchFrontPositionList().then((res)=>{
                console.log(res.data);
                posList.value = res.data;

            })
        }

        getPositionData();

        const positionId = ref();
        const router = useRouter();

        function setCookie(name, value, seconds) {
            seconds = seconds || 0;   //seconds有值就直接赋值，没有为0，这个根php不一样。
            var expires = "";
            if (seconds != 0 ) {      //设置cookie生存时间
                var date = new Date();
                date.setTime(date.getTime()+(seconds*1000));
                expires = "; expires="+date.toGMTString();
            }
            document.cookie = name+"="+escape(value)+expires+"; path=/";   //转码并赋值
        }


        //详情页跳转
        const goToDetail = (positionId) =>{
            //跳转
            router.push({name:'PagesDetail', params:{positionId}});
            //传入对应的Cookie
            setCookie("positionId",positionId,86400);
        }

        // 查询操作
        const handleSearch = () => {
            query.currentPage = 1;
            getPositionData();
        };
        // 分页导航
        const handlePageChange = (val) => {
            query.currentPage = val;
            getPositionData(val);
        };


        return {
            posList,
            query,
            positionId,
            getPositionData,
            handleSearch,
            handlePageChange,
            goToDetail,
            setCookie
        }

    },
}
</script>

<style scoped>
/* 整体容器样式 */
.page-container {
    display: flex;
    flex-direction: column;
    height: 100%;
    overflow: auto;
}
.carousel-container {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 5px;
}

.el-carousel__item img {
    width: 100%;
}

.carousel-item-text {
    position: absolute;
    bottom: 5px;
    left: 47%;
    color: #fff;
    font-size: 18px;
    margin: auto;
}

.main-container {
    height: auto;
    width: 100%;
    padding-right: 10px;
}

.pos-card {
    margin-bottom: 20px;
    cursor: pointer;
    //width: 100%;
}
.news-title {
    font-weight: bold;
}
.news-content {
    margin-top: 10px;
}
.news-time {
    margin-top: 10px;
    color: #999;
}




.footer {
    font-size: 20px;
    float: right;
    margin-top: 10px;
}
</style>
