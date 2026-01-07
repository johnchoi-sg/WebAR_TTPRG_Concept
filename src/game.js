// Main Game Entry Point
import { CONFIG } from './config.js';
import { state, initThreeObjects } from './state.js';
import { detectMobile } from './device.js';
import { createWorld, setupLights } from './world.js';
import { createCharacter, updateCharacter } from './character.js';
import { setupKeyboardControls, setupTouchJoystick } from './controls.js';
import { updateCamera, setupResizeHandler } from './camera.js';
import { initAR } from './ar.js';
import { applyDeadReckoning } from './sensors.js';
import { updateDebugPanel } from './debug.js';

// Initialize Game
async function init() {
    console.log('🎮 Initializing game...');
    
    // Initialize Three.js objects
    initThreeObjects();
    
    // Detect device type
    state.isMobile = detectMobile();
    state.isARMode = state.isMobile;
    
    // Show appropriate UI
    if (state.isARMode) {
        document.getElementById('desktop-info').style.display = 'none';
        document.getElementById('mobile-info').style.display = 'block';
        await initAR(state);
        setupTouchJoystick(state);
    } else {
        document.getElementById('mobile-info').style.display = 'none';
        document.getElementById('desktop-info').style.display = 'block';
        initDesktop();
        setupKeyboardControls(state);
    }
    
    // Start animation loop
    animate();
    
    console.log('✅ Game initialized successfully!');
}

// Initialize Desktop Mode
function initDesktop() {
    console.log('🖥️ Initializing Desktop mode...');
    
    // Create Scene
    state.scene = new THREE.Scene();
    state.scene.background = new THREE.Color(0x87ceeb);
    
    // Setup Camera
    state.camera = new THREE.PerspectiveCamera(
        45,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    );
    
    // Setup Renderer
    state.renderer = new THREE.WebGLRenderer({ antialias: true });
    state.renderer.setSize(window.innerWidth, window.innerHeight);
    state.renderer.shadowMap.enabled = true;
    state.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    document.getElementById('desktop-container').appendChild(state.renderer.domElement);
    
    // Setup Lights
    setupLights(state.scene);
    
    // Create World and Character
    state.worldMap = createWorld(state.scene);
    state.character = createCharacter(state.scene);
    
    // Position camera for isometric view
    updateCamera(state.camera, state.character);
    
    // Handle window resize
    setupResizeHandler(state.camera, state.renderer);
}

// Animation Loop
function animate() {
    requestAnimationFrame(animate);
    
    if (state.isARMode) {
        // AR Mode Animation
        if (state.mindarThree) {
            // Update character
            updateCharacter(state.character, state, true);
            
            // Apply dead reckoning if marker is lost
            if (state.usingDeadReckoning) {
                applyDeadReckoning(state);
            }
            
            // Update debug panel
            updateDebugPanel(state, true);
            
            // Render with MindAR
            state.renderer.render(state.scene, state.camera);
        }
    } else {
        // Desktop Mode Animation
        updateCharacter(state.character, state, false);
        updateCamera(state.camera, state.character);
        state.renderer.render(state.scene, state.camera);
    }
    
    state.frameCount++;
}

// Start the game when page loads
window.addEventListener('DOMContentLoaded', init);
