/**
 * AR Tracking Manager
 * Manages MindAR tracking and provides position/rotation data
 */

export class ARTracking {
    constructor() {
        this.targetEntity = null;
        this.isTracking = false;
        this.position = new THREE.Vector3(0, 0, 0);
        this.rotation = new THREE.Euler(0, 0, 0);
    }

    /**
     * Initialize AR tracking
     */
    init(targetEntity) {
        console.log('📡 Initializing AR tracking...');
        
        this.targetEntity = targetEntity;

        // Listen for tracking events
        this.targetEntity.addEventListener('targetFound', () => {
            console.log('✅ AR Target found!');
            this.isTracking = true;
        });

        this.targetEntity.addEventListener('targetLost', () => {
            console.log('❌ AR Target lost');
            this.isTracking = false;
        });

        console.log('✅ AR tracking initialized');
    }

    /**
     * Update tracking data (call every frame)
     */
    update() {
        if (!this.targetEntity || !this.targetEntity.object3D) return;

        // Get world position
        const worldPos = new THREE.Vector3();
        this.targetEntity.object3D.getWorldPosition(worldPos);

        // Get world rotation
        const worldQuat = new THREE.Quaternion();
        this.targetEntity.object3D.getWorldQuaternion(worldQuat);
        
        const worldRot = new THREE.Euler();
        worldRot.setFromQuaternion(worldQuat);

        // Check if values are reasonable
        const magnitude = worldPos.length();
        if (magnitude > 100) {
            console.warn('⚠️ Large position detected:', worldPos, 'magnitude:', magnitude);
        }

        // Store values (no scaling - use raw AR data)
        this.position.copy(worldPos);
        this.rotation.copy(worldRot);
    }

    /**
     * Get current tracking status
     */
    getTrackingStatus() {
        return {
            isTracking: this.isTracking,
            position: this.position.clone(),
            rotation: this.rotation.clone()
        };
    }

    /**
     * Get position
     */
    getPosition() {
        return this.position.clone();
    }

    /**
     * Get rotation
     */
    getRotation() {
        return this.rotation.clone();
    }
}

