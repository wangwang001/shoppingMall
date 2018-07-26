<template>
    <div class="home">
        <div class="banner">
            <!-- <van-swipe :autoplay="4000" :show-indicators="false">
                <van-swipe-item><img src="../assets/images/banner1.jpg" alt=""><div class="banner_shade"><p class="title">博大精深 同心致远</p><p>西门子的解决方案正在支持中国转型升级，西门子将电气化，自动化，数字化的力量融入各行各业，以前所未见的高度，速度，精度和深度，让关键所在，逐一实现。</p></div></van-swipe-item>
                <van-swipe-item><img src="../assets/images/banner1.jpg" alt=""><div class="banner_shade"><p class="title">哈哈哈哈 同心致远</p><p>西门子的解决方案正在支持中国转型升级，西门子将电气化，自动化，数字化的力量融入各行各业，以前所未见的高度，速度，精度和深度，让关键所在，逐一实现。</p></div></van-swipe-item>
                <van-swipe-item><img src="../assets/images/banner1.jpg" alt=""><div class="banner_shade"><p class="title">博大精深 同心致远</p><p>西门子的解决方案正在支持中国转型升级，西门子将电气化，自动化，数字化的力量融入各行各业，以前所未见的高度，速度，精度和深度，让关键所在，逐一实现。</p></div></van-swipe-item>
            </van-swipe> -->
            <img class="logo" src="../assets/images/logo.png" alt="西门子logo">
            <div class="bottom">
                <p>中低压产品下载中心</p>
            </div>
        </div>
        <v-nav></v-nav>
        <div class="newUpdateDoc docSort">
            <h2>最新更新文档排行</h2>
            <ul class="newUl">
                <li @click="showMaskModal('http://www.infrastructure-cities.siemens.com.cn/powerdistribution/downloadCenter/upload/20120712101100178.pdf')"><router-link to=""><img src="../assets/images/PDF.png" alt=""><span>低压熔断器常见问题集锦</span></router-link></li>
                <li @click="showMaskModal('http://www.infrastructure-cities.siemens.com.cn/powerdistribution/downloadCenter/upload/20120712100536209.rar')"><router-link to=""><img src="../assets/images/RAR.png" alt=""><span>西门子中压智能选型软件安装包</span></router-link></li>
                <li @click="showMaskModal('http://www.infrastructure-cities.siemens.com.cn/powerdistribution/downloadCenter/upload/20120712101100178.pdf')"><router-link to=""><img src="../assets/images/PDF.png" alt=""><span>Siemens电涌保护器如何选型？</span></router-link></li>
                <li @click="showMaskModal('http://www.infrastructure-cities.siemens.com.cn/powerdistribution/downloadCenter/upload/西门子中低压智能选型_setup.zip')"><router-link to=""><img src="../assets/images/ZIP.png" alt=""><span>5TT5 自恢复式过欠压保护器宣传册</span></router-link></li>
                <li @click="showMaskModal('http://www.infrastructure-cities.siemens.com.cn/powerdistribution/downloadCenter/upload/3AE-Sion EP 12~24kV VCB Operation Manual_JS040-B.PDF')"><router-link to=""><img src="../assets/images/PDF.png" alt=""><span>3AE EP 12~24kV断路器操作手册</span></router-link></li>
            </ul>
        </div>
        <div class="downloadDoc docSort">
            <h2>下载排行</h2>
            <ul class="downloadUl">
                <li @click="showMaskModal('http://www.infrastructure-cities.siemens.com.cn/powerdistribution/downloadCenter/upload/西门子中低压智能选型_setup.zip')"><router-link to=""><img src="../assets/images/ZIP.png" alt=""><span>电涌保护器技术参数的含义</span></router-link></li>
                <li @click="showMaskModal('http://www.infrastructure-cities.siemens.com.cn/powerdistribution/downloadCenter/upload/20120712100536209.rar')"><router-link to=""><img src="../assets/images/RAR.png" alt=""><span>电涌保护器的功能是什么？有几种类型？</span></router-link></li>
                <li @click="showMaskModal('http://www.infrastructure-cities.siemens.com.cn/powerdistribution/downloadCenter/upload/西门子中低压智能选型_setup.zip')"><router-link to=""><img src="../assets/images/ZIP.png" alt=""><span>电涌保护器5SD7系列常见问题集锦 (2011.5更新版)</span></router-link></li>
                <li @click="showMaskModal('http://www.infrastructure-cities.siemens.com.cn/powerdistribution/downloadCenter/upload/20120712101100178.pdf')"><router-link to=""><img src="../assets/images/PDF.png" alt=""><span>西门子充电桩宣传册</span></router-link></li>
                <li @click="showMaskModal('http://www.infrastructure-cities.siemens.com.cn/powerdistribution/downloadCenter/upload/3AE_40.5kV_Operation manua(Chinese)20160426.pdf')"><router-link to=""><img src="../assets/images/PDF.png" alt=""><span>40.5kV VCB 操作维护手册</span></router-link></li>
            </ul>
        </div>
        <div class="maskDialog" v-show="showMask" @click="hideMask($event)">
            <div class="maskIcon">
                <i class="icon iconfont icon-youjian2" @click="showDialog" ref="email"></i> 
                <a :href="docUrl" target="_blank" class="downloadDoc"><i class="icon iconfont icon-icon download" ref="download"></i></a>
            </div> 
        </div>
        <v-dialog ref="email_dialog" name="email_dialog" v-show="isShowDialog" :isShowDialog="isShowDialog" @hideDialog="hideDialog"></v-dialog>
    </div>
