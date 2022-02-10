<template>
  <div class="createRoomForm">
    <div v-if="!roomLoading">
      <va-form
        style="width: 300px;"
        tag="form"
        @submit.prevent="createRoom"
      >
        <va-input
          v-model="username"
          label="Username"
        />
        
        <br />
        <va-input
          v-model="displayName"
          label="Room Name"
        />

        <br />
        <va-switch 
          style="color: white;"
          v-model="enableRoomPreviews" 
          label="Enable Room Previews"
          color="success" 
          class="mr-4" 
        />

        <va-button type="submit" class="mt-2" :loading="loadingToken" :rounded="false">
          Create Persistant Room
        </va-button>
      </va-form>
    </div>

  </div>
</template>

<script>
const helper = require('../api-helper')

export default {
  name: 'CreateRoomForm',
  data() {
    return {
      username: '',
      displayName: '',
      enableRoomPreviews: false,
      loadingToken: false
    }
  },
  async mounted() {
    console.log(this.backendURL)
  },
  methods: {
    toKebabCase(text) {
      return text.toLowerCase().replace(/\s/g, '').replace(/[^A-Z0-9]+/ig,'-')

    },
    async createRoom(){
      this.loadingToken = true
      try {
        let token = await helper.joinWithUsername(this.displayName, this.username, this.enableRoomPreviews)
        this.$emit("roomCredentials", this.username, this.displayName, token)
      } catch (e) {
        console.log(e)
      }
      this.loadingToken = false
    }
  }
}


</script>

<style scoped>



</style>