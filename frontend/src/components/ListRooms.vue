<template>
  <div class="listRooms" v-if="rooms" >
    <div class="row">
      <div class="room" v-for="room in rooms" :key="room.id">
        <RoomCard
          v-if="room.preview_url"
          :preview_url="room.preview_url"
          :display_name="room.display_name"
          :room_name="room.name"
        />

        <RoomCard
          v-if="!room.preview_url"
          :preview_url="defaultPreview"
          :display_name="room.display_name"
          :room_name="room.name"
        />
      </div>
    </div>

  </div>
</template>

<script>
import RoomCard from './RoomCard.vue'
const helper = require('../api-helper')

export default {
  name: 'ListRooms',
  components: {
    RoomCard
  },
  data() {
    return {
      rooms: null,
      defaultPreview: 'https://signalwire-video-vuejs-frontend2.virgilvox.repl.co/img/signalwire-full.6adefa05.png'
    }
  },
  async mounted() {
    this.listRooms()
  },
  methods: {
    async listRooms(){
      let rooms = await helper.listActiveRoomSessions()
      console.log(rooms)
      if (rooms) this.rooms = rooms
    }
  }
}

</script>

<style scoped>


.listRooms {
  display: flex;
  align-content: center;
  margin: auto;
}


</style>