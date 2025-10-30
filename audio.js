class AudioManager {
    constructor() {
        this.audioContext = null;
        this.backgroundMusic = null;
        this.isMuted = false;
        this.isPlaying = false;
        this.masterVolume = 0.3;
        
        // Referencias a elementos de audio
        this.backgroundMusicElement = document.getElementById('backgroundMusic');
        this.matchSoundElement = document.getElementById('matchSound');
        this.specialSoundElement = document.getElementById('specialSound');
        this.failSoundElement = document.getElementById('failSound');
        
        this.initAudioContext();
        this.generateAudioData();
        this.setupEventListeners();
    }
    
    initAudioContext() {
        try {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        } catch (e) {
            console.warn('Web Audio API not supported');
        }
    }
    
    generateAudioData() {
        // Generar música de fondo tipo arcade con Web Audio API
        this.generateBackgroundMusic();
        this.generateSoundEffects();
    }
    
    generateBackgroundMusic() {
        if (!this.audioContext) return;
        
        // Crear una melodía simple tipo arcade
        const sampleRate = this.audioContext.sampleRate;
        const duration = 8; // 8 segundos de loop
        const length = sampleRate * duration;
        const buffer = this.audioContext.createBuffer(2, length, sampleRate);
        
        // Notas de la melodía (frecuencias en Hz) - tema mexicano/festivo
        const melody = [
            523.25, 587.33, 659.25, 698.46, 783.99, 698.46, 659.25, 587.33, // C5, D5, E5, F5, G5, F5, E5, D5
            523.25, 587.33, 659.25, 698.46, 783.99, 880.00, 783.99, 698.46, // C5, D5, E5, F5, G5, A5, G5, F5
            659.25, 698.46, 783.99, 880.00, 987.77, 880.00, 783.99, 698.46, // E5, F5, G5, A5, B5, A5, G5, F5
            659.25, 587.33, 523.25, 466.16, 523.25, 587.33, 659.25, 523.25  // E5, D5, C5, Bb4, C5, D5, E5, C5
        ];
        
        const bassLine = [
            261.63, 261.63, 329.63, 329.63, 392.00, 392.00, 329.63, 329.63, // C4, C4, E4, E4, G4, G4, E4, E4
            261.63, 261.63, 329.63, 329.63, 392.00, 392.00, 349.23, 349.23, // C4, C4, E4, E4, G4, G4, F4, F4
            329.63, 329.63, 392.00, 392.00, 440.00, 440.00, 392.00, 392.00, // E4, E4, G4, G4, A4, A4, G4, G4
            329.63, 293.66, 261.63, 233.08, 261.63, 293.66, 329.63, 261.63  // E4, D4, C4, Bb3, C4, D4, E4, C4
        ];
        
        for (let channel = 0; channel < 2; channel++) {
            const channelData = buffer.getChannelData(channel);
            
            for (let i = 0; i < length; i++) {
                const time = i / sampleRate;
                const noteIndex = Math.floor((time * 4) % melody.length); // 4 notas por segundo
                const bassIndex = Math.floor((time * 2) % bassLine.length); // 2 notas por segundo para el bajo
                
                // Melodía principal con forma de onda cuadrada suavizada
                const melodyFreq = melody[noteIndex];
                const melodyWave = Math.sin(2 * Math.PI * melodyFreq * time) * 0.3;
                const melodySquare = Math.sign(Math.sin(2 * Math.PI * melodyFreq * time)) * 0.2;
                const melodyMix = melodyWave + melodySquare * 0.5;
                
                // Línea de bajo con onda triangular
                const bassFreq = bassLine[bassIndex];
                const bassWave = this.triangleWave(2 * Math.PI * bassFreq * time) * 0.4;
                
                // Percusión simple (kick en beats 1 y 3)
                const beatTime = (time * 2) % 2;
                const kick = beatTime < 0.1 || (beatTime > 1 && beatTime < 1.1) ? 
                    Math.random() * 0.3 * Math.exp(-beatTime * 10) : 0;
                
                // Hi-hat en off-beats
                const hihat = (beatTime > 0.5 && beatTime < 0.52) || (beatTime > 1.5 && beatTime < 1.52) ?
                    (Math.random() - 0.5) * 0.1 : 0;
                
                // Envelope para suavizar
                const envelope = Math.sin(Math.PI * (time % (1/4)) * 4) * 0.8 + 0.2;
                
                channelData[i] = (melodyMix * envelope + bassWave + kick + hihat) * this.masterVolume;
            }
        }
        
        // Convertir a base64 y asignar al elemento audio
        this.bufferToWav(buffer).then(wavData => {
            this.backgroundMusicElement.src = wavData;
        });
    }
    
    generateSoundEffects() {
        if (!this.audioContext) return;
        
        // Sonido de match exitoso
        this.generateMatchSound();
        
        // Sonido especial para poderes
        this.generateSpecialSound();
        
        // Sonido de fallo
        this.generateFailSound();
    }
    
    generateMatchSound() {
        const sampleRate = this.audioContext.sampleRate;
        const duration = 0.5;
        const length = sampleRate * duration;
        const buffer = this.audioContext.createBuffer(1, length, sampleRate);
        const channelData = buffer.getChannelData(0);
        
        for (let i = 0; i < length; i++) {
            const time = i / sampleRate;
            const freq = 800 + Math.sin(time * 20) * 200; // Frecuencia que sube
            const envelope = Math.exp(-time * 3);
            channelData[i] = Math.sin(2 * Math.PI * freq * time) * envelope * 0.3;
        }
        
        this.bufferToWav(buffer).then(wavData => {
            this.matchSoundElement.src = wavData;
        });
    }
    
    generateSpecialSound() {
        const sampleRate = this.audioContext.sampleRate;
        const duration = 1.0;
        const length = sampleRate * duration;
        const buffer = this.audioContext.createBuffer(1, length, sampleRate);
        const channelData = buffer.getChannelData(0);
        
        for (let i = 0; i < length; i++) {
            const time = i / sampleRate;
            const freq1 = 1200 + Math.sin(time * 15) * 400;
            const freq2 = 600 + Math.cos(time * 10) * 200;
            const envelope = Math.exp(-time * 2);
            const sparkle = Math.sin(2 * Math.PI * freq1 * time) + Math.sin(2 * Math.PI * freq2 * time);
            channelData[i] = sparkle * envelope * 0.2;
        }
        
        this.bufferToWav(buffer).then(wavData => {
            this.specialSoundElement.src = wavData;
        });
    }
    
    generateFailSound() {
        const sampleRate = this.audioContext.sampleRate;
        const duration = 0.3;
        const length = sampleRate * duration;
        const buffer = this.audioContext.createBuffer(1, length, sampleRate);
        const channelData = buffer.getChannelData(0);
        
        for (let i = 0; i < length; i++) {
            const time = i / sampleRate;
            const freq = 200 - time * 100; // Frecuencia que baja
            const envelope = Math.exp(-time * 5);
            channelData[i] = Math.sin(2 * Math.PI * freq * time) * envelope * 0.4;
        }
        
        this.bufferToWav(buffer).then(wavData => {
            this.failSoundElement.src = wavData;
        });
    }
    
    triangleWave(phase) {
        return (2 / Math.PI) * Math.asin(Math.sin(phase));
    }
    
    async bufferToWav(buffer) {
        const length = buffer.length;
        const numberOfChannels = buffer.numberOfChannels;
        const sampleRate = buffer.sampleRate;
        const arrayBuffer = new ArrayBuffer(44 + length * numberOfChannels * 2);
        const view = new DataView(arrayBuffer);
        
        // WAV header
        const writeString = (offset, string) => {
            for (let i = 0; i < string.length; i++) {
                view.setUint8(offset + i, string.charCodeAt(i));
            }
        };
        
        writeString(0, 'RIFF');
        view.setUint32(4, 36 + length * numberOfChannels * 2, true);
        writeString(8, 'WAVE');
        writeString(12, 'fmt ');
        view.setUint32(16, 16, true);
        view.setUint16(20, 1, true);
        view.setUint16(22, numberOfChannels, true);
        view.setUint32(24, sampleRate, true);
        view.setUint32(28, sampleRate * numberOfChannels * 2, true);
        view.setUint16(32, numberOfChannels * 2, true);
        view.setUint16(34, 16, true);
        writeString(36, 'data');
        view.setUint32(40, length * numberOfChannels * 2, true);
        
        // Convert float samples to 16-bit PCM
        let offset = 44;
        for (let i = 0; i < length; i++) {
            for (let channel = 0; channel < numberOfChannels; channel++) {
                const sample = Math.max(-1, Math.min(1, buffer.getChannelData(channel)[i]));
                view.setInt16(offset, sample * 0x7FFF, true);
                offset += 2;
            }
        }
        
        const blob = new Blob([arrayBuffer], { type: 'audio/wav' });
        return URL.createObjectURL(blob);
    }
    
    setupEventListeners() {
        const soundToggle = document.getElementById('soundToggle');
        if (soundToggle) {
            soundToggle.addEventListener('click', () => {
                this.toggleSound();
            });
        }
        
        // Auto-play cuando el usuario interactúa por primera vez
        document.addEventListener('click', () => {
            if (!this.isPlaying && !this.isMuted) {
                this.startBackgroundMusic();
            }
        }, { once: true });
        
        document.addEventListener('touchstart', () => {
            if (!this.isPlaying && !this.isMuted) {
                this.startBackgroundMusic();
            }
        }, { once: true });
    }
    
    startBackgroundMusic() {
        if (this.backgroundMusicElement && !this.isMuted) {
            this.backgroundMusicElement.volume = this.masterVolume;
            this.backgroundMusicElement.play().catch(e => {
                console.warn('Could not play background music:', e);
            });
            this.isPlaying = true;
        }
    }
    
    stopBackgroundMusic() {
        if (this.backgroundMusicElement) {
            this.backgroundMusicElement.pause();
            this.backgroundMusicElement.currentTime = 0;
            this.isPlaying = false;
        }
    }
    
    toggleSound() {
        this.isMuted = !this.isMuted;
        const soundToggle = document.getElementById('soundToggle');
        
        if (this.isMuted) {
            this.stopBackgroundMusic();
            soundToggle.classList.add('muted');
            soundToggle.title = 'Unmute Sound';
        } else {
            this.startBackgroundMusic();
            soundToggle.classList.remove('muted');
            soundToggle.title = 'Mute Sound';
        }
    }
    
    playMatchSound() {
        if (!this.isMuted && this.matchSoundElement) {
            this.matchSoundElement.currentTime = 0;
            this.matchSoundElement.volume = this.masterVolume * 0.7;
            this.matchSoundElement.play().catch(e => console.warn('Could not play match sound:', e));
        }
    }
    
    playSpecialSound() {
        if (!this.isMuted && this.specialSoundElement) {
            this.specialSoundElement.currentTime = 0;
            this.specialSoundElement.volume = this.masterVolume * 0.8;
            this.specialSoundElement.play().catch(e => console.warn('Could not play special sound:', e));
        }
    }
    
    playFailSound() {
        if (!this.isMuted && this.failSoundElement) {
            this.failSoundElement.currentTime = 0;
            this.failSoundElement.volume = this.masterVolume * 0.6;
            this.failSoundElement.play().catch(e => console.warn('Could not play fail sound:', e));
        }
    }
    
    setVolume(volume) {
        this.masterVolume = Math.max(0, Math.min(1, volume));
        if (this.backgroundMusicElement) {
            this.backgroundMusicElement.volume = this.masterVolume;
        }
    }
}