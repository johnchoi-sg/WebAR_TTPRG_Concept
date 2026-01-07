// Game Configuration
const CONFIG = {
    character: {
        speed: 0.05,
        size: 0.3
    },
    camera: {
        distance: 8,  // Distance behind character
        height: 6,    // Height above character
        angle: Math.PI / 4 // Reserved for future use
    },
    world: {
        size: 5
    }
};

// Global Game State
let scene, camera, renderer;
let character, worldMap;
let isMobile = false;
let isARMode = false;
let mindarThree, anchor;
let markerVisible = false;

// Input State
let keys = {};
let joystickActive = false;
let joystickVector = { x: 0, y: 0 };

// Device orientation tracking for dead reckoning
let deviceOrientation = {
    alpha: 0,  // Z-axis rotation (compass)
    beta: 0,   // X-axis rotation (front-to-back tilt)
    gamma: 0,  // Y-axis rotation (left-to-right tilt)
    available: false
};

// Initialize with default values to avoid null/undefined
let deviceAcceleration = { x: 0, y: 0, z: 0 };

let lastMarkerPosition = new THREE.Vector3();
let lastMarkerRotation = new THREE.Euler();
let usingDeadReckoning = false;

// Update marker visibility flag
function setMarkerVisible(visible) {
    markerVisible = visible;
    
    if (visible && anchor && anchor.group) {
        // Store last known anchor position/rotation
        lastMarkerPosition.copy(anchor.group.position);
        lastMarkerRotation.copy(anchor.group.rotation);
        usingDeadReckoning = false;
    } else {
        // Lost marker, switch to dead reckoning
        usingDeadReckoning = true;
        console.log('📍 Target lost, using dead reckoning with device orientation');
    }
}

// Initialize the game
function init() {
    detectDevice();
    
    if (isMobile) {
        initAR();
    } else {
        initDesktop();
    }
    
    setupControls();
    animate();
}

// Detect if device is mobile
function detectDevice() {
    isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    const deviceInfo = document.getElementById('device-info');
    const controlsInfo = document.getElementById('controls-info');
    
    if (isMobile) {
        deviceInfo.textContent = '📱 Mobile Device - AR Mode';
        controlsInfo.textContent = 'Point camera at AR marker. Use joystick to move character.';
        isARMode = true;
    } else {
        deviceInfo.textContent = '🖥️ Desktop Mode';
        controlsInfo.textContent = 'Use Arrow Keys or WASD to move character.';
        isARMode = false;
    }
}

// Initialize Desktop Mode
function initDesktop() {
    // Setup Scene
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x1a1a2e);
    
    // Setup Camera (Isometric view)
    camera = new THREE.PerspectiveCamera(
        45,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    );
    
    // Setup Renderer
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    document.getElementById('desktop-container').appendChild(renderer.domElement);
    
    // Setup Lights
    setupLights();
    
    // Create World and Character
    createWorld();
    createCharacter();
    
    // Position camera for isometric view
    updateCamera();
    
    // Handle window resize
    window.addEventListener('resize', onWindowResize);
}

// Initialize AR Mode with MindAR
async function initAR() {
    console.log('🚀 Initializing MindAR mode...');
    document.getElementById('ar-container').style.display = 'block';
    document.getElementById('joystick-container').style.display = 'block';
    
    // Create MindAR instance
    const container = document.getElementById('ar-container');
    
    mindarThree = new window.MINDAR.IMAGE.MindARThree({
        container: container,
        imageTargetSrc: 'https://cdn.jsdelivr.net/gh/hiukim/mind-ar-js@1.2.2/examples/image-tracking/assets/card-example/card.mind'
    });
    
    const {renderer: arRenderer, scene: arScene, camera: arCamera} = mindarThree;
    
    // Use MindAR's renderer, scene, and camera
    renderer = arRenderer;
    scene = arScene;
    camera = arCamera;
    
    console.log('✅ MindAR initialized');
    
    // Setup Lights
    setupLights();
    
    // Create anchor (where objects attach when marker detected)
    anchor = mindarThree.addAnchor(0);
    console.log('✅ Anchor created');
    
    // Track marker visibility
    anchor.onTargetFound = () => {
        console.log('✅ Target found!');
        setMarkerVisible(true);
    };
    
    anchor.onTargetLost = () => {
        console.log('❌ Target lost!');
        setMarkerVisible(false);
    };
    
    // Create World and Character attached to anchor
    createWorld(anchor.group);
    createCharacter(anchor.group);
    
    console.log('✅ World and character created on anchor');
    
    // Setup device orientation for dead reckoning
    setupDeviceOrientation();
    
    // Setup debug panel
    setupDebugPanel();
    
    // Start MindAR
    try {
        await mindarThree.start();
        console.log('✅ MindAR started successfully!');
    } catch (error) {
        console.error('❌ MindAR start error:', error);
        alert('Failed to start AR. Please grant camera permissions and use HTTPS.');
    }
    
    console.log('🎉 AR initialization complete!');
}

