<template>
<div>
    <v-alert
    :value="notification"
    :color="color"
    dismissible>
        {{notification}}
    </v-alert>
</div>
</template>

<script>

export default {
    name: 'AlertComponent',
    props:{
        notification:String,
        color:{
            type:String,
            default:'error'
        }
    },
    created() {
        console.log(this.notification);
    }
}
</script>
