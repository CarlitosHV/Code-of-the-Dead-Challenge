# Implementation Plan - Sistema de Poderes Especiales Día de los Muertos

## Task Overview

Este plan convierte el diseño del sistema de poderes especiales en una serie de tareas de implementación incrementales. Cada tarea construye sobre las anteriores y termina con la integración completa del sistema.

- [x] 1. Crear assets SVG para poderes especiales temáticos
  - Diseñar SVGs de veladoras rayadas (horizontal y vertical) con llamas animadas
  - Crear SVG de copal arcoíris con efectos de humo multicolor
  - Diseñar SVG de veladora explosiva con chispas y efectos de fuego
  - Crear SVG de cruz de cempasúchil con pétalos flotantes
  - Implementar sistema de carga de assets especiales en assets.js
  - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5_

- [x] 2. Implementar sistema base de detección de patrones
  - [ ] 2.1 Crear clase PatternDetectionSystem como coordinador principal
    - Implementar registro de detectores de patrones
    - Crear interfaz común IPatternDetector para todos los detectores
    - Establecer estructura de datos Pattern para representar patrones detectados
    - _Requirements: 6.1, 6.2_

  - [ ] 2.2 Implementar LinePatternDetector para líneas de 4 y 5+ elementos
    - Detectar líneas horizontales de exactamente 4 elementos
    - Detectar líneas verticales de exactamente 4 elementos
    - Detectar líneas horizontales de 5 o más elementos
    - Detectar líneas verticales de 5 o más elementos
    - Calcular posición central óptima para crear elemento especial
    - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5_

  - [ ] 2.3 Implementar LShapePatternDetector para patrones en L
    - Detectar patrones L en las 4 orientaciones posibles (↰ ↱ ↲ ↳)
    - Validar que cada brazo de la L tenga al menos 3 elementos
    - Verificar conexión válida en la esquina de la L
    - Calcular posición de la esquina como punto de creación
    - _Requirements: 2.1, 2.2, 2.3, 2.4_

  - [ ] 2.4 Implementar TShapePatternDetector para patrones en T
    - Detectar patrones T en las 4 orientaciones posibles (⊥ ⊤ ⊣ ⊢)
    - Validar línea principal de al menos 3 elementos
    - Validar línea perpendicular de al menos 3 elementos
    - Calcular centro de intersección como punto de creación
    - _Requirements: 3.1, 3.2, 3.3, 3.4_

- [ ] 3. Crear sistema de poderes especiales
  - [ ] 3.1 Implementar PowerFactory para creación de elementos especiales
    - Crear factory pattern para diferentes tipos de poderes
    - Mapear patrones detectados a tipos de poderes específicos
    - Configurar propiedades visuales y funcionales de cada poder
    - Implementar creación de SpecialItem con configuración temática
    - _Requirements: 6.3, 6.4_

  - [ ] 3.2 Implementar EffectManager para ejecución de poderes
    - Crear sistema de efectos para Veladora Rayada Horizontal (elimina fila)
    - Implementar efecto de Veladora Rayada Vertical (elimina columna)
    - Crear efecto de Copal Arcoíris (elimina todos del mismo tipo)
    - Implementar efecto de Veladora Explosiva (área 3x3)
    - Crear efecto de Cruz de Cempasúchil (fila y columna completas)
    - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5_

  - [ ] 3.3 Integrar detección de patrones con creación de poderes
    - Conectar PatternDetectionSystem con PowerFactory
    - Implementar lógica de creación de elementos especiales en posiciones calculadas
    - Manejar múltiples patrones simultáneos sin conflictos
    - Actualizar función findMatches para usar nuevo sistema de detección
    - _Requirements: 6.5_

- [ ] 4. Implementar efectos visuales avanzados
  - [ ] 4.1 Crear sistema de partículas temáticas
    - Implementar partículas de llama para veladoras
    - Crear partículas de humo multicolor para copal
    - Diseñar partículas de chispas doradas para explosiones
    - Implementar partículas de pétalos para cruz de cempasúchil
    - _Requirements: 7.2_

  - [ ] 4.2 Implementar animaciones de creación y activación
    - Crear animación de aparición con rotación y brillo para elementos especiales
    - Implementar efectos de anticipación antes de activar poderes destructivos
    - Sincronizar efectos visuales con reacciones de calaveras decorativas
    - Escalar intensidad de efectos basado en multiplicador de combo
    - _Requirements: 7.1, 7.3, 7.4, 7.5_

  - [ ] 4.3 Integrar efectos especiales en el renderizado del juego
    - Actualizar función draw para mostrar efectos de brillo en elementos especiales
    - Implementar renderizado de partículas temáticas específicas
    - Crear sistema de capas para efectos visuales complejos
    - Optimizar rendimiento de efectos múltiples simultáneos
    - _Requirements: 7.1, 7.2_

