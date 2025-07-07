# 🛒 E-Commerce Backend con WebSockets

Servidor web completo desarrollado en Node.js y Express que combina una API RESTful para gestión de productos y carritos con vistas interactivas usando Handlebars y comunicación en tiempo real mediante WebSockets (Socket.io).

---

## 🚀 Características Principales

- **API REST completa** para productos y carritos
- **Vistas web interactivas** con motor de plantillas Handlebars
- **Productos en tiempo real** con WebSockets
- **Chat en tiempo real** integrado
- **Persistencia en archivos JSON**
- **Arquitectura modular** con separación de responsabilidades

---

## 📂 Estructura del Proyecto

```
📁 CoderHouse-ProyectoBackend-I/
├── 📁 src/
│   ├── 📄 app.js                  # Servidor principal con WebSockets
│   ├── 📁 managers/
│   │   ├── 📄 ProductManager.js   # Lógica de negocio para productos
│   │   └── 📄 CartManager.js      # Lógica de negocio para carritos
│   ├── 📁 routes/
│   │   ├── 📄 products.router.js  # API endpoints para productos
│   │   ├── 📄 carts.router.js     # API endpoints para carritos
│   │   └── 📄 views.router.js     # Rutas para vistas web
│   └── 📁 data/
│       ├── 📄 products.json       # Base de datos de productos
│       └── 📄 carts.json          # Base de datos de carritos
├── 📁 views/
│   ├── 📄 home.handlebars         # Vista principal de productos
│   ├── 📄 realTimeProducts.handlebars # Vista de productos en tiempo real
│   ├── 📄 chat.handlebars         # Vista del chat
│   └── 📁 layouts/
│       └── 📄 main.handlebars     # Layout principal
├── 📁 public/
│   ├── 📁 css/
│   ├── 📁 js/
│   └── 📁 img/
├── 📁 postman/
│   ├── 📄 Ecommerce-CoderHouse.postman_collection.json   # Colección de Postman
│   └── 📄 README.md                                      # Guía de uso de Postman
└── 📄 package.json
```

---

## 🏗️ Arquitectura del Sistema

### **Capa de Presentación**

- **Views Router**: Maneja rutas que renderizan vistas HTML
- **Handlebars**: Motor de plantillas para generar HTML dinámico
- **WebSockets**: Comunicación bidireccional en tiempo real

### **Capa de API REST**

- **Products Router**: Endpoints HTTP para gestión de productos
- **Carts Router**: Endpoints HTTP para gestión de carritos
- **Integración HTTP + WebSockets**: Los cambios via API se reflejan en tiempo real

### **Capa de Lógica de Negocio**

- **ProductManager**: CRUD completo para productos con validaciones
- **CartManager**: Gestión de carritos y productos asociados

### **Capa de Persistencia**

- **Archivos JSON**: Almacenamiento de datos en archivos locales
- **Operaciones asíncronas**: Uso de fs.promises para E/O no bloqueante

---

## 📄 Descripción Detallada de Archivos

### **src/app.js** - Servidor Principal

- Configura Express con Handlebars como motor de plantillas
- Inicializa servidor HTTP con Socket.io para WebSockets
- Define lógica de WebSockets para productos y chat en tiempo real
- Configura middlewares y enruta hacia los routers correspondientes
- Conecta HTTP con WebSockets para sincronización de datos

### **src/managers/ProductManager.js** - Gestor de Productos

- **CRUD completo**: Create, Read, Update, Delete
- **Validaciones**: Campos obligatorios, códigos únicos
- **Persistencia**: Lectura/escritura asíncrona en products.json
- **ID autoincrementable**: Asignación automática de identificadores

### **src/managers/CartManager.js** - Gestor de Carritos

- **Creación de carritos**: Carritos vacíos con ID único
- **Gestión de productos**: Agregar productos con cantidades
- **Persistencia**: Lectura/escritura asíncrona en carts.json

### **src/routes/views.router.js** - Rutas de Vistas

