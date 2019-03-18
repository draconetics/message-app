<template>
  <div>
        <v-form>
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

            

   
          </v-form>
  </div>
</template>
<script>



export default {
  name: 'menuBarComponent',
  props: ['message','disabledState']
}
</script>
