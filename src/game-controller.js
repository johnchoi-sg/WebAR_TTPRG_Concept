/**
 * Game Controller
 * Main game loop and coordination between AR tracking and game scene
 */

import { ARTracking } from './ar-tracking.js';
import { GameScene } from './game-scene.js';

export class GameController {
    constructor() {
        this.arTracking = new ARTracking();
        this.gameScene = new GameScene();
        this.isRunning = false;
    }

    /**
     * Initialize the game
     */
    async init() {
        console.log('🎮 Game Controller initializing...');

        // Wait for A-Frame scene to load
        const aframeScene = document.querySelector('a-scene');
        
        if (aframeScene.hasLoaded) {
            this.onSceneLoaded();
        } else {
            aframeScene.addEventListener('loaded', () => this.onSceneLoaded());
        }
    }

    /**
     * Called when A-Frame scene is loaded
     */
    onSceneLoaded() {
        console.log('✅ A-Frame scene loaded');

        // Get AR target entity
        const targetEntity = document.getElementById('ar-target');
        if (!targetEntity) {
            console.error('❌ AR target entity not found!');
            return;
        }

        // Initialize AR tracking
        this.arTracking.init(targetEntity);

        // Initialize game scene (overlay)
        const container = document.getElementById('game-container');
        this.gameScene.init(container);

        // Handle window resize
        window.addEventListener('resize', () => {
            this.gameScene.resize();
        });

        // Start game loop
        this.start();

        console.log('✅ Game Controller initialized');
    }

    /**
     * Start the game loop
     */
    start() {
        this.isRunning = true;
        this.gameLoop();
        console.log('🎮 Game loop started');
    }

    /**
     * Stop the game loop
     */
    stop() {
        this.isRunning = false;
        console.log('⏸️ Game loop stopped');
    }

    /**
     * Main game loop
     */
    gameLoop() {
        if (!this.isRunning) return;

        // Update AR tracking data
        this.arTracking.update();

        // Get tracking status
        const tracking = this.arTracking.getTrackingStatus();

        // Update game scene camera based on AR tracking
        if (tracking.isTracking) {
            this.gameScene.updateFromARTracking(tracking.position, tracking.rotation);
        }

        // Render game scene
        this.gameScene.render();

        // Continue loop
        requestAnimationFrame(() => this.gameLoop());
    }

    /**
     * Get game scene for external access
     */
    getGameScene() {
        return this.gameScene;
    }

    /**
     * Get AR tracking for external access
     */
    getARTracking() {
        return this.arTracking;
    }
}

