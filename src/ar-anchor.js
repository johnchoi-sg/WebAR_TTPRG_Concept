/**
 * AR Anchor System
 * Manages the AR marker tracking and provides position data
 */

export class ARAnchor {
    constructor() {
        this.markerEntity = null;
        this.isTracking = false;
        this.lastPosition = null;
        this.lastRotation = null;
    }

    init(markerEntity) {
        this.markerEntity = markerEntity;
        
        // Listen for marker events
        this.markerEntity.addEventListener('targetFound', () => {
            console.log('✅ AR Marker found');
            this.isTracking = true;
        });

        this.markerEntity.addEventListener('targetLost', () => {
            console.log('❌ AR Marker lost');
            this.isTracking = false;
        });
    }

    /**
     * Get current marker position (if tracking)
     * Returns null if not tracking
     */
    getPosition() {
        if (!this.isTracking || !this.markerEntity) {
            return null;
        }

        const pos = new THREE.Vector3();
        this.markerEntity.object3D.getWorldPosition(pos);
        this.lastPosition = pos;
        return pos;
    }

    /**
     * Get current marker rotation (if tracking)
     * Returns null if not tracking
     */
    getRotation() {
        if (!this.isTracking || !this.markerEntity) {
            return null;
        }

        const quat = new THREE.Quaternion();
        this.markerEntity.object3D.getWorldQuaternion(quat);
        this.lastRotation = quat;
        return quat;
    }

    /**
     * Check if marker is currently being tracked
     */
    isMarkerTracking() {
        return this.isTracking;
    }
}

