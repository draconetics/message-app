<template>
<div>
    <v-toolbar>

        <v-toolbar-title>Notification App</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items >

            <v-btn 
            v-if="user == null" 
            color="primary" 
            dark 
            @click="$router.push('/login')">
            <v-icon>launch</v-icon>
                Login
            </v-btn>
            
            <v-btn v-else  
            color="red lighten-1"
            dark
            @click="userLogOut">
            Logout
            <v-icon>swap_horiz</v-icon>
            </v-btn>
            
            <v-btn 
            flat
            color="blue"
            dark
            @click="openDialogHelp">
                Help
            <v-icon>help</v-icon>
            </v-btn>
        </v-toolbar-items>
        
    </v-toolbar>




    <div class="text-xs-center">
        <v-dialog v-model="dialogHelp" width="500">

            <v-card>
                <v-card-title class="headline grey lighten-2" primary-title>
                    Help
                </v-card-title>

                <v-card-text class="text-xs-left">
                    <h3>Guest:</h3>
                    <span>URLS :</span>
                    <p>http://domain.com/</p>
                    <p>http://domain.com/login</p>
                    <p>http://domain.com/signup</p>
                    <h3>Login as user:</h3>
                    <span>1.- Create a new user:</span>
                    <p>* Signup button (domain/signup) and enter your email and password</p>
                    <p>* Signup button (domain/signup) using using your gmail or facebook account</p>
                    <span>2.- Signin with default created user: </span>
                    <h5>Login as:</h5>
                    <ul>
                        <li>user:lisa@gmail.com-pwd:1q2w3e</li>
                        <li>user:juan@gmail.com-pwd:1q2w3e</li>
                        <li>user:homero@gmail.com-pwd:1q2w3e</li>
                        <li>user:lina@gmail.com-pwd:1q2w3e</li>
                        <li>user:pedro@gmail.com-pwd:1q2w3e</li>
                    </ul>
                    <h5>Url's enabled:</h5>
                    <ul>
                        <li>http://domain.com/</li>
                        <li>http://domain.com/msg</li>
                    </ul>
                    <h3>ADMIN options</h3>
                    <h4>Login as ADMIN: mario@gmail.com - 1q2w3e</h4>
                    <h4>Main url: http://domain.com/admin</h4>
                </v-card-text>

                <v-divider></v-divider>

                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                    color="primary"
                    flat
                    @click="dialogHelp = false">
                        I accept
                    </v-btn>
                </v-card-actions>
            </v-card>

        </v-dialog>
    </div>



</div>
</template>

<script>

import {mapActions, mapState} from 'vuex';

export default {
    name: 'menuBarComponent',
    data:()=>({
        dialogHelp:false
    }),
    methods: {
        ...mapActions([
            'userLogOut'
        ]),
        openDialogHelp() {
            console.log("help !!");
            this.dialogHelp = true;
        }
    },
    computed: {
        ...mapState([
            'user'
        ])
    }
}
</script>
