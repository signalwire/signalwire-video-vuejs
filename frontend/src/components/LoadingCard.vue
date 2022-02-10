<template>
  <div class="loadingCard">
    <va-card id="loading" stripe stripe-color="#f72b73">
      <va-card-title>Loading Room</va-card-title>
      <va-card-content>
        <h1><b>Room: </b> {{roomname}}</h1>
        <br />
        <h2><b>Username: {{username}}</b></h2>
        <br />
        <va-progress-bar indeterminate />
      </va-card-content>
    </va-card>
  </div>
</template>

<script>

export default {
  name: 'LoadingCard',
  props: {
    username: String,
    roomname: String
  }
}

</script>

<style scoped>

#loading {
  width: 20vw;
  height: 20vh;
  justify-content: center; 
  margin: auto;
  padding: 10px;
}

</style>
