# Encargo: Proyecto-links. API para compartir enlaces.

    API para compartir enlaces web y votar los de otros usuarios.
    Sólo podrán registrarse y acceder. No hay contenido accesible públicamente.

# Configuración para iniciar la API

    Instalar o borrar base de datos:
    npm run deleteDb
    npm run initDb

# Rutas accesibles:

    USUARIOS:
    /register (post) para registrarse.
    /login (post) para loguearse.
    /profile (get) para ver los datos del usuario y sus links publicados.
    /profile (patch) para modificar los datos del usuario logueado.

    ENLACES:
    /links (post) para crear un link y compartirlo.
    /links/today (get) para ver los links publicados en el día.
    /links/previous (get) para ver los enlaces de días anteriores.
    /links/all (get) para ver todos los enlaces publicados.
    /links/:linkId (get) para ver un link concreto a través de su id.
    /links/:linkId (post) para votar un link.
    /links/:linkId (delete) para borrar un link.


    *Si te registras sin imagen se te asigna una imagen predeterminada.

    *Creadores: Guillermo Cerviño Porto, Ruth Villa Valeiro,
    Louis del Saz y Rosdany Guerra.
