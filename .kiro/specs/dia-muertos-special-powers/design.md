# Design Document - Sistema de Poderes Especiales Día de los Muertos

## Overview

Este documento describe la arquitectura modular para implementar un sistema avanzado de detección de patrones y poderes especiales en el juego Match-3 del Día de los Muertos. El diseño se enfoca en la extensibilidad, mantenibilidad y la experiencia cultural auténtica.

## Architecture

### Componentes Principales

```
DiaDeLosMuertosGame
├── PatternDetectionSystem
│   ├── LinePatternDetector
│   ├── LShapePatternDetector
│   ├── TShapePatternDetector
│   └── PatternRegistry
├── SpecialPowerSystem
│   ├── PowerFactory
│   ├── EffectManager
│   └── CombinationHandler
├── ThematicAssetManager
│   ├── SpecialItemAssets
│   ├── ParticleEffects
│   └── AnimationTemplates
└── VisualEffectSystem
    ├── ParticleSystem
    ├── AnimationController
    └── SkullReactionManager
```

## Components and Interfaces

### 1. PatternDetectionSystem

**Responsabilidad:** Detectar diferentes tipos de patrones en el tablero de juego.

```javascript
class PatternDetectionSystem {
    constructor() {
        this.detectors = new Map();
        this.patternRegistry = new PatternRegistry();
    }
    
    registerDetector(type, detector) {
        this.detectors.set(type, detector);
    }
    
    detectPatterns(board, matches) {
        const patterns = [];
        for (const [type, detector] of this.detectors) {
            patterns.push(...detector.detect(board, matches));
        }
        return patterns;
    }
}
```

#### LinePatternDetector
- Detecta líneas horizontales y verticales de 4 y 5+ elementos
- Diferencia entre patrones de línea simple y línea extendida
- Calcula posición óptima para crear el elemento especial

#### LShapePatternDetector
- Identifica patrones en forma de L en las 4 orientaciones
- Verifica que cada brazo tenga al menos 3 elementos
- Determina la esquina como punto de creación del poder especial

#### TShapePatternDetector
- Detecta patrones en forma de T en las 4 orientaciones
- Valida intersección perpendicular de al menos 3 elementos
- Calcula el centro como punto de creación del poder especial

### 2. SpecialPowerSystem

**Responsabilidad:** Gestionar la creación, activación y efectos de poderes especiales.

```javascript
class SpecialPowerSystem {
    constructor(game) {
        this.game = game;
        this.powerFactory = new PowerFactory();
        this.effectManager = new EffectManager();
        this.combinationHandler = new CombinationHandler();
    }
    
    createSpecialItem(pattern, position) {
        return this.powerFactory.create(pattern.type, position, pattern.metadata);
    }
    
    activatePower(specialItem, targetPosition = null) {
        const effect = this.effectManager.getEffect(specialItem.powerType);
        return effect.execute(this.game.board, specialItem, targetPosition);
    }
}
```

#### PowerFactory
- Implementa Factory Pattern para crear diferentes tipos de poderes
- Mapea patrones detectados a tipos de poderes específicos
- Configura propiedades visuales y funcionales de cada poder

#### EffectManager
- Gestiona la ejecución de efectos de poderes especiales
- Coordina animaciones visuales con cambios en el tablero
- Maneja la secuencia temporal de efectos complejos

#### CombinationHandler
- Detecta cuando dos poderes especiales interactúan
- Define reglas de combinación entre diferentes tipos de poderes
- Calcula efectos resultantes de combinaciones

### 3. ThematicAssetManager

**Responsabilidad:** Gestionar todos los assets visuales temáticos del Día de los Muertos.

```javascript
const SPECIAL_POWER_ASSETS = {
    HORIZONTAL_CANDLE: {
        svg: 'horizontalStripedCandle',
        particles: 'candleFlameParticles',
        sound: 'candleIgnition',
        colors: ['#ffd700', '#ff6b35', '#ff1744']
    },
    VERTICAL_CANDLE: {
        svg: 'verticalStripedCandle',
        particles: 'candleFlameParticles',
        sound: 'candleIgnition',
        colors: ['#ffd700', '#ff6b35', '#ff1744']
    },
    RAINBOW_COPAL: {
        svg: 'rainbowCopal',
        particles: 'copalSmokeParticles',
        sound: 'copalBurning',
        colors: ['#ff6b35', '#ffd700', '#9c27b0', '#00bcd4', '#4caf50']
    },
    EXPLOSIVE_CANDLE: {
        svg: 'explosiveCandle',
        particles: 'explosionSparks',
        sound: 'candleExplosion',
        colors: ['#ff1744', '#ffd700', '#ff6b35']
    },
    MARIGOLD_CROSS: {
        svg: 'marigoldCross',
        particles: 'petalParticles',
        sound: 'petalScatter',
        colors: ['#ffd700', '#ff8c00', '#ff6b35']
    }
};
```

