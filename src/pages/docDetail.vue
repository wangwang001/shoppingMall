<template>
    <div class="docDetail">
        <div class="header">
            <van-nav-bar title="" left-text="" left-arrow class="navbar">
                <i class="icon iconfont" :class="[leftRight ? 'icon-classify_icon' : 'icon-fenlei1']" slot="right" @click="switchStyle()"></i>
                <i class="icon iconfont icon-icon-shezhi" slot="right" @click="showCheck()"></i>
            </van-nav-bar>
        </div>
        <div class="leftRightThem">
            <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
                <van-row class="leftRight" v-show="leftRight">
                    <van-col span="10">
                        <van-checkbox v-model="checked"></van-checkbox>
                        <van-panel>
                            <div class="img"><img src="../assets/images/banner1.jpg" alt=""></div>
                            <div slot="footer">
                                <p class="version">5SY4()Gemany</p>
                                <p class="title">微型断路器</p>
                                <p class="classify">文档类别</p>
                                <p class="time"><span>2018-08-19</span><i class="icon iconfont icon-youjian" @click="showDialog()"></i></p>
                            </div>
                        </van-panel>
                    </van-col>
                    <van-col span="10">
                        <van-checkbox v-model="checked"></van-checkbox>
                        <van-panel>
                            <div class="img"><img src="../assets/images/banner1.jpg" alt=""></div>
                            <div slot="footer">
                                <p class="version">5SY4()Gemany</p>
                                <p class="title">微型断路器</p>
                                <p class="classify">文档类别</p>
                                <p class="time"><span>2018-08-19</span><i class="icon iconfont icon-youjian"></i></p>
                            </div>
                        </van-panel>
                    </van-col>
                    <van-col span="10">
                        <van-panel>
                            <div class="img"><img src="../assets/images/banner1.jpg" alt=""></div>
                            <div slot="footer">
                                <p class="version">5SY4()Gemany</p>
                                <p class="title">微型断路器</p>
                                <p class="classify">文档类别</p>
                                <p class="time">2018-08-19</p>
                            </div>
                        </van-panel>
                    </van-col>
                    <van-col span="10">
                        <van-panel>
                            <div class="img"><img src="../assets/images/banner1.jpg" alt=""></div>
                            <div slot="footer">
                                <p class="version">5SY4()Gemany</p>
                                <p class="title">微型断路器</p>
                                <p class="classify">文档类别</p>
                                <p class="time">2018-08-19</p>
                            </div>
                        </van-panel>
                    </van-col>
                    <van-col span="10">
                        <van-panel>
                            <div class="img"><img src="../assets/images/banner1.jpg" alt=""></div>
                            <div slot="footer">
                                <p class="version">5SY4()Gemany</p>
                                <p class="title">微型断路器</p>
                                <p class="classify">文档类别</p>
                                <p class="time">2018-08-19</p>
                            </div>
                        </van-panel>
                    </van-col>
                    <van-col span="10">
                        <van-panel>
                            <div class="img"><img src="../assets/images/banner1.jpg" alt=""></div>
                            <div slot="footer">
                                <p class="version">5SY4()Gemany</p>
                                <p class="title">微型断路器</p>
                                <p class="classify">文档类别</p>
                                <p class="time">2018-08-19</p>
                            </div>
                        </van-panel>
                    </van-col>
                    <van-col span="10">
                        <van-panel>
                            <div class="img"><img src="../assets/images/banner1.jpg" alt=""></div>
                            <div slot="footer">
                                <p class="version">5SY4()Gemany</p>
                                <p class="title">微型断路器</p>
                                <p class="classify">文档类别</p>
                                <p class="time">2018-08-19</p>
                            </div>
                        </van-panel>
                    </van-col>
                    <van-col span="10">
                        <van-panel>
                            <div class="img"><img src="../assets/images/banner1.jpg" alt=""></div>
                            <div slot="footer">
                                <p class="version">5SY4()Gemany</p>
                                <p class="title">微型断路器</p>
                                <p class="classify">文档类别</p>
                                <p class="time">2018-08-19</p>
                            </div>
                        </van-panel>
                    </van-col>
                </van-row>
                <van-row class="topDown" v-show="topDown">
                    <!-- <van-checkbox-group v-model="result" :max="2"> -->
                        <van-col span="24">
                            <van-checkbox v-model="checked"></van-checkbox>
                            <div class="docImg"><img src="../assets/images/banner1.jpg"></div>
                            <div class="rightText">
                                <p class="version">5SY4()Gemany</p>
                                <p class="title">微型断路器</p>
                                <p class="classify">文档类别</p>
                                <p class="time"><span>2018-08-19</span></p>
                                <div slot="footer" class="footer"><i class="icon iconfont icon-youjian"></i></div>
                            </div>
                        </van-col>
                    <!-- </van-checkbox-group> -->
                </van-row>
            </van-pull-refresh>
        </div>
        <v-dialog v-show="isShowDialog" :isShowDialog="isShowDialog" @hideDialog="hideDialog"></v-dialog>
    </div>
