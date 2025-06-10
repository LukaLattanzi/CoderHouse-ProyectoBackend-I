# 🛒 API de Productos y Carritos

Servidor RESTful desarrollado en Node.js y Express para la gestión de productos y carritos de compra. La persistencia de datos se realiza en archivos JSON. Las pruebas de los endpoints se realizaron utilizando [Postman](https://www.postman.com/).

---

## 📂 Estructura del Proyecto

```
src/
├── app.js                 # Punto de entrada del servidor Express
├── managers/
│   ├── ProductManager.js  # Lógica para gestionar productos
│   └── CartManager.js     # Lógica para gestionar carritos
├── routes/
│   ├── products.router.js # Rutas para productos
│   └── carts.router.js    # Rutas para carritos
├── data/
│   ├── products.json      # Persistencia de productos
│   └── carts.json         # Persistencia de carritos
```

---

## 📄 Descripción de Archivos

- **app.js**: Configura y ejecuta el servidor Express, define middlewares y enruta las peticiones hacia `/api/products` y `/api/carts`.
- **managers/ProductManager.js**: Clase con métodos para agregar, obtener, actualizar y eliminar productos. Trabaja sobre `products.json`.
- **managers/CartManager.js**: Clase con métodos para crear carritos, obtenerlos y agregar productos a los mismos. Trabaja sobre `carts.json`.
- **routes/products.router.js**: Define las rutas HTTP para gestionar productos usando `ProductManager`.
- **routes/carts.router.js**: Define las rutas HTTP para gestionar carritos usando `CartManager`.
- **data/products.json**: Archivo donde se almacenan los productos.
- **data/carts.json**: Archivo donde se almacenan los carritos.

---

## ▶️ Instalación y Ejecución

1. Instalar dependencias:

   ```bash
   npm install
   ```

2. (Opcional) Instalar nodemon para recarga automática:

   ```bash
   npm install -g nodemon
   ```

3. Ejecutar el servidor:
   ```bash
   node src/app.js
   ```
   o con recarga automática:
   ```bash
   nodemon src/app.js
   ```

El servidor estará disponible en:  
`http://localhost:8080`

---

## 📘 Endpoints y Comandos REST

### Productos `/api/products`

- **GET `/api/products`**  
  Retorna todos los productos.

- **GET `/api/products/:pid`**  
  Retorna el producto con ID específico.

- **POST `/api/products`**  
   Crea un nuevo producto.  
   **Body JSON:**

  ```json
  {
    "title": "Gran Turismo 7",
    "description": "La última entrega del simulador de carreras más realista.",
    "price": 59.99,
    "code": "GT7",
    "status": true,
    "stock": 10,
    "category": "Videojuego",
    "thumbnails": ["images/gt7.jpg"]
  }
  ```

- **PUT `/api/products/:pid`**  
   Actualiza un producto por ID.  
   **Body JSON (ejemplo):**

  ```json
  {
    "price": 19.99,
    "stock": 15
  }
  ```

- **DELETE `/api/products/:pid`**  
  Elimina un producto por ID.

---

### Carritos `/api/carts`

- **POST `/api/carts`**  
  Crea un nuevo carrito.

- **GET `/api/carts/:cid`**  
  Obtiene todos los productos de un carrito.

- **POST `/api/carts/:cid/product/:pid`**  
  Agrega un producto al carrito. Si ya existe, incrementa su cantidad.  
  **Body JSON (opcional):**
  ```json
  {
    "quantity": 2
  }
  ```

---

## 🧪 Pruebas con Postman

Para probar los endpoints:

1. Abrí Postman.
2. Seleccioná el método (GET, POST, PUT, DELETE).
3. Escribí la URL correspondiente (por ejemplo, `http://localhost:8080/api/products`).
4. Si el endpoint lo requiere, agregá el body en formato JSON.
5. Hacé clic en **Send** y revisá la respuesta.

---

## 📚 Explicación del Código

- **app.js**:

  - Configura y ejecuta el servidor Express.
  - Usa middlewares para procesar `JSON` y `URL-encoded`.
  - Enruta las peticiones hacia `/api/products` y `/api/carts`.

- **ProductManager.js**:

  - `addProduct()`: Agrega productos nuevos con ID autoincremental.
  - `getProducts()`: Devuelve todos los productos.
  - `getProductById()`: Devuelve un producto por ID.
  - `updateProduct()`: Modifica un producto existente.
  - `deleteProduct()`: Elimina un producto.
  - Usa el módulo `fs.promises` para leer/escribir en `products.json`.

- **CartManager.js**:

  - `createCart()`: Crea un carrito vacío con ID autoincremental.
  - `getCartById()`: Devuelve un carrito con todos sus productos.
  - `addProductToCart()`: Agrega un producto o incrementa su cantidad en el carrito.

- **products.router.js**:

  - Define las rutas HTTP para gestionar productos usando `ProductManager`.

- **carts.router.js**:
  - Define las rutas HTTP para gestionar carritos usando `CartManager`.

---

## ℹ️ Notas

- Asegurate de que `products.json` y `carts.json` existan en la carpeta `data/`.
- Todos los IDs son autogenerados.
- La API no tiene frontend, se recomienda usar Postman o Thunder Client para pruebas.

---