### 4. VisualEffectSystem

**Responsabilidad:** Coordinar todos los efectos visuales y animaciones.

```javascript
class VisualEffectSystem {
    constructor(game) {
        this.game = game;
        this.particleSystem = new ParticleSystem();
        this.animationController = new AnimationController();
        this.skullReactionManager = new SkullReactionManager();
    }
    
    playPowerCreationEffect(specialItem) {
        this.animationController.playCreationAnimation(specialItem);
        this.particleSystem.createFormationParticles(specialItem);
        this.skullReactionManager.reactToSpecialCreation(specialItem);
    }
    
    playPowerActivationEffect(specialItem, affectedTiles) {
        this.animationController.playActivationAnimation(specialItem);
        this.particleSystem.createPowerParticles(specialItem, affectedTiles);
        this.skullReactionManager.reactToPowerActivation(specialItem);
    }
}
```

## Data Models

### Pattern Model
```javascript
class Pattern {
    constructor(type, tiles, metadata = {}) {
        this.type = type; // 'line_4', 'line_5', 'L_shape', 'T_shape'
        this.tiles = tiles; // Array de posiciones {row, col}
        this.metadata = metadata; // Información adicional específica del patrón
        this.creationPosition = this.calculateCreationPosition();
        this.powerType = this.determinePowerType();
    }
    
    calculateCreationPosition() {
        // Lógica para determinar dónde crear el elemento especial
    }
    
    determinePowerType() {
        // Mapeo de tipo de patrón a tipo de poder
    }
}
```

### SpecialItem Model
```javascript
class SpecialItem {
    constructor(powerType, position, visualConfig) {
        this.powerType = powerType;
        this.position = position;
        this.visualConfig = visualConfig;
        this.isSpecial = true;
        this.createdAt = Date.now();
        this.glowIntensity = 0;
        this.animationState = 'idle';
    }
    
    activate(game, targetPosition = null) {
        // Lógica de activación específica del tipo de poder
    }
}
```

### PowerEffect Model
```javascript
class PowerEffect {
    constructor(type, config) {
        this.type = type;
        this.config = config;
        this.duration = config.duration || 1000;
        this.particles = config.particles || [];
        this.sounds = config.sounds || [];
    }
    
    execute(board, sourceItem, targetPosition) {
        // Implementación del efecto específico
    }
}
```

## Error Handling

### Pattern Detection Errors
- Validación de patrones malformados
- Manejo de patrones superpuestos
- Resolución de conflictos entre múltiples patrones

### Power Activation Errors
- Validación de posiciones de activación
- Manejo de poderes en cascada
- Prevención de loops infinitos en combinaciones

### Visual Effect Errors
- Fallback para assets faltantes
- Degradación elegante de efectos complejos
- Optimización automática en dispositivos de bajo rendimiento

## Testing Strategy

### Unit Tests
- Cada detector de patrones individualmente
- Factory de poderes especiales
- Efectos de poderes individuales
- Cálculos de puntuación y combos

### Integration Tests
- Flujo completo de detección → creación → activación
- Combinaciones de múltiples poderes
- Sincronización de efectos visuales
- Reacciones de calaveras decorativas

### Performance Tests
- Detección de patrones en tableros complejos
- Renderizado de múltiples efectos simultáneos
- Gestión de memoria en sesiones largas
- Optimización para dispositivos móviles

### Cultural Authenticity Tests
- Validación de elementos temáticos
- Coherencia visual con tradiciones del Día de los Muertos
- Feedback de usuarios familiarizados con la cultura mexicana

## Implementation Phases

### Phase 1: Core Pattern Detection
- Implementar detectores básicos de líneas y formas
- Crear sistema de registro de patrones
- Establecer interfaz común para detectores

### Phase 2: Special Power System
- Desarrollar factory de poderes especiales
- Implementar efectos básicos de poderes
- Crear sistema de activación

### Phase 3: Visual Effects Integration
- Integrar sistema de partículas temáticas
- Implementar animaciones de creación y activación
- Conectar con reacciones de calaveras

### Phase 4: Advanced Combinations
- Implementar combinaciones de poderes
- Crear efectos visuales únicos para combinaciones
- Optimizar rendimiento de efectos complejos

### Phase 5: Polish and Optimization
- Refinar efectos visuales y sonoros
- Optimizar para diferentes dispositivos
- Realizar pruebas de autenticidad cultural