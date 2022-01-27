import { createApp } from 'vue'
import App from './App'
import Components from './components/UI';

const app = createApp(App);

Components.forEach(component => app.component(component.name, component));

app.mount('#app')