- **GET /**: Vista principal con lista de productos
- **GET /realtimeproducts**: Vista de productos en tiempo real
- **GET /chat**: Vista del chat en tiempo real

### **src/routes/products.router.js** - API de Productos

- **Endpoints REST completos** para gestión de productos
- **Integración WebSocket**: Emite eventos en operaciones POST/DELETE
- **Manejo de errores** robusto con códigos HTTP apropiados

### **src/routes/carts.router.js** - API de Carritos

- **Endpoints REST** para gestión de carritos
- **Validación de parámetros** y manejo de errores

---

## ▶️ Instalación y Ejecución

### 1. Instalar Dependencias

```bash
npm install
```

### 2. Scripts Disponibles

```bash
# Modo desarrollo (con recarga automática)
npm run dev

# Modo producción
npm start
```

### 3. Acceder a la Aplicación

- **Servidor**: http://localhost:8080
- **Vista Principal**: http://localhost:8080/
- **Productos en Tiempo Real**: http://localhost:8080/realtimeproducts
- **Chat**: http://localhost:8080/chat

---

## 🌐 Vistas Web Disponibles

### **Vista Principal (/)**

- Lista completa de productos con imágenes
- Formulario para agregar nuevos productos
- Enlace a vista de productos en tiempo real
- Interfaz Bootstrap responsiva

### **Vista Productos en Tiempo Real (/realtimeproducts)**

- Lista de productos que se actualiza automáticamente
- Formularios para agregar/eliminar productos via WebSocket
- Sincronización instantánea entre múltiples usuarios
- Notificaciones en tiempo real

### **Vista Chat (/chat)**

- Chat en tiempo real entre usuarios
- Registro de usuarios
- Historial de mensajes
- Interfaz moderna y responsive

---

## 📘 API REST Endpoints

### **Productos `/api/products`**

#### GET `/api/products`

Obtiene todos los productos.

```json
{
  "products": [
    {
      "id": 1,
      "title": "Producto 1",
      "description": "Descripción del producto",
      "price": 100,
      "code": "PROD001",
      "stock": 50,
      "category": "Categoría",
      "status": true,
      "thumbnails": ["imagen1.jpg"]
    }
  ]
}
```

#### GET `/api/products/:pid`

Obtiene un producto específico por ID.

#### POST `/api/products`

Crea un nuevo producto.

```json
{
  "title": "Nuevo Producto",
  "description": "Descripción detallada",
  "price": 150,
  "code": "PROD002",
  "stock": 25,
  "category": "Electrónicos",
  "status": true,
  "thumbnails": ["imagen2.jpg"]
}
```

#### PUT `/api/products/:pid`

Actualiza un producto existente.

#### DELETE `/api/products/:pid`

Elimina un producto por ID.

### **Carritos `/api/carts`**

#### POST `/api/carts`

Crea un nuevo carrito vacío.

#### GET `/api/carts/:cid`

Obtiene el contenido de un carrito.

#### POST `/api/carts/:cid/product/:pid`

Agrega un producto al carrito.

```json
{
  "quantity": 2
}
```

---

## 🔌 WebSockets Events

### **Productos en Tiempo Real**

- **`getProducts`**: Solicita lista de productos
- **`updateProducts`**: Recibe lista actualizada de productos
- **`addProduct`**: Agrega producto via WebSocket
- **`deleteProduct`**: Elimina producto via WebSocket
- **`productAdded`**: Confirmación de producto agregado
- **`productDeleted`**: Confirmación de producto eliminado
- **`error`**: Manejo de errores

### **Chat en Tiempo Real**

- **`registerUser`**: Registra usuario en el chat
- **`newMessage`**: Envía nuevo mensaje
- **`messageList`**: Recibe lista de mensajes

---

## 🔄 Sincronización HTTP + WebSockets

El proyecto implementa una **conexión innovadora** entre peticiones HTTP y WebSockets:

1. **Crear producto via API POST** → **Actualización automática en vista tiempo real**
2. **Eliminar producto via API DELETE** → **Actualización automática en vista tiempo real**
3. **Crear/eliminar via WebSocket** → **Persistencia en archivo JSON**

Esta integración permite que múltiples usuarios vean cambios instantáneamente, sin importar si usan la API REST o la interfaz web.

---

## 🛠️ Tecnologías Utilizadas

- **Node.js**: Runtime de JavaScript
- **Express.js**: Framework web para Node.js
- **Socket.io**: WebSockets para comunicación en tiempo real
- **Handlebars**: Motor de plantillas para vistas dinámicas
- **Bootstrap**: Framework CSS para UI responsiva
- **SweetAlert2**: Alertas modernas y atractivas
- **Nodemon**: Recarga automática en desarrollo

---

## 🧪 Testing

### **Con Postman (Recomendado)**

1. **Importar colección**: Ve a la carpeta `postman/` y sigue las instrucciones del README
2. **Importar environment**: Incluye variables preconfiguradas como `baseUrl`
3. **Ejecutar tests**: Todos los endpoints están listos para probar con ejemplos

### **Con el Navegador**

1. Abrir múltiples ventanas/pestañas
2. Probar funcionalidad en tiempo real
3. Verificar sincronización entre ventanas

### **📮 Archivos de Postman Incluidos**

- `postman/Ecommerce-CoderHouse.postman_collection.json` - Colección completa probada con datos reales
- `postman/README.md` - Guía detallada de uso y ejemplos de datos

---

## ✨ Funcionalidades Destacadas

- ✅ **Arquitectura modular** con separación clara de responsabilidades
- ✅ **WebSockets integrados** para experiencia en tiempo real
- ✅ **Vistas responsive** con Bootstrap
- ✅ **Validaciones robustas** en backend
- ✅ **Manejo de errores** completo
- ✅ **Código bien documentado** y organizado
- ✅ **Cumple criterios de evaluación** del curso

---

### **🚀 Inicio Rápido con Postman**

1. **Abrir Postman** y hacer clic en "Import"
2. **Seleccionar archivo** `postman/Ecommerce-CoderHouse.postman_collection.json`
3. **¡Listo!** Ya puedes probar todos los endpoints organizados por categorías

**Endpoints destacados incluidos:**

- `GET | Products - ALL` - Ver todos los productos
- `POST | Product - ADD NEW` - Crear productos (incluye ejemplo de Gran Turismo 7)
- `POST | Carts - CREATE CART` - Crear carritos
- `POST | Carts - ADD PRODUCT QUANTITY` - Agregar productos con cantidad específica

---
