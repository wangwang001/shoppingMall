// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import './assets/css/iconfont.css'
import VueTouch from 'vue-touch';
import axios from "./interceptor";


Vue.config.productionTip = false
Vue.use(VueTouch, {
  name: 'v-touch'
})
let parentList = [];
//处理分类和标签数据方法
Vue.prototype.tidyData = function (subId, subItem, data,downloadAddress) {
  let check = (parentList, item) => {
    let flag = true;
    if (parentList.length === 0) {
      return true;
    }
    if (subId == 'subLabelId') {
      if (parentList.length === 6) {
        return false;
      }
    } else {
      if (parentList.length === 5) {
        return false;
      }
    }

    parentList.forEach((element, i) => {
      if (element !== item[subItem + (i + 1)]) {
        flag = false;
      }
    });
    return flag;
  }
  let orgData = (parentList, data) => {
    let child = [];
    let ids = new Set();
    let idsArr = [];
    let s = new Set();
    let sArr = [];
    let download = new Set();
    let downloadArr = [];
    data.forEach((element, i) => {
      if (check(parentList, element)) {
        download.add(element[downloadAddress]);
        ids.add(element[subId + (parentList.length + 1)]);
        s.add(element[subItem + (parentList.length + 1)]);
      }
    });
    // set类型转为数组类型
    download.forEach(ele => {
      downloadArr.push(ele);
    });
    ids.forEach(ele => {
      idsArr.push(ele);
    });
    s.forEach(ele => {
      sArr.push(ele);
    });
    sArr.forEach((element, i) => {
      let parentListNew = parentList.concat(element);
      let children = orgData(parentListNew, data);
      if(element){
        child.push({
          'label': element,
          'sub': children,
          'id': idsArr[i],
          'downloadAddress': downloadArr[i]
        })
      }

    });
    return child;
  }
  return orgData(parentList, data);
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>'
})
