## Introducción

Antes de realizar cualquier cosa, se debe tener instalado [NodeJS 18.18.0](https://nodejs.org/es) y [MySQL Workbench 8.1.0](https://dev.mysql.com/downloads/mysql/) en el equipo. Además de tener instalado el CLI de sequelize.
Para esto, se deben ejecutar los siguientes comandos en la consola:

```bash
    npm install -g sequelize-cli
    npm install
```

# Bases de datos

Para hacer las migraciones correspondientes y además utilizar los seeders, se debe modificar el nombre del archivo **.env.example** a **.env**. Luego se debe modificar el apartado de la contraseña.

```bash
DB_HOST=localhost
DB_DATABASE=test-express  //nombre de su db creada con workbech [rey]
DB_USER=root
DB_PASSWORD= //Aqui va la contraseña de su base de datos
```

Finalmente en la consola ejecutan estos tres comandos:

```bash
    sequelize db:create
    sequelize db:migrate
    sequelize db:seed:all
```

Con eso, tienen la base de datos en MySQL con los datos de prueba.

# Ejecutar el proyecto

Para ejecutar el proyecto deben utilizar el siguiente comando.

```bash
    npm run dev
```
 
 falta nodemon [rey]

 npm install nodemon --save-dev
