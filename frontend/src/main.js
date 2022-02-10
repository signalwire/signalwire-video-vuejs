import { createApp, h } from 'vue'
import Home from './Home.vue'
import InCall from './InCall.vue'
import { VuesticPlugin } from 'vuestic-ui'
import 'vuestic-ui/dist/vuestic-ui.css' 
import './assets/styles/icons.css'
import './assets/styles/fonts.css'
import './assets/styles/vuestic-overrides.css'


const routes = {
    '/': Home,
    '/in-call': InCall
  }
  
const SimpleRouter = {
    data: () => ({
        currentRoute: window.location.pathname
    }),

    computed: {
        CurrentComponent() {
        return routes[this.currentRoute]
        }
    },

    render() {
        return h(this.CurrentComponent)
    }
}

const app = createApp(SimpleRouter)
app.use(VuesticPlugin)

app.mount("#app")
