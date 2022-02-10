<template>
  <div class="meetingControls">
      <div v-if="room">
          <va-button 
          v-on:click="hangup" 
          icon="phone_disabled" 
          color="danger" 
          class="mr-4" 
        />
  
        <va-button 
            v-on:click="shareScreen" 
            icon="screen_share" 
            color="secondary" 
            class="mr-4" 
        />

        <va-button 
            v-on:click="muteAudio" 
            icon="mic" 
            v-if="!audioMuted"
            color="success" 
            class="mr-4" 
        />

        <va-button 
            v-on:click="unmuteAudio"
            icon="mic_off" 
            v-if="audioMuted"
            color="danger" 
            class="mr-4" 
        />
        
        <va-button 
            v-on:click="muteVideo" 
            icon="videocam" 
            v-if="!videoMuted"
            color="success" 
            class="mr-4" 
        />

        <va-button 
            v-on:click="unmuteVideo" 
            icon="videocam_off" 
            v-if="videoMuted"
            color="danger" 
            class="mr-4" 
        />
      </div>
  </div>
</template>

<script>

export default {
  name: 'MeetingControls',
  props: {
    room: Object
  },
  data() {
    return {
      audioMuted: false,
      videoMuted: false,
      screenShareObj: null
    }
  },
  methods: {
    async hangup(){
      if(this.screenShareObj) {
        this.screenShareObj.leave()
        this.screenShareObj = null
      }
      
      this.$emit('hangup')
    },
    async muteAudio(){
      await this.room.audioMute()
      this.audioMuted = true
    },
    async unmuteAudio(){
      await this.room.audioUnmute()
      this.audioMuted = false
    },
    async muteVideo(){
      await this.room.videoMute()
      this.videoMuted = true
    },
    async unmuteVideo(){
      await this.room.videoUnmute()
      this.videoMuted = false
    },
    async shareScreen(){
      if(this.screenShareObj) {
        this.screenShareObj.leave()
        this.screenShareObj = null
      }else {
        this.screenShareObj = await this.room.startScreenShare()
      }
    }
  }
}


</script>