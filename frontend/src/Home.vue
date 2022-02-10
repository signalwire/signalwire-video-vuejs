<template>
  <div class="home">
    <TopAppBar :roomname="roomname" />

    <div class="item" v-if="!roomStarted && !loadingRoom">
      <JoinRoomForm
        @roomCredentials="createRoom"
      />
    </div>

    <div class="item" v-if="!roomStarted && !loadingRoom">
      <ListRooms />
    </div>
    
    
    <LoadingCard 
      v-if="loadingRoom && !roomStarted"
      :username="username" 
      :roomname="roomname"
    />

    <SignalWireRoom  
      :token="token" 
      v-if="token"
      @loading="onLoading"
      @roomJoined="onRoomJoined"
      @roomEnded="onRoomEnded" 
    />

    
  </div>
</template>

<script>
import SignalWireRoom from './components/SignalWireRoom.vue'
import JoinRoomForm from './components/JoinRoomForm.vue'
import LoadingCard from './components/LoadingCard.vue'
import ListRooms from './components/ListRooms.vue'
import TopAppBar from './components/TopAppBar.vue'

export default {
  name: 'Home',
  components: {
    SignalWireRoom,
    JoinRoomForm,
    LoadingCard,
    ListRooms,
    TopAppBar
  },
  data() {
    return {
      token: '',
      roomStarted: false,
      loadingRoom: false,
      username: '',
      roomname: ''
    }
  },
  methods: {
    createRoom(username, roomname, token) {
      this.username = username
      this.roomname = roomname
      this.token = token
    },
    onLoading() {
      this.loadingRoom = true
    },
    onRoomJoined() {
      this.roomStarted = true
    },
    onRoomEnded() {
      this.username = ''
      this.roomname = ''
      this.token = ''
      this.roomStarted = false
      this.loadingRoom = false
    }
  }
}
</script>

<style>


.home {
  align-content: center;
  margin: auto;
  min-height: 100vh;
  max-height: 100vh;
  background-color: #1a1b1d;
}

.item {
  display: flex; 
  justify-content: center; 
  margin: 25px;
}


</style>
