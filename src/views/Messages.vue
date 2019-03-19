<template>
  <div>
    <v-container>
        
                <Alert :notification="error"/>
                {{user}}
        <v-layout justify-center>
          <v-flex xs12 sm6>
          
            <FormMessage :message="message" :disabledState="false"/>

              <v-btn
                color="success"
                @click.prevent="saveMessage"
              >
                
                <v-progress-circular
                    v-show="loading" 
                    disabled="loading"
                    indeterminate
                    color="warning"
                  ></v-progress-circular>
                  Save
              </v-btn>

              <v-btn
                color="error"
                @click="$router.push('/')"
              >
                Cancel
              </v-btn>
          </v-flex>
        </v-layout>
      {{message}}
      
    </v-container>


    <ListMessage v-bind:messages="messages" :updateMessage="updateMessage" :deleteMessage="deleteMessage"/>

  </div>
</template>

<script>
import ListMessage from '@/components/ListMessageComponent.vue';
import FormMessage from '@/components/FormMessageComponent.vue';
import Alert from'@/components/AlertComponent.vue';
import {db} from '@/firebase';

  import {mapActions, mapState} from 'vuex';
  export default {
     data() {
          return{
              messages: [],
              message: {
                title: '',
                area: '',
                description:'',
              },
              editMessage:{
                title: '',
                area: '',
                message:'',
              }
          }
        },
    components:{
      FormMessage,Alert,ListMessage
    },

    methods: {

      updateMessage(msg){
        /*let nroMessages = msg.list.length;
        this.editMessage.title = msg.title;
        this.editMessage.area = msg.area;
        this.editMessage.message = msg.list[nroMessages-1];*/

/*        db.collection("messages").where("uid", "==", msg.uid)
            .get()
            .then(function(querySnapshot) {
                querySnapshot.forEach((doc)=> {
                    console.log(doc.id, " => ", doc.data());
                    // Build doc ref from doc.id
                    db.collection("messages").doc(doc.id).update({
                        title: msg.title,
                        area: msg.area,
                        description: msg.description
                    }).then(()=>{
                      console.log("updated successfully");
                      let idMsgUpdated = this.messages.findIndex((message)=>{message.uid == msg.uid});
                      this.messages[idMsgUpdated] = msg;
                    })
                    .catch((err)=>console.log(err));
                });
           }).catch((err)=>console.log(err));*/


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
                    })
                      .catch((err)=>console.log(err));

/*           db.collection('messages')
                .doc(msg.uid)
                .set(msg).then((resp)=>{
                      console.log("updated successfully");
                      console.log(resp);
                      let idMsgUpdated = this.messages.findIndex((message)=>{message.uid == msg.uid});
                      this.messages[idMsgUpdated] = msg;
                      console.log(this.messages);
                    })
                    .catch((err)=>console.log(err));*/

//        alert('updating message');
      },

      saveMessage() {
        //this.message = {...this.message,uid:this.user.uid};
        let finalMessage = {
          id_user: this.user.uid,
          title: this.message.title,
          area: this.message.area,
          description: this.message.description,
          comments: []
        }
        console.log(finalMessage);
        let vm = this;
        db.collection('messages').add(
            finalMessage).then((resp)=>{
              console.log(resp.id);
              this.messages.push({...finalMessage,id:resp.id});
              this.resetFields();
            }).catch(
              (err)=>{
                console.log(err);
              }
            );
        //this.push(this.asistencia)
        //this.show()
        //this.reset()
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
      },
      
      ...mapActions([
            'userSignIn'
            ])
    },

    computed: {
      ...mapState([
            'loading','error','user'
            ])
    },
    mounted() {
                console.log(this.$store.user);
                console.log(this.user);

                //console.log(db.collection('a').get());
                db.collection('messages').where("id_user", "==", this.user.uid).get().then((querySnapshot) => {
                    
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

    }

  }
</script>