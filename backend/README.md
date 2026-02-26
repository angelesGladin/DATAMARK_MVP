# DATAMARK – Documentación Técnica Backend

![Backend](https://img.shields.io/badge/backend-Node.js_+_Express-green)
![Language](https://img.shields.io/badge/language-TypeScript-blue)
![ORM](https://img.shields.io/badge/ORM-Prisma-black)
![DB](https://img.shields.io/badge/DB-PostgreSQL_15-blue)
![Docker](https://img.shields.io/badge/docker-enabled-blue)

---

## 📌 Índice

- [📙 Resumen Técnico](#-resumen-técnico)
- [🎯 Objetivo del Backend](#-objetivo-del-backend)
- [🏗️ Arquitectura](#️-arquitectura)
- [🧩 Estructura de Carpetas](#-estructura-de-carpetas)
- [🗄️ Persistencia y Prisma](#️-persistencia-y-prisma)
- [🔌 API Endpoints (MVP)](#-api-endpoints-mvp)
- [📊 KPIs y Dashboard](#-kpis-y-dashboard)
- [🛡️ Middlewares y Manejo de Errores](#️-middlewares-y-manejo-de-errores)
- [✅ Validaciones y Reglas de Negocio](#-validaciones-y-reglas-de-negocio)
- [🧪 Testing / Verificación Manual](#-testing--verificación-manual)
- [🔐 Variables de Entorno](#-variables-de-entorno)
- [🐳 Docker / Postgres](#-docker--postgres)
- [🚀 Ejecución Local](#-ejecución-local)
- [📂 Repositorio y Diagramas](#-repositorio-y-diagramas)
- [📜 Licencia](#-licencia)

---

## 📙 Resumen Técnico

Backend REST para DATAMARK (MVP B2B SaaS).

**Stack:**
- Node.js
- Express
- TypeScript
- Prisma ORM
- PostgreSQL 15
- Docker

---

## 🎯 Objetivo del Backend

- Gestionar productos e inventario
- Registrar ventas con integridad transaccional
- Exponer KPIs agregados
- Mantener arquitectura escalable y desacoplada

---

## 🏗️ Arquitectura

```
Routes
  ↓
Controllers
  ↓
Services
  ↓
Prisma ORM
  ↓
PostgreSQL
```

Principios:
- Separación de responsabilidades
- Controllers sin lógica de negocio
- Services con reglas y transacciones
- Manejo global de errores

---

## 🧩 Estructura de Carpetas

```
backend/
  src/
    app.ts
    server.ts
    routes/
    controllers/
    services/
    middlewares/
    prisma/
  prisma/
  docker-compose.yml
  .env
  package.json
```

---

## 🗄️ Persistencia y Prisma

- Models definidos en `schema.prisma`
- Migraciones con `prisma migrate`
- Cliente generado con `prisma generate`
- Transacciones para ventas + decremento de stock

---

## 🔌 API Endpoints (MVP)

### Base URL
```
http://localhost:3000
```

### GET /health

### POST /api/products

### GET /api/products

### POST /api/sales

### GET /api/dashboard/summary

---

## 📊 KPIs y Dashboard

Devuelve:

- totalSalesAmount
- totalSalesCount
- todaySalesAmount
- todaySalesCount
- avgTicketToday
- activeProducts
- lowStockProducts
- grossProfitToday
- grossProfitTotal
- topProductsToday[]

---

## 🛡️ Middlewares y Manejo de Errores

- notFoundMiddleware
- errorMiddleware

Formato estándar:

```json
{
  "status": "ERROR",
  "message": "Mensaje funcional"
}
```

---

## ✅ Validaciones y Reglas de Negocio

Productos:
- name requerido
- category requerida
- cost >= 0
- price >= 0
- stock >= 0

Ventas:
- quantity > 0
- stock suficiente
- transacción atómica

---

## 🧪 Testing / Verificación Manual

- Thunder Client
- Postman
- Validación de:
  - Creación de producto
  - Registro de venta
  - Error por stock insuficiente
  - KPIs correctos

---

## 🔐 Variables de Entorno

```env
PORT=3000
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/datamark"
CORS_ORIGIN="http://localhost:5173"
```

---

## 🐳 Docker / Postgres

```bash
docker-compose up -d
docker-compose down
```

---

## 🚀 Ejecución Local

```bash
cd backend
npm install
npx prisma generate
npx prisma migrate dev
npm run dev
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
