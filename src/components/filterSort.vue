<template>
  <div class="filterSort">
    <div class="header">
      <!-- <van-nav-bar title="" left-text="" left-arrow class="navbar" @click-left="onClickLeft"></van-nav-bar> -->
      <!-- <div class="logo" slot="title">
                <img src="../assets/images/logo.png" alt="">
            </div> -->
    </div>
    <div class="classify">
      <van-collapse v-model="activeNameFirst" class="activeNameFirst" :rel="item1.label" accordion v-bind:key="index1" v-for="(item1,index1) in listItem" @change="getDataId(item1.label,(item1['sub'][0]?item1['sub'][0].label:''),item1.id,('activeFirst'+'_'+index1))">
        <van-collapse-item class="FirstChild" :class="{'hideRightIcon':!(item1['sub'][0]?item1['sub'][0].label:'')}" :title="item1.label" :name="'activeFirst'+'_'+index1">
          <van-collapse v-model="activeNameSecond" accordion v-bind:key="item2.id" v-for="(item2,index2) in item1.sub" v-if="item2['label']" @change="getDataId(item2.label,(item2['sub'][0]?item2['sub'][0].label:''),item1.id+','+item2.id,('activeSecond'+'_'+index2))">
            <van-collapse-item class="SecondChild" :class="{'hideRightIcon':!(item2['sub'][0]?item2['sub'][0].label:'')}" :name="'activeSecond'+'_'+index2">
              <div slot="title">
                <i class="circle"></i>{{item2.label}}</div>
              <van-collapse v-model="activeNameThird" accordion v-bind:key="item3.id" v-for="(item3,index3) in item2.sub" v-if="item3['label']" @change="getDataId(item3.label,(item3['sub'][0]?item3['sub'][0].label:''),item1.id+','+item2.id+','+item3.id,('activeThird'+'_'+index3))">
                <van-collapse-item class="ThirdChild" :class="{'hideRightIcon':!(item3['sub'][0]?item3['sub'][0].label:'')}" :name="'activeThird'+'_'+index3">
                  <div slot="title">
                    <i class="triangle"></i>{{item3.label}}</div>
                  <van-collapse v-model="activeNameForth" accordion v-bind:key="item4.id" v-for="(item4,index4) in item3.sub" v-if="item4['label']" @change="getDataId(item4.label,(item4['sub'][0]?item4['sub'][0].label:''),item1.id+','+item2.id+','+item3.id+','+item4.id,('activeForth'+'_'+index4))">
                    <van-collapse-item class="ForthChild" :class="{'hideRightIcon':!(item4['sub'][0]?item4['sub'][0].label:'')}" :name="'activeForth'+'_'+index4">
                      <div slot="title">
                        <i class="ellipse"></i>{{item4.label}}</div>
                      <van-collapse v-model="activeNameFifth" accordion v-bind:key="item5.id" v-for="(item5,index5) in item4.sub" v-if="item5['label']" @change="getDataId(item5.label,(item5['sub'][0]?item5['sub'][0].label:''),item1.id+','+item2.id+','+item3.id+','+item4.id+','+item5.id,('activeFifth'+'_'+index5))">
                        <van-collapse-item class="FifthChild FiveClassName hideRightIcon" :name="'activeFifth'+'_'+index5">
                          <div slot="title">
                            <i class="square"></i>{{item5.label}}</div>
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
    </div>
    <div class="backLeft">
      <img @click="onClickLeft" src="../assets/images/back.png" alt="">
    </div>
  </div>
</template>