// AR Resize Handler (MindAR handles this automatically)
function onARResize() {
    // MindAR handles resizing automatically
    console.log('Window resized');
}

// Setup Device Orientation for Dead Reckoning
function setupDeviceOrientation() {
    // Check if device orientation is supported
    if (window.DeviceOrientationEvent) {
        console.log('📱 Device orientation supported, enabling dead reckoning');
        
        // Request permission on iOS 13+
        if (typeof DeviceOrientationEvent.requestPermission === 'function') {
            DeviceOrientationEvent.requestPermission()
                .then(permissionState => {
                    if (permissionState === 'granted') {
                        window.addEventListener('deviceorientation', handleDeviceOrientation);
                        deviceOrientation.available = true;
                        console.log('✅ Device orientation permission granted');
                    } else {
                        console.log('⚠️ Device orientation permission denied');
                    }
                })
                .catch(console.error);
        } else {
            // Non-iOS or older iOS
            window.addEventListener('deviceorientation', handleDeviceOrientation);
            deviceOrientation.available = true;
            console.log('✅ Device orientation enabled');
        }
    } else {
        console.log('⚠️ Device orientation not supported');
    }
    
    // Also listen for device motion (accelerometer)
    if (window.DeviceMotionEvent) {
        window.addEventListener('devicemotion', handleDeviceMotion);
        console.log('✅ Device motion (accelerometer) enabled');
    }
}

// Handle Device Orientation Changes
let orientationEventCount = 0;
function handleDeviceOrientation(event) {
    deviceOrientation.alpha = event.alpha || 0;  // 0-360 degrees
    deviceOrientation.beta = event.beta || 0;    // -180 to 180 degrees
    deviceOrientation.gamma = event.gamma || 0;  // -90 to 90 degrees
    
    // Log first few events to confirm it's working
    orientationEventCount++;
    if (orientationEventCount <= 3) {
        console.log(`📱 Orientation event ${orientationEventCount}:`, {
            alpha: deviceOrientation.alpha.toFixed(1),
            beta: deviceOrientation.beta.toFixed(1),
            gamma: deviceOrientation.gamma.toFixed(1)
        });
    }
}

// Handle Device Motion (Accelerometer)
let motionEventCount = 0;
function handleDeviceMotion(event) {
    if (event.accelerationIncludingGravity) {
        deviceAcceleration.x = event.accelerationIncludingGravity.x || 0;
        deviceAcceleration.y = event.accelerationIncludingGravity.y || 0;
        deviceAcceleration.z = event.accelerationIncludingGravity.z || 0;
        
        // Log first few events to confirm it's working
        motionEventCount++;
        if (motionEventCount <= 3) {
            console.log(`📊 Motion event ${motionEventCount}:`, {
                x: deviceAcceleration.x.toFixed(2),
                y: deviceAcceleration.y.toFixed(2),
                z: deviceAcceleration.z.toFixed(2)
            });
        }
    }
}

// Setup Debug Panel
function setupDebugPanel() {
    const debugToggle = document.getElementById('debug-toggle');
    const debugPanel = document.getElementById('debug-panel');
    const debugClose = document.getElementById('debug-close');
    
    if (!debugToggle || !debugPanel || !debugClose) return;
    
    // Show debug toggle button
    debugToggle.style.display = 'block';
    
    // Toggle debug panel
    debugToggle.addEventListener('click', () => {
        const isVisible = debugPanel.style.display === 'block';
        debugPanel.style.display = isVisible ? 'none' : 'block';
        console.log('Debug panel:', isVisible ? 'hidden' : 'visible');
    });
    
    // Close button
    debugClose.addEventListener('click', () => {
        debugPanel.style.display = 'none';
    });
    
    // Request sensors button
    const requestSensorsBtn = document.getElementById('request-sensors-btn');
    if (requestSensorsBtn) {
        requestSensorsBtn.addEventListener('click', () => {
            console.log('📱 Manually requesting sensor permissions...');
            requestSensorPermissions();
        });
    }
    
    console.log('✅ Debug panel setup complete');
}

