import { createApp } from 'vue'
// Estilos globales de Tailwind
import './style.css'

// Componente raíz de la aplicación
import App from './App.vue'

// Crear y montar la instancia de Vue
const app = createApp(App)

app.mount('#app')
