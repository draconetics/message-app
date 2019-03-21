import Vue from 'vue'
import Vuex from 'vuex'
import {firebase_config} from './firebase'
import router from '@/router'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        appTitle: 'My Awesome App',
        user: null,
        error: null,
        loading: false
    },
    mutations: {
        SET_USER (state, payload) {
            state.user = payload
        },
        SET_ERROR (state, payload) {
            state.error = payload
        },
        SET_LOADING (state, payload) {
            state.loading = payload
        }
  },
  actions: {
        userSignUp ({commit}, payload) {
            commit('SET_LOADING', true)
            firebase_config.auth()
                .createUserWithEmailAndPassword(payload.email, payload.password)
                    .then(firebaseUser => {
                        console.log(firebaseUser);
                        commit('SET_USER', {
                            email: firebaseUser.email, 
                            uid: firebaseUser.uid})
                        commit('SET_LOADING', false)
                        commit('SET_ERROR', null)
                        router.push('/')
                    }).catch(error => {
                        commit('SET_ERROR', error.message)
                        commit('SET_LOADING', false)
                    })
        },
        userSignIn ({commit}, payload) {
            console.log(payload);
            commit('SET_LOADING', true)
            firebase_config.auth()
                .signInWithEmailAndPassword(payload.email, payload.password)
                    .then(firebaseUser => {
                        console.log(firebaseUser);
                        commit('SET_USER', {email: firebaseUser.email, uid: firebaseUser.uid})
                        commit('SET_LOADING', false)
                        commit('SET_ERROR', null)
                        router.push('/');
            //console.log("error es null");
                    }).catch(error => {
                        console.log(error);
                        commit('SET_ERROR', error.message)
                        commit('SET_LOADING', false)
                    })
        },
        autoSignIn({commit},payload){
            if(payload){
                console.log(payload);
                commit('SET_USER', {email: payload.email, uid: payload.uid})
            }
        },
        userLogOut({commit}){
            firebase_config.auth()
                .signOut()
                    .then(function() {
                        // Sign-out successful.
                        console.log("logout!!");
                        commit('SET_USER', null);
                        router.push('/');
                    }, function(error) {
                        // An error happened.
                        commit('SET_ERROR', error.message);
                    });
            }
    },
    created() {
        this.state.error=null;
    }
});
