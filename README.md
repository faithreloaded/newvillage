# AstroBoilerplate

Un boilerplate limpio y moderno para proyectos Astro con CSS puro y variables de diseño.

## 🚀 Características

- **CSS Puro**: Sin dependencias de frameworks CSS como Tailwind
- **Variables de Diseño**: Sistema de tokens centralizado en `tokens.css`
- **Responsive**: Diseño completamente adaptable a todos los dispositivos
- **Fácil de Mantener**: Estructura limpia y organizada
- **Rápido**: Optimizado para rendimiento con Astro
- **Modo Oscuro**: Soporte automático para modo oscuro
- **Accesible**: Componentes con buenas prácticas de accesibilidad

## 📁 Estructura del Proyecto

```
src/
├── components/
│   ├── Header.astro      # Componente de navegación
│   └── Footer.astro      # Componente de pie de página
├── layouts/
│   └── BaseLayout.astro  # Layout base de la aplicación
├── pages/
│   └── index.astro       # Página de inicio
└── styles/
    ├── tokens.css        # Variables de diseño (colores, tipografía, espaciados)
    └── globals.css       # Estilos globales y utilidades
```

## 🎨 Sistema de Diseño

### Variables de Color

El archivo `tokens.css` contiene todas las variables de diseño:

- **Colores primarios**: Rojo suave (`#dc2626`)
- **Colores secundarios**: Gris oscuro (`#374151`)
- **Colores de fondo**: Blanco y variaciones
- **Colores de texto**: Gris neutro (`#374151`)

### Personalización

Para cambiar los colores del proyecto, simplemente modifica las variables en `src/styles/tokens.css`:

```css
:root {
  --color-primary: #dc2626; /* Cambia este valor */
  --color-secondary: #374151; /* Y este */
  /* ... más variables */
}
```

### Tipografía

- **Fuente principal**: System fonts (San Francisco, Segoe UI, etc.)
- **Tamaños**: Escala tipográfica de 12px a 60px
- **Pesos**: De light (300) a extrabold (800)

### Espaciados

Sistema de espaciado basado en múltiplos de 4px:
- `--space-1`: 4px
- `--space-4`: 16px
- `--space-8`: 32px
- etc.

## 🛠️ Comandos Disponibles

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# Construir para producción
npm run build

# Vista previa de la build
npm run preview
```

## 📱 Responsive Design

El boilerplate incluye breakpoints estándar:

- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

## 🌙 Modo Oscuro

El proyecto incluye soporte automático para modo oscuro usando `prefers-color-scheme`. Las variables de color se adaptan automáticamente según las preferencias del usuario.

## 🎯 Componentes Incluidos

### Header
- Navegación responsive
- Menú hamburguesa en móvil
- Logo/brand personalizable

### Footer
- Enlaces organizados
- Redes sociales
- Información de copyright

### Layout Base
- Estructura HTML semántica
- Meta tags optimizados
- Importación de estilos globales

## 🚀 Próximos Pasos

1. **Personaliza los colores** en `tokens.css`
2. **Modifica el contenido** en `index.astro`
3. **Añade nuevas páginas** en `src/pages/`
4. **Crea componentes** en `src/components/`
5. **Personaliza el Header y Footer** según tus necesidades

## 📄 Licencia

MIT License - puedes usar este boilerplate libremente en tus proyectos.

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor, abre un issue o pull request si tienes sugerencias o mejoras.

---

**¡Disfruta construyendo con Astro!** 🚀