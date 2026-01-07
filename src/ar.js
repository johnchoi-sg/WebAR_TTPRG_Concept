import { setupLights } from './world.js';
import { createWorld } from './world.js';
import { createCharacter } from './character.js';
import { setupDeviceOrientation } from './sensors.js';
import { setupDebugPanel } from './debug.js';

// Initialize AR Mode with MindAR
export async function initAR(state) {
    console.log('🚀 Initializing MindAR mode...');
    
    // Show camera permission prompt
    const cameraPrompt = document.getElementById('camera-prompt');
    const requestCameraBtn = document.getElementById('request-camera-btn');
    const cameraError = document.getElementById('camera-error');
    
    cameraPrompt.style.display = 'flex';
    
    // Wait for user interaction (required by browsers for camera access)
    await new Promise((resolve) => {
        requestCameraBtn.onclick = () => {
            requestCameraBtn.textContent = '⏳ Starting AR...';
            requestCameraBtn.disabled = true;
            resolve();
        };
    });
    
    // Now initialize AR
    document.getElementById('ar-container').style.display = 'block';
    document.getElementById('joystick-container').style.display = 'block';
    
    // Create MindAR instance
    const container = document.getElementById('ar-container');
    
    state.mindarThree = new window.MINDAR.IMAGE.MindARThree({
        container: container,
        imageTargetSrc: 'https://cdn.jsdelivr.net/gh/hiukim/mind-ar-js@1.2.2/examples/image-tracking/assets/card-example/card.mind'
    });
    
    const {renderer: arRenderer, scene: arScene, camera: arCamera} = state.mindarThree;
    
    // Use MindAR's renderer, scene, and camera
    state.renderer = arRenderer;
    state.scene = arScene;
    state.camera = arCamera;
    
    console.log('✅ MindAR initialized');
    
    // Setup Lights
    setupLights(state.scene);
    
    // Create anchor (where objects attach when marker detected)
    state.anchor = state.mindarThree.addAnchor(0);
    console.log('✅ Anchor created');
    
    // Track marker visibility
    state.anchor.onTargetFound = () => {
        console.log('✅ Target found!');
        setMarkerVisible(state, true);
    };
    
    state.anchor.onTargetLost = () => {
        console.log('❌ Target lost!');
        setMarkerVisible(state, false);
    };
    
    // Create World and Character attached to anchor
    state.worldMap = createWorld(state.anchor.group);
    state.character = createCharacter(state.anchor.group);
    
    console.log('✅ World and character created on anchor');
    
    // Setup device orientation for dead reckoning
    setupDeviceOrientation(state);
    
    // Setup debug panel
    setupDebugPanel(state);
    
    // Start MindAR (this will request camera permission automatically)
    try {
        await state.mindarThree.start();
        console.log('✅ MindAR started successfully!');
        console.log('✅ Camera permission granted!');
        
        // Hide the camera prompt on success
        cameraPrompt.style.display = 'none';
    } catch (error) {
        console.error('❌ MindAR start error:', error);
        
        // Show error in the prompt
        cameraError.style.display = 'block';
        cameraError.innerHTML = `
            <strong>❌ Failed to start AR</strong><br>
            ${error.message}<br><br>
            <small>Check camera permissions and see the help section below.</small>
        `;
        requestCameraBtn.textContent = '🔄 Try Again';
        requestCameraBtn.disabled = false;
        
        // Make the button work again
        requestCameraBtn.onclick = async () => {
            requestCameraBtn.textContent = '⏳ Starting AR...';
            requestCameraBtn.disabled = true;
            cameraError.style.display = 'none';
            
            try {
                await state.mindarThree.start();
                console.log('✅ MindAR started successfully!');
                cameraPrompt.style.display = 'none';
            } catch (retryError) {
                console.error('❌ Retry failed:', retryError);
                cameraError.style.display = 'block';
                cameraError.innerHTML = `
                    <strong>❌ Still not working</strong><br>
                    ${retryError.message}<br><br>
                    <small>Please check the troubleshooting guide below.</small>
                `;
                requestCameraBtn.textContent = '🔄 Try Again';
                requestCameraBtn.disabled = false;
            }
        };
        
        console.error('Camera permission denied or error. Check:');
        console.error('1. Browser camera permissions');
        console.error('2. Using HTTPS or localhost with flag enabled');
        console.error('3. No other app is using the camera');
        console.error('4. See START_HERE_CAMERA.md for setup guide');
    }
    
    console.log('🎉 AR initialization complete!');
}

// Update marker visibility flag
export function setMarkerVisible(state, visible) {
    state.markerVisible = visible;
    
    if (visible && state.anchor && state.anchor.group) {
        // Store last known anchor position/rotation
        state.lastMarkerPosition.copy(state.anchor.group.position);
        state.lastMarkerRotation.copy(state.anchor.group.rotation);
        state.usingDeadReckoning = false;
        console.log('📍 Marker position stored for dead reckoning');
    } else if (!visible) {
        // Start dead reckoning
        state.usingDeadReckoning = true;
        console.log('🧭 Starting dead reckoning...');
    }
}

