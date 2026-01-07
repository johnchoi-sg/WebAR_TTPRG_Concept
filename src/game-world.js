/**
 * Game World System
 * Manages the persistent game world (ground, characters, etc.)
 */

export class GameWorld {
    constructor() {
        this.worldEntity = null;
        this.groundEntity = null;
        this.characterEntity = null;
        this.arAnchor = null;
    }

    init(worldEntity, groundEntity, characterEntity, arAnchor) {
        this.worldEntity = worldEntity;
        this.groundEntity = groundEntity;
        this.characterEntity = characterEntity;
        this.arAnchor = arAnchor;

        console.log('🌍 Game World initialized');
        
        // Position world in front of camera initially
        this.worldEntity.object3D.position.set(0, -0.5, -1.5);
        
        console.log('📍 Initial world position:', this.worldEntity.object3D.position);
    }

    /**
     * Update world position based on AR anchor
     * Call this every frame
     */
    update() {
        if (!this.arAnchor) return;

        const markerPos = this.arAnchor.getPosition();
        const markerRot = this.arAnchor.getRotation();

        // If marker is being tracked, move world to marker position
        if (markerPos && markerRot) {
            this.worldEntity.object3D.position.copy(markerPos);
            this.worldEntity.object3D.quaternion.copy(markerRot);
        }
        
        // If marker is not tracking, world stays at last position
        // (do nothing - world is already where it should be)
    }

    /**
     * Get character position
     */
    getCharacterPosition() {
        if (!this.characterEntity) return null;
        
        const pos = new THREE.Vector3();
        this.characterEntity.object3D.getWorldPosition(pos);
        return pos;
    }
}

