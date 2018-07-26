<template>
  <div class="footer">
    <!-- 底部菜单项 -->
    <div class="tabar">
      <van-tabbar v-model="active">
        <!-- 首页按钮 -->
        <van-tabbar-item icon="home" @click="hideShade()" to="/">
          <!-- <router-link to="/"> -->
            首页
          <!-- </router-link> -->
        </van-tabbar-item>
        <!-- 语音按钮 -->
        <van-tabbar-item class="robot">
          <span class="record-tip" v-show="isShowTip">长按发送语音</span>
          <span class="record-btn" @touchstart="focusState=false;startRecord($event)" @touchend="stopRecord($event)" @touchmove="touchMove($event)"></span>
        </van-tabbar-item>
        <!-- 搜索按钮 -->
        <van-tabbar-item icon="search" @click="showShade()">
          搜索
        </van-tabbar-item>
      </van-tabbar>
    </div>
    <!-- 遮罩 -->
    <div class="record-shade-wrapper" v-show="isShowShade">
      <!-- 检索输入框 -->
      <div class="search_input" v-show="isShowInput">
        <input type="text" v-model="searchQue" @keyup="inputKey($event)" v-focus="focusState" @blur="focusState = false">
        <i class="van-icon van-icon-search" @click="showAnswer"></i>
      </div>
      <!-- 遮罩 -->
      <div class="record-shade"></div>
      <!-- 语音图标 -->
      <div class="icon-wrapper" v-show="isShowYuYin">
        <!-- 竖条 -->
        <div class="la-line-scale-pulse-out">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <!-- 话筒 -->
        <i class="icon iconfont icon-icon-yuyin"></i>
      </div>
      <!-- 箭头 -->
      <div class="move-cancel" v-show="isShowCancel">
        <i class="icon iconfont icon-iconhome"></i>
        <p>上划取消</p>
      </div>
      <!-- 音效 -->
      <audio ref="touchAudio">
        <source src="../assets/audio/88150873674.mp3" type="audio/mpeg"> Your browser does not support the audio tag.
      </audio>
      <audio ref="sendAudio">
        <source src="../assets/audio/88150839684.mp3" type="audio/mpeg"> Your browser does not support the audio tag.
      </audio>
      <!-- 检索问题和答案显示区 -->
      <v-search ref="myChild" @showInputCon="showInputCon"></v-search>
    </div>
  </div>
