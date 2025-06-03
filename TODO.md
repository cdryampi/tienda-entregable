# TODO.md

## 🧩 Proyecto: Sistema de Comentarios para Productos

### ✅ Objetivo
Integrar **Supabase** para gestionar comentarios en productos. Cada comentario guardará:
- `uuid` del producto
- `comment` (texto del usuario)

---

## 🛠️ Backend (Supabase)

- [ ] Crear tabla `product_comments` con los campos:
  - `id` (uuid, auto)
  - `product_uuid` (text)
  - `comment` (text)
  - `created_at` (timestamp, default `now()`)

- [ ] Configurar reglas de acceso públicas para lectura y escritura (solo durante desarrollo).

---

## ⚙️ Frontend - Vue

### Formulario de comentario

- [ ] Crear componente `ProductCommentForm.vue`
  - [ ] Campo de texto para comentario
  - [ ] Botón de envío
  - [ ] Emitir evento o manejar internamente el `uuid` del producto

- [ ] Enviar comentario a Supabase (`insert` en `product_comments`)

### Cargar comentarios existentes

- [ ] Crear componente `ProductComments.vue`
  - [ ] Al montar, cargar comentarios del producto actual por `uuid`
  - [ ] Mostrar lista de comentarios (orden descendente por `created_at`)
  - [ ] Mostrar mensaje si no hay comentarios

---

## 🧪 Conexión Supabase

- [ ] Instalar SDK si no está:
  ```bash
  npm install @supabase/supabase-js
  ```

- [ ] Crear `supabase.js`:
  ```js
  import { createClient } from '@supabase/supabase-js'

  const supabaseUrl = 'https://YOUR_PROJECT.supabase.co'
  const supabaseKey = 'YOUR_ANON_KEY'
  export const supabase = createClient(supabaseUrl, supabaseKey)
  ```

- [ ] Usar `supabase.from('product_comments').select()` y `insert()` donde toque.

---

## 🧼 UX y validación

- [ ] Evitar comentarios vacíos
- [ ] Mostrar mensajes de éxito / error tras envío
- [ ] Limitar longitud de comentarios (ej. 300 chars)

---

## 🔄 Integración

- [ ] Importar los dos componentes en `ProductView.vue`
  - `<ProductCommentForm :uuid="product.uuid" />`
  - `<ProductComments :uuid="product.uuid" />`