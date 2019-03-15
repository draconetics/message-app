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
      
    </div>
  </div>
</template>

<script>
import {db} from '@/firebase';

  import {mapActions, mapState} from 'vuex';
  export default {
    data: () => ({
      
      message: {
        title: '',
        area: '',
        list:['']
      }
      
    }),

    methods: {
      saveMessage() {
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
            'loading','error'
            ])
    }
  }
</script>