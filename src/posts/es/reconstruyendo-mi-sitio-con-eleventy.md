---
title: Reconstruí mi sitio con Eleventy y sin frameworks
description: Por qué cambié WordPress por HTML estático, TypeScript y CSS puros, y qué resuelve Eleventy por mí.
lede: Mi antiguo sitio en WordPress era lento y nunca tenía ganas de tocarlo. Lo reemplacé con un sitio estático hecho de HTML, TypeScript y CSS puros, generado con Eleventy.
date: 2026-10-23
translationKey: rebuilding-with-eleventy
tags: [eleventy, rendimiento, ia, ia-escrito]
---

## Por qué no un framework

Escribo React y Next.js todos los días en el trabajo. Para un sitio personal con pocas páginas y un puñado de publicaciones, un framework del lado del cliente agrega JavaScript que el lector nunca necesita. El HTML estático carga rápido y no hay nada que mantener parchado.

## Por qué Eleventy y no Hugo

Hugo era la otra opción. Compila rápido y empaqueta TypeScript sin configuración extra, pero sus plantillas de Go eran una cosa más que aprender. Eleventy es JavaScript de principio a fin, así que la configuración, los filtros y los archivos de datos son código que ya sé depurar.

## TypeScript con esbuild

Eleventy no compila TypeScript por sí solo. Unas cuantas líneas en `eleventy.config.js` ejecutan esbuild antes de cada build:

```js eleventy.config.js
import esbuild from "esbuild";

export default function (eleventyConfig) {
  // Empaqueta y minifica el TypeScript del sitio
  eleventyConfig.on("eleventy.before", async () => {
    await esbuild.build({
      entryPoints: ["src/assets/ts/main.ts"],
      outfile: "_site/assets/main.js",
      bundle: true,
      minify: true,
    });
  });

  eleventyConfig.addPassthroughCopy("src/assets/css");
  return { dir: { input: "src" } };
}
```

## Lo que recibe el navegador

- HTML generado en el build, un archivo por página
- Un solo script pequeño, que se carga solo donde la página lo necesita
- Una sola hoja de estilos, con propiedades personalizadas para los temas claro y oscuro

## Resultados

Corrí Lighthouse 13.5 sobre la página de inicio en línea el 24 de octubre de 2026. Las puntuaciones son de rendimiento, accesibilidad, buenas prácticas y SEO:

- **Escritorio:** 100 / 100 / 100 / 100. El contenido más grande aparece a los 0.4 s.
- **Móvil:** 99 / 100 / 100 / 100. El contenido más grande aparece a los 1.7 s con la conexión 4G lenta que simula Lighthouse.
- **En ambos:** 0 ms de tiempo total de bloqueo, ningún desplazamiento de diseño, 6 solicitudes y 61 KiB en total.

Las dos fuentes web ocupan unos 52 KiB de eso. El HTML, la hoja de estilos y el script suman menos de 9 KiB.

La primera medición salió más baja: 88 en rendimiento en móvil, 96 en buenas prácticas y 90 en SEO. Cuatro arreglos pequeños cerraron la diferencia:

- **Fuentes alojadas en el sitio.** La hoja de estilos de Google Fonts bloqueaba el renderizado mientras el navegador se conectaba a dos dominios más. Servir los archivos de las fuentes desde mi propio servidor y precargarlos bajó el primer contenido en móvil de 3.1 s a 1.3 s.
- **Un favicon.** Sin él, el navegador pedía `/favicon.ico`, recibía un 404 y registraba un error en la consola.
- **URLs absolutas en `hreflang`.** Los enlaces entre la versión en inglés y la versión en español usaban rutas como `/es/`, y `hreflang` necesita URLs completas.
- **Nombres accesibles que coinciden con el texto visible.** El cambio de idioma mostraba "en" mientras los lectores de pantalla escuchaban "Read in English", y el botón de tema mostraba "oscuro" mientras escuchaban "Cambiar a modo claro". Ahora cada etiqueta empieza con la palabra que se ve en pantalla.
