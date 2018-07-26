<template>
  <van-dialog v-model="show" confirmButtonText="发送" show-cancel-button :before-close="beforeClose">
    <van-field v-model="emailname" label="邮箱" placeholder="请输入您的邮箱" />
  </van-dialog>
</template>

<script>
import { Dialog, Toast } from "vant";
import { getAccessToken, sendEmailModal} from "@/api/api";
export default {
  components: {
    Dialog,
    Toast
  },
  data() {
    return {
      show: false,
      emailname: "",
      docName: "",
      access_token: ""
    };
  },
  props: ["isShowDialog", "hideDialog"],
  watch: {
    isShowDialog(ev) {
      this.show = ev;
      this.emailname = '';
    }
  },
  methods: {
    //获取access_token的方法
    getAnswer(done) {
      getAccessToken().then((result) => {
        this.access_token = result.access_token;
        this.sendEmail(done);
      })
    },
    beforeClose(action, done) {
      if (action === "confirm") {
        this.getAnswer(done);
      } else {
        done();
      }
      this.$emit("hideDialog", {
        show: this.show
      });
    },
    handleParentClick(downloadDoc) {
      if (downloadDoc) {
        this.docName = downloadDoc;
      }
    },
    sendEmail(done) {
      sendEmailModal(this.docName,this.emailname,"西门子文档",this.access_token).then((result) => {
        done();
        this.$emit("hideDialog", {
          show: this.show
        });
        if (result.status == 0) {
          Toast(result.message);
        }
      },(rej)=>{
        done();
        this.$emit("hideDialog", {
          show: this.show
        });
      })
    }
  }
};
</script>
<style>
.van-dialog__confirm,
.van-dialog__confirm:active {
  color: #26a2ff;
}
.van-button--large {
  font-size: 14px;
}
.van-dialog .van-cell {
  line-height: 40px;
}
</style>
