## Local Setup

These instructions assume you have basic understanding of working within a terminal and have NodeJS, NPM and Git installed.


Before beginning you'll need to create a SignalWire space and obtain some credentials. See [Getting Started with the SignalWire Video API](https://developer.signalwire.com/apis/docs/getting-started-with-the-signalwire-video-api-1).

Once you have credentials, start by cloning this repository locally. 

```bash
git clone https://github.com/signalwire/signalwire-video-vuejs
```

### Backend

1. Install node modules for the backend.
```bash
cd signalwire-video-vuejs/
cd ../backend
npm install
```
2. Configure your `SignalWire Space URL`, `Project-ID` and `API-Token` in an environment file named `.env` in the backend directory. Optionally you can change the Port that the backend is served on from here as well. 

If running both the frontend and backend on the same machine, please avoid using port 8080. 
```
USERNAME=<Project ID>
API_TOKEN=<API-TOKEN>
API_URL=https://<Space Name>.signalwire.com/api/video
PORT=3080
```
3. Start the backend server using NodeJS.
```bash
node index.js
```

### Frontend

1. Open another terminal, navigate to the repository, and install node modules for the frontend.
```bash
cd signalwire-video-vuejs/
cd frontend/
npm install
```
2. Optionally configure an environment file named `.env` in the frontend directory. By default the project expects the backend URL to be hosted at `localhost:3080`. You can customize this with the `VUE_APP_URL` environment variable.
```env
VUE_APP_URL=http://backend.com
```
3. You can serve the frontend with a hot-reload (updates on code changes) using the following command.
```bash
npm run serve
```

The application should then be hosted at `localhost:8080`. 