// Manually request sensor permissions (useful for iOS 13+)
function requestSensorPermissions() {
    if (typeof DeviceOrientationEvent !== 'undefined' && typeof DeviceOrientationEvent.requestPermission === 'function') {
        DeviceOrientationEvent.requestPermission()
            .then(permissionState => {
                if (permissionState === 'granted') {
                    console.log('✅ Device orientation permission granted!');
                    alert('✅ Sensor permissions granted!');
                    // Re-setup listeners
                    window.addEventListener('deviceorientation', handleDeviceOrientation);
                    deviceOrientation.available = true;
                } else {
                    console.log('❌ Device orientation permission denied');
                    alert('❌ Permission denied. Please allow in Settings.');
                }
            })
            .catch(err => {
                console.error('Error requesting permission:', err);
                alert('Error: ' + err.message);
            });
    } else {
        console.log('ℹ️ Permission API not available (Android or older iOS)');
        alert('ℹ️ Sensors should work automatically on this device.');
    }
}

// Update Debug Panel
function updateDebugPanel() {
    if (!isARMode) return;
    
    // Marker tracking
    const markerStatus = markerVisible ? '✅ Tracking' : (usingDeadReckoning ? '📍 Dead Reckoning' : '❌ Lost');
    updateDebugValue('debug-marker-status', markerStatus);
    updateDebugValue('debug-marker-visible', markerVisible ? 'Yes' : 'No');
    
    // Gyroscope
    updateDebugValue('debug-alpha', (deviceOrientation.alpha || 0).toFixed(1));
    updateDebugValue('debug-beta', (deviceOrientation.beta || 0).toFixed(1));
    updateDebugValue('debug-gamma', (deviceOrientation.gamma || 0).toFixed(1));
    updateDebugValue('debug-gyro-available', deviceOrientation.available ? 'Yes ✅' : 'No ❌');
    
    // Accelerometer
    updateDebugValue('debug-accel-x', (deviceAcceleration.x || 0).toFixed(2));
    updateDebugValue('debug-accel-y', (deviceAcceleration.y || 0).toFixed(2));
    updateDebugValue('debug-accel-z', (deviceAcceleration.z || 0).toFixed(2));
    
    // Camera position
    if (camera && camera.position) {
        updateDebugValue('debug-cam-x', camera.position.x.toFixed(2));
        updateDebugValue('debug-cam-y', camera.position.y.toFixed(2));
        updateDebugValue('debug-cam-z', camera.position.z.toFixed(2));
    } else {
        updateDebugValue('debug-cam-x', 'N/A');
        updateDebugValue('debug-cam-y', 'N/A');
        updateDebugValue('debug-cam-z', 'N/A');
    }
    
    // Camera rotation (convert to degrees)
    if (camera && camera.rotation) {
        updateDebugValue('debug-rot-x', (camera.rotation.x * 180 / Math.PI).toFixed(1));
        updateDebugValue('debug-rot-y', (camera.rotation.y * 180 / Math.PI).toFixed(1));
        updateDebugValue('debug-rot-z', (camera.rotation.z * 180 / Math.PI).toFixed(1));
    } else {
        updateDebugValue('debug-rot-x', 'N/A');
        updateDebugValue('debug-rot-y', 'N/A');
        updateDebugValue('debug-rot-z', 'N/A');
    }
    
    // Character position
    if (character && character.position) {
        updateDebugValue('debug-char-x', character.position.x.toFixed(2));
        updateDebugValue('debug-char-z', character.position.z.toFixed(2));
    } else {
        updateDebugValue('debug-char-x', 'N/A');
        updateDebugValue('debug-char-z', 'N/A');
    }
    
    // Add marker root position for debugging (if available)
    if (markerRoot && markerRoot.position) {
        // You can uncomment these if you want to see marker position too
        // console.log('Marker root:', markerRoot.position);
    }
}

// Helper to update debug values
function updateDebugValue(id, value) {
    const element = document.getElementById(id);
    if (element) {
        element.textContent = value;
    }
}

