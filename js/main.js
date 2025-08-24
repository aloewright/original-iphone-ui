/* ========================================
   ORIGINAL IPHONE UI - MAIN JAVASCRIPT
   ======================================== */

// Global state management
window.iPhoneUI = {
    currentApp: null,
    isTransitioning: false,
    loadedApps: new Set(),
    startTime: Date.now()
};

// DOM Ready
document.addEventListener('DOMContentLoaded', function() {
    initializeUI();
    setupEventListeners();
    updateTime();
    hideLoadingScreen();
});

/**
 * Initialize the UI components
 */
function initializeUI() {
    console.log('🍎 Initializing iPhone UI...');
    
    // Set initial time
    updateTime();
    
    // Start time update interval
    setInterval(updateTime, 1000);
    
    // Initialize battery level animation
    animateBatteryLevel();
    
    console.log('✅ iPhone UI initialized successfully');
}

/**
 * Set up event listeners
 */
function setupEventListeners() {
    // App icon clicks
    document.querySelectorAll('.app-icon').forEach(icon => {
        icon.addEventListener('click', handleAppClick);
        icon.addEventListener('touchstart', handleTouchStart, { passive: true });
    });
    
    // Home button click
    const homeButton = document.getElementById('home-button');
    if (homeButton) {
        homeButton.addEventListener('click', handleHomeButtonClick);
        homeButton.addEventListener('touchstart', handleTouchStart, { passive: true });
    }
    
    // Physical button interactions
    setupPhysicalButtons();
    
    // Window resize handler
    window.addEventListener('resize', handleWindowResize);
    
    // Keyboard navigation
    document.addEventListener('keydown', handleKeyboardNavigation);
    
    console.log('✅ Event listeners set up');
}

/**
 * Handle app icon clicks
 */
function handleAppClick(event) {
    event.preventDefault();
    
    if (window.iPhoneUI.isTransitioning) {
        return;
    }
    
    const appName = this.dataset.app;
    if (!appName) {
        console.warn('No app name found for clicked icon');
        return;
    }
    
    // Add launching animation
    this.classList.add('launching');
    setTimeout(() => {
        this.classList.remove('launching');
    }, 300);
    
    // Launch app after animation
    setTimeout(() => {
        launchApp(appName);
    }, 150);
}

/**
 * Handle touch start for mobile interaction feedback
 */
function handleTouchStart(event) {
    // Add visual feedback for touch
    this.style.transform = 'scale(0.95)';
    
    const resetScale = () => {
        this.style.transform = '';
        this.removeEventListener('touchend', resetScale);
        this.removeEventListener('touchcancel', resetScale);
    };
    
    this.addEventListener('touchend', resetScale, { passive: true });
    this.addEventListener('touchcancel', resetScale, { passive: true });
}

/**
 * Launch an app
 */
function launchApp(appName) {
    if (window.iPhoneUI.isTransitioning) {
        return;
    }
    
    console.log(`🚀 Launching app: ${appName}`);
    
    window.iPhoneUI.isTransitioning = true;
    window.iPhoneUI.currentApp = appName;
    
    // Update URL hash
    window.location.hash = appName;
    
    // Load app if not already loaded
    if (!window.iPhoneUI.loadedApps.has(appName)) {
        loadAppContent(appName);
    }
    
    // Show app screen
    showAppScreen(appName);
}

/**
 * Load app content dynamically
 */
function loadAppContent(appName) {
    console.log(`📱 Loading content for: ${appName}`);
    
    const appScreen = document.getElementById('app-screen');
    if (!appScreen) {
        console.error('App screen container not found');
        return;
    }
    
    // Generate app content based on app name
    const appContent = generateAppContent(appName);
    appScreen.innerHTML = appContent;
    
    // Mark as loaded
    window.iPhoneUI.loadedApps.add(appName);
    
    // Initialize app-specific functionality
    if (window.AppHandlers && window.AppHandlers[appName]) {
        window.AppHandlers[appName].init();
    }
    
    console.log(`✅ Content loaded for: ${appName}`);
}

/**
 * Show app screen with transition
 */
function showAppScreen(appName) {
    const homeScreen = document.getElementById('home-screen');
    const appScreen = document.getElementById('app-screen');
    
    if (!homeScreen || !appScreen) {
        console.error('Screen containers not found');
        return;
    }
    
    // Hide home screen
    homeScreen.style.display = 'none';
    
    // Show app screen
    appScreen.style.display = 'block';
    appScreen.className = 'app-screen fade-in';
    
    // Update current app data attribute
    appScreen.dataset.currentApp = appName;
    
    setTimeout(() => {
        window.iPhoneUI.isTransitioning = false;
    }, 300);
}

/**
 * Handle home button click
 */
function handleHomeButtonClick(event) {
    event.preventDefault();
    
    if (window.iPhoneUI.isTransitioning) {
        return;
    }
    
    console.log('🏠 Home button pressed');
    
    // Go back to home screen
    goHome();
}

/**
 * Go back to home screen
 */
