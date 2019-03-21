<template>
<div>
    <v-container>
        <FormUser 
        :userSignup="userSignUp" 
        :loading="loading" 
        :error="error"/>
    </v-container>
</div>
</template>

<script>

import firebase from 'firebase';
import FormUser from '../components/FormUserComponent.vue'
import {mapActions, mapState} from 'vuex';

export default {
    name: "Signup",
    components: {
        FormUser
    },
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