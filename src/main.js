import { createApp } from 'vue'
import App from './App'
import Components from './components/UI';
import router from './router/router';

const app = createApp(App);

Components.forEach(component => app.component(component.name, component));

app
  .use(router)
  .mount('#app');
