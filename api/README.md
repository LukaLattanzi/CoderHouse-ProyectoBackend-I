# 📮 Postman Collection - Ecommerce CoderHouse

Esta carpeta contiene la colección de Postman para probar todos los endpoints de la API del proyecto E-Commerce Backend.

## 📁 Archivo Incluido

- **`Ecommerce-CoderHouse.postman_collection.json`**: Colección completa con todos los endpoints probados

## 🚀 Cómo Importar en Postman

### 1. Importar la Colección

1. Abre Postman
2. Haz clic en **"Import"** (botón en la esquina superior izquierda)
3. Selecciona **"Upload Files"** o arrastra el archivo
4. Navega hasta la carpeta `postman/` de este proyecto
5. Selecciona el archivo `Ecommerce-CoderHouse.postman_collection.json`
6. Haz clic en **"Import"**

## 📋 Endpoints Incluidos

### 🛍️ **Products**

- **GET | Products - ALL** - Obtener todos los productos
- **GET | Products - ID** - Obtener producto por ID (ejemplo: ID 9)
- **POST | Product - ADD NEW** - Crear nuevo producto con ejemplo de Gran Turismo 7
- **PUT | Product - MODIFY** - Actualizar producto (ejemplo: cambiar precio y stock)
- **DELETE | Products - ID** - Eliminar producto por ID

### 🛒 **Carts**

- **POST | Carts - CREATE CART** - Crear nuevo carrito vacío
- **GET | Carts - ID** - Obtener carrito por ID (ejemplo: ID 5)
- **POST | Carts - ADD PRODUCT QUANTITY** - Agregar producto al carrito con cantidad específica

## 🔧 Configuración

La colección está configurada para usar:

- **Base URL**: `http://localhost:8080`
- **Variables de ejemplo** ya configuradas en los endpoints:
  - Product ID: 9 (para GET by ID)
  - Product ID: 6 (para PUT)
  - Product ID: 25 (para DELETE)
  - Cart ID: 5 (para operaciones de carrito)
  - Product ID: 10 (para agregar al carrito)

## 📝 Ejemplos de Datos Incluidos

### Crear Producto (POST)

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

### Actualizar Producto (PUT)

```json
{
  "price": 19.99,
  "stock": 15
}
```

### Agregar Producto al Carrito (POST)

```json
{
  "quantity": 2
}
```

## ⚡ Flujo de Pruebas Recomendado

1. **Crear productos** usando `POST | Product - ADD NEW`
2. **Verificar productos** con `GET | Products - ALL`
3. **Obtener producto específico** con `GET | Products - ID`
4. **Crear carrito** usando `POST | Carts - CREATE CART`
5. **Agregar productos al carrito** usando `POST | Carts - ADD PRODUCT QUANTITY`
6. **Verificar carrito** con `GET | Carts - ID`
7. **Probar actualizaciones** con `PUT | Product - MODIFY`
8. **Probar eliminaciones** con `DELETE | Products - ID`

## 💡 Tips de Uso

- **IDs de ejemplo**: La colección incluye IDs de ejemplo que puedes cambiar según tus datos
- **Servidor activo**: Asegúrate de que el servidor esté ejecutándose en `http://localhost:8080`
- **Headers automáticos**: Los headers Content-Type están configurados automáticamente
- **Datos reales**: Los ejemplos incluyen datos reales que funcionan con tu API

## 🔄 Personalizar Variables

Para cambiar los IDs de ejemplo:

1. Selecciona cualquier request
2. Ve a la pestaña "Params" o "Path Variables"
3. Modifica los valores según necesites
4. Guarda el request si quieres mantener los cambios
