import Vue from 'vue'
//引入VueResource插件
import VueResource from 'vue-resource'
import App from './App.vue'

//声明使用VueResource插件
Vue.use(VueResource)
new Vue({
  el: '#app',
  components: {App},
  template: '<App/>'
})
