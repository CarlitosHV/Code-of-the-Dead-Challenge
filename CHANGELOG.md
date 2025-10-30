# Changelog

Todos los cambios notables de este proyecto serán documentados en este archivo.

El formato está basado en [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
y este proyecto adhiere a [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2024-10-30

### Agregado
- 🎮 Juego Match 3 completo con temática del Día de los Muertos
- 🎨 6 símbolos temáticos: calaveras, cempasúchil, velas, papel picado, copal y pan de muerto
- 🌟 Sistema de detección de patrones L y T para puntuaciones especiales
- ⚡ Items especiales de cruz que eliminan filas y columnas completas
- 🎵 Sistema de audio completo con música arcade generada proceduralmente
- 🔊 Efectos de sonido para matches, poderes especiales y fallos
- 🎚️ Control de audio con botón de mute/unmute
- 📱 Diseño completamente responsive para todos los dispositivos
- 🎯 Sistema de 10 niveles progresivos con dificultad creciente
- 💀 22+ calaveras decorativas animadas que reaccionan al juego
- ✨ Sistema de partículas para efectos visuales
- 🏆 Modales de completar nivel y juego completado
- 📊 Sistema de puntuación dual (por nivel y total acumulado)
- 🎨 Gráficos SVG escalables y coloridos
- 📱 Soporte completo para dispositivos táctiles
- 🌐 Compatibilidad cross-browser
- ♿ Características de accesibilidad básicas

### Características Técnicas
- HTML5 Canvas para renderizado del juego
- Web Audio API para generación de música en tiempo real
- CSS3 con media queries responsive
- JavaScript ES6+ con programación orientada a objetos
- Sistema de animaciones con requestAnimationFrame
- Gestión automática de memoria para partículas
- Detección de patrones avanzada para matches especiales
- Canvas dinámico que se redimensiona automáticamente

### Niveles Incluidos
1. **Principiante** - 500 puntos, 30 movimientos
2. **Intermedio** - 800 puntos, 25 movimientos
3. **Avanzado** - 1,200 puntos, 22 movimientos
4. **Experto** - 1,600 puntos, 20 movimientos
5. **Maestro** - 2,200 puntos, 18 movimientos
6. **Leyenda** - 2,800 puntos, 16 movimientos
7. **Épico** - 3,500 puntos, 15 movimientos
8. **Mítico** - 4,500 puntos, 14 movimientos
9. **Divino** - 5,500 puntos, 13 movimientos
10. **Maestro de los Muertos** - 7,000 puntos, 12 movimientos

### Breakpoints Responsive
- 📱 Móviles muy pequeños: ≤360px
- 📱 Móviles pequeños: ≤480px
- 📱 Tablets/móviles grandes: ≤768px
- 💻 Tablets landscape: 769px-1199px
- 🖥️ Desktops: 1200px-1919px
- 🖥️ Pantallas grandes: ≥1920px
- 📱 Orientación landscape especial para móviles

### Archivos del Proyecto
- `index.html` - Página principal del juego
- `styles.css` - Estilos CSS responsive completos
- `game.js` - Lógica principal del juego y sistema de niveles
- `assets.js` - Gráficos SVG y recursos visuales
- `audio.js` - Sistema de audio y generación de música
- `README.md` - Documentación completa
- `LICENSE` - Licencia MIT
- `CHANGELOG.md` - Este archivo de cambios

### Correcciones de Bugs
- ✅ Corregido bug de score acumulativo entre niveles
- ✅ Implementado sistema de score dual para progresión justa
- ✅ Corregida lógica de reinicio de niveles
- ✅ Mejorada detección de completar nivel
- ✅ Optimizado rendimiento en dispositivos móviles

## [Futuras Versiones]

### Planeado para v1.1.0
- 🌍 Soporte para múltiples idiomas
- 🎨 Más símbolos y variaciones visuales
- 🎵 Más pistas musicales
- 🏅 Sistema de logros
- 💾 Guardado de progreso local
- 📈 Estadísticas detalladas del jugador

### Ideas para Futuras Versiones
- 🎮 Modo multijugador
- 🎯 Desafíos diarios
- 🎨 Temas adicionales (Navidad, Halloween, etc.)
- 🔧 Editor de niveles
- 📱 App móvil nativa
- 🌐 Leaderboards online