# 🏬 DATAMARK – MVP B2B SaaS Retail Analytics Platform

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Backend](https://img.shields.io/badge/backend-Node.js_+_Express-green)
![Database](https://img.shields.io/badge/database-PostgreSQL-blue)
![ORM](https://img.shields.io/badge/ORM-Prisma-black)
![Frontend](https://img.shields.io/badge/frontend-React_+_Vite-purple)
![Container](https://img.shields.io/badge/docker-enabled-blue)

---

## 📌 Índice

- [📙 Descripción del Proyecto](#-descripción-del-proyecto)
- [🌳 Problemática](#-problemática)
- [🎯 Objetivo del MVP](#-objetivo-del-mvp)
- [📋 Alcance Funcional](#-alcance-funcional)
- [🏗️ Arquitectura General](#️-arquitectura-general)
- [🧱 Arquitectura de Integración](#-arquitectura-de-integración)
- [🗄️ Modelo de Datos](#️-modelo-de-datos-erd-simplificado)
- [🔌 Contrato de API](#-contrato-de-api)
- [📊 Dashboard & KPIs](#-dashboard--kpis)
- [🛡️ Manejo de Errores](#️-manejo-de-errores)
- [🧪 Pruebas Realizadas](#-pruebas-realizadas)
- [🚀 Cómo Levantar el Entorno](#-cómo-levantar-el-entorno)
- [📂 Repositorio y Diagramas](#-repositorio-y-diagramas)
- [👨‍💻 Equipo](#-equipo)
- [📜 Licencia](#-licencia)

---

## 📙 Descripción del Proyecto

**DATAMARK** es una plataforma **B2B SaaS en etapa MVP** diseñada para pequeños negocios de **ropa y calzado en provincias del Perú**, cuyo objetivo es centralizar:

- Ventas
- Inventario
- Productos
- Métricas comerciales

El sistema permite reducir errores manuales, mejorar el control operativo y habilitar decisiones basadas en datos mediante dashboards intuitivos.

---

## 🌳 Problemática

Muchos negocios minoristas gestionan:

- Inventario en cuadernos o Excel desordenados
- Ventas sin trazabilidad
- Sin métricas de rentabilidad
- Sin control de stock bajo

Esto genera:

- Pérdidas económicas
- Errores humanos
- Decisiones sin respaldo analítico
- Falta de visibilidad del negocio

---

## 🎯 Objetivo del MVP

Desarrollar una solución web que permita:

- Registrar productos
- Registrar ventas con validación de stock
- Calcular KPIs automáticamente
- Visualizar métricas en un dashboard profesional
- Mantener arquitectura preparada para escalar a ML predictivo

---

## 📋 Alcance Funcional

### ✅ Implementado

- CRUD de productos
- Registro de ventas con integridad transaccional
- Validación automática de stock
- Cálculo de utilidad bruta
- KPIs agregados para dashboard
- Base de datos PostgreSQL dockerizada
- Arquitectura modular desacoplada
- Manejo de errores centralizado

### 🚧 Próximas Iteraciones

- Autenticación multi-tenant
- Microservicio de Machine Learning
- Predicción de ventas
- Recomendación de reposición de stock

---

## 🏗️ Arquitectura General

| Componente | Tecnología |
|------------|------------|
| Backend | Node.js + Express + TypeScript |
| ORM | Prisma |
| Base de Datos | PostgreSQL 15 (Docker) |
| Frontend | React + Vite |
| API | REST (JSON) |
| Contenerización | Docker + Docker Compose |

---

## 🧱 Arquitectura de Integración

La arquitectura implementa separación de responsabilidades:

```
Controller
    ↓
Service
    ↓
Repository (Prisma)
    ↓
PostgreSQL
```

### Principios Aplicados

- El Controller no contiene lógica de negocio
- El Service contiene lógica transaccional
- Prisma encapsula el acceso a datos
- Middleware global de errores
- Preparado para integrar microservicio ML vía HTTP

---

## 🗄️ Modelo de Datos (ERD Simplificado)

### Product

```json
{
  "id": "uuid",
  "storeId": "string",
  "name": "string",
  "sku": "string | null",
  "barcode": "string | null",
  "category": "string",
  "cost": "decimal",
  "price": "decimal",
  "stock": "int",
  "isActive": "boolean",
  "createdAt": "datetime",
  "updatedAt": "datetime"
}
```

### Sale

```json
{
  "id": "uuid",
  "productId": "uuid",
  "quantity": "int",
  "totalAmount": "decimal",
  "createdAt": "datetime"
}
```

---

## 🔌 Contrato de API

### Base URL (local)

```
http://localhost:3000
```

---

### 🟢 Health Check

#### GET `/health`

```json
{
  "status": "ok",
  "service": "datamark-backend",
  "timestamp": "2026-02-19T15:17:00.000Z"
}
```

---

### 📦 Productos

#### POST `/api/products`

```json
{
  "name": "Zapatilla Nike",
  "category": "Calzado",
  "cost": 40,
  "price": 80,
  "stock": 10
}
```

#### GET `/api/products`

Devuelve lista de productos activos.

---

### 💰 Ventas

#### POST `/api/sales`

```json
{
  "productId": "uuid",
  "quantity": 2
}
```

Validaciones:

- Stock suficiente
- Transacción atómica
- Descuento automático de inventario

---

### 📊 Dashboard

#### GET `/api/dashboard/summary`

```json
{
  "totalSalesAmount": 200,
  "totalSalesCount": 3,
  "todaySalesAmount": 200,
  "todaySalesCount": 3,
  "avgTicketToday": 66.66,
  "activeProducts": 1,
  "lowStockProducts": 1,
  "grossProfitToday": 200,
  "grossProfitTotal": 200,
  "topProductsToday": [
    {
      "productId": "uuid",
      "name": "Producto Test",
      "category": "Calzado",
      "qtySold": 4
    }
  ]
}
```

---

## 📊 Dashboard & KPIs

Indicadores implementados:

- Ventas totales
- Ventas del día
- Ticket promedio
- Productos activos
- Productos con bajo stock
- Utilidad bruta
- Top productos vendidos

Frontend desarrollado en React con:

- KPI Cards
- Gráficas con Recharts
- Layout moderno y modular

---

## 🛡️ Manejo de Errores

Middleware global:

- Errores controlados
- No exposición de stacktrace
- Respuestas estandarizadas

Ejemplo:

```json
{
  "status": "ERROR",
  "message": "Stock insuficiente"
}
```

---

## 🧪 Pruebas Realizadas

- Pruebas manuales con Thunder Client
- Validación de:
  - Creación de producto
  - Venta con stock suficiente
  - Venta con stock insuficiente
  - Cálculo correcto de KPIs
  - Health check

---

## 🚀 Cómo Levantar el Entorno

### Prerrequisitos

- Node.js 18+
- Docker
- PostgreSQL (si no se usa Docker)
- npm

---

### 1️⃣ Clonar Repositorio

```bash
git clone https://github.com/No-Country-simulation/S02-26-Equipo-43-Data-Science.git
cd S02-26-Equipo-43-Data-Science
```

---

### 2️⃣ Levantar Base de Datos

```bash
docker-compose up -d
```

---

### 3️⃣ Backend

```bash
cd backend
npm install
npx prisma generate
npx prisma migrate dev
npm run dev
```

Servidor disponible en:

```
http://localhost:3000
```

---

### 4️⃣ Frontend

```bash
cd frontend
npm install
npm run dev
```

Disponible en:

```
http://localhost:5173
```

---

## 📂 Repositorio y Diagramas

- **Repositorio del Proyecto:**  
  https://github.com/No-Country-simulation/S02-26-Equipo-43-Data-Science.git  

- **Diagrama de Arquitectura:**  
  https://github.com/No-Country-simulation/S02-26-Equipo-43-Data-Science/blob/main/docs/architecture.mmd  

- **Diagrama ERD:**  
  https://github.com/No-Country-simulation/S02-26-Equipo-43-Data-Science/blob/main/docs/erd.mmd  

---

## 👨‍💻 Equipo

| Rol | Área |
|------|------|
| Backend Developer | API REST + Prisma |
| Frontend Developer | React + Dashboard |
| Data Science (Iteración futura) | Modelo Predictivo |

---

## 📜 Licencia

Proyecto bajo licencia **MIT**.

---

# 🚀 DATAMARK

MVP B2B SaaS para retail inteligente basado en datos.
Preparado para evolucionar hacia analítica predictiva y arquitectura multi-tenant.
