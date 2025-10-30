# Requirements Document - Sistema de Poderes Especiales Día de los Muertos

## Introduction

Este documento define los requerimientos para un sistema avanzado de detección de patrones y poderes especiales en el juego Match-3 temático del Día de los Muertos. El sistema debe detectar múltiples tipos de combinaciones (líneas de 4, líneas de 5, formas L y T) y crear elementos especiales temáticos con efectos únicos.

## Glossary

- **Match_System**: Sistema principal de detección de combinaciones de elementos
- **Special_Item**: Elemento especial creado cuando se detecta un patrón específico
- **Pattern_Detector**: Módulo que identifica diferentes tipos de patrones en el tablero
- **Power_Manager**: Gestor de efectos y poderes especiales
- **Themed_Element**: Elemento visual temático del Día de los Muertos
- **L_Pattern**: Patrón en forma de L con al menos 5 elementos conectados
- **T_Pattern**: Patrón en forma de T con al menos 5 elementos conectados
- **Line_Pattern**: Patrón lineal horizontal o vertical de 4 o más elementos
- **Explosion_Effect**: Efecto que elimina elementos en un área específica
- **Line_Clear_Effect**: Efecto que elimina una línea completa del tablero
- **Color_Bomb_Effect**: Efecto que elimina todos los elementos de un color específico

## Requirements

### Requirement 1: Detección de Patrones Lineales

**User Story:** Como jugador, quiero que el juego detecte cuando formo líneas de 4 o 5 elementos iguales, para que se creen poderes especiales correspondientes.

#### Acceptance Criteria

1. WHEN el jugador forma una línea horizontal de exactamente 4 elementos iguales, THE Pattern_Detector SHALL identificar el patrón como "horizontal_line_4"
2. WHEN el jugador forma una línea vertical de exactamente 4 elementos iguales, THE Pattern_Detector SHALL identificar el patrón como "vertical_line_4"
3. WHEN el jugador forma una línea horizontal de 5 o más elementos iguales, THE Pattern_Detector SHALL identificar el patrón como "horizontal_line_5"
4. WHEN el jugador forma una línea vertical de 5 o más elementos iguales, THE Pattern_Detector SHALL identificar el patrón como "vertical_line_5"
5. THE Match_System SHALL crear un Special_Item en la posición central del patrón detectado

### Requirement 2: Detección de Patrones en Forma L

**User Story:** Como jugador, quiero que el juego detecte cuando formo patrones en L con elementos iguales, para que se active un poder especial de explosión.

#### Acceptance Criteria

1. WHEN el jugador conecta elementos formando una L con al menos 5 elementos totales, THE Pattern_Detector SHALL identificar el patrón como "L_pattern"
2. THE Pattern_Detector SHALL verificar que la L tenga al menos 3 elementos en cada brazo
3. THE Pattern_Detector SHALL detectar L en las 4 orientaciones posibles (↰ ↱ ↲ ↳)
4. THE Match_System SHALL crear un Special_Item tipo "bomb" en la esquina de la L
5. THE Special_Item SHALL tener temática de "Veladora Explosiva" con efectos visuales de fuego

### Requirement 3: Detección de Patrones en Forma T

**User Story:** Como jugador, quiero que el juego detecte cuando formo patrones en T con elementos iguales, para que se active un poder especial de línea cruzada.

#### Acceptance Criteria

1. WHEN el jugador conecta elementos formando una T con al menos 5 elementos totales, THE Pattern_Detector SHALL identificar el patrón como "T_pattern"
2. THE Pattern_Detector SHALL verificar que la T tenga al menos 3 elementos en la línea principal y 3 en la perpendicular
3. THE Pattern_Detector SHALL detectar T en las 4 orientaciones posibles (⊥ ⊤ ⊣ ⊢)
4. THE Match_System SHALL crear un Special_Item tipo "cross_bomb" en el centro de la T
5. THE Special_Item SHALL tener temática de "Cruz de Cempasúchil" con efectos visuales florales

### Requirement 4: Poderes Especiales Temáticos

**User Story:** Como jugador, quiero que los poderes especiales tengan elementos visuales auténticos del Día de los Muertos, para que la experiencia sea culturalmente inmersiva.

