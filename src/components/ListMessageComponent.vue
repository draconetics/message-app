<template>
	<div>
		
		    <div class="container">
		        <v-layout>
		           <v-flex xs12 sm6 offset-sm3>

						<v-alert
					      :value="(messages.length==0)?true:false"
					      type="info"
					    >No items to show.
    					</v-alert>

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
		                  <v-btn flat color="primary" @click.prevent="updateMessageDialog(msg)">Edit</v-btn>
		                  <v-btn flat color="danger" @click.prevent="deleteMessageDialog(msg)">Delete</v-btn>
		                </v-card-actions>
		              </v-card>
		              <br/>
		            </v-flex>
		        </v-layout>
		  
		    </div>




		  <div class="text-xs-center">
		    <v-dialog v-model="dialog" width="500">
		      <v-card>
		        <v-card-title
		          class="headline grey lighten-2"
		          primary-title
		        >
		          Edit Message
		        </v-card-title>
				<v-card-text>
				          <v-container grid-list-md>
		        					<FormMessage :message="editMessage" :disabledState="false"/>
							</v-container>
			    </v-card-text>
		        <v-divider></v-divider>

		        <v-card-actions>
		          <v-btn
		            color="primary"
		            flat
		            @click="updateMessageAndCloseDialog(editMessage)"
		          >
		            Upddate Notification
		          </v-btn>

		          <v-spacer></v-spacer>
		          <v-btn
		            color="primary"
		            flat
		            @click="dialog = false"
		          >
		            Cancel
		          </v-btn>
		        </v-card-actions>
		      </v-card>
		    </v-dialog>
		  </div>





		  <div class="text-xs-center">
		    <v-dialog v-model="dialogDelete" width="500">
		      <v-card>
		        <v-card-title
		          class="headline grey lighten-2"
		          primary-title
		        >
		          Delete Message
		        </v-card-title>
				<v-card-text>
				          <v-container grid-list-md>
				          			<Alert :notification="'Do you want 	to delete this element?'"/>
		        					<FormMessage :message="editMessage" :disabledState="true"/>
		        					
							</v-container>
			    </v-card-text>
		        <v-divider></v-divider>

		        <v-card-actions>
		          <v-btn
		            color="error"
		            flat
		            @click="deleteMessageAndCloseDialog(editMessage.id)"
		          >
		            Delete Notification
		          </v-btn>

		          <v-spacer></v-spacer>
		          <v-btn
		            color="primary"
		            flat
		            @click="dialogDelete = false"
		          >
		            Cancel
		          </v-btn>
		        </v-card-actions>
		      </v-card>
		    </v-dialog>
		  </div>

	</div>
</template>

<script>
import Alert from '@/components/AlertComponent.vue';
import FormMessage from '@/components/FormMessageComponent.vue';
export default {
  name: 'ListMessageComponent',
  data: () => ({
      dialog:false,
      dialogDelete: false,
      editMessage:{
      	title:'',
      	area:'',
      	description:''
      }
    }),
  props: {
  	messages: Array,
  	updateMessage: Function,
  	deleteMessage: Function
  },
  components: {
  	FormMessage, Alert
  },
  methods: {
  	updateMessageDialog(msg){
  		this.editMessage = {...msg};
  		this.dialog = true;
  	},
  	updateMessageAndCloseDialog(msg){
  		this.updateMessage(msg);
  		this.dialog = false;  	
  	},
  	deleteMessageDialog(msg) {
  		this.editMessage = {...msg};
  		this.dialogDelete = true;
  	},
  	deleteMessageAndCloseDialog(id){
  		this.deleteMessage(id);
  		this.dialogDelete = false;  	
  	},
  },
  created() {
    //this.$emit('updateMessage');
  }
}
</script>
