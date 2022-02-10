import axios from "axios"

function fetchBackendURL() {
    return process.env.VUE_APP_URL || "http://localhost:3080"
}

function toKebabCase(text) {
    return text.toLowerCase().replace(/\s/g, '').replace(/[^a-zA-Z0-9]/g, '')
}

async function joinWithUsername(roomname, username, enableRoomPreviews){
    
    let token = await axios.post(fetchBackendURL() + "/api/get_token", {
        user_name: username,
        room_name: toKebabCase(roomname),
        room_display_name: roomname,
        enable_room_previews: enableRoomPreviews
    })
    return token.data.token
}

function filterRoomsByInProgress(rooms) {
    return rooms.filter(obj => {
      return obj.status == "in-progress";
    })
}

async function listRoomSessions() {
    let rooms = await axios.get(fetchBackendURL() + "/api/list_rooms")
    return rooms.data.rooms.data
}

async function listActiveRoomSessions() {
    let rooms = await listRoomSessions()
    return filterRoomsByInProgress(rooms)
}

async function createRoom(displayName, username, enableRoomPreviews) {
    let token = await axios.post(fetchBackendURL() + "/api/create_room", {
        user_name: username,
        room_name: toKebabCase(this.displayName),
        display_name: displayName,
        enable_room_previews: enableRoomPreviews
      })
    return token.data.token
}



export {
    fetchBackendURL,
    toKebabCase,
    joinWithUsername,
    filterRoomsByInProgress,
    listActiveRoomSessions,
    listRoomSessions,
    createRoom
}