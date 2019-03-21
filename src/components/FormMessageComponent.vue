<template>
<div>
    <v-text-field
    v-model="message.title"
    :disabled="disabledState"
    label="Title message"
    required
    ></v-text-field>
    
    <v-text-field
    v-model="message.area"
    :disabled="disabledState"
    label="Area"
    required
    ></v-text-field>

    <v-textarea
    solo
    name="input-7-4"
    label="Describe your problems..."
    v-model="message.description"
    :disabled="disabledState"
    ></v-textarea>

    <v-btn 
    color="success" 
    @click.prevent="saveMessageMethod"
    v-if="(saveMessage != null)">
        <v-progress-circular
        v-show="loading" 
        indeterminate
        color="warning"
        ></v-progress-circular>
        Save
    </v-btn>

    <v-btn 
    color="error" 
    @click="$router.push('/')"
    v-if="(saveMessage != null)">
        Cancel
    </v-btn>
</div>
</template>

<script>
export default {
    name: 'menuBarComponent',

    props: {
        disabledState:Boolean,
        saveMessage:{
            type: Function,
            default: null
        },
        makeAlert:Function,
        loading:Boolean,
        message: {
            type: Object,
            default: function(){
              return {title:'',area:'',description:''};
            }
        }
    },
    methods: {
        saveMessageMethod() {
            if(this.isMessageEmpty() == true)
                return ;
            else
                this.saveMessage(this.message);
        },
        isMessageEmpty() {
            if(this.message.title == '' || 
                this.message.area == '' || 
                this.message.description == '') {

                this.makeAlert({
                    message:'No empty fields in the notification.',
                    type:'error'
                });
                return true;
            }
            this.alertMessage = '';
            return false;
        }
    },
    created() {
        console.log(this.messageParam);
        if(this.messageParam != null){
            this.message.title = this.messageParam.title;
            this.message.area = this.messageParam.area;
            this.message.description = this.messageParam.description;
        }
    }
}
</script>
