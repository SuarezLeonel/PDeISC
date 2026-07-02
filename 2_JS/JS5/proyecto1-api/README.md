# Proyecto 1 - API de Registro de Alumnos

API REST desarrollada con Node.js y Express para gestionar registros de alumnos con base de datos MySQL.

## 📋 Características
- API REST con endpoints GET y POST
- Conexión a MySQL usando Pool de conexiones
- Validación de datos en frontend y backend
- Interfaz web moderna con diseño full-width responsive
- Tema Claro/Oscuro con persistencia en localStorage
- Visualización de alumnos en tarjetas con avatares

## 🛠️ Tecnologías
- **Node.js** (ES Modules)
- **Express.js**
- **MySQL2**
- **CORS**
- **HTML5/CSS3/JavaScript (Vanilla JS)**

## 📁 Estructura del Proyecto
```
proyecto1-api/
├── package.json          # Configuración del proyecto y dependencias
├── Server.js             # Servidor Express y rutas API
├── Modules/
│   └── database.js       # Módulo de conexión y operaciones con MySQL
├── Pages/
│   └── index.html        # Interfaz de usuario
├── Scripts/
│   └── main.js           # Lógica del cliente (formulario, tema, fetch)
└── Styles/
    └── global.css        # Estilos globales y variables CSS para temas
```

## 🚀 Instalación y Ejecución

### 1. Requisitos previos
- Node.js (v16 o superior)
- MySQL server corriendo localmente

### 2. Configurar la base de datos
Ejecuta estos comandos en tu cliente MySQL:
```sql
CREATE DATABASE IF NOT EXISTS alumnosDB;
USE alumnosDB;
CREATE TABLE IF NOT EXISTS alumnos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(255) NOT NULL,
  apellido VARCHAR(255) NOT NULL,
  edad INT NOT NULL
);
```

### 3. Instalar dependencias
```bash
cd proyecto1-api
npm install
```

### 4. Ejecutar el servidor
```bash
npm start
```

El servidor se ejecutará en: **http://localhost:4000**

## 🔌 Endpoints de la API

### GET `/api/alumnos`
Obtiene la lista de todos los alumnos.

**Respuesta exitosa (200):**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "nombre": "Juan",
      "apellido": "Pérez",
      "edad": 20
    }
  ]
}
```

### POST `/api/alumnos`
Crea un nuevo alumno.

**Cuerpo de la solicitud:**
```json
{
  "nombre": "María",
  "apellido": "González",
  "edad": 22
}
```

**Respuesta exitosa (201):**
```json
{
  "success": true,
  "data": {
    "id": 2,
    "nombre": "María",
    "apellido": "González",
    "edad": 22
  }
}
```

**Validaciones del backend:**
- Todos los campos son obligatorios
- La edad debe ser un entero positivo

## 🎨 Uso de la Interfaz
1. Accede a http://localhost:4000
2. Completa el formulario con los datos del alumno
3. Haz clic en "Registrar Alumno"
4. Verás la lista de alumnos en tarjetas debajo del formulario
5. Usa el botón "🌙 Modo Oscuro" / "☀️ Modo Claro" para cambiar el tema

## 🔧 Configuración
- **Puerto:** 4000 (modificable en `Server.js`)
- **Credenciales MySQL:** Configuradas en `Modules/database.js`
  - Host: localhost
  - Usuario: root
  - Contraseña: RXAE3t65hspbjdh
  - Base de datos: alumnosDB
