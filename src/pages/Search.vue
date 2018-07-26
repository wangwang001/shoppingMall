  <template>
  <div class="search">
    <div id="content-wrapper">
      <div class="showFAQ" v-show="showFAQ">
        <div class="oSpan">
          <div v-for="(item,index) in dataConList" v-bind:key="index">
            <div v-if="item.msgType == 'text'">
              <!--文本-->
              <div v-if="item.answerType == '-2'">
                <!--未知回复-->
                <p v-if="docSearchList && docSearchList.length > 0" class="unknowQue"></p>
                <p v-html="item.ansCon" v-else></p>
              </div>
              <div v-else-if="item.answerType == '-5'">
                <!--流程-->
                <p v-html="item.ansCon"></p>
              </div>
              <div v-else-if="item.answerType == '-322'">
                <!--营销广告-->
                <p v-html="item.ansCon"></p>
              </div>
              <div v-else-if="item.answerType == '-30'">
                <!--富文本-->
                <p v-html="item.ansCon"></p>
              </div>
              <div v-else-if="item.answerType == '-1'">
                <!--场景式问答、反问引导-->
                <p>{{item.gusWords.ydWords}}</p>
                <div class="MN_gusList" v-for="(item1,index1) in item.gusList" v-bind:key="index1">
                  <div class="MN_guideQue">{{item1.sequence}}.
                    <span>{{item1.question}}</span>
                  </div>
                </div>
                <p>{{item.gusWords.afterWords}}</p>
              </div>
              <div v-else>{{item.ansCon}}</div>
            </div>
            <div v-else-if="item.msgType == 'richtext'">
              <!--图文-->
              <p v-html="item.ansCon"></p>
            </div>
            <div v-else-if="item.msgType == 'image'">
              <!--图片-->
              <img class="imgBox" :src="item.ansCon" alt="">
            </div>
            <div v-else-if="item.msgType == 'video'">
              <!--视频-->
              <video class="edui-upload-video vjs-default-skin video-js" :src="item.ansCon" alt="" controls>
                <source :src="item.ansCon">
              </video>
            </div>
            <div v-else-if="item.msgType == 'voice'">
              <!--音频-->
              <audio :src="item.ansCon" alt="" controls>
                <source :src="item.ansCon">
              </audio>
            </div>
            <div v-else-if="item.msgType == 'news'">
              <!--图文-->
              <div class="findNews" v-for="(item1,index1) in item.news.articles" v-bind:key="index1">
                <a class="news" :href="item1.url" v-if="(item.news.articles.length) <= 1">
                  <img class="newsImg" :src="item1.picurl" alt="">
                  <span class="newsTitle">{{item1.title}}</span>
                </a>
                <a class="news" :href="item1.url" v-else>
                  <img class="newsImg" :src="item1.picurl" alt="">
                  <span class="newsTitle">{{item1.title}}</span>
                </a>
              </div>
            </div>
            <div v-else-if="item.msgType == 'command'">
              <!--智能推荐-->
              <p>{{item.ansCon}}</p>
              <div v-if="item.relateList && item.relateList.length > 0">
                <p>您是否要咨询以下问题？</p>
                <div class="MN_gusList" v-for="(item1,index1) in item.relateList" v-bind:key="index1">
                  <div class="MN_relateList">{{item.relateListStartSelectIndex + index1}}.
                    <span>{{item1.question}}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="docInterlocution" v-show="showDoc">
        <div class="setFAQ">
          <div class="clickSelect">
            <i class="icon iconfont icon-icon6" @click="showSideBar"></i>
          </div>
          <div class="scrollX" ref="docList">
            <v-touch v-on:swipeup="docUp()" v-on:swipedown="docDown()">
              <ul class="docList">
                <div v-if="docSearchList && docSearchList.length > 0">
                  <li @click="showMaskModal(item.url)" v-for="(item,index) in docSearchList" v-bind:key="index" :href="item.url">
                    <div v-if="/\.(pdf)$/i.test(item.url)">
                      <img src="../assets/images/PDF.png" alt="">
                    </div>
                    <div v-else-if="/\.(doc)$/i.test(item.url)">
                      <img src="../assets/images/word.png" alt="">
                    </div>
                    <div v-else-if="/\.(exe)$/i.test(item.url)">
                      <img src="../assets/images/exe.png" alt="">
                    </div>
                    <div v-else-if="/\.(ppt)$/i.test(item.url)">
                      <img src="../assets/images/PPT.png" alt="">
                    </div>
                    <div v-else-if="/\.(zip)$/i.test(item.url)">
                      <img src="../assets/images/ZIP.png" alt="">
                    </div>
                    <div v-else-if="/\.(rar)$/i.test(item.url)">
                      <img src="../assets/images/RAR.png" alt="">
                    </div>
                    <div v-else-if="/\.(xls|xlsx)$/i.test(item.url)">
                      <img src="../assets/images/excel.png" alt="">
                    </div>
                    <div v-else-if="/\.(jpg|png|jpeg|bpm|gif)$/i.test(item.url)">
                      <img src="../assets/images/pic.png" alt="">
                    </div>
                    <div class="showContent">
                      <p class="title">{{item.title}}</p>
                    </div>
                  </li>
                </div>
                <p v-else>暂无检索结果！</p>
              </ul>
            </v-touch>
          </div>
          <div class="mask" v-show="showMask">
            <!-- <div class="maskIcon"> -->
            <i class="icon iconfont icon-youjian2" @click="showDialog" ref="email"></i>
            <a :href="docUrl" target="_blank" class="downloadDoc">
              <i class="icon iconfont icon-icon download" ref="download"></i>
            </a>
            <!-- </div> -->
          </div>
          <v-dialog ref="email_dialog" :name="23" v-show="isShowDialog" :isShowDialog="isShowDialog" @hideDialog="hideDialog"></v-dialog>
        </div>
      </div>
    </div>
    <v-touch class="sidebarSwipe" v-on:swipeleft="onSwipeLeft()" v-on:swiperight="onSwipeRight()">
      <div class="searchBG" @click="hideMaskModal" :class="[zIndex ? 'bgZindex':'']"></div>
    </v-touch>
    <v-sidebar :switchShow="switchShow" @getClassId="getClassId"></v-sidebar>
  </div>