</template>
<script>
import { Swipe, SwipeItem } from 'vant';
import nav from '@/components/nav';
import Dialog from "@/components/dialog";
export default {
    components: {
        Swipe,
        SwipeItem,
        'v-nav': nav,
        "v-dialog": Dialog
	},
    data(){
        return{
            showMask:false,
            docUrl:'',
            isShowDialog: false,
        }
    },
    methods: {
        //判断显示发送邮件弹框
        showDialog() {
            if (!this.isShowDialog) {
                this.isShowDialog = true;
                this.$refs.email_dialog.handleParentClick(this.docUrl);
            }
        },
        //根据子组件返回的值判断是否改变父组件显隐的状态
        hideDialog(data) {
            this.isShowDialog = data.show;
        },
        //显示弹出框
        showMaskModal(docUrl) {
            this.docUrl = docUrl;
            this.showMask = true;
        },
        //隐藏弹出框
        hideMask(e) {
            if(e.target.getAttribute('class') == 'maskDialog'){
                this.showMask = false;
            }
        }
    }
}
</script>
<style scoped>
    .home{
        height: auto;
        overflow: auto;
        padding-bottom: 80px;   
        position: relative;
    }
    .home .banner{
        height: 100%;
        position: relative;
        overflow: hidden;
        height:260px;
        z-index:1;
        background: url('../assets/images/banner2.png') 0% 0%/100% 100% no-repeat;
    }
    .home .banner img.logo{
        width: 100px;
        position: absolute;
        right: 10%;
        top:5%;
    }
    .home .bottom{
        position: absolute;
        bottom: 20px;
        left: 6%;
        width: 70%;
        margin: 0 auto;
        color: #fff;
        font-weight: bold;
        font-size: 18px;
        letter-spacing: 6px;
        height: 50px;
        line-height: 18px;
        background: url('../assets/images/bg1.png') 0% 0%/100% 100% no-repeat;
    }
    .home .banner .van-swipe{
        height:260px;
    }
    .home .banner .van-swipe-item img{
        width: 100%;
        height:100%; 
    }
    .banner .banner_shade{
        position: absolute;
        bottom: 0;
        height: 100px;
        text-align: left;
        background: rgba(0, 0, 0, 0.3);
        color: #ddd;
        font-size: 12px;
        padding: 0 2%;
    }
    .banner .banner_shade .title{
        font-size: 16px;
        margin-top: 0;
        color: #fff;
    }
    .docSort{
        width: 96%;
        margin: 2%;
        padding: 0;
        background: #fff;
        height: auto;
        overflow: hidden;
        padding-bottom:20px;
    }
    .docSort h2{
        font-size: 16px;
        text-align: left;
        text-indent: 12px;
    }
    .docSort ul{
        width:100%;
        padding: 0;
        height: auto;
        overflow: hidden;
        word-wrap: break-word;
        word-break: break-all;
    }
    .docSort ul li{
        width: 90%;
        padding: 0 5%;
        margin-bottom: 0;
        height:auto;
        line-height:40px;
    }
    .docSort ul li a{
        display: block;
        width:100%;
        height:100%;
        text-align: left;
    }
    .docSort ul li a span{
        vertical-align: middle;
        text-indent: 10px;
        display: inline-block;
        width:80%;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
    .docSort ul li a img{
        width: 15%;
        vertical-align: middle;
    }
    .downloadDoc{
        margin: 0 2%;
    }
    .maskDialog {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        z-index: 1000;
        background: rgba(0, 0, 0, 0.8);
    }
    .maskDialog .maskIcon {
        width: 100%;
        position: fixed;
        top:50%;
        margin-top: -50px;
        height: 100px;
        line-height: 100px;
    }
    .maskDialog .maskIcon i {
        font-size: 40px;
        color: #00BAB8;
        background: #fff;
        border-radius: 50%;
        padding: 2%;
        margin: 0 10%;
    } 
</style>

