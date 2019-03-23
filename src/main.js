import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import {firebase_config} from './firebase'

import Vuetify from 'vuetify'
// index.js or main.js
import 'vuetify/dist/vuetify.min.css' // Ensure you are using css-loader
import 'material-design-icons-iconfont/dist/material-design-icons.css' // 

Vue.use(Vuetify, {
  iconfont: 'mdi' // 'md' || 'mdi' || 'fa' || 'fa4'
})

Vue.config.productionTip = false


import firebase from 'firebase';

let app;
const initialize = () => {
  if(!app){
    app = new Vue({
        router,
        store,
        render: h => h(App)
      }).$mount('#app')
  }
}




firebase_config.auth().onAuthStateChanged((firebaseUser) => {
      if (firebaseUser) {
        store.dispatch('autoSignIn', firebaseUser)
        console.log("autoSignIn action");
      }
      initialize();
    })