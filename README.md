# VITRO - Área General de Emergencias

Sitio web estático para consultar proveedores de emergencia correspondientes a los edificios administrados por VITRO.

## Archivos

- `index.html`: estructura de la interfaz e iconos.
- `styles.css`: identidad visual y diseño responsive.
- `app.js`: navegación, filtrado y presentación de datos.
- `data/app-data.js`: única fuente de categorías, edificios y proveedores.

## Cargar datos

Todos los cambios de información se realizan en `data/app-data.js`.

Para agregar un edificio, añadí un objeto a `buildings` con un `id` único, `name` y `address`. Indicá su `id` en `defaultBuildingId` para que esa publicación muestre el edificio.

Para agregar un proveedor, añadí un objeto a `providers` con un `id` único, `name`, `phone`, `categoryIds` y `buildingIds`.

- `categoryIds`: uno o varios identificadores existentes en `categories`.
- `buildingIds`: uno o varios identificadores existentes en `buildings`.
- `buildingIds: []`: el proveedor está disponible para todos los edificios.

Para modificar o eliminar un registro, editá o quitá su objeto. Al cambiar un `id`, actualizá también todas sus referencias.

## Probar localmente

Abrí `index.html` directamente en un navegador o usá una extensión de servidor estático de VS Code. Probá las cuatro categorías y el botón **Volver a emergencias**.

## Publicar

Publicá manteniendo esta estructura:

```text
index.html
styles.css
app.js
data/app-data.js
```

El hosting debe servir `index.html` como página principal. El QR debe generarse únicamente después de obtener y verificar la URL pública definitiva.
Actualizacion de publicacion