- [ ] 5. Implementar sistema de combinaciones de poderes
  - [ ] 5.1 Crear CombinationHandler para detectar interacciones
    - Detectar cuando dos elementos especiales adyacentes son intercambiados
    - Implementar lógica de activación simultánea de poderes
    - Crear sistema de reglas para diferentes tipos de combinaciones
    - _Requirements: 8.1_

  - [ ] 5.2 Implementar combinaciones específicas de poderes
    - Veladora Rayada + Veladora Rayada = Cruz Gigante (elimina fila y columna)
    - Veladora Explosiva + Copal Arcoíris = conversión masiva a explosivos
    - Crear efectos visuales únicos para cada combinación
    - Calcular puntuaciones bonus exponenciales para combinaciones
    - _Requirements: 8.2, 8.3, 8.4, 8.5_

  - [ ] 5.3 Integrar combinaciones en el flujo principal del juego
    - Actualizar handleTileClick para detectar intercambios de elementos especiales
    - Modificar processMatches para manejar activaciones de combinaciones
    - Crear sistema de cola para efectos en cascada
    - _Requirements: 8.1, 8.2, 8.3_

- [ ] 6. Actualizar interfaz y feedback del jugador
  - [ ] 6.1 Mejorar indicadores visuales de elementos especiales
    - Implementar efectos de brillo pulsante más prominentes
    - Crear indicadores visuales para diferentes tipos de poderes
    - Añadir tooltips o hints sobre efectos de poderes especiales
    - _Requirements: 7.1_

  - [ ] 6.2 Integrar reacciones de calaveras con nuevos poderes
    - Actualizar celebrateSkulls para reaccionar a creación de poderes especiales
    - Crear reacciones específicas para diferentes tipos de poderes
    - Implementar celebraciones especiales para combinaciones de poderes
    - _Requirements: 7.4_

  - [ ] 6.3 Actualizar sistema de puntuación para poderes especiales
    - Implementar bonificaciones específicas para cada tipo de poder
    - Crear multiplicadores especiales para combinaciones de poderes
    - Actualizar display de puntuación para mostrar bonos de poderes especiales
    - _Requirements: 8.4_

- [ ]* 7. Optimización y pulido
  - [ ]* 7.1 Optimizar rendimiento del sistema de detección
    - Implementar cache para patrones detectados frecuentemente
    - Optimizar algoritmos de detección para tableros grandes
    - Crear sistema de pooling para objetos Pattern reutilizables
    - _Requirements: 6.5_

  - [ ]* 7.2 Pulir efectos visuales y sonoros
    - Refinar timing de animaciones para mayor impacto visual
    - Implementar efectos de sonido temáticos para cada poder
    - Crear transiciones suaves entre diferentes estados de elementos
    - _Requirements: 7.1, 7.2, 7.3_

  - [ ]* 7.3 Implementar configuración de accesibilidad
    - Crear opciones para reducir efectos visuales intensos
    - Implementar alternativas de alto contraste para elementos especiales
    - Añadir opciones de configuración de velocidad de animaciones
    - _Requirements: 7.5_

- [ ] 8. Testing y validación del sistema
  - [ ]* 8.1 Crear tests unitarios para detectores de patrones
    - Test de LinePatternDetector con diferentes configuraciones de tablero
    - Test de LShapePatternDetector en todas las orientaciones
    - Test de TShapePatternDetector con casos edge
    - Validar cálculos de posiciones de creación de elementos especiales
    - _Requirements: 1.1, 1.2, 1.3, 1.4, 2.1, 2.2, 2.3, 3.1, 3.2, 3.3_

  - [ ]* 8.2 Crear tests de integración para sistema completo
    - Test de flujo completo: detección → creación → activación
    - Test de combinaciones múltiples de poderes
    - Test de sincronización de efectos visuales
    - Validar manejo de casos edge y errores
    - _Requirements: 6.5, 8.1, 8.2, 8.3_

  - [ ]* 8.3 Realizar pruebas de rendimiento
    - Test de detección de patrones en tableros complejos
    - Benchmark de renderizado de múltiples efectos simultáneos
    - Validar gestión de memoria en sesiones largas
    - Optimizar para dispositivos móviles de gama baja
    - _Requirements: 7.5_