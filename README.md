# Encargo: Proyecto-links. API para compartir enlaces.

    API creada con Node.js para compartir enlaces web y votar los de otros usuarios.
    Los usuarios solo podrán registrarse y acceder. No hay contenido accesible públicamente.

# Configuración para iniciar la API

    Instalar o borrar base de datos:
    npm run deleteDb
    npm run initDb
    Para recibir correos electrónicos instalar Ethereal Email

# Rutas accesibles:

    USUARIOS:
    /register (post) para registrarse.
        name, email, password
    /login (post) para loguearse.
        email, password
    /profile (get) para ver los datos del usuario y sus links publicados.
    /profile (patch) para modificar los datos del usuario logueado.
        name, email, password, profilePicture (file, opcional) y biography (opcional)

    ENLACES:
    /links (post) para crear un link y compartirlo.
        url, title, description.

    /links para ver todos los links publicados, accesibles con los
    query params siguientes: /links?today=true para ver los publicados
    en el mismo día; /links?previous=true para ver los anteriores.

    /links/:linkId (get) para ver un link concreto a través de su id.
    /links/:linkId (post) para votar un link.
        rating
    /links/:linkId (delete) para borrar un link.

    Comentarios:
    /comments (post) para crear un comentario.
    comment.

    /comments/response (post) para responder a los comentarios
    comment.
    /comments/:linkId (get) para traer los comentarios de un link


    *Creadores: Guillermo Cerviño Porto, Ruth Villa Valeiro,
    Louis del Saz y Rosdany Guerra.
