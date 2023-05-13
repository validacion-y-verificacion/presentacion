# Proyecto de biblioteca

Proyecto desarrollado por:
1. Javier Norambuena
2. Bastian Cornejo
3. Benjamin Cayo


## Intrucciones de instalacion:
Este proyecto tiene la parte del front end y del back end separadas, 
lo primero es clonar el repositorio y dentro de este levantar un entorno virtual.

Como requerimientos generales, se requiere una version de python 3.9.6, una version de npm 9.5.1 y una de pip 21.2.4


### Instalacion API y Backend
Dentro de la carpeta API se deben instalar las librerias que se indicar en el archivo "requirements.txt",
estas se instalar usando ```pip3 install -r requirements.txt```. La base de datos utiliza SQlite.

Luego para levantar la API, dentro de la misma carpeta, usar ```python3 main.py```.


### Instalacion de frontend
Para levantar el frontend, es necesario estar dentro de la carpeta frontend, dentro de esta instalar todos los paquetes definidos en el package.json, esto se logra usando ```npm install package.json```. Las dependencias mas importantes son bootstrap y wouter

Hecho esto, dentro de la misma carpeta usar el comando ```npm start``` para levantar la aplicación.

### Detalles importantes
La aplicación tiene dos tipos de usuario, un tipo bibliotecario y un tipo estudiante.

Credenciales bibliotecario:
1. Email: admin@gmail.com
2. Contraseña: 123

Credenciales estudiante:
1. Email: test2@gmail.com
2. Contraseña: 123

### Ejecución de test
Para ejecutar lo test, hay que estar dentro de la carpeta del frontend y luego ejecutar ```npm test```. No es necesario que la aplicacion este levantada para ejecutar los test.

