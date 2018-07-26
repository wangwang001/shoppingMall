<template>
  <div class="detailPage">
    <div class="showContent">
      <p class="title">
        {{docName}}
      </p>
      <!-- <p class="imgDetail">
              <img src="../assets/images/banner1.jpg" alt="">
            </p> -->
      <div class="docDetail">
        <van-collapse v-model="activeNameOne" accordion v-bind:key="index1" v-for="(item1,index1) in listItem" @change="download((item1['sub'][0]?item1['sub'][0].label:''),'')">
          <van-collapse-item class="FirstChild" :class="{'switchRightIcon':!(item1['sub'][0]?item1['sub'][0].label:'')}" :title="item1.label" :name="index1" :downloadDoc="item1.downloadAddress" v-if="(listItem[index1].sub.length > 0)">
            <van-collapse v-model="activeNameSecond" accordion v-bind:key="index2" v-for="(item2,index2) in item1.sub" v-if="item2['label']" @change="download((item2['sub'][0]?item2['sub'][0].label:''),item2.downloadAddress)">
              <van-collapse-item class="SecondChild" :class="{'switchRightIcon':!(item2['sub'][0]?item2['sub'][0].label:'')}" :name="index2" :downloadDoc="item2.downloadAddress">
                <div slot="title">
                  <i class="circle"></i>{{item2.label}}</div>
                <van-collapse v-model="activeNameThree" accordion v-bind:key="index3" v-for="(item3,index3) in item2.sub" v-if="item3['label']" @change="download((item3['sub'][0]?item3['sub'][0].label:''),item3.downloadAddress)">
                  <van-collapse-item class="ThirdChild" :class="{'switchRightIcon':!(item3['sub'][0]?item3['sub'][0].label:'')}" :name="index3" :downloadDoc="item3.downloadAddress">
                    <div slot="title">
                      <i class="triangle"></i>{{item3.label}}</div>
                    <van-collapse v-model="activeNameThird" accordion v-bind:key="index4" v-for="(item4,index4) in item3.sub" v-if="item4['label']" @change="download((item4['sub'][0]?item4['sub'][0].label:''),item4.downloadAddress)">
                      <van-collapse-item class="ForthChild" :class="{'switchRightIcon':!(item4['sub'][0]?item4['sub'][0].label:'')}" :name="index4" :downloadDoc="item4.downloadAddress">
                        <div slot="title">
                          <i class="ellipse"></i>{{item4.label}}</div>
                        <van-collapse v-model="activeNameFive" accordion v-bind:key="index5" v-for="(item5,index5) in item4.sub" v-if="item5['label']" @change="download((item5['sub'][0]?item5['sub'][0].label:''),item5.downloadAddress)">
                          <van-collapse-item class="FifthChild FiveLabelName" :class="{'switchRightIcon':!(item5['sub'][0]?item5['sub'][0].label:'')}" :name="index5" :downloadDoc="item5.downloadAddress">
                            <div slot="title">
                              <i class="square"></i>{{item5.label}}</div>
                            <van-collapse v-model="activeNameSix" accordion v-bind:key="index6" v-for="(item6,index6) in item5.sub" v-if="item6['label']" @change="download((item6['sub'][0]?item6['sub'][0].label:''),item6.downloadAddress)">
                              <van-collapse-item class="SixthChild SixLabelName switchRightIcon" :name="index6" :downloadDoc="item6.downloadAddress">
                                <div slot="title">{{item6.label}}</div>
                              </van-collapse-item>
                            </van-collapse>
                          </van-collapse-item>
                        </van-collapse>
                      </van-collapse-item>
                    </van-collapse>
                  </van-collapse-item>
                </van-collapse>
              </van-collapse-item>
            </van-collapse>
          </van-collapse-item>
          <van-collapse-item v-else :title="item1.label" :name="index1">
            <van-collapse v-model="activeNameSecond" accordion @change="download((item1['sub'][0]?item1['sub'][0].label:''),item1.downloadAddress)">
              <van-collapse-item class="SecondChild" :class="{'switchRightIcon':!(item1['sub'][0]?item1['sub'][0].label:'')}" :title="item1.label" :name="index1">
                <div slot="title">
                  <i class="circle"></i>{{item1.label}}</div>
              </van-collapse-item>
            </van-collapse>
          </van-collapse-item>
        </van-collapse>
      </div>
    </div>
    <v-dialog ref="dialog_email" name="dialog_email" v-show="isShowDialog" :isShowDialog="isShowDialog" @hideDialog="hideDialog"></v-dialog>
    <div class="backLeft">
      <img @click="onClickLeft" src="../assets/images/back.png" alt="">
    </div>
  </div>

</template>

