# 🌺 Día de los Muertos - Match 3 🌺

Un juego Match 3 temático del Día de los Muertos con gráficos SVG, música arcade generada proceduralmente y un sistema de niveles progresivos.

![Día de los Muertos Match 3](https://img.shields.io/badge/Juego-Match%203-orange) ![HTML5](https://img.shields.io/badge/HTML5-Canvas-red) ![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-yellow) ![CSS3](https://img.shields.io/badge/CSS3-Responsive-blue)

## 🎮 Características del Juego

### ✨ Jugabilidad
- **Match 3 Clásico**: Combina 3 o más símbolos del Día de los Muertos
- **Patrones Especiales**: Detecta patrones en L y T para puntuaciones extra
- **Poderes Especiales**: Items de cruz que eliminan filas y columnas completas
- **Sistema de Niveles**: 10 niveles progresivos con dificultad creciente
- **Puntuación Dual**: Score por nivel y score total acumulado

### 🎨 Elementos Visuales
- **Símbolos Temáticos**: Calaveras, cempasúchil, velas, papel picado, copal y pan de muerto
- **Gráficos SVG**: Arte vectorial escalable y colorido
- **Calaveras Animadas**: 22+ calaveras decorativas que reaccionan al juego
- **Efectos de Partículas**: Explosiones y celebraciones visuales
- **Responsive Design**: Se adapta a cualquier tamaño de pantalla

### 🎵 Sistema de Audio
- **Música de Fondo**: Melodía arcade generada proceduralmente con temática mexicana
- **Efectos de Sonido**: Sonidos para matches, poderes especiales y fallos
- **Control de Audio**: Botón para silenciar/activar sonido
- **Web Audio API**: Generación de audio en tiempo real

### 📱 Compatibilidad
- **Responsive**: Funciona en desktop, tablet y móvil
- **Touch Support**: Optimizado para dispositivos táctiles
- **Cross-Browser**: Compatible con navegadores modernos
- **Progressive Enhancement**: Funciona sin audio si no está soportado

## 🚀 Instalación y Uso

### Requisitos Previos
- Navegador web moderno (Chrome, Firefox, Safari, Edge)
- Servidor web local (opcional pero recomendado)

### Instalación Rápida

1. **Clonar el repositorio**:
   ```bash
   git clone https://github.com/tu-usuario/dia-muertos-match3.git
   cd dia-muertos-match3
   ```

2. **Abrir el juego**:
   - **Opción A - Servidor Local** (recomendado):
     ```bash
     # Con Python 3
     python -m http.server 8000
     
     # Con Python 2
     python -m SimpleHTTPServer 8000
     
     # Con Node.js (si tienes http-server instalado)
     npx http-server
     
     # Con PHP
     php -S localhost:8000
     ```
     Luego abre `http://localhost:8000` en tu navegador.

   - **Opción B - Archivo Directo**:
     Abre `index.html` directamente en tu navegador (algunas funciones pueden estar limitadas).

### 🎯 Cómo Jugar

#### Controles Básicos
1. **Hacer Click/Tap**: Selecciona una ficha
2. **Segundo Click/Tap**: Selecciona una ficha adyacente para intercambiar
3. **Botón de Sonido**: Toggle audio on/off (esquina superior derecha)
4. **New Game**: Reinicia el juego completo

#### Objetivo
- **Combinar Símbolos**: Haz match de 3 o más símbolos iguales
- **Alcanzar el Objetivo**: Consigue la puntuación requerida antes de quedarte sin movimientos
- **Progresar**: Completa los 10 niveles para convertirte en "Maestro de los Muertos"

#### Puntuación
- **Match de 3**: 30 puntos
- **Match de 4+**: Puntos extra + item especial
- **Patrones L/T**: Bonus adicional
- **Poderes Especiales**: 100 puntos + eliminación masiva
- **Bonus de Movimientos**: 50 puntos por movimiento no usado

## 📁 Estructura del Proyecto

```
dia-muertos-match3/
├── index.html          # Página principal del juego
├── styles.css          # Estilos CSS responsive
├── game.js            # Lógica principal del juego
├── assets.js          # Gráficos SVG y recursos
├── audio.js           # Sistema de audio y música
├── README.md          # Este archivo
└── .kiro/             # Archivos de configuración del IDE
    └── specs/         # Especificaciones del proyecto
```

## 🎮 Sistema de Niveles

| Nivel | Descripción | Objetivo | Movimientos |
|-------|-------------|----------|-------------|
| 1 | Principiante | 500 pts | 30 |
| 2 | Intermedio | 800 pts | 25 |
| 3 | Avanzado | 1,200 pts | 22 |
| 4 | Experto | 1,600 pts | 20 |
| 5 | Maestro | 2,200 pts | 18 |
| 6 | Leyenda | 2,800 pts | 16 |
| 7 | Épico | 3,500 pts | 15 |
| 8 | Mítico | 4,500 pts | 14 |
| 9 | Divino | 5,500 pts | 13 |
| 10 | Maestro de los Muertos | 7,000 pts | 12 |

## 🛠️ Tecnologías Utilizadas

- **HTML5 Canvas**: Renderizado del juego
- **CSS3**: Estilos responsive y animaciones
- **JavaScript ES6+**: Lógica del juego
- **Web Audio API**: Generación de música y efectos
- **SVG**: Gráficos vectoriales escalables
- **Responsive Design**: Media queries para adaptabilidad

## 🎨 Características Técnicas

### Responsive Design
- **Breakpoints**: 360px, 480px, 768px, 1200px, 1920px
- **Canvas Dinámico**: Se redimensiona automáticamente
- **Touch Optimizado**: Eventos táctiles para móviles
- **Orientación**: Soporte para landscape y portrait

### Rendimiento
- **Animaciones Optimizadas**: RequestAnimationFrame
- **Gestión de Memoria**: Cleanup automático de partículas
- **Lazy Loading**: Carga de assets bajo demanda
- **Mobile Performance**: Animaciones reducidas en móviles

### Accesibilidad
- **Contraste**: Colores con buen contraste
- **Tamaños Táctiles**: Botones de al menos 44px
- **Feedback Visual**: Indicadores claros de estado
- **Fallbacks**: Funciona sin audio si no está disponible

## 🐛 Solución de Problemas

### El juego no carga
- Verifica que estés usando un servidor web local
- Revisa la consola del navegador para errores
- Asegúrate de que JavaScript esté habilitado

### No hay sonido
- Verifica que el botón de sonido no esté en mute (🔇)
- Algunos navegadores requieren interacción del usuario antes de reproducir audio
- Haz click en cualquier parte del juego para activar el audio

### Problemas de rendimiento
- Cierra otras pestañas del navegador
- En móviles, las animaciones se reducen automáticamente
- Actualiza tu navegador a la versión más reciente

### El juego no responde en móvil
- Asegúrate de que el zoom esté al 100%
- Verifica que no haya otros elementos interfiriendo con el touch
- Prueba en modo landscape si tienes problemas en portrait

## 🤝 Contribuciones

¡Las contribuciones son bienvenidas! Si quieres mejorar el juego:

1. Fork el repositorio
2. Crea una rama para tu feature (`git checkout -b feature/nueva-caracteristica`)
3. Commit tus cambios (`git commit -am 'Agrega nueva característica'`)
4. Push a la rama (`git push origin feature/nueva-caracteristica`)
5. Abre un Pull Request

### Ideas para Contribuir
- Nuevos símbolos o temas
- Más niveles o modos de juego
- Mejoras de accesibilidad
- Optimizaciones de rendimiento
- Traducciones a otros idiomas

## 📜 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 🙏 Créditos

- **Temática**: Inspirado en la tradición mexicana del Día de los Muertos
- **Gráficos**: SVG artwork original
- **Música**: Generada proceduralmente con Web Audio API
- **Desarrollo**: Creado con ❤️ para honrar a los muertos

## 📞 Soporte

Si encuentras algún problema o tienes sugerencias:

- Abre un [Issue](https://github.com/tu-usuario/dia-muertos-match3/issues)
- Contacta al desarrollador
- Revisa la documentación en este README

---

**¡Disfruta honrando a los muertos con este colorido juego Match 3! 🌺💀🎮**