# TAMIC
[Sitio Web del Proyecto](https://apptamic.com/#/)

## TAMIC BACKEND

Esta respositorio es el backend de la aplicación web APP TAMIC, contiene la lógica del negocio y la conexión a la data.

### Variables de entorno

Se creo un archivo .env para definir las variables de entorno, de igual forma el archivo .env.prod para
las variables de entorno den producción. Cuando se instale producción se debe renombrar el archivo .env
como .env.dev y el archivo .env.prod por .env, ello antes de correr el comando npm install y levantar el
servicio.

### ¿Como iniciar el servidor?
En el archivo .env se encuentran las variables globales de configuración, si es en producción,
se debe renombrar el archivo ".env.prod" por ".env" y el archivo ".env" por ".env.dev".

para iniciar, usa el comando en la raiz:
> npm start

para instalar las dependencias
> npm install
