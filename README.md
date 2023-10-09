# Bases de datos

Para hacer las migraciones correspondientes y además utilizar los seeders primero es muy importante cambiar los siguientes parametros en **config/config.json**

```bash
{
  "development": {
    "username": "root",
    "password": "Contraseña hecha por ustedes",
    "database": "proyecto-estacionamiento",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
```

Finalmente en la consola ejecutan estos tres comandos:

```bash
    npm install
    sequelize db:create //Crea el schema de la base de datos
    sequelize db:migrate //Migra las tablas a la base de datos
    sequelize db:seed:all //Migra los datos a la base de datos
```

Con eso, tienen la base de datos en MySQL con los datos de prueba.
