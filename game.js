class DiaDeLosMuertosGame {
    constructor() {
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.gridSize = 8;
        this.baseTileSize = 60;
        this.tileSize = 60;
        this.score = 0;
        this.moves = 30;
        this.selectedTile = null;
        this.board = [];
        this.animating = false;
        this.animations = [];
        this.particles = [];
        
        // Sistema de niveles
        this.currentLevel = 1;
        this.targetScore = 500;
        this.baseMovesPerLevel = 30;
        this.levelCompleted = false;
        this.gameCompleted = false;
        this.totalScore = 0; // Score acumulado total de todos los niveles
        
        // Configuración de niveles
        this.levels = [
            { level: 1, targetScore: 500, moves: 30, description: "Nivel Principiante" },
            { level: 2, targetScore: 800, moves: 25, description: "Nivel Intermedio" },
            { level: 3, targetScore: 1200, moves: 22, description: "Nivel Avanzado" },
            { level: 4, targetScore: 1600, moves: 20, description: "Nivel Experto" },
            { level: 5, targetScore: 2200, moves: 18, description: "Nivel Maestro" },
            { level: 6, targetScore: 2800, moves: 16, description: "Nivel Leyenda" },
            { level: 7, targetScore: 3500, moves: 15, description: "Nivel Épico" },
            { level: 8, targetScore: 4500, moves: 14, description: "Nivel Mítico" },
            { level: 9, targetScore: 5500, moves: 13, description: "Nivel Divino" },
            { level: 10, targetScore: 7000, moves: 12, description: "Maestro de los Muertos" }
        ];
        
        // Variables para responsive design
        this.canvasSize = 480;
        this.scaleFactor = 1;
        
        // Referencias a las calaveras principales (centrales)
        this.leftSkull = document.getElementById('leftSkull');
        this.rightSkull = document.getElementById('rightSkull');
        this.leftSkullSvg = document.getElementById('leftSkullSvg');
        this.rightSkullSvg = document.getElementById('rightSkullSvg');
        
        // Referencias a todas las calaveras pequeñas
        this.allSkulls = [];
        this.allSkullSvgs = [];
        
        // Inicializar referencias a todas las calaveras (sin las superiores)
        for (let i = 1; i <= 15; i++) {
            const skullElement = document.getElementById(`leftSkull${i}`) || 
                                document.getElementById(`rightSkull${i}`) || 
                                document.getElementById(`bottomSkull${i}`);
            const skullSvg = document.getElementById(`leftSkull${i}Svg`) || 
                            document.getElementById(`rightSkull${i}Svg`) || 
                            document.getElementById(`bottomSkull${i}Svg`);
            
            if (skullElement && skullSvg) {
                this.allSkulls.push(skullElement);
                this.allSkullSvgs.push(skullSvg);
            }
        }
        
        // Buscar calaveras por ID específico (sin las superiores)
        const skullIds = [
            'leftSkull1', 'leftSkull2', 'leftSkull3', 'rightSkull1', 'rightSkull2', 'rightSkull3', 'rightSkull4',
            'bottomSkull1', 'bottomSkull2', 'bottomSkull3', 'bottomSkull4', 'bottomSkull5', 'bottomSkull6', 'bottomSkull7'
        ];
        
        this.allSkulls = [];
        this.allSkullSvgs = [];
        
        skullIds.forEach(id => {
            const skull = document.getElementById(id);
            const skullSvg = document.getElementById(id + 'Svg');
            if (skull && skullSvg) {
                this.allSkulls.push(skull);
                this.allSkullSvgs.push(skullSvg);
            }
        });
        
        // Día de los Muertos themed symbols with SVG
        this.symbolNames = ['skull', 'marigold', 'candle', 'papel', 'copal', 'bread'];
        this.symbolImages = {};
        this.colors = ['#ff6b35', '#ffd700', '#ff1744', '#9c27b0', '#00bcd4', '#4caf50'];
        
        // Inicializar sistema de audio
        this.audioManager = new AudioManager();
        
        this.loadAssets().then(() => {
            this.setupResponsiveCanvas();
            this.initGame();
            this.setupEventListeners();
            this.setupSideSkulls();
            this.gameLoop();
        });
    }
    
    setupResponsiveCanvas() {
        // Calcular el tamaño óptimo del canvas basado en el viewport
        const maxWidth = Math.min(window.innerWidth - 40, 480);
        const maxHeight = Math.min(window.innerHeight - 200, 480);
        const size = Math.min(maxWidth, maxHeight);
        
        // Asegurar que el tamaño sea divisible por el gridSize para tiles perfectos
        this.canvasSize = Math.floor(size / this.gridSize) * this.gridSize;
        this.tileSize = this.canvasSize / this.gridSize;
        this.scaleFactor = this.tileSize / this.baseTileSize;
        
        // Aplicar el tamaño al canvas
        this.canvas.width = this.canvasSize;
        this.canvas.height = this.canvasSize;
        this.canvas.style.width = this.canvasSize + 'px';
        this.canvas.style.height = this.canvasSize + 'px';
        
        // Configurar el contexto para alta resolución
        const dpr = window.devicePixelRatio || 1;
        if (dpr > 1) {
            this.canvas.width = this.canvasSize * dpr;
            this.canvas.height = this.canvasSize * dpr;
            this.ctx.scale(dpr, dpr);
        }
    }

    async loadAssets() {
        for (let i = 0; i < this.symbolNames.length; i++) {
            const symbolName = this.symbolNames[i];
            this.symbolImages[i] = await svgToCanvas(SVG_ASSETS[symbolName], this.tileSize - 10);
        }
        
        // Cargar item especial de cruz para líneas de 4
        this.symbolImages['special_cross'] = await svgToCanvas(SVG_ASSETS.crossCandle, this.tileSize - 10);
    }
    
    setupSideSkulls() {
        // Insertar SVGs de las calaveras principales (centrales)
        this.leftSkullSvg.innerHTML = SVG_ASSETS.sideSkullLeft;
        this.rightSkullSvg.innerHTML = SVG_ASSETS.sideSkullRight;
        
        // Insertar SVGs variados para todas las calaveras pequeñas
        const skullTypes = ['cornerSkull', 'smallSkull1', 'smallSkull2', 'mediumSkull1', 'tinySkull'];
        
        this.allSkullSvgs.forEach((skullSvg, index) => {
            const randomType = skullTypes[index % skullTypes.length];
            skullSvg.innerHTML = SVG_ASSETS[randomType];
        });
    }
    
    celebrateSkulls() {
        // Reproducir sonido de match exitoso
        this.audioManager.playMatchSound();
        
        // Solo las calaveras principales (centrales) hacen shake
        this.leftSkull.classList.add('shake');
        this.rightSkull.classList.add('shake');
        
        // Todas las calaveras pequeñas celebran
        this.allSkulls.forEach(skull => {
            skull.classList.add('celebrate');
        });
        
        // Cambiar algunas calaveras a felices temporalmente (no todas)
        const happySkulls = Math.floor(this.allSkullSvgs.length / 2);
        for (let i = 0; i < happySkulls; i++) {
            const randomIndex = Math.floor(Math.random() * this.allSkullSvgs.length);
            this.allSkullSvgs[randomIndex].innerHTML = SVG_ASSETS.happySkull;
        }
        
        // Remover clases y restaurar después de la animación
        setTimeout(() => {
            this.leftSkull.classList.remove('shake');
            this.rightSkull.classList.remove('shake');
            
            this.allSkulls.forEach(skull => {
                skull.classList.remove('celebrate');
            });
            
            // Restaurar calaveras normales
            this.setupSideSkulls();
        }, 1000);
        
        // Cambiar colores de los ojos de las calaveras principales
        this.animateSkullEyes();
    }
    
    laughSkulls() {
        // Reproducir sonido de fallo
        this.audioManager.playFailSound();
        
        // Todas las calaveras pequeñas se ríen
        this.allSkulls.forEach(skull => {
            skull.classList.add('laugh');
        });
        
        // Cambiar la mayoría de calaveras a riéndose
        const laughingSkulls = Math.floor(this.allSkullSvgs.length * 0.7);
        for (let i = 0; i < laughingSkulls; i++) {
            const randomIndex = Math.floor(Math.random() * this.allSkullSvgs.length);
            this.allSkullSvgs[randomIndex].innerHTML = SVG_ASSETS.laughingSkull;
        }
        
        // Las calaveras principales (centrales) NO se ríen, solo se inclinan ligeramente
        this.leftSkull.style.transform = 'scale(1.05) rotate(3deg)';
        this.rightSkull.style.transform = 'scale(1.05) rotate(-3deg)';
        
        // Remover efectos después de la animación
        setTimeout(() => {
            this.allSkulls.forEach(skull => {
                skull.classList.remove('laugh');
            });
            
            // Restaurar calaveras normales
            this.setupSideSkulls();
            
            // Restaurar calaveras principales
            this.leftSkull.style.transform = '';
            this.rightSkull.style.transform = '';
        }, 1500);
    }
    
    animateSkullEyes() {
        const leftEyes = this.leftSkullSvg.querySelectorAll('circle[fill="#ff6b35"]');
        const rightEyes = this.rightSkullSvg.querySelectorAll('circle[fill="#9c27b0"]');
        
        // Cambiar color de ojos temporalmente
        leftEyes.forEach(eye => {
            eye.setAttribute('fill', '#ff1744');
            setTimeout(() => eye.setAttribute('fill', '#ff6b35'), 300);
        });
        
        rightEyes.forEach(eye => {
            eye.setAttribute('fill', '#ffd700');
            setTimeout(() => eye.setAttribute('fill', '#9c27b0'), 300);
        });
    }
    
    updateBoardPositions() {
        // Actualizar posiciones de todas las fichas cuando cambia el tamaño
        for (let row = 0; row < this.gridSize; row++) {
            for (let col = 0; col < this.gridSize; col++) {
                if (this.board[row] && this.board[row][col]) {
                    this.board[row][col].x = col * this.tileSize;
                    this.board[row][col].y = row * this.tileSize;
                    this.board[row][col].targetX = col * this.tileSize;
                    this.board[row][col].targetY = row * this.tileSize;
                }
            }
        }
    }

    initGame() {
        this.board = [];
        this.animations = [];
        this.particles = [];
        this.levelCompleted = false;
        this.gameCompleted = false;
        
        // Reiniciar score del nivel actual (no el total)
        this.score = 0;
        
        // Configurar nivel actual
        this.setupCurrentLevel();
        
        for (let row = 0; row < this.gridSize; row++) {
            this.board[row] = [];
            for (let col = 0; col < this.gridSize; col++) {
                this.board[row][col] = {
                    type: this.getRandomSymbol(),
                    x: col * this.tileSize,
                    y: row * this.tileSize,
                    targetX: col * this.tileSize,
                    targetY: row * this.tileSize,
                    scale: 1,
                    rotation: 0,
                    alpha: 1
                };
            }
        }
        
        // Remove initial matches
        this.removeInitialMatches();
        this.updateDisplay();
    }
    
    getRandomSymbol() {
        return Math.floor(Math.random() * this.symbolNames.length);
    }
    
    removeInitialMatches() {
        let hasMatches = true;
        while (hasMatches) {
            hasMatches = false;
            
            // Check for horizontal matches
            for (let row = 0; row < this.gridSize; row++) {
                for (let col = 0; col < this.gridSize - 2; col++) {
                    if (this.board[row][col].type === this.board[row][col + 1].type && 
                        this.board[row][col].type === this.board[row][col + 2].type) {
                        this.board[row][col].type = this.getRandomSymbol();
                        hasMatches = true;
                    }
                }
            }
            
            // Check for vertical matches
            for (let row = 0; row < this.gridSize - 2; row++) {
                for (let col = 0; col < this.gridSize; col++) {
                    if (this.board[row][col].type === this.board[row + 1][col].type && 
                        this.board[row][col].type === this.board[row + 2][col].type) {
                        this.board[row][col].type = this.getRandomSymbol();
                        hasMatches = true;
                    }
                }
            }
        }
    }
    
    setupEventListeners() {
        // Click/touch events para el canvas
        const handleInteraction = (e) => {
            if (this.animating || this.moves <= 0) return;
            
            const rect = this.canvas.getBoundingClientRect();
            const clientX = e.clientX || (e.touches && e.touches[0].clientX);
            const clientY = e.clientY || (e.touches && e.touches[0].clientY);
            
            const x = (clientX - rect.left) * (this.canvasSize / rect.width);
            const y = (clientY - rect.top) * (this.canvasSize / rect.height);
            
            const col = Math.floor(x / this.tileSize);
            const row = Math.floor(y / this.tileSize);
            
            if (row >= 0 && row < this.gridSize && col >= 0 && col < this.gridSize) {
                this.handleTileClick(row, col);
            }
        };
        
        this.canvas.addEventListener('click', handleInteraction);
        this.canvas.addEventListener('touchstart', (e) => {
            e.preventDefault();
            handleInteraction(e);
        });
        
        // Botón de reset
        document.getElementById('resetBtn').addEventListener('click', () => {
            this.resetGame();
        });
        
        // Botones de modales
        document.getElementById('nextLevelBtn').addEventListener('click', () => {
            this.nextLevel();
        });
        
        document.getElementById('restartBtn').addEventListener('click', () => {
            this.resetGame();
        });
        
        document.getElementById('playAgainBtn').addEventListener('click', () => {
            this.resetGame();
        });
        
        // Listener para redimensionar ventana
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                this.setupResponsiveCanvas();
                this.loadAssets().then(() => {
                    this.updateBoardPositions();
                });
            }, 250);
        });
        
        // Prevenir zoom en dispositivos móviles
        document.addEventListener('touchmove', (e) => {
            if (e.scale !== 1) {
                e.preventDefault();
            }
        }, { passive: false });
    }
    
    handleTileClick(row, col) {
        if (!this.selectedTile) {
            this.selectedTile = { row, col };
        } else {
            const { row: selectedRow, col: selectedCol } = this.selectedTile;
            
            // Check if we're trying to activate a special item
            const selectedTileData = this.board[selectedRow][selectedCol];
            const clickedTileData = this.board[row][col];
            
            if (selectedTileData.isSpecial && selectedTileData.specialType === 'cross') {
                // Activar poder especial de cruz en la posición clickeada
                this.activateCrossPower(selectedRow, selectedCol, row, col);
                this.selectedTile = null;
                return;
            } else if (clickedTileData.isSpecial && clickedTileData.specialType === 'cross') {
                // Activar poder especial de cruz en la posición seleccionada
                this.activateCrossPower(row, col, selectedRow, selectedCol);
                this.selectedTile = null;
                return;
            }
            
            // Check if tiles are adjacent for normal swap
            if (this.areAdjacent(selectedRow, selectedCol, row, col)) {
                this.swapTiles(selectedRow, selectedCol, row, col);
                this.selectedTile = null;
            } else {
                this.selectedTile = { row, col };
            }
        }
    }
    
    areAdjacent(row1, col1, row2, col2) {
        const rowDiff = Math.abs(row1 - row2);
        const colDiff = Math.abs(col1 - col2);
        return (rowDiff === 1 && colDiff === 0) || (rowDiff === 0 && colDiff === 1);
    }
    
    swapTiles(row1, col1, row2, col2) {
        this.animating = true;
        
        // Create swap animation
        const tile1 = this.board[row1][col1];
        const tile2 = this.board[row2][col2];
        
        const swapAnimation = {
            type: 'swap',
            tile1: { ...tile1, row: row1, col: col1 },
            tile2: { ...tile2, row: row2, col: col2 },
            progress: 0,
            duration: 300
        };
        
        this.animations.push(swapAnimation);
        
        // Temporarily swap for match checking
        const temp = this.board[row1][col1];
        this.board[row1][col1] = this.board[row2][col2];
        this.board[row2][col2] = temp;
        
        // Update positions
        this.board[row1][col1].targetX = col1 * this.tileSize;
        this.board[row1][col1].targetY = row1 * this.tileSize;
        this.board[row2][col2].targetX = col2 * this.tileSize;
        this.board[row2][col2].targetY = row2 * this.tileSize;
        
        setTimeout(() => {
            // First find regular line matches
            const lineResult = this.findMatches();
            
            // Then find L and T patterns
            const patternResult = this.findLAndTPatterns();
            
            // Combine all matches, avoiding duplicates
            const allMatchesSet = new Set();
            
            // Add line matches
            lineResult.matches.forEach(match => {
                allMatchesSet.add(`${match.row},${match.col}`);
            });
            
            // Add pattern matches
            patternResult.matches.forEach(match => {
                allMatchesSet.add(`${match.row},${match.col}`);
            });
            
            // Convert back to array
            const allMatches = [];
            allMatchesSet.forEach(key => {
                const [row, col] = key.split(',').map(Number);
                allMatches.push({ row, col });
            });
            
            // Combine all special patterns
            const allSpecialPatterns = [...(lineResult.specialPatterns || []), ...patternResult.patterns];
            
            if (allMatches.length > 0) {
                this.moves--;
                this.processMatches(allMatches, allSpecialPatterns);
            } else {
                // ¡Las calaveras se ríen cuando el jugador falla!
                this.laughSkulls();
                
                // Swap back with animation
                const temp = this.board[row1][col1];
                this.board[row1][col1] = this.board[row2][col2];
                this.board[row2][col2] = temp;
                
                this.board[row1][col1].targetX = col1 * this.tileSize;
                this.board[row1][col1].targetY = row1 * this.tileSize;
                this.board[row2][col2].targetX = col2 * this.tileSize;
                this.board[row2][col2].targetY = row2 * this.tileSize;
                
                setTimeout(() => {
                    this.animating = false;
                }, 300);
            }
        }, 300);
    }
    
    findMatches() {
        const matches = new Set();
        const matchedPositions = new Set();
        const specialPatterns = []; // Para almacenar patrones especiales como líneas de 4
        
        // Find horizontal matches
        for (let row = 0; row < this.gridSize; row++) {
            let count = 1;
            let currentSymbol = this.board[row][0].type;
            let startCol = 0;
            
            for (let col = 1; col < this.gridSize; col++) {
                if (this.board[row][col].type === currentSymbol) {
                    count++;
                } else {
                    if (count >= 3) {
                        // Detectar línea de exactamente 4 para crear item especial
                        if (count === 4) {
                            const centerCol = startCol + Math.floor(count / 2);
                            specialPatterns.push({
                                type: 'line_4_horizontal',
                                centerPosition: { row, col: centerCol },
                                tiles: []
                            });
                        }
                        
                        for (let i = startCol; i < col; i++) {
                            const key = `${row},${i}`;
                            matches.add(key);
                            matchedPositions.add(key);
                        }
                    }
                    count = 1;
                    currentSymbol = this.board[row][col].type;
                    startCol = col;
                }
            }
            
            if (count >= 3) {
                // Detectar línea de exactamente 4 para crear item especial
                if (count === 4) {
                    const centerCol = startCol + Math.floor(count / 2);
                    specialPatterns.push({
                        type: 'line_4_horizontal',
                        centerPosition: { row, col: centerCol },
                        tiles: []
                    });
                }
                
                for (let i = startCol; i < this.gridSize; i++) {
                    const key = `${row},${i}`;
                    matches.add(key);
                    matchedPositions.add(key);
                }
            }
        }
        
        // Find vertical matches
        for (let col = 0; col < this.gridSize; col++) {
            let count = 1;
            let currentSymbol = this.board[0][col].type;
            let startRow = 0;
            
            for (let row = 1; row < this.gridSize; row++) {
                if (this.board[row][col].type === currentSymbol) {
                    count++;
                } else {
                    if (count >= 3) {
                        // Detectar línea de exactamente 4 para crear item especial
                        if (count === 4) {
                            const centerRow = startRow + Math.floor(count / 2);
                            specialPatterns.push({
                                type: 'line_4_vertical',
                                centerPosition: { row: centerRow, col },
                                tiles: []
                            });
                        }
                        
                        for (let i = startRow; i < row; i++) {
                            const key = `${i},${col}`;
                            matches.add(key);
                            matchedPositions.add(key);
                        }
                    }
                    count = 1;
                    currentSymbol = this.board[row][col].type;
                    startRow = row;
                }
            }
            
            if (count >= 3) {
                // Detectar línea de exactamente 4 para crear item especial
                if (count === 4) {
                    const centerRow = startRow + Math.floor(count / 2);
                    specialPatterns.push({
                        type: 'line_4_vertical',
                        centerPosition: { row: centerRow, col },
                        tiles: []
                    });
                }
                
                for (let i = startRow; i < this.gridSize; i++) {
                    const key = `${i},${col}`;
                    matches.add(key);
                    matchedPositions.add(key);
                }
            }
        }
        
        // Convert Set back to array format
        const matchArray = [];
        matches.forEach(key => {
            const [row, col] = key.split(',').map(Number);
            matchArray.push({ row, col });
        });
        
        return { matches: matchArray, specialPatterns };
    }
    
    findLAndTPatterns() {
        const patterns = [];
        const allMatches = new Set();
        
        // Check each position for potential L or T patterns
        for (let row = 0; row < this.gridSize; row++) {
            for (let col = 0; col < this.gridSize; col++) {
                const currentType = this.board[row][col].type;
                
                // Check for L patterns (4 orientations)
                const lPatterns = this.checkLPatterns(row, col, currentType);
                patterns.push(...lPatterns);
                
                // Check for T patterns (4 orientations)
                const tPatterns = this.checkTPatterns(row, col, currentType);
                patterns.push(...tPatterns);
            }
        }
        
        // Collect all unique matches from patterns
        patterns.forEach(pattern => {
            pattern.tiles.forEach(tile => {
                allMatches.add(`${tile.row},${tile.col}`);
            });
        });
        
        // Convert to match array format
        const matchArray = [];
        allMatches.forEach(key => {
            const [row, col] = key.split(',').map(Number);
            matchArray.push({ row, col });
        });
        
        return { matches: matchArray, patterns };
    }
    
    checkLPatterns(row, col, type) {
        const patterns = [];
        
        // L pattern orientations:
        // ↰ (top-left): horizontal right, then vertical down
        // ↱ (top-right): horizontal left, then vertical down  
        // ↲ (bottom-left): horizontal right, then vertical up
        // ↳ (bottom-right): horizontal left, then vertical up
        
        // ↰ L pattern (corner at top-left)
        if (this.isValidLPattern(row, col, type, 0, 1, 1, 0)) {
            const tiles = this.getLPatternTiles(row, col, 0, 1, 1, 0);
            if (tiles.length >= 5) {
                patterns.push({ type: 'L', orientation: 'top-left', tiles, corner: { row, col } });
            }
        }
        
        // ↱ L pattern (corner at top-right)
        if (this.isValidLPattern(row, col, type, 0, -1, 1, 0)) {
            const tiles = this.getLPatternTiles(row, col, 0, -1, 1, 0);
            if (tiles.length >= 5) {
                patterns.push({ type: 'L', orientation: 'top-right', tiles, corner: { row, col } });
            }
        }
        
        // ↲ L pattern (corner at bottom-left)
        if (this.isValidLPattern(row, col, type, 0, 1, -1, 0)) {
            const tiles = this.getLPatternTiles(row, col, 0, 1, -1, 0);
            if (tiles.length >= 5) {
                patterns.push({ type: 'L', orientation: 'bottom-left', tiles, corner: { row, col } });
            }
        }
        
        // ↳ L pattern (corner at bottom-right)
        if (this.isValidLPattern(row, col, type, 0, -1, -1, 0)) {
            const tiles = this.getLPatternTiles(row, col, 0, -1, -1, 0);
            if (tiles.length >= 5) {
                patterns.push({ type: 'L', orientation: 'bottom-right', tiles, corner: { row, col } });
            }
        }
        
        return patterns;
    }
    
    checkTPatterns(row, col, type) {
        const patterns = [];
        
        // T pattern orientations:
        // ⊥ (upright T): vertical line up/down, horizontal line left/right
        // ⊤ (upside-down T): vertical line up, horizontal line left/right
        // ⊣ (left T): horizontal line left, vertical line up/down
        // ⊢ (right T): horizontal line right, vertical line up/down
        
        // ⊥ Upright T (center at intersection)
        if (this.isValidTPattern(row, col, type, [-1, 0], [1, 0], [0, -1], [0, 1])) {
            const tiles = this.getTPatternTiles(row, col, [-1, 0], [1, 0], [0, -1], [0, 1]);
            if (tiles.length >= 5) {
                patterns.push({ type: 'T', orientation: 'upright', tiles, center: { row, col } });
            }
        }
        
        // ⊤ Upside-down T
        if (this.isValidTPattern(row, col, type, [-1, 0], [0, 0], [0, -1], [0, 1])) {
            const tiles = this.getTPatternTiles(row, col, [-1, 0], [0, 0], [0, -1], [0, 1]);
            if (tiles.length >= 5) {
                patterns.push({ type: 'T', orientation: 'upside-down', tiles, center: { row, col } });
            }
        }
        
        // ⊣ Left T
        if (this.isValidTPattern(row, col, type, [0, -1], [0, 0], [-1, 0], [1, 0])) {
            const tiles = this.getTPatternTiles(row, col, [0, -1], [0, 0], [-1, 0], [1, 0]);
            if (tiles.length >= 5) {
                patterns.push({ type: 'T', orientation: 'left', tiles, center: { row, col } });
            }
        }
        
        // ⊢ Right T
        if (this.isValidTPattern(row, col, type, [0, 1], [0, 0], [-1, 0], [1, 0])) {
            const tiles = this.getTPatternTiles(row, col, [0, 1], [0, 0], [-1, 0], [1, 0]);
            if (tiles.length >= 5) {
                patterns.push({ type: 'T', orientation: 'right', tiles, center: { row, col } });
            }
        }
        
        return patterns;
    }
    
    isValidLPattern(row, col, type, dr1, dc1, dr2, dc2) {
        // Check if we can form an L pattern from this position
        let count1 = 0, count2 = 0;
        
        // Count in first direction (horizontal arm)
        for (let i = 0; i < 4; i++) {
            const newRow = row + dr1 * i;
            const newCol = col + dc1 * i;
            if (this.isValidPosition(newRow, newCol) && this.board[newRow][newCol].type === type) {
                count1++;
            } else {
                break;
            }
        }
        
        // Count in second direction (vertical arm)
        for (let i = 1; i < 4; i++) { // Start from 1 to avoid double-counting corner
            const newRow = row + dr2 * i;
            const newCol = col + dc2 * i;
            if (this.isValidPosition(newRow, newCol) && this.board[newRow][newCol].type === type) {
                count2++;
            } else {
                break;
            }
        }
        
        return count1 >= 3 && count2 >= 2; // At least 3 in one arm, 2 in other (plus corner = 5 total)
    }
    
    getLPatternTiles(row, col, dr1, dc1, dr2, dc2) {
        const tiles = [];
        
        // Add tiles in first direction
        for (let i = 0; i < 4; i++) {
            const newRow = row + dr1 * i;
            const newCol = col + dc1 * i;
            if (this.isValidPosition(newRow, newCol) && this.board[newRow][newCol].type === this.board[row][col].type) {
                tiles.push({ row: newRow, col: newCol });
            } else {
                break;
            }
        }
        
        // Add tiles in second direction (skip corner to avoid duplicate)
        for (let i = 1; i < 4; i++) {
            const newRow = row + dr2 * i;
            const newCol = col + dc2 * i;
            if (this.isValidPosition(newRow, newCol) && this.board[newRow][newCol].type === this.board[row][col].type) {
                tiles.push({ row: newRow, col: newCol });
            } else {
                break;
            }
        }
        
        return tiles;
    }
    
    isValidTPattern(row, col, type, dir1, dir2, dir3, dir4) {
        // Check if we can form a T pattern from this position
        const directions = [dir1, dir2, dir3, dir4];
        let validDirections = 0;
        
        directions.forEach(([dr, dc]) => {
            if (dr === 0 && dc === 0) {
                validDirections++; // Center position
                return;
            }
            
            for (let i = 1; i <= 2; i++) {
                const newRow = row + dr * i;
                const newCol = col + dc * i;
                if (this.isValidPosition(newRow, newCol) && this.board[newRow][newCol].type === type) {
                    if (i === 2) validDirections++; // Need at least 2 in this direction
                } else {
                    break;
                }
            }
        });
        
        return validDirections >= 3; // Need center + at least 2 arms with 2+ tiles each
    }
    
    getTPatternTiles(row, col, dir1, dir2, dir3, dir4) {
        const tiles = [{ row, col }]; // Start with center
        const directions = [dir1, dir2, dir3, dir4];
        
        directions.forEach(([dr, dc]) => {
            if (dr === 0 && dc === 0) return; // Skip center
            
            for (let i = 1; i <= 2; i++) {
                const newRow = row + dr * i;
                const newCol = col + dc * i;
                if (this.isValidPosition(newRow, newCol) && this.board[newRow][newCol].type === this.board[row][col].type) {
                    tiles.push({ row: newRow, col: newCol });
                } else {
                    break;
                }
            }
        });
        
        return tiles;
    }
    
    isValidPosition(row, col) {
        return row >= 0 && row < this.gridSize && col >= 0 && col < this.gridSize;
    }
    
    processMatches(matches, patterns = []) {
        // ¡Las calaveras celebran el match exitoso!
        this.celebrateSkulls();
        
        // Log patterns for debugging
        if (patterns.length > 0) {
            console.log('Patterns detected:', patterns);
        }
        
        // Crear items especiales para líneas de 4
        this.createSpecialItemsFromPatterns(patterns);
        
        // Calculate score
        this.score += matches.length * 10;
        
        // Create explosion particles and scale animation for matched tiles
        matches.forEach(match => {
            const tile = this.board[match.row][match.col];
            
            // Create particles
            for (let i = 0; i < 12; i++) {
                this.particles.push({
                    x: tile.x + this.tileSize / 2,
                    y: tile.y + this.tileSize / 2,
                    vx: (Math.random() - 0.5) * 10,
                    vy: (Math.random() - 0.5) * 10,
                    color: this.colors[tile.type],
                    life: 1,
                    decay: 0.015
                });
            }
            
            // Scale out animation
            this.animations.push({
                type: 'scaleOut',
                tile: tile,
                progress: 0,
                duration: 200
            });
            
            // Mark as empty
            this.board[match.row][match.col] = null;
        });
        
        // Drop tiles down after scale animation
        setTimeout(() => {
            this.dropTiles();
            this.fillEmptySpaces();
            
            // Check for new matches after drop animation completes
            setTimeout(() => {
                // Find both line matches and pattern matches
                const newLineResult = this.findMatches();
                const newPatternResult = this.findLAndTPatterns();
                
                // Combine all matches
                const allNewMatchesSet = new Set();
                newLineResult.matches.forEach(match => {
                    allNewMatchesSet.add(`${match.row},${match.col}`);
                });
                newPatternResult.matches.forEach(match => {
                    allNewMatchesSet.add(`${match.row},${match.col}`);
                });
                
                const allNewMatches = [];
                allNewMatchesSet.forEach(key => {
                    const [row, col] = key.split(',').map(Number);
                    allNewMatches.push({ row, col });
                });
                
                // Combine all special patterns
                const allNewSpecialPatterns = [...(newLineResult.specialPatterns || []), ...newPatternResult.patterns];
                
                if (allNewMatches.length > 0) {
                    this.processMatches(allNewMatches, allNewSpecialPatterns);
                } else {
                    this.animating = false;
                    this.updateDisplay();
                    
                    if (this.moves <= 0) {
                        this.gameOver();
                    }
                }
            }, 400);
        }, 200);
    }
    
    createSpecialItemsFromPatterns(patterns) {
        patterns.forEach(pattern => {
            if (pattern.type === 'line_4_horizontal' || pattern.type === 'line_4_vertical') {
                this.createCrossItem(pattern.centerPosition.row, pattern.centerPosition.col);
            }
        });
    }
    
    createCrossItem(row, col) {
        // Crear item especial de cruz en la posición especificada
        // Pero solo si la posición no está marcada para eliminación
        setTimeout(() => {
            if (this.board[row] && this.board[row][col] && this.board[row][col] === null) {
                this.board[row][col] = {
                    type: 'special_cross',
                    x: col * this.tileSize,
                    y: row * this.tileSize,
                    targetX: col * this.tileSize,
                    targetY: row * this.tileSize,
                    scale: 1,
                    rotation: 0,
                    alpha: 1,
                    isSpecial: true,
                    specialType: 'cross'
                };
                
                // Animación especial de creación
                this.animations.push({
                    type: 'specialCreate',
                    tile: this.board[row][col],
                    progress: 0,
                    duration: 500
                });
            }
        }, 100); // Pequeño delay para asegurar que el tile se haya eliminado primero
    }
    
    activateCrossPower(crossRow, crossCol, targetRow, targetCol) {
        this.animating = true;
        
        // Reproducir sonido especial para poderes
        this.audioManager.playSpecialSound();
        
        // Crear efectos visuales de activación
        this.celebrateSkulls();
        
        // Crear partículas especiales de cruz
        for (let i = 0; i < 20; i++) {
            this.particles.push({
                x: crossCol * this.tileSize + this.tileSize / 2,
                y: crossRow * this.tileSize + this.tileSize / 2,
                vx: (Math.random() - 0.5) * 15,
                vy: (Math.random() - 0.5) * 15,
                color: '#ffd700',
                life: 1,
                decay: 0.02
            });
        }
        
        // Eliminar toda la fila del target
        for (let c = 0; c < this.gridSize; c++) {
            if (this.board[targetRow][c] && this.board[targetRow][c] !== null) {
                // Crear partículas para cada tile eliminado
                for (let i = 0; i < 6; i++) {
                    this.particles.push({
                        x: c * this.tileSize + this.tileSize / 2,
                        y: targetRow * this.tileSize + this.tileSize / 2,
                        vx: (Math.random() - 0.5) * 12,
                        vy: (Math.random() - 0.5) * 12,
                        color: this.colors[this.board[targetRow][c].type] || '#ffd700',
                        life: 1,
                        decay: 0.018
                    });
                }
                
                this.animations.push({
                    type: 'scaleOut',
                    tile: this.board[targetRow][c],
                    progress: 0,
                    duration: 200
                });
                
                this.board[targetRow][c] = null;
            }
        }
        
        // Eliminar toda la columna del target
        for (let r = 0; r < this.gridSize; r++) {
            if (this.board[r][targetCol] && this.board[r][targetCol] !== null) {
                // Crear partículas para cada tile eliminado
                for (let i = 0; i < 6; i++) {
                    this.particles.push({
                        x: targetCol * this.tileSize + this.tileSize / 2,
                        y: r * this.tileSize + this.tileSize / 2,
                        vx: (Math.random() - 0.5) * 12,
                        vy: (Math.random() - 0.5) * 12,
                        color: this.colors[this.board[r][targetCol].type] || '#ffd700',
                        life: 1,
                        decay: 0.018
                    });
                }
                
                this.animations.push({
                    type: 'scaleOut',
                    tile: this.board[r][targetCol],
                    progress: 0,
                    duration: 200
                });
                
                this.board[r][targetCol] = null;
            }
        }
        
        // Eliminar el item especial de cruz también
        if (this.board[crossRow][crossCol]) {
            this.board[crossRow][crossCol] = null;
        }
        
        // Actualizar puntuación (bonus por usar poder especial)
        this.score += 100;
        
        // Procesar caída y relleno después de la animación
        setTimeout(() => {
            this.dropTiles();
            this.fillEmptySpaces();
            
            // Verificar nuevos matches después de la caída
            setTimeout(() => {
                const newLineResult = this.findMatches();
                const newPatternResult = this.findLAndTPatterns();
                
                const allNewMatchesSet = new Set();
                newLineResult.matches.forEach(match => {
                    allNewMatchesSet.add(`${match.row},${match.col}`);
                });
                newPatternResult.matches.forEach(match => {
                    allNewMatchesSet.add(`${match.row},${match.col}`);
                });
                
                const allNewMatches = [];
                allNewMatchesSet.forEach(key => {
                    const [row, col] = key.split(',').map(Number);
                    allNewMatches.push({ row, col });
                });
                
                const allNewSpecialPatterns = [...(newLineResult.specialPatterns || []), ...newPatternResult.patterns];
                
                if (allNewMatches.length > 0) {
                    this.processMatches(allNewMatches, allNewSpecialPatterns);
                } else {
                    this.animating = false;
                    this.updateDisplay();
                    
                    if (this.moves <= 0) {
                        this.gameOver();
                    }
                }
            }, 400);
        }, 200);
    }
    
    dropTiles() {
        for (let col = 0; col < this.gridSize; col++) {
            let writePos = this.gridSize - 1;
            
            for (let row = this.gridSize - 1; row >= 0; row--) {
                if (this.board[row][col] !== null) {
                    if (writePos !== row) {
                        this.board[writePos][col] = this.board[row][col];
                        this.board[row][col] = null;
                        
                        // Animate drop
                        this.board[writePos][col].targetY = writePos * this.tileSize;
                        this.animations.push({
                            type: 'drop',
                            tile: this.board[writePos][col],
                            progress: 0,
                            duration: 300
                        });
                    }
                    writePos--;
                }
            }
        }
    }
    
    fillEmptySpaces() {
        for (let row = 0; row < this.gridSize; row++) {
            for (let col = 0; col < this.gridSize; col++) {
                if (this.board[row][col] === null) {
                    this.board[row][col] = {
                        type: this.getRandomSymbol(),
                        x: col * this.tileSize,
                        y: -this.tileSize, // Start above the board
                        targetX: col * this.tileSize,
                        targetY: row * this.tileSize,
                        scale: 1,
                        rotation: 0,
                        alpha: 1,
                        isSpecial: false,
                        specialType: null
                    };
                    
                    // Animate fall in
                    this.animations.push({
                        type: 'fallIn',
                        tile: this.board[row][col],
                        progress: 0,
                        duration: 400
                    });
                }
            }
        }
    }
    
    gameOver() {
        if (this.score >= this.targetScore) {
            // El nivel se completó, no es game over
            return;
        }
        
        const levelData = this.levels[this.currentLevel - 1];
        const message = `¡Nivel ${this.currentLevel} no completado!\n\n` +
                       `Objetivo: ${this.targetScore} puntos\n` +
                       `Tu puntuación: ${this.score}\n` +
                       `Necesitas ${this.targetScore - this.score} puntos más\n\n` +
                       `Score total acumulado: ${this.totalScore}\n\n` +
                       `¡Inténtalo de nuevo!`;
        
        alert(message);
        
        // Reiniciar solo el nivel actual (el score total se mantiene)
        this.initGame();
    }
    
    setupCurrentLevel() {
        const levelData = this.levels[this.currentLevel - 1];
        if (levelData) {
            this.targetScore = levelData.targetScore;
            this.moves = levelData.moves;
            this.baseMovesPerLevel = levelData.moves;
        }
    }

    updateDisplay() {
        document.getElementById('score').textContent = this.score;
        document.getElementById('targetScore').textContent = this.targetScore;
        document.getElementById('totalScore').textContent = this.totalScore;
        document.getElementById('moves').textContent = this.moves;
        document.getElementById('level').textContent = this.currentLevel;
        
        const levelData = this.levels[this.currentLevel - 1];
        if (levelData) {
            document.getElementById('levelDescription').textContent = levelData.description;
        }
        
        // Verificar si se completó el nivel
        if (this.score >= this.targetScore && !this.levelCompleted) {
            this.completeLevel();
        }
    }

    completeLevel() {
        this.levelCompleted = true;
        this.animating = true;
        
        // Reproducir sonido especial
        this.audioManager.playSpecialSound();
        
        // Celebrar con todas las calaveras
        this.celebrateSkulls();
        
        // Calcular bonus por movimientos restantes
        const movesBonus = this.moves * 50;
        const levelScore = this.score + movesBonus;
        
        // Actualizar score total acumulado
        this.totalScore += levelScore;
        
        // Mostrar modal después de un breve delay
        setTimeout(() => {
            this.showLevelCompleteModal(levelScore, movesBonus);
        }, 1500);
    }

    showLevelCompleteModal(levelScore, movesBonus) {
        const modal = document.getElementById('levelCompleteModal');
        const levelData = this.levels[this.currentLevel - 1];
        
        document.getElementById('completedLevel').textContent = `Nivel ${this.currentLevel}: ${levelData.description}`;
        document.getElementById('finalScore').textContent = levelScore;
        document.getElementById('remainingMoves').textContent = this.moves;
        
        const bonusInfo = document.getElementById('bonusInfo');
        if (movesBonus > 0) {
            bonusInfo.innerHTML = `🎁 Bonus por movimientos restantes: +${movesBonus} puntos<br>` +
                                 `📊 Score total acumulado: ${this.totalScore} puntos`;
            bonusInfo.style.display = 'block';
        } else {
            bonusInfo.innerHTML = `📊 Score total acumulado: ${this.totalScore} puntos`;
            bonusInfo.style.display = 'block';
        }
        
        this.updateDisplay();
        
        modal.style.display = 'block';
        this.animating = false;
    }

    nextLevel() {
        if (this.currentLevel >= this.levels.length) {
            this.completeGame();
            return;
        }
        
        this.currentLevel++;
        this.levelCompleted = false;
        
        // Inicializar el nuevo nivel (score se reinicia a 0 en initGame)
        this.initGame();
        
        // Cerrar modal
        document.getElementById('levelCompleteModal').style.display = 'none';
    }

    completeGame() {
        this.gameCompleted = true;
        
        // Mostrar modal de juego completado
        const modal = document.getElementById('gameCompleteModal');
        document.getElementById('totalScore').textContent = this.totalScore;
        
        modal.style.display = 'block';
        document.getElementById('levelCompleteModal').style.display = 'none';
    }

    resetGame() {
        this.currentLevel = 1;
        this.score = 0;
        this.totalScore = 0;
        this.levelCompleted = false;
        this.gameCompleted = false;
        
        // Cerrar modales
        document.getElementById('levelCompleteModal').style.display = 'none';
        document.getElementById('gameCompleteModal').style.display = 'none';
        
        this.initGame();
    }
    
    updateAnimations(deltaTime) {
        this.animations = this.animations.filter(animation => {
            animation.progress += deltaTime / animation.duration;
            
            if (animation.type === 'scaleOut') {
                const progress = Math.min(animation.progress, 1);
                animation.tile.scale = 1 - progress;
                animation.tile.rotation = progress * Math.PI * 2;
                return progress < 1;
            } else if (animation.type === 'drop' || animation.type === 'fallIn') {
                const progress = Math.min(animation.progress, 1);
                const easeOut = 1 - Math.pow(1 - progress, 3);
                animation.tile.y = animation.tile.y + (animation.tile.targetY - animation.tile.y) * easeOut * 0.2;
                return progress < 1;
            } else if (animation.type === 'specialCreate') {
                const progress = Math.min(animation.progress, 1);
                animation.tile.scale = 0.5 + (progress * 0.5);
                animation.tile.rotation = progress * Math.PI * 4;
                animation.tile.alpha = progress;
                return progress < 1;
            }
            
            return animation.progress < 1;
        });
        
        // Update particles
        this.particles = this.particles.filter(particle => {
            particle.x += particle.vx;
            particle.y += particle.vy;
            particle.vy += 0.2; // gravity
            particle.life -= particle.decay;
            return particle.life > 0;
        });
        
        // Update tile positions smoothly
        for (let row = 0; row < this.gridSize; row++) {
            for (let col = 0; col < this.gridSize; col++) {
                if (this.board[row][col]) {
                    const tile = this.board[row][col];
                    tile.x += (tile.targetX - tile.x) * 0.2;
                    tile.y += (tile.targetY - tile.y) * 0.2;
                }
            }
        }
    }
    
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Draw grid background with pattern
        this.ctx.fillStyle = '#2c1810';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Draw grid pattern
        this.ctx.strokeStyle = 'rgba(255, 107, 53, 0.1)';
        this.ctx.lineWidth = 1;
        for (let i = 0; i <= this.gridSize; i++) {
            this.ctx.beginPath();
            this.ctx.moveTo(i * this.tileSize, 0);
            this.ctx.lineTo(i * this.tileSize, this.canvas.height);
            this.ctx.stroke();
            
            this.ctx.beginPath();
            this.ctx.moveTo(0, i * this.tileSize);
            this.ctx.lineTo(this.canvas.width, i * this.tileSize);
            this.ctx.stroke();
        }
        
        // Draw tiles
        for (let row = 0; row < this.gridSize; row++) {
            for (let col = 0; col < this.gridSize; col++) {
                if (this.board[row][col]) {
                    const tile = this.board[row][col];
                    
                    this.ctx.save();
                    this.ctx.globalAlpha = tile.alpha;
                    this.ctx.translate(tile.x + this.tileSize / 2, tile.y + this.tileSize / 2);
                    this.ctx.rotate(tile.rotation);
                    this.ctx.scale(tile.scale, tile.scale);
                    
                    // Draw tile background with gradient
                    const gradient = this.ctx.createRadialGradient(0, 0, 0, 0, 0, this.tileSize / 2);
                    gradient.addColorStop(0, this.colors[tile.type]);
                    gradient.addColorStop(1, this.darkenColor(this.colors[tile.type], 0.3));
                    
                    this.ctx.fillStyle = gradient;
                    this.ctx.fillRect(-this.tileSize / 2 + 2, -this.tileSize / 2 + 2, this.tileSize - 4, this.tileSize - 4);
                    
                    // Draw special glow for special items
                    if (tile.isSpecial) {
                        const glowIntensity = 0.5 + 0.5 * Math.sin(Date.now() * 0.005);
                        this.ctx.shadowColor = tile.specialType === 'cross' ? '#ffd700' : '#ff1744';
                        this.ctx.shadowBlur = 20 * glowIntensity;
                        this.ctx.fillRect(-this.tileSize / 2 + 2, -this.tileSize / 2 + 2, this.tileSize - 4, this.tileSize - 4);
                        this.ctx.shadowBlur = 0;
                    }
                    
                    // Draw SVG symbol
                    if (this.symbolImages[tile.type]) {
                        this.ctx.drawImage(
                            this.symbolImages[tile.type], 
                            -this.tileSize / 2 + 5, 
                            -this.tileSize / 2 + 5,
                            this.tileSize - 10,
                            this.tileSize - 10
                        );
                    }
                    
                    // Highlight selected tile
                    if (this.selectedTile && 
                        this.selectedTile.row === row && 
                        this.selectedTile.col === col) {
                        this.ctx.strokeStyle = '#fff';
                        this.ctx.lineWidth = 4;
                        this.ctx.shadowColor = '#fff';
                        this.ctx.shadowBlur = 10;
                        this.ctx.strokeRect(-this.tileSize / 2 + 2, -this.tileSize / 2 + 2, this.tileSize - 4, this.tileSize - 4);
                        this.ctx.shadowBlur = 0;
                    }
                    
                    this.ctx.restore();
                }
            }
        }
        
        // Draw particles
        this.particles.forEach(particle => {
            this.ctx.save();
            this.ctx.globalAlpha = particle.life;
            this.ctx.fillStyle = particle.color;
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, 3, 0, Math.PI * 2);
            this.ctx.fill();
            this.ctx.restore();
        });
    }
    
    darkenColor(color, amount) {
        const hex = color.replace('#', '');
        const r = Math.max(0, parseInt(hex.substr(0, 2), 16) - Math.floor(255 * amount));
        const g = Math.max(0, parseInt(hex.substr(2, 2), 16) - Math.floor(255 * amount));
        const b = Math.max(0, parseInt(hex.substr(4, 2), 16) - Math.floor(255 * amount));
        return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
    }
    
    gameLoop() {
        const now = Date.now();
        const deltaTime = now - (this.lastTime || now);
        this.lastTime = now;
        
        this.updateAnimations(deltaTime);
        this.draw();
        requestAnimationFrame(() => this.gameLoop());
    }
}

// Start the game when page loads
window.addEventListener('load', () => {
    new DiaDeLosMuertosGame();
});