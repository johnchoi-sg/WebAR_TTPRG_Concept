// Detect if device is mobile
export function detectMobile() {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    
    // Check for mobile device
    const isMobileDevice = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent.toLowerCase());
    
    // Also check screen size
    const isSmallScreen = window.innerWidth <= 768;
    
    const result = isMobileDevice || isSmallScreen;
    console.log('📱 Device detection:', {
        userAgent: userAgent.substring(0, 50) + '...',
        isMobileDevice,
        isSmallScreen,
        result: result ? 'MOBILE' : 'DESKTOP'
    });
    
    return result;
}