#### Acceptance Criteria

1. WHEN se crea un Special_Item de línea horizontal, THE Power_Manager SHALL generar una "Veladora Rayada Horizontal" con llama animada
2. WHEN se crea un Special_Item de línea vertical, THE Power_Manager SHALL generar una "Veladora Rayada Vertical" con llama animada
3. WHEN se crea un Special_Item de color bomb, THE Power_Manager SHALL generar un "Copal Arcoíris" con humo multicolor
4. WHEN se crea un Special_Item de bomba, THE Power_Manager SHALL generar una "Veladora Explosiva" con chispas doradas
5. WHEN se crea un Special_Item de cruz, THE Power_Manager SHALL generar una "Cruz de Cempasúchil" con pétalos flotantes

### Requirement 5: Efectos de Poderes Especiales

**User Story:** Como jugador, quiero que cada poder especial tenga un efecto único y visualmente impactante, para que se sienta satisfactorio usarlos.

#### Acceptance Criteria

1. WHEN se activa una "Veladora Rayada Horizontal", THE Power_Manager SHALL eliminar toda la fila horizontal donde se encuentra
2. WHEN se activa una "Veladora Rayada Vertical", THE Power_Manager SHALL eliminar toda la columna vertical donde se encuentra
3. WHEN se activa un "Copal Arcoíris", THE Power_Manager SHALL eliminar todos los elementos del mismo tipo que el elemento intercambiado
4. WHEN se activa una "Veladora Explosiva", THE Power_Manager SHALL eliminar todos los elementos en un área de 3x3 alrededor
5. WHEN se activa una "Cruz de Cempasúchil", THE Power_Manager SHALL eliminar la fila y columna completas que se cruzan en el elemento

### Requirement 6: Sistema Modular de Detección

**User Story:** Como desarrollador, quiero que el sistema de detección sea modular y extensible, para que sea fácil agregar nuevos patrones y poderes.

#### Acceptance Criteria

1. THE Pattern_Detector SHALL implementar una interfaz común para todos los detectores de patrones
2. THE Pattern_Detector SHALL permitir registrar nuevos tipos de patrones sin modificar código existente
3. THE Power_Manager SHALL usar un sistema de factory pattern para crear Special_Items
4. THE Power_Manager SHALL permitir configurar efectos visuales y funcionales independientemente
5. THE Match_System SHALL procesar múltiples patrones simultáneamente sin conflictos

### Requirement 7: Efectos Visuales Avanzados

**User Story:** Como jugador, quiero que los efectos especiales tengan animaciones fluidas y partículas temáticas, para que la experiencia visual sea espectacular.

#### Acceptance Criteria

1. WHEN se crea un Special_Item, THE Power_Manager SHALL mostrar una animación de aparición con rotación y brillo
2. WHEN se activa un poder especial, THE Power_Manager SHALL generar partículas temáticas específicas del tipo
3. THE Power_Manager SHALL crear efectos de anticipación antes de activar poderes destructivos
4. THE Power_Manager SHALL sincronizar efectos visuales con las reacciones de las calaveras decorativas
5. THE Power_Manager SHALL escalar la intensidad de efectos basado en el multiplicador de combo actual

### Requirement 8: Combinaciones de Poderes

**User Story:** Como jugador, quiero poder combinar diferentes poderes especiales, para crear efectos aún más espectaculares y estratégicos.

#### Acceptance Criteria

1. WHEN dos Special_Items adyacentes son intercambiados, THE Power_Manager SHALL activar ambos poderes simultáneamente
2. WHEN una "Veladora Rayada" impacta otra "Veladora Rayada", THE Power_Manager SHALL crear un efecto de "Cruz Gigante"
3. WHEN una "Veladora Explosiva" impacta un "Copal Arcoíris", THE Power_Manager SHALL convertir todos los elementos del tablero del mismo tipo en "Veladora Explosiva"
4. THE Power_Manager SHALL calcular puntuaciones bonus exponenciales para combinaciones de poderes
5. THE Power_Manager SHALL crear efectos visuales únicos para cada tipo de combinación de poderes
