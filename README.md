# Tripleten web_project_around_es

## Descripción del Proyecto

Around The U.S. es una aplicación web interactiva que permite a los usuarios compartir y gestionar fotografías de lugares interesantes alrededor de Estados Unidos. Los usuarios pueden personalizar su perfil, agregar nuevas tarjetas con imágenes de lugares, dar "me gusta" a las tarjetas y eliminar las que deseen.

La aplicación presenta una interfaz intuitiva y responsiva que se adapta a diferentes tamaños de pantalla, ofreciendo una experiencia de usuario óptima tanto en dispositivos móviles como en escritorio.

## Demo en vivo

[https://danielpzcz.github.io/web_project_around_es/](https://danielpzcz.github.io/web_project_around_es/)

## Funcionalidades

- **Edición de Perfil**: Los usuarios pueden actualizar su nombre y descripción personal
- **Edición de Avatar**: Cambio de foto de perfil mediante URL
- **Gestión de Tarjetas**: Agregar nuevas tarjetas con título y enlace de imagen
- **Interacciones**: Dar "me gusta" y eliminar tarjetas (con popup de confirmación)
- **Visualización de Imágenes**: Ver imágenes en tamaño completo mediante un popup interactivo
- **Validación de Formularios**: Validación en tiempo real de los campos de entrada
- **Estados de Carga**: Los botones de envío muestran retroalimentación visual mientras las peticiones están en proceso
- **Manejo de Errores**: Las imágenes que fallan al cargar muestran una imagen de placeholder
- **Diseño Responsivo**: Adaptación fluida a diferentes tamaños de pantalla (320px–1280px)
- **Persistencia de Datos**: Toda la información se obtiene y guarda en un servidor remoto mediante una API REST

## Tecnologías Utilizadas

- **HTML5**: Estructura semántica de la página
- **CSS3**: Estilos y diseño responsivo
  - CSS Grid y Flexbox para layouts
  - Media queries para adaptabilidad
  - Metodología BEM para organización de CSS
- **JavaScript (Vanilla)**: Funcionalidad interactiva
  - Manipulación del DOM
  - Validación de formularios
  - Event listeners
  - Template elements
  - Clases y módulos ES6
  - Importación/exportación de módulos
- **Webpack**: Empaquetado de módulos y assets
- **API REST**: Comunicación con servidor remoto usando Fetch API
  - GET — obtener perfil y tarjetas
  - POST — crear nuevas tarjetas
  - PATCH — actualizar perfil y avatar
  - PUT/DELETE — likes y eliminación de tarjetas
- **Fuentes Web**: Google Fonts (Inter)

## Clases Principales

- **Api**: Gestiona todas las peticiones HTTP al servidor (obtener/actualizar perfil, obtener/crear/eliminar tarjetas, likes)
- **Card**: Crea y gestiona tarjetas individuales con funcionalidad de "me gusta", eliminación y visualización de imágenes
- **Section**: Renderiza listas de elementos en el DOM
- **Popup**: Clase base para ventanas emergentes con funcionalidad de apertura/cierre
- **PopupWithForm**: Extiende Popup para manejar formularios con estados de carga
- **PopupWithImage**: Extiende Popup para mostrar imágenes en tamaño completo
- **PopupWithConfirmation**: Extiende Popup para confirmar acciones destructivas (eliminación de tarjetas)
- **UserInfo**: Gestiona la información del perfil del usuario (nombre, descripción y avatar)
- **FormValidator**: Valida formularios en tiempo real y gestiona el estado del botón de envío

## Autor

Daniel Pérez Cruz
