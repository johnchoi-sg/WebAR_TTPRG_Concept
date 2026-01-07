// Global Game State
export const state = {
    // Three.js objects
    scene: null,
    camera: null,
    renderer: null,
    character: null,
    worldMap: null,
    
    // Device detection
    isMobile: false,
    isARMode: false,
    
    // AR objects
    mindarThree: null,
    anchor: null,
    markerVisible: false,
    
    // Input state
    keys: {},
    joystickActive: false,
    joystickVector: { x: 0, y: 0 },
    
    // Device orientation tracking
    deviceOrientation: {
        alpha: 0,
        beta: 0,
        gamma: 0,
        available: false
    },
    
    // Accelerometer
    deviceAcceleration: { x: 0, y: 0, z: 0 },
    
    // Dead reckoning
    lastMarkerPosition: null,
    lastMarkerRotation: null,
    usingDeadReckoning: false,
    
    // Animation
    frameCount: 0
};

// Initialize Three.js objects
export function initThreeObjects() {
    state.lastMarkerPosition = new THREE.Vector3();
    state.lastMarkerRotation = new THREE.Euler();
}

