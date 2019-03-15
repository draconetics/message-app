<template>
	<div>
		<v-toolbar>
        
	        <v-toolbar-title>Notification App</v-toolbar-title>
	        <v-spacer></v-spacer>
	        <v-toolbar-items >

		          <v-btn v-if="user == null" flat href="/login">Login</v-btn>

              <v-btn v-else flat  color="warning" @click.prevent="userLogOut">Logout</v-btn>
	       </v-toolbar-items>
      	</v-toolbar>
	</div>
</template>

<script>

import {mapActions, mapState} from 'vuex';


export default {
  name: 'menuBarComponent',
  methods: {
      
      ...mapActions([
      'userLogOut'
      ])
    },
  computed: {
    ...mapState([
      'user'
  ])
 }
}
</script>
