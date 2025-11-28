Seguridad en APIs – Conceptos Fundamentales

Este documento resume tres conceptos clave usados para proteger APIs modernas: Rate-Limit, CORS y JWT. Cada explicación está escrita de forma sencilla, con ejemplos reales donde se aplican.

## 1. Rate-Limit

¿Qué es?

El rate-limit es una técnica que controla cuántas solicitudes puede hacer un usuario o una IP a un servidor dentro de un tiempo determinado.
Básicamente, es ponerle un “límite de velocidad” al consumo de la API.

¿Para qué sirve?

Evita ataques como fuerza bruta o flooding.

Impide que un usuario abuse del sistema enviando miles de peticiones por segundo.

Mantiene estable la API y evita que se caiga por exceso de carga.

Ejemplo real

Imagina un login.
Sin rate-limit, alguien podría intentar millones de combinaciones de clave por minuto.
Con rate-limit, el servidor podría permitir solo 5 intentos cada minuto por IP.
Así se bloquea automáticamente cualquier comportamiento sospechoso.

## 2. CORS (Cross-Origin Resource Sharing)

¿Qué problema resuelve?

Cuando un navegador intenta pedir datos desde un dominio diferente al que está cargando la página (por ejemplo, frontend en http://localhost:5173 y backend en http://localhost:3000), por seguridad el navegador bloquea la petición.

CORS es el mecanismo que permite decirle al navegador:

“Sí, este frontend tiene permiso para consumir esta API”.

¿Por qué existe?

Para evitar que sitios maliciosos intenten consumir APIs sin permiso del usuario.

Ejemplo real

Un frontend hecho en React llama a una API Node.js que está en otro puerto.
Sin configurar CORS, el navegador no deja hacer la solicitud.
Con CORS habilitado, puedes definir:

qué dominios pueden acceder,

qué métodos son permitidos,

si se permiten cookies, etc.

## 3. JWT (JSON Web Token)

¿Qué es un token?

Un token es un “pase digital” que representa a un usuario ya autenticado.
El servidor lo genera y el cliente lo envía en cada petición para probar quién es.

¿Qué contiene un JWT?

Un JWT tiene tres partes codificadas en base64:

Header → Tipo de token y algoritmo de firma

Payload → Datos del usuario (id, rol, email, expiración)

Signature → Une todo y garantiza que no fue alterado

Los datos del payload no van cifrados, solo codificados.
Lo que realmente da seguridad es la firma, que solo el servidor conoce.

¿Para qué sirve?

Para mantener sesiones sin necesidad de guardar información en el servidor.

Para autorizar rutas protegidas, por ejemplo /profile o /admin.

Ejemplo real

Un usuario hace login → La API genera un JWT → El frontend lo guarda (normalmente en localStorage o cookies).
Luego, para acceder a /tasks, el usuario envía el token en el header:

Authorization: Bearer <token>

El servidor revisa:

si el token es válido,

si no está expirado,

y si pertenece a un usuario real.

Si todo está bien, permite el acceso.

## Cómo implementamos JWT en este proyecto

Para este proyecto utilizamos JWT para manejar la autenticación de los usuarios después del login.
El flujo implementado es el siguiente:

El usuario envía correo y contraseña a POST /auth/login.

Verificamos que el usuario exista en la base de datos.

Comparamos la contraseña enviada con la que está almacenada usando bcrypt.

Si las credenciales son correctas, generamos un JWT usando jsonwebtoken.

En el payload incluimos:

sub: que representa el ID del usuario autenticado.

En las opciones definimos una expiración (expiresIn: "1h").

El token se firma usando la variable JWT_SECRET definida en el archivo .env.

El frontend deberá enviar este token en cada petición a rutas protegidas (más adelante en el proyecto).

Este mecanismo nos permite tener sesiones sin almacenar información en memoria del servidor, haciendo el sistema más escalable y seguro.


## ¿por qué usar Passport si ya teníamos middleware?

### Por qué mantener el middleware propio

Es más simple y fácil de entender para principiantes.

Se controla manualmente el JWT (más educativo).

### Por qué agregar Passport

Passport:

Estándar industrial para autenticación.

Facilita agregar nuevas estrategias:

Google OAuth

GitHub OAuth

Facebook

Local strategy

Maneja automáticamente:

Validación del token

Manejo de errores

Adjuntar req.user

Hace tu proyecto más escalable y profesional.