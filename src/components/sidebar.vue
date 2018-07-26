<template>
  <div class="sidebar" :class="{'showSideBar' : switchShow}">
    <div class="sidebar-con">
      <van-collapse v-model="activeNameOne" class="activeNameOne" :name="item1.id" :rel="item1.label" accordion v-bind:key="index" v-for="(item1,index) in listItem" @change="getDataId(item1.label,(item1['sub'][0]?item1['sub'][0].label:''),item1.id)">
        <van-collapse-item class="FirstChild" :class="{'hideRightIcon':!(item1['sub'][0]?item1['sub'][0].label:'')}" :title="item1.label" :name="'active'+'_'+index">
          <van-collapse v-model="activeNameSecond" accordion v-bind:key="item2.id" v-for="item2 in item1.sub" v-if="item2['label']" @change="getDataId(item2.label,(item2['sub'][0]?item2['sub'][0].label:''),item2.id)">
            <van-collapse-item class="SecondChild" :class="{'hideRightIcon':!(item2['sub'][0]?item2['sub'][0].label:'')}" :name="item2.id">
              <div slot="title">
                <i class="circle"></i>{{item2.label}}</div>
              <van-collapse v-model="activeNameThree" accordion v-bind:key="item3.id" v-for="item3 in item2.sub" v-if="item3['label']" @change="getDataId(item3.label,(item3['sub'][0]?item3['sub'][0].label:''),item3.id)">
                <van-collapse-item class="ThirdChild" :class="{'hideRightIcon':!(item3['sub'][0]?item3['sub'][0].label:'')}" :name="item3.id">
                  <div slot="title">
                    <i class="triangle"></i>{{item3.label}}</div>
                  <van-collapse v-model="activeNameThird" accordion v-bind:key="item4.id" v-for="item4 in item3.sub" v-if="item4['label']" @change="getDataId(item4.label,(item4['sub'][0]?item4['sub'][0].label:''),item4.id)">
                    <van-collapse-item class="ForthChild" :class="{'hideRightIcon':!(item4['sub'][0]?item4['sub'][0].label:'')}" :name="item4.id">
                      <div slot="title">
                        <i class="ellipse"></i>{{item4.label}}</div>
                      <van-collapse v-model="activeNameFive" accordion v-bind:key="item5.id" v-for="item5 in item4.sub" v-if="item5['label']" @change="getDataId(item5.label,(item5['sub'][0]?item5['sub'][0].label:''),item5.id)">
                        <van-collapse-item class="FifthChild FiveClassName hideRightIcon" :name="item5.id">
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
  </div>
</template>

<script>
import { Collapse, CollapseItem } from "vant";
import { findClasses, getAccessToken } from "@/api/api";
export default {
  components: {
    Collapse,
    CollapseItem
  },
  data() {
    return {
      activeNameOne: "",
      activeNameSecond: "",
      activeNameThree: "",
      activeNameThird: "",
      activeNameFive: "",
      listItem: [],
      classIds: "",
      access_token: ""
    };
  },
  props: ["switchShow", "getClassId"],
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
    hasChild(question, access_token) {
      this.question = question;
      this.access_token = access_token;
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
        .then(function() {
          let array = document.getElementsByClassName("hideRightIcon");
          for (let i = 0; i < array.length; i++) {
            array[i].firstChild.lastChild.style.display = "none";
          }
        });
    },
    getDataId(text, label, ids) {
      if (label) {
        return;
      } else {
        this.$emit("getClassId", {
          classIds: ids
        });
      }
    }
  }
};
</script>

<style>
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
.van-collapse {
  /* padding: 2% 0 0.5%; */
}
</style>

<style scoped>
.sidebar {
  position: fixed;
  z-index: 9999;
  width: 80%;
  top: 0;
  right: -1500px;
  height: 100%;
  overflow: auto;
  background: url("../assets/images/bg.png") 0% 0%/100% 100% no-repeat;
  transition: all 0.4s ease;
}
.showSideBar {
  right: 0;
}
.sidebar .sidebar-con {
  width: 90%;
  height: auto;
  overflow: auto;
  padding: 5%;
  padding-bottom: 100px;
}
</style>