</template>

  <script>
import Dialog from "@/components/dialog";
import SideBar from "@/components/sidebar";
import { getAccessToken, initMessage, getFAQ, getDoc } from "@/api/api";
export default {
  components: {
    "v-dialog": Dialog,
    "v-sidebar": SideBar
  },

  data() {
    return {
      showMask: false, //显示发送邮件和下载的模态框
      showFAQ: false, //显示问答内容
      showDoc: false, //显示检索文档
      dataConList: [],
      docSearchList: [],
      access_token: "", //access_token
      question: "", //输入问题
      pageNo: 1, //当前页
      pageSize: "6", //每页多少条
      totalPage: "", //总页数
      docUrl: "", //文档链接路径
      classIds: "",
      getQueCon: "",
      isShowDialog: false,
      showShade: "",
      switchShow: false, //控制侧边栏左右显示 true 代表控制right为0；false代表控制right为-1500px
      zIndex: false //控制透明背景显示z-index的层次
    };
  },
  props: ["searchQue", "showInputCon", "showShadeDialog"],
  methods: {
    handleParentClick(question, dataType) {
      if (question) {
        this.docSearchList = [];
        this.question = question;
        this.classIds = "";
        this.getAnswer(question, dataType);
      } else {
        this.showFAQ = false;
        this.showDoc = false;
        this.switchShow = false;
      }
    },
    //获取access_token的方法
    getAnswer(question, dataType) {
      getAccessToken().then(result => {
        this.access_token = result.access_token;
        if (dataType != "welcome") {
          this.getDocSearch(question, 1, this.classIds);
        }
        //this.getInit(question);
      });
    },
    //调用初始化接口s=p
    getInit(question) {
      initMessage().then(result => {
        this.getQue(question);
      });
    },
    //获取问答的方法
    getQue(question) {
      getFAQ(question)
        .then(result => {
          let res = result.data;
          this.dataConList = res.robotAnswer;
          if (this.dataConList && this.dataConList.length > 0) {
            this.showFAQ = true;
          }
        })
        .then(() => {
          //如果是未知问题且检索没有结果则不展示
          if (document.getElementsByClassName("unknowQue")[0]) {
            if (
              document.getElementsByClassName("unknowQue")[0].innerText == ""
            ) {
              document.getElementsByClassName("oSpan")[0].style.display =
                "none";
            }
          } else {
            document.getElementsByClassName("oSpan")[0].style.display = "block";
          }

          //流程关联标准问
          for (
            let k = 0;
            k < document.querySelectorAll(".welcomeWords").length;
            k++
          ) {
            let v = document.querySelectorAll(".welcomeWords")[k];
            v.onclick = e => {
              e.stopPropagation();
              e.preventDefault();
              this.$emit("showInputCon", {
                getQueCon: e.target.getAttribute("question")
              });
            };
          }

          //流程关联流程
          for (
            let k = 0;
            k < document.querySelectorAll(".wflink").length;
            k++
          ) {
            let v = document.querySelectorAll(".wflink")[k];
            v.onclick = e => {
              e.stopPropagation();
              e.preventDefault();
              this.$emit("showInputCon", {
                getQueCon: e.target.innerHTML
              });
            };
          }

          //智能推荐
          for (
            let k = 0;
            k < document.querySelectorAll(".MN_relateList").length;
            k++
          ) {
            let v = document.querySelectorAll(".MN_relateList")[k];
            v.onclick = e => {
              e.stopPropagation();
              e.preventDefault();
              this.$emit("showInputCon", {
                getQueCon: e.target.innerHTML
              });
            };
          }

          //场景式问答
          for (
            let k = 0;
            k < document.querySelectorAll(".MN_guideQue").length;
            k++
          ) {
            let v = document.querySelectorAll(".MN_guideQue")[k];
            v.onclick = e => {
              e.stopPropagation();
              e.preventDefault();
              this.$emit("showInputCon", {
                getQueCon: e.target.innerHTML
              });
            };
          }
        });
    },
    //获取文档检索的方法
    getDocSearch(question, pageNo, classIds) {
      getDoc(this.access_token, question, pageNo, this.pageSize, classIds).then(
        result => {
          if(result.data.list.length > 0){
            for(var i = 0;i < result.data.list.length;i++){
              this.docSearchList.push(result.data.list[i]);
            }
          }
          this.showDoc = true;
          this.totalPage = result.data.totalPage;
        }
      );
    },
    showMaskModal(docUrl) {
      this.docUrl = docUrl;
      this.showMask = true;
    },
    hideMaskModal(ev) {
      if (this.showMask) {
        this.showMask = false;
      }
      if (this.switchShow) {
        this.showSideBar();
      }
      if (!this.searchQue && !this.showFAQ && !this.showDoc) {
        this.$emit("showInputCon", {
          showShade: false
        });
      }
    },
    getClassId(data) {
      this.classIds = data.classIds;
      this.docSearchList = [];
      this.getDocSearch(this.question, 1, data.classIds);
      this.showSideBar();
    },
    //显示侧边栏
    showSideBar() {
      this.switchShow = !this.switchShow;
      this.zIndex = !this.zIndex;
    },
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
    //向上滑动加载检索文档
    docUp() {
      if (this.pageNo < this.totalPage) {
        this.pageNo = this.pageNo + 1;
      }
      this.getDocSearch(this.question, this.pageNo, this.classIds);
    },
    //向下滑动加载检索文档
    docDown() {
      if (this.pageNo > 1) {
        this.pageNo = this.pageNo - 1;
      }
      this.getDocSearch(this.question, this.pageNo, this.classIds);
    },
    //向左滑动显示侧边框
    onSwipeLeft() {
      if (this.showDoc) {
        this.switchShow = true;
        this.zIndex = true;
      }
    },
    //向右滑动隐藏侧边框
    onSwipeRight() {
      this.switchShow = false;
      this.zIndex = false;
    }
  }
};
</script>
  <style>
    .showFAQ .oSpan a {
      color: #008cee;
      cursor: pointer;
    }
    .showFAQ .oSpan img {
      max-width: 100%;
    }
    .showFAQ .oSpan .msg-item img.i-img {
      width: 100%;
    }
    .msg-item-wrapper {
      border: 1px solid #ccc;
      background: #fff;
      border-bottom: none;
      overflow: hidden;
    }
    .msg-item-wrapper .appmsgItem {
      overflow: hidden;
      position: relative;
    }
    .cover {
      font-size: 0;
      margin: 10px 14px 12px;
      overflow: hidden;
      position: relative;
    }
    .cover .msg-t {
      background: none repeat scroll 0 0 rgba(0, 0, 0, 0.6) !important;
      bottom: 0;
      color: #fff;
      margin: 0;
      overflow: hidden;
      position: absolute;
      width: 100%;
      height: 32px;
    }
    .msg-t {
      font-size: 16px;
      font-weight: 400;
      letter-spacing: 1px;
      line-height: 28px;
      margin: 6px 14px 0;
      max-height: 56px;
      overflow: hidden;
    }
    .cover .i-title {
      display: block;
      padding-left: 4px;
      padding-right: 4px;
    }
    .cover img {
      width: 100%;
    }
    .msg-item-wrapper .cover .msg-t span {
      color: #fff;
      position: absolute;
      display: block;
      left: 10px;
      bottom: 3px;
      z-index: 1;
      font-size: 15px;
    }
    .msg-item-wrapper .cover em {
      position: absolute;
      background: #000;
      display: block;
      width: 100%;
      height: 25px;
      left: 0;
      bottom: 0;
      opacity: 0.3;
      filter: alpha(opacity=30);
    }
    .msg-item-wrapper .cover .i-img {
      min-width: 100%;
    }
    .msg-item-wrapper .sub-msg-item {
      position: relative;
      height: 70px;
      line-height: 70px;
      overflow: hidden;
      padding: 0 10px;
      border-bottom: 1px solid #ccc;
    }
    .msg-item-wrapper .sub-msg-item .i-img {
      width: 50px;
      height: 50px;
      position: absolute;
      top: 10px;
      right: 10px;
    }
    .msg-item-wrapper .sub-msg-item .msg-t {
      width: 60%;
    }
    .docInterlocution .scrollX div,
    .search .sidebarSwipe {
      /* touch-action: pan-y !important; */
    }
  </style>

  <style scoped>
    .search {
      width: 100%;
      height: 100%;
      overflow: auto;
      color: #fff;
      position: relative;
    }
    #content-wrapper {
      position: relative;
      top: 100px;
      width: 90%;
      padding: 0 5%;
      height: auto;
      padding-bottom: 70px;
    }
    .showFAQ {
      width: 100%;
      height: auto;
      margin-bottom: 20px;
      position: relative;
      z-index: 2;
    }
    .showFAQ .oSpan {
      width: auto;
      height: auto;
      padding: 8px;
      text-align: left;
      height: auto;
      background: rgba(0, 0, 0, 1);
      border-radius: 5px;
    }

    .showFAQ .oSpan img.imgBox,
    .showFAQ .oSpan video {
      width: 100%;
      height: 250px;
    }

    .showFAQ .oSpan .news {
      display: block;
      width: 100%;
      height: auto;
      position: relative;
    }
    .showFAQ .oSpan .news .newsImg {
      width: 100%;
      height: 150px;
    }
    .showFAQ .oSpan .news .newsTitle {
      position: absolute;
      bottom: 0;
      width: 100%;
      height: 30px;
      line-height: 30px;
      background: rgba(0, 0, 0, 0.8);
      color: #fff;
    }
    .showFAQ .oSpan .findNews:not(:first-child) {
      height: 100px;
    }
    .showFAQ .oSpan .findNews:not(:first-child) .newsImg {
      width: 100px;
      height: 100px;
      float: right;
    }
    .showFAQ .oSpan .findNews:not(:first-child) .newsTitle {
      position: relative;
      float: left;
      background: none;
      width: 70%;
      bottom: 60px;
    }
    .showFAQ .oSpan audio {
      width: 100%;
      height: 50px;
    }
    .MN_gusList,
    .MN_relateList {
      color: #008cee;
      cursor: pointer;
    }
    .docInterlocution {
      width: 100%;
      height: auto;
      position: relative;
      z-index: 2;
    }
    .docInterlocution .setFAQ {
      width: 96%;
      margin: 0 auto;
      height: auto;
      min-height: 340px;
      max-height: 360px;
      overflow: hidden;
      position: relative;
      padding: 0 1% 5%;
      border-radius: 5px;
      background: rgba(0, 0, 0, 0.5);
    }
    .docInterlocution .clickSelect {
      width: 100%;
      height: 32px;
      position: relative;
    }
    .docInterlocution .scrollX {
      width: 100%;
      max-height: 340px;
      overflow: auto;
    }
    .docInterlocution .clickSelect .iconfont {
      position: absolute;
      right: 0;
      top: 0;
      font-size: 28px;
      background: rgba(0, 0, 0, 0.6);
      color: #ccc;
    }
    .docInterlocution .showContent {
      word-break: break-all;
      width: 70%;
    }
    .docList {
      width: 100%;
      height: auto;
      overflow: hidden;
    }
    .docList li {
      width: 98%;
      margin: 0 auto;
      min-height: 50px;
      height: auto;
      overflow: hidden;
      text-align: left;
      color: #ccc;
    }
    .docList li div{
      vertical-align: middle;
      width:20%;
      display:inline-block;
    }
    .docList li img {
      width:100%;
      vertical-align: middle;
    }
    .docList li p {
      width:100%;
      text-align: left;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
      display: inline-block;
    }
    .mask {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 222;
      background: rgba(0, 0, 0, 0.8);
    }
    .mask .maskIcon {
      width: 100%;
      margin-top: 46%;
      height: 26%;
      line-height: 60px;
    }
    .mask i {
      font-size: 27px;
      color: #00bab8;
      background: #fff;
      border-radius: 50%;
      padding: 2%;
      margin: 0 10%;
      display: inline-block;
      margin-top: 150px;
    }
    .searchBG {
      position: absolute;
      z-index: 1;
      opacity: 0;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
    }
    .bgZindex {
      z-index: 2;
    }
  </style>
