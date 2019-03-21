<template>
<div>
    <v-container>
        <Alert :notification="alertMessage" :color="alertType"/>  
        <v-layout justify-center>
            <v-flex xs12 sm6>
                <h2>Welcome : {{this.user.email}}</h2>
                <h4>If you have a query, dont forget to write your notification below.</h4>
                
                <FormMessage 
                :saveMessage="saveMessage"
                :disabledState="false"
                :loading="loading"
                :makeAlert="makeAlert"/>
            
            </v-flex>
        </v-layout>
    </v-container>

    <ListMessage 
    v-bind:messages="messages" 
    :updateMessage="updateMessage" 
    :deleteMessage="deleteMessage"
    />

</div>
</template>

<script>

import ListMessage from '@/components/ListMessageComponent.vue';
import FormMessage from '@/components/FormMessageComponent.vue';
import Alert from'@/components/AlertComponent.vue';
import {db} from '@/firebase';
import {mapState} from 'vuex';

export default {
    name:'Messages',
    data() {
        return{
            messages: [],
            
            editMessage:{
                title: '',
                area: '',
                message:'',
            },
            alertMessage:'',
            alertType:'',
            loading:false
        }
    },
    components:{
        FormMessage,Alert,ListMessage
    },
    methods: {
        makeAlert(alert) {
            this.alertMessage = alert.message;
            this.alertType = alert.type;
        },
        saveMessage(message) {
        //this.message = {...this.message,uid:this.user.uid};
            console.log('save!!');
            
            let finalMessage = {
                id_user: this.user.uid,
                title: message.title,
                area: message.area,
                description: message.description,
                comments: []
            }
            console.log(finalMessage);
            let vm = this;
            this.loading = true;
            db.collection('messages')
                .add(finalMessage)
                .then((resp)=>{
                    console.log(resp.id);
                    this.messages.push({...finalMessage,id:resp.id});
                    this.resetFields();
                    this.makeAlert({
                        message: 'successfully created.',
                        type: 'info'
                    });
                    this.loading = false;
                }).catch((err)=>
                    console.log(err)
                );
      },

      updateMessage(msg){
        console.log(msg);
        db.collection('messages')
              .doc(msg.id).set({
                    title: msg.title,
                    area: msg.area,
                    description: msg.description,
                    comments: msg.comments,
                    id_user: msg.id_user
              }).then(()=> {
                    console.log("updated message");
                    let indexMsgUpdated = this.messages.findIndex((message)=>{
                          //console.log(message.id + " - " + msg.id);
                          return message.id === msg.id;});
                        //console.log(idMsgUpdated);
                          this.$set(this.messages, indexMsgUpdated, msg);
                          //console.log(this.messages);
              }).catch((err)=>console.log(err));

      },

      deleteMessage(id) {
            db.collection('messages').doc(id).delete().then(() => {
                  console.log("Document successfully deleted!");
                  //this.props.history.push("/")
                  console.log(this.messages);
                  this.messages = this.messages.filter((msg)=> (msg.id != id));
                  console.log(this.messages);
                }).catch((error) => {
                  console.error("Error removing document: ", error);
                });
      },

      resetFields() {
        this.message = {title:'',area:'',description:''};
      }
    },

    computed: {
      ...mapState([
            'user'
            ])
    },
    mounted() {
        console.log(this.$store.user);
        console.log(this.user);

        db.collection('messages')
            .where("id_user", "==", this.user.uid)
                .get()
                    .then((querySnapshot) => {
                        querySnapshot.forEach((doc) => {
                            let msg = doc.data();
                            let idMsg = doc.id;

                            this.messages.push({
                                id: idMsg,
                                title: msg.title,
                                area: msg.area,
                                description: msg.description,
                                comments: msg.comments,
                                id_user: msg.id_user
                            });
                            
                        })
                        console.log(this.messages);
                    });

    }
}
</script>