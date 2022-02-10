<template>
  <div class="topAppBar">
    <div style="position: relative;">
      <va-app-bar color="#101011">
        <va-spacer />
        <img id="logo" alt="SignalWire logo" src="../assets/logo.png" />
        <span id="logo-text">SignalWire</span>
        <span id="room-name" v-if="roomname">&nbsp;- {{roomname}}</span>
        <va-spacer />
      </va-app-bar>
    </div>
  </div>
</template>

<script>

export default {
  name: 'TopAppBar',
  props: {
    roomname: String
  }
}


</script>

<style scoped>

#logo {
  height: 30px;
  margin: 10px;
}

#logo-text {
  color: white;
  font-family: 'Inter-Regular';
  font-size: 20px;
}

#room-name {
  color: white;
  font-family: 'Inter-Regular';
  font-size: 20px;
}


</style>