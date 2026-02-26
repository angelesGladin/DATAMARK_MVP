# DATAMARK – Documentación Técnica Frontend

![Frontend](https://img.shields.io/badge/frontend-React_+_Vite-purple)
![Language](https://img.shields.io/badge/language-TypeScript-blue)
![Charts](https://img.shields.io/badge/charts-Recharts-orange)

---

## 📌 Índice

- [📙 Resumen Técnico](#-resumen-técnico)
- [🎯 Objetivo del Frontend](#-objetivo-del-frontend)
- [🏗️ Arquitectura de UI](#️-arquitectura-de-ui)
- [🧩 Estructura de Carpetas](#-estructura-de-carpetas)
- [🔌 Capa de API](#-capa-de-api)
- [📄 Páginas Principales](#-páginas-principales)
- [📊 Dashboard](#-dashboard)
- [💰 Registro de Ventas](#-registro-de-ventas)
- [📦 Gestión de Productos](#-gestión-de-productos)
- [🎨 Estilos y UX](#-estilos-y-ux)
- [✅ Estados de UI](#-estados-de-ui)
- [🧪 Verificación Manual](#-verificación-manual)
- [🔧 Variables de Entorno](#-variables-de-entorno)
- [🚀 Ejecución Local](#-ejecución-local)
- [📂 Repositorio y Diagramas](#-repositorio-y-diagramas)
- [📜 Licencia](#-licencia)

---

## 📙 Resumen Técnico

Frontend web para DATAMARK (MVP).

Stack:
- React
- Vite
- TypeScript
- Recharts
- CSS modular

---

## 🎯 Objetivo del Frontend

- Operación diaria del negocio
- Visualización clara de KPIs
- Interfaz intuitiva para usuario no técnico
- Código modular y escalable

---

## 🏗️ Arquitectura de UI

```
Pages
  ↓
Components
  ↓
API Layer
  ↓
Backend REST
```

---

## 🧩 Estructura de Carpetas

```
frontend/
  src/
    api/
    components/
    pages/
    styles/
    types/
    App.tsx
    main.tsx
```

---

## 🔌 Capa de API

Archivos:
- products.api.ts
- sales.api.ts
- dashboard.api.ts

Funciones típicas:
- getProducts()
- createSale()
- getDashboardSummary()

---

## 📄 Páginas Principales

DashboardPage
SalesPage
ProductsPage

---

## 📊 Dashboard

- KPI Cards
- Gráficas con Recharts
- Categorías dinámicas basadas en datos
- Visualización de ventas y utilidades

---

## 💰 Registro de Ventas

Flujo:
1. Cargar productos
2. Seleccionar producto
3. Definir cantidad
4. Enviar venta
5. Mostrar feedback

Estados:
- idle
- loading
- success
- error

---

## 📦 Gestión de Productos

- Crear producto
- Listar productos
- Validaciones básicas
- Feedback visual

---

## 🎨 Estilos y UX

- Layout consistente
- Cards con sombras suaves
- Bordes redondeados
- Estados vacíos claros
- Mensajes de error controlados

Archivos:
- dashboard.css
- sales-page.css
- products-page.css

---

## ✅ Estados de UI

Tipo recomendado:

```ts
type UiState = "idle" | "loading" | "success" | "error";
```

---

## 🧪 Verificación Manual

- Crear producto
- Registrar venta
- Ver cambios en dashboard
- Probar errores de stock
- Probar backend apagado

---

## 🔧 Variables de Entorno

```env
VITE_API_BASE_URL="http://localhost:3000"
```

---

## 🚀 Ejecución Local

```bash
cd frontend
npm install
npm run dev
```

Frontend:
```
http://localhost:5173
```

---

## 📂 Repositorio y Diagramas

Repositorio:
https://github.com/No-Country-simulation/S02-26-Equipo-43-Data-Science.git

Arquitectura:
https://github.com/No-Country-simulation/S02-26-Equipo-43-Data-Science/blob/main/docs/architecture.mmd

ERD:
https://github.com/No-Country-simulation/S02-26-Equipo-43-Data-Science/blob/main/docs/erd.mmd

---

## 📜 Licencia

MIT
