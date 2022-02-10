<template>
  <div class="joinRoomForm">
    <va-form
      style="width: 300px;"
      tag="form"
      @submit.prevent="joinWithUsername"
    >
      <va-input
        v-model="username"
        label="Username"
      />
      <br />
      <va-input
        v-model="roomname"
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
        Join Meeting
      </va-button>
    </va-form>
  </div>
</template>

<script>
const helper = require('../api-helper')

export default {
  name: 'JoinRoomForm',
  data() {
    return {
      username: '',
      roomname: '',
      enableRoomPreviews: true,
      loadingToken: false
    }
  },
  methods: {
    async joinWithUsername(){
      this.loadingToken = true
      try {
        let token = await helper.joinWithUsername(this.roomname, this.username, this.enableRoomPreviews)
        this.$emit("roomCredentials", this.username, this.roomname, token)
      } catch (e) {
        console.log(e)
      }
      this.loadingToken = false
    }
  }
}


</script>
