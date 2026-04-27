Buenas a todos, me llamo Felix Vásquez,
Esta es una plantilla básica para un proyecto en el cual lo que necesitaremos será un Login
Con credenciales de Prueba: **usuario: "admin123" - password: "123"**

- Para la creación desde 0 se creo una carpeta "proyecto" y se crearon las carpetas "backend" y "frontend".

Para el BackEnd se instaló lo siguiente: 
========================================
npm init -y
npm install express mssql dotenv cors jsonwebtoken bcryptjs nodemailer multer express-rate-limit axios
npm install -D nodemon

Y Para ejecutarl el BackEnd lanzamos lo siguiente: 
=====================================================
npm install
- modificamos el archivo .env.template a -> .env
- Crear archivo `.env` basado en `.env.template`
- Para ejecutar es:
  node src/index.js

Para el FrontEnd se instaló lo siguiente: 
========================================
npm create vite@latest . -- --template react
npm install axios react-router-dom @marsidev/react-turnstile react-toastify

Y Para ejecutarl el FrontEnd lanzamos lo siguiente: 
=====================================================
npm install
- Crear archivo `.env` basado en `.env.template`
- Para ejecutar es:
  npm run dev

Especificaciones:
=================

BACKEND:
========
-Express: Framework principal para crear el servidor y gestionar las rutas (endpoints).

-MSSQL: Driver oficial para conectar Node.js con bases de datos Microsoft SQL Server.

-JSONWebToken (JWT): Estándar para crear tokens de acceso seguros. Permite que el servidor "recuerde" al usuario sin pedir la contraseña en cada clic.

-Bcryptjs: Librería para encriptar contraseñas. Nunca guardamos contraseñas en texto plano, solo sus "hashes" seguros.

-Dotenv: Gestión de variables de entorno. Mantiene las credenciales fuera del código fuente.
-CORS: Middleware de seguridad que permite (o restringe) que tu Frontend se comunique con tu Backend desde diferentes dominios o IPs.

-Nodemailer: Motor para el envío de correos electrónicos (notificaciones, recuperaciones, etc.).
-Express-Rate-Limit: Protección básica contra ataques de fuerza bruta, limitando cuántas peticiones puede hacer una misma IP en un tiempo determinado.

-Helmet (Opcional): Ayuda a proteger la app configurando varios encabezados HTTP de seguridad, ocultando que usamos Express para evitar ataques dirigidos.

FRONTEND:
=========
-Vite: Herramienta de construcción (build tool) ultra rápida que reemplaza a create-react-app. Mejora mucho la velocidad al programar.

-Axios (API): Cliente HTTP para hacer peticiones al backend. Lo usamos porque es más robusto y fácil de configurar que el fetch nativo.

-React Router Dom: Gestiona la navegación de la app (cambio de páginas) sin que el navegador tenga que recargar toda la web.

-@marsidev/react-turnstile: Integración oficial para el captcha de Cloudflare. Bloquea bots en el formulario de login.

-React Toastify: Sistema de notificaciones elegante ("toasts"). Avisa visualmente si el login fue exitoso o si hubo un error.

-Swiper (Opcional): La librería más moderna para crear sliders, carruseles o galerías táctiles y responsivas.

-XLSX (Opcional): Permite leer y exportar datos a archivos Excel directamente desde el navegador.
