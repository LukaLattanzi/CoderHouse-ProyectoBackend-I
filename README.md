# 🛒 API de Productos y Carritos

Servidor RESTful desarrollado con Node.js y Express para gestionar productos y carritos de compra. La información se guarda en archivos JSON para persistencia.

## 📦 Estructura del Proyecto

```
src/
├── app.js                # Punto de entrada del servidor Express
├── managers/
│   ├── ProductManager.js # Lógica para gestionar productos
│   └── CartManager.js    # Lógica para gestionar carritos
├── routes/
│   ├── products.router.js# Rutas para productos
│   └── carts.router.js   # Rutas para carritos
├── data/
│   ├── products.json     # Persistencia de productos
│   └── carts.json        # Persistencia de carritos
```

## 🚀 Instalación

```bash
npm install
```

### 📡 Uso con recarga automática

Instalá nodemon de forma global (o como dependencia de desarrollo):

```bash
npm install -g nodemon
```

Luego, ejecutá el servidor con:

```bash
nodemon src/app.js
```

> `nodemon` reinicia automáticamente el servidor cuando detecta cambios.

## ▶️ Ejecución del Servidor (modo normal)

```bash
node src/app.js
```

El servidor estará disponible en: `http://localhost:8080`

---

## 📘 Endpoints de Productos `/api/products`

### GET `/api/products`

Retorna todos los productos.

### GET `/api/products/:pid`

Retorna el producto con ID específico.

### POST `/api/products`

Crea un nuevo producto.

**Body JSON:**

```json
{
  "title": "Nombre",
  "description": "Descripción",
  "code": "ABC123",
  "price": 100,
  "status": true,
  "stock": 10,
  "category": "Categoría",
  "thumbnails": ["/img/1.png"]
}
```

### PUT `/api/products/:pid`

Actualiza un producto por ID.

### DELETE `/api/products/:pid`

Elimina un producto por ID.

---

## 🛒 Endpoints de Carritos `/api/carts`

### POST `/api/carts`

Crea un nuevo carrito.

### GET `/api/carts/:cid`

Obtiene todos los productos de un carrito.

### POST `/api/carts/:cid/product/:pid`

Agrega un producto al carrito. Si ya existe, incrementa su cantidad.

---

## 🧪 Recomendación para Pruebas

Usá [Postman](https://www.postman.com/) o [Thunder Client](https://www.thunderclient.com/) para realizar pruebas de los endpoints.

---

## 📂 Notas

- Asegurate de que `products.json` y `carts.json` existan en la carpeta `data/`.
- Todos los IDs son autogenerados.

---

## 📚 Explicación del Código

### app.js

- Configura y ejecuta el servidor Express.
- Usa middlewares para procesar `JSON` y `URL-encoded`.
- Enruta las peticiones hacia `/api/products` y `/api/carts`.

### ProductManager.js

- Clase que maneja operaciones de productos:
  - `addProduct()`: Agrega productos nuevos con ID autoincremental.
  - `getProducts()`: Devuelve todos los productos.
  - `getProductById()`: Devuelve un producto por ID.
  - `updateProduct()`: Modifica un producto existente.
  - `deleteProduct()`: Elimina un producto.
- Usa el módulo `fs.promises` para leer/escribir en `products.json`.

### CartManager.js

- Clase que maneja carritos:
  - `createCart()`: Crea un carrito vacío con ID autoincremental.
  - `getCartById()`: Devuelve un carrito con todos sus productos.
  - `addProductToCart()`: Agrega un producto o incrementa su cantidad en el carrito.

### products.router.js

- Define las rutas HTTP para gestionar productos usando `ProductManager`.

### carts.router.js

- Define las rutas HTTP para gestionar carritos usando `CartManager`.

---