<script>
import { NavBar, Collapse, CollapseItem } from "vant";
import { getAccessToken, findClasses } from "@/api/api";
export default {
  components: {
    NavBar,
    Collapse,
    CollapseItem
  },
  data() {
    return {
      activeNameFirst: "",
      activeNameSecond: "",
      activeNameThird: "",
      activeNameForth: "",
      activeNameFifth: "",
      listItem: [],
      access_token: ""
    };
  },
  created() {
    this.getAnswer();
  },
  methods: {
    //获取access_token的方法
    getAnswer() {
      getAccessToken().then(result => {
        this.access_token = result.access_token;
        this.getClassName();
      });
    },
    onClickLeft() {
      window.history.go(-1);
    },
    getClassName: function() {
      findClasses(this.access_token)
        .then(result => {
          let data = result.list;
          this.listItem = this.listItem.concat(
            this.tidyData(
              "subClassesId",
              "subClassesName",
              data,
              "downloadAddress"
            )
          );
        })
        .then(() => {
          let array = document.getElementsByClassName("hideRightIcon");
          for (let i = 0; i < array.length; i++) {
            array[i].firstChild.lastChild.style.display = "none";
          }

          let name = this.$route.query.name;
          let This = this;
          
          if (localStorage.getItem("filterSort1")) {
            This.activeNameFirst = localStorage.getItem("filterSort1");
          }else{
            for (
              let k = 0;
              k < document.querySelectorAll(".activeNameFirst").length;
              k++
            ) {
              let v = document.querySelectorAll(".activeNameFirst")[k];
              if (v.getAttribute("rel").indexOf(name) != -1) {
                This.activeNameFirst = "activeFirst_" + k;
              }
            }
          }
          if (localStorage.getItem("filterSort2")) {
            This.activeNameSecond = localStorage.getItem("filterSort2");
          }
          if (localStorage.getItem("filterSort3")) {
            This.activeNameThird = localStorage.getItem("filterSort3");
          }
          if (localStorage.getItem("filterSort4")) {
            This.activeNameForth = localStorage.getItem("filterSort4");
          }
          if (localStorage.getItem("filterSort5")) {
            This.activeNameFifth = localStorage.getItem("filterSort5");
          }
        });
    },
    getDataId(text, label, ids, index) {
      
      if(index.indexOf('activeFirst') != -1){
        if(index != localStorage.getItem('filterSort1')){
          localStorage.setItem('filterSort2','')
          localStorage.setItem('filterSort3','')
          localStorage.setItem('filterSort4','')
          localStorage.setItem('filterSort5','')
        }
        localStorage.setItem("filterSort1", index);
      }
      if(index.indexOf('activeSecond') != -1){
        localStorage.setItem("filterSort2", index);
      }
      if(index.indexOf('activeThird') != -1){
        localStorage.setItem("filterSort3", index);
      }
      if(index.indexOf('activeForth') != -1){
        localStorage.setItem("filterSort4", index);
      }
      if(index.indexOf('activeFifth') != -1){
        localStorage.setItem("filterSort5", index);
      }
      if (label) {
        return;
      } else {
        this.$router.push({
          path: "/Detail",
          name: "detail",
          params: {
            name: "detail",
            classesIds: ids,
            docName: text
          }
        });
        localStorage.setItem("routerParams", ids);
        localStorage.setItem("docName", text);
      }
    }
  }
};
</script>
<style>
.filterSort .navbar.van-nav-bar .van-icon {
  color: #fff !important;
}
.van-nav-bar::after {
  border: 0;
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
.filterSort .van-cell {
  font-size: 13px;
}
</style>

<style scoped>
.filterSort {
  min-height: 100%;
  height: auto;
  overflow: hidden;
  background: url("../assets/images/bg2.png") 0% 0%/100% 100% no-repeat;
}
.header {
  width: 40px;
  height: 40px;
  position: fixed;
  top: 0;
  z-index: 2;
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
    #37bec5,
    #09aad2
  ); /* Safari 5.1 - 6.0 */
  background: -o-linear-gradient(
    right,
    #37bec5,
    #09aad2
  ); /* Opera 11.1 - 12.0 */
  background: -moz-linear-gradient(
    right,
    #37bec5,
    #09aad2
  ); /* Firefox 3.6 - 15 */
  background: linear-gradient(to right, #37bec5, #09aad2); /* 标准的语法 */
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
.backLeft .van-nav-bar__arrow {
  position: inherit;
  height: 16px;
}
.classify {
  margin-top: 40px;
  position: relative;
  width: 90%;
  padding: 0 5%;
  margin-bottom: 100px;
}
.classify a {
  color: #fff;
}
.classify .oUl li a {
  position: relative;
  display: block;
  width: 90%;
  margin: 2% auto;
  min-height: 40px;
  line-height: 40px;
  height: auto;
  overflow: hidden;
  border-radius: 20px;
  text-align: left;
  text-indent: 10%;
  opacity: 0.9;
  box-shadow: 0px 1px 2px rgba(255, 255, 255, 0.4);
  background: -webkit-linear-gradient(
    left,
    rgba(55, 190, 197, 0.4),
    rgba(9, 170, 210, 1)
  ); /* Safari 5.1 - 6.0 */
  background: -o-linear-gradient(
    right,
    #37bec5,
    #09aad2
  ); /* Opera 11.1 - 12.0 */
  background: -moz-linear-gradient(
    right,
    #37bec5,
    #09aad2
  ); /* Firefox 3.6 - 15 */
  background: linear-gradient(to right, #37bec5, #09aad2); /* 标准的语法 */
}
.classify .oUl > li .FirstChild li a {
  opacity: 0.8;
  background: -webkit-linear-gradient(
    left,
    #90b1d4,
    #a0c1e2
  ); /* Safari 5.1 - 6.0 */
  background: -o-linear-gradient(
    right,
    #90b1d4,
    #a0c1e2
  ); /* Opera 11.1 - 12.0 */
  background: -moz-linear-gradient(
    right,
    #90b1d4,
    #a0c1e2
  ); /* Firefox 3.6 - 15 */
  background: linear-gradient(to right, #90b1d4, #a0c1e2); /* 标准的语法 */
}
.classify .oUl > li .secondChild li a {
  text-indent: 12%;
  background: -webkit-linear-gradient(
    left,
    #7fa5cf,
    #93b9df
  ); /* Safari 5.1 - 6.0 */
  background: -o-linear-gradient(
    right,
    #7fa5cf,
    #93b9df
  ); /* Opera 11.1 - 12.0 */
  background: -moz-linear-gradient(right, #7fa5cf, #93b9df);
  /* Firefox 3.6 - 15 */
  background: linear-gradient(to right, #7fa5cf, #93b9df); /* 标准的语法 */
}
.classify .oUl > li .FirstChild li span.circle {
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #fff;
  margin-right: 5px;
}
.classify .oUl > li .FirstChild li span.triangle {
  display: inline-block;
  width: 0;
  height: 0;
  border-top: 5px solid transparent;
  border-left: 6px solid #fff;
  border-bottom: 5px solid transparent;
  margin-right: 5px;
}
.van-icon {
  position: absolute;
  right: 20%;
  top: 30%;
  width: 10px;
  height: 10px;
  border-color: #fff;
}
.van-icon-arrow-down::before {
  border: solid 1px #fff;
  border-bottom-width: 0;
  border-left-width: 0;
  content: " ";
  width: 10px;
  height: 10px;
  -webkit-transform: translateY(-50%) rotate(135deg);
  transform: translateY(-50%) rotate(135deg);
}
</style>
