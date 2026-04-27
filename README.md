Esta es una plantilla básica para un proyecto en el cual lo que necesitaremos será un Login
Con credenciales de Prueba: **usuario: "admin123" - password: "123"**

Para el BackEnd se instaló lo siguiente: 
========================================
npm init -y
npm install express mssql dotenv cors jsonwebtoken bcryptjs nodemailer multer express-rate-limit axios
npm install -D nodemon

Y Para ejecutarlo al descargar lanzamos lo siguiente: 
=====================================================
npm init -y
- modificamos el archivo .env.template a -> .env
- Luego creamos un archivo .gitignore en la raiz del backend y colocamos:
  # .gitignore
  node_modules/
  .env

Para el FrontEnd se instaló lo siguiente: 
========================================
