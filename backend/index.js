require('dotenv').config()

const auth = {
    username: process.env.USERNAME, // Project-ID
    password: process.env.API_TOKEN // API token
  };
  const apiurl = process.env.API_URL;
  const ServerPort = process.env.PORT || 3080;
  
  // Basic express boilerplate
  const express = require("express");
  const bodyParser = require("body-parser");
  const cors = require("cors");
  const axios = require("axios");
  
  const app = express();
  app.use(bodyParser.json());
  app.use(cors());
  // End basic express boilerplate

  const USER_DEFAULT_PERMISSIONS = [
    "room.list_available_layouts",
    "room.set_layout",
    "room.self.audio_mute",
    "room.self.audio_unmute",
    "room.self.video_mute",
    "room.self.video_unmute"
  ]
  
  // Endpoint to request token for video call
  app.post("/api/get_token", async (req, res) => {
    let {
      user_name,
      room_name,
      room_display_name,
      enable_room_previews
    } = req.body;
    console.log("Received name", user_name);
    try {
      let token = await axios.post(
        apiurl + "/room_tokens",
        {
          user_name,
          room_name,
          room_display_name,
          enable_room_previews,
          permissions: USER_DEFAULT_PERMISSIONS
        },
        { auth }
      );
      console.log(token.data.token);
      return res.json({ token: token.data.token });
    } catch (e) {
      console.log(e);
      return res.sendStatus(500);
    }
  });
  
  app.post("/api/create_room", async (req, res) => {
    console.log(req.body);
    let { user_name, display_name, room_name, enable_room_previews } = req.body;
    console.log("Received name", user_name);
    try {
      let room = await axios.post(
        apiurl + "/rooms",
        {
          user_name,
          room_name,
          display_name,
          enable_room_previews
        },
        { auth }
      );
      console.log(room.data.name);
      try {
        let token = await axios.post(
          apiurl + "/room_tokens",
          {
            user_name,
            room_name: room.data.name,
            permissions: USER_DEFAULT_PERMISSIONS
          },
          { auth }
        );
        console.log(token.data.token);
        return res.json({ token: token.data.token });
      } catch (e) {
        console.log(e);
        return res.sendStatus(500);
      }
    } catch (e) {
      console.log(e);
      return res.sendStatus(500);
    }
  });
  
  app.get("/api/list_rooms", async (req, res) => {
    try {
      let rooms = await axios.get(apiurl + "/room_sessions", { auth });
      console.log(rooms.data.rooms);
      return res.json({ rooms: rooms.data });
    } catch (e) {
      console.log(e);
      return res.sendStatus(500);
    }
  });
  
  async function start(port) {
    app.listen(port, () => {
      console.log("Server listening at port", port);
    });
  }
  
  // Start the server
  start(ServerPort);
  