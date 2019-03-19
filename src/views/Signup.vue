<template>
  <div>
    <v-container>
                <v-alert :value="error"
                          type="error"
                          >
                    {{error}}
                </v-alert>

      <v-layout row flex justify-center>
          <v-flex xs12 sm5 >        
                <v-card class="elevation-2 pa-4" >
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
                        
                    </v-card>
              </v-flex>
            </v-layout>
    <v-layout row flex justify-center>
          <v-flex xs12 sm5 >        
                <v-card class="elevation-2 pa-4" >
                  <v-card-title primary-title>
                      <h3>Signup with Social Network:</h3>
                    </v-card-title>
                    <v-card-actions>
                        <v-img
                            :src="require('../assets/facebook.png')"
                            aspect-ratio="1"
                            class="gray lighten-2"
                            width="50px"
                            height="50px"
                            @click="signupFacebook"
                          />
                        <v-img
                            :src="require('../assets/google.png')"
                            aspect-ratio="1"
                            class="gray lighten-2"
                            width="50px"
                            height="50px"
                            @click="signupGoogle"
                          />
                    </v-card-actions>
                    </v-card>
              </v-flex>
            </v-layout>
    </v-container>
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
      signupGoogle() {
        console.log("google");
        let provider = new firebase.auth.GoogleAuthProvider();

              firebase.auth().signInWithPopup(provider).then(function(result) {
                      // This gives you a Google Access Token. You can use it to access the Google API.
                      var token = result.credential.accessToken;
                      console.log(token);
                      // The signed-in user info.
                      var user = result.user;
                      console.log(user);
                      // ...
            }).catch(function(error) {
                    // Handle Errors here.
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    // The email of the user's account used.
                    var email = error.email;
                    // The firebase.auth.AuthCredential type that was used.
                    var credential = error.credential;
                    // ...
            });
      },
      signupFacebook() {
        let provider = new firebase.auth.FacebookAuthProvider();
            firebase.auth().signInWithPopup(provider).then(function(result) {
                    // This gives you a Facebook Access Token. You can use it to access the Facebook API.
                    var token = result.credential.accessToken;
                    // The signed-in user info.
                    var user = result.user;
                    // ...
            }).catch(function(error) {
                    // Handle Errors here.
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    // The email of the user's account used.
                    var email = error.email;
                    // The firebase.auth.AuthCredential type that was used.
                    var credential = error.credential;
                    // ...
            });
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