import { CONFIG } from './config.js';

// Create Character
export function createCharacter(parent) {
    const characterGroup = new THREE.Group();
    
    // Body (cylinder + spheres to create capsule shape)
    const bodyMaterial = new THREE.MeshStandardMaterial({ color: 0x4ecca3 });
    
    // Main body cylinder
    const bodyGeometry = new THREE.CylinderGeometry(
        CONFIG.character.size * 0.4, 
        CONFIG.character.size * 0.4, 
        CONFIG.character.size * 0.8, 
        8
    );
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
    
    parent.add(characterGroup);
    return characterGroup;
}

// Update Character Position
export function updateCharacter(character, state, isARMode) {
    if (!character) return;
    
    let moveX = 0;
    let moveZ = 0;
    
    if (isARMode) {
        // Use joystick input
        moveX = state.joystickVector.x;
        moveZ = state.joystickVector.y;
    } else {
        // Use keyboard input
        if (state.keys['arrowup'] || state.keys['w']) moveZ -= 1;
        if (state.keys['arrowdown'] || state.keys['s']) moveZ += 1;
        if (state.keys['arrowleft'] || state.keys['a']) moveX -= 1;
        if (state.keys['arrowright'] || state.keys['d']) moveX += 1;
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

