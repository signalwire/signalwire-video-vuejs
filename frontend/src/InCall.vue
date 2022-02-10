<template>
  <div class="incall">
    <TopAppBar :roomname="roomname" />
    
    <div class="item" v-if="!loadingRoom && !roomStarted">
       <va-form
          style="width: 300px;"
          tag="form"
          @submit.prevent="joinWithUsername"
        >
          <va-input v-model="username" label="Username" />
          <br />

          <va-button type="submit">
            Join Room
          </va-button>
      </va-form>
    </div>
   
    
    <LoadingCard 
      v-if="loadingRoom && !roomStarted"
      :username="username" 
      :roomname="roomname"
    />

    <SignalWireRoom  
      :token="token" 
      v-if="token"
      @roomJoined="onRoomJoined"
      @roomEnded="onRoomEnded" 
    />

    
  </div>
</template>

<script>
import SignalWireRoom from './components/SignalWireRoom.vue'
import LoadingCard from './components/LoadingCard.vue'
import TopAppBar from './components/TopAppBar.vue'

const helper = require('./api-helper')

export default {
  name: 'InCall',
  components: {
    SignalWireRoom,
    LoadingCard,
    TopAppBar
  },
  data() {
    return {
      token: '',
      roomStarted: false,
      loadingRoom: false,
      username: '',
      roomname: '',
    }
  },
  mounted() {
    this.getParams()
  },
  methods: {
    getParams() {
      let urlParams = new URLSearchParams(window.location.search);
      console.log(urlParams.get('roomname'))
      this.roomname = urlParams.get('roomname')
    },
    async joinWithUsername(){
      this.loadingRoom = true
      try {
        let token = await helper.joinWithUsername(this.roomname, this.username, true)
        this.token = token
      } catch (e) {
        console.log(e)
      }
    },
    onRoomJoined(){
      this.roomStarted = true
    },
    onRoomEnded() {
      window.location.href = '/'
    }
  }
}
</script>

<style>

.incall {
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
