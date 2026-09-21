# 🍔 Sistema Web de Gestión de Pedidos de Comida Local

## 📌 Descripción

Este proyecto consiste en un sistema web para gestionar pedidos de comida local de manera sencilla e intuitiva.

El sistema permite a los clientes visualizar los productos disponibles, buscar alimentos, filtrarlos por categorías, agregarlos a un carrito y realizar un pedido indicando sus datos, dirección de entrega y método de pago.

El proyecto está desarrollado utilizando tecnologías web básicas:

- HTML5
- CSS3
- JavaScript
- LocalStorage

## 🎯 Objetivo

Desarrollar una aplicación web que permita gestionar pedidos de comida local mediante una interfaz amigable y adaptable a diferentes dispositivos.

## ✨ Funcionalidades

### 👨‍🍳 Catálogo de productos

El sistema muestra diferentes productos disponibles para realizar pedidos, incluyendo:

- Hamburguesas
- Pollo
- Pizza
- Bebidas

Cada producto contiene información como:

- Nombre
- Descripción
- Precio
- Categoría
- Imagen

### 🔎 Búsqueda de productos

Permite buscar productos por su nombre o descripción.

### 📂 Filtrado por categorías

Los productos pueden filtrarse según su categoría:

- Todos
- Hamburguesas
- Pollo
- Pizza
- Bebidas

### 🛒 Carrito de compras

El usuario puede:

- Agregar productos al carrito.
- Aumentar la cantidad.
- Disminuir la cantidad.
- Eliminar productos.
- Visualizar el subtotal.
- Visualizar el costo de envío.
- Consultar el total del pedido.

### 📦 Registro del pedido

Para realizar un pedido se solicitan datos del cliente como:

- Nombre
- Teléfono
- Dirección de entrega
- Método de pago

El sistema calcula automáticamente el monto total del pedido.

### 💾 Almacenamiento

Los productos del carrito y los pedidos se almacenan utilizando `localStorage`, permitiendo conservar la información aunque se actualice la página.

### 📱 Diseño responsive

La interfaz está diseñada para adaptarse a diferentes tamaños de pantalla:

- Computadoras
- Tablets
- Teléfonos móviles

## 🗂️ Estructura del proyecto

```text
sistema-pedidos/
│
├── index.html
├── styles.css
├── script.js
└── README.md
