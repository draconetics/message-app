<template>
  <div class="home">

    <img alt="Vue logo" src="../assets/logo.png">
    <div class="container">
       <h3 v-if="user">This is the user logged : {{user}}</h3>
    <v-btn
              v-else
              color="danger"
              @click="$router.push('/signup')"
            >
              SIGN UP
            </v-btn>
    </div>
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src

import HelloWorld from '@/components/HelloWorld.vue';
import {mapState} from 'vuex';

export default {
  name: 'home',
  components: {
   HelloWorld
  },
  computed: {
    ...mapState([
      'user'
    ])
 }
}
</script>
