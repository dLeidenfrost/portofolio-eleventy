---
title: Reconstruí mi sitio con Eleventy y sin frameworks
description: Por qué cambié WordPress por HTML estático, TypeScript y CSS puros, y qué resuelve Eleventy por mí.
lede: Mi antiguo sitio en WordPress era lento y nunca tenía ganas de tocarlo. Lo reemplacé con un sitio estático hecho de HTML, TypeScript y CSS puros, generado con Eleventy.
date: 2026-10-23
draft: true
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

> [Resultados: agregar las puntuaciones de Lighthouse y el peso total de la página cuando el sitio esté en línea]
