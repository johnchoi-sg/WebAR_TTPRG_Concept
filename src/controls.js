// Setup Keyboard Controls
export function setupKeyboardControls(state) {
    window.addEventListener('keydown', (e) => {
        state.keys[e.key.toLowerCase()] = true;
    });
    
    window.addEventListener('keyup', (e) => {
        state.keys[e.key.toLowerCase()] = false;
    });
}

// Setup Touch Joystick
export function setupTouchJoystick(state) {
    const joystickBase = document.getElementById('joystick-base');
    const joystickStick = document.getElementById('joystick-stick');
    
    if (!joystickBase || !joystickStick) return;
    
    let startX = 0, startY = 0;
    const maxDistance = 35; // pixels
    
    function handleStart(e) {
        e.preventDefault();
        state.joystickActive = true;
        const rect = joystickBase.getBoundingClientRect();
        startX = rect.left + rect.width / 2;
        startY = rect.top + rect.height / 2;
    }
    
    function handleMove(e) {
        if (!state.joystickActive) return;
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
        state.joystickVector.x = deltaX / maxDistance;
        state.joystickVector.y = deltaY / maxDistance;
        
        // Clamp values
        state.joystickVector.x = Math.max(-1, Math.min(1, state.joystickVector.x));
        state.joystickVector.y = Math.max(-1, Math.min(1, state.joystickVector.y));
    }
    
    function handleEnd(e) {
        e.preventDefault();
        state.joystickActive = false;
        joystickStick.style.transform = 'translate(-50%, -50%)';
        state.joystickVector.x = 0;
        state.joystickVector.y = 0;
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