// Setup Lights
function setupLights() {
    // Ambient Light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);
    
    // Directional Light (Sun)
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 10, 5);
    directionalLight.castShadow = true;
    directionalLight.shadow.camera.left = -10;
    directionalLight.shadow.camera.right = 10;
    directionalLight.shadow.camera.top = 10;
    directionalLight.shadow.camera.bottom = -10;
    scene.add(directionalLight);
}

// Create World Map
function createWorld(parent = scene) {
    const worldGroup = new THREE.Group();
    
    // Ground plane (map)
    const groundGeometry = new THREE.PlaneGeometry(CONFIG.world.size, CONFIG.world.size);
    const groundMaterial = new THREE.MeshStandardMaterial({
        color: 0x3a7d44,
        roughness: 0.8,
        metalness: 0.2
    });
    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    worldGroup.add(ground);
    
    // Add grid lines
    const gridHelper = new THREE.GridHelper(CONFIG.world.size, 10, 0x000000, 0x444444);
    gridHelper.position.y = 0.01;
    worldGroup.add(gridHelper);
    
    // Add some terrain features (trees, rocks)
    addTerrainFeatures(worldGroup);
    
    // Add border
    const borderGeometry = new THREE.BoxGeometry(CONFIG.world.size + 0.2, 0.3, 0.1);
    const borderMaterial = new THREE.MeshStandardMaterial({ color: 0x8b4513 });
    
    const borders = [
        { pos: [0, 0.15, CONFIG.world.size / 2 + 0.05], rot: [0, 0, 0] },
        { pos: [0, 0.15, -CONFIG.world.size / 2 - 0.05], rot: [0, 0, 0] },
        { pos: [CONFIG.world.size / 2 + 0.05, 0.15, 0], rot: [0, Math.PI / 2, 0] },
        { pos: [-CONFIG.world.size / 2 - 0.05, 0.15, 0], rot: [0, Math.PI / 2, 0] }
    ];
    
    borders.forEach(b => {
        const border = new THREE.Mesh(borderGeometry, borderMaterial);
        border.position.set(...b.pos);
        border.rotation.set(...b.rot);
        border.castShadow = true;
        border.receiveShadow = true;
        worldGroup.add(border);
    });
    
    worldMap = worldGroup;
    parent.add(worldGroup);
}

// Add terrain features
function addTerrainFeatures(parent) {
    // Add trees
    for (let i = 0; i < 5; i++) {
        const tree = createTree();
        tree.position.set(
            (Math.random() - 0.5) * (CONFIG.world.size - 1),
            0,
            (Math.random() - 0.5) * (CONFIG.world.size - 1)
        );
        parent.add(tree);
    }
    
    // Add rocks
    for (let i = 0; i < 3; i++) {
        const rock = createRock();
        rock.position.set(
            (Math.random() - 0.5) * (CONFIG.world.size - 1),
            0.1,
            (Math.random() - 0.5) * (CONFIG.world.size - 1)
        );
        parent.add(rock);
    }
}

// Create a simple tree
function createTree() {
    const treeGroup = new THREE.Group();
    
    // Trunk
    const trunkGeometry = new THREE.CylinderGeometry(0.1, 0.15, 0.6, 8);
    const trunkMaterial = new THREE.MeshStandardMaterial({ color: 0x8b4513 });
    const trunk = new THREE.Mesh(trunkGeometry, trunkMaterial);
    trunk.position.y = 0.3;
    trunk.castShadow = true;
    treeGroup.add(trunk);
    
    // Foliage
    const foliageGeometry = new THREE.ConeGeometry(0.4, 0.8, 8);
    const foliageMaterial = new THREE.MeshStandardMaterial({ color: 0x228b22 });
    const foliage = new THREE.Mesh(foliageGeometry, foliageMaterial);
    foliage.position.y = 0.9;
    foliage.castShadow = true;
    treeGroup.add(foliage);
    
    return treeGroup;
}

// Create a simple rock
function createRock() {
    const geometry = new THREE.DodecahedronGeometry(0.2, 0);
    const material = new THREE.MeshStandardMaterial({ color: 0x808080 });
    const rock = new THREE.Mesh(geometry, material);
    rock.castShadow = true;
    rock.receiveShadow = true;
    return rock;
}