<script>
import { NavBar, Collapse, CollapseItem } from "vant";
import { getAccessToken, findLabel } from "@/api/api";
import dialog from "@/components/dialog";
export default {
  components: {
    NavBar,
    Collapse,
    CollapseItem,
    "v-dialog": dialog
  },
  data() {
    return {
      activeNameOne: "",
      activeNameSecond: "",
      activeNameThree: "",
      activeNameThird: "",
      activeNameFive: "",
      activeNameSix: "",
      isShowDialog: false,
      docName: "",
      listItem: [],
      access_token: ""
    };
  },
  created() {
    this.getAnswer();
  },
  watch: {
    $route: "getParams"
  },
  methods: {
    //获取access_token的方法
    getAnswer() {
      getAccessToken().then(result => {
        this.access_token = result.access_token;
        this.getParams();
      });
    },
    onClickLeft() {
      window.history.go(-1);
    },
    getClassName: function(classIds) {
      let formdata = new FormData();
      for (let i = 0; i < classIds.length; i++) {
        formdata.append("classesIds", classIds[i]);
      }
      formdata.append("access_token", this.access_token);
      let config = {
        headers: {
          "Content-Type": "multipart/form-data" //以表单传数据的格式来传递fromdata
        }
      };
      findLabel(formdata, config)
        .then(result => {
          let data = result.list;
          this.listItem = this.listItem.concat(
            this.tidyData("subLabelId", "subLabelName", data, "downloadAddress")
          );
        })
        .then(() => {
          let array = document.getElementsByClassName("switchRightIcon");
          for (let i = 0; i < array.length; i++) {
            array[i].firstChild.removeChild(array[i].firstChild.lastChild);
            let span = document.createElement("span");
            span.innerHTML =
              '<i class="icon iconfont icon-email email' + i + '"></i>';
            array[i].firstChild.appendChild(span);
          }
          for (
            let k = 0;
            k < document.querySelectorAll(".icon-email").length;
            k++
          ) {
            let v = document.querySelectorAll(".icon-email")[k];
            v.onclick = e => {
              e.stopPropagation();
              let downloadDoc = e.target.parentNode.parentNode.parentNode.getAttribute(
                "downloaddoc"
              );
              this.showDialog(downloadDoc);
            };
          }
        });
    },
    getParams() {
      let routerParams = this.$route.params.classesIds;
      let classIds = [];
      if (routerParams) {
        this.docName = this.$route.params.docName;
        classIds = routerParams.split(",");
      } else {
        classIds = localStorage.getItem("routerParams").split(",");
        this.docName = localStorage.getItem("docName");
      }
      this.getClassName(classIds);
    },
    //点击下载
    download(label, downloadAddress) {
      if (label) {
        return;
      } else {
        if(downloadAddress){
          window.open(downloadAddress);
        }else{
          return;
        }
      }
    },
    //判断显示发送邮件弹框
    showDialog(downloadDoc) {
      if (!this.isShowDialog) {
        this.isShowDialog = true;
        this.$refs.dialog_email.handleParentClick(downloadDoc);
      }
    },
    //根据子组件返回的值判断是否改变父组件显隐的状态
    hideDialog(data) {
      this.isShowDialog = data.show;
    }
  }
};
</script>

<style>
.detailPage .van-nav-bar .van-icon {
  color: #fff !important;
}
.van-collapse-item__content {
  background: none;
  padding: 0;
}
.van-collapse-item__title i {
  color: #fff;
}
[class*="van-hairline"]::after {
  border: none;
}
</style>

<style scoped>
.detailPage {
  height: 100%;
  overflow: auto;
  background: url("../assets/images/bg.png") 0% 0%/100% 100% no-repeat;
}
.logo {
  position: absolute;
  top: 20%;
  left: 42%;
  z-index: 2;
}
.van-nav-bar {
  background: -webkit-linear-gradient(
    left,
    #3ec1c4,
    #00a7d5
  ); /* Safari 5.1 - 6.0 */
  background: -o-linear-gradient(
    right,
    #3ec1c4,
    #00a7d5
  ); /* Opera 11.1 - 12.0 */
  background: -moz-linear-gradient(
    right,
    #3ec1c4,
    #00a7d5
  ); /* Firefox 3.6 - 15 */
  background: linear-gradient(to right, #3ec1c4, #00a7d5); /* 标准的语法 */
}
.backLeft {
  position: fixed;
  width: 34px;
  margin: 10px 0 0 10px;
  height: 40px;
  color: #fff;
  text-align: left;
  line-height: 40px;
  bottom: 90px;
  left: 20px;
}
.backLeft img {
  width: 34px;
  height: 34px;
}
.imgDetail img {
  width: 100%;
  height: 100%;
}
.backLeft .van-nav-bar__arrow {
  position: inherit;
  height: 16px;
}
.showContent {
  width: 90%;
  margin: 0 5%;
  margin-top: 10px;
  text-align: left;
  color: #fff;
  margin-bottom: 100px;
}
.showContent .title {
  width: 100%;
  line-height: 50px;
  border-bottom: 1px solid #fff;
  margin: 0 0 5%;
}
.showContent .proDescription {
  font-size: 12px;
  line-height: 24px;
}
.detailImg {
  width: 100%;
  height: 200px;
}
dl {
  padding: 0 0 2%;
  margin: 0;
  border-bottom: 1px solid #fff;
}
dl dt {
  font-weight: bold;
  line-height: 30px;
}
dl dd {
  margin-left: 0;
  line-height: 24px;
}
</style>
