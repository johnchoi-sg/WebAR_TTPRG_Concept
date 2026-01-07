import { CONFIG } from './config.js';

// Update Camera Position (Desktop mode)
export function updateCamera(camera, character) {
    if (!camera || !character) return;
    
    // Position camera directly behind and above character
    camera.position.x = character.position.x;
    camera.position.y = character.position.y + CONFIG.camera.height;
    camera.position.z = character.position.z + CONFIG.camera.distance;
    
    // Look at character
    camera.lookAt(character.position);
}

// Setup Resize Handler
export function setupResizeHandler(camera, renderer) {
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
}

