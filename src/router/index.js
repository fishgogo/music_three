import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import playview from '../view/play_view.vue'
import index from '../view/index.vue'
import each from '../view/each'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/index',
      name: 'index',
      component: index,
    },
    {
    	path:'/playview',
    	name:'playview',
    	component:playview
    },
    {
    	path:'/each',
    	name:'each',
    	component:each
    },
    {
		path:"*",
		redirect:"/index"
	}
  ]
})
