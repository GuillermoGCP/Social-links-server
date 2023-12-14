## Encargo: Proyecto-links. API para compartir enlaces.

Implementar una API que permita a los usuarios registrarse y compartir enlaces web que consideren interesantes. Otros usuarios podrán votarlos si les gustan.

USUARIOS ANÓNIMOS
Sólo podrán registrarse y acceder. No hay contenido accesible públicamente.
-Login (email, password)
-Registro (nombre, email, password)

USUARIOS REGISTRADOS
-Ver los enlaces publicados en el día de hoy y en días anteriores
-Publicar nuevo enlace - URL - Título - Descripción
-Borrar un enlace publicado por el usuario
-Votar un enlace de otro usuario
-Editar perfil de usuario: (nombre, email, password)
-Opcional:
-Edición avanzada del perfil de usuario (biografía, foto)

# Requisitos para funcionamiento de la API

    -Node.js
    -MySql
    -npm

# Configuración para iniciar la API

> Clonar repositorio disponible: git clone dirección SSH
> Iniciar proyecto para cargar dependencias con: npm i
> Crear archivo .env y cubrir las variables de entorno a partir del archivo .env.example
> Iniciar la base de datos desde el script bd: npm run db
> Iniciar la aplicacion desde el script start: npm test

# Contenido de la Base de Datos

> Tabla users con los campos:

    - id
    - name
    - email
    - password

> Tabla links con los campos

    - id
    - url
    - title
    - description
    - owerId (relación con el usuario que creo el link)

> Tabla userLink

    -id
    -userId (relacion con el usuario)
    -linkId (relacion con el link)
    -rate (votaciones a los links)

# Funcionalidades / Peticiones

> > POST/register (permite a un usuario registrarse, con name, email y password)

     -Validar que ingresa name, email y password, segun condiciones de tipo y longitud de caracteres
     -Validar que el mail no existe ya en la base de datos, si existe error, sino existe crear al usuario.

> > POST/login (permite acceder a los usuarios previamente registrados con email y password)

     -Validar que el usuario existe y sus credenciales
     -Adjudicar token de validacion para resto de acciones en la pagina

> > PUT/users/:id (Actualizar datos del perfil de usuario (id, name, email, password))

    -Validar el usuario con su token
    -Solo el propio usuario puede acceder a la modificacion.
    -Validar que envia al menos uno de los datos en el body de la peticion de cambio, si no hay campos lanzar error, si hay campo actualiza el registro de usuario y responde con los datos actualizados

> > POST/links (Crear un link)

    -Validar el usuario con su token
    -Los siguientes datos requeridos en el body de la petición(url,title,description)
    -Si falta algun dato se lanza error,sino se responde con los datos creados

> > POST/link/:id/rate (votar un link)

    -Validar el usuario con su token
    -Dato requerido en el body de la peticion (i del link y votacion del 1 al 10)
    -Un usuario no puede votar a su propio link, lanzar error
    -Lanzar error si no hay votacion, o responder con ok si votacion correcta

> > DELETE/link/:id (eliminar link)

    -Validar el usuario con su token
    -Validar que el link existe y ese usuario creo el link
    -Eliminar el link con el id solicitado y responder que se ha eliminado o lanzar errores si no se contrasta algo.

> > GET/links (consultar el listado de links existentes)

    -Validar el usuario con su token
    -Error si no hay links

> > GET/links/:id (consultar el link con id solicitado)

    -Validar el usuario con su token
    -Error si no existe el link

> > GET/links/:id (filter) (consultar el link con id solicitado con filtro de fecha de creacion)

    -Validar el usuario con su token
    -Añadir filtro por fecha de creacion del link
    -Error si no existen links en las fechas del filtro

# Otras gestiones

> Middleware de errores(gestiona errores de la aplicación)
> Gestor de rutas, si se hace una peticion a una ruta no existente, error de que no se encontro.
> Escuchador del puerto

\*Si te registras sin imagen se te asigna una imagen predeterminada, guardada en la carpeta uploads.
Script para borrar y arrancar la base de datos:
npm run initDb, npm run deleteDb