// Create Character
function createCharacter(parent = scene) {
    const characterGroup = new THREE.Group();
    
    // Body (cylinder + spheres to create capsule shape)
    const bodyMaterial = new THREE.MeshStandardMaterial({ color: 0x4ecca3 });
    
    // Main body cylinder
    const bodyGeometry = new THREE.CylinderGeometry(CONFIG.character.size * 0.4, CONFIG.character.size * 0.4, CONFIG.character.size * 0.8, 8);
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    body.position.y = CONFIG.character.size * 1.2;
    body.castShadow = true;
    characterGroup.add(body);
    
    // Top sphere (capsule top)
    const topSphereGeometry = new THREE.SphereGeometry(CONFIG.character.size * 0.4, 8, 8);
    const topSphere = new THREE.Mesh(topSphereGeometry, bodyMaterial);
    topSphere.position.y = CONFIG.character.size * 1.6;
    topSphere.castShadow = true;
    characterGroup.add(topSphere);
    
    // Bottom sphere (capsule bottom)
    const bottomSphere = new THREE.Mesh(topSphereGeometry, bodyMaterial);
    bottomSphere.position.y = CONFIG.character.size * 0.8;
    bottomSphere.castShadow = true;
    characterGroup.add(bottomSphere);
    
    // Head
    const headGeometry = new THREE.SphereGeometry(CONFIG.character.size * 0.5, 16, 16);
    const headMaterial = new THREE.MeshStandardMaterial({ color: 0xffdbac });
    const head = new THREE.Mesh(headGeometry, headMaterial);
    head.position.y = CONFIG.character.size * 2.2;
    head.castShadow = true;
    characterGroup.add(head);
    
    // Eyes
    const eyeGeometry = new THREE.SphereGeometry(0.05, 8, 8);
    const eyeMaterial = new THREE.MeshStandardMaterial({ color: 0x000000 });
    
    const leftEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
    leftEye.position.set(-0.1, CONFIG.character.size * 2.3, CONFIG.character.size * 0.4);
    characterGroup.add(leftEye);
    
    const rightEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
    rightEye.position.set(0.1, CONFIG.character.size * 2.3, CONFIG.character.size * 0.4);
    characterGroup.add(rightEye);
    
    // Position character at center
    characterGroup.position.set(0, 0, 0);
    
    character = characterGroup;
    parent.add(characterGroup);
}

// Setup Controls
function setupControls() {
    if (isARMode) {
        setupTouchJoystick();
    } else {
        setupKeyboardControls();
    }
}

// Setup Keyboard Controls
function setupKeyboardControls() {
    window.addEventListener('keydown', (e) => {
        keys[e.key.toLowerCase()] = true;
    });
    
    window.addEventListener('keyup', (e) => {
        keys[e.key.toLowerCase()] = false;
    });
}