function goHome() {
    if (window.iPhoneUI.isTransitioning) {
        return;
    }
    
    const homeScreen = document.getElementById('home-screen');
    const appScreen = document.getElementById('app-screen');
    
    if (!homeScreen || !appScreen) {
        console.error('Screen containers not found');
        return;
    }
    
    window.iPhoneUI.isTransitioning = true;
    
    // Clear URL hash
    window.location.hash = '';
    
    // Add transition animation
    appScreen.className = 'app-screen fade-out';
    
    setTimeout(() => {
        // Hide app screen
        appScreen.style.display = 'none';
        
        // Show home screen
        homeScreen.style.display = 'flex';
        homeScreen.className = 'home-screen fade-in';
        
        // Reset state
        window.iPhoneUI.currentApp = null;
        window.iPhoneUI.isTransitioning = false;
    }, 300);
}

/**
 * Update the time display
 */
function updateTime() {
    const timeElement = document.getElementById('current-time');
    if (!timeElement) return;
    
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const displayHours = hours % 12 || 12;
    
    timeElement.textContent = `${displayHours}:${minutes} ${ampm}`;
}

/**
 * Animate battery level
 */
function animateBatteryLevel() {
    const batteryLevel = document.querySelector('.battery-level');
    if (!batteryLevel) return;
    
    // Simulate battery level changes
    let level = 80;
    setInterval(() => {
        // Randomly adjust battery level slightly
        level += (Math.random() - 0.5) * 2;
        level = Math.max(20, Math.min(100, level));
        
        batteryLevel.style.width = `${level}%`;
        
        // Change color based on level
        if (level < 30) {
            batteryLevel.style.background = 'linear-gradient(to bottom, #ff4444, #cc0000)';
        } else if (level < 50) {
            batteryLevel.style.background = 'linear-gradient(to bottom, #ffaa00, #ff8800)';
        } else {
            batteryLevel.style.background = 'linear-gradient(to bottom, #4CAF50, #45a049)';
        }
    }, 30000); // Update every 30 seconds
}

/**
 * Setup physical button interactions
 */
function setupPhysicalButtons() {
    const powerButton = document.querySelector('.power-button');
    const volumeUp = document.querySelector('.volume-up');
    const volumeDown = document.querySelector('.volume-down');
    const muteSwitch = document.querySelector('.mute-switch');
    
    [powerButton, volumeUp, volumeDown, muteSwitch].forEach(button => {
        if (button) {
            button.addEventListener('click', handlePhysicalButtonClick);
        }
    });
}

/**
 * Handle physical button clicks
 */
function handlePhysicalButtonClick(event) {
    const button = event.target;
    
    // Add visual feedback
    button.style.transform = 'scale(0.9)';
    setTimeout(() => {
        button.style.transform = '';
    }, 100);
    
    // Handle specific button actions
    if (button.classList.contains('power-button')) {
        console.log('🔌 Power button pressed');
        // Could implement screen lock/unlock
    } else if (button.classList.contains('volume-up')) {
        console.log('🔊 Volume up pressed');
    } else if (button.classList.contains('volume-down')) {
        console.log('🔉 Volume down pressed');
    } else if (button.classList.contains('mute-switch')) {
        console.log('🔇 Mute switch toggled');
    }
}

/**
 * Handle window resize
 */
function handleWindowResize() {
    // Recalculate any size-dependent elements
    console.log('📱 Window resized, adjusting layout...');
    
    // Could implement orientation change handling here
}

/**
 * Handle keyboard navigation
 */
function handleKeyboardNavigation(event) {
    // ESC key goes home
    if (event.key === 'Escape') {
        goHome();
    }
    
    // Space key acts as home button
    if (event.key === ' ' || event.key === 'Spacebar') {
        event.preventDefault();
        goHome();
    }
    
    // Number keys launch specific apps
    const numberKeys = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
    const appOrder = ['messages', 'calendar', 'photos', 'camera', 'youtube', 'stocks', 'maps', 'weather', 'notes'];
    
    if (numberKeys.includes(event.key)) {
        const index = parseInt(event.key) - 1;
        if (appOrder[index]) {
            launchApp(appOrder[index]);
        }
    }
}

/**
 * Hide loading screen
 */
function hideLoadingScreen() {
    setTimeout(() => {
        const loadingScreen = document.getElementById('loading-screen');
        if (loadingScreen) {
            loadingScreen.classList.add('hidden');
            console.log('✅ Loading screen hidden');
        }
    }, 2000); // Show loading for 2 seconds
}

/**
 * Generate app content based on app name
 */
function generateAppContent(appName) {
    // This will be expanded in apps.js
    return `
        <div class="app-container" data-app="${appName}">
            <div class="app-header">
                <div class="app-title">${appName.charAt(0).toUpperCase() + appName.slice(1)}</div>
            </div>
            <div class="app-content">
                <div class="loading-spinner">
                    <div class="spinner"></div>
                    <p>Loading ${appName}...</p>
                </div>
            </div>
        </div>
    `;
}

/**
 * Utility function to add haptic feedback
 */
function addHapticFeedback() {
    // For devices that support it
    if (navigator.vibrate) {
        navigator.vibrate(50);
    }
}

/**
 * Utility function for smooth scrolling
 */
function smoothScroll(element, to, duration = 300) {
    const start = element.scrollTop;
    const change = to - start;
    const startTime = performance.now();
    
    function animateScroll(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        element.scrollTop = start + change * easeInOutQuad(progress);
        
        if (progress < 1) {
            requestAnimationFrame(animateScroll);
        }
    }
    
    requestAnimationFrame(animateScroll);
}

/**
 * Easing function for smooth animations
 */
function easeInOutQuad(t) {
    return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
}

console.log('📱 Original iPhone UI JavaScript loaded');
