<template>
	<div>
		<v-alert
                  :value="notification"
                  type="error"
                >
                  {{notification}}
                </v-alert>
	</div>
</template>

<script>



export default {
  name: 'AlertComponent',
  props: ['notification'],
  created() {
    console.log(this.notification);
  }

}
</script>
