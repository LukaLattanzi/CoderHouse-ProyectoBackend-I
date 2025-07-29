# 🛒 E-Commerce Backend con MongoDB y WebSockets

Servidor web completo desarrollado en Node.js y Express que combina una API RESTful para gestión de productos y carritos con vistas interactivas usando Handlebars, comunicación en tiempo real mediante WebSockets (Socket.io) y persistencia en MongoDB con Mongoose.

---

## 🚀 Características Principales

- **API REST completa** para productos y carritos con paginación
- **Base de datos MongoDB** con Mongoose ODM
- **Vistas web interactivas** con motor de plantillas Handlebars
- **Productos en tiempo real** con WebSockets
- **Chat en tiempo real** integrado
- **Paginación avanzada** con filtros y ordenamiento
- **Arquitectura modular** con patrón DAO
- **Validaciones robustas** con esquemas Mongoose

---

## 📂 Estructura del Proyecto

```
📁 CoderHouse-ProyectoBackend-I/
├── 📄 app.js                      # Servidor principal con MongoDB
├── 📁 src/
│   ├── 📁 config/
│   │   └── 📄 database.js         # Configuración de MongoDB
│   ├── 📁 dao/
│   │   ├── 📄 ProductDAO.js       # Data Access Object para productos
│   │   └── 📄 CartDAO.js          # Data Access Object para carritos
│   ├── 📁 models/
│   │   ├── 📄 Product.js          # Esquema Mongoose para productos
│   │   ├── 📄 Cart.js             # Esquema Mongoose para carritos
│   │   └── 📄 Message.js          # Esquema Mongoose para mensajes
│   ├── 📁 routes/
│   │   ├── 📄 products.router.js  # API endpoints para productos
│   │   ├── 📄 carts.router.js     # API endpoints para carritos
│   │   └── 📄 views.router.js     # Rutas para vistas web
│   └── 📁 utils/
│       └── 📄 helpers.js          # Helpers para Handlebars
├── 📁 views/
│   ├── 📄 home.handlebars         # Vista principal con paginación
│   ├── 📄 productDetail.handlebars # Vista detalle de producto
│   ├── 📄 cartDetail.handlebars   # Vista detalle de carrito
│   ├── 📄 realTimeProducts.handlebars # Vista productos tiempo real
│   ├── 📄 chat.handlebars         # Vista del chat
│   ├── 📄 error.handlebars        # Vista de errores
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

- **Views Router**: Maneja rutas que renderizan vistas HTML con datos de MongoDB
- **Handlebars**: Motor de plantillas con helpers personalizados
- **WebSockets**: Comunicación bidireccional en tiempo real

### **Capa de API REST**

- **Products Router**: Endpoints HTTP con paginación, filtros y ordenamiento
- **Carts Router**: Endpoints HTTP para gestión completa de carritos
- **Integración HTTP + WebSockets**: Cambios sincronizados en tiempo real

### **Capa de Lógica de Negocio (DAO)**

- **ProductDAO**: Operaciones CRUD con validaciones y paginación
- **CartDAO**: Gestión de carritos con productos poblados

### **Capa de Persistencia**

- **MongoDB**: Base de datos NoSQL con colecciones optimizadas
- **Mongoose**: ODM con esquemas, validaciones y middleware

---

## 📄 Descripción Detallada de Archivos

### **app.js** - Servidor Principal

- Configura Express con Handlebars y helpers personalizados
- Conecta a MongoDB usando Mongoose
- Inicializa servidor HTTP con Socket.io para WebSockets
- Define lógica de WebSockets para productos y chat en tiempo real
- Configura middlewares y enruta hacia los routers correspondientes

### **src/config/database.js** - Configuración de Base de Datos

- Establece conexión con MongoDB
- Manejo de errores de conexión
- Configuración de opciones de Mongoose

### **src/models/Product.js** - Modelo de Producto

- Esquema Mongoose con validaciones
- Plugin mongoose-paginate-v2 para paginación
- Campos: title, description, code, price, status, stock, category, thumbnails
- Validaciones de campos obligatorios y únicos

### **src/models/Cart.js** - Modelo de Carrito

- Esquema Mongoose para carritos
- Referencia poblada a productos
- Campos: products (array), status, createdAt, updatedAt

### **src/models/Message.js** - Modelo de Mensaje

- Esquema Mongoose para mensajes del chat
- Campos: user (email), message, timestamp

### **src/dao/ProductDAO.js** - Data Access Object para Productos

- **CRUD completo** con operaciones asíncronas
- **Paginación avanzada** con filtros y ordenamiento
- **Validaciones** de negocio y manejo de errores
- **Integración** con modelo Mongoose

### **src/dao/CartDAO.js** - Data Access Object para Carritos

- **Gestión completa** de carritos
- **Población automática** de productos
- **Validaciones** de existencia y consistencia

### **src/routes/views.router.js** - Rutas de Vistas

- **GET /**: Vista principal con paginación de productos
- **GET /products/:pid**: Vista detalle de producto individual
- **GET /carts/:cid**: Vista detalle de carrito con productos
- **GET /realtimeproducts**: Vista de productos en tiempo real
- **GET /chat**: Vista del chat en tiempo real

### **src/routes/products.router.js** - API de Productos

- **GET /api/products**: Lista con paginación, filtros y ordenamiento
- **GET /api/products/:pid**: Producto específico por ID
- **POST /api/products**: Crear nuevo producto
- **PUT /api/products/:pid**: Actualizar producto existente
- **DELETE /api/products/:pid**: Eliminar producto
- **Integración WebSocket**: Emite eventos en operaciones

### **src/routes/carts.router.js** - API de Carritos

- **POST /api/carts**: Crear carrito vacío
- **GET /api/carts/:cid**: Obtener carrito con productos poblados
- **POST /api/carts/:cid/products/:pid**: Agregar producto a carrito
- **PUT /api/carts/:cid/products/:pid**: Actualizar cantidad de producto
- **DELETE /api/carts/:cid/products/:pid**: Eliminar producto específico
- **DELETE /api/carts/:cid**: Vaciar carrito completo
- **PUT /api/carts/:cid**: Finalizar carrito (cambiar status)

### **src/utils/helpers.js** - Helpers de Handlebars

- **multiply**: Calcula subtotales (precio × cantidad)
- **calculateTotal**: Calcula total del carrito
- **Helpers personalizados** para lógica de vistas

### **views/home.handlebars** - Vista Principal Mejorada

- Lista de productos con paginación Bootstrap
- Botones de navegación (anterior/siguiente)
- Información de páginas actuales
- Filtros por categoría y status
- Ordenamiento por precio
- Integración con carrito

### **views/productDetail.handlebars** - Vista Detalle Producto

- Información completa del producto
- Galería de imágenes con carousel
- Botón para agregar al carrito
- Navegación de vuelta a lista

### **views/cartDetail.handlebars** - Vista Detalle Carrito

- Lista de productos en el carrito
- Cantidades modificables
- Subtotales y total general
- Botones para eliminar productos
- Funcionalidad para vaciar carrito
- Botón de finalizar compra

---

## ▶️ Instalación y Ejecución

### 1. Prerrequisitos

- **Node.js** (v14 o superior)
- **MongoDB** (local o MongoDB Atlas)

### 2. Configurar Base de Datos

```bash
# MongoDB local (puerto por defecto 27017)
# URI: mongodb://localhost:27017/ecommerce

