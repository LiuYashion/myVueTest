import Vue from 'vue'
import Router from 'vue-router'
import flow from 'views/flow/flow'
import graph from 'views/graph/index'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/graph'
    },
    {
      path: '/graph',
      name: 'graph',
      component: graph
    }
  ]
})



// export default new Router({
//   routes: [
//     {
//       path: '/',
//       redirect: '/flow'
//     },
//     {
//       path: '/flow',
//       name: 'flow',
//       component: flow
//     }
//   ]
// })
