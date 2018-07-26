# shoppingMall
移动端下载中心
目录：
	build:
	config:
	robot:机器人聊天页面
	src:页面资源
		api-api.js:调用接口
		assets:图片资源
		components:组件
			Detail.vue:详情页
			dialog.vue:弹出框
			fiterSort.vue:分类页
			loading.vue:加载
			nav.vue:首页分类栏
			sidebar.vue:侧滑栏
			tabar.vue:底部
		pages:页面
			docDetail.vue:文档详情页
			Home.vue:首页
			Search.vue:搜索页
		router:路由
		App.vue:主要模块
		interceptor.js:拦截器
		main.js:入口js
	static:
	test:单元测试
	
	download下来需要npm install
	
	对应的插件：
	ui:vant，npm i vant -S/yarn add vant
	axios:npm install axios/bower install axios
	weixin-js-sdk:npm i -S weixin-js-sdk
	vue-touch:cnpm install vue-touch@next
	
	运行：cnpm run dev/npm run dev
	打包：cnpm run build/npm run build