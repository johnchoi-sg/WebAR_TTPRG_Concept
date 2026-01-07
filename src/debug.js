import { requestSensorPermissions } from './sensors.js';

// Setup Debug Panel
export function setupDebugPanel(state) {
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
            requestSensorPermissions(state);
        });
    }
    
    console.log('✅ Debug panel setup complete');
}

// Update Debug Panel
export function updateDebugPanel(state, isARMode) {
    if (!isARMode) return;
    
    // Marker tracking
    const markerStatus = state.markerVisible ? '✅ Tracking' : (state.usingDeadReckoning ? '📍 Dead Reckoning' : '❌ Lost');
    updateDebugValue('debug-marker-status', markerStatus);
    updateDebugValue('debug-marker-visible', state.markerVisible ? 'Yes' : 'No');
    
    // Gyroscope
    updateDebugValue('debug-alpha', (state.deviceOrientation.alpha || 0).toFixed(1));
    updateDebugValue('debug-beta', (state.deviceOrientation.beta || 0).toFixed(1));
    updateDebugValue('debug-gamma', (state.deviceOrientation.gamma || 0).toFixed(1));
    updateDebugValue('debug-gyro-available', state.deviceOrientation.available ? 'Yes ✅' : 'No ❌');
    
    // Accelerometer
    updateDebugValue('debug-accel-x', (state.deviceAcceleration.x || 0).toFixed(2));
    updateDebugValue('debug-accel-y', (state.deviceAcceleration.y || 0).toFixed(2));
    updateDebugValue('debug-accel-z', (state.deviceAcceleration.z || 0).toFixed(2));
    
    // Camera position
    if (state.camera && state.camera.position) {
        updateDebugValue('debug-cam-x', state.camera.position.x.toFixed(2));
        updateDebugValue('debug-cam-y', state.camera.position.y.toFixed(2));
        updateDebugValue('debug-cam-z', state.camera.position.z.toFixed(2));
    } else {
        updateDebugValue('debug-cam-x', 'N/A');
        updateDebugValue('debug-cam-y', 'N/A');
        updateDebugValue('debug-cam-z', 'N/A');
    }
    
    // Camera rotation (convert to degrees)
    if (state.camera && state.camera.rotation) {
        updateDebugValue('debug-rot-x', (state.camera.rotation.x * 180 / Math.PI).toFixed(1));
        updateDebugValue('debug-rot-y', (state.camera.rotation.y * 180 / Math.PI).toFixed(1));
        updateDebugValue('debug-rot-z', (state.camera.rotation.z * 180 / Math.PI).toFixed(1));
    } else {
        updateDebugValue('debug-rot-x', 'N/A');
        updateDebugValue('debug-rot-y', 'N/A');
        updateDebugValue('debug-rot-z', 'N/A');
    }
    
    // Character position
    if (state.character && state.character.position) {
        updateDebugValue('debug-char-x', state.character.position.x.toFixed(2));
        updateDebugValue('debug-char-z', state.character.position.z.toFixed(2));
    } else {
        updateDebugValue('debug-char-x', 'N/A');
        updateDebugValue('debug-char-z', 'N/A');
    }
}

// Helper to update debug values
function updateDebugValue(id, value) {
    const element = document.getElementById(id);
    if (element) {
        element.textContent = value;
    }
}

