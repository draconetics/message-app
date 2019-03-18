import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import {firebase_config} from './firebase';

Vue.use(Router)


const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },

    {
      path: '/login',
      name: 'login',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/Login.vue'),
      meta:{
        guest : true
      }
    },
    {
      path: '/signup',
      name: 'signup',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/Signup.vue'),
      meta:{
        guest : true
      }
    },
    {
      path: '/msg',
      name: 'msg',
      component: () => import(/* webpackChunkName: "about" */ './views/Messages.vue'),
      meta:{
        requiresAuth : true
      }
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import(/* webpackChunkName: "about" */ './views/Administrator.vue'),
      meta:{
        adminAuth: true
      }
    },
    {
      path: '*',
      component: Home
    }
  ]
});

router.beforeEach((to, from, next) => {
    if(to.matched.some(record => record.meta.adminAuth)) {
        firebase_config.auth().onAuthStateChanged(function(user) {
            if (!user) {
                next({
                    path: '/login'
                })
            } else {
                if(user.email == 'mario@gmail.com')
                    next()
                else
                    next({ path: '/msg'})
            }
        })
    } else {
        if(to.matched.some(record => record.meta.requiresAuth)) {
            firebase_config.auth().onAuthStateChanged(function(user) {
                if (user) {
                    next()
                } else {
                    next({
                        path: '/login'
                    })
                }
            })
        }else{
            
            if(to.matched.some(record => record.meta.guest)) {
                    firebase_config.auth().onAuthStateChanged(function(user) {
                        if (user) {
                            next({
                              path: '/home'
                            })
                        } else {
                            next()
                        }
                    })
            }else{
                  next()
            }


        }
    }
})



export default router;