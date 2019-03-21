<template>
<div>
    {{user}}
    <v-container class="my-5 ">
    <v-layout row wrap my-4 v-for="(msg,index) in messages " color="red">

        <v-flex xs12 sm4 >
            <v-card >
                <v-img
                src="https://cdn.vuetifyjs.com/images/cards/desert.jpg"
                aspect-ratio="2.75"
                ></v-img>

                <v-card-title primary-title>
                    <div>
                    <h3 class="headline mb-0">{{msg.area}}</h3>
                    <div> {{ msg.title }} </div>
                    <div> {{ msg.description }} </div>
                    </div>
                </v-card-title>

                <v-card-actions>
                    <v-btn flat 
                    color="primary" 
                    @click.prevent="commentDialog(msg)">
                        Respond
                    </v-btn>
                    <v-btn flat 
                    color="error" 
                    @click.prevent="deleteMessageDialog(msg)">
                        Delete
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-flex>


        <v-flex xs12 sm6 mx-3>
            <v-card class="mx-auto" color="#26c6da" dark >
                <v-card-title>
                    <span class="title font-weight-bold">
                        COMMENTS
                    </span>
                </v-card-title>

                <Alert 
                v-if="(msg.comments.length == 0)" 
                :notification="'No comments found.'" />

                <v-card-text 
                class="title font-weight-light" 
                v-for="(c, index) in msg.comments" 
                :key="index">
                    {{c.email}}:"{{c.comment}}"
                </v-card-text>

            </v-card>

        </v-flex>
    </v-layout>
    </v-container>


    <div class="text-xs-center">
    <v-dialog v-model="dialogRespond" width="500">
        <v-card>
            <v-card-title
            class="headline grey lighten-2"
            primary-title>
                Respond Notification
            </v-card-title>

            <v-card-text>
                <v-container grid-list-md>

                <FormMessage :message="message" :disabledState="true"/>
                <v-textarea
                solo
                name="input-7-4"
                label="Your problem is because...."
                v-model="comment"
                ></v-textarea>    
                </v-container>
            </v-card-text>
        
            <v-divider></v-divider>

            <v-card-actions>
                <v-btn
                color="error"
                flat
                @click.prevent="saveCommentAndCloseDialog(comment)">
                    Respond
                </v-btn>

                <v-spacer></v-spacer>
            
                <v-btn
                color="primary"
                flat
                @click="dialogRespond = false">
                    Cancel
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
    </div>


    <div class="text-xs-center">
    <v-dialog v-model="dialogDelete" width="500">
            <v-card>
                    <v-card-title class="headline grey lighten-2" primary-title >
                            Delete Message  
                    </v-card-title>
                    <v-card-text>
                            <v-container grid-list-md>
                                    <Alert :notification="'Do you want  to delete this element?'"/>
                                    <FormMessage :message="message" :disabledState="true"/>
                            </v-container>
                    </v-card-text>
                    
                    <v-divider></v-divider>

                    <v-card-actions>
                            <v-btn
                            color="error"
                            flat
                            @click="deleteMessage(message.id)">
                                    Delete Notification
                            </v-btn>
                            
                            <v-spacer></v-spacer>
                            
                            <v-btn
                            color="primary"
                            flat
                            @click="dialogDelete = false">
                                    Cancel
                            </v-btn>
                    </v-card-actions>
            </v-card>
    </v-dialog>
    </div>


</div>
</template>
<script>

import Alert from '../components/AlertComponent.vue'
import {mapState} from 'vuex';
import {db} from '../firebase';
import FormMessage from '@/components/FormMessageComponent.vue';
  
export default {
    name: "Administrator",
    data: ()=>({
        messages:[],
        dialogRespond: false,
        dialogDelete: false,
        message: {},//preview message for container of respond dialog
        comment: '',
    }),
    mounted() {
        //console.log(this.$store.user);
        console.log(this.user);

        //console.log(db.collection('a').get());
        db.collection('messages').get()
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
                    //asistenciaArray.push(asist)
                    //console.log(doc.id, ' => ', doc.data())
                })
                console.log(this.messages);
        })

    },
    computed:{
        ...mapState(['user'])
    },
    methods: {
        commentDialog(message) {
            this.dialogRespond = true;
            this.message = message;
        },
        saveCommentAndCloseDialog(comment) {
            let newComment = {
                id_author: this.user.uid,
                email: this.user.email,
                comment: comment        
            };
            this.message.comments.push(newComment);
            db.collection('messages')
                .doc(this.message.id)
                        .set({
                            title: this.message.title,
                            area: this.message.area,
                            description: this.message.description,
                            id_user: this.message.id_user,
                            comments: this.message.comments
                        })
                        .then(()=> {
                            console.log("updated message");
                            this.comment = '';
                            this.dialogRespond = false;
                        })
                        .catch((err)=>console.log(err));
        },
        deleteMessageDialog(message) {
            this.dialogDelete = true;
            this.message = message;
        },
        deleteMessage(id) {
            console.log('deleting');
            db.collection('messages')
                .doc(id)
                    .delete()
                        .then(() => {
                          console.log("Document successfully deleted!");
                          //this.props.history.push("/")
                          console.log(this.messages);
                          this.messages = this.messages.filter((msg)=> (msg.id != id));
                          console.log(this.messages);
                          this.dialogDelete = false;

                        }).catch((error) => {
                          console.error("Error removing document: ", error);
                        });
        }

    },
    components: {
        FormMessage, Alert
    }
}
</script>