// UI copy and page content per language. Keys must match across languages.
export default {
  en: {
    htmlLang: "en",
    name: "English",
    switchTo: "Read in English",
    routes: { home: "/", writing: "/writing/", feed: "/rss.xml" },
    meta: {
      description:
        "Frontend developer with 11+ years building secure, scalable web and mobile apps for the financial sector.",
    },
    nav: {
      label: "Main",
      work: "work",
      writing: "writing",
      about: "about",
      contact: "contact",
    },
    theme: {
      toggle: "Toggle color theme",
      toLight: "Switch to light mode",
      toDark: "Switch to dark mode",
      light: "light",
      dark: "dark",
    },
    hero: {
      lede: "Frontend developer with 11+ years building secure, scalable web and mobile apps for the financial sector. React, Next.js and TypeScript by trade, Node.js on the backend.",
      status: "Open to full-stack roles",
      location: "Cuernavaca, MX · UTC−6",
      languages: "ES / EN",
      cv: "Download CV",
    },
    work: {
      label: "/work",
      jobs: [
        {
          company: "Fresh Consulting",
          role: "Frontend Developer · México Branch, Ciudad de México",
          dates: "2015.02 — present",
          projects: [
            {
              title: "Corporate online banking platform",
              status: "shipped",
              summary:
                "Developed and deployed a banking platform for companies, with user management, transfers, balance inquiries and foreign-exchange modules. Co-led frontend as one of two senior developers on a five-person team, balancing a polished experience with strict security requirements. Unit and end-to-end tests with Jest and Playwright keep each release reliable.",
              stats: [
                { value: "~15,000", label: "company accounts" },
                { value: "~300,000", label: "transactions / month" },
                { value: "5", label: "team · 2 FE, 2 BE, 1 QA" },
              ],
            },
            {
              title: "ATM cash logistics system",
              status: "in progress",
              active: true,
              summary:
                "Building a logistics management system for a company that loads and collects cash across ATM networks.",
            },
          ],
        },
      ],
    },
    stack: {
      label: "/stack",
      keys: "keys",
      comments: { aws: "AWS: basic" },
    },
    about: {
      label: "/about",
      intro:
        "I'm a frontend developer based in Cuernavaca, Mexico. Since 2015 I've built software for the financial sector, where reliability and security come first. Recently I've been using AI coding tools every day for planning, building and testing.",
      facts: [
        {
          label: "education",
          value: "B.Eng. in Computer Technologies",
          detail: "Tecnológico de Monterrey, Campus Cuernavaca · 2012",
        },
        { label: "languages", value: "Spanish, native", detail: "English, upper-intermediate" },
      ],
    },
    contact: {
      label: "/contact",
      lede: "Hiring for a frontend or full-stack role? Write to me.",
      copy: "Copy",
      copied: "Copied",
      copyFailed: "Copy failed",
    },
    writing: {
      label: "/writing",
      title: "Writing",
      prompt: "~/writing % ls -t",
      intro: "Notes on what I build and what I learn along the way.",
      allPosts: "All posts",
      empty: "Nothing published yet.",
      draft: "draft",
      minutes: "min",
      minutesRead: "min read",
      back: "← writing",
      moreNav: "More posts",
      previous: "← previous",
      next: "next →",
    },
    footer: { builtWith: "Built with Eleventy, TypeScript and plain CSS" },
  },

  es: {
    htmlLang: "es-419",
    name: "Español",
    switchTo: "Leer en español",
    routes: { home: "/es/", writing: "/es/escritos/", feed: "/es/rss.xml" },
    meta: {
      description:
        "Desarrollador frontend con más de 11 años creando aplicaciones web y móviles seguras y escalables para el sector financiero.",
    },
    nav: {
      label: "Principal",
      work: "trabajo",
      writing: "escritos",
      about: "acerca",
      contact: "contacto",
    },
    theme: {
      toggle: "Cambiar tema de color",
      toLight: "Cambiar a modo claro",
      toDark: "Cambiar a modo oscuro",
      light: "claro",
      dark: "oscuro",
    },
    hero: {
      lede: "Desarrollador frontend con más de 11 años creando aplicaciones web y móviles seguras y escalables para el sector financiero. React, Next.js y TypeScript como especialidad, Node.js en el backend.",
      status: "Disponible para puestos full-stack",
      location: "Cuernavaca, MX · UTC−6",
      languages: "ES / EN",
      cv: "Descargar CV",
    },
    work: {
      label: "/work",
      jobs: [
        {
          company: "Fresh Consulting",
          role: "Desarrollador Frontend · Sucursal México, Ciudad de México",
          dates: "2015.02 — actualidad",
          projects: [
            {
              title: "Plataforma de banca en línea para empresas",
              status: "lanzado",
              summary:
                "Desarrollé y desplegué una plataforma bancaria para empresas, con módulos de administración de usuarios, transferencias, consulta de saldos y compraventa de divisas. Co-lideré el frontend como uno de los dos desarrolladores senior de un equipo de cinco personas, equilibrando una experiencia cuidada con requisitos de seguridad estrictos. Las pruebas unitarias y end-to-end con Jest y Playwright hacen que cada versión sea confiable.",
              stats: [
                { value: "~15,000", label: "cuentas empresariales" },
                { value: "~300,000", label: "transacciones / mes" },
                { value: "5", label: "equipo · 2 FE, 2 BE, 1 QA" },
              ],
            },
            {
              title: "Sistema de logística de efectivo para cajeros automáticos",
              status: "en curso",
              active: true,
              summary:
                "Estoy desarrollando un sistema de gestión logística para una empresa que abastece y recolecta efectivo en redes de cajeros automáticos.",
            },
          ],
        },
      ],
    },
    stack: {
      label: "/stack",
      keys: "claves",
      comments: { aws: "AWS: básico" },
    },
    about: {
      label: "/about",
      intro:
        "Soy desarrollador frontend y vivo en Cuernavaca, México. Desde 2015 construyo software para el sector financiero, donde la confiabilidad y la seguridad son lo primero. Recientemente he estado usando mas herramientas de programación con IA todos los días para planear, construir y probar.",
      facts: [
        {
          label: "formación",
          value: "Ingeniería en Tecnologías Computacionales",
          detail: "Tecnológico de Monterrey, Campus Cuernavaca · 2012",
        },
        { label: "idiomas", value: "Español, nativo", detail: "Inglés, intermedio alto" },
      ],
    },
    contact: {
      label: "/contact",
      lede: "¿Buscas a alguien para un puesto frontend o full-stack? Escríbeme.",
      copy: "Copiar",
      copied: "Copiado",
      copyFailed: "No se pudo copiar",
    },
    writing: {
      label: "/writing",
      title: "Escritos",
      prompt: "~/escritos % ls -t",
      intro: "Notas sobre lo que construyo y lo que aprendo en el camino.",
      allPosts: "Todos los escritos",
      empty: "Aún no hay publicaciones.",
      draft: "borrador",
      minutes: "min",
      minutesRead: "min de lectura",
      back: "← escritos",
      moreNav: "Más publicaciones",
      previous: "← anterior",
      next: "siguiente →",
    },
    footer: { builtWith: "Hecho con Eleventy, TypeScript y CSS puro" },
  },
};
