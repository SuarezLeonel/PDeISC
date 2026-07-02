# Proyecto 2 - Cliente de Consumo de API

Cliente web independiente que consume la API del Proyecto 1 para visualizar datos de alumnos en una interfaz elegante.

## 📋 Características
- Consumo de API REST con fetch
- Interfaz moderna en diseño full-width responsive
- Visualización de alumnos en tabla interactiva
- Contador estadístico de alumnos totales
- Botón de actualización manual
- Tema Claro/Oscuro con persistencia en localStorage
- Arquitectura modularizada

## 🛠️ Tecnologías
- **Node.js** (ES Modules)
- **Express.js** (para servir archivos estáticos)
- **HTML5/CSS3/JavaScript (Vanilla JS)**

## 📁 Estructura del Proyecto
```
proyecto2-cliente/
├── package.json          # Configuración del proyecto y dependencias
├── Server.js             # Servidor Express para archivos estáticos
├── Modules/
│   └── apiService.js     # Módulo de servicio para consumir la API
├── Pages/
│   └── index.html        # Interfaz de usuario
├── Scripts/
│   └── main.js           # Lógica del cliente (renderizado, tema)
└── Styles/
    └── global.css        # Estilos globales y variables CSS para temas
```

## 🚀 Instalación y Ejecución

### 1. Requisitos previos
- Node.js (v16 o superior)
- **Proyecto 1 (API) debe estar corriendo** en http://localhost:4000

### 2. Instalar dependencias
```bash
cd proyecto2-cliente
npm install
```

### 3. Ejecutar el servidor
```bash
npm start
```

El servidor se ejecutará en: **http://localhost:4001**

## 🔌 Módulo apiService.js
El servicio de API encapsula toda la lógica de comunicación con el backend:

```javascript
// Importar el servicio
import { fetchAlumnos } from '../Modules/apiService.js';

// Uso
const data = await fetchAlumnos();
// data = { success: true, data: [...] }
```

## 🎨 Uso de la Interfaz
1. Asegúrate de que el **Proyecto 1 (API)** esté corriendo en http://localhost:4000
2. Accede a http://localhost:4001
3. Verás automáticamente la lista de alumnos en la tabla
4. Haz clic en "🔄 Actualizar" para refrescar los datos
5. Usa el botón "🌙 Modo Oscuro" / "☀️ Modo Claro" para cambiar el tema

## 🔧 Configuración
- **Puerto:** 4001 (modificable en `Server.js`)
- **URL de la API:** http://localhost:4000/api/alumnos (modificable en `Modules/apiService.js`)

## 📊 Funcionalidades
- **Contador de alumnos:** Muestra el número total de registros
- **Tabla interactiva:** Muestra avatar, nombre completo, ID, nombre, apellido y edad
- **Manejo de errores:** Muestra mensajes amigables si no hay conexión con la API
- **Persistencia del tema:** El tema seleccionado se guarda en localStorage
