<template>
  <div>
    <v-container>
        
                <v-alert
                  :value="error"
                  type="error"
                >
                  {{error}}
                </v-alert>
      <v-layout row wrap flex justify-center>
          <v-flex xs12 sm5 ma-3>
                    <v-card class="elevation-2 pa-4" >
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

               
                      </v-card>
            </v-flex>



          <v-flex xs12 sm5 ma-3>        
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
  import {mapActions, mapState} from 'vuex';
  import firebase from 'firebase';
  export default {
    data: () => ({
      
      email: '',
      password: ''
      
    }),

    methods: {
      userLogIn() {
        this.userSignIn({email:this.email,password:this.password});  
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