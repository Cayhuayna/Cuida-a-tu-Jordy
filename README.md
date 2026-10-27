# Cuida a tu Jordy

Web de una sola página para cuidar a Jordy, jugar penales y comprar los productos que necesita. El catálogo permite buscar, filtrar y ordenar; las compras de demostración pasan los productos a su inventario y no procesan pagos.

## Abrir en VS Code

Abre esta carpeta en VS Code y abre `index.html` con Live Server. Usa siempre la misma dirección de Live Server para que las compras, el inventario y el estado de Jordy compartan el almacenamiento local del navegador.

Los productos de muestra se editan en `app.js`, en el arreglo `products`; sus efectos de cuidado están en `jordy.js`. La salud de Jordy se mide como HP, de 0 a 200%. La imagen está en `assets/jordy.png`.

El navegador conserva las necesidades, el inventario, las monedas, la experiencia, el nivel, el tiempo activo y los resultados de penales en `localStorage`. La primera vez entrega un kit inicial y 750 monedas. Las compras descuentan monedas; se ganan al alimentar a Jordy y jugar penales. El progreso se mantiene en ese navegador y dispositivo. Los efectos y el catálogo están sincronizados entre `app.js` y `jordy.js`; la economía y el progreso están en `player-progress.js`.

La progresión incluye crecimiento visual de Jordy hasta nivel 15 y un kit bono cada 10 niveles. El laboratorio vende pociones temporales y permite mezclar una saciante, una de pausa y una de inmunidad para crear el Elixir secreto. La poción desconocida tiene resultados aleatorios, algunos perjudiciales.
La pantalla inicial pide el nombre del jugador y contiene ayuda, configuración de sonidos y ranking local. El tiempo se calcula al regresar, incluso después de cerrar la página; un día de juego equivale a una hora y su ciclo de sueño ocupa los últimos 15 minutos. El botón Jordy mini abre un compañero flotante dentro de la página con controles rápidos. El ranking y el modo mini se guardan localmente; no comparten datos entre navegadores.