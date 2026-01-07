// Setup Device Orientation for Dead Reckoning
export function setupDeviceOrientation(state) {
    // Check if device orientation is supported
    if (window.DeviceOrientationEvent) {
        console.log('📱 Device orientation supported, enabling dead reckoning');
        
        // Request permission on iOS 13+
        if (typeof DeviceOrientationEvent.requestPermission === 'function') {
            DeviceOrientationEvent.requestPermission()
                .then(permissionState => {
                    if (permissionState === 'granted') {
                        window.addEventListener('deviceorientation', (e) => handleDeviceOrientation(e, state));
                        state.deviceOrientation.available = true;
                        console.log('✅ Device orientation permission granted');
                    } else {
                        console.log('⚠️ Device orientation permission denied');
                    }
                })
                .catch(console.error);
        } else {
            // Non-iOS or older iOS
            window.addEventListener('deviceorientation', (e) => handleDeviceOrientation(e, state));
            state.deviceOrientation.available = true;
            console.log('✅ Device orientation enabled');
        }
    } else {
        console.log('⚠️ Device orientation not supported');
    }
    
    // Also listen for device motion (accelerometer)
    if (window.DeviceMotionEvent) {
        window.addEventListener('devicemotion', (e) => handleDeviceMotion(e, state));
        console.log('✅ Device motion (accelerometer) enabled');
    }
}

// Handle Device Orientation Changes
let orientationEventCount = 0;
function handleDeviceOrientation(event, state) {
    state.deviceOrientation.alpha = event.alpha || 0;
    state.deviceOrientation.beta = event.beta || 0;
    state.deviceOrientation.gamma = event.gamma || 0;
    
    // Log first few events to confirm it's working
    orientationEventCount++;
    if (orientationEventCount <= 3) {
        console.log(`📱 Orientation event ${orientationEventCount}:`, {
            alpha: state.deviceOrientation.alpha.toFixed(1),
            beta: state.deviceOrientation.beta.toFixed(1),
            gamma: state.deviceOrientation.gamma.toFixed(1)
        });
    }
}

// Handle Device Motion (Accelerometer)
let motionEventCount = 0;
function handleDeviceMotion(event, state) {
    if (event.accelerationIncludingGravity) {
        state.deviceAcceleration.x = event.accelerationIncludingGravity.x || 0;
        state.deviceAcceleration.y = event.accelerationIncludingGravity.y || 0;
        state.deviceAcceleration.z = event.accelerationIncludingGravity.z || 0;
        
        // Log first few events to confirm it's working
        motionEventCount++;
        if (motionEventCount <= 3) {
            console.log(`📊 Motion event ${motionEventCount}:`, {
                x: state.deviceAcceleration.x.toFixed(2),
                y: state.deviceAcceleration.y.toFixed(2),
                z: state.deviceAcceleration.z.toFixed(2)
            });
        }
    }
}

// Apply Dead Reckoning using device orientation
export function applyDeadReckoning(state) {
    if (!state.anchor || !state.anchor.group || !state.deviceOrientation.available) return;
    
    // Use device orientation to adjust anchor position
    const alpha = THREE.MathUtils.degToRad(state.deviceOrientation.alpha);
    const beta = THREE.MathUtils.degToRad(state.deviceOrientation.beta);
    const gamma = THREE.MathUtils.degToRad(state.deviceOrientation.gamma);
    
    // Apply orientation to anchor group
    state.anchor.group.rotation.set(
        state.lastMarkerRotation.x + beta * 0.1,
        state.lastMarkerRotation.y + alpha * 0.1,
        state.lastMarkerRotation.z + gamma * 0.1
    );
}

// Manually request sensor permissions (useful for iOS 13+)
export function requestSensorPermissions(state) {
    if (typeof DeviceOrientationEvent !== 'undefined' && typeof DeviceOrientationEvent.requestPermission === 'function') {
        DeviceOrientationEvent.requestPermission()
            .then(permissionState => {
                if (permissionState === 'granted') {
                    console.log('✅ Device orientation permission granted!');
                    alert('✅ Sensor permissions granted!');
                    window.addEventListener('deviceorientation', (e) => handleDeviceOrientation(e, state));
                    state.deviceOrientation.available = true;
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

