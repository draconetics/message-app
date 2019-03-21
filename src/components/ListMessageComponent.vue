<template>
<div>
		<v-container class="my-5 ">
		
				<Alert 
				v-if="(messages.length == 0)" 
				:notification="'No Notifications found.'" 
				:type="'info'"/>
				<v-layout row wrap justify-center my-5 
				v-for="(msg,index) in messages " 
				color="red">
						<v-flex xs12 sm4 >
								<v-card >
										<v-img
										src="https://cdn.vuetifyjs.com/images/cards/desert.jpg"
										aspect-ratio="2.75"
										></v-img>

										<v-card-title primary-title>
												<h3 class="headline mb-0">{{msg.title}}</h3>
										</v-card-title>
										<v-card-text>
												<h2> {{ msg.area }} </h2>
												<div> {{ msg.description }} </div>
										</v-card-text>
										<v-card-actions>
												<v-btn 
												flat color="primary" 
												@click.prevent="updateMessageDialog(msg)">
														Edit
												</v-btn>
												<v-btn flat 
												color="danger" 
												@click.prevent="deleteMessageDialog(msg)">
														Delete
												</v-btn>
										</v-card-actions>
								</v-card>
						
						</v-flex>
              			<v-flex xs12 sm6 mx-3>
								<v-card class="mx-auto">
										<FormComment :message="msg"  />

										<v-card-title>
												<span class="title font-weight-bold">
														COMMENTS
												</span>
										</v-card-title>
										
										<Alert 
										v-if="(msg.comments.length == 0)" 
										:notification="'No comments found.'" 
										:type="'info'"/>
										<v-card-text 
										class="title font-weight-light" 
										v-for="(c, index) in msg.comments" :key="index">
												{{c.email}}:"{{c.comment}}"
										</v-card-text>
								</v-card>
						</v-flex>
				</v-layout>
        </v-container>



		<div class="text-xs-center">
				<v-dialog v-model="dialogEdit" width="500">
						<v-card>
								<v-card-title
								class="headline grey lighten-2"
								primary-title>
										Edit Message
								</v-card-title>
						<v-card-text>
						      	<v-container grid-list-md>
										<FormMessage 
										:message="editMessage" 
										:disabledState="false"
										/>
								</v-container>
						</v-card-text>
						<v-divider></v-divider>

						<v-card-actions>
								<v-btn
								color="primary"
								flat
								@click="updateMessageAndCloseDialog">
										Upddate Notification
								</v-btn>

								<v-spacer></v-spacer>
								<v-btn
								color="primary"
								flat
								@click="dialogEdit = false">
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
										<Alert :notification="'Do you want 	to delete this element?'"/>
										<FormMessage :message="editMessage" :disabledState="true"/>
								</v-container>
						</v-card-text>
						<v-divider></v-divider>

						<v-card-actions>
								<v-btn
								color="error"
								flat
								@click="deleteMessageAndCloseDialog(editMessage.id)">
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
import Alert from '@/components/AlertComponent.vue';
import FormMessage from '@/components/FormMessageComponent.vue';
import FormComment from '@/components/FormCommentComponent.vue';
export default {
		name: 'ListMessageComponent',
		data: () => ({
			dialogEdit:false,
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
			FormMessage, Alert, FormComment
		},
		methods: {
			updateMessageDialog(msg){
				this.editMessage = {...msg};
				//console.log(this.editMessage);
				this.dialogEdit = true;
			},
			updateMessageAndCloseDialog(){
				this.updateMessage(this.editMessage);
				this.dialogEdit = false;  	
			},
			deleteMessageDialog(msg) {
				this.editMessage = {...msg};
				this.dialogDelete = true;
			},
			deleteMessageAndCloseDialog(id){
				this.deleteMessage(id);
				this.dialogDelete = false;  	
			}
		}
}
</script>
