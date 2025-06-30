# Contributing to Escaleras y Serpientes Backend

¡Gracias por tu interés en contribuir al proyecto! 🎉

## 🚀 Cómo Contribuir

### 1. Fork del Repositorio
```bash
git clone https://github.com/tu-usuario/escaleras-serpientes-backend.git
cd escaleras-serpientes-backend
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
- Añade tests para nuevas funcionalidades

### 4. Testing
```bash
npm test
npm run lint
```

### 5. Commit y Push
```bash
git add .
git commit -m "feat: descripción de la nueva funcionalidad"
git push origin feature/nueva-funcionalidad
```

### 6. Pull Request
- Crea un Pull Request con una descripción clara
- Incluye capturas de pantalla si es relevante
- Referencia issues relacionados

## 📋 Convenciones de Código

### Estilo
- Seguimos el estilo **Airbnb** para JavaScript
- Usa **ESLint** para verificar el código
- Indentación de 2 espacios

### Commits
Seguimos [Conventional Commits](https://www.conventionalcommits.org/):
- `feat:` para nuevas funcionalidades
- `fix:` para correcciones de bugs
- `docs:` para cambios en documentación
- `style:` para cambios de formato
- `refactor:` para refactorización
- `test:` para tests

### Tests
- Mantén la cobertura de tests al 100%
- Usa Jest para testing
- Incluye tests para casos edge

## 🐛 Reportar Bugs

### Antes de Reportar
- Verifica que el bug no haya sido reportado antes
- Prueba con la última versión

### Información a Incluir
- Versión de Node.js
- Sistema operativo
- Pasos para reproducir
- Comportamiento esperado vs actual
- Capturas de pantalla si aplica

## 💡 Sugerir Funcionalidades

- Usa GitHub Issues para sugerencias
- Describe claramente el caso de uso
- Explica por qué sería útil
- Considera la complejidad de implementación

## 🔧 Setup de Desarrollo

```bash
# Instalar dependencias
npm install

# Configurar environment
cp .env.example .env

# Ejecutar en modo desarrollo
npm run dev

# Ejecutar tests
npm test

# Linting
npm run lint
```

## 📝 Documentación

- Actualiza README.md si es necesario
- Comenta funciones complejas
- Mantén documentación de API actualizada

## ✅ Proceso de Review

1. **Automated Checks** - Tests y linting deben pasar
2. **Code Review** - Al menos un maintainer debe aprobar
3. **Testing** - Pruebas manuales si es necesario
4. **Merge** - Squash and merge preferido

## 🎯 Áreas de Contribución

- **Backend API** - Nuevos endpoints
- **WebSocket** - Mejoras en tiempo real
- **Testing** - Más cobertura de tests
- **Performance** - Optimizaciones
- **Documentation** - Mejoras en docs
- **Security** - Validaciones y seguridad

## 📞 Contacto

- **Issues**: GitHub Issues
- **Discussions**: GitHub Discussions
- **Email**: [tu-email@domain.com]

¡Gracias por contribuir! 🙏
