/**
 * Game Manager
 * Main controller that coordinates all systems
 */

import { ARAnchor } from './ar-anchor.js';
import { GameWorld } from './game-world.js';

export class GameManager {
    constructor() {
        this.arAnchor = new ARAnchor();
        this.gameWorld = new GameWorld();
        this.initialized = false;
    }

    /**
     * Initialize the game
     */
    init() {
        console.log('🎮 Game Manager initializing...');

        // Wait for A-Frame scene to load
        const scene = document.querySelector('a-scene');
        
        if (scene.hasLoaded) {
            this.onSceneLoaded();
        } else {
            scene.addEventListener('loaded', () => this.onSceneLoaded());
        }
    }

    onSceneLoaded() {
        console.log('✅ Scene loaded');

        // Get entities
        const markerEntity = document.querySelector('[mindar-image-target]');
        const worldEntity = document.getElementById('game-world');
        const groundEntity = document.getElementById('ground');
        const characterEntity = document.getElementById('character');

        // Initialize systems
        this.arAnchor.init(markerEntity);
        this.gameWorld.init(worldEntity, groundEntity, characterEntity, this.arAnchor);

        this.initialized = true;

        // Start update loop
        this.startUpdateLoop();
    }

    /**
     * Main update loop
     */
    startUpdateLoop() {
        const scene = document.querySelector('a-scene');
        
        scene.addEventListener('renderstart', () => {
            // Register tick handler
            scene.addBehavior({
                tick: () => {
                    if (this.initialized) {
                        this.update();
                    }
                }
            });
        });
    }

    /**
     * Update all systems
     */
    update() {
        this.gameWorld.update();
    }
}

