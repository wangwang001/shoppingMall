<template>
    <div class="y-nav">
        <div class="navContent">
			<div class="classList" id="classList">
				<div :style="{width:showWidth}">
					<router-link to="/filterSort?name=中压系列">
						<img src="../assets/images/medium-voltage.png" alt="">
						<span>中压系列</span>
					</router-link>
				</div>
				<div :style="{width:showWidth}">
					<router-link to="/filterSort?name=低压配电">
						<img src="../assets/images/depression.png" alt="">
						<span>低压配电</span>
					</router-link>
				</div>
				<div :style="{width:showWidth}">
					<router-link to="/filterSort?name=终端配电">
						<img src="../assets/images/terminal.png" alt="">
						<span>终端配电</span>
					</router-link>
				</div>
				<div class="clickMore" @click="showMoreClass" v-show="clickMore" :style="{width:showWidth}">
					<router-link to="">
						<img src="../assets/images/more.png" alt="">
						<span>更多...</span>
					</router-link>
				</div>
				<div v-show="showMore" :style="{width:showWidth}">
					<router-link to="/filterSort?name=家居电气">
						<img src="../assets/images/home.png" alt="">
						<span>家居电气</span>
					</router-link>
				</div>
				<div v-show="showMore" :style="{width:showWidth}">
					<router-link to="/filterSort?name=充电产品">
						<img src="../assets/images/ecar.png" alt="">
						<span>充电产品</span>
					</router-link>
				</div>
				<div v-show="showMore" :style="{width:showWidth}">
					<router-link to="/filterSort?name=综合信息">
						<img src="../assets/images/comprehensive.png" alt="">
						<span>综合信息</span>
					</router-link>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      showMore: false,
      clickMore: true,
      showWidth: "25%"
    };
  },
  methods: {
    //点击查询更多分类
    showMoreClass() {
        document.getElementsByClassName("classList")[0].style.width =
          document.getElementsByClassName("classList")[0].firstElementChild
            .offsetWidth *
            6 +
          "px";
        this.showWidth = "16.6%";
        this.showMore = true;
        this.clickMore = false;
        let count = 0;
        let timer = setInterval(() => {
          count+=5;
          if (count < 500) {
            document.getElementsByClassName("navContent")[0].scrollLeft = count;
          } else {
            clearInterval(timer);
          }
        }, 10);
    }
  }
};
</script>
<style scoped>
.y-nav {
  width: 100%;
  height: auto;
  overflow: hidden;
}
.y-nav .navContent {
  width: 96%;
  margin: 0 2%;
  overflow-x: scroll;
  height: 136px;
  position: relative;
  /* transition: all 1s ease; */
}
.y-nav .classList {
  width: auto;
  height: 100px;
  /* margin: 0 2%; */
  position: absolute;
  left: 0;
  top: 0;
  float: left;
  padding: 5% 0;
  display: block;
  background: #fff;
}
.y-nav .classList div {
  float: left;
  text-align: center;
}
.y-nav .classList ul {
  width: 270px;
  height: auto;
  overflow: hidden;
}
.y-nav .classList ul li {
  width: 90px;
  float: left;
}
.y-nav .classList div a {
  color: #7e8c8d;
}
.y-nav .classList div img {
  display: block;
  border: 1px solid #ccc;
  width: 80%;
  font-size: 22px;
  padding: 4%;
  margin: 0 auto;
  border-radius: 50%;
  margin-bottom: 0.2rem;
}
</style>