// Setup Touch Joystick
function setupTouchJoystick() {
    const joystickBase = document.getElementById('joystick-base');
    const joystickStick = document.getElementById('joystick-stick');
    
    let startX = 0, startY = 0;
    const maxDistance = 35; // pixels
    
    function handleStart(e) {
        e.preventDefault();
        joystickActive = true;
        const rect = joystickBase.getBoundingClientRect();
        startX = rect.left + rect.width / 2;
        startY = rect.top + rect.height / 2;
    }
    
    function handleMove(e) {
        if (!joystickActive) return;
        e.preventDefault();
        
        const touch = e.touches ? e.touches[0] : e;
        const deltaX = touch.clientX - startX;
        const deltaY = touch.clientY - startY;
        
        const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
        const angle = Math.atan2(deltaY, deltaX);
        
        const limitedDistance = Math.min(distance, maxDistance);
        const x = Math.cos(angle) * limitedDistance;
        const y = Math.sin(angle) * limitedDistance;
        
        joystickStick.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`;
        
        // Normalize joystick vector
        joystickVector.x = deltaX / maxDistance;
        joystickVector.y = deltaY / maxDistance;
        
        // Clamp values
        joystickVector.x = Math.max(-1, Math.min(1, joystickVector.x));
        joystickVector.y = Math.max(-1, Math.min(1, joystickVector.y));
    }
    
    function handleEnd(e) {
        e.preventDefault();
        joystickActive = false;
        joystickStick.style.transform = 'translate(-50%, -50%)';
        joystickVector.x = 0;
        joystickVector.y = 0;
    }
    
    // Touch events
    joystickBase.addEventListener('touchstart', handleStart);
    joystickBase.addEventListener('touchmove', handleMove);
    joystickBase.addEventListener('touchend', handleEnd);
    
    // Mouse events (for testing on desktop)
    joystickBase.addEventListener('mousedown', handleStart);
    document.addEventListener('mousemove', handleMove);
    document.addEventListener('mouseup', handleEnd);
}

// Update Character Position
function updateCharacter() {
    if (!character) return;
    
    let moveX = 0;
    let moveZ = 0;
    
    if (isARMode) {
        // Use joystick input
        moveX = joystickVector.x;
        moveZ = joystickVector.y;
    } else {
        // Use keyboard input
        if (keys['arrowup'] || keys['w']) moveZ -= 1;
        if (keys['arrowdown'] || keys['s']) moveZ += 1;
        if (keys['arrowleft'] || keys['a']) moveX -= 1;
        if (keys['arrowright'] || keys['d']) moveX += 1;
    }
    
    // Normalize diagonal movement
    if (moveX !== 0 && moveZ !== 0) {
        moveX *= 0.707;
        moveZ *= 0.707;
    }
    
    // Apply movement
    const newX = character.position.x + moveX * CONFIG.character.speed;
    const newZ = character.position.z + moveZ * CONFIG.character.speed;
    
    // Boundary checking
    const halfSize = CONFIG.world.size / 2 - CONFIG.character.size;
    character.position.x = Math.max(-halfSize, Math.min(halfSize, newX));
    character.position.z = Math.max(-halfSize, Math.min(halfSize, newZ));
    
    // Rotate character to face movement direction
    if (moveX !== 0 || moveZ !== 0) {
        const angle = Math.atan2(moveX, moveZ);
        character.rotation.y = angle;
    }
}

// Update Camera (Desktop only)
function updateCamera() {
    if (!isARMode && character && camera) {
        // Isometric camera follow - positioned behind and above character
        const offset = new THREE.Vector3(
            0,
            CONFIG.camera.height,
            CONFIG.camera.distance
        );
        
        camera.position.copy(character.position).add(offset);
        camera.lookAt(character.position);
    }
}

// Window Resize Handler
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

// Animation Loop
let frameCount = 0;
function animate() {
    requestAnimationFrame(animate);
    
    if (isARMode) {
        // MindAR handles its own update loop internally
        
        // Apply dead reckoning if marker is lost but orientation is available
        if (usingDeadReckoning && deviceOrientation.available && anchor) {
            applyDeadReckoning();
        }
        
        // Update debug info
        const controlsInfo = document.getElementById('controls-info');
        if (controlsInfo) {
            let statusText = '';
            if (markerVisible) {
                statusText = `✅ MindAR tracking!<br>World anchored<br>Use joystick to move`;
            } else if (usingDeadReckoning && deviceOrientation.available) {
                statusText = `📍 Dead reckoning mode<br>Using gyro/accelerometer<br>Point at target image`;
            } else {
                statusText = `🔍 Point at target image...<br>MindAR ready`;
            }
            controlsInfo.innerHTML = statusText;
            controlsInfo.style.color = markerVisible ? '#4ecca3' : (usingDeadReckoning ? '#ffd93d' : '#ff6b6b');
        }
        
        // Update debug panel every frame
        updateDebugPanel();
        
        // Log detection status every 60 frames (once per second at 60fps)
        frameCount++;
        if (frameCount % 60 === 0) {
            console.log(`Frame ${frameCount}: Marker=${markerVisible}, DeadReckoning=${usingDeadReckoning}, Gyro=${deviceOrientation.available}`);
        }
    }
    
    updateCharacter();
    
    if (!isARMode) {
        updateCamera();
        renderer.render(scene, camera);
    }
    // MindAR handles rendering in AR mode
}

// Apply Dead Reckoning using device orientation
function applyDeadReckoning() {
    if (!anchor || !anchor.group || !deviceOrientation.available) return;
    
    // Use device orientation to adjust anchor position
    // Convert device orientation to Three.js rotations
    const alpha = THREE.MathUtils.degToRad(deviceOrientation.alpha);
    const beta = THREE.MathUtils.degToRad(deviceOrientation.beta);
    const gamma = THREE.MathUtils.degToRad(deviceOrientation.gamma);
    
    // Apply orientation to anchor group (this keeps the world stable relative to device)
    // Note: This is a simplified dead reckoning - in production you'd integrate
    // accelerometer data for position tracking too
    anchor.group.rotation.set(
        lastMarkerRotation.x + beta * 0.1,
        lastMarkerRotation.y + alpha * 0.1,
        lastMarkerRotation.z + gamma * 0.1
    );
}

// Start the game when page loads
window.addEventListener('load', init);

