import Vue from 'vue';
import App from './App.vue';


import {store} from './store/'
import * as Cookies from 'js-cookie'
import createPersistedState from 'vuex-persistedstate'

new Vue({
  el: '#app',
  store,
  render: h => h(App)
})
