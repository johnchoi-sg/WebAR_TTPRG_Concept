/**
 * Game Scene Manager
 * Separate Three.js scene for game rendering (overlays on top of AR)
 */

export class GameScene {
    constructor() {
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.container = null;
        
        // Game objects
        this.ground = null;
        this.character = null;
    }

    /**
     * Initialize the game scene
     */
    init(container) {
        console.log('🎮 Initializing game scene...');
        
        this.container = container;

        // Create Three.js scene
        this.scene = new THREE.Scene();
        
        // Create camera with isometric view
        const aspect = window.innerWidth / window.innerHeight;
        this.camera = new THREE.PerspectiveCamera(60, aspect, 0.1, 1000);
        
        // Isometric-style position (45° angle, elevated)
        this.camera.position.set(3, 3, 3);  // Diagonal view from above
        this.camera.lookAt(0, 0, 0);        // Look at center of board
        
        console.log('📷 Default camera position:', this.camera.position);

        // Create renderer with transparency (no depth clear)
        this.renderer = new THREE.WebGLRenderer({ 
            alpha: true,           // Transparent background
            antialias: true,
            preserveDrawingBuffer: true
        });
        
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setClearColor(0x000000, 0); // Fully transparent
        this.renderer.autoClear = false;          // Don't auto clear
        
        // Append to container
        this.container.appendChild(this.renderer.domElement);
        
        // Style the canvas to overlay
        this.renderer.domElement.style.position = 'absolute';
        this.renderer.domElement.style.top = '0';
        this.renderer.domElement.style.left = '0';
        this.renderer.domElement.style.pointerEvents = 'none'; // Allow clicks through
        this.renderer.domElement.style.zIndex = '1'; // On top of AR scene

        // Add lights
        this.setupLights();
        
        // Create game objects
        this.createGameObjects();
        
        console.log('✅ Game scene initialized');
    }

    /**
     * Setup lighting
     */
    setupLights() {
        // Ambient light
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
        this.scene.add(ambientLight);

        // Directional light
        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
        directionalLight.position.set(5, 10, 5);
        this.scene.add(directionalLight);
    }

    /**
     * Create game objects
     */
    createGameObjects() {
        // Ground plane (green)
        const groundGeometry = new THREE.PlaneGeometry(2, 2);
        const groundMaterial = new THREE.MeshStandardMaterial({ 
            color: 0x3a7d44,
            side: THREE.DoubleSide
        });
        this.ground = new THREE.Mesh(groundGeometry, groundMaterial);
        this.ground.rotation.x = -Math.PI / 2;
        this.scene.add(this.ground);

        // Character box (cyan)
        const characterGeometry = new THREE.BoxGeometry(0.2, 0.3, 0.2);
        const characterMaterial = new THREE.MeshStandardMaterial({ 
            color: 0x4ecca3
        });
        this.character = new THREE.Mesh(characterGeometry, characterMaterial);
        this.character.position.y = 0.15;
        this.scene.add(this.character);

        console.log('✅ Game objects created');
    }

    /**
     * Update camera to match AR tracking
     * Applies inverse transform so game objects appear at marker position
     */
    updateFromARTracking(position, rotation) {
        if (!position || !rotation) return;

        // Scale factor to normalize huge AR values (adjust if needed)
        const SCALE = 0.001; // Convert from mm to meters (or similar)
        
        // Scale position
        const scaledPos = position.clone().multiplyScalar(SCALE);

        // Simple approach: Just set camera position/rotation directly
        // Inverse transform: negate position, invert rotation
        this.camera.position.set(
            -scaledPos.x,
            -scaledPos.y + 2,  // Offset up a bit
            -scaledPos.z + 3   // Offset back a bit
        );
        
        // Look at the origin (where the marker/objects are)
        this.camera.lookAt(0, 0, 0);
        
        // Re-enable auto update
        this.camera.matrixAutoUpdate = true;
        
        // Log occasionally (not every frame)
        if (Math.random() < 0.02) {
            console.log('📷 Camera updated:', {
                rawPos: position,
                scaledPos: scaledPos,
                cameraPos: this.camera.position.clone()
            });
        }
    }

    /**
     * Render the game scene
     */
    render() {
        if (!this.renderer || !this.scene || !this.camera) return;
        
        // Clear both color and depth buffers
        this.renderer.clear(true, true, true);
        
        // Render game scene
        this.renderer.render(this.scene, this.camera);
    }

    /**
     * Handle window resize
     */
    resize() {
        if (!this.camera || !this.renderer) return;

        const width = window.innerWidth;
        const height = window.innerHeight;

        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();
        
        this.renderer.setSize(width, height);
    }

    /**
     * Get character position for game logic
     */
    getCharacterPosition() {
        return this.character ? this.character.position : null;
    }

    /**
     * Move character (for testing)
     */
    moveCharacter(x, y, z) {
        if (this.character) {
            this.character.position.set(x, y, z);
        }
    }
}

