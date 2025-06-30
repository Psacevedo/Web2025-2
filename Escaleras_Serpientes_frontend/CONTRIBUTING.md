# Contributing to Escaleras y Serpientes Frontend

¡Gracias por tu interés en contribuir al proyecto! 🎉

## 🚀 Cómo Contribuir

### 1. Fork del Repositorio
```bash
git clone https://github.com/tu-usuario/escaleras-serpientes-frontend.git
cd escaleras-serpientes-frontend
```

### 2. Crear una Rama
```bash
git checkout -b feature/nueva-funcionalidad
# o
git checkout -b fix/correccion-bug
```

### 3. Realizar Cambios
- Sigue las convenciones de código establecidas
- Asegúrate de que los tests pasen
- Verifica que la UI sea responsive

### 4. Testing
```bash
npm test
npm run lint
npm run build # Verificar que el build funcione
```

### 5. Commit y Push
```bash
git add .
git commit -m "feat: descripción de la nueva funcionalidad"
git push origin feature/nueva-funcionalidad
```

### 6. Pull Request
- Crea un Pull Request con una descripción clara
- Incluye capturas de pantalla de cambios UI
- Referencia issues relacionados

## 📋 Convenciones de Código

### React/JavaScript
- Seguimos el estilo **Airbnb** para React
- Usa **ESLint** para verificar el código
- Componentes funcionales con Hooks
- Indentación de 2 espacios

### CSS
- Mobile-first responsive design
- CSS Variables para temas
- BEM naming convention cuando sea posible
- Prefiere Flexbox/Grid para layouts

### Commits
Seguimos [Conventional Commits](https://www.conventionalcommits.org/):
- `feat:` para nuevas funcionalidades
- `fix:` para correcciones de bugs
- `ui:` para cambios de interfaz
- `style:` para cambios de CSS
- `refactor:` para refactorización
- `test:` para tests

### Componentes
- Un componente por archivo
- Props tipadas con PropTypes o TypeScript
- Nombres descriptivos en PascalCase
- Hooks personalizados con prefijo `use`

## 🎨 Guías de UI/UX

### Diseño
- Mantén consistencia visual
- Accesibilidad (a11y) es importante
- Dark/Light mode support
- Responsive design obligatorio

### Colores y Tipografía
- Usa CSS Variables definidas
- Respeta la paleta de colores existente
- Tipografía legible en todos los tamaños

## 🐛 Reportar Bugs

### Antes de Reportar
- Verifica que el bug no haya sido reportado antes
- Prueba en diferentes navegadores
- Prueba en mobile y desktop

### Información a Incluir
- Navegador y versión
- Dispositivo/OS
- Pasos para reproducir
- Capturas de pantalla
- Comportamiento esperado vs actual

## 💡 Sugerir Funcionalidades

- Usa GitHub Issues para sugerencias
- Incluye mockups o wireframes si es posible
- Describe la experiencia de usuario
- Considera la accesibilidad

## 🔧 Setup de Desarrollo

```bash
# Instalar dependencias
npm install

# Configurar environment
cp .env.example .env

# Ejecutar en modo desarrollo
npm run dev

# Build para producción
npm run build

# Preview del build
npm run preview

# Linting
npm run lint
```

## 📱 Testing

### Navegadores Soportados
- Chrome/Chromium (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

### Dispositivos
- Desktop (1024px+)
- Tablet (768px - 1023px)
- Mobile (320px - 767px)

### Tests Manuales
- Funcionalidad en tiempo real
- Responsive design
- Accesibilidad básica
- Performance (Lighthouse)

## 📝 Documentación

- Documenta componentes complejos
- Incluye PropTypes/TypeScript
- Actualiza README si añades dependencias
- Mantén comentarios JSDoc

## ✅ Proceso de Review

1. **Automated Checks** - Linting y build deben pasar
2. **Visual Review** - Screenshots de cambios UI
3. **Code Review** - Al menos un maintainer debe aprobar
4. **Testing** - Pruebas en diferentes dispositivos
5. **Merge** - Squash and merge preferido

## 🎯 Áreas de Contribución

- **UI Components** - Nuevos componentes reutilizables
- **Pages** - Nuevas páginas o mejoras
- **Responsive Design** - Mejoras mobile
- **Accessibility** - Mejoras a11y
- **Performance** - Optimizaciones
- **Testing** - Tests de componentes
- **Documentation** - Mejoras en docs

## 🛠 Herramientas Útiles

- **React DevTools** - Debug de componentes
- **Redux DevTools** - Debug de estado (si usas Redux)
- **Lighthouse** - Performance y accessibility
- **axe DevTools** - Accessibility testing

## 📞 Contacto

- **Issues**: GitHub Issues
- **Discussions**: GitHub Discussions
- **Email**: [tu-email@domain.com]

¡Gracias por contribuir! 🙏
