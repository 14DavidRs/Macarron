# Proyecto API de Tareas (Express + Prisma + JWT)

API REST creada con Express, Prisma, JWT, Passport, CORS y Rate-Limit. Incluye registro, login y CRUD de tareas por usuario.

## Instalación

1. Clonar el repositorio
   git clone https://github.com/14DavidRs/Macarron.git
   cd Macarron/

2. Instalar dependencias
   npm install

## Variables de entorno

Crea un archivo .env con:

DATABASE_URL="tu_url_de_base_de_datos"
JWT_SECRET="tu_clave_secreta"

El archivo .env real no se sube. El repo incluye .env.example solo de referencia.

## Prisma y migraciones

Inicializar Prisma (si no existe):

npx prisma init

Ejecutar migraciones:

npx prisma migrate dev --name init

Generar cliente:

npx prisma generate

## Ejecutar el servidor

npm run dev

Servidor en:

http://localhost:3000/

## Resumen de la seguridad

Registro

El usuario envía email y contraseña.
La contraseña se encripta con bcrypt y se guarda en BD.

Login

Se verifica el email y la contraseña.
Si es correcto, se genera un JWT con sub = userId.

Uso del token

Para acceder a /tasks, el cliente debe enviar:

Authorization: Bearer <token>

Passport valida el token y coloca el usuario en req.user.

## Dónde está cada mecanismo

CORS

Configurado en app.js.
Protege el backend permitiendo peticiones solo desde el frontend.

Rate-Limit

También en app.js.
Limita intentos en /auth (por ejemplo 5 intentos/minuto).

Passport JWT

Configurado en:

src/config/passport.js

Se usa en rutas como /tasks para protegerlas.
