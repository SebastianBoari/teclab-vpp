# VPP Teclab

Proyecto desarrollado con **React**, **Vite**, **JavaScript**, **pnpm** y **Supabase**.

El proyecto está preparado para trabajar con dos entornos de desarrollo:

- **Local Dev**: usa Supabase Local con Docker.
- **Cloud Dev**: usa el proyecto actual de Supabase Cloud.

---

## Requisitos

Antes de comenzar, asegurarse de tener instalado:

- Node.js
- pnpm
- Docker Desktop
- Supabase CLI

---

## Instalación

```bash
pnpm install
```

---

## Entornos disponibles

### Local Dev

Usa Supabase corriendo localmente con Docker.

```bash
pnpm dev:local
```

Supabase usado por la app:

```text
http://127.0.0.1:54321
```

---

### Cloud Dev

Usa el proyecto de Supabase Cloud de desarrollo.

```bash
pnpm dev:cloud
```

Supabase usado por la app:

```text
https://qqrshphfjtfldvshbjgn.supabase.co
```

---

## Variables de entorno

### Local Dev

Crear un archivo en la raíz del proyecto:

```text
.env.localdev
```

Contenido:

```env
VITE_SUPABASE_URL=http://127.0.0.1:54321
VITE_SUPABASE_ANON_KEY=PEGAR_PUBLISHABLE_KEY_LOCAL
```

La `VITE_SUPABASE_ANON_KEY` local se obtiene ejecutando:

```bash
pnpm db:status
```

Buscar la línea:

```text
Publishable
```

---

### Cloud Dev

Crear un archivo en la raíz del proyecto:

```text
.env.clouddev
```

Contenido:

```env
VITE_SUPABASE_URL=https://qqrshphfjtfldvshbjgn.supabase.co
VITE_SUPABASE_ANON_KEY=PEGAR_ANON_KEY_DE_SUPABASE_CLOUD
```

---

## Supabase Local

Para trabajar sin depender de Supabase Cloud, el proyecto incluye una configuración completa de Supabase Local.

Incluye:

- migración inicial de la base;
- datos de prueba;
- script para crear usuario admin local;
- comandos para resetear y reconstruir el entorno.

---

## Iniciar Supabase Local

Primero abrir **Docker Desktop**.

Luego ejecutar:

```bash
pnpm db:start
```

Ver estado de Supabase Local:

```bash
pnpm db:status
```

Supabase Studio local queda disponible en:

```text
http://127.0.0.1:54323
```

---

## Recrear la base local desde cero

```bash
pnpm db:reset-local
```

Este comando hace:

1. Resetea la base local.
2. Aplica las migraciones.
3. Carga datos de prueba.
4. Crea o actualiza el usuario admin local.

---

## Usuario admin local

```text
Email: admin@local.test
Password: admin123456
```

---

## Configuración del script de admin local

Crear este archivo:

```text
supabase/.env.local
```

Contenido:

```env
SUPABASE_URL=http://127.0.0.1:54321
SUPABASE_SERVICE_ROLE_KEY=PEGAR_SECRET_KEY_LOCAL
LOCAL_ADMIN_EMAIL=admin@local.test
LOCAL_ADMIN_PASSWORD=admin123456
```

La `SUPABASE_SERVICE_ROLE_KEY` local se obtiene con:

```bash
pnpm db:status
```

Buscar la línea:

```text
Secret
```

> Este archivo no debe subirse a Git.

---

## Scripts disponibles

### App

```bash
pnpm dev
```

Levanta Vite usando el modo por defecto.

```bash
pnpm dev:local
```

Levanta la app usando Supabase Local.

```bash
pnpm dev:cloud
```

Levanta la app usando Supabase Cloud Dev.

```bash
pnpm build
```

Genera el build de producción.

```bash
pnpm preview
```

Previsualiza el build.

```bash
pnpm lint
```

Ejecuta ESLint.

---

### Supabase

```bash
pnpm db:start
```

Inicia Supabase Local.

```bash
pnpm db:stop
```

Detiene Supabase Local.

```bash
pnpm db:status
```

Muestra URLs, puertos y keys locales.

```bash
pnpm db:reset
```

Resetea la base local usando migraciones y seed.

```bash
pnpm db:create-admin
```

Crea o actualiza el usuario admin local.

```bash
pnpm db:reset-local
```

Resetea la base local y luego crea el usuario admin.

```bash
pnpm db:pull:schema
```

Exporta el esquema remoto de Supabase Cloud a:

```text
supabase/schema.sql
```

```bash
pnpm db:pull:data
```

Exporta los datos del schema `public` remoto a:

```text
supabase/seed.sql
```

---

## Flujo diario recomendado

### Trabajar con Supabase Local

```bash
pnpm db:start
pnpm dev:local
```

Si se quiere reconstruir todo desde cero:

```bash
pnpm db:reset-local
pnpm dev:local
```

---

### Trabajar con Supabase Cloud Dev

```bash
pnpm dev:cloud
```

---

## Estructura relacionada con Supabase

```text
supabase/
├── config.toml
├── seed.sql
├── migrations/
│   └── 20260708_000001_initial_schema.sql
└── scripts/
    └── create-local-admin.mjs
```

---

## Archivos ignorados

Los siguientes archivos no deben subirse a Git:

```text
.env
.env.development
.env.localdev
.env.clouddev
.env.production
.env.production.local
.env.development.local
supabase/.env.local
supabase/.temp/
supabase/.branches/
supabase/schema.sql
```

---

## Notas importantes

- `local dev` es el entorno recomendado para desarrollar sin depender de internet o Supabase Cloud.
- `cloud dev` usa el proyecto actual de Supabase Cloud.
- Más adelante puede agregarse un entorno `production` separado.
- Los cambios futuros de base de datos deberían hacerse mediante migraciones.
