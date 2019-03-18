<template>
	<v-card-text>
	   <v-textarea
        v-model="content">
          <template v-slot:label>
            <div>
              Write your comment: 
            </div>
          </template>
        </v-textarea> 	
		<v-btn color="info" @click.prevent="createCommentAndReset">Create comment</v-btn>            
    </v-card-text>
</template>
<script>
	import {db} from '../firebase'
	import {mapState} from 'vuex';
	export default {
		name:'FormComment',
		data:()=> ({
			content:''
		}),
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
				 let newComment = {
		          id_author: this.user.uid,
		          email: this.user.email,
		          comment: this.content        
		        };
			        this.message.comments.push(newComment);
			        db.collection('messages')
			                .doc(this.message.id).set({
			                        title: this.message.title,
			                        area: this.message.area,
			                        description: this.message.description,
			                        id_user: this.message.id_user,
			                        comments: this.message.comments
			                    }).then(()=> {
			                        console.log("updated message");
			                       
			                        this.content = '';
			                        
			                    })
			                      .catch((err)=>console.log(err));
			  }//end createCommentAndReset()
				
			
		}
	}
</script>