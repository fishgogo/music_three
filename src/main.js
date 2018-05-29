// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import VueRouter from 'vue-router';
import $ from 'jquery';
import axios from "axios";
import VueAxios from "vue-axios";
import Vuex from "vuex";

Vue.config.productionTip = false

Vue.use(VueAxios,axios);
Vue.use(VueRouter);
Vue.use(Vuex);


const store = new Vuex.Store({
	state:{
		soundpic:[],
		showid:[],
		all:[]
	},
	mutations:{
		showId(state,payload){
			state.showid = payload;
		},
		getSoundpic(state,payload){
			state.soundpic = payload
			// console.log(state.soundpic)		
		},
		getAll(state,payload){
			state.all = payload
			// console.log(state.all)
		}
	},
	actions:{
		SHOWID({commit},id){
			commit("showId",id)
		},
		GETSOUNDPIC({commit},pic){
			commit("getSoundpic",pic)
		},
		GETALL({commit},all){
			commit("getAll",all)			
		}
	}
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
