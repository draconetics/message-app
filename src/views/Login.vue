<template>
  <div>
    <div class="container">
        
                <v-alert
                  :value="error"
                  type="error"
                >
                  {{error}}
                </v-alert>
        <v-form>
            <v-text-field
              v-model="email"
              
              label="E-mail"
              required
            ></v-text-field>
            
            <v-text-field
              type="password"
              v-model="password"
              
              label="Password"
              @keyup.enter="userLogIn()"
              required
            ></v-text-field>


            <v-btn
              color="success"
              @click.prevent="userLogIn()"
            >
              
              <v-progress-circular
                  v-show="loading" 
                  disabled="loading"
                  indeterminate
                  color="warning"
                ></v-progress-circular>
                Login
            </v-btn>

            <v-btn
              color="error"
              @click="$router.push('/')"
            >
              Cancel
            </v-btn>

   
          </v-form>
      
    </div>
  </div>
</template>

<script>
  import {mapActions, mapState} from 'vuex';
  export default {
    data: () => ({
      
      email: '',
      password: ''
      
    }),

    methods: {
      userLogIn() {
        this.userSignIn({email:this.email,password:this.password});  
      },
      
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