// SVG assets for Día de los Muertos theme
const SVG_ASSETS = {
  skull: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <radialGradient id="skullGrad" cx="50%" cy="30%" r="70%">
                <stop offset="0%" style="stop-color:#ffffff"/>
                <stop offset="100%" style="stop-color:#f0f0f0"/>
            </radialGradient>
        </defs>
        <ellipse cx="50" cy="45" rx="35" ry="40" fill="url(#skullGrad)" stroke="#333" stroke-width="2"/>
        <circle cx="38" cy="35" r="8" fill="#000"/>
        <circle cx="62" cy="35" r="8" fill="#000"/>
        <path d="M45 50 Q50 55 55 50" stroke="#000" stroke-width="2" fill="none"/>
        <rect x="48" y="58" width="4" height="8" fill="#000"/>
        <rect x="46" y="68" width="2" height="4" fill="#000"/>
        <rect x="52" y="68" width="2" height="4" fill="#000"/>
        <circle cx="42" cy="40" r="2" fill="#ff6b35"/>
        <circle cx="58" cy="40" r="2" fill="#ff6b35"/>
        <path d="M35 55 Q40 60 45 55" stroke="#ff6b35" stroke-width="2" fill="none"/>
        <path d="M55 55 Q60 60 65 55" stroke="#ff6b35" stroke-width="2" fill="none"/>
    </svg>`,

  marigold: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <radialGradient id="marigoldGrad" cx="50%" cy="50%" r="50%">
                <stop offset="0%" style="stop-color:#ffd700"/>
                <stop offset="100%" style="stop-color:#ff8c00"/>
            </radialGradient>
        </defs>
        <g transform="translate(50,50)">
            <circle r="25" fill="url(#marigoldGrad)"/>
            <g>
                <ellipse rx="8" ry="20" fill="#ff6b35" transform="rotate(0)"/>
                <ellipse rx="8" ry="20" fill="#ff6b35" transform="rotate(45)"/>
                <ellipse rx="8" ry="20" fill="#ff6b35" transform="rotate(90)"/>
                <ellipse rx="8" ry="20" fill="#ff6b35" transform="rotate(135)"/>
                <ellipse rx="8" ry="20" fill="#ff6b35" transform="rotate(180)"/>
                <ellipse rx="8" ry="20" fill="#ff6b35" transform="rotate(225)"/>
                <ellipse rx="8" ry="20" fill="#ff6b35" transform="rotate(270)"/>
                <ellipse rx="8" ry="20" fill="#ff6b35" transform="rotate(315)"/>
            </g>
            <circle r="12" fill="#ffd700"/>
            <circle r="6" fill="#ff8c00"/>
        </g>
        <rect x="48" y="70" width="4" height="25" fill="#228b22"/>
    </svg>`,

  candle: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <linearGradient id="candleGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" style="stop-color:#fff8dc"/>
                <stop offset="100%" style="stop-color:#f5deb3"/>
            </linearGradient>
            <radialGradient id="flameGrad" cx="50%" cy="70%" r="50%">
                <stop offset="0%" style="stop-color:#ffd700"/>
                <stop offset="50%" style="stop-color:#ff6b35"/>
                <stop offset="100%" style="stop-color:#ff1744"/>
            </radialGradient>
        </defs>
        <rect x="40" y="30" width="20" height="50" fill="url(#candleGrad)" stroke="#ddd" stroke-width="1"/>
        <ellipse cx="50" cy="80" rx="12" ry="4" fill="#8b4513"/>
        <ellipse cx="50" cy="20" rx="8" ry="12" fill="url(#flameGrad)"/>
        <ellipse cx="50" cy="18" rx="3" ry="6" fill="#ffd700"/>
        <rect x="49" y="28" width="2" height="4" fill="#333"/>
        <path d="M45 40 Q50 35 55 40" stroke="#ff6b35" stroke-width="1" fill="none"/>
        <path d="M45 50 Q50 45 55 50" stroke="#ff6b35" stroke-width="1" fill="none"/>
        <path d="M45 60 Q50 55 55 60" stroke="#ff6b35" stroke-width="1" fill="none"/>
    </svg>`,

  papel: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <linearGradient id="papelGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" style="stop-color:#9c27b0"/>
                <stop offset="100%" style="stop-color:#673ab7"/>
            </linearGradient>
        </defs>
        <rect x="10" y="20" width="80" height="60" fill="url(#papelGrad)"/>
        <path d="M15 25 L25 35 L35 25 L45 35 L55 25 L65 35 L75 25 L85 35" stroke="#fff" stroke-width="2" fill="none"/>
        <path d="M15 75 L25 65 L35 75 L45 65 L55 75 L65 65 L75 75 L85 65" stroke="#fff" stroke-width="2" fill="none"/>
        <circle cx="30" cy="45" r="6" fill="#ffd700"/>
        <circle cx="50" cy="50" r="8" fill="#ff6b35"/>
        <circle cx="70" cy="45" r="6" fill="#00bcd4"/>
        <path d="M20 40 Q25 35 30 40 Q35 45 40 40" stroke="#fff" stroke-width="2" fill="none"/>
        <path d="M60 55 Q65 50 70 55 Q75 60 80 55" stroke="#fff" stroke-width="2" fill="none"/>
    </svg>`,

  copal: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <radialGradient id="copalGrad" cx="50%" cy="80%" r="60%">
                <stop offset="0%" style="stop-color:#8b4513"/>
                <stop offset="100%" style="stop-color:#654321"/>
            </radialGradient>
        </defs>
        <ellipse cx="50" cy="70" rx="25" ry="15" fill="url(#copalGrad)"/>
        <ellipse cx="50" cy="68" rx="20" ry="8" fill="#a0522d"/>
        <g opacity="0.7">
            <path d="M45 60 Q48 40 46 20" stroke="#ddd" stroke-width="2" fill="none"/>
            <path d="M50 60 Q52 35 50 15" stroke="#ddd" stroke-width="2" fill="none"/>
            <path d="M55 60 Q58 40 56 25" stroke="#ddd" stroke-width="2" fill="none"/>
            <circle cx="46" cy="20" r="3" fill="#ddd" opacity="0.5"/>
            <circle cx="50" cy="15" r="4" fill="#ddd" opacity="0.5"/>
            <circle cx="56" cy="25" r="3" fill="#ddd" opacity="0.5"/>
        </g>
        <ellipse cx="50" cy="75" rx="30" ry="8" fill="#333" opacity="0.3"/>
    </svg>`,

  bread: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <radialGradient id="breadGrad" cx="50%" cy="40%" r="60%">
                <stop offset="0%" style="stop-color:#daa520"/>
                <stop offset="100%" style="stop-color:#b8860b"/>
            </radialGradient>
        </defs>
        <ellipse cx="50" cy="60" rx="35" ry="25" fill="url(#breadGrad)"/>
        <ellipse cx="50" cy="55" rx="30" ry="20" fill="#daa520"/>
        <path d="M30 50 Q50 40 70 50" stroke="#b8860b" stroke-width="2" fill="none"/>
        <path d="M35 60 Q50 55 65 60" stroke="#b8860b" stroke-width="2" fill="none"/>
        <circle cx="40" cy="55" r="2" fill="#8b4513"/>
        <circle cx="60" cy="58" r="2" fill="#8b4513"/>
        <circle cx="50" cy="65" r="2" fill="#8b4513"/>
        <path d="M45 45 Q50 35 55 45" stroke="#ff6b35" stroke-width="2" fill="none"/>
        <ellipse cx="50" cy="80" rx="40" ry="6" fill="#333" opacity="0.2"/>
    </svg>`,

  // Calaveras decorativas para los lados
  sideSkullLeft: `<svg viewBox="0 0 120 150" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <radialGradient id="sideSkullGrad" cx="50%" cy="30%" r="70%">
                <stop offset="0%" style="stop-color:#ffffff"/>
                <stop offset="100%" style="stop-color:#f0f0f0"/>
            </radialGradient>
            <linearGradient id="flowerGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style="stop-color:#ffd700"/>
                <stop offset="100%" style="stop-color:#ff6b35"/>
            </linearGradient>
        </defs>
        <!-- Calavera principal -->
        <ellipse cx="60" cy="70" rx="45" ry="50" fill="url(#sideSkullGrad)" stroke="#333" stroke-width="3"/>
        <!-- Ojos -->
        <circle cx="45" cy="55" r="12" fill="#000"/>
        <circle cx="75" cy="55" r="12" fill="#000"/>
        <!-- Decoraciones en los ojos -->
        <circle cx="48" cy="58" r="3" fill="#ff6b35"/>
        <circle cx="72" cy="58" r="3" fill="#ff6b35"/>
        <!-- Nariz -->
        <path d="M55 70 Q60 80 65 70" stroke="#000" stroke-width="3" fill="none"/>
        <!-- Boca -->
        <rect x="57" y="85" width="6" height="12" fill="#000"/>
        <rect x="54" y="100" width="3" height="6" fill="#000"/>
        <rect x="63" y="100" width="3" height="6" fill="#000"/>
        <rect x="51" y="108" width="3" height="4" fill="#000"/>
        <rect x="66" y="108" width="3" height="4" fill="#000"/>
        <!-- Decoraciones florales -->
        <circle cx="25" cy="45" r="8" fill="url(#flowerGrad)"/>
        <circle cx="95" cy="45" r="8" fill="url(#flowerGrad)"/>
        <path d="M20 65 Q30 70 40 65" stroke="#ff6b35" stroke-width="3" fill="none"/>
        <path d="M80 65 Q90 70 100 65" stroke="#ff6b35" stroke-width="3" fill="none"/>
        <!-- Patrones decorativos -->
        <circle cx="35" cy="75" r="2" fill="#9c27b0"/>
        <circle cx="85" cy="75" r="2" fill="#9c27b0"/>
        <path d="M30 90 Q35 85 40 90" stroke="#00bcd4" stroke-width="2" fill="none"/>
        <path d="M80 90 Q85 85 90 90" stroke="#00bcd4" stroke-width="2" fill="none"/>
    </svg>`,

  sideSkullRight: `<svg viewBox="0 0 120 150" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <radialGradient id="sideSkullGrad2" cx="50%" cy="30%" r="70%">
                <stop offset="0%" style="stop-color:#ffffff"/>
                <stop offset="100%" style="stop-color:#f0f0f0"/>
            </radialGradient>
            <linearGradient id="flowerGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style="stop-color:#9c27b0"/>
                <stop offset="100%" style="stop-color:#ff1744"/>
            </linearGradient>
        </defs>
        <!-- Calavera principal -->
        <ellipse cx="60" cy="70" rx="45" ry="50" fill="url(#sideSkullGrad2)" stroke="#333" stroke-width="3"/>
        <!-- Ojos -->
        <circle cx="45" cy="55" r="12" fill="#000"/>
        <circle cx="75" cy="55" r="12" fill="#000"/>
        <!-- Decoraciones en los ojos -->
        <circle cx="48" cy="58" r="3" fill="#9c27b0"/>
        <circle cx="72" cy="58" r="3" fill="#9c27b0"/>
        <!-- Nariz -->
        <path d="M55 70 Q60 80 65 70" stroke="#000" stroke-width="3" fill="none"/>
        <!-- Boca -->
        <rect x="57" y="85" width="6" height="12" fill="#000"/>
        <rect x="54" y="100" width="3" height="6" fill="#000"/>
        <rect x="63" y="100" width="3" height="6" fill="#000"/>
        <rect x="51" y="108" width="3" height="4" fill="#000"/>
        <rect x="66" y="108" width="3" height="4" fill="#000"/>
        <!-- Decoraciones florales -->
        <circle cx="25" cy="45" r="8" fill="url(#flowerGrad2)"/>
        <circle cx="95" cy="45" r="8" fill="url(#flowerGrad2)"/>
        <path d="M20 65 Q30 70 40 65" stroke="#9c27b0" stroke-width="3" fill="none"/>
        <path d="M80 65 Q90 70 100 65" stroke="#9c27b0" stroke-width="3" fill="none"/>
        <!-- Patrones decorativos -->
        <circle cx="35" cy="75" r="2" fill="#ff6b35"/>
        <circle cx="85" cy="75" r="2" fill="#ff6b35"/>
        <path d="M30 90 Q35 85 40 90" stroke="#ffd700" stroke-width="2" fill="none"/>
        <path d="M80 90 Q85 85 90 90" stroke="#ffd700" stroke-width="2" fill="none"/>
        <!-- Corazón decorativo -->
        <path d="M60 25 Q55 20 50 25 Q45 20 40 25 Q40 35 50 40 Q60 35 60 25" fill="#ff1744"/>
    </svg>`,

  // Calaveras pequeñas para las esquinas
  cornerSkull: `<svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <radialGradient id="cornerSkullGrad" cx="50%" cy="30%" r="70%">
                <stop offset="0%" style="stop-color:#ffffff"/>
                <stop offset="100%" style="stop-color:#f0f0f0"/>
            </radialGradient>
        </defs>
        <ellipse cx="40" cy="35" rx="25" ry="30" fill="url(#cornerSkullGrad)" stroke="#333" stroke-width="2"/>
        <circle cx="32" cy="28" r="6" fill="#000"/>
        <circle cx="48" cy="28" r="6" fill="#000"/>
        <path d="M36 38 Q40 42 44 38" stroke="#000" stroke-width="2" fill="none"/>
        <rect x="38" y="45" width="4" height="8" fill="#000"/>
        <rect x="36" y="55" width="2" height="4" fill="#000"/>
        <rect x="42" y="55" width="2" height="4" fill="#000"/>
        <circle cx="34" cy="32" r="1.5" fill="#ff6b35"/>
        <circle cx="46" cy="32" r="1.5" fill="#ff6b35"/>
        <path d="M28 42 Q32 46 36 42" stroke="#9c27b0" stroke-width="1.5" fill="none"/>
        <path d="M44 42 Q48 46 52 42" stroke="#9c27b0" stroke-width="1.5" fill="none"/>
    </svg>`,

  // Calavera celebrando (ojos cerrados, sonrisa)
  happySkull: `<svg viewBox="0 0 120 150" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <radialGradient id="happySkullGrad" cx="50%" cy="30%" r="70%">
                <stop offset="0%" style="stop-color:#ffffff"/>
                <stop offset="100%" style="stop-color:#f0f0f0"/>
            </radialGradient>
        </defs>
        <ellipse cx="60" cy="70" rx="45" ry="50" fill="url(#happySkullGrad)" stroke="#333" stroke-width="3"/>
        <!-- Ojos cerrados (sonriendo) -->
        <path d="M35 55 Q45 50 55 55" stroke="#000" stroke-width="4" fill="none"/>
        <path d="M65 55 Q75 50 85 55" stroke="#000" stroke-width="4" fill="none"/>
        <!-- Decoraciones en los ojos -->
        <circle cx="45" cy="58" r="3" fill="#ffd700"/>
        <circle cx="75" cy="58" r="3" fill="#ffd700"/>
        <!-- Nariz -->
        <path d="M55 70 Q60 80 65 70" stroke="#000" stroke-width="3" fill="none"/>
        <!-- Boca sonriente -->
        <path d="M45 90 Q60 105 75 90" stroke="#000" stroke-width="4" fill="none"/>
        <rect x="54" y="100" width="3" height="6" fill="#000"/>
        <rect x="63" y="100" width="3" height="6" fill="#000"/>
        <!-- Decoraciones festivas -->
        <circle cx="25" cy="45" r="8" fill="#ffd700"/>
        <circle cx="95" cy="45" r="8" fill="#ff6b35"/>
        <path d="M20 65 Q30 60 40 65" stroke="#4caf50" stroke-width="3" fill="none"/>
        <path d="M80 65 Q90 60 100 65" stroke="#4caf50" stroke-width="3" fill="none"/>
        <!-- Estrellitas de celebración -->
        <text x="30" y="30" font-size="12" fill="#ffd700">✨</text>
        <text x="85" y="35" font-size="12" fill="#ffd700">✨</text>
        <text x="20" y="85" font-size="10" fill="#ff6b35">⭐</text>
        <text x="95" y="90" font-size="10" fill="#ff6b35">⭐</text>
    </svg>`,

  // Calavera riéndose (boca abierta)
  laughingSkull: `<svg viewBox="0 0 120 150" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <radialGradient id="laughSkullGrad" cx="50%" cy="30%" r="70%">
                <stop offset="0%" style="stop-color:#ffffff"/>
                <stop offset="100%" style="stop-color:#f0f0f0"/>
            </radialGradient>
        </defs>
        <ellipse cx="60" cy="70" rx="45" ry="50" fill="url(#laughSkullGrad)" stroke="#333" stroke-width="3"/>
        <!-- Ojos cerrados riéndose -->
        <path d="M35 50 Q45 45 55 50" stroke="#000" stroke-width="4" fill="none"/>
        <path d="M65 50 Q75 45 85 50" stroke="#000" stroke-width="4" fill="none"/>
        <!-- Lágrimas de risa -->
        <ellipse cx="30" cy="60" rx="2" ry="4" fill="#00bcd4"/>
        <ellipse cx="90" cy="60" rx="2" ry="4" fill="#00bcd4"/>
        <!-- Nariz -->
        <path d="M55 70 Q60 80 65 70" stroke="#000" stroke-width="3" fill="none"/>
        <!-- Boca abierta riéndose -->
        <ellipse cx="60" cy="95" rx="15" ry="10" fill="#000"/>
        <rect x="52" y="88" width="3" height="8" fill="#000"/>
        <rect x="57" y="88" width="3" height="8" fill="#000"/>
        <rect x="62" y="88" width="3" height="8" fill="#000"/>
        <rect x="67" y="88" width="3" height="8" fill="#000"/>
        <!-- Decoraciones divertidas -->
        <circle cx="25" cy="45" r="8" fill="#ff1744"/>
        <circle cx="95" cy="45" r="8" fill="#9c27b0"/>
        <!-- Símbolos de risa -->
        <text x="15" y="25" font-size="14" fill="#ff6b35">😂</text>
        <text x="90" y="25" font-size="14" fill="#ff6b35">🤣</text>
        <text x="10" y="100" font-size="12" fill="#ffd700">JAJA</text>
        <text x="85" y="110" font-size="12" fill="#ffd700">JEJE</text>
    </svg>`,

  // Calaveras variadas para crear asimetría
  smallSkull1: `<svg viewBox="0 0 60 70" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <radialGradient id="smallSkull1Grad" cx="50%" cy="30%" r="70%">
                <stop offset="0%" style="stop-color:#ffffff"/>
                <stop offset="100%" style="stop-color:#f0f0f0"/>
            </radialGradient>
        </defs>
        <ellipse cx="30" cy="30" rx="20" ry="25" fill="url(#smallSkull1Grad)" stroke="#333" stroke-width="1.5"/>
        <circle cx="24" cy="24" r="4" fill="#000"/>
        <circle cx="36" cy="24" r="4" fill="#000"/>
        <path d="M27 32 Q30 35 33 32" stroke="#000" stroke-width="1.5" fill="none"/>
        <rect x="29" y="38" width="2" height="6" fill="#000"/>
        <rect x="27" y="46" width="1" height="3" fill="#000"/>
        <rect x="32" y="46" width="1" height="3" fill="#000"/>
        <circle cx="25" cy="26" r="1" fill="#ff6b35"/>
        <circle cx="35" cy="26" r="1" fill="#ff6b35"/>
        <path d="M20 35 Q24 38 28 35" stroke="#9c27b0" stroke-width="1" fill="none"/>
        <path d="M32 35 Q36 38 40 35" stroke="#9c27b0" stroke-width="1" fill="none"/>
    </svg>`,

  smallSkull2: `<svg viewBox="0 0 65 75" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <radialGradient id="smallSkull2Grad" cx="50%" cy="30%" r="70%">
                <stop offset="0%" style="stop-color:#ffffff"/>
                <stop offset="100%" style="stop-color:#f0f0f0"/>
            </radialGradient>
        </defs>
        <ellipse cx="32" cy="32" rx="22" ry="27" fill="url(#smallSkull2Grad)" stroke="#333" stroke-width="1.5"/>
        <circle cx="26" cy="26" r="5" fill="#000"/>
        <circle cx="38" cy="26" r="5" fill="#000"/>
        <path d="M29 34 Q32 38 35 34" stroke="#000" stroke-width="1.5" fill="none"/>
        <rect x="31" y="42" width="2" height="7" fill="#000"/>
        <rect x="29" y="51" width="1" height="3" fill="#000"/>
        <rect x="34" y="51" width="1" height="3" fill="#000"/>
        <circle cx="27" cy="28" r="1" fill="#00bcd4"/>
        <circle cx="37" cy="28" r="1" fill="#00bcd4"/>
        <path d="M22 38 Q26 41 30 38" stroke="#ffd700" stroke-width="1" fill="none"/>
        <path d="M34 38 Q38 41 42 38" stroke="#ffd700" stroke-width="1" fill="none"/>
        <circle cx="18" cy="20" r="3" fill="#ff1744"/>
        <circle cx="46" cy="22" r="3" fill="#4caf50"/>
    </svg>`,

  mediumSkull1: `<svg viewBox="0 0 90 100" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <radialGradient id="mediumSkull1Grad" cx="50%" cy="30%" r="70%">
                <stop offset="0%" style="stop-color:#ffffff"/>
                <stop offset="100%" style="stop-color:#f0f0f0"/>
            </radialGradient>
        </defs>
        <ellipse cx="45" cy="40" rx="30" ry="35" fill="url(#mediumSkull1Grad)" stroke="#333" stroke-width="2"/>
        <circle cx="36" cy="32" r="7" fill="#000"/>
        <circle cx="54" cy="32" r="7" fill="#000"/>
        <path d="M40 45 Q45 50 50 45" stroke="#000" stroke-width="2" fill="none"/>
        <rect x="43" y="55" width="4" height="10" fill="#000"/>
        <rect x="41" y="67" width="2" height="4" fill="#000"/>
        <rect x="47" y="67" width="2" height="4" fill="#000"/>
        <circle cx="38" cy="35" r="2" fill="#9c27b0"/>
        <circle cx="52" cy="35" r="2" fill="#9c27b0"/>
        <path d="M30 50 Q36 55 42 50" stroke="#ff6b35" stroke-width="2" fill="none"/>
        <path d="M48 50 Q54 55 60 50" stroke="#ff6b35" stroke-width="2" fill="none"/>
        <circle cx="20" cy="25" r="4" fill="#ffd700"/>
        <circle cx="70" cy="30" r="4" fill="#ff1744"/>
        <path d="M15 45 Q20 40 25 45" stroke="#00bcd4" stroke-width="1.5" fill="none"/>
        <path d="M65 45 Q70 40 75 45" stroke="#00bcd4" stroke-width="1.5" fill="none"/>
    </svg>`,

  tinySkull: `<svg viewBox="0 0 40 50" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <radialGradient id="tinySkullGrad" cx="50%" cy="30%" r="70%">
                <stop offset="0%" style="stop-color:#ffffff"/>
                <stop offset="100%" style="stop-color:#f0f0f0"/>
            </radialGradient>
        </defs>
        <ellipse cx="20" cy="22" rx="15" ry="18" fill="url(#tinySkullGrad)" stroke="#333" stroke-width="1"/>
        <circle cx="16" cy="18" r="3" fill="#000"/>
        <circle cx="24" cy="18" r="3" fill="#000"/>
        <path d="M18 24 Q20 26 22 24" stroke="#000" stroke-width="1" fill="none"/>
        <rect x="19" y="28" width="2" height="4" fill="#000"/>
        <rect x="18" y="33" width="1" height="2" fill="#000"/>
        <rect x="21" y="33" width="1" height="2" fill="#000"/>
        <circle cx="17" cy="19" r="0.5" fill="#ff6b35"/>
        <circle cx="23" cy="19" r="0.5" fill="#ff6b35"/>
    </svg>`,

  // Item especial de cruz para líneas de 4
  crossCandle: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <radialGradient id="crossCandleGrad" cx="50%" cy="50%" r="50%">
                <stop offset="0%" style="stop-color:#ffd700"/>
                <stop offset="100%" style="stop-color:#ff6b35"/>
            </radialGradient>
            <linearGradient id="flameGrad2" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" style="stop-color:#ffd700"/>
                <stop offset="50%" style="stop-color:#ff6b35"/>
                <stop offset="100%" style="stop-color:#ff1744"/>
            </linearGradient>
        </defs>
        
        <!-- Cruz base -->
        <rect x="45" y="20" width="10" height="60" fill="url(#crossCandleGrad)" stroke="#333" stroke-width="1"/>
        <rect x="25" y="45" width="50" height="10" fill="url(#crossCandleGrad)" stroke="#333" stroke-width="1"/>
        
        <!-- Llama central -->
        <ellipse cx="50" cy="15" rx="6" ry="10" fill="url(#flameGrad2)"/>
        <ellipse cx="50" cy="13" rx="3" ry="6" fill="#ffd700"/>
        
        <!-- Decoraciones de cempasúchil -->
        <circle cx="35" cy="35" r="4" fill="#ff8c00"/>
        <circle cx="65" cy="35" r="4" fill="#ff8c00"/>
        <circle cx="35" cy="65" r="4" fill="#ff8c00"/>
        <circle cx="65" cy="65" r="4" fill="#ff8c00"/>
        
        <!-- Pétalos decorativos -->
        <path d="M30 35 Q35 30 40 35 Q35 40 30 35" fill="#ffd700"/>
        <path d="M60 35 Q65 30 70 35 Q65 40 60 35" fill="#ffd700"/>
        <path d="M30 65 Q35 60 40 65 Q35 70 30 65" fill="#ffd700"/>
        <path d="M60 65 Q65 60 70 65 Q65 70 60 65" fill="#ffd700"/>
        
        <!-- Líneas de poder -->
        <path d="M10 50 L25 50 M75 50 L90 50" stroke="#ffd700" stroke-width="3" opacity="0.8"/>
        <path d="M50 10 L50 20 M50 80 L50 90" stroke="#ffd700" stroke-width="3" opacity="0.8"/>
        
        <!-- Chispas -->
        <circle cx="20" cy="50" r="2" fill="#ffd700"/>
        <circle cx="80" cy="50" r="2" fill="#ffd700"/>
        <circle cx="50" cy="5" r="2" fill="#ffd700"/>
        <circle cx="50" cy="95" r="2" fill="#ffd700"/>
    </svg>`,

  // Gato del Día de los Muertos
  catSymbol: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <radialGradient id="catBodyGrad" cx="50%" cy="50%" r="50%">
                <stop offset="0%" style="stop-color:#2c1810"/>
                <stop offset="50%" style="stop-color:#1a1a1a"/>
                <stop offset="100%" style="stop-color:#000000"/>
            </radialGradient>
            <radialGradient id="catEyeGrad" cx="50%" cy="50%" r="50%">
                <stop offset="0%" style="stop-color:#ffd700"/>
                <stop offset="100%" style="stop-color:#ff6b35"/>
            </radialGradient>
        </defs>
        
        <!-- Sombra del gato -->
        <ellipse cx="52" cy="85" rx="20" ry="8" fill="#000" opacity="0.3"/>
        
        <!-- Cola del gato -->
        <path d="M25 65 Q15 50 20 35 Q25 25 35 30" stroke="#2c1810" stroke-width="8" fill="none" stroke-linecap="round"/>
        
        <!-- Cuerpo principal -->
        <ellipse cx="50" cy="65" rx="22" ry="25" fill="url(#catBodyGrad)" stroke="#ff6b35" stroke-width="2"/>
        
        <!-- Cabeza -->
        <circle cx="50" cy="40" r="18" fill="url(#catBodyGrad)" stroke="#ff6b35" stroke-width="2"/>
        
        <!-- Orejas -->
        <path d="M35 30 L30 15 L45 25 Z" fill="url(#catBodyGrad)" stroke="#ff6b35" stroke-width="2"/>
        <path d="M65 30 L70 15 L55 25 Z" fill="url(#catBodyGrad)" stroke="#ff6b35" stroke-width="2"/>
        <path d="M37 25 L33 18 L42 23 Z" fill="#ff1744"/>
        <path d="M63 25 L67 18 L58 23 Z" fill="#ff1744"/>
        
        <!-- Ojos brillantes -->
        <ellipse cx="44" cy="37" rx="3" ry="5" fill="url(#catEyeGrad)"/>
        <ellipse cx="56" cy="37" rx="3" ry="5" fill="url(#catEyeGrad)"/>
        <ellipse cx="44" cy="35" rx="1" ry="3" fill="#000"/>
        <ellipse cx="56" cy="35" rx="1" ry="3" fill="#000"/>
        
        <!-- Nariz -->
        <path d="M50 42 L47 45 L53 45 Z" fill="#ff6b35"/>
        
        <!-- Boca -->
        <path d="M50 45 Q46 48 42 46" stroke="#ff6b35" stroke-width="2" fill="none"/>
        <path d="M50 45 Q54 48 58 46" stroke="#ff6b35" stroke-width="2" fill="none"/>
        
        <!-- Bigotes -->
        <path d="M25 40 L35 38" stroke="#ffd700" stroke-width="2"/>
        <path d="M25 44 L35 42" stroke="#ffd700" stroke-width="2"/>
        <path d="M75 40 L65 38" stroke="#ffd700" stroke-width="2"/>
        <path d="M75 44 L65 42" stroke="#ffd700" stroke-width="2"/>
        
        <!-- Patas -->
        <ellipse cx="40" cy="85" rx="5" ry="8" fill="url(#catBodyGrad)"/>
        <ellipse cx="60" cy="85" rx="5" ry="8" fill="url(#catBodyGrad)"/>
        
        <!-- Decoraciones del Día de los Muertos -->
        <circle cx="35" cy="50" r="3" fill="#ffd700" opacity="0.8">
            <animate attributeName="opacity" values="0.5;1;0.5" dur="2s" repeatCount="indefinite"/>
        </circle>
        <circle cx="65" cy="50" r="3" fill="#ff6b35" opacity="0.8">
            <animate attributeName="opacity" values="0.5;1;0.5" dur="2s" repeatCount="indefinite" begin="1s"/>
        </circle>
        <path d="M50 55 L48 60 L52 60 Z" fill="#ff1744"/>
    </svg>`,

  // Fantasma del Día de los Muertos
  ghostSymbol: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <radialGradient id="ghostGrad" cx="50%" cy="40%" r="60%">
                <stop offset="0%" style="stop-color:#ffffff"/>
                <stop offset="70%" style="stop-color:#f0f0f0"/>
                <stop offset="100%" style="stop-color:#e0e0e0"/>
            </radialGradient>
            <radialGradient id="ghostEyeGrad" cx="50%" cy="50%" r="50%">
                <stop offset="0%" style="stop-color:#ff1744"/>
                <stop offset="100%" style="stop-color:#8b0000"/>
            </radialGradient>
        </defs>
        
        <!-- Sombra del fantasma -->
        <ellipse cx="52" cy="90" rx="25" ry="6" fill="#000" opacity="0.2"/>
        
        <!-- Cuerpo principal del fantasma -->
        <path d="M50 20 
                 C35 20 25 35 25 50
                 L25 75
                 L30 70 L35 75 L40 70 L45 75 L50 70 L55 75 L60 70 L65 75 L70 70 L75 75
                 L75 50
                 C75 35 65 20 50 20 Z" 
              fill="url(#ghostGrad)" stroke="#ff6b35" stroke-width="2" opacity="0.9"/>
        
        <!-- Ojos del fantasma -->
        <circle cx="42" cy="40" r="6" fill="url(#ghostEyeGrad)"/>
        <circle cx="58" cy="40" r="6" fill="url(#ghostEyeGrad)"/>
        <circle cx="42" cy="38" r="2" fill="#000"/>
        <circle cx="58" cy="38" r="2" fill="#000"/>
        
        <!-- Boca -->
        <ellipse cx="50" cy="52" rx="8" ry="6" fill="#000" opacity="0.8"/>
        <ellipse cx="50" cy="50" rx="6" ry="4" fill="#ff1744"/>
        
        <!-- Decoraciones del Día de los Muertos en el fantasma -->
        <circle cx="35" cy="30" r="2" fill="#ffd700">
            <animate attributeName="r" values="1.5;3;1.5" dur="2s" repeatCount="indefinite"/>
        </circle>
        <circle cx="65" cy="30" r="2" fill="#ff6b35">
            <animate attributeName="r" values="1.5;3;1.5" dur="2s" repeatCount="indefinite" begin="1s"/>
        </circle>
        <circle cx="50" cy="25" r="2" fill="#9c27b0">
            <animate attributeName="r" values="1.5;3;1.5" dur="2s" repeatCount="indefinite" begin="0.5s"/>
        </circle>
        
        <!-- Patrón de flores en el cuerpo -->
        <path d="M40 60 Q42 58 44 60 Q42 62 40 60" fill="#ff6b35" opacity="0.7"/>
        <path d="M56 60 Q58 58 60 60 Q58 62 56 60" fill="#ffd700" opacity="0.7"/>
        <circle cx="42" cy="60" r="1" fill="#ff1744"/>
        <circle cx="58" cy="60" r="1" fill="#ff1744"/>
        
        <!-- Efecto de flotación -->
        <animateTransform attributeName="transform" type="translate" 
                         values="0,0; 0,-3; 0,0" dur="3s" repeatCount="indefinite"/>
    </svg>`,
};

// Create SVG elements from strings
function createSVGElement(svgString, size = 50) {
  const div = document.createElement("div");
  div.innerHTML = svgString;
  const svg = div.querySelector("svg");
  svg.setAttribute("width", size);
  svg.setAttribute("height", size);
  return svg;
}

// Convert SVG to canvas image
function svgToCanvas(svgString, size = 50) {
  return new Promise((resolve) => {
    const svg = createSVGElement(svgString, size);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = size;
    canvas.height = size;

    const img = new Image();
    const svgBlob = new Blob([svgString], { type: "image/svg+xml" });
    const url = URL.createObjectURL(svgBlob);

    img.onload = () => {
      ctx.drawImage(img, 0, 0, size, size);
      URL.revokeObjectURL(url);
      resolve(canvas);
    };

    img.src = url;
  });
}
