# Backend API

The backend server is a simple custom [REST API](https://www.redhat.com/en/topics/api/what-is-a-rest-api) built with [NodeJS](https://nodejs.org/en/) and [ExpressJS](https://expressjs.com/). Its purpose is to allow users to interact with your space using the SignalWire Video API with permissions scoped.

This API is consumed by the Frontend. See the frontend javascript helper class to see how. [frontend/src/api-helper.js](../frontend/src/api-helper.js)

## Scoped Permissions

Permissions are set in [backend/index.js](../backend/index.js)

For more information on Permissions see the [SignalWire Video API Permissions Docs](https://developer.signalwire.com/apis/reference/video_permissions).

```js
const USER_DEFAULT_PERMISSIONS = [
    "room.list_available_layouts",
    "room.set_layout",
    "room.self.audio_mute",
    "room.self.audio_unmute",
    "room.self.video_mute",
    "room.self.video_unmute"
  ]
```

## Endpoints

* [Get Token](#get-token) : `POST /api/get_token`
* [Create Room](#create-room) : `POST /api/create_room`
* [List Rooms](#list-rooms) : `GET /api/list_rooms`

### Get Token

Generates a Room token allowing a client to join or create a Room session. This is an abstraction of the [SignalWire Video API Room Tokens Endpoint](https://developer.signalwire.com/apis/reference/create_room_token)

Returns a JSON Web Token (JWT) for a Room session with custom permissions applied server side. See [backend/index.js](../backend/index.js)

**URL:** `/api/get_token`

**Method:** `POST`

**Request Body:** 
```json
{
    "user_name": "John Chrichton",
    "room_name": "can-not-have-spaces-or-special-characters",
    "room_display_name": "Can have spaces and special characters!",
    "enable_room_previews": Boolean
}
```

**Response:**

```json
{
    "token": <A JWT that lets you join a room session>
}
```

### Create Room

Creates a persistant Room (one that wont expire like a typical Room session) and then generates a Room token for joining.

Returns a JSON Web Token (JWT) for a Room session with custom permissions applied server side. See [backend/index.js](../backend/index.js)

**URL:** `/api/create_room`

**Method:** `POST`

**Request Body:** 
```json
{
    "user_name": "John Chrichton",
    "room_name": "can-not-have-spaces-or-special-characters",
    "room_display_name": "Can have spaces and special characters!",
    "enable_room_previews": Boolean
}
```

**Response:**

```json
{
    "token": <A JWT that lets you join a room session>
}
```

### List Rooms

Lists all Room sessions. This is an abstraction of the [SignalWire Video API Room Sessions Endpoint](https://developer.signalwire.com/apis/reference/list_room_sessions)

**URL:** `/api/list_rooms`

**Method:** `GET`

**Response:**

```json
{
    rooms: [Array of room objects]
}
```