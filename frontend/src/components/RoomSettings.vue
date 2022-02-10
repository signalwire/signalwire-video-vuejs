<template>
  <div class="roomSettings">
    <va-button
      @click="$refs.statefulModal.show()"
      icon="settings" 
      color="secondary" 
      class="mr-4" 
    />
    <va-modal ref="statefulModal" hide-default-actions stateful>
      <div id="settings">
        <va-select
          class="mb-4"
          label="Layouts"
          :options="devices.layouts"
          v-model="selectedLayout"
          @update:model-value="changeLayout"
        >
          <template #prepend>
            <va-icon
              name="view_comfy"
            />
          </template>
        </va-select>

        <va-select
          v-if="devices.cameras"
          class="mb-4"
          label="Webcams"
          :options="devices.cameras"
          text-by="label"
          track-by="index"
          value-by="deviceId"
          v-model="selectedCamera"
          @update:model-value="updateCamera"
        >
          <template #prepend>
            <va-icon
              name="cameraswitch"
            />
          </template>
        </va-select>

        <va-select
          v-if="devices.microphones"
          class="mb-4"
          label="Microphones"
          :options="devices.microphones"
          text-by="label"
          track-by="index"
          value-by="deviceId"
          v-model="selectedMicrophone"
          @update:model-value="updateMicrophone"
        >
          <template #prepend>
            <va-icon
              name="settings_voice"
            />
          </template>
        </va-select>

        <va-select
          v-if="devices.speakers"
          class="mb-4"
          label="Speakers"
          :options="devices.speakers"
          text-by="label"
          track-by="index"
          value-by="deviceId"
          v-model="selectedSpeaker"
          @update:model-value="updateSpeaker"
        >
          <template #prepend>
            <va-icon
              name="speaker"
            />
          </template>
        </va-select>
          
      </div>

      <template #footer>
        <va-button @click="$refs.statefulModal.hide()">
          Close
        </va-button>
      </template>

    </va-modal>
  </div>
</template>

<script>

export default {
  name: 'RoomSettings',
  props: {
    room: Object,
    devices: Object
  },
  data() {
    return {
      selectedLayout: "grid-responsive",
      selectedCamera: "",
      selectedMicrophone: "",
      selectedSpeaker: ""
    }
  },
  watch: {
    'devices.cameras'(cameras) {
      this.selectedCamera = this.selectedCamera || cameras[0].deviceId
      this.updateCamera(this.selectedCamera)
    },
    'devices.microphones'(microphones) {
      this.selectedMicrophone = this.selectedMicrophone || microphones[0].deviceId
      this.updateMicrophone(this.selectedMicrophone)
    },
    'devices.speakers'(speakers) {
      this.selectedSpeaker = this.selectedSpeaker || speakers[0].deviceId
      this.updateSpeaker(this.selectedSpeaker)
    }
  },
  methods: {
    async changeLayout(layout) {
      await this.room.setLayout({ name: layout })
    },
    async updateCamera(deviceId) {
      await this.room.updateCamera({ deviceId: deviceId })
    },
    async updateMicrophone(deviceId) {
      await this.room.updateMicrophone({ deviceId: deviceId })
    },
    async updateSpeaker(deviceId) {
      await this.room.updateSpeaker({ deviceId: deviceId })
    },
  }
}


</script>
