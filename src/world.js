import { CONFIG } from './config.js';

// Create World Map
export function createWorld(parent) {
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
    
    parent.add(worldGroup);
    return worldGroup;
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

// Setup Lights
export function setupLights(scene) {
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