</template>
<script>
import { Tabbar, TabbarItem } from "vant";
import Search from "@/pages/Search";
import { getSignature } from "@/api/api";
import wx from "weixin-js-sdk";
export default {
  components: {
    "v-search": Search
  },
  data() {
    return {
      active: 0,
      localId: "",
      recordTimer: null,
      START: null,
      END: null,
      isShowShade: false,
      isShowYuYin: false,
      isShowInput: false,
      isShowTip: false,
      isShowCancel: false,
      focusState: false, //输入框获取焦点状态
      searchQue: "",
      posStart: 0,
      posEnd: 0,
      posMove: 0
    };
  },
  watch: {
    // 监听遮罩背景是否变化
    isShowShade(ev) {
      this.$emit("isShowShade", {
        isShowShade: ev
      });
    }
  },
  directives: {
    focus: {
      update: function(el, { value }) {
        if (value) {
          el.focus();
        }
      }
    }
  },
  created() {
    // alert("miniprogram"===window.__wxjs_environment);
    this.getSign();
  },
  methods: {
    // 隐藏遮罩部分所有内容
    initShow() {
      this.isShowShade = false;
      this.isShowYuYin = false;
      this.isShowInput = false;
      this.isShowTip = false;
      this.active = 0;
    },
    // 显示遮罩
    showShade() {
      this.initShow();
      this.focusState = true;
      if (!this.isShowShade) {
        this.isShowShade = true;
        this.isShowInput = true;
        this.searchQue = "";
        this.active = 2;
        this.$refs.myChild.handleParentClick(this.searchQue);
      }
    },
    // 隐藏遮罩
    hideShade() {
      this.initShow();
    },
    // 显示提示
    showTip() {
      this.isShowTip = true;
      this.searchQue = "";
      this.$refs.myChild.handleParentClick(this.searchQue);
      setTimeout(() => {
        this.isShowTip = false;
      }, 500);
    },
    //输入框回车
    inputKey(ev) {
      if (ev.keyCode == 13) {
        this.showAnswer();
      }
    },
    //当答案是智能推荐，流程等时点击时问题自动进入输入框
    showInputCon(data) {
      if (data.getQueCon) {
        this.searchQue = data.getQueCon;
        this.showAnswer("welcome");
      }
      if (data.showShade == false) {
        this.hideShade();
      }
    },
    //点击按钮调用子组件方法获取数据
    showAnswer(data) {
      setTimeout(() => {
        this.$refs.myChild.handleParentClick(this.searchQue, data);
      }, 300);
    },
    // 获取公众号签名
    getSign() {
      getSignature(encodeURIComponent(location.href.split("#")[0])).then((result) => {
        let data = result;
        wx.config({
          debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
          appId: data.appId, // 必填，公众号的唯一标识
          timestamp: data.timestamp, // 必填，生成签名的时间戳
          nonceStr: data.nonceStr, // 必填，生成签名的随机串
          signature: data.signature, // 必填，签名
          jsApiList: [
            "startRecord",
            "stopRecord",
            "onVoiceRecordEnd",
            "playVoice",
            "translateVoice"
          ] // 必填，需要使用的JS接口列表
        });
        wx.ready(function() {
          // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
          wx.startRecord({
            success: function() {
              setTimeout(() => {
                wx.stopRecord({
                  success: res => {},
                  fail: function(res) {}
                });
              }, 300);
            },
            cancel: () => {
              alert("用户拒绝授权录音");
            }
          });
        });
      })
    },
    // 开始录音
    startRecord(event) {
      this.$refs.myChild.handleParentClick("");
      event.preventDefault();
      this.touchAudio();
      this.START = new Date().getTime();
      this.searchQue = "";
      this.posStart = 0;
      this.posStart = event.touches[0].pageY;
      this.recordTimer = setTimeout(() => {
        if (!this.isShowShade) {
          this.isShowShade = true;
          this.isShowInput = true;
        }
        if (!this.isShowYuYin) {
          this.isShowYuYin = true;
          this.active = 2;
          this.$refs.myChild.handleParentClick(this.searchQue);
        }
        wx.startRecord({
          success: function() {},
          cancel: () => {
            this.isShowShade = false;
            this.isShowInput = false;
            this.isShowYuYin = false;
            alert("用户拒绝授权录音");
          }
        });
      }, 300);
    },
    // 停止录音
    stopRecord(event) {
      event.preventDefault();
      this.END = new Date().getTime();
      this.posEnd = 0;
      this.posEnd = event.changedTouches[0].pageY;
      // 上划150像素，取消录音
      if (this.posStart - this.posEnd > 100) {
        this.isShowCancel = false;
        wx.stopRecord();
        return;
      }

      if (this.END - this.START < 300) {
        this.initShow();
        // 点击提示“长按发送语音”
        this.isShowShade = true;
        this.isShowTip = true;
        this.$refs.myChild.handleParentClick("");
        setTimeout(() => {
          this.initShow();
        }, 1000);

        this.END = 0;
        this.START = 0;
        //小于300ms，不录音
        clearTimeout(this.recordTimer);
      } else {
        this.isShowYuYin = false;
        wx.stopRecord({
          success: res => {
            this.isShowYuYin = false;
            this.localId = res.localId;
            this.translateVoice();
          },
          fail: function(res) {
            // alert(JSON.stringify(res));
          }
        });
        this.$refs.myChild.handleParentClick("");
      }
    },
    // 播放语音
    playVoice() {
      wx.playVoice({
        localId: this.localId, // 需要播放的音频的本地ID，由stopRecord接口获得
        success: function() {},
        fail: function(res) {
          alert(resizeTo);
        }
      });
    },
    // 语音转文字
    translateVoice() {
      this.sendAudio();
      wx.translateVoice({
        localId: this.localId, // 需要识别的音频的本地Id，由录音相关接口获得
        isShowProgressTips: 1, // 默认为1，显示进度提示
        success: res => {
          this.searchQue = res.translateResult; // 语音识别的结果
          this.showAnswer();
        }
      });
    },
    // 上划动作
    touchMove(event) {
      this.posMove = 0;
      this.posMove = event.targetTouches[0].pageY;
      if (this.posStart - this.posMove > 100) {
        this.isShowYuYin = false;
        this.isShowCancel = true;
      } else {
        this.isShowYuYin = true;
        this.isShowCancel = false;
      }
    },
    // 播放长按音效
    touchAudio() {
      const audio = this.$refs.touchAudio;
      audio.play();
    },
    // 播放发送音效
    sendAudio() {
      const audio = this.$refs.sendAudio;
      audio.play();
    }
  }
};
</script>

