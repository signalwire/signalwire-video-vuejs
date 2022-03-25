<template>
  <div class="roomCard">
    <va-card v-on:click="joinRoom(room_name)">
        <div class="room-preview" v-if="preview_url">
        <img 
          class="room-preview-video"
          :src="preview_url"
        />
        </div>
        <va-card-title>{{display_name}}</va-card-title>
    </va-card>
  </div>
</template>

<script>

export default {
  name: 'RoomCard',
  props: {
    preview_url: String,
    display_name: String,
    room_name: String
  },
  methods: {
    joinRoom(roomname) {
      window.location.href = `/in-call?roomname=${roomname}`
    }
  }
}

</script>

<style scoped>


.roomCard {
  width: 200px;
  margin: 10px; 
  align-content: center;
  justify-content: center;
  cursor: pointer;
}

.room-preview {
  overflow: hidden;
  position: relative;
  width: inherit;
}

.room-preview-video {
  height:inherit;
  width:inherit;
}

</style>