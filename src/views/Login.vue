<template>
  <div>
    <v-container>
        
        <FormUser :userLogin="userSignIn" :error="error" :loading="loading"/>
          
    </v-container>
  </div>
</template>

<script>
  import {mapActions, mapState} from 'vuex';
  import FormUser from '@/components/FormUserComponent.vue';

  export default {
    name:'Login',
    components: {
      FormUser
    },
    methods: {
      ...mapActions([
            'userSignIn'
            ])
    },

    computed: {
      ...mapState([
            'loading','error'
            ])
    }
  }
</script>