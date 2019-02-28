import Vue from 'vue';
import 'css/reset.css';
//logo地址前缀
//window.logoBaseUrl = 'https://192.168.110.183/manage/';
//mock数据
if(process.env.NODE_ENV=='development'){
	// import '../mock/show.js'
}

{{#axios}}
import api from './api';
window.api = Vue.prototype.api = api;
{{/axios}}
{{#echarts}}
//按需引入echarts
import echarts from 'echarts/lib/echarts';
require('echarts/lib/component/tooltip');
require('echarts/lib/component/legend');
require('echarts/lib/component/title');
require("echarts/lib/chart/line");
require("echarts/lib/chart/pie");
require("echarts/lib/chart/bar");
window.echarts = echarts;
{{/echarts}}

{{#element}}
//按需引入element
//import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
//Vue.use(ElementUI);

import {Checkbox, Select, Option, Scrollbar} from 'element-ui';
Vue.component('ElCheckbox', Checkbox);
Vue.component('ElSelect', Select);
Vue.component('ElOption', Option);
Vue.component('ElScrollbar', Scrollbar);
{{/element}}

// import Circle from 'cmp/common/MyCircle.vue';
// Vue.component('MyCircle',Circle);