</template>
<script>
import { NavBar, Row, Col, Panel, PullRefresh, Card , CheckboxGroup, Checkbox} from 'vant';
import dialog from "@/components/dialog";
export default {
    components: {
        NavBar,
        Row,
        Col,
        Panel,
        PullRefresh,
        Card,
        CheckboxGroup,
        Checkbox,
        'v-dialog':dialog
    },
    data(){
        return{
            count: 0,
            isLoading: false,
            checked: false,
            isShowDialog:false,
            leftRight:true,
            topDown:false,
        }
    },
    methods: {
        onRefresh() {
            setTimeout(() => {
                //this.$toast('刷新成功');
                this.isLoading = false;
                this.count++;
            }, 500);
        },
        //切换文档展示样式
        switchStyle() {
            if(this.leftRight){
                this.topDown = true;
                this.leftRight = false;
            }else{
                this.topDown = false;
                this.leftRight = true;
            }
        },
        //是否显示多选框
        showCheck() {

        },
        //判断显示发送邮件弹框
        showDialog() {
            if (!this.isShowDialog) {
                this.isShowDialog = true;
            }
        },
        //根据子组件返回的值判断是否改变父组件显隐的状态
        hideDialog(data) {
            this.isShowDialog = data.show;
        }
    }
}
</script>
<style>
    .docDetail .van-nav-bar .van-icon{
        color: #fff !important;
    }
    .leftRightThem .van-row .van-cell{
        display:none !important;
    }
    .leftRight .van-checkbox{
        position: absolute;
        right:0;
        z-index:99;
    }
</style>
<style>
    .van-checkbox__icon.van-checkbox--checked{
        border-color:#26a2ff;
        background-color: #26a2ff;
    }
    .van-checkbox__icon{
        border: 1px solid #666;
        background-color:#ddd;
    }
</style>

<style scoped>
    .docDetail{
        height:100%;
        overflow:auto;
    }
    .van-row{
        padding-bottom:70px;
    }
    .header{
        width: 100%;
        height:40px;
        position: fixed;
        top: 0;
        z-index: 2;
    }
    .header .iconfont{
        color:#fff;
    }
    .header .iconfont{
        margin-right:10px;
    }
    .header .icon-fenlei1,.header .icon-classify_icon{
        margin-right:20px;
    }
    .logo{
        position: absolute;
        top: 20%;
        left: 42%;  
        z-index: 2;                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              
    }
    .van-nav-bar{
        background: -webkit-linear-gradient(left, #37BEC5 , #09AAD2); /* Safari 5.1 - 6.0 */
        background: -o-linear-gradient(right, #37BEC5, #09AAD2); /* Opera 11.1 - 12.0 */
        background: -moz-linear-gradient(right, #37BEC5, #09AAD2); /* Firefox 3.6 - 15 */
        background: linear-gradient(to right, #37BEC5 , #09AAD2); /* 标准的语法 */
    }
    .leftRightThem{
        position: relative;
        top:45px;
    }
    .leftRightThem .img img{
        width:100%;
    }
    .van-col-10{
        margin:4% 4% 0;
        border:1px solid #fff;
        position: relative;
    }
    .van-col p{
        text-align:left;
        margin:5px 0;
    }
    .van-col p i{
        float: right;
        color:#26a2ff;
        font-size:24px;
    }

    .topDown .van-col{
        background:#fff;
        padding:2%;
        text-align: left;
    }
    .topDown .van-checkbox{
        width:10%;
        float: left;
        line-height:118px;
    }
    .topDown .docImg{
        width:40%;
        height:120px;
        float: left;
    }
    .topDown .docImg img{
        width:100%;
        height:100%;
        border-radius:5%;
    }
    .topDown .rightText{
        width:45%;
        display:inline-block;
        text-align:left;
        margin:2% 0 0 2%;
    }
    .topDown .rightText .footer{
        text-align:right;
    }
    .topDown .rightText .footer i{
        color:#26a2ff;
        font-size:24px;
    }
</style>
