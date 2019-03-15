<template>
  <div>
    <div class="container">
                <v-alert :value="error"
                          type="error"
                          >
                    {{error}}
                </v-alert>
        <v-form>
            <v-text-field
              v-model="name"
              label="Name"
              required
            ></v-text-field>

            <v-text-field
              v-model="email"
              
              label="E-mail"
              required
            ></v-text-field>
            
            <v-text-field
              type="password"
              v-model="password"
              @key.enter="createNewuser"
              label="Password"
              required
            ></v-text-field>


            <v-btn
              color="success"
              @click.prevent="createNewUser"
            >
              Sign Up
                <v-progress-circular
                  indeterminate
                  color="primary"
                  v-show="loading" 
                ></v-progress-circular>
            </v-btn>

            <v-btn
              color="error"
              @click.prevent="$router.push('/')"
            >
              Cancel
            </v-btn>


          </v-form>
        {{error}}
    </div>
  </div>
</template>

<script>
  import firebase from 'firebase';
  import {mapActions, mapState} from 'vuex';
  export default {
    data: () => ({
      name: '',
      email: '',
      password: ''    
    }),

    methods: {
      createNewUser(){
        this.userSignUp({email:this.email,password:this.password});
      },
      ...mapActions([
      'userSignUp'
      ]),

    },
    computed:{
      ...mapState([
        'loading','error'
        ])
    }
  }
</script>