# Portafolio Web Personal

## Descripción

Este es mi portafolio web personal, desarrollado como parte de mi formación como estudiante de Desarrollo de Software. Lo hice para tener un espacio propio donde mostrar quién soy, en qué tecnologías estoy trabajando y cómo conseguirme por correo o GitHub.

- **Nombre:** Juan Camilo Cruz Pelaez
- **Rol:** Desarrollador de Software
- **Ubicación:** Medellín, Colombia
- **GitHub:** [JuanCrzP1](https://github.com/JuanCrzP1)

## Tecnologías utilizadas

- **HTML5** — estructura y contenido de las páginas.
- **CSS3** — todo el diseño visual, animaciones y responsive.
- **Bootstrap 5** — grid, navbar, modal, toast y utilidades responsive (por CDN, sin descargar nada).
- **JavaScript** — lógica de interacción del sitio.
- **jQuery** — manejo de eventos, animaciones y manipulación del DOM.
- **Bootstrap Icons** — iconos de la interfaz (flechas, sobres, GitHub, etc.).
- **Google Fonts** — las tipografías Geist, Geist Mono e Instrument Serif.

## Cómo desarrollé el proyecto

Primero armé la estructura en HTML: el navbar, el Hero, las secciones de Sobre mí, Habilidades y Contacto, y el footer. Con eso ya definido, pasé a trabajar el CSS: variables de color, tipografía, el sistema de tarjetas y toda la parte de animaciones y responsive. Bootstrap lo usé desde el principio para el grid y los componentes (navbar, modal, toast), y sobre esa base fui montando mi propio diseño en `styles.css`. Al final agregué JavaScript y jQuery para las interacciones: el scroll, las animaciones al aparecer las secciones, los efectos del cursor y el resto del comportamiento del sitio.

Traté de mantener siempre separado:

- **Estructura** → HTML (`index.html`, `projects.html`)
- **Estilos** → CSS (`css/styles.css`)
- **Comportamiento** → JavaScript/jQuery (`js/script.js`)

Así, si necesito cambiar algo visual no tengo que tocar el HTML, y si necesito cambiar una interacción no tengo que tocar el CSS.

## Estructura del proyecto

```text
Portafolio/
├── index.html
├── projects.html
├── README.md
├── .gitignore
├── css/
│   └── styles.css
├── js/
│   └── script.js
└── img/
    └── CC61E8EF-4973-47BC-9D02-4407E0A55D07-2.jpeg
```

- **`index.html`** — página principal: Hero, Sobre mí, Habilidades y Contacto.
- **`projects.html`** — página de proyectos, por ahora en estado "en construcción" porque todavía no tengo proyectos reales para publicar.
- **`css/styles.css`** — todo el diseño: variables, layout, componentes, animaciones y media queries.
- **`js/script.js`** — todas las interacciones del sitio hechas con jQuery.
- **`img/`** — mi fotografía de perfil, usada en el Hero.
- **`README.md`** — este archivo, con la documentación del proyecto.
- **`.gitignore`** — le dice a Git qué archivos no debe subir al repositorio (ver la sección "Archivo .gitignore" más abajo).

## Desarrollo del diseño visual

Quise que el portafolio no se viera como una plantilla genérica de Bootstrap, así que usé Bootstrap solo como base estructural (grid, navbar, modal) y encima construí mi propio sistema visual en `styles.css`.

La idea central es alternar secciones de fondo oscuro y fondo claro a lo largo de la página (el Hero es oscuro, Sobre mí es claro, Habilidades es un gris muy suave, Contacto vuelve a ser claro), manteniendo siempre la misma paleta: negro, blanco y grises, más los colores propios de cada tecnología en la sección de Habilidades (el azul/amarillo de Python, el rojo de Java, el azul de C++, el naranja de HTML, etc.).

Sobre esa base agregué detalles que le dan personalidad al diseño: sombras suaves, brillos sutiles alrededor de ciertos elementos, transiciones al pasar el mouse, animaciones cuando cada sección aparece en pantalla, y efectos que reaccionan a la posición del cursor.

## Sección principal / Hero

El Hero (la parte de arriba de `index.html`) contiene:

- Mi nombre.
- Mi rol ("Desarrollador de Software").
- Una descripción breve del portafolio.
- Mi fotografía personal.
- Las tecnologías con las que trabajo, mostradas en un efecto de órbitas.

La foto la hice circular con CSS puro: un contenedor de tamaño fijo, `border-radius: 50%`, `object-fit: cover` para que la imagen no se deforme sin importar su proporción original, un borde fino, una sombra suave y un pequeño efecto al pasar el mouse (la foto se agranda un poco y el borde se ilumina). La foto está ubicada junto a mi nombre, en la parte de la presentación, **no** en el centro de las órbitas de tecnologías — las órbitas quedaron independientes, girando alrededor de un monograma "JC".

## Tecnologías y efecto de órbitas

Al lado de la presentación armé un efecto visual donde los logos de las 7 tecnologías (Python, C++, Java, MySQL, PostgreSQL, HTML y CSS) giran en distintos anillos alrededor de un punto central. Cada logo conserva su color oficial. Las posiciones (el ángulo de cada logo dentro de su anillo) y el giro están controlados completamente con CSS, usando variables personalizadas y `@keyframes`. Con JavaScript/jQuery agregué que todo el conjunto de órbitas reaccione levemente al movimiento del cursor, dando sensación de profundidad. No usé ninguna librería externa para esto, es CSS y jQuery propios.

## Tarjetas de tecnologías

En la sección "Habilidades" cada tecnología tiene su propia tarjeta, y cada una muestra:

- El logo oficial de la tecnología (a color).
- El nombre de la tecnología.
- Una descripción corta (por ejemplo, "Interpretado · Multiparadigma" para Python).
- Un color de acento propio de esa tecnología, usado en bordes, sombras y detalles decorativos.

Estas tarjetas no se dejaron con el estilo por defecto de Bootstrap: las rediseñé completamente en CSS, con un grid de tamaños distintos (la tarjeta de Python es más grande que las demás) en vez de cajas todas iguales.

Los efectos al pasar el mouse incluyen: una leve inclinación 3D de la tarjeta, un brillo que sigue la posición del cursor dentro de la tarjeta, el logo se agranda un poco, y aparece un pequeño detalle de código o una mini tabla dependiendo de si la tecnología es un lenguaje o una base de datos.

## Efectos y animaciones

En general, el sitio usa:

- **Aparición de elementos al hacer scroll** (con jQuery, agregando una clase cuando el elemento entra en pantalla, y CSS se encarga de la transición).
- **Efectos hover** en botones, tarjetas y enlaces (CSS `transition`).
- **Sombras y brillos sutiles** alrededor de tarjetas, botones y la foto de perfil.
- **Animaciones de scroll**: una barra de progreso en la parte superior que avanza según cuánto se ha bajado en la página, y un indicador que marca en qué sección estás dentro del menú.
- **Efectos de cursor**: el spotlight que sigue al mouse en el Hero y en las tarjetas de tecnología, y los "botones magnéticos" que se desplazan levemente hacia el cursor cuando pasas cerca.
- **Movimiento de las tecnologías**: el giro constante de los anillos de órbitas (CSS) más la reacción al cursor (jQuery).

Todo esto se reparte entre CSS (las transiciones y `@keyframes`) y JavaScript/jQuery (detectar el scroll, la posición del cursor y agregar/quitar las clases correspondientes).

## Sección Sobre mí

Esta sección tiene mi descripción personal (quién soy, dónde estoy y con qué tecnologías trabajo), además de una ficha con mis datos básicos (nombre, rol, ubicación y stack) y una tarjeta tipo carnet con mi nombre y rol. Todo está basado en información real mía, sin datos inventados.

## Diseño responsive

Para que la página se viera bien en computador, tablet y celular combiné dos cosas:

1. **El sistema de columnas de Bootstrap** (`container`, `row`, `col-lg-*`, `col-md-*`, etc.) y sus utilidades responsive (`d-none`, `d-md-flex`, y similares) para la estructura general.
2. **Media queries propias en CSS** (en tres puntos de quiebre: 1199.98px, 991.98px y 575.98px) para ajustar tamaños de fuente, el grid de las tarjetas de habilidades, el tamaño de la foto de perfil y el comportamiento del menú.

Con esta combinación, por ejemplo, el grid de tarjetas de tecnologías pasa de 4 columnas en escritorio a 2 en tablet y a 1 en celular, y la foto de perfil se reubica arriba del nombre en pantallas muy pequeñas para que el texto no se vea apretado.

## Uso de Bootstrap

Bootstrap lo usé como base, no como el diseño final. Lo que aporta al proyecto:

- **`container` / `row` / `col-*`** — el grid de todas las secciones.
- **Navbar** (`navbar`, `navbar-expand-lg`, `navbar-toggler`, `navbar-collapse`) — el menú superior, incluyendo el comportamiento de menú hamburguesa en móvil.
- **Modal** — la ventana que muestra el video de cada proyecto (lista para usarse cuando agregue proyectos reales).
- **Toast** — el aviso de "Correo copiado al portapapeles".
- **Botones y utilidades** — clases como `btn`, `d-flex`, `align-items-center`, `position-fixed`, etc.

Todo el diseño visual (colores, tipografías, animaciones, tarjetas, efectos hover) es CSS personalizado mío encima de esa base de Bootstrap.

## Uso de jQuery

Repasando `script.js`, esto es lo que realmente hace con jQuery:

- Divide los títulos en palabras para animarlas una por una al aparecer.
- Detecta cuándo un elemento entra en la pantalla y le agrega la clase que activa su animación de aparición.
- Cambia el estilo del navbar cuando haces scroll, y mueve un indicador debajo del enlace de la sección activa.
- Detecta en qué sección de la página estás mientras haces scroll (para marcar el enlace activo del menú).
- Cierra el menú móvil automáticamente al elegir una opción.
- Mueve levemente ciertos elementos (parallax) según la posición del scroll.
- Controla la barra de progreso de scroll en la parte superior.
- Revisa si mi foto de perfil cargó correctamente para mostrarla (o mantener un ícono de respaldo si no carga).
- Sigue la posición del cursor en el Hero y en las tarjetas de tecnología para los efectos de spotlight e inclinación.
- Mueve los botones "magnéticos" hacia el cursor.
- Actualiza la hora local de Medellín cada cierto tiempo.
- Copia mi correo al portapapeles y muestra el aviso (Toast de Bootstrap).
- Maneja el modal de proyectos: abre la ventana, escribe el título/descripción/tecnologías del proyecto seleccionado, carga el video de YouTube correspondiente y lo detiene al cerrar el modal (esta parte ya está programada y lista, pendiente de activarse cuando suba proyectos reales).
- El botón "volver arriba" y el año del footer.

No hay funciones inventadas aquí: es exactamente lo que hace el archivo.

## Separación y organización del código

- **`index.html` / `projects.html`** → solo estructura y contenido, sin CSS ni JavaScript importante embebido.
- **`css/styles.css`** → toda la presentación visual: variables, layout, componentes, animaciones y responsive.
- **`js/script.js`** → todo el comportamiento del sitio, organizado en bloques numerados y comentados (uno por cada interacción: navbar, scroll, animaciones, cursor, modal, etc.).

Con esta separación, el código queda modularizado: cada archivo tiene una responsabilidad clara y no se mezcla lógica de un tipo con otro.

## Pruebas locales

Probé el proyecto de forma local usando el servidor simple que trae Python, ejecutando desde la carpeta del proyecto:

```bash
python -m http.server 8000
```

Y abriendo en el navegador:

```
http://localhost:8000
```

Con el sitio corriendo así verifiqué que cargaran bien el HTML, el CSS y el JavaScript, que la fotografía se mostrara correctamente, que la navegación entre secciones funcionara, que el diseño se viera bien en distintos tamaños de pantalla (responsive) y que no hubiera errores importantes en la consola del navegador.

## Git y GitHub

Para controlar las versiones del proyecto uso Git, y para tener un respaldo remoto uso GitHub. El flujo que sigo es:

```bash
git init
git add .
git commit -m "Primer commit del portafolio"
```

Con esto inicializo el repositorio local, agrego todos los archivos del proyecto (menos los que están en `.gitignore`) y guardo el primer commit.

Después creo el repositorio remoto en GitHub (lo llamé `Portafolio`) y lo conecto con mi repositorio local:

```bash
git remote add origin https://github.com/JuanCrzP1/Portafolio.git
git branch -M main
git push -u origin main
```

- `git remote add origin ...` conecta mi carpeta local con el repositorio de GitHub.
- `git branch -M main` deja la rama principal con el nombre `main`.
- `git push -u origin main` sube todo lo que tengo en local hacia GitHub por primera vez.

## Archivo .gitignore

El archivo `.gitignore` le indica a Git qué archivos **no** debe subir al repositorio. En este proyecto lo uso para excluir mi fotografía personal y los scripts que solo uso para levantar el servidor local en Windows:

```text
# Foto personal
img/CC61E8EF-4973-47BC-9D02-4407E0A55D07-2.jpeg

# Scripts de servidor local (solo para desarrollo en Windows)
run.bat
run.ps1
```

Con esto, cuando ejecuto `git add .`, Git ignora esos archivos y no los sube al repositorio. La foto se excluye sin afectar el resto de la carpeta `img/`, y `run.bat`/`run.ps1` se excluyen porque son utilidades de mi entorno local (no son parte del sitio en sí: Vercel no los ejecuta, solo sirve los archivos estáticos).

**Importante:** como esa foto queda excluida del repositorio de GitHub, si despliego el sitio en Vercel conectado directamente a ese repositorio, la fotografía **no** va a estar disponible en el sitio publicado mientras siga excluida — Vercel solo puede desplegar lo que realmente existe en el repositorio. Si quiero que la foto sí aparezca en el despliegue, tendría que quitarla del `.gitignore` y subirla al repositorio.

## Publicación

El flujo de publicación que sigo es:

```
Desarrollo local → Git → GitHub → Vercel → Portafolio publicado
```

Como el proyecto es un sitio estático (solo HTML, CSS y JavaScript, sin backend ni proceso de build), no necesita ningún paso de compilación: Vercel puede desplegarlo directamente a partir del contenido del repositorio.

## Conclusión

Este proyecto me sirvió para aplicar de forma práctica varios de los conocimientos que he ido aprendiendo: estructurar una página con HTML, darle estilo y responsive con CSS y Bootstrap, agregar interacción con JavaScript y jQuery, y también organizar y publicar un proyecto usando Git y GitHub. Todavía me falta agregar mis proyectos reales en `projects.html`, pero la base del portafolio — diseño, estructura y funcionamiento — ya está lista.
