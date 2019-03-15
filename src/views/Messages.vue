<template>
  <div>
    <div class="container">
        
                <v-alert
                  :value="error"
                  type="error"
                >
                  {{error}}
                </v-alert>
                {{user}}
        <v-form>
            <v-text-field
              v-model="message.title"
              
              label="Title message"
              required
            ></v-text-field>
            
            <v-text-field

              v-model="message.area"
              
              label="Area"
              required
            ></v-text-field>
			<v-textarea
		          solo
		          name="input-7-4"
		          label="Solo textarea"
              v-model="message.list[0]"
		          value="The Woodman set to work at once, and so sharp was his axe that the tree was soon chopped nearly through."
		    ></v-textarea>

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

   
          </v-form>
      {{messages}}
    </div>


    <div class="container">
        <v-layout>
           <v-flex xs12 sm6 offset-sm3>
              <v-card v-for="(msg,index) in messages ">
                <v-img
                  src="https://cdn.vuetifyjs.com/images/cards/desert.jpg"
                  aspect-ratio="2.75"
                ></v-img>

                <v-card-title primary-title>
                  <div>
                    <h3 class="headline mb-0">{{msg.area}}</h3>
                    <div> {{ msg.title }} </div>
                  </div>
                </v-card-title>

                <v-card-actions>
                  <v-btn flat color="primary">Edit</v-btn>
                  <v-btn flat color="danger">Delete</v-btn>
                </v-card-actions>
              </v-card>
              <br/>
            </v-flex>
        </v-layout>
  
    </div>




  <div class="text-xs-center">
    <v-dialog
      v-model="dialog"
      width="500"
    >
      <template v-slot:activator="{ on }">
        <v-btn
          color="red lighten-2"
          dark
          v-on="on"
        >
          Click Me
        </v-btn>
      </template>

      <v-card>
        <v-card-title
          class="headline grey lighten-2"
          primary-title
        >
          Privacy Policy
        </v-card-title>

        <v-card-text>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            flat
            @click="dialog = false"
          >
            I accept
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>






  </div>
</template>

<script>
import {db} from '@/firebase';

  import {mapActions, mapState} from 'vuex';
  export default {
    data: () => ({
      messages: [],
      message: {
        title: '',
        area: '',
        list:[''],
      },
      dialog:false
      
    }),

    methods: {
      saveMessage() {
        this.message = {...this.message,uid:this.user.uid};
        console.log(this.message);
        let vm = this;
        db.collection('messages').add(
            this.message).then((resp)=>{
              console.log(resp);
            }).catch(
              (err)=>{
                console.log(err);
              }
            );
        //this.push(this.asistencia)
        //this.show()
        //this.reset()
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
    created() {
     /* console.log(this.user);
      if(this.user == null){
        console.log('user is null');
        this.$router.push("/");
      }*/
    },
    mounted() {
                //console.log(db.collection('a').get());
                db.collection('messages').get().then((querySnapshot) => {
                    let asistenciaArray = []
                    querySnapshot.forEach((doc) => {
                        let msg = doc.data()
                        //asist.id = doc.id
                        this.messages.push(msg)
                        //asistenciaArray.push(asist)
                       //console.log(doc.id, ' => ', doc.data())
                    })
                    //this.asistencias = asistenciaArray
                })
                console.log(this.asistencias);

    }

  }
</script>