<style>
.robot .van-tabbar-item__icon{
  position: relative;
  width:100%;
  height:100%;
}
</style>

<style scoped>
.robot{
  -webkit-user-select: none;
  -moz-user-select: none;
  user-select: none;
}
.move-cancel {
  color: #fff;
  margin-top: 200px;
}
.move-cancel > i {
  display: inline-block;
  transform: rotate(-90deg);
  font-size: 100px;
}
.move-cancel > p {
  background: rgba(244, 32, 35, 0.6);
  font-size: 20px;
  width: 150px;
  margin: auto;
  padding: 5px;
  border-radius: 5px;
}
.record-tip {
  position: absolute;
  bottom: 115px;
  width: 100px;
  left: 10px;
  color: #fff;
  font-size: 14px;
}
.robot {
  position: relative;
}
.record-btn {
  /* position: absolute;
  bottom: -18px;
  left: -3px; */
  margin: -36% auto 0;
  display: inline-block;
  width: 100px;
  height: 132px;
  background: url("../assets/images/voice.png") 0% 0%/100% 100% no-repeat;
  transform: scale(0.4);
  z-index: 999;
}
.footer{
  width:100%;
  height:50px;
}
.tabar {
  width: 100%;
  position: fixed;
  height: 50px;
  bottom: 0;
  z-index: 999;
  box-shadow: 0 0 20px #ccc;
}
.tabar .van-tabbar-item--active {
  background: none;
  color: #26a2ff;
}
.tabar .van-tabbar-item {
  font-weight: bold;
}
.tabar .van-tabbar-item--active a {
  color: #26a2ff;
}
.tabar .robot img {
  width: 60px;
  height: 60px;
  position: absolute;
  bottom: 10%;
  left: 41%;
  z-index: 999;
}
.record-shade-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 990;
  background: rgba(0, 0, 0, 0.6);
}
.record-shade-wrapper > .icon-wrapper {
  margin-top: 200px;
  position: relative;
}
div.la-line-scale-pulse-out {
  position: absolute;
  left: 0;
  width: 100%;
}
div.la-line-scale-pulse-out > div {
  width: 5px;
  height: 50px;
  margin: 5px;
}
i.icon-icon-yuyin {
  font-size: 80px;
  color: #fff;
  position: absolute;
  left: 0;
  width: 100%;
}
i.icon-icon-yuyin {
  top: 100px;
}
.record-shade-wrapper > .search_input {
  position: absolute;
  width: 100%;
  z-index: 10;
}
.record-shade-wrapper > .search_input > input {
  margin: 15px auto;
  width: 80%;
  border-radius: 50px;
  height: 30px;
  text-indent: 10px;
  padding-right: 40px;
}
.record-shade-wrapper > .search_input > i {
  position: absolute;
  font-size: 24px;
  top: 19px;
  right: 10%;
  z-index: 15;
}
</style>
