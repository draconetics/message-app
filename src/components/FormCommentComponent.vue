<template>
	<v-card-text>
		<Alert :notification="errorEmpty"/>
		<v-textarea v-model="content">
			<template v-slot:label>
				<div>
				Write your comment: 
				</div>
			</template>
		</v-textarea> 	
		
		<v-btn color="info" @click.prevent="createCommentAndReset">
			<v-icon>speaker_notes</v-icon>
			Create comment
		</v-btn>            	
	</v-card-text>
</template>
<script>

import Alert from './AlertComponent.vue'

import {mapState, mapActions} from 'vuex';
export default {
	name:'FormComment',
	data:()=> ({
		content:'',
		errorEmpty:''
	}),
	components: {
		Alert
	},
	props:{
		message: Object,
	},
	computed: {
		...mapState([
			'user'
		])
	},
	methods: {

		createCommentAndReset() {
			if(this.content == ''){
				this.errorEmpty = 'No empty comment.';
				return;
			}

			let newComment = {
				id_author: this.user.uid,
				email: this.user.email,
				comment: this.content        
			};
			this.message.comments.push(newComment);
			this.createComment(this.message);
			console.log('vaciar comment');
			this.content = '';
		},//end createCommentAndReset()

		...mapActions([
			'createComment'
		])
	}
}
</script>