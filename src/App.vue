<template>
<div id="app">

    <MenuBar/>
    <div id="nav">
        
        <router-link to="/">
        Home</router-link> ||
        
        <router-link to="/signup" v-if="user == null">
        Signup</router-link>  
        
        <router-link to="/msg" v-if="user">
        My Notifications</router-link>

    </div>

    <v-app>
        <router-view/>
    </v-app>
</div>
</template>

<script>

import MenuBar from '@/components/MenuBarComponent.vue';
import {mapState} from 'vuex';

export default {
    name: 'appVue',
    components: {
        MenuBar
    },
    computed: {
        ...mapState([
            'user'
        ])
    }
}
</script>
<style>
#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}
#nav {
    padding: 30px;
}

#nav a {
    font-weight: bold;
    color: #2c3e50;
}

#nav a.router-link-exact-active {
    color: #42b983;
}
</style>