# O configurar MongoDB Atlas en src/config/database.js
```

### 3. Instalar Dependencias

```bash
npm install
```

### 4. Scripts Disponibles

```bash
# Modo desarrollo (con recarga automática)
npm run dev

# Modo producción
npm start
```

### 5. Acceder a la Aplicación

- **Servidor**: http://localhost:8080
- **Vista Principal**: http://localhost:8080/
- **Detalle Producto**: http://localhost:8080/products/:id
- **Detalle Carrito**: http://localhost:8080/carts/:id
- **Productos en Tiempo Real**: http://localhost:8080/realtimeproducts
- **Chat**: http://localhost:8080/chat

---

## 🌐 Vistas Web Disponibles

### **Vista Principal (/) - Con Paginación**

- Lista de productos con paginación Bootstrap
- Navegación entre páginas (anterior/siguiente)
- Filtros por categoría y status
- Ordenamiento por precio (ascendente/descendente)
- Límite de productos por página configurable
- Información de página actual y total de páginas

### **Vista Detalle Producto (/products/:pid)**

- Información completa del producto
- Galería de imágenes (carousel Bootstrap)
- Detalles: precio, stock, categoría, descripción
- Botón para agregar al carrito actual
- Navegación de regreso a la lista

### **Vista Detalle Carrito (/carts/:cid)**

- Lista de productos en el carrito
- Cantidades modificables en tiempo real
- Subtotales por producto y total general
- Botones para eliminar productos individuales
- Funcionalidad para vaciar carrito completo
- Botón de finalizar compra

### **Vista Productos en Tiempo Real (/realtimeproducts)**

- Lista de productos que se actualiza automáticamente
- Formularios para agregar/eliminar productos via WebSocket
- Sincronización instantánea entre múltiples usuarios
- Notificaciones en tiempo real con SweetAlert2

### **Vista Chat (/chat)**

- Chat en tiempo real entre usuarios
- Registro de usuarios con email
- Historial de mensajes persistente en MongoDB
- Interfaz moderna y responsive

---

## 📘 API REST Endpoints

### **Productos `/api/products`**

#### GET `/api/products`

Obtiene productos con paginación, filtros y ordenamiento.

**Query Parameters:**

- `page`: Página actual (default: 1)
- `limit`: Productos por página (default: 10)
- `sort`: Ordenamiento por precio (`asc` o `desc`)
- `category`: Filtrar por categoría
- `status`: Filtrar por estado (`true` o `false`)

**Respuesta:**

```json
{
  "status": "success",
  "payload": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "title": "Producto 1",
      "description": "Descripción del producto",
      "price": 100,
      "code": "PROD001",
      "stock": 50,
      "category": "Electrónicos",
      "status": true,
      "thumbnails": ["imagen1.jpg"]
    }
  ],
  "totalPages": 5,
  "prevPage": null,
  "nextPage": 2,
  "page": 1,
  "hasPrevPage": false,
  "hasNextPage": true,
  "prevLink": null,
  "nextLink": "/api/products?page=2&limit=10"
}
```

#### GET `/api/products/:pid`

Obtiene un producto específico por ID de MongoDB.

#### POST `/api/products`

Crea un nuevo producto en MongoDB.

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

Actualiza un producto existente en MongoDB.

#### DELETE `/api/products/:pid`

Elimina un producto por ID de MongoDB.

### **Carritos `/api/carts`**

#### POST `/api/carts`

Crea un nuevo carrito vacío en MongoDB.

**Respuesta:**

```json
{
  "status": "success",
  "payload": {
    "_id": "507f1f77bcf86cd799439012",
    "products": [],
    "status": "active",
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z"
  }
}
```

#### GET `/api/carts/:cid`

Obtiene el contenido de un carrito con productos poblados.

**Respuesta:**

```json
{
  "status": "success",
  "payload": {
    "_id": "507f1f77bcf86cd799439012",
    "products": [
      {
        "product": {
          "_id": "507f1f77bcf86cd799439011",
          "title": "Producto 1",
          "price": 100
        },
        "quantity": 2
      }
    ],
    "status": "active"
  }
}
```

#### POST `/api/carts/:cid/products/:pid`

Agrega un producto al carrito o incrementa su cantidad.

```json
{
  "quantity": 2
}
```

#### PUT `/api/carts/:cid/products/:pid`

Actualiza la cantidad de un producto específico en el carrito.

```json
{
  "quantity": 5
}
```

#### DELETE `/api/carts/:cid/products/:pid`

Elimina un producto específico del carrito.

#### DELETE `/api/carts/:cid`

Vacía todos los productos del carrito.

#### PUT `/api/carts/:cid`

Finaliza el carrito (cambia status a "inactive").

---

## 🔌 WebSockets Events

### **Productos en Tiempo Real**

- **`getProducts`**: Solicita lista de productos desde MongoDB
- **`updateProducts`**: Recibe lista actualizada de productos
- **`addProduct`**: Agrega producto via WebSocket y MongoDB
- **`deleteProduct`**: Elimina producto via WebSocket de MongoDB
- **`productAdded`**: Confirmación de producto agregado
- **`productDeleted`**: Confirmación de producto eliminado
- **`error`**: Manejo de errores de MongoDB

### **Chat en Tiempo Real**

- **`registerUser`**: Registra usuario en el chat
- **`newMessage`**: Envía nuevo mensaje (se guarda en MongoDB)
- **`messageList`**: Recibe lista de mensajes desde MongoDB

---

## 🗄️ Esquemas de Base de Datos

### **Colección Products**

```javascript
{
  title: { type: String, required: true },
  description: { type: String, required: true },
  code: { type: String, required: true, unique: true },
  price: { type: Number, required: true },
  status: { type: Boolean, default: true },
  stock: { type: Number, required: true },
  category: { type: String, required: true },
  thumbnails: [String]
}
```

### **Colección Carts**

```javascript
{
  products: [{
    product: { type: ObjectId, ref: 'Product' },
    quantity: { type: Number, default: 1 }
  }],
  status: { type: String, enum: ['active', 'inactive'], default: 'active' }
}
```

### **Colección Messages**

```javascript
{
  user: { type: String, required: true }, // email
  message: { type: String, required: true },
  timestamp: { type: Date, default: Date.now }
}
```

---

## 🔄 Sincronización HTTP + WebSockets + MongoDB

El proyecto implementa una **integración completa** entre HTTP, WebSockets y MongoDB:

1. **Crear producto via API POST** → **Guarda en MongoDB** → **Actualización automática en vista tiempo real**
2. **Eliminar producto via API DELETE** → **Elimina de MongoDB** → **Actualización automática en vista tiempo real**
3. **Crear/eliminar via WebSocket** → **Persistencia en MongoDB** → **Sincronización con API**
4. **Chat en tiempo real** → **Mensajes guardados en MongoDB** → **Historial persistente**

Esta integración permite que múltiples usuarios vean cambios instantáneamente, con persistencia garantizada en MongoDB.

---

## 🛠️ Tecnologías Utilizadas

- **Node.js**: Runtime de JavaScript
- **Express.js**: Framework web para Node.js
- **MongoDB**: Base de datos NoSQL
- **Mongoose**: ODM para MongoDB con validaciones
- **mongoose-paginate-v2**: Plugin para paginación avanzada
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
3. **Ejecutar tests**: Todos los endpoints están listos para probar con MongoDB

### **Con el Navegador**

1. Abrir múltiples ventanas/pestañas
2. Probar funcionalidad en tiempo real
3. Verificar sincronización entre ventanas
4. Probar paginación y filtros

### **📮 Archivos de Postman Incluidos**

- `postman/Ecommerce-CoderHouse.postman_collection.json` - Colección completa con endpoints de MongoDB
- `postman/README.md` - Guía detallada de uso y ejemplos de datos

---

## ✨ Funcionalidades Destacadas

- ✅ **Base de datos MongoDB** con esquemas validados
- ✅ **Paginación avanzada** con filtros y ordenamiento
- ✅ **Arquitectura DAO** para separación de capas
- ✅ **WebSockets integrados** para experiencia en tiempo real
- ✅ **Vistas responsive** con Bootstrap y paginación
- ✅ **Validaciones robustas** en Mongoose
- ✅ **Manejo de errores** completo con MongoDB
- ✅ **Chat persistente** en base de datos
- ✅ **Carritos completos** con gestión de productos
- ✅ **Helpers personalizados** para Handlebars
- ✅ **Código bien documentado** y organizado

---

### **🚀 Inicio Rápido con Postman**

1. **Asegurar MongoDB** esté ejecutándose (local o Atlas)
2. **Abrir Postman** y hacer clic en "Import"
3. **Seleccionar archivo** `postman/Ecommerce-CoderHouse.postman_collection.json`
4. **¡Listo!** Ya puedes probar todos los endpoints con persistencia MongoDB

**Endpoints destacados incluidos:**

- `GET | Products - ALL with Pagination` - Ver productos con paginación
- `GET | Products - Filter & Sort` - Filtros y ordenamiento
- `POST | Product - ADD NEW` - Crear productos en MongoDB
- `POST | Carts - CREATE CART` - Crear carritos en MongoDB
- `POST | Carts - ADD PRODUCT` - Agregar productos a carrito
- `GET | Carts - GET WITH PRODUCTS` - Ver carrito con productos poblados

---

### **🔧 Configuración de MongoDB**

**Conexión Local:**

```javascript
// src/config/database.js
const MONGODB_URI = "mongodb://localhost:27017/ecommerce";
```

**Conexión MongoDB Atlas:**

```javascript
// src/config/database.js
const MONGODB_URI =
  "mongodb+srv://usuario:password@cluster.mongodb.net/ecommerce";
```

---
