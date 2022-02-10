<template>
  <div class="signalWireRoom">
    <div id="videoRoom" class="dynamic" >
      <div id="rootElement" ref="rootElement">
        <!-- Video is injected here. -->
      </div> 

      <div style="position: relative;" v-if="roomStarted">
        <va-app-bar bottom color="#101011" style="height: 50px;">
          <va-spacer />
          <MeetingControls
            :room="room"
            @hangup="onHangup"
          />
          
          <RoomSettings
            :room="room"
            :devices="devices"
          />
          <va-spacer />
        </va-app-bar>
      </div>
    </div>
  </div>
</template>

<script>
import * as SignalWire from "@signalwire/js"
import MeetingControls from './MeetingControls.vue'
import RoomSettings from './RoomSettings.vue'

export default {
  name: 'SignalWireRoom',
  props: {
    token: String
  },
  components: {
    MeetingControls,
    RoomSettings
  },
  data() {
    return {
      room: null,
      roomStarted: false,
      devices: {
        layouts: null,
        cameras: null,
        microphones: null,
        speakers: null
      }
    }
  },
  async mounted() {
    console.log(this.token)
    this.$emit("loading")
    this.joinChatroom(this.token)
  },
  methods: {
    joinChatroom(token){
      this.room = new SignalWire.Video.RoomSession({
        token: token,
        rootElement: this.$refs.rootElement,
        audio: true,
        video: true,
        iceGatheringTimeout: 0.01,
        requestTimeout: 0.01
      })

      this.room.on("room.joined", () => {
        console.log("You joined the room");
      });
      this.room.on("member.joined", (e) =>
        console.log(e.member.name + " has joined the room")
      );
      this.room.on("member.left", (e) =>
        console.log(e.member.id + " has left the room")
      );

      this.room.join().then(() => {
        this.populateLayouts()
        this.populateVideoDevices()
        this.populateAudioDevices()
        this.$emit('roomJoined')
        this.roomStarted = true
      }).catch(error => {
        console.error('Error', error)
      })
    },
    async onHangup() {
      await this.room.hangup()
      this.room = null
      this.$emit('roomEnded')
    },
    async populateLayouts(){
      let layouts = await this.room.getLayouts()
      if(!layouts) return
      this.devices.layouts = layouts.layouts
      await this.room.setLayout({ name: "grid-responsive" })
    },
    mapDevices(devices){
      return devices.map((device, index) => {
        return {
          deviceId: device.deviceId,
          label: device.label,
          index
        }
      })
    },
    async populateVideoDevices(){
      let cameras = await SignalWire.WebRTC.getCameraDevicesWithPermissions()
      this.devices.cameras = this.mapDevices(cameras)
    },
    async populateAudioDevices(){
      let microphones = await SignalWire.WebRTC.getMicrophoneDevicesWithPermissions()
      let speakers = await SignalWire.WebRTC.getSpeakerDevicesWithPermissions()
      
      this.devices.microphones = this.mapDevices(microphones)
      this.devices.speakers = this.mapDevices(speakers)
    }
  }
}


</script>

<style scoped>

#rootElement {
  display: flex;
  margin: auto;
  max-width: 98vw;
}

</style